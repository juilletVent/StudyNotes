<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Flex 布局](#flex-%E5%B8%83%E5%B1%80)
  - [容器设置了 display:flex 后子元素发生的变化](#%E5%AE%B9%E5%99%A8%E8%AE%BE%E7%BD%AE%E4%BA%86-displayflex-%E5%90%8E%E5%AD%90%E5%85%83%E7%B4%A0%E5%8F%91%E7%94%9F%E7%9A%84%E5%8F%98%E5%8C%96)
  - [使用 flex-flow 简写（flex-direction、flex-wrap）](#%E4%BD%BF%E7%94%A8-flex-flow-%E7%AE%80%E5%86%99flex-directionflex-wrap)
  - [使用 place-items 简写（同样适用于 Grid 布局）](#%E4%BD%BF%E7%94%A8-place-items-%E7%AE%80%E5%86%99%E5%90%8C%E6%A0%B7%E9%80%82%E7%94%A8%E4%BA%8E-grid-%E5%B8%83%E5%B1%80)
  - [justify-content 注意点](#justify-content-%E6%B3%A8%E6%84%8F%E7%82%B9)
  - [align-item 与 align-self](#align-item-%E4%B8%8E-align-self)
  - [align-content](#align-content)
  - [order 控制子项的排列顺序](#order-%E6%8E%A7%E5%88%B6%E5%AD%90%E9%A1%B9%E7%9A%84%E6%8E%92%E5%88%97%E9%A1%BA%E5%BA%8F)
  - [flex-basis 属性与最大内容宽度、最小内容宽度（重点章节）](#flex-basis-%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%9C%80%E5%A4%A7%E5%86%85%E5%AE%B9%E5%AE%BD%E5%BA%A6%E6%9C%80%E5%B0%8F%E5%86%85%E5%AE%B9%E5%AE%BD%E5%BA%A6%E9%87%8D%E7%82%B9%E7%AB%A0%E8%8A%82)
    - [要点总结](#%E8%A6%81%E7%82%B9%E6%80%BB%E7%BB%93)
    - [最小宽度的解释](#%E6%9C%80%E5%B0%8F%E5%AE%BD%E5%BA%A6%E7%9A%84%E8%A7%A3%E9%87%8A)
  - [智能化的缩写（非常实用）](#%E6%99%BA%E8%83%BD%E5%8C%96%E7%9A%84%E7%BC%A9%E5%86%99%E9%9D%9E%E5%B8%B8%E5%AE%9E%E7%94%A8)
    - [有用的单值缩写](#%E6%9C%89%E7%94%A8%E7%9A%84%E5%8D%95%E5%80%BC%E7%BC%A9%E5%86%99)
  - [flex-grow 与 flex-shrink](#flex-grow-%E4%B8%8E-flex-shrink)
  - [Flex justify-conetnt:space-between 最后一行左对齐布局技巧](#flex-justify-conetntspace-between-%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8C%E5%B7%A6%E5%AF%B9%E9%BD%90%E5%B8%83%E5%B1%80%E6%8A%80%E5%B7%A7)
    - [1、模拟 space-between 和间隙](#1%E6%A8%A1%E6%8B%9F-space-between-%E5%92%8C%E9%97%B4%E9%9A%99)
    - [2、根据个数最后一个元素动态 margin](#2%E6%A0%B9%E6%8D%AE%E4%B8%AA%E6%95%B0%E6%9C%80%E5%90%8E%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E5%8A%A8%E6%80%81-margin)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Flex 布局

## 容器设置了 display:flex 后子元素发生的变化

- 子元素都会块状化，哪怕是匿名内联元素也会块状化
- 子项浮动失效（很好理解，有专用的布局属性起作用，还要浮动何用？）
- 子项 z-index 将起作用；并且如果 z-index 不是 auto，子项会创建新的 CSS 上下文
- 子项的临近 margin 不会合并
- flex 子项是格式化的尺寸:可以利用 magin:auto 的形式自动分配剩余空间（如果不使用 justify-content）

## 使用 flex-flow 简写（flex-direction、flex-wrap）

flex-flow 可以简写上述的两个属性，对于顺序以及个数没有要求:

```css
/* 都是合法的 */
flex-flow: column wrap;
flex-flow: column;
flex-flow: wrap;
```

## 使用 place-items 简写（同样适用于 Grid 布局）

```css
place-items: center flex-end;
place-content: center flex-end;
/* 等价于 */
align-items: center;
justify-items: flex-end;
align-content: center;
justify-content: flex-end;
```

## justify-content 注意点

- 如果 flex 容器设置了 overflow 滚动，同时应用 justify-content:flex-end，滚动效果会失效
- space-between 表示多余的空白间距只在元素中间区域分配（均分）
- space-around 表示每个 flex 子项两侧都环绕互不干扰的等宽的空白间距，最终在视觉表现上边缘两侧的空白只有中间空白宽度的一半
- space-evenly 表示每个 flex 子项两侧空白间距完全相等(包括边界两侧的元素)

## align-item 与 align-self

align-items 属性和 align-self 属性的一个区别是 alignself 属性是设置在具体的某一个 flex 子项上的，而 align-items 属性是设置在 flex 容器元素上的

- stretch：默认值（实际默认值是：nomral，虽然效果等同于 stretch），拉伸高度，使得所有子元素的高度统一（高度为所有子元素中最大的最小高度，有点儿绕），如果子元素单独设置了高度，则应用单独设置的高度
- flex-start
- flex-end
- center
- baseline 所有元素沿文字基线对齐，如果子项没有基线，则使用元素下边缘进行对齐

> align-self 与 align-item 基本用法一样，只是他是单独作用在某一特定的子项上，一般用作精细化的样式控制，没了

## align-content

与 align-item 作用类似，作用的目标为整行的元素，如果 Flex 容器的高度不是自适应的，而是指定的，这个时候，align-content 就可以用控制元素行的对齐方式了，基本上和 justify-content 用法类似，可以控制元素行的的各种对齐方式，场景不多

## order 控制子项的排列顺序

所有 flex 子项的默认 order 属性值是 0，因此，如果我们想要某一个 flex 子项在最前面显示，则可以设置比 0 小的整数

## flex-basis 属性与最大内容宽度、最小内容宽度（重点章节）

- 0% ：基础尺寸是 0，因此如果此时设置了 flex-shrink:1 则元素的宽度表现为最小内容宽度或者 width 中较小的那个
- auto：宽度由内容决定，如果没有设置 flex-shrink 则内容表现为最大内容宽度

**重点 1：flex 子项的 width 设置的是不是元素的宽度，而是元素的最小尺寸（实际上与最小内容宽度共同决定）**

**重点 2：flex 子项的最终计算出来的最小宽度如果小于 flex-basis 则元素的最终宽度为 flex-basis 设置的值，相反则使用计算出的最小宽度作为项目宽度**

**Tips:如果同时设置 flex-basis 与 width，在计算元素基础尺寸时 width 会被直接忽略，始终采用 flex-basis 作为元素的基础尺寸，此时 width 仅影响元素的最小尺寸：如果 width 大于最小内容尺寸，则 width 不起任何作用，元素最小尺寸等于最小内容尺寸；相反，如果 width 小于最小最小内容尺寸，则元素最小尺寸采用 width 的值（以上所说的尺寸基本都是指代宽度）**

**Tips2：min-width 与 width 基本一样，都是作用于元素的最小宽度，但是 min-wdith 不影响元素的基础尺寸，width 则会影响元素的基础尺寸**

**Tips3 min-width:0 可以让元素的最小宽度变为 0，对于场景下（文字超长打点）非常好用**

### 要点总结

- flex-basis 属性默认作用在 content box 上，IE11 浏览器会忽略 box-sizing 属性。
- flex-basis 属性优先级比 width 属性高，同时设置的时候，width 属性无法影响基础尺寸，但是会影响最小尺寸（IE11 除外）。
- 最小尺寸与 flex-basis 属性无关，而与最小内容宽度、width 属性和 min-width 属性有关。
- flex-basis 属性使用得当可以实现类似 min-width 属性或 max-width 属性的效果，min-width 属性可以在不影响基础尺寸的前提下设置最小尺寸，从而解决弹性布局中打点无效的问题

### 最小宽度的解释

- 连续的英文词组，不可断行
- CJK 字符串相关的避头、避尾标点组合出来的不可断行组合
- 连续的破折号
- img 元素的固有宽度
- min-width 可以改变 flex-item 的元素内容最小宽度（其他常规布局体系下不会）[理解这里对理解 flex 项目实现溢出打点效果至关重要]
- 还要好些其他场景产生的最小宽度...等等等

## 智能化的缩写（非常实用）

- flex: auto 等同于设置 flex: 1 1 auto
- flex: none 等同于设置 flex: 0 0 auto
- flex: 1 则这个 1 为 flex-grow 属性的值，此时 flex-shrink 属性和 flex-basis 属性的值分别是 1 和 0%
- flex: 100px 则另外两个值均为 1（flex: 1 1 100px）
- flex: 1 1 等同于 flex:1 1 0%
- flex: 0 100px 等同于 flex:0 1 100px

### 有用的单值缩写

| 单值语法      | 等同于         |
| :------------ | :------------- |
| flex: initial | flex: 0 1 auto |
| flex: 0       | flex: 0 1 0%   |
| flex: none    | flex: 0 0 auto |
| flex: 1       | flex: 1 1 0%   |
| flex: auto    | flex: 1 1 auto |

## flex-grow 与 flex-shrink

- flex-grow 如果只有一个子元素，当 grow 大于等于 1 时，元素独占所有剩余空间，否则按照设置的小数占据多余的空间
- flex-grow 如果有多个子元素，grow 总和小于 1，则表示所占据的剩余空间百分比；如果大于一，则表示占据的剩余空间权重比例

## Flex justify-conetnt:space-between 最后一行左对齐布局技巧

这是在不想使用或者不能使用 grid 布局的情况下的办法，如果可以使用 grid 布局，则使用 grid 去实现即可，grid 完全没有这个问题

### 1、模拟 space-between 和间隙

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.list {
  width: 24%;
  height: 100px;
  background-color: skyblue;
  margin-top: 15px;
}
.list:not(:nth-child(4n)) {
  margin-right: calc(4% / 3);
}
```

### 2、根据个数最后一个元素动态 margin

```css
.container {
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;
  flex-wrap: wrap;
}
.list {
  width: 24%;
  height: 100px;
  background-color: skyblue;
  margin-top: 15px;
}
/* 如果最后一行是3个元素 */
.list:last-child:nth-child(4n - 1) {
  margin-right: calc(24% + 4% / 3);
}
/* 如果最后一行是2个元素 */
.list:last-child:nth-child(4n - 2) {
  margin-right: calc(48% + 8% / 3);
}
/* 如果还有其他情况，则继续添加即可 */
```
