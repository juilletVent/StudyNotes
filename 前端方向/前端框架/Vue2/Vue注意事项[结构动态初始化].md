<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [复杂数据结构动态初始化](#%E5%A4%8D%E6%9D%82%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%8A%A8%E6%80%81%E5%88%9D%E5%A7%8B%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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