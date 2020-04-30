## 单文件组件-根组件

在Vue实例中渲染根组件的时候不能直接使用components选项声明根组件

原因是：运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。运行时构建比独立构建要轻量30%

解决办法：

1. 为Vue取别名：

		resolve: {
			alias: {
				'vue': 'vue/dist/vue.js'
			}
		}

2. 使用render函数

		import Vue from 'vue';
		import app from '../components/app.vue';
		
		new Vue({
		    el:"#app",
		    render:function(h){
		        return h(app);
		    }
		});

**注意：render函数传递的渲染函数的结果必须返回，否则什么也不渲染**