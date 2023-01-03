<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [filter 滤镜](#filter-%E6%BB%A4%E9%95%9C)
  - [blur 高斯模糊](#blur-%E9%AB%98%E6%96%AF%E6%A8%A1%E7%B3%8A)
  - [brightness 亮度](#brightness-%E4%BA%AE%E5%BA%A6)
  - [drop-shadow 自然投影](#drop-shadow-%E8%87%AA%E7%84%B6%E6%8A%95%E5%BD%B1)
  - [grayscale 灰度滤镜](#grayscale-%E7%81%B0%E5%BA%A6%E6%BB%A4%E9%95%9C)
  - [hue-rotate 色相滤镜 与 invert 反相滤镜](#hue-rotate-%E8%89%B2%E7%9B%B8%E6%BB%A4%E9%95%9C-%E4%B8%8E-invert-%E5%8F%8D%E7%9B%B8%E6%BB%A4%E9%95%9C)
  - [sepia 褐色](#sepia-%E8%A4%90%E8%89%B2)
- [backdrop-filter 背景虚化（毛玻璃）](#backdrop-filter-%E8%83%8C%E6%99%AF%E8%99%9A%E5%8C%96%E6%AF%9B%E7%8E%BB%E7%92%83)
- [CSS 混合模式](#css-%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
  - [background-blend-mode](#background-blend-mode)
  - [mix-blend-mode](#mix-blend-mode)
  - [isolation](#isolation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## filter 滤镜

| 滤镜                                 | 释义     |
| ------------------------------------ | -------- |
| filter:blur(5px)                     | 模糊     |
| filter:brightness(2.4)               | 亮度     |
| filter:contrast(200%)                | 对比度   |
| filter:drop-shadow(4px 4px 8px blue) | 投影     |
| filter:grayscale(50%)                | 灰度     |
| filter:hue-rotate(90deg)             | 色调旋转 |
| filter:invert(75%)                   | 反相     |
| filter:opacity(25%)                  | 透明度   |
| filter:saturate(230%)                | 饱和度   |
| filter:sepia(60%)                    | 褐色     |

### blur 高斯模糊

- blur()函数支持任意长度值，但是**不支持百分比值**
- blur()函数的参数值表示高斯函数的标准偏差值，可以理解为屏幕上互相融合的像素数量。因此，blur()函数的参数值越大，图像的模糊效果越明显

> 解决模糊图片边缘泛白的问题

- 在高斯模糊的图片下面再增加一张同样的、没有设置高斯模糊的图片
- 适当放大图片
- 使用 backdrop-filter，默认就不会出现边缘泛白的问题

### brightness 亮度

brightness()函数的参数值支持数值和百分比值，范围是 0 到无穷大。参数值 0 或 0%表示纯黑色，参数值 1 或 100%表示正常的亮度，0 ～ 1 或 0%～ 100%的亮度是线性变化的。随着参数值逐渐大于 1 或大于 100%，元素的亮度也会逐渐提升。

> 典型应用场景：图标反色

```css
/* 如果图标的默认颜色是黑色，则应用下面的样式就可以实现相对的白色图标 */
.button-primary .icon {
  filter: brightness(100);
}
/* 如果图标的默认颜色是浅色，则应用下面的样式就可以实现相对的黑色图标 */
.button-primary .icon {
  filter: brightness(0);
}
```

### drop-shadow 自然投影

对比 box-shadow 有以下特点

- 不支持阴影扩展、不支持内阴影、不支持多阴影叠加
- 符合真实世界投影规则，元素不规则的部分，以及镂空的部分都能表现出符合直觉的投影效果，而 box-shadow 仅仅作用在 border-box 周围，并且不响应镂空以及不规则的部分

### grayscale 灰度滤镜

使用 grayscale()函数可以实现元素的去色效果，让所有彩色值变成灰度值

```css
img {
  filter: grayscale(70%);
  /* 等同于grayscale(0.7) */
}
```

典型应用场景：特殊时间的全站灰色、成就系统的图标点亮

### hue-rotate 色相滤镜 与 invert 反相滤镜

对于生成一组明度、饱和度一样的颜色比较有用，可以快速构建风格一致的 UI 效果

```css
.btn {
  background-color: #1890ff;
}
.btn-1 {
  filter: hue-rotate(60deg);
}
.btn-2 {
  filter: hue-rotate(70deg);
}
.btn-3 {
  filter: hue-rotate(80deg);
}
```

invert 函数时对明度与色调的同时翻转，会 180 度翻转色相以及翻转明度信息，因此一个简单的深色模式实现（图片的效果不好，需要额外排除），其原理就是仅让明度信息翻转即可，后面的 hue-rotate(0.5turn)就是在恢复被 invert 翻转的色相：

```css
filter: invert(1) hue-rotate(0.5turn);
```

### sepia 褐色

主要用来实现老照片效果，没有其他应用场景

## backdrop-filter 背景虚化（毛玻璃）

语法与 filter 一致，不过与 filter 作用的对象不一样；backdrop-filter 作用在所设置的对象所在区域的透出来的效果；说人话就是这个属性用于控制元素透出的底下的背景如何应用滤镜，因此：**设置的元素必须是半透明或者全透明的，否则看不到任何效果。**

_Tips：filter 在应用高斯模糊时，图像边缘会拓展计算，超出图像外，造成边缘羽化的效果，如果不想要，则可以换成 backdrop-filter 属性_

举个栗子：

```css
/* 遮罩背景毛玻璃效果 */
dialog {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
```

**避坑：对于 backdrop-filter 属性，请勿使用 opacity()函数作为属性值，有 BUG**

## CSS 混合模式

相关 CSS 属性：

- background-blend-mode 属性用于混合元素背景图案、渐变和颜色；
- mix-blend-mode 属性用于元素与元素之间的混合；
- isolation 属性用在祖先元素上，限制 mix-blend-mode 属性设置的混合模式的应用范围。

可选的混合模式：

| 类型        | 释义     |
| ----------- | -------- |
| normal      | 正常     |
| multiply    | 正片叠底 |
| screen      | 滤色     |
| overlay     | 叠加     |
| darken      | 变暗     |
| lighten     | 变亮     |
| color-dodge | 颜色变淡 |
| color-burn  | 颜色加深 |
| hard-light  | 强光     |
| soft-light  | 柔光     |
| difference  | 差值     |
| exclusion   | 排除     |
| hue         | 色调     |
| saturation  | 饱和度   |
| color       | 颜色     |
| luminosity  | 亮度     |

各个混合模式的效果简述

- **正片叠底**：正片叠底可以增强两张图像中暗的部分，其表现就像两张半透明相片叠在一起放在发光的桌子上
- **滤色**：黑色会被当做透明色，任何颜色和黑色进行滤色混合后，还是呈现原来的颜色；任何颜色和白色进行滤色混合后得到的仍是白色；任何颜色和其他颜色进行滤色混合后，颜色会更浅，有点类似漂白的效果。(对于叠放的图片，可以略去深色部分，留下浅色部分)
- **叠加**：叠加这种混合模式的底图的高光（白色）和阴影（黑色）的颜色会被保留，其他颜色的饱和度和对比度会有一定的提高，混合后的图像看起来会更鲜亮在底图色值小于或等于 128 的时候，采用了类似“正片叠底”的算法，而底图色值大于 128 的时候，采用了类似“滤色”的算法（水印、高亮文字）
- **变暗、变量**：字面意思，变暗就是重叠部分留下更暗的效果，变亮则留下更亮的部分，因此这两个模式都可以用来做不规则的裁剪，非常好用
- **颜色变淡**：颜色变淡混合模式可以用来保护底图的高光，适合处理高光下的人物照片，通过将照片和特定颜色混合，可以改变整个照片的色调（暖色调或是冷色调），而不会影响人物高光区域的细节
- **颜色加深**：颜色加深混合模式可以用来保护底图的阴影，适合处理“幽深秘境”一类的照片，通过将照片和特定颜色混合，可以营造更加幽深的氛围
- **强光**：hard-light 根据上层元素的色值判断是使用正片叠底还是滤色模式，overlay 则根据下层元素的色值进行判断（增强高光与暗部）
- **柔光**：可用于对图片进行颜色叠加，创建阳光，或者幻境颜色；相较于强光模式，着色更加自然
- **差值**：计算公式为 Math.abs(A-B)，如果叠加的颜色是白色，则显示的就是被叠加颜色的反色，可以利用这一特性创建文字的反色显示（凸显某些部分，比如文字）
- **排除**:与差值类似，对比度低一点（凸显某些部分，比如文字）
- **色调**:使用底层元素的亮度和饱和度，以及上层元素的色调
- **饱和度**:颜色保留底图的亮度和色调，并使用顶图的饱和度
- **颜色**:混合后的颜色保留底图的亮度，并使用顶图的色调和饱和度
- **亮度**:混合后的颜色保留底图的色调和饱和度，并使用顶图的亮度（当底图是渐变图像或纯色图像，而上层元素是复杂图像的时候，适合使用亮度混合模式，这和 color 模式正好相反）

**特别说明：叠加模式需要设置在叠放元素（上层元素）上，而不是被叠放元素（下层元素）上**

> 所有的这些混合模式均可作用域图片、视频中，因此某些特效可以借助混合模式外加视频元素的形式实现

### background-blend-mode

特点如下：

- background-blend-mode 属性本身就带有隔离特性，也就是一个元素应用 background- blend-mode 背景混合模式，最终的效果只会受当前元素的背景图像和背景颜色影响，不会受视觉上处于当前区域的其他任意元素影响
- 应用 background-blend-mode 属性后，不仅各张图像之间要进行混合，各张图像还要和背景色进行混合
- **多背景每个背景图层都具备独立的混合模式**，如果只写一个，则会扩展到所有图层，这对于理解背景混合非常重要

补全规则：多出的规则，直接裁掉，缺少的会重复**整个**混合规则表，不是重复最后一个混合规则

### mix-blend-mode

直接作用于元素，与元素下面的颜色效果进行混合,在默认情况下，该元素会混合 Z 轴上所有层叠顺序比其低的层叠元素

### isolation

有时候我们希望混合模式效果只应用到某一个元素或某一组元素上，isolation 便是为此而生的，将 `isolation:isolate` 设置到希望混合终止的元素上即可

实现原理：**创建 CSS 上下文进行隔离**

**因此，所有能够创建 CSS 上下文的操作方式，均可以实现混合隔离。**比如：opacity 不是 1，transform 不为 none 等等，不过在实际开发中还是建议使用 isolation:isolate，语义化也很重要，不要单纯的为了炫技而使用其他方式去创建 CSS 上下文做混合模式隔离
