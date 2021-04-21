<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vuex Core](#vuex-core)
  - [State](#state)
    - [组件中获取Store状态](#%E7%BB%84%E4%BB%B6%E4%B8%AD%E8%8E%B7%E5%8F%96store%E7%8A%B6%E6%80%81)
    - [mapState](#mapstate)
    - [保有局部状态](#%E4%BF%9D%E6%9C%89%E5%B1%80%E9%83%A8%E7%8A%B6%E6%80%81)
  - [Getter](#getter)
    - [通过属性访问](#%E9%80%9A%E8%BF%87%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE)
    - [mapGetters](#mapgetters)
  - [Mutation](#mutation)
    - [携带参数的Mutation](#%E6%90%BA%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84mutation)
    - [Mutation 需遵守 Vue 的响应规则](#mutation-%E9%9C%80%E9%81%B5%E5%AE%88-vue-%E7%9A%84%E5%93%8D%E5%BA%94%E8%A7%84%E5%88%99)
    - [使用常量代替Mutation类型](#%E4%BD%BF%E7%94%A8%E5%B8%B8%E9%87%8F%E4%BB%A3%E6%9B%BFmutation%E7%B1%BB%E5%9E%8B)
    - [Mutation 必须是同步的](#mutation-%E5%BF%85%E9%A1%BB%E6%98%AF%E5%90%8C%E6%AD%A5%E7%9A%84)
    - [组件中提交Mutation  mapMutation](#%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%8F%90%E4%BA%A4mutation--mapmutation)
  - [Action](#action)
    - [分发Action](#%E5%88%86%E5%8F%91action)
    - [在组件中分发Action](#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%88%86%E5%8F%91action)
    - [组合Action](#%E7%BB%84%E5%90%88action)
  - [Module](#module)
    - [模块的局部状态](#%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B1%80%E9%83%A8%E7%8A%B6%E6%80%81)
    - [命名空间](#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)
    - [在带命名空间的模块内访问全局内容](#%E5%9C%A8%E5%B8%A6%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E6%A8%A1%E5%9D%97%E5%86%85%E8%AE%BF%E9%97%AE%E5%85%A8%E5%B1%80%E5%86%85%E5%AE%B9)
    - [在带命名空间的模块注册全局 action](#%E5%9C%A8%E5%B8%A6%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E6%A8%A1%E5%9D%97%E6%B3%A8%E5%86%8C%E5%85%A8%E5%B1%80-action)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vuex Core

> 最简单的Store

	// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
	
	const store = new Vuex.Store({
	  state: {
	    count: 0
	  },
	  mutations: {
	    increment (state) {
	      state.count++
	    }
	  }
	})

现在，你可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：

	store.commit('increment')
	console.log(store.state.count) // -> 1

**重点：改变store的状态必须通过提交mutations来进行更改**

**Tips：Store重的状态是响应式的，如果组件依赖Store中的状态，当Store的状态更改时，组件视图也将实时更新**


## State

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态

	// 创建一个 Counter 组件
	const Counter = {
	  template: `<div>{{ count }}</div>`,
	  computed: {
	    count () {
	      return store.state.count
	    }
	  }
	}

> Store批量注入

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：

### 组件中获取Store状态

**注入：**

	const app = new Vue({
	  el: '#app',
	  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
	  store,
	  components: { Counter },
	  template: `
	    <div class="app">
	      <counter></counter>
	    </div>
	  `
	})

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。让我们更新下 Counter 的实现：

	const Counter = {
	  template: `<div>{{ count }}</div>`,
	  computed: {
	    count () {
	      return this.$store.state.count
	    }
	  }
	}

### mapState

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

	import { mapState } from 'vuex'
	
	export default {
	  // ...
	  computed: mapState({
	    // 箭头函数可使代码更简练
	    count: state => state.count,
	
	    // 传字符串参数 'count' 等同于 `state => state.count`
	    countAlias: 'count',
	
	    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
	    countPlusLocalState (state) {
	      return state.count + this.localCount
	    }
	  })
	}

**mapState传入的对象中，每个键对应一个属性名，值名为回调函数，该函数具备一个store的参数，返回值作为计算属性的值**

**Tips：当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组**

	computed: mapState([
	  // 映射 this.count 为 store.state.count
	  'count'
	])

> mapState与计算属性混合使用

mapState 函数返回的是一个对象。我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。使用对象展开运算符，可以快速完成对象合并：

	computed: {
	  localComputed () { /* ... */ },
	  // 使用对象展开运算符将此对象混入到外部对象中
	  ...mapState({
	    // ...
	  })
	}

### 保有局部状态

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定



## Getter

在存在对store属性进行二次运算的场景时，getter会非常有用，不要在组件中单独定义计算属性进行二次计算，将会导致碎片化的计算属性。

以下方式不可取：

	computed: {
	  doneTodosCount () {
	    return this.$store.state.todos.filter(todo => todo.done).length
	  }
	}

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 state 作为其第一个参数：

	const store = new Vuex.Store({
	  state: {
	    todos: [
	      { id: 1, text: '...', done: true },
	      { id: 2, text: '...', done: false }
	    ]
	  },
	  getters: {
	    doneTodos: state => {
	      return state.todos.filter(todo => todo.done)
	    }
	  }
	})

### 通过属性访问

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

	store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]

### mapGetters

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

	import { mapGetters } from 'vuex'
	
	export default {
	  // ...
	  computed: {
	  // 使用对象展开运算符将 getter 混入 computed 对象中
	    ...mapGetters([
	      'doneTodosCount',
	      'anotherGetter',
	      // ...
	    ])
	  }
	}

如果你想将一个 getter 属性另取一个名字，使用对象形式:

	mapGetters({
	  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
	  doneCount: 'doneTodosCount'
	})


## Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,使用类似于事件。每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

	const store = new Vuex.Store({
	  state: {
	    count: 1
	  },
	  mutations: {
	    increment (state) {
	      // 变更状态
	      state.count++
	    }
	  }
	})

提交Mutation：

	store.commit('increment')

### 携带参数的Mutation

你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：

	// ...
	mutations: {
	  increment (state, payload) {
	    state.count += payload.amount
	  }
	}
	
	//提交
	store.commit('increment', {
	  amount: 10
	})

> 对象风格的提交方式

提交 mutation 的另一种方式是直接使用包含 type 属性的对象：

	store.commit({
	  type: 'increment',
	  amount: 10
	})

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变

### Mutation 需遵守 Vue 的响应规则

这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

	- 使用 Vue.set(obj, 'newProp', 123)
	- 以新对象替换老对象

			state.obj = { ...state.obj, newProp: 123 }


### 使用常量代替Mutation类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

	// mutation-types.js
	export const SOME_MUTATION = 'SOME_MUTATION'
	
	// store.js
	import Vuex from 'vuex'
	import { SOME_MUTATION } from './mutation-types'
	
	const store = new Vuex.Store({
	  state: { ... },
	  mutations: {
	    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
	    [SOME_MUTATION] (state) {
	      // mutate state
	    }
	  }
	})

### Mutation 必须是同步的

Mutation中不能包含异步请求

	mutations: {
	  someMutation (state) {
	    api.callAsyncMethod(() => {
	      state.count++
	    })
	  }
	}

类似上面的异步函数调用，devtool无法对执行流程进行追踪和创建快照，因为回调函数内部的操作何时完成，无法预计。

### 组件中提交Mutation  mapMutation

你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

	import { mapMutations } from 'vuex'
	
	export default {
	  // ...
	  methods: {
	    ...mapMutations([
	      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
	
	      // `mapMutations` 也支持载荷：
	      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
	    ]),
	    ...mapMutations({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
	    })
	  }
	}

需要提交payload的时候，直接在调用提交的时候时候附带payload即可

**重点：Mutation中处理的事务均为同步事务，异步事务不可放在Mutation中进行操作，而应该放在Action中**


## Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

	...
	actions: {
	    increment (context) {
	      context.commit('increment')
	    }
	  }
	...

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters

### 分发Action

Action 通过 store.dispatch 方法触发

	// 以载荷形式分发
	store.dispatch('incrementAsync', {
	  amount: 10
	})
	
	// 以对象形式分发
	store.dispatch({
	  type: 'incrementAsync',
	  amount: 10
	})

涉及到异步调用与多重分发Mutation的栗子：

	actions: {
	  checkout ({ commit, state }, products) {
	    // 把当前购物车的物品备份起来
	    const savedCartItems = [...state.cart.added]
	    // 发出结账请求，然后乐观地清空购物车
	    commit(types.CHECKOUT_REQUEST)
	    // 购物 API 接受一个成功回调和一个失败回调
	    shop.buyProducts(
	      products,
	      // 成功操作
	      () => commit(types.CHECKOUT_SUCCESS),
	      // 失败操作
	      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
	    )
	  }
	}

### 在组件中分发Action

你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）

	import { mapActions } from 'vuex'
	
	export default {
	  // ...
	  methods: {
	    ...mapActions([
	      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
	
	      // `mapActions` 也支持载荷：
	      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
	    ]),
	    ...mapActions({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
	    })
	  }
	}

### 组合Action

首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

	actions: {
	  actionA ({ commit }) {
	    return new Promise((resolve, reject) => {
	      setTimeout(() => {
	        commit('someMutation')
	        resolve()
	      }, 1000)
	    })
	  }
	}

现在你可以:

	store.dispatch('actionA').then(() => {
	  // ...
	})

在另外一个 action 中也可以：

	actions: {
	  // ...
	  actionB ({ dispatch, commit }) {
	    return dispatch('actionA').then(() => {
	      commit('someOtherMutation')
	    })
	  }
	}

最后，如果我们利用 async / await，我们可以如下组合 action：

	// 假设 getData() 和 getOtherData() 返回的是 Promise
	actions: {
	  async actionA ({ commit }) {
	    commit('gotData', await getData())
	  },
	  async actionB ({ dispatch, commit }) {
	    await dispatch('actionA') // 等待 actionA 完成
	    commit('gotOtherData', await getOtherData())
	  }
	}

**注：这里commit的payload promise没看懂什么意思**

## Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
	
	const moduleA = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... },
	  getters: { ... }
	}
	
	const moduleB = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... }
	}
	
	const store = new Vuex.Store({
	  modules: {
	    a: moduleA,
	    b: moduleB
	  }
	})
	
	store.state.a // -> moduleA 的状态
	store.state.b // -> moduleB 的状态

### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：

	const moduleA = {
	  // ...
	  actions: {
	    incrementIfOddOnRootSum ({ state, commit, rootState }) {
	      if ((state.count + rootState.count) % 2 === 1) {
	        commit('increment')
	      }
	    }
	  }
	}

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

	const moduleA = {
	  // ...
	  getters: {
	    sumWithRootCount (state, getters, rootState) {
	      return state.count + rootState.count
	    }
	  }
	}


### 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

	const store = new Vuex.Store({
	  modules: {
	    account: {
	      namespaced: true,
	
	      // 模块内容（module assets）
	      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
	      getters: {
	        isAdmin () { ... } // -> getters['account/isAdmin']
	      },
	      actions: {
	        login () { ... } // -> dispatch('account/login')
	      },
	      mutations: {
	        login () { ... } // -> commit('account/login')
	      },
	
	      // 嵌套模块
	      modules: {
	        // 继承父模块的命名空间
	        myPage: {
	          state: { ... },
	          getters: {
	            profile () { ... } // -> getters['account/profile']
	          }
	        },
	
	        // 进一步嵌套命名空间
	        posts: {
	          namespaced: true,
	
	          state: { ... },
	          getters: {
	            popular () { ... } // -> getters['account/posts/popular']
	          }
	        }
	      }
	    }
	  }
	})


**Tips:getters使用数组路径进行访问：getters['account/isAdmin']，[模块/名称]。actions、mutation使用 模块名/名称**

模块继续嵌套，嵌套的时候如果不明确指定namespaced为true，则默认继承父级模块的命名空间，可以进一步嵌套命名空间，书写的路径依次跟进即可

	getters['模块/模块/名称']

启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。

### 在带命名空间的模块内访问全局内容

如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

**重点：如果要在子模块发送全局action或提交Mutation，将{root:true}作为第三个参数传递给dispatch或commit即可**

若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

	modules: {
	  foo: {
	    namespaced: true,
	
	    getters: {
	      // 在这个模块的 getter 中，`getters` 被局部化了
	      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
	      someGetter (state, getters, rootState, rootGetters) {
	        getters.someOtherGetter // -> 'foo/someOtherGetter'
	        rootGetters.someOtherGetter // -> 'someOtherGetter'
	      },
	      someOtherGetter: state => { ... }
	    },
	
	    actions: {
	      // 在这个模块中， dispatch 和 commit 也被局部化了
	      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
	      someAction ({ dispatch, commit, getters, rootGetters }) {
	        getters.someGetter // -> 'foo/someGetter'
	        rootGetters.someGetter // -> 'someGetter'
	
	        dispatch('someOtherAction') // -> 'foo/someOtherAction'
	        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
	
	        commit('someMutation') // -> 'foo/someMutation'
	        commit('someMutation', null, { root: true }) // -> 'someMutation'
	      },
	      someOtherAction (ctx, payload) { ... }
	    }
	  }
	}

### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。

	{
	  actions: {
	    someOtherAction ({dispatch}) {
	      dispatch('someAction')
	    }
	  },
	  modules: {
	    foo: {
	      namespaced: true,
	
	      actions: {
	        someAction: {
	          root: true,
	          handler (namespacedContext, payload) { ... } // -> 'someAction'
	        }
	      }
	    }
	  }
	}











