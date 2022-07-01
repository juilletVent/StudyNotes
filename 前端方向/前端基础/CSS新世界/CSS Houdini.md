## CSS Paint API

注册 CSS Paint 固定套路：

1. 定义（固定套路）（文件：paint-grid.js）

```js
// transparent-grid命名和CSS中的对应
registerPaint(
  "transparent-grid",
  class {
    paint(context, size, properties) {
      // 两个格子颜色
      var color1 = "#fff",
        color2 = "#eee";
      // 两个白色格子
      context.fillStyle = color1;
      context.fillRect(0, 0, 8, 8);
      context.fillRect(8, 8, 8, 8);
      // 两个灰色格子
      context.fillStyle = color1;
      context.fillRect(0, 4, 8, 8);
      context.fillRect(4, 0, 8, 8);
    }
  }
);
```

2. 注册

```js
if ("paintWorklet" in window.CSS) {
  // 需要着重注意，此处的js必须使用模块加载的形式引入，什么意思呢？
  // 就是说，此处引用的js文件路径必须是一个有效的静态资源描述，不能是模块打包系统处理过的内联模块引用
  // 比如此处如果外部系统使用的是Webpack打包，直接使用import静态引入或者require动态引入，都将导致报错
  // 解决方式有两种：简单点，使用内联loader用法+file-loader强行将js文件当成普通文件进行打包
  // 写法样例：
  // 加载
  // import cssPaint from "!!file-loader?modules!./CssPaint.js";
  // 使用
  // CSS.paintWorklet.addModule(cssPaint);
  // 下面这一行为传统写法，前提是没有打包系统参与
  CSS.paintWorklet.addModule("./paint-grid.js");
}
```

3. 使用

```css
width: 180px;
height: 180px;
background-image: paint(transparent-grid);
background-repeat: repeat repeat;
/* 此处的size会传递进入paint函数中，传递给size参数 */
background-size: 16px 16px;
```

> 关于 paint 函数的三个参数

- context 绘制上下文，基本等同于 Canvas 绘图上下文，处于安全原因，被阉割调一些 API
- size 背景的尺寸，对应用 background-size 的计算值
- properties 可以用来获得获取到的 CSS 属性和 CSS 属性值，包括 CSS 变量值和其他一些参数

> 关于 CSS Paint API 的优势

CSS Paint API 的优势在于：它作为一个 CSS 属性值，渲染是实时的，它会自动跟随浏览器的重绘机制进行渲染。因此，只要我们的绘制的参数和 CSS 变量相关联，那么只需要修改 CSS 变量值，所有绘制效果就会实时刷新，这可就有趣多啦！

如果只是需要一张静态的背景图，则使用 Canvas 绘制，然后转乘 base64 或者 blob（toDataURL）后更好

> CSS 变量让 CSS Paint API 如虎添翼

只需要动态改变 CSS 变量即可实现地图的动态绘制，这也是为什么 CSS 变量需要预先声明在 inputProperties 中

样例：

```js
// 定义
/* eslint-disable */
registerPaint(
  "transparent-grid",
  class {
    // 必须声明，不声明的话，paint中获取不到对应的变量
    static get inputProperties() {
      return ["--color1", "--color2", "--units"];
    }
    paint(context, size, properties) {
      // 两个格子颜色
      var color1 = properties.get("--color1").toString();
      var color2 = properties.get("--color2").toString();
      // 格子尺寸
      var units = Number(properties.get("--units"));

      context.fillStyle = color1;
      context.fillRect(0, 0, units, units);
      context.fillRect(units, units, units, units);
      // 两个灰色格子
      context.fillStyle = color2;
      context.fillRect(0, units, units, units);
      context.fillRect(units, 0, units, units);
    }
  }
);

// 使用
export const CssPainTest = styled.div`
  --color1: #fff;
  --color2: #eee;
  --units: 16;
  margin: 15px 0;
  width: 400px;
  height: 400px;
  background-image: paint(transparent-grid);
  background-size: calc(var(--units) * 2px) calc(var(--units) * 2px);
  background-repeat: repeat repeat;
`;
```

## CSS Properties & Values API

## CSS Parser API

## CSS Layout API

## CSS Typed OM

## Animation Worklet；

## Font Metrics API
