<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [常用 Unicode 编码值](#%E5%B8%B8%E7%94%A8-unicode-%E7%BC%96%E7%A0%81%E5%80%BC)
- [限定字体作用范围](#%E9%99%90%E5%AE%9A%E5%AD%97%E4%BD%93%E4%BD%9C%E7%94%A8%E8%8C%83%E5%9B%B4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 常用 Unicode 编码值

- 基本二次汉字：[0x4e00,0x9fa5]（或十进制[19968,40869]）。
- 数字：[0x30,0x39]（或十进制[48, 57]）。
- 小写字母：[0x61,0x7a]（或十进制[97, 122]）。
- 大写字母：[0x41,0x5a]（或十进制[65, 90]）

## 限定字体作用范围

```css
@font-face {
  font-family: Emoji;
  src: local("Apple Color Emoji"), local("Segoe UI Emoji"), local(
      "Segoe UI Symbol"
    ), local("Noto Color Emoji");
  /* 该字体仅在特定范围呢起作用 */
  unicode-range: U+1F000-1F644, U+203C-3299;
}
```
