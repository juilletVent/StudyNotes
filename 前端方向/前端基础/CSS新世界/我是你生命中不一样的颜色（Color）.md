## CSS Level 4 下支持的全部色值

<img src="../../../img/CSS色卡.png" />

## CSS 与 SVG、Canvas 渲染的差异

CSS 中半透明到不透明的过渡算法仅计算 Alpha 通道，不会变动色值部分，而 SVG、Canvas 中色值部分是会参与渐变的差值运算的，这可能会导致中间颜色并不符合你的预期

### 解决办法

在 SVG、Canse 中不要使用 transparent 关键字，而使用完整的颜色描述，并且色值部分（除了 Alpha 通道外的部分），起始点与终止点的颜色设置成一样的，就可以规避这个问题了

## currentColor

指代当前元素的 color 属性值，SVG、box-shadow 等 CSS 属性可以轻松借助这个关键字进行泛用性很强的颜色控制且无可替代

## HSL 简单记忆

- red=0deg、green=120deg、blue=240deg
- 饱和度和亮度的值是任意的，最终解析的数值范围均在 0%-100%，数值后面的百分号一定不能少，否则整个语句无效
