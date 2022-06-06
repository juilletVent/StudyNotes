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

## 使用 place-items 简写 justify-content 与 align-item

```css
place-items: center flex-end;
/* 等价于 */
justify-content: flex-start;
align-items: center;
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

## Flex 布局技巧

- justify-conetnt:space-between 时，最后一行左对齐（最后一个元素设置 margin-left:auto 即可，前提是 item 元素没有设置 flex-grow）
- 第一项的布局技巧可以使用 after 伪元素，然后设置 flex:auto 同样可以实现（前提条件一样）
