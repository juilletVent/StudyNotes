<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [相关属性与基础](#%E7%9B%B8%E5%85%B3%E5%B1%9E%E6%80%A7%E4%B8%8E%E5%9F%BA%E7%A1%80)
- [shape-imagethreshold](#shape-imagethreshold)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 相关属性与基础

因为使用的是环绕效果，所以 floa 是前提条件，被环绕的元素需要设置 float，并指定 shape-outside 来实现形状布局

- shape-outside：边界判定模式
- **shape-imagethreshold**：边界判定的半透明阈值（shape-image-threshold 指图像环绕时候的半透明阈值，默认是 0.0，也就是图像透明度为 0 的区域边界才能被文字环绕。同理，如果属性值是 0.5，则表示透明度小于 0.5 的区域都可以被文字环绕）
- shape-margin：环绕文字距离控制边界的距离

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

## shape-imagethreshold

着重说一下 shape-imagethreshold 属性，这个属性可以控制边界判定对于半透明遮罩的判定行为，指定 0.5 则低于 0.5 透明度的区域判定为透明，文字可以进入，否则判定为不透明，文字不可以进入；配合半透明渐变、径向半透明渐变，半透明图片，可以实现丰富且灵活的环绕效果
