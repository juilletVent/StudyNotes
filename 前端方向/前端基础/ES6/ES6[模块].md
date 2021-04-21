<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [ES6 模块](#es6-%E6%A8%A1%E5%9D%97)
  - [模块导出](#%E6%A8%A1%E5%9D%97%E5%AF%BC%E5%87%BA)
      - [命名导出](#%E5%91%BD%E5%90%8D%E5%AF%BC%E5%87%BA)
      - [默认导出](#%E9%BB%98%E8%AE%A4%E5%AF%BC%E5%87%BA)
  - [模块导入](#%E6%A8%A1%E5%9D%97%E5%AF%BC%E5%85%A5)
  - [复合写法](#%E5%A4%8D%E5%90%88%E5%86%99%E6%B3%95)
  - [ES6 与 CommonJS的区别](#es6-%E4%B8%8E-commonjs%E7%9A%84%E5%8C%BA%E5%88%AB)
    - [1、模块引入支持的区别](#1%E6%A8%A1%E5%9D%97%E5%BC%95%E5%85%A5%E6%94%AF%E6%8C%81%E7%9A%84%E5%8C%BA%E5%88%AB)
    - [2、模块引入后对值的处理策略](#2%E6%A8%A1%E5%9D%97%E5%BC%95%E5%85%A5%E5%90%8E%E5%AF%B9%E5%80%BC%E7%9A%84%E5%A4%84%E7%90%86%E7%AD%96%E7%95%A5)
    - [3、处理循环引用](#3%E5%A4%84%E7%90%86%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ES6 模块

## 模块导出

#### 命名导出

方法一：

```javascript
export const a = 1;
```

方法二

```javascript
const a = 1;

export { a };
# 使用别名导出
export { a as ailas }
```

#### 默认导出

**Tips:默认导出只能有一个**

```JavaScript
const = 1;
export default a;
```

Tips：所有导出的模块都是 readonly 的，不可修改

## 模块导入

```javascript
// 默认导出的模块
import a from "./a";
// 命名导出的模块
import { a } from "./a";
// 导入重命名
import { a as alias } from "./a";
// 整体导入
import * as moduleAlias from "./a";
// 混合使用,默认导出必须写到首位
import React, { Component } from "react";
```

模块整体导入，会将所有导出的元素挂载到我们指定的对象名下，如果一个模块同时具备命名导出以及默认导出，则使用整体导入后会的到一个类似下面样例的一个对象：

```javascript
{
  // 默认导出会使用default作为键
  default:{c:3}
  // 命名导出
  a:1,
  b:2
}
```

## 复合写法

对于模块入口文件等场景，需要将模块导入进来，然后统一导出，此时可以这样写：

```javascript
// 引入后即刻导出
export { utilA, utilsB } from "./test";
```

这种导出方法只支持命名导出，不支持默认导出，默认导出仍然需要拆分导入导出：

```javascript
import a from "./";

export { a };
// or
export default a;
```

## ES6 与 CommonJS的区别

### 1、模块引入支持的区别

CommonJS与ES6在引入文件时，最大的区别在于，CommonJS的模块引入为动态引入，模块依赖建立是在代码运行时建立的，而ES6则为静态引入，在代码编译打包阶段就可以构建依赖树，因此ES6可以更好的做到死代码检测、排除；但是对于需要进行动态加载的场景，CommonJS则更加灵活。

require支持接收表达式作为入参，且使用域可以不是顶层作用域，而import则不支持表达式引入，且使用作用域也必须是顶级作用域

### 2、模块引入后对值的处理策略

commonJS对于模块引入的值处理方式为：拷贝，并且允许修改拷贝的副本，修改副本的值不会影响到模块中定义的原始值；

ES6对于模块引入的值处理方式为：映射，不允许修改引入的值，所有引入的位置共享同一个模块数据源，如果调用模块方法，变更了模块内部的数据定义，则所有引入模块的位置都能观测到相关变化。**再次说明：模块内的值，外部无法修改，只能通过模块暴露出去的方法间接操作。**

### 3、处理循环引用

commonJS中如果模块存在循环引入，则循环引用的循环链中，引入的模块至少有一个引入会被设置为`{}`空对象，这是因为CommonJS在进行模块加载时，判断模块是否已经加载，如果为首次加载，则先创建一个空对象作为模块的exports，然后执行模块加载，此时如果出现循环引用，则会取到该值为空对象，并且由于引入值的处理方式为拷贝副本，当模块实际加载完成后，引入的值得不到更新，所以最终会造成取值错误。

> 可以查看webpack打包出来后的bundle.js，检索：

    <!-- webpack的模块引入定义函数 -->
    function __webpack_require__(moduleId)

ES6中模块引入未完成时，模块的导出值为undefined，但是由于ES6的模块引入采用的是映射模式的赋值，在模块完全加载后所有的映射都能取得正确的值（共享一份），所以，如果在引入阶段存在循环引用，只要没有发生实际调用，则不会出现问题。如果引入未完成时发生了函数调用、取值判断，则会发生异常或者逻辑错误。

**Tips：可以看出不管是哪种规范，面对循环引用都存在很大的编码风险，因此应尽可能的规避循环引用。**

