<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [低版本极速浏览器无法关闭弹出窗口时的polyfill](#%E4%BD%8E%E7%89%88%E6%9C%AC%E6%9E%81%E9%80%9F%E6%B5%8F%E8%A7%88%E5%99%A8%E6%97%A0%E6%B3%95%E5%85%B3%E9%97%AD%E5%BC%B9%E5%87%BA%E7%AA%97%E5%8F%A3%E6%97%B6%E7%9A%84polyfill)
    - [出现场景](#%E5%87%BA%E7%8E%B0%E5%9C%BA%E6%99%AF)
    - [总结](#%E6%80%BB%E7%BB%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 低版本极速浏览器无法关闭弹出窗口时的polyfill

#### 出现场景

A页面处于兼容模式下，JS打开B页面，B页面已经在过去的某个时间设置为极速模式，此时打开的B页面将以极速模式渲染，在B页面中使用```window.close();```尝试关闭当前页面时将会失败。

> 出现版本：360极速浏览器 9.5

	$scope.closeWindow = () => {
	  try {
	    window.open(window.location, '_self').close();
	  } catch (e) {
	    window.close();
	  }
	};

#### 总结

在关闭js弹出窗口时，统一使用上面的方式，有助于规避问题