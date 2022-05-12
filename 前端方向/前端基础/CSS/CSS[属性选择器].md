<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [属性选择器的基础四用法](#%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E5%9F%BA%E7%A1%80%E5%9B%9B%E7%94%A8%E6%B3%95)
- [属性选择器的正则匹配用法](#%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E6%AD%A3%E5%88%99%E5%8C%B9%E9%85%8D%E7%94%A8%E6%B3%95)
- [高级用法](#%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 属性选择器的基础四用法

- \[attr\]: 基础用法，只要属性出现，即匹配
- \[attr=val\]:属性匹配特定值，val 可使用引号包裹，单引号双引号均可以，如果匹配的值有空格，则必须转义，或者使用引号包裹
- \[attr~=val\]:属性匹配特定单词，典型场景：匹配 class 名称，属性值使用空格分隔，分隔产生的数组中如果包含目标值，则命中

  例子：`[class~=blue]` 命中所有的 class 属性包含 blue 的元素

- \[attr|=val\]:完全匹配或开头匹配外加短横线

  例子：`[class|=btn]` 命中的元素有 `class="btn"`,`class="btn-*"` 这里的\*指的是通配，只要是以`btn-`开头的都可以匹配到

## 属性选择器的正则匹配用法

- \[attr^=regex\]:头匹配
- \[attr$=regex\]:尾匹配
- \[attr\*=regex\]:任意包含匹配

## 高级用法

匹配支持忽略大小写模式，所有匹配规则都支持忽略大小写：

```css
[class~="hidden" i] {
}
[class*="hidden" i] {
}
[class="hidden" i] {
}
```
