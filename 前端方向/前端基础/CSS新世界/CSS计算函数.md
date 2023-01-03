<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [关于 calc 函数](#%E5%85%B3%E4%BA%8E-calc-%E5%87%BD%E6%95%B0)
- [了解 max、min、clamp 函数](#%E4%BA%86%E8%A7%A3-maxminclamp-%E5%87%BD%E6%95%B0)
  - [写法改进样例](#%E5%86%99%E6%B3%95%E6%94%B9%E8%BF%9B%E6%A0%B7%E4%BE%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 关于 calc 函数

几个需要注意的特点：

- 运算符前后君带有单位或者含有百分号的表达式只能使用加减运算，乘除运算是无效的
- 除数不能为零且不能带单位
- 加减法的运算符两侧必须有空格（因为无法区分到底是正负符号还是运算符）
- 可以嵌套、可以引用 CSS 变量参与计算
- 整除不尽的布局宽度，可以交由 calc 处理，比如六等分布局：`width:calc(100% / 6);`

## 了解 max、min、clamp 函数

- min:求取最小值
- max:最大值
- clamp:区间控制

_Tips:支持各种类型的值，百分比、像素、相对值 em、rem、vw、vh 等等_

响应式字体大小，并且兼容控制上下限

```css
html {
  font-size: 16px;
  font-size: clamp(16px, calc(16px + 2 * (100vw - 375px) / 39), 20px);
}
```

### 写法改进样例

```css
/* 原始写法，移动端与PC宽度限定 */
width: 100%;
max-witdh: 1150px;

/* 新写法 */
width: clamp(100%, 1150px);
```
