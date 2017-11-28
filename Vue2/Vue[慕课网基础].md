#组件

> 基础结构

~~~
new Vue({
	el:'#app',//挂载点
	template:"<p>{{hello}}</p>",//模板
	data:function(){
		return {//数据模型
			hello:'Hello World !'
		}
	},
	watch:{//数据监听，NG类似
		hello:function(now,old){
			do something...
		}
	},
	methods:{//定义实例方法
		clickOne:function(){ //do somthing...}可以使用ES6简写为clickOne (){do somthing...}
	},
	components:{//依赖的子组件
		'my-header':myHeader
	},
	computed：{//计算属性，当数据模型发生改变时将会执行回调
		myComputed:function(){
			return this.hello+"计算值";
		}
	}
})
~~~

## 基础指令

v-html="HTML text"
v-text="text"
v-bind="express"  可简写为“：” example//:class="a" 绑定属性的，绑定值 直接使用{{}}语法，对于样式class的绑定与NG语法一致，扩展了使用数组进行批量绑定:class="['a','b']"
v-model="express"
v-show= "express"
v-if="express"
v-else 搭配v-if使用 没有参数选项 添加即可

v-for="item in list"//{{item.name}}
使用索引：
v-for="(item,index) in list"//{{index}}，2.0之前的版本类似Angular直接使用$index即可
渲染对象数据：
v-for="(value,key) in obj"//{{key - value}}

**Tips:*列表的数据更新不能像NG一样直接更改，只能使用数组自带的几个API进行，或者使用内置API：Vue.set进行更改，否则View将不会刷新，这是Vue采用数据劫持实现双向绑定的一个弊端*

//尝试：直接更改，然后调用一个无意义的splice触发刷新

## 数据模型绑定

v-model="msg"

- 多选模型绑定，直接多个CheckBox绑定至同一个数据模型即可，此模型定义为数组
- 单选直接使用数据绑定即可
- 下拉框，绑定至select即可，初始化可以使用数据模型进行指定，一般搭配v-for进行列表项动态渲染

## 标签属性绑定

v-bind:属性名="express"

栗子：v-bind:data-index="index"

**V-bind指令可以多次使用，简写为:一个冒号**

## 数据监听

组件定义的配置中定义watch即可
~~~
watch:{//数据监听，NG类似
	hello:function(now,old){
		do something...
	}
}
~~~


## 事件绑定

v-on:clicl 等价于 @click="func/express" @为简写

之后可以紧跟修改器进行附加操作：阻止冒泡、组织默认行为

example:@click.stop="submit"

v-model.lazy="check"//延迟绑定,在blur时执行

## 组件定义

如果组件名采用驼峰命名法，在HTML中使用的标签名与NG的解析方式一致，逢大写，转为小写并添加中划线 栗子：myHeart => <my-heart></my-heart>

	Vue.component('todo-item', {
	  // todo-item 组件现在接受一个
	  // "prop"，类似于一个自定义属性
	  // 这个属性名为 todo。
	  props: ['todo'],
	  template: '<li>{{ todo.text }}</li>'
	})

	<div id="app-7">
	  <ol>
	    <!--
	      现在我们为每个 todo-item 提供待办项对象
	      待办项对象是变量，即其内容可以是动态的。
	      我们也需要为每个组件提供一个“key”，晚些时候我们会做个解释。
	    -->
	    <todo-item
	      v-for="item in groceryList"
	      v-bind:todo="item"
	      v-bind:key="item.id">
	    </todo-item>
	  </ol>
	</div>

	Vue.component('todo-item', {
	  props: ['todo'],
	  template: '<li>{{ todo.text }}</li>'
	})
	var app7 = new Vue({
	  el: '#app-7',
	  data: {
	    groceryList: [
	      { id: 0, text: '蔬菜' },
	      { id: 1, text: '奶酪' },
	      { id: 2, text: '随便其他什么人吃的东西' }
	    ]
	  }
	})


