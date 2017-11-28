# Bootstrap 样式记录

## 标签

- mark 凸显标记
- del	删除线
- ins	下划线
- small 缩小文字

## 样式

- .text-left .text-center .text-right 对齐
- .text-lowercase 小写
- .text-uppercase 大写
- .text-capitalize 单词首字母大小


## 表格

基础样式类

	table 表格元素父类 
	table-striped 斑马线
 	table-bordered 边框线
	table-hover	鼠标上移高亮

行样式类
	
	danger 红色
	success 绿色
	warning 黄色
	info 蓝色
	active	鼠标上移的颜色

## 表单样式

##### form标签类：

- form-inline：所有的元素转为行级块级元素
- input-lg:大输入框
- input-sm:小输入框
- form-control[input/textarea/select]：表单样式
- sr-only：提示信息lable隐藏

##### 表单分组

- form-group：表单分组[搭配label提示标签构成分组]
- control-label：可控lable[搭配表单分组状态使用]
- has-success、has-warning、has-error：分组状态：[用作表单验证]

##### Button

- btn：基础样式类
- btn-default：默认样式
- btn-success：绿色
- btn-primary：主色调[蓝色]
- btn-info：湖蓝色
- btn-warning：黄色
- btn-danger：红色
- btn-link：链接样式
- btn-block：填充满父元素宽度
- active：添加按下默认样式[不太明白干什么用的]

## 图片效果

- img-rounded:圆角
- img-circle:圆形
- img-thimbnail:带边框的圆角图形

## 辅助类

##### 大小控制后缀

- -sm：较小的
- -lg：较大的

## Viewport

##### 设置 Viewport

一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

content取值：

- width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 --device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
- height：和 width 相对应，指定高度。
- initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
- maximum-scale：允许用户缩放到的最大比例。
- minimum-scale：允许用户缩放到的最小比例。
- user-scalable：用户是否可以手动缩放。

**格式：键值对，逗号分隔**

*PS：ViewPort需要深入查看与理解*
