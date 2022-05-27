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

# Grid 布局
