import { useEffect } from "react";
import { CustomCssFunctionUtils, CustomFnType } from "./CustomCssFunctionUtils";

/**
 * 自定义CSS函数实现，可用以全局CSS函数注册，且响应Body CSS变量的动态更新
 * @param customFn 自定义CSS函数实现，必须是具名函数，函数名称将作为全局CSS函数注册
 */
export function useCustomCSSFn(customFn: CustomFnType[] | CustomFnType) {
  useEffect(() => {
    // 自定义函数处理流程
    // 1、获取当前页面所有CSS变量定义
    // 2、检查哪些变量使用了自定义函数，筛选出来，形成暂存表，记录包含了自定义函数的CSS变量表
    // 3、检查所有文档元素，如果使用了上面暂存表中记录的自定义变量且变量值包含自定义CSS函数，
    // 则对变量定义进行求值并在该元素上覆盖定义，并将原始定义记录在dataset上，如果有多个则使
    // 用';'进行拼接，如果目标元素包含预设的dataset，则表示为更新，解析dataset上的原始表达式
    // 进行CSS变量更新，调用observe注册MutationObserve监听目标变化，执行CSS变量计算刷新，默认
    // 监听的元素为body，如果依赖的CSS变量定义在其他元素上，可以在调用时动态传入，如果不需要适配
    // 动态主题的话，无需调用observe订阅鼎泰变化时间，重建流程还是比较消耗资源的
    const customCssFnutils = new CustomCssFunctionUtils(customFn)
      .convertCustomCssFn()
      .observe();
    return () => {
      customCssFnutils.disconnect();
    };
  }, [customFn]);
}
