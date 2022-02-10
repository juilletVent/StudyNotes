<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mobile 页面注意事项](#mobile-%E9%A1%B5%E9%9D%A2%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
  - [禁用缩放，并告知浏览器此页面为Mobile页面](#%E7%A6%81%E7%94%A8%E7%BC%A9%E6%94%BE%E5%B9%B6%E5%91%8A%E7%9F%A5%E6%B5%8F%E8%A7%88%E5%99%A8%E6%AD%A4%E9%A1%B5%E9%9D%A2%E4%B8%BAmobile%E9%A1%B5%E9%9D%A2)
  - [去除Iphone input标签默认样式](#%E5%8E%BB%E9%99%A4iphone-input%E6%A0%87%E7%AD%BE%E9%BB%98%E8%AE%A4%E6%A0%B7%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mobile 页面注意事项

## 禁用缩放，并告知浏览器此页面为Mobile页面

	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
	
	<meta
	  name="viewport"
	  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
	/>

## 去除Iphone input标签默认样式

	input[type="button"], input[type="submit"], input[type="reset"] {
		-webkit-appearance: none;
	}

