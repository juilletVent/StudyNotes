## 项目结构

Store中一般来说，拆分书写state、getter、action、mutation，最后组合在store中集中导出，而不是一下子写在一个对象中。

多个模块的局部store分单文件书写，然后在根级store通过modules进行导入


## 插件

Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

	const myPlugin = store => {
	  // 当 store 初始化后调用
	  store.subscribe((mutation, state) => {
	    // 每次 mutation 之后调用
	    // mutation 的格式为 { type, payload }
	  })
	}

导入：

	const store = new Vuex.Store({
	  // ...
	  plugins: [myPlugin]
	})

**注意：在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。**