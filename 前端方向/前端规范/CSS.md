# css

## 通用约定

> 使用语义化、通用的命名方式；
> 使用连字符 - 作为 ID、Class 名称界定符，不要驼峰命名法和下划线；
> 避免选择器嵌套层级过多，尽量少于 3 级；
> 避免选择器和 Class、ID 叠加使用；
> 

### 声明顺序

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型决定了组件的尺寸和位置，因此排在第二位。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

    .declaration-order {
      /* Positioning */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
    
      /* Box model */
      display: block;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      margin: 10px;
      float: right;
      overflow: hidden;
    
      /* Typographic */
      font: normal 13px "Helvetica Neue", sans-serif;
      line-height: 1.5;
      text-align: center;
    
      /* Visual */
      background-color: #f5f5f5;
      color: #fff;
      opacity: .8;
    
      /* Other */
      cursor: pointer;
    }

### 引号

url() 、属性选择符、属性值使用双引号


