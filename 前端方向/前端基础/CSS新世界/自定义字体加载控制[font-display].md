<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [对于自定义字体加载的控制 【font-display】](#%E5%AF%B9%E4%BA%8E%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AD%97%E4%BD%93%E5%8A%A0%E8%BD%BD%E7%9A%84%E6%8E%A7%E5%88%B6-font-display)
- [关于 Canvas 中字体的使用](#%E5%85%B3%E4%BA%8E-canvas-%E4%B8%AD%E5%AD%97%E4%BD%93%E7%9A%84%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 对于自定义字体加载的控制 【font-display】

- auto：字体显示策略由浏览器决定，大多数浏览器的字体显示策略类似 block。
- block：字体阻塞时段较短（推荐 3s），字体交换时段无限。此值适合图标字体场景。
- swap：字体阻塞时段极短（不超过 100ms），字体交换时段无限。此值适合用在小段文本，同时文本内容对页面非常重要的场景。
- fallback：字体阻塞时段极短（不超过 100ms），字体交换时段较短（推荐 3s）。此值适合用于大段文本，例如文章正文，同时对字体效果比较看重的场景，例如广告页面、个人网站等。optional：字体阻塞时段极短（不超过 100ms），没有字体交换时段。此值的作用可以描述为，如果字体可以瞬间被加载（例如已经被缓存了），则浏览器使用该字体，否则使用回退字体。optional 是日常 Web 产品开发更推荐的属性值，因为无论任何时候，网页内容在用户第一次访问时快速呈现是最重要的，不能让用户等待很长时间后再看到你认为的完美效果。

**总结：如果你的自定义字体是用于字体呈现，就使用 optional，否则使用默认值，至于 swap 和 fallback，如果对你而言自定义字体的效果很重要，同时你能忍受页面字体突然变化的问题，就可以使用下面的设置：**

```css
@font-face {
  font-family: MyFont;
  src: url(myfont.woff2) format("woff2");
  font-display: swap;
}
body {
  font-family: MyFont;
}
```

## 关于 Canvas 中字体的使用

在 Canvas 中如何使用自定义字体进行绘制，需要在 CSS 中先加载对应的字体，一般借助创建一个使用该自定义字体的隐藏元素加载即可，该元素必须包含 inline 子节点，空节点是无法应用字体的；

或者使用 js 进行加载

```js
document.fonts.load("12px MyFont").then(…);
```
