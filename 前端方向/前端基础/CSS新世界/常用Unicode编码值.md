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
