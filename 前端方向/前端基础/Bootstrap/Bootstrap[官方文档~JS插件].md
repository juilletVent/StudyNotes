<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Bootstrap官方文档[JS插件]](#bootstrap%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3js%E6%8F%92%E4%BB%B6)
  - [概述](#%E6%A6%82%E8%BF%B0)
  - [模态框](#%E6%A8%A1%E6%80%81%E6%A1%86)
    - [滚动监听](#%E6%BB%9A%E5%8A%A8%E7%9B%91%E5%90%AC)
    - [弹出小提示](#%E5%BC%B9%E5%87%BA%E5%B0%8F%E6%8F%90%E7%A4%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bootstrap官方文档[JS插件]

## 概述

JavaScript 插件可以单个引入（使用 Bootstrap 提供的单个 *.js 文件），或者一次性全部引入（使用 bootstrap.js 或压缩版的 bootstrap.min.js）。

**jQuery必须在所有插件之前引入页面**

## 模态框

将modal定义部分cp至body下，在触发的button上指定data-toggle="modal" data-target="#id"

按钮js调用：

	$('#btn-invoke').on('click', function() {
			$('#myModal').modal();
	});

模态框的事件处理函数定义如下：

	$('#myModal').on('hidden.bs.modal', function (e) {
	  // do something...
	})

### 滚动监听

### 弹出小提示

均需要初始化：

	小标签初始化：$('[data-toggle="tooltip"]').tooltip();
	大标签初始化：$('[data-toggle="popover"]').popover();

**不初始化插件无效**

小标签形式
	
	<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>
	
	<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>
	
	<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>
	
	<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>

大标签形式[不会自动消失]

	<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
	  Popover on 左侧
	</button>
	
	<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
	  Popover on 顶部
	</button>
	
	<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
	sagittis lacus vel augue laoreet rutrum faucibus.">
	  Popover on 底部
	</button>

	<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
	  Popover on 右侧
	</button>

点击并让弹出框消失：

为了更好的跨浏览器和跨平台效果，你必须使用 a 标签，不能使用 button 标签，并且，还必须包含 role="button" 和 tabindex 属性。

	<a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">可消失的弹出框</a>

js弹出：

	$('#example').popover(options)