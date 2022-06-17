import { isArray } from "lodash";
import {
  calcColorCustomFn,
  DATASET_NAME_DATASET,
  getAllCssVariables,
  getAllUseCustom,
  getVarValFromDataset,
  writeOriginalEexpression2Dataset,
} from "./utils";

export interface CustomFnType {
  (...args: any[]): string;
}
// export interface CustomFnType {
//   (amount: string | number, color: string): string;
// }

export class CustomCssFunctionUtils {
  customFns: CustomFnType | CustomFnType[];
  fnNames: string[];
  mutationObserver?: MutationObserver;
  usedCustomFnVars?: [string, string][];

  constructor(fns: CustomFnType | CustomFnType[]) {
    this.customFns = fns;
    this.fnNames = isArray(this.customFns)
      ? this.customFns.map((f) => f.name)
      : [this.customFns.name];
  }

  /** 转换CSS自定义函数，对文档下所有包含自定义CSS函数的CSS变量求值并覆盖定义 */
  convertCustomCssFn() {
    // 获取当前页面所有的自定义CSS变量定义（style标签内的，内联形式的定义不被统计在内）
    const allCssVar = getAllCssVariables();

    // 检查哪些变量使用了自定义函数，筛选出来，形成暂存表，记录包含了自定义函数的CSS变量表
    this.usedCustomFnVars = getAllUseCustom(allCssVar, this.fnNames);

    // 检查所有文档元素，如果使用了上面暂存表中记录的自定义变量且变量值包含自定义CSS函数，
    // 则对变量定义进行求值并在该元素上覆盖定义，并将原始定义记录在dataset上，如果有多个
    // 则使用';'进行拼接，如果目标元素包含预设的dataset，则表示为更新，解析dataset上的
    // 原始表达式进行CSS变量更新
    this.redefineCssVarForNode(
      this.usedCustomFnVars,
      window.document.body,
      true
    );
    return this;
  }

  /**
   * 监听元素变化以应用最新的样式（如无必要，请勿开启，重新计算整个流程，DOM元素较多，执行成本比较高昂）建议将使用
   * 自定义函数的CSS变量在项目入口位置的CSS文件中定义，然后执行一次构建即可，如使要适应动态主题切换，则应调用此方法
   * 开启监听，以响应主题CSS变量的变化（或者不调用这个方法，而是通过手动调用forceUpdate方法）手动触发样式样式重建
   * @param targetNode 监听的目标元素，默认为当前文档根
   */
  observe(targetNode = window.document.body) {
    this.mutationObserver = new MutationObserver((mutationsList) => {
      console.log("mutationsList: ", mutationsList);
      mutationsList.forEach((mutation) => {
        var nodeAdded = mutation.addedNodes;
        if (this.usedCustomFnVars) {
          // 新增元素
          nodeAdded.forEach((eleAdd) => {
            this.redefineCssVarForNode(
              this.usedCustomFnVars!,
              eleAdd as HTMLElement
            );
          });
          // 先前已经处理过的元素执行更新
          const currentItems = document.querySelectorAll<HTMLElement>(
            `[${DATASET_NAME_DATASET}]`
          );
          currentItems.forEach((item) =>
            this.redefineCssVarForNode(
              this.usedCustomFnVars!,
              item as HTMLElement
            )
          );
        }
      });
    });
    this.mutationObserver.observe(targetNode, {
      attributes: true,
      subtree: true,
    });
    return this;
  }

  /** 取消元素监听 */
  disconnect() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  /**
   * 在目标元素上进行CSS变量重定义（对自定义CSS函数求值）
   * @param useCustomFnCssVars 使用了自定义函数的CSS变量集合
   * @param targetNode 目标元素
   * @param deep 深度更新
   */
  private redefineCssVarForNode(
    useCustomFnCssVars: [string, string][],
    targetNode: HTMLElement,
    deep?: boolean
  ) {
    // 自定义CSS函数名称-实现映射表
    const customFnMap = new Map<string, CustomFnType>(
      isArray(this.customFns)
        ? this.customFns.map((fn) => [fn.name, fn])
        : [[this.customFns.name, this.customFns]]
    );
    // 自定义CSS函数匹配模式
    const cssFnNamePattern = new RegExp(`(${this.fnNames.join("|")})`);
    const cssFnExecPattern = new RegExp(
      `(${this.fnNames.join("|")})\\((.*)\\)`
    );
    const allDocumentNodes = [
      targetNode,
      ...(deep
        ? Array.from(targetNode.querySelectorAll<HTMLElement>("*"))
        : []),
    ];

    allDocumentNodes.forEach((domNode) => {
      // 跳过不需要处理的节点
      if (
        domNode.nodeType !== 1 ||
        ["script", "style", "meta", "title", "head"].includes(
          domNode.nodeName.toLowerCase()
        )
      ) {
        return;
      }

      // 遍历，判断传入的CSS变量在当前元素上是否有计算属性，并且使用了自定义CSS函数
      useCustomFnCssVars.forEach((cssVarRule) => {
        const [varName /* , varVal */] = cssVarRule;
        // 取得CSS变量在当前元素的定义值
        const objStyle = window.getComputedStyle(domNode);

        // 如果有dataset相关记录则使用dataset记录的原始表达式，否则在运行时计算属性上取得原始表达式
        let cssVarValForCurrentItem =
          getVarValFromDataset(varName, domNode) ||
          objStyle.getPropertyValue(varName);

        // 检查定义值是否包含自定义CSS函数，如果不包含则该属性无需处理
        if (
          !cssVarValForCurrentItem ||
          !cssVarValForCurrentItem.trim() ||
          !cssFnNamePattern.test(cssVarValForCurrentItem)
        ) {
          return;
        }

        // mydarken(0.2, #1890ff)
        // transparentize(0.2, mydarken(0.1,#1890ff))
        // 提取函数名、参数表，执行对应的函数进行求值（支持嵌套表达式）
        const finalColor = calcColorCustomFn(
          cssVarValForCurrentItem,
          cssFnExecPattern,
          customFnMap
        );

        // 如果发现计算出来的最终值与现有值相等，则跳过实际更新动作（否则与MutationObserver形成更新循环）
        if (finalColor === objStyle.getPropertyValue(varName)) {
          return;
        }

        // 将原始表达式存放到dataset上
        writeOriginalEexpression2Dataset(domNode, cssVarRule);

        // 将已经计算好的CSS变量值，覆盖写回当前元素上
        domNode.style.setProperty(varName, finalColor!);
      });
    });
  }
}
