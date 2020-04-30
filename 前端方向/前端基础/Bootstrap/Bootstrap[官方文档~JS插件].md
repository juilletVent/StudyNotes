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