<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS 层叠上下文的创建](#css-%E5%B1%82%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9A%84%E5%88%9B%E5%BB%BA)
- [哪些属性可以创建新的上下文](#%E5%93%AA%E4%BA%9B%E5%B1%9E%E6%80%A7%E5%8F%AF%E4%BB%A5%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E4%B8%8A%E4%B8%8B%E6%96%87)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## CSS 层叠上下文的创建

- 页面 HTML 根元素天然具有根 CSS 上下文
- z-index 为数值的定位元素
- 其他 CSS 属性创建的上下文

## 哪些属性可以创建新的上下文

- position:fixed 的元素（在 Chrome 下测试是创建的了新的 CSS 上下文的 2022-05-15 15:05:48）
- z-index 值不为 auto 的 flex 项(父元素 display:flex|inline-flex)(新创建的层叠上下文是子元素，不是父元素！！！)
- 元素的 opacity 值不是 1.
- 元素的 transform 值不是 none.
- 元素 mix-blend-mode 值不是 normal.
- 元素的 filter 值不是 none.
- 元素的 isolation 值是 isolate.
- will-change 指定的属性值为上面任意一个。
- 元素的-webkit-overflow-scrolling 设为 touch.
