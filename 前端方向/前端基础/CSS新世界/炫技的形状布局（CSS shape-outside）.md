## 相关属性与基础

因为使用的是环绕效果，所以 floa 是前提条件，被环绕的元素需要设置 float，并指定 shape-outside 来实现形状布局

### shape-outside

> 基础盒模型边界

指定形状布局表现形式，取值：`none、margin-box、borderbox、padding-box、content-box`，表示文字环绕时的边界在哪里

> 形状函数边界

还可以使用形状函数进行边界设定，clip-path 支持的形状函数，他都支持

- circle()表示圆。
- ellipse()表示椭圆。
- inset()表示内矩形（包括圆角矩形）。
- polygon()表示多边形。

> 图形边界

```css
.shape {
  float: left;
  width: 200px;
  height: 300px;
  /* 文字环绕这个鹦鹉 */
  shape-outside: url(./birds.png);
  /* 鹦鹉赋色并显示 */
  background-color: #cd0000;
  /* mask 用于控制背景色只显示图片范围内的部分 */
  mask: url(./birds.png) no-repeat;
}
```
