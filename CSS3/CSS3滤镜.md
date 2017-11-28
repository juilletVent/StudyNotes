# CSS3 滤镜

filter：其默认值是none，他不具备继承性 注意浏览器前缀

语法：filter: none | <filter-function > [ <filter-function> ]

使用实例：-webkit-filter:grayscale(1);

函数列表：

- grayscale(n)：灰度滤镜 取值[0-1]，数值越高越偏向黑白图片
- sepia(n):褐色滤镜 取值[0-1]，数值越高褐色越明显
- saturate(n):饱和度[0-n],可以过饱和
- hue-rotate(n deg):色相反转，使用角度改变色相
- invert(n):反色[0-1]，效果就像是我们照相机底面
- opacity(n):透明度[0-1]
- brightness(n):亮度[0-n],可以过亮
- contrast(n):对比度[0-n],可以过对比
- blur(n px):模糊[n 模糊半径，px单位]
- drop-shadow(x偏移, y偏移, 模糊大小, 色值):阴影，与box-shadow有很大区别，支持元素内的透明穿透，而box-shadow仅仅对盒子产生阴影，此属性不支持叠加，box-shadow支持叠加














