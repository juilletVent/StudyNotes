<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue 路由[开始-动态路由匹配]](#vue-%E8%B7%AF%E7%94%B1%E5%BC%80%E5%A7%8B-%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
  - [起步](#%E8%B5%B7%E6%AD%A5)
  - [动态路由匹配](#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
  - [响应路由参数的变化](#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
  - [匹配优先级](#%E5%8C%B9%E9%85%8D%E4%BC%98%E5%85%88%E7%BA%A7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue 路由[开始-动态路由匹配]

所谓动态就是将一组模式相同的路由导向至同一个组件

## 起步

> HTML

1. 引入js ,编写HTML部分

~~~
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>
<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
//此处可以为渲染的组件添加属性、绑定事件
~~~

> js

1. 定义（路由）组件。

~~~
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
~~~

2. 定义路由

~~~
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
~~~

3. 创建 router 实例，然后传 `routes` 配置

~~~
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
~~~

4. 创建实例并挂载

~~~
var app = new Vue({
el:'#app'  
,router
});
~~~



## 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件

~~~
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
~~~

现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。

一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。于是，我们可以更新 User 的模板，输出当前用户的 ID：

	const User = {
	  template: '<div>User {{ $route.params.id }}</div>'
	}

你可以在一个路由中设置多段『路径参数』，对应的值都会设置到 $route.params 中。例如：

|:-|:-|:-|
|模式|匹配路径|$route.params|
|/user/:username|/user/evan	|{ username: 'evan' }|
|/user/:username/post/:post_id	|/user/evan/post/123	|{ username: 'evan', post_id: 123 }

## 响应路由参数的变化

提醒一下，当使用路由参数时，例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象：

	const User = {
	  template: '...',
	  watch: {
	    '$route' (to, from) {
	      // 对路由变化作出响应...
	    }
	  }
	}


## 匹配优先级

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高

