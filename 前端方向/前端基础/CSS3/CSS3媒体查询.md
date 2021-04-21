<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3 媒体查询](#css3-%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2)
  - [Media Queries——媒体类型（一）](#media-queries%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B%E4%B8%80)
  - [media queries——媒体类型（二）](#media-queries%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B%E4%BA%8C)
      - [@import语法](#import%E8%AF%AD%E6%B3%95)
  - [使用link标签的媒体查询属性进行导入](#%E4%BD%BF%E7%94%A8link%E6%A0%87%E7%AD%BE%E7%9A%84%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2%E5%B1%9E%E6%80%A7%E8%BF%9B%E8%A1%8C%E5%AF%BC%E5%85%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3 媒体查询

## Media Queries——媒体类型（一）

其实媒体类型远不止这三种，W3C总共列出了10种媒体类型。如下表所示

	All所有设备
	Braille盲人用点字法触觉回馈设备
	Embossed盲文打印机
	Handheld便携设备
	Print打印用纸或打印预览视图
	Projection各种投影设备
	Screen电脑显示器
	Speech语音或音频合成器
	Tv电视机类型设备
	Tty使用固定密度字母栅格的媒介，比如电传打字机和终端

## media queries——媒体类型（二）

在实际中媒体类型有近十种之多，实际之中常用的也就那么几种，不过媒体类型的引用方法也有多种，常见的有：link标签、@import和CSS3新增的@media几种：

- link方法[不常用]
- @import方法 作用：指定导入的外部样式表及目标媒体
- @media方法 常用媒体查询，针对不同的设备匹配不同的样式列表

**媒体查询**

~~~
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
~~~

#### @import语法

	@import <url> <media_query_list>
	<media_query_list>：[<media_query>[',' <media_query>]*]?
	<media_query>：[only | not]? <media_type> [and <expression>]* | <expression> [and <expression>]*
	<expression>：'('<media_feature>[:<value>]?')'


> example：

1、普通使用
	
	@import url("global.css");
	@import url(global.css);
	@import "global.css";

以上3种方式都有效。当使用url(url)的方式时，包住路径的引号可有可无；当直接使用url时，包住路径的引号必须保留。

2、指定媒体查询

	@import url(example.css) screen and (min-width:800px);
	@import url(example.css) screen and (width:800px),(color);
	@import url(example.css) screen and (min-device-width:500px) 
									and (max-device-width:1024px);

3、支持
	
1. IE7及更早浏览器不支持@import指定媒体类型和媒体查询。
2. IE8不支持@import指定媒体查询。

## 使用link标签的媒体查询属性进行导入

~~~
<link rel="stylesheet" type="text/css" href="print.css" media="screen and (max-height:700px)">
~~~
	