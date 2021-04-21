<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bootstrap 官方文档手记[起步&全局CSS]](#bootstrap-%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%E6%89%8B%E8%AE%B0%E8%B5%B7%E6%AD%A5%E5%85%A8%E5%B1%80css)
  - [基本HTML配置[起步版块儿]](#%E5%9F%BA%E6%9C%AChtml%E9%85%8D%E7%BD%AE%E8%B5%B7%E6%AD%A5%E7%89%88%E5%9D%97%E5%84%BF)
  - [全局CSS样式](#%E5%85%A8%E5%B1%80css%E6%A0%B7%E5%BC%8F)
    - [移动设备优先](#%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E4%BC%98%E5%85%88)
    - [布局容器](#%E5%B8%83%E5%B1%80%E5%AE%B9%E5%99%A8)
    - [栅格系统](#%E6%A0%85%E6%A0%BC%E7%B3%BB%E7%BB%9F)
    - [媒体查询](#%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2)
    - [栅格参数](#%E6%A0%85%E6%A0%BC%E5%8F%82%E6%95%B0)
    - [排版](#%E6%8E%92%E7%89%88)
    - [代码](#%E4%BB%A3%E7%A0%81)
    - [表格](#%E8%A1%A8%E6%A0%BC)
    - [表单](#%E8%A1%A8%E5%8D%95)
    - [图片](#%E5%9B%BE%E7%89%87)
    - [辅助类](#%E8%BE%85%E5%8A%A9%E7%B1%BB)
    - [响应式工具类](#%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B7%A5%E5%85%B7%E7%B1%BB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bootstrap 官方文档手记[起步&全局CSS]

## 基本HTML配置[起步版块儿]

1. 让 IE 浏览器运行最新的渲染模式下 
	
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

2. 国产浏览器高速模式[让国产浏览器默认采用高速模式渲染页面]

		<meta name="renderer" content="webkit">

	*目前只有360浏览器支持此 <meta> 标签。希望更多国内浏览器尽快采取行动、尽快进入高速时代*

3. Windows 8 中的 Internet Explorer 10 和 Windows Phone 8

	Internet Explorer 10 并没有对 屏幕的宽度 和 视口（viewport）的宽度 进行区分，这就导致 Bootstrap 中的媒体查询并不能很好的发挥作用。为了解决这个问题，你可以引入下面列出的这段 CSS 代码暂时修复此问题：

		IE10：@-ms-viewport{ width: device-width; }
		Windows Phone 8 Update 3 (a.k.a. GDR3)：
		
		@-ms-viewport       { width: device-width; }
		@-o-viewport        { width: device-width; }
		@viewport           { width: device-width; }
		if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		  var msViewportStyle = document.createElement('style')
		  msViewportStyle.appendChild(
		    document.createTextNode(
		      '@-ms-viewport{width:auto!important}'
		    )
		  )
		  document.querySelector('head').appendChild(msViewportStyle)
		}

4. Safari 对百分比数字凑整的问题

	OS X 上搭载的 v7.1 以前 Safari 和 iOS v8.0 上搭载的 Safari 浏览器的绘制引擎对于处理 .col-*-1 类所对应的很长的百分比小数存在 bug。也就是说，如果你在一行（row）之中定义了12个单独的列（.col-*-1），你就会看到这一行比其他行要短一些

	解决方案：

	1. 为最后一列添加 .pull-right 类，将其暴力向右对齐
	2. 手动调整百分比数字，让其针对Safari表现更好（这比第一种方式更困难）

5. 基础模板

~~~

~~~

## 全局CSS样式

### 移动设备优先

为了确保适当的绘制和触屏缩放，需要在 <head> 之中添加 viewport 元数据标签。

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

	//禁止缩放

### 布局容器

Bootstrap 需要为页面内容和栅格系统包裹一个 .container 容器。我们提供了两个作此用处的类。注意，由于 padding 等属性的原因，**这两种 容器类不能互相嵌套**

- .container 类用于固定宽度并支持响应式布局的容器
- .container-fluid 类用于 100% 宽度，占据全部视口

### 栅格系统

- “行（row）”必须包含在 .container （固定宽度）或 .container-fluid （100% 宽度）中，以便为其赋予合适的排列（aligment）和内补（padding）。
- 通过“行（row）”在水平方向创建一组“列（column）”。
- 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（row）”的直接子元素。
- 类似 .row 和 .col-xs-4 这种预定义的类，可以用来快速创建栅格布局。Bootstrap 源码中定义的 mixin 也可以用来创建语义化的布局。
- 负值的 margin就是下面的示例为什么是向外突出的原因。在栅格列中的内容排成一行。
- 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 .col-xs-4 来创建。
- 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。

### 媒体查询

我们偶尔也会在媒体查询代码中包含 max-width 从而将 CSS 的影响限制在更小范围的屏幕大小之内

	@media (max-width: @screen-xs-max) { ... }
	@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
	@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
	@media (min-width: @screen-lg-min) { ... }

### 栅格参数

> 列布局

- 超小屏幕：.col-xs- [width<768px][手机]
- 小屏幕：.col-sm- [width>=768px][平板]
- 中等屏幕：.clo-md- [width>=992px][桌面]
- 大屏幕：.col-lg- [width>=1200px][桌面]

~~~
//定宽栅格
<div class="container">
	<div class="row">
		<div class="col-md-3 col-sm-6 bgBlue">中等屏幕占据3份 小屏幕占据6份</div>
	</div>
</div>

//全屏栅格
<div class="container-fluid">
	<div class="rom">
		<div class="col-sm-6 col-xs-12 bgBlue">小屏6份 超小屏12份</div>
	</div>
</div>
~~~

**PS:栅格总列数大于12时，多余的会另起一行**

> 列偏移

.col-md-offset-* 这些类实际是通过使用 * 选择器为当前元素增加了左侧的边距（margin）

偏移占据布局空间，例如：.col-sm-3 .col-sm-6&col-sm-offset-3将填充满整行

> 嵌套列

为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 .row 元素和一系列 .col-sm-* 元素到已经存在的 .col-sm-* 元素内。被嵌套的行（row）所包含的列（column）的个数不能超过12（其实，没有要求你必须占满12列）

~~~
<div class="row">
	<div class="col-sm-6 bgBlue">
		left
	</div>
	<div class="col-sm-6 bgBlue">
		<div class="row">
			<div class="col-sm-6 bgBlue">content-left</div>
			<div class="col-sm-6 bgBlue">content-right</div>
		</div>
	</div>
</div>
~~~

### 排版

> 标题 [.h1~.h6]

可以使用.h1-.h6为内联元素指定标题样式 small标签可用于副标题

文字辅助类：

|---------|:---------|
|类名|标签名|作用|
|lead|N/A|加粗，突出显示|
|N/A|mark|凸显文本，记号笔样式|
|N/A|del|删除线|
|N/A|S|无用的文本_删除线|
|N/A|ins|额外插入的内容为_下划线|
|N/A|u|下划线文本|
|N/A|small|小号文本[父容器字号的85%]|
|N/A|strong|强调[使用weight进行文本强调]|
|N/A|em|倾斜强调|

**Tips：H5中可以使用b标签进行高亮单词，不带有任何着重的味道，i标签用于发言、技术性词汇**

> 对齐

- text-left/center/right:左、居中、右对齐
- text-justify：两端对齐
- text-nowrap：禁止换行

> 字母大小写

- text-lowercase：转小写
- text-uppercase：转大写
- text-capitalize：单词首字母大小

> 缩略语

当鼠标悬停在缩写和缩写词上时就会显示完整内容

	<abbr title="attribute">attr</abbr>

为缩略语添加 .initialism 类，可以让 font-size 变得稍微小些[用于段落开头的缩略提示语]

> 引用

将任何 HTML 元素包裹在 &lt;blockquote&gt; 中即可表现为引用样式。对于直接引用，我们建议用 &lt;p&gt; 标签

~~~
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
~~~

带有来源的引用：

添加 &lt;footer&gt; 用于标明引用来源。来源的名称可以包裹进 &lt;cite&gt;标签中。

~~~
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
~~~

**通过赋予 .blockquote-reverse 类可以让引用呈现内容右对齐的效果**

> 内联列表

指定ul类：[list-inline]即可

> 描述

~~~
//class="dl-horizontal"可以使描述以横向展开
<dl>//根节点
  <dt>...</dt>//描述标题
  <dd>...</dd>//描述详情
</dl>
~~~

### 代码

> 内联代码

通过 &lt;code&gt; 标签包裹内联样式的代码片段

	For example, <code>&lt;section&gt;</code> should be wrapped as inline.

> 用户输入[标记快捷键|组合件]

	To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
	To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>

> 代码块

多行代码可以使用 pre 标签。为了正确的展示代码，注意将尖括号做转义处理

	<pre>&lt;p&gt;Sample text here...&lt;/p&gt;</pre>

还可以使用 .pre-scrollable 类，其作用是设置 max-height 为 350px ，并在垂直方向展示滚动条。

> 变量 

通过 var 标签标记变量

> 程序输出

通过 samp 标签来标记程序输出的内容

### 表格

> 基本

为任意 table 标签添加 .table 类可以为其赋予基本的样式 — 少量的内补（padding）和水平方向的分隔线

> 条纹状表格[斑马线]

通过 .table-striped 类可以给 <tbody> 之内的每一行增加斑马条纹样式

兼容：条纹状表格是依赖 :nth-child CSS 选择器实现的，而这一功能不被 Internet Explorer 8 支持

> 表格线[表框]

添加 .table-bordered 类为表格和其中的每个单元格增加边框

> 鼠标悬停

通过添加 .table-hover 类可以让 <tbody> 中的每一行对鼠标悬停状态作出响应

> 紧缩表格

通过添加 .table-condensed 类可以让表格更加紧凑，单元格中的内补（padding）均会减半

> 状态类

通过这些状态类可以为行或单元格设置颜色

|-----|:-----|
|class|描述|
|.active|鼠标悬停在行或单元格上时所设置的颜色|
|.success|标识成功或积极的动作|
|.info|标识普通的提示信息或动作|
|.warning|标识警告或需要用户注意|
|.danger|标识危险或潜在的带来负面影响的动作|

> 响应式表格

将任何 .table 元素包裹在 .table-responsive 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失

	<div class="table-responsive">
	  <table class="table">
	    ...
	  </table>
	</div>

### 表单

单独的表单控件会被自动赋予一些全局样式。所有设置了 .form-control 类的 input、textarea 和 select 元素都将被默认设置宽度属性为 width: 100%;。 将 label 元素和前面提到的控件包裹在 .form-group 中可以获得最好的排列

~~~
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
~~~

**不要将表单组直接和输入框组混合使用。建议将输入框组嵌套到表单组中使用**

> 内联表单

为 form 元素添加 .form-inline 类可使其内容左对齐并且表现为 inline-block 级别的控件。只适用于视口（viewport）至少在 768px 宽度时（视口宽度再小的话就会使表单折叠）

*Tips:在 Bootstrap 中，输入框和单选/多选框控件默认被设置为 width: 100%; 宽度。在内联表单，我们将这些元素的宽度设置为 width: auto;，因此，多个控件可以排列在同一行。根据你的布局需求，可能需要一些额外的定制化组件*

*PS:一定为输入控件要添加 label 标签*

~~~
//实例1
<form class="form-inline">
  <div class="form-group">
    <label for="exampleInputName2">Name</label>
    <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail2">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  </div>
  <button type="submit" class="btn btn-default">Send invitation</button>
</form>

//实例2
<form class="form-inline">
  <div class="form-group">
    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
      <div class="input-group-addon">.00</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Transfer cash</button>
</form>

//实例3 input添加图标
<form class="form-inline">
  <div class="form-group">
    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
      <div class="input-group-addon">.00</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Transfer cash</button>
</form>
~~~

为input添加左侧图标，创建input-group包含input，并添加label于input前，指定icon类/在label标签内输入文本提示、加入input-group-addon类即可。若果想要在右侧添加，将label及相关属性添加在input后方即可。

> 水平排列的表单

通过为表单添加 .form-horizontal 类，并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。这样做将改变 .form-group 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了

~~~
<form class="form-horizontal">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</form>
~~~

> 多选与单选[选择框由于携带无法说明文字，故，全部需要label标签配合使用]

多选：
~~~
<div class="checkbox">
  <label>
    <input type="checkbox" value="">
    Option one is this and that&mdash;be sure to include why it's great
  </label>
</div>
<div class="checkbox disabled">
  <label>
    <input type="checkbox" value="" disabled>
    Option two is disabled
  </label>
</div>
~~~

单选：
~~~
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="radio disabled">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
    Option three is disabled
  </label>
</div>
~~~

> 内联单选和多选框

通过将 .checkbox-inline 或 .radio-inline 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行。

~~~
//多选内联
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1
</label>
<label class="checkbox-inline">
  <input type="checkbox" id="inlineCheckbox2" value="option2"> 2
</label>

//单选内联
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 1
</label>
<label class="radio-inline">
  <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 2
</label>
~~~

> 下拉列表（select）

~~~
//单选
去除multiple即可
//多选
<select multiple class="form-control">
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
</select>
~~~

> 静态控件

如果需要在表单中将一行纯文本和 label 元素放置于同一行，为 <p> 元素添加 .form-control-static 类即可

~~~
<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>
~~~

> 禁用状态

为输入框设置 disabled 属性可以禁止其与用户有任何交互（焦点、输入等）。被禁用的输入框颜色更浅，并且还添加了 not-allowed 鼠标状态

> 被禁用的 fieldset

为<fieldset> 设置 disabled 属性,可以禁用 <fieldset> 中包含的所有控件

**Tips：兼容性不好，不建议使用**

> 只读状态

为输入框设置 readonly 属性可以禁止用户修改输入框中的内容。处于只读状态的输入框颜色更浅（就像被禁用的输入框一样），但是仍然保留标准的鼠标状态

~~~
<input class="form-control" type="text" placeholder="Readonly input here…" readonly>
~~~

> 帮助文本|提示文本

在表单下显示一行帮助文本

~~~
<label class="sr-only" for="inputHelpBlock">Input with help text</label>
<input type="text" id="inputHelpBlock" class="form-control" aria-describedby="helpBlock">
...
<span id="helpBlock" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
~~~

> 校验状态

Bootstrap 对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。使用时，添加 .has-warning、.has-error 或 .has-success 类到这些控件的父元素即可。任何包含在此元素之内的 .control-label、.form-control 和 .help-block 元素都将接受这些校验状态的样式

~~~
输入控件
<div class="form-group has-success">
  <label class="control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control" id="inputSuccess1" aria-describedby="helpBlock2">
  <span id="helpBlock2" class="help-block">A block of help text that breaks onto a new line and may extend beyond one line.</span>
</div>

选择控件
<div class="has-warning">
  <div class="checkbox">
    <label>
      <input type="checkbox" id="checkboxWarning" value="option1">
      Checkbox with warning
    </label>
  </div>
</div>
~~~

> 添加额外的图标[input内添加右侧附加图标]

gorm-group分组根节点添加has-freeback类，内部创建input-group输入框分组，如果需要添加左侧图标，则在input-group中添加左侧图标，然后在group结束后添加label标签指定form-control-feedback，此label就是右侧附加图标

~~~
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputGroupSuccess1">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
</div>
~~~

> 控件尺寸

imput-sm|md[default]/lg：小|普通[默认]|大

> 水平排列的表单组的尺寸

通过添加 .form-group-lg 或 .form-group-sm 类，为 .form-horizontal 包裹的 label 元素和表单控件快速设置尺寸

### 图片 

> 响应式图片[图片自适应]

在 Bootstrap 版本 3 中，通过为图片添加 **.img-responsive**类可以让图片支持响应式布局。其实质是为图片设置了 max-width: 100%;、 height: auto; 和 display: block; 属性，从而让图片在其父元素中更好的缩放。

> 图片形状

通过为 <img> 元素添加以下相应的类，可以让图片呈现不同的形状

兼容性：请时刻牢记：Internet Explorer 8 不支持 CSS3 中的圆角属性

- img-round:圆角矩形
- img-circle:圆形
- img-thumbnail:圆角矩形[携带边框]

### 辅助类

> 情境文本颜色

- text-muted:灰色
- text-primary：主色调蓝色
- text-success：绿色
- text-info：湖蓝色
- text-warning：橙色
- text-danger：红儿

> 关闭按钮

使用实体符号：&times;[乘号]

~~~
<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
~~~

> 三角符号

	<span class="caret"></span>

> 快速浮动

- pull-left
- pull-right

> 块儿内容居中

为任意元素设置 display: block 属性并通过 margin 属性让其中的内容居中

	<div class="center-block">...</div>

> 清除浮动

通过为父元素添加 .clearfix 类可以很容易地清除浮动（float）

	<div class="clearfix">...</div>

> 显示或隐藏内容

.show 和 .hidden 类可以强制任意元素显示或隐藏,另外，**.invisible**类可以被用来6仅仅影响元素的可见性，也就是说，元素的 display 属性不被改变，并且这个元素仍然能够影响文档流的排布


### 响应式工具类

> 可用的类

可单独或联合使用

|------|:-----|:----|:------|----|
|类|超小屏幕[<768px]|小屏幕[>=768px]|中等屏幕[>=992px]|大屏幕[>=1200px]
|显示式|
|.visible-xs-*|可见|隐藏|隐藏|隐藏|
|.visible-sm-*|隐藏|可见|隐藏|隐藏|
|.visible-md-*|隐藏|隐藏|可见|隐藏|
|.visible-lg-*|隐藏|隐藏|隐藏|可见|
|.visible-xs-*|可见|隐藏|隐藏|隐藏|
|隐藏式|
|.hidden-xs|隐藏|可见|可见|可见|
|.hidden-sm|可见|隐藏|可见|可见|
|.hidden-md|可见|可见|隐藏|可见|
|.hidden-lg|可见|可见|可见|隐藏|

衍生的可用类：

|-------|:------|
|类组|CSS display|
|.visible-*-block|display: block;|
|.visible-*-inline|display: inline;|
|.visible-*-inline-block|display: inline-block;|

因此，以超小屏幕（xs）为例，可用的 .visible-*-* 类是：.visible-xs-block、.visible-xs-inline 和 .visible-xs-inline-block。

.visible-xs、.visible-sm、.visible-md 和 .visible-lg 类也同时存在。但是从 v3.2.0 版本开始不再建议使用。除了 <table> 相关的元素的特殊情况外，它们与 .visible-*-block 大体相同

