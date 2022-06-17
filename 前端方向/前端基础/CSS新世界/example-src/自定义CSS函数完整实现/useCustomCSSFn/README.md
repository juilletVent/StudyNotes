# 自定义 CSS 函数支持

鉴于后续主题样式、CSS 变量相关能力逐步铺开，在实际接入主题的过程中发现一下几个痛点：

1. 主题模板定义的 CSS 变量以及衍生变量无法满足业务端设计稿的颜色要求，只能自己定义，而且如果有多套模板，还需要维护多套模板，有点儿麻烦
2. 无法在纯 css/less 环境中进行颜色计算，必须借助 JavaScript/styled-components 完成相关颜色计算与赋值，非常麻烦

## 适用场景与特点

基于上述两个痛点，本版块借助自定义 CSS 函数在以下场景发挥作用：

- 在项目中的 less/css 文件中使用自定义的 css 函数对颜色进行计算
- 在 React 项目中，styled-components 创建的组件样式会以 style 标签形式抽出，也是可以使用的
- 开启监听后，可以响应自定义 CSS 函数依赖的其他 CSS 变量的变化，但是没有经过完善的测试，如果形成循环依赖或乱序依赖的话可能会出错，建议使用自定义 CSS 函数计算时仅依赖直接就能取值的 CSS 变量
- 支持嵌套语法

## 样例

**重点说明：不可以直接将自定义函数直接应用在 CSS 属性上，必须定义在 CSS 变量上，否则会引起语法解析错误**

在项目入口注册:

```ts
import {
  darken as official_darken,
  transparentize as official_transparentize,
} from "polished";

function mydarken(amount: number | string, color: string) {
  return official_darken(amount, color);
}
function transparentize(amount: number | string, color: string) {
  return official_transparentize(amount, color);
}

// 单个
useCustomCSSFn(mydarken);
// 多个
useCustomCSSFn([mydarken, transparentize]);
```

css/less 中使用：

```css
/* 假设依赖的样式定义在body上 */
body {
  --primaryColor: #1890ff;
}

/* 我们的目标元素 */
.target-ele {
  /* 常规计算 */
  --darkenPrimaryColor15: mydarken(0.15, --primaryColor);
  /* 嵌套计算 */
  --darkenBgPrimaryColor: transparentize(0.75, mydarken(0.15, --primaryColor));

  /* 不可以直接将自定义函数直接应用在CSS属性上，必须定义在CSS变量上，否则会引起语法解析错误 */
  color: var(--darkenPrimaryColor15);
  background-color: var(darkenBgPrimaryColor);
}
```

在 styled-components 中使用：

```ts
export const CalcColor = styled.div`
  --darkenPrimaryColor15: mydarken(0.15, --primaryColor);
  color: var(--darkenPrimaryColor15);
`;
```
