# Webpack 引入Layer弹层

使用之前的方法引入Jquery包装模块

随后引入layer.js主文件，此时，layer已经生效，但是由于webpack打包的原因，css文件并未引入进来

需要单独引入layer的css文件，并且需要配置相关loader处理图片等文件信息

	require('./jquery.js');
	
	require('../lib/layer/theme/default/layer.css');
	require('../lib/layer/layer.js');
	
	$(function(){
	    layer.msg('Success',{icon:1});
	})

其他第三方插件基本遵循同样的规则