# 复杂数据结构动态初始化

当进行数据初始化时，如果是动态赋值，且赋值对象存在复杂的深层次结构，则一定要使用$set方式进行赋值，以便Vue对对象进行getter、setter拦截触发视图更新，否则将无法实现数据绑定与视图更新。

例如如下场景：

	...
	
	mounted:function(){
		this.data = $.post('/getAllList',null,data=>{
			this.data = data;//这种方式将无法触发视图更新和数据绑定
			this.$set(this,'data',data);//应该使用这种方式进行赋值
		})
	}
	...