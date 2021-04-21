<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue.js 接收url参数](#vuejs-%E6%8E%A5%E6%94%B6url%E5%8F%82%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## vue.js 接收url参数
1. 路由配置传参方式在配置路由时 

	例如 
		
		"/firewall/authorize/:uid/:uname/:token"
	
	页面url为 
		
		http://XXX.com/firewall/authorize/23/zhangman/232454
	
	接收方式 this.$route.params.uid,

2. 传参方式例 

	例如：

		http://XXX.com/firewall/authorize?uid=12&uname=zhangman&token=23243
	
	js 接收方式 
		
		this.$route.query.uid

3. js直接获取

		window.GetQueryString = function(name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) return unescape(r[2]);
		    return null;
		}

		console.log(GetQueryString('name'))

	使用正则直接匹配获取