<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [使用包装Jquery对象 引入Jquery即可](#%E4%BD%BF%E7%94%A8%E5%8C%85%E8%A3%85jquery%E5%AF%B9%E8%B1%A1-%E5%BC%95%E5%85%A5jquery%E5%8D%B3%E5%8F%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 使用包装Jquery对象 引入Jquery即可

代码如下：

	var $ = require('jquery');
	window.$ = window.jquery = window.jQuery = $;
	
	module.exports = $;

使用时，创建Jquery包装文件`jquery.vendor.js`，将内容复制进去，在需要的模块引入即可，引入后类似Layer弹层等依赖Jquery的第三方插件就可用了