# 使用包装Jquery对象 引入Jquery即可

代码如下：

	var $ = require('jquery');
	window.$ = window.jquery = window.jQuery = $;
	
	module.exports = $;

使用时，创建Jquery包装文件`jquery.vendor.js`，将内容复制进去，在需要的模块引入即可，引入后类似Layer弹层等依赖Jquery的第三方插件就可用了