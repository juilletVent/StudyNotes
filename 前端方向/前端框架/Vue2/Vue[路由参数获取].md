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