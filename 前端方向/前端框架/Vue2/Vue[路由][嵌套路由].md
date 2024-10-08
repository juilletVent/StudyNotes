<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue 路由[嵌套路由]](#vue-%E8%B7%AF%E7%94%B1%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1)
  - [嵌套路由](#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue 路由[嵌套路由]

## 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

~~~
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
~~~

借助 vue-router，使用嵌套路由配置，就可以很简单地表达这种关系。

	<div id="app">
	  <router-view></router-view>
	</div>
	const User = {
	  template: '<div>User {{ $route.params.id }}</div>'
	}
	
	const router = new VueRouter({
	  routes: [
	    { path: '/user/:id', component: User }
	  ]
	})

这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>：

	const User = {
	  template: `
	    <div class="user">
	      <h2>User {{ $route.params.id }}</h2>
	      <router-view></router-view>
	    </div>
	  `
	}

要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

	const router = new VueRouter({
	  routes: [
	    { path: '/user/:id', component: User,
	      children: [
	        {
	          // 当 /user/:id/profile 匹配成功，
	          // UserProfile 会被渲染在 User 的 <router-view> 中
	          path: 'profile',
	          component: UserProfile
	        },
	        {
	          // 当 /user/:id/posts 匹配成功
	          // UserPosts 会被渲染在 User 的 <router-view> 中
	          path: 'posts',
	          component: UserPosts
	        }
	      ]
	    }
	  ]
	})

**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

此时，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:id', component: User,
	      children: [
	        // 当 /user/:id 匹配成功，
	        // UserHome 会被渲染在 User 的 <router-view> 中
	        { path: '', component: UserHome },
	
	        // ...其他子路由
	      ]
	    }
	  ]
	})













