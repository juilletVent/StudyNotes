## 基本用法

```css
@media only screen and (max-width: 480px) {
  aside {
    display: none;
  }
}
```

这个样例由这些部分构成：

- 媒体查询修饰符 only；
- 媒体类型 screen；
- 媒体条件 and；
- 媒体特性 max-width

### 媒体查询修饰符

CSS 媒体查询有两个修饰符，一个是 only，另一个是 not，其中 not 表示否定的意思，not 否定的不是媒体类型，而是后面整个查询语句

举个栗子：

```css
/* 这里的not不是指除了屏幕之外的其他设备，而是指，命中整条规则之外的其他设备：如果是不是彩色屏幕则命中规则 */
@media not screen and (color) {
  /* something... */
}
```

> 关于 only

only 修饰符很有意思，它本身并没有任何效果，将其去掉或加上，最终效果是没有任何变化，在现代浏览器中没有任何理由使用 only，直接删除就行了

_历史背景：在很早的时候，浏览器就已经开始支持@media 规则了，当年它还被用来区分 IE7 浏览器和 IE8 浏览器。这些老旧的浏览器有一个“坏习惯”，它们会忽视无法识别的媒体条件和媒体特性，例如，会把 screen and (color)识别成 screen，这很容易产生致命的样式问题。于是，为了让老旧的浏览器干脆不要识别一些新的查询语句，就设计了 only 修饰符，放在媒体类型的前面。这样 only screen and (color)查询语句中的 CSS 代码就再也不会被老旧的浏览器解析了，因为这些老旧的浏览器认为 only 是非法的。_

### 媒体类型

记住下面这几个值就行了，其他的值用处不大

- screen
- print
- all

**Tips:可以书写多个值（`@media screen, print { ... }`）**

### 媒体条件

媒体条件有 3 个，即 not、and 和 or

not 是针对整条语句起作用，因此这样的写法是非法的:`screen not (color)`

### 媒体特性

- aspect-ratio:可视区域的宽度和高度的比例
- color:0 则表示墨水瓶
- width/height:设备宽高，比较常用
