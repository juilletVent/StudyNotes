# Bootstrap 手记

## 页面基础模板

~~~
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
~~~

## 引入

> css引入

	<link href="css/bootstrap.min.css" rel="stylesheet">

> js引入

	<script src="js/bootstrap.min.js"></script>

> jq依赖

	<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>

依赖1.9及以上版本


## 单位

- px 像素
- em 字体尺寸
- rem 

## 图标

类：
	
	glyphicon 
	glyphicon-star
	glyphicon-图标名

角标：.caret

## 下拉菜单

## 表单组添加图标

1、创建表单组[input-group]
2、使用span引入图标，并且添加input-group-addon样式
3、表单元素添加input-control即可

示例：

~~~
//简写
div.input-group>span.input-group-addon.glyphicon.glyphicon-user+input.form.form-control[placeholder="请输入用户名"]

<div class="input-group">
	<span class="input-group-addon glyphicon glyphicon-user"></span>
	<input type="text" class="form form-control" placeholder="请输入用户名">
</div>
~~~

## 导航[nav]

使用UL LI作为基础结构，ul引入.nav .nav-tabs即可完成简单导航效果[普通效果]

基础类：nav

导航样式：

- nav-tabs 普通可切换导航样式
- nav-pills 胶囊式
- nav-justtified 竖行导航样式 

**注：使用.nav-stacked样式也能使普通导航垂直化**

## 分页

> 页码

ul+li结构 基础类pagination添加至ul上即可，可添加辅助类

> 上一页与下一页

ul添加pager样式，上一页添加previous,下一页添加next样式

## 进度条

容器DIV指定样式：progress
内容DVI指定：progress-bar progress-bar-striped[斑马线样式] 进度使用style的width控制
进度条的显示百分比使用内容控制。

样例：
~~~
<div class="progress progress-lg">
  <div class="progress-bar progress-bar-striped progress-bar-info" style="width:60%">60%</div>
</div>
~~~

斑马线动态进度条[定义CSS3动画实现]：
~~~
@keyframes animatedBackground {
  from { background-position: 0 0; }
  to { background-position: 100% 0; }
}

.progress-bar-striped{
  animation: animatedBackground 30s linear infinite;
}
~~~

## 列表

ul+li结构 ul挂lits-group li挂list-group-item

可以外挂active disable 以及通用的success info warning等基础样式后缀

## 面板

1. 容器 .panel panel-default[可以跟随通用的后缀类success/info...]

2. 头部 .panel-heading

3. 内容 .panel-body

4. 脚注 .panel-footer

