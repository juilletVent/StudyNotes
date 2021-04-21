<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [常用滚动条属性](#%E5%B8%B8%E7%94%A8%E6%BB%9A%E5%8A%A8%E6%9D%A1%E5%B1%9E%E6%80%A7)
- [滚动事件](#%E6%BB%9A%E5%8A%A8%E4%BA%8B%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 常用滚动条属性

- $('.menu-content')[0].scrollHeight 元素的全部高度包括溢出高度
- $('.menu-content').scrollTop()  元素的滚动条已经滚动的距离
- $('.menu-content').height()  元素自身显示的高度，不包含溢出的高度

## 滚动事件

事件名

- FireFox DOMMouseScroll
- 其他	mousewheel

滚动方向

- FireFox detail 向上为 -3 向下为 +3
- 其他 	wheelDelta 向上为 正值 向下为 负值

注意：判断是否抵达底部的时候最好加上2个冗余避免超过临界值

**注意：存在嵌套滚动条的时候，内部滚动条如果想要隔离事件，一定要阻止事件冒泡**

**Tips：Jquery 的事件对象下有一个originalEvent，表示原生JS事件对象**