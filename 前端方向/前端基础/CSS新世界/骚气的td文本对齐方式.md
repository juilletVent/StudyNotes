<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [text-align 在 td 中的炫技](#text-align-%E5%9C%A8-td-%E4%B8%AD%E7%9A%84%E7%82%AB%E6%8A%80)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## text-align 在 td 中的炫技

单元格的 td 中，`text-align`可以设置一种特殊的对齐方式：

```css
text-align: "." center;
```

```html
<table>
  <colgroup>
    <col width="40" />
  </colgroup>
  <tr>
    <th>长途电话费用</th>
  </tr>
  <tr>
    <td>¥1.30</td>
  </tr>
  <tr>
    <td>¥2.50</td>
  </tr>
  <tr>
    <td>¥10.80</td>
  </tr>
  <tr>
    <td>¥111.01</td>
  </tr>
  <tr>
    <td>¥85.</td>
  </tr>
  <tr>
    <td>N/A</td>
  </tr>
  <tr>
    <td>¥.05</td>
  </tr>
</table>
```

表现如下：

```
+---------------------+
|     长途电话费用     |
+---------------------+
|        ¥1.30        |
|        ¥2.50        |
|       ¥10.80        |
|      ¥111.01        |
|       ¥85.          |
|       N/A           |
|         ¥.05        |
|         ¥.06        |
+---------------------+
```

大概意思就是根据指定的字符进行对齐，指定的字符只能是单个字符，指定多个字符无效
