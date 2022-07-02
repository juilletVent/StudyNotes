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

CSS Properties & Values API 可以用来精确定义自定义属性的类型、默认值和是否具有继承性

在 JavaScript 中通过 CSS.registerProperty()方法进行定义，在 CSS 中则使用@property 规则进行定义

其中 CSS.registerProperty()方法从 Chrome 78 版本开始支持，而@property 规则从 Chrome 85 版本开始支持（**只要浏览器支持@property 规则，就没有必要使用 CSS.registerProperty()方法了**）

典型应用场景：CSS Properties & Values API 的经典应用就是让 CSS 渐变背景支持 transition 过渡效果或者 animation 动画效果

> 语法

共计四个参数：

- name：要注册的 CSS 变量名（两个短横线开头）
- syntax：值语法（CSS 数据类型，比如：`<color> <length> <integer> <number> <percentage> <length-percentage>`）
- inherits：继承性
- initialValue：初始值

css 中使用@property 进行注册，JS 中使用 window.CSS.registerProperty 进行注册

常规实现（没有动画效果）：

```html
<canvas class="default"></canvas>
<style>
  .default {
    --start-color: deepskyblue;
    --end-color: deeppink;
    background: linear-gradient(var(--start-color), var(--endcolor));
    transition: --start-color 0.5s, --end-color 0.5s;
  }
  .default:hover,
  .default:active {
    --end-color: deepskyblue;
    --start-color: deeppink;
  }
</style>
```

借助 CSS Properties & Values API（有动画效果）：

```html
<canvas class="registered"></canvas>
```

```css
@property --start-color-register {
  syntax: "<color>";
  inherits: false;
  initial-value: #000000;
}
@property --end-color-register {
  syntax: "<color>";
  inherits: false;
  initial-value: #000000;
}
.registered {
  --start-color-register: deepskyblue;
  --end-color-register: deeppink;
  background: linear-gradient(
    var(--start-color-register),
    var(-- end-color-register)
  );
  transition: --start-color-register 0.5s, --end-color-register 0.5s;
}
.registered:hover,
.registered:active {
  --start-color-register: deeppink;
  --end-color-register: deepskyblue;
}
```

改用 JS 进行定义：

```js
if ("registerProperty" in window.CSS) {
  CSS.registerProperty({
    name: "--start-color-register",
    syntax: "<color>",
    inherits: false,
    initialValue: "black",
  });
  CSS.registerProperty({
    name: "--end-color-register",
    syntax: "<color>",
    inherits: false,
    initialValue: "black",
  });
}
```

## CSS Parser API （了解即可，API 尚处于早起雏形阶段，并不稳定，实用价值不高）

CSS Parser API 是一个公开的、可以直接解析 CSS 或类似 CSS 语言的 API，开发者能够自己创造 CSS 语法，通过 CSS Parser API 进行解析和应用，从而满足各类需求

1. CSS 规则集解析

```js
var background = window.cssParse.rule("background: green");
console.log(background.styleMap.get("background").value);
// "green"
var styles = window.cssParse.ruleSet(".foo { background: green;margin: 5px; }");
console.log(styles.length); // 5
console.log(styles[0].styleMap.get("margin-top").value); // 5
console.log(styles[0].styleMap.get("margin-top").type); // "px
```

2. 解析样式文件

```js
const style = fetch("style.css").then((response) =>
  CSS.parseStylesheet(response.body)
);
style.then(console.log);
```

## CSS Layout API

用于创造自定义布局的，支持性不好，尚处于试验阶段，学习成本也比较高，暂时不值得投入精力去学习。

## CSS Typed OM （兼容性堪忧，Firefox、Safari 不支持）

帮助获取 DOM 中的 CSS 属性值，过去，我们对 CSS 样式进行处理的方法是使用 HTMLElement.style 或者使用 getComputedStyle(dom)，然而这两个方法返回的值常常需要进行二次处理，比较麻烦：

```js
/* 
返回的值可能是关键字属性值“normal”，也可能是长度值字符
串，例如“20px”。实际开发的时候我们需要的仅仅是前面的数值20，
于是我们就需要对CSS属性值进行二次解析处理，先判断它是不是关
键字属性值，如果是长度值还需要提取前面的数值，比较麻烦，而且
对性能也是有影响的
*/
console.log(getComputedStyle(document.body).lineHeight);
```

使用 CSS Typed OM 就不会出现上面的问题。例如，在 CSS TypedOM 中，样式的获取使用的是 computedStyleMap()方法，代码如下：

```js
const styleMap = document.body.computedStyleMap();
const cssValue = styleMap.get("line-height");
```

此时 cssValue 可能是 CSSKeywordValue 对象（关键字属性值），也可能是 CSSUnitValue 对象（长度值）

## Animation Worklet；

投入产出比不佳

## Font Metrics API

投入产出比不佳
