<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bootstrap 官方文档手记[组件]](#bootstrap-%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E6%89%8B%E8%AE%B0%E7%BB%84%E4%BB%B6)
    - [Glyphicons 字体图标](#glyphicons-%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87)
    - [下拉菜单](#%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95)
    - [按钮组](#%E6%8C%89%E9%92%AE%E7%BB%84)
    - [输入框组](#%E8%BE%93%E5%85%A5%E6%A1%86%E7%BB%84)
    - [导航-标签页](#%E5%AF%BC%E8%88%AA-%E6%A0%87%E7%AD%BE%E9%A1%B5)
    - [导航-导航条](#%E5%AF%BC%E8%88%AA-%E5%AF%BC%E8%88%AA%E6%9D%A1)
    - [标签](#%E6%A0%87%E7%AD%BE)
    - [徽章](#%E5%BE%BD%E7%AB%A0)
    - [页头[带有下划线的章节标题]](#%E9%A1%B5%E5%A4%B4%E5%B8%A6%E6%9C%89%E4%B8%8B%E5%88%92%E7%BA%BF%E7%9A%84%E7%AB%A0%E8%8A%82%E6%A0%87%E9%A2%98)
    - [巨幕](#%E5%B7%A8%E5%B9%95)
    - [警告框|提示框](#%E8%AD%A6%E5%91%8A%E6%A1%86%E6%8F%90%E7%A4%BA%E6%A1%86)
    - [进度条](#%E8%BF%9B%E5%BA%A6%E6%9D%A1)
    - [媒体对象](#%E5%AA%92%E4%BD%93%E5%AF%B9%E8%B1%A1)
    - [列表组](#%E5%88%97%E8%A1%A8%E7%BB%84)
    - [面板](#%E9%9D%A2%E6%9D%BF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bootstrap 官方文档手记[组件]

### Glyphicons 字体图标

使用类名：glyphicon glyphicon-*

如何使用：

为了设置正确的内补（padding），务必在图标和文本之间添加一个空格

**注意一：**不要和其他组件混合使用，图标类不能和其它组件直接联合使用。它们不能在同一个元素上与其他类共同存在。应该创建一个嵌套的 <span> 标签，并将图标类应用到这个 <span> 标签上

**注意二：**只对内容为空的元素起作用，图标类只能应用在不包含任何文本内容或子元素的元素上

### 下拉菜单

~~~
<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
	//设置分割线
    <li role="separator" class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
~~~

**通过为下拉菜单的父元素设置 .dropup 类，可以让菜单向上弹出（默认是向下弹出的）。**

**.dropdown-menu-right 使得菜单针对btn右对齐**

### 按钮组

添加btn-group实现按钮组

	<div class="btn-group" role="group" aria-label="...">
	  <button type="button" class="btn btn-default">Left</button>
	  <button type="button" class="btn btn-default">Middle</button>
	  <button type="button" class="btn btn-default">Right</button>
	</div>

两端对齐：
	//每个btn需要单独一组，否则无效[照顾IE8，并没有什么卵用]
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  ...
	</div>

### 输入框组

> 前后添加文字

使用input-group+input-group-addon子元素实现即可

~~~
<div class="input-group">
  <span class="input-group-addon">$</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <span class="input-group-addon">.00</span>
</div>
~~~

> 前后添加按钮：

在input-group内添加input前后添加 .input-group-btn>.btn.btn-dafault即可

### 导航-标签页

Bootstrap 中的导航组件都依赖同一个 .nav 类，状态类也是共用的。改变修饰类可以改变样式。

**注意 .nav-tabs 类依赖 .nav 基类。**

~~~
<ul class="nav nav-tabs">
  <li role="presentation" class="active"><a href="#">Home</a></li>
  <li role="presentation"><a href="#">Profile</a></li>
  <li role="presentation"><a href="#">Messages</a></li>
</ul>
~~~

- 普通样式：ul.nav-tabs
- 胶囊式标签页:ul.nav-pills
- 垂直导航：ul.nav-stacked

### 导航-导航条

导航条是在您的应用或网站中作为导航页头的响应式基础组件。它们在移动设备上可以折叠（并且可开可关），且在视口（viewport）宽度增加时逐渐变为水平展开模式。

**两端对齐的导航条导航链接已经被弃用了**

### 标签

~~~
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
~~~

### 徽章

实现消息数样的效果

~~~
<a href="#">Inbox <span class="badge">42</span></a>

<button class="btn btn-primary" type="button">
  Messages <span class="badge">4</span>
</button>
~~~

### 页头[带有下划线的章节标题]

~~~
<div class="page-header">
  <h1>Example page header <small>Subtext for header</small></h1>
</div>
~~~

### 巨幕

~~~
<div class="jumbotron">
	<div class="container">
		<h1>Hello, world!</h1>
		<p>...</p>
		<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
	</div>
</div>
~~~

### 警告框|提示框

~~~
<div class="alert alert-success" role="alert">...</div>
<div class="alert alert-info" role="alert">...</div>
<div class="alert alert-warning" role="alert">...</div>
<div class="alert alert-danger" role="alert">...</div>
~~~

> 警告框中的链接

用 .alert-link 工具类，可以为链接设置与当前警告框相符的颜色。

~~~
<div class="alert alert-success" role="alert">
  <a href="#" class="alert-link">...</a>
</div>
~~~

### 进度条

情景类：progress-bar-success
斑马线：progress-bar-striped

~~~
带有动画效果的进度条
<div class="progress">
  <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
    <span class="sr-only">45% Complete</span>
  </div>
</div>
~~~

> 堆叠效果

~~~
<div class="progress">
  <div class="progress-bar progress-bar-success" style="width: 35%">
    <span class="sr-only">35% Complete (success)</span>
  </div>
  <div class="progress-bar progress-bar-warning progress-bar-striped" style="width: 20%">
    <span class="sr-only">20% Complete (warning)</span>
  </div>
  <div class="progress-bar progress-bar-danger" style="width: 10%">
    <span class="sr-only">10% Complete (danger)</span>
  </div>
</div>
~~~


### 媒体对象

简单的图文混排，列表类似，图片、文字顺序根据标签位置得来，垂直对齐使用media-middle类 图片与媒体body均需要



~~~
<div class="media">
  <div class="media-left">
    <a href="#">
      <img class="media-object" src="..." alt="...">
    </a>
  </div>
  <div class="media-body">
    <h4 class="media-heading">Media heading</h4>
    ...
  </div>
</div>
~~~

### 列表组

主要ul施加list-group类，li施加list-group-item类即可

~~~
<ul class="list-group">
  <li class="list-group-item">
    <span class="badge">14</span>
    Cras justo odio
  </li>
</ul>
~~~


### 面板

面板大体由标题、身体、脚注组成，可议施加情景类，面板内可以添加table、listgroup等

~~~
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Panel title</h3>
  </div>
  <div class="panel-body">
    Panel content
  </div>
  <div class="panel-footer">Panel footer</div>
</div>
~~~










