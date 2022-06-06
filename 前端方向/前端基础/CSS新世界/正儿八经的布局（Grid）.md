# Grid 布局

### 属性索引

| 作用在容器上的        | 作用在子项上的    |
| --------------------- | ----------------- |
|                       |                   |
| grid-template-columns | grid-column-start |
| grid-template-rows    | grid-column-end   |
| grid-template-areas   | grid-row-start    |
| grid-template         | grid-row-end      |
| grid-column-gap       | grid-column       |
| grid-row-gap          | grid-row          |
| grid-gap              | grid-area         |
| justify-items         | justify-self      |
| align-items           | align-self        |
| place-items           | place-self        |
| justify-content       |                   |
| align-content         |                   |
| place-content         |                   |
| grid-auto-columns     |                   |
| grid-auto-rows        |                   |
| grid-auto-flow        |                   |
| grid                  |                   |

## Grid 行列布局基础（grid-template-columns、grid-template-rows）

基础样例：

```css
.container {
  grid-template-columns: 80px auto 100px;
  grid-template-rows: 25% 100px auto 60px;
}
/* 缩写形式 */
.container {
  /* 先行后列 */
  grid-template: 25% 100px auto 60px / 80px auto 100px;
  /* 这样也是可以的 */
  grid: 25% 100px auto 60px / 80px auto 100px;
}
```

效果:

<img src="../../../img/grid-1.png" style="width:450px;border-radius:10px">

## 行列布局进阶（命名）

基础语法：`grid-template-columns: <line-name> <track-size> ...;`,grid-template-rows 与 columns 一样，命名还可以更加精细化的命名：

```css
.container {
  grid-template-columns:
    [广告区-左] 120px [广告区-右 内容区-左]
    600px [内容区-右];
}
```

### track-size 的取值

_Tips:justify-content 和 min-width/max-width 可以改变元素的尺寸上下限_

- min-content：所有列中最大的那个最小内容宽度（如果 min-width 更大，则使用 min-width）
- max-content：所有列中最大的那个最大内容宽度
- auto：根据 max-content、justify-content、元素最小宽度、min-width 联合计算元素宽度
- fr：是 fraction 的缩写，与 flex 的权重表现基本一样：如果总和超过 1，则按比例分配宽度，如果总和小于 1，则元素宽度等于剩余可分配宽度乘以设置的 fr 数值（最终的宽度会小于容器宽度，有留白）
- 固定尺寸：100px，其他自动计算的宽度都是在减去固定宽度之后计算的
- minmax(min,max)：表示尺寸范围限制在 min ~ max 范围内（以 fr 为单位的值，只能作为第二个参数出现）
- fit-content：尺寸由内容决定，内容越多尺寸越大，但不超过限定的尺寸
- repeat：组合使用 minmax、fit-content、fr 的简写

### 混合使用 auto

fr 值的可自动分配尺寸是容器尺寸减去设置 auto 关键字的列的 fit-content 尺寸,然后按照 fr 的规则去分配，设置 fr 的列分配完成后，剩余的尺寸再交给 auto 列走 auto 的计算规则进行分配

## fit-content 函数

整体表现就是：尺寸由内容决定，内容越多尺寸越大，但不超过限定的尺寸，不支持 fr

语法：`fit-content( [ <length> | <percentage> ] )`

计算公式：`fit-content(limit) = max(minimum, min(limit, max-content))`

- minimum：是尺寸下限，如果不考虑 min-width/minheight 属性，这个尺寸就是最小内容尺寸
- max-content：最大内容宽度

> 事实上，fit-content()函数的表现和 fit- content 关键字的表现都是一样的，fit-content 的尺寸表现也是宽度随着内容变化，但是尺寸最大不超过包含块（通常是父元素）的尺寸。但在网格布局中，往往多项并存，多个元素共享一个包含块元素，因此 fitcontent 尺寸是没有任何意义的，只能通过参数限制尺寸的上限，于是才有了 fit-content()函数

## repeat 函数

语法：`repeat( [ <positive-integer> | auto-fill | auto-fit ] , <tracklist> )`

auto-fill 和 auto-fit 相当于一个变量，表示一个不确定的重复次数，究竟重复多少次，是由 grid 容器和每一个 grid 子项的尺寸计算得到的

### repeat()函数可以与长度值和百分比值一起使用

应用场景比较少，样例代码：

```css
.container {
  /* 有效：倒数第二列100px宽、倒数第一列宽度为20% */
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) 100px 20%;
}
```

### auto-fil 与 auto-full 的区别

- auto-fit：所有的子元素以及间距将会占据全部剩余空间（符合常规布局表现、元素效果优先）
- auto-full：子元素不会占据全部的剩余空间，相反，Grid 网格将会尽可能的将剩余空间与现有元素综合起来尽可能的将网格空间容纳尽可能多的格子，然后将子元素容纳进去，剩余空间则放置空盒子

### 兼容性

在 Firefox 浏览器中，grid-template-rows 属性对 repeat()函数仅仅是部分支持，**不支持的是 auto-fill 和 auto-fit 这两个关键字参数**，grid-template-columns 属性对 repeat()函数则是完全支持的。

## 隐式网格声明

grid-auto-columns 属性和 grid-auto-rows 属性就是用来控制“隐式网格”的尺寸的，语法与 grid-template-rows、grid-template-columns 基本一致

## Grid 缩写

如果没有多余的隐式网格，则没多大必要使用 grid 缩写，启用缩写主要是使用 auto 相关的布局属性值

```css
grid: 100px 300px / 3fr 1fr;
/* 等同于 */
grid-template-rows: 100px 300px;
grid-template-columns: 3fr 1fr;
```

```css
grid: auto-flow dense 100px / 1fr 2fr;
/* 等同于 */
grid-auto-flow: row dense;
grid-auto-rows: 100px;
grid-template-columns: 1fr 2fr;

grid: 100px 300px / auto-flow 200px;
/* 等同于 */
grid-template-rows: 100px 300px;
grid-auto-flow: column;
grid-auto-columns: 200px;
```

## 网格间距 Gap

```css
.container {
  gap: 10px;
  /* 或者 */
  gap: 10px 12px;
}
```

## 非常重要的各种对齐属性

- justify-items：水平对齐控制（stretch|start|end|enter）
- align-items：垂直对其控制（stretch|start|end|enter）

### 缩写

```css
place-items: <align-items> <justify-items>;
```
