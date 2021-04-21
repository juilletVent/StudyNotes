<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bootstrap 样式记录](#bootstrap-%E6%A0%B7%E5%BC%8F%E8%AE%B0%E5%BD%95)
  - [标签](#%E6%A0%87%E7%AD%BE)
  - [样式](#%E6%A0%B7%E5%BC%8F)
  - [表格](#%E8%A1%A8%E6%A0%BC)
  - [表单样式](#%E8%A1%A8%E5%8D%95%E6%A0%B7%E5%BC%8F)
        - [form标签类：](#form%E6%A0%87%E7%AD%BE%E7%B1%BB)
        - [表单分组](#%E8%A1%A8%E5%8D%95%E5%88%86%E7%BB%84)
        - [Button](#button)
  - [图片效果](#%E5%9B%BE%E7%89%87%E6%95%88%E6%9E%9C)
  - [辅助类](#%E8%BE%85%E5%8A%A9%E7%B1%BB)
        - [大小控制后缀](#%E5%A4%A7%E5%B0%8F%E6%8E%A7%E5%88%B6%E5%90%8E%E7%BC%80)
  - [Viewport](#viewport)
        - [设置 Viewport](#%E8%AE%BE%E7%BD%AE-viewport)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
