import { kebabCase } from "lodash";
import { CustomFnType } from "./CustomCssFunctionUtils";

/** 用于存放预设表达式的的dataset键名 */
export const DATASET_NAME = "customCssExpression";
export const DATASET_NAME_DATASET = kebabCase(`data-${DATASET_NAME}`);

/** 是否是样式规则 */
export function isStyleRule(rule: CSSStyleRule) {
  return rule.type === 1;
}

/** 是否是当前页面的样式 */
export function isSameDomain(styleSheet: CSSStyleSheet) {
  if (!styleSheet.href) {
    return true;
  }
  return styleSheet.href.indexOf(window.location.origin) === 0;
}

/** 获取当前页面所有的CSS变量定义 */
export function getAllCssVariables() {
  const arrCSSCustomProps: [string, string][] = Array.from(document.styleSheets)
    .filter(isSameDomain)
    .reduce(function (finalArr, sheet) {
      return finalArr.concat(
        Array.from<any>(sheet.cssRules)
          .filter(isStyleRule)
          .reduce(function (propValArr, rule) {
            var props = Array.from<any>(rule.style)
              .map(function (propName) {
                return [
                  propName.trim(),
                  rule.style.getPropertyValue(propName).trim(),
                ];
              })
              .filter(function ([propName]) {
                return propName.indexOf("--") === 0;
              });
            return ([] as any[]).concat(propValArr, props);
          }, [])
      );
    }, []);
  return arrCSSCustomProps;
}

/**
 * 获取当前页面哪些CSS变量使用了自定义函数
 * @param allVars 所有CSS变量定义
 * @param targetFnName 自定义函数名称组
 * @returns
 */
export function getAllUseCustom(
  allVars: [string, string][],
  targetFnName: string | string[]
) {
  const allFnName =
    typeof targetFnName === "string" ? targetFnName : targetFnName.join("|");
  const fnNamePattern = new RegExp(`(${allFnName})\\(.*\\)`);
  return allVars.filter((ruleItem) => ruleItem[1].match(fnNamePattern));
}

/**
 * 计算包含自定义CSS函数的CSS色值表达式
 * @param cssVarValForCurrentItem 色值字符串
 * @param fnNames 自定义函数名称组
 * @param customFnMap 自定义CSS函数-名称映射表
 */
export function calcColorCustomFn(
  cssVarValForCurrentItem: string,
  execPattern: RegExp,
  customFnMap: Map<string, CustomFnType>
) {
  // 尝试匹配自定义CSS函数调用，如果没有匹配到，则表明无处处理，直接返回即可
  // 如果匹配到了，则需要递归处理，有可能存在嵌套调用的现象
  const matched = cssVarValForCurrentItem.match(execPattern);
  if (matched) {
    let [, fnName, paramsStr] = matched;
    if (paramsStr.match(execPattern)) {
      paramsStr = calcColorCustomFn(paramsStr, execPattern, customFnMap)!;
    }
    // 未匹配到参数表存在嵌套调用，直接调用求值
    const params = paramsStr.split(",").map((i) => i.trim());
    try {
      // 调用自定义函数实现
      const calculatedVal = customFnMap
        .get(fnName)
        ?.apply(null, params as any)!;
      // 替换命中的原始表达式
      return cssVarValForCurrentItem.replace(execPattern, calculatedVal);
    } catch (error: any) {
      console.error("CalcColorExpection: %s", error.message);
      return "CalcColorExpection";
    }
  }

  return cssVarValForCurrentItem;
}

/**
 * 将CSS变量定义原始表达式写到DOM元素的dataset上
 * @param domNode
 * @param cssVarRule
 */
export function writeOriginalEexpression2Dataset(
  domNode: HTMLElement,
  cssVarRule: [string, string]
) {
  // 如果预设的dataset为空，直接写入即可
  if (!domNode.dataset[DATASET_NAME]) {
    domNode.dataset[DATASET_NAME] = cssVarRule.join(":");
    return;
  }
  // 如果存在，则判断是否已经存入原始表达式，如果没有则拼接上去
  if (!domNode.dataset[DATASET_NAME]!.includes(cssVarRule[0])) {
    domNode.dataset[DATASET_NAME] += `;${cssVarRule.join(":")}`;
  }
}

/**
 * 从Dataset中获取最新的自定义CSS变量原始定义（已经根据当前环境替换了var相关引用）
 * @param varName CSS变量名
 * @param domNode 目标DOM节点
 * @returns CSS变量原始定义（已经根据当前环境替换了var相关引用）
 */
export function getVarValFromDataset(
  varName: string,
  domNode: HTMLElement
): string | null {
  // 多个CSS变量使用分号间隔，末尾没有分号，依据此规则使用正则匹配出来即可
  // dataset键名使用预定义键名，存放在DATASET_NAME常量中，匹配到的原始定义
  // 位于match的1号位（第一个分组中）
  const colorItemMatchPattern = new RegExp(`${varName}:(.*?)(;|$)`);
  // 匹配css var变量引用函数，将所有var变量引用替换成实际值，然后返回
  const colorVarReg = /var\((--\w+)\)/;
  const colorItemMatched = domNode.dataset[DATASET_NAME]?.match(
    colorItemMatchPattern
  );

  if (colorItemMatched) {
    let [, colorValDefinition] = colorItemMatched;
    let colorVarMatched: RegExpMatchArray | null;
    do {
      colorVarMatched = colorValDefinition.trim().match(colorVarReg);
      if (colorVarMatched) {
        const [, varName] = colorVarMatched;
        const currentColor =
          getComputedStyle(domNode).getPropertyValue(varName);
        colorValDefinition = colorValDefinition.replace(
          colorVarReg,
          currentColor
        );
      }
    } while (colorVarMatched);
    return colorValDefinition;
  }
  return null;
}
