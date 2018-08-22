# 组件

## 注册

要注册一个全局组件，你可以使用 Vue.component(tagName, options)。例如：

	Vue.component('my-component', {
	  // 选项
	})

*对于自定义标签名，Vue.js 不强制要求遵循 W3C 规则 (小写，并且包含一个短杠)，尽管遵循这个规则比较好。*

组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用。要确保在初始化根实例之前注册了组件：

	<div id="example">
	  <my-component></my-component>
	</div>
	
	// 注册
	Vue.component('my-component', {
	  template: '<div>A custom component!</div>'
	})
	// 创建根实例
	new Vue({
	  el: '#example'
	})

渲染为：

	<div id="example">
	  <div>A custom component!</div>
	</div>

### 局部注册

不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：

	var Child = {
	  template: '<div>A custom component!</div>'
	}
	new Vue({
	  // ...
	  components: {
	    // <my-component> 将只在父模板可用
	    'my-component': Child
	  }
	})

这种封装也适用于其它可注册的 Vue 功能，如指令。

> 字符串模板

	<script type="text/x-template">

### data 必须是函数

旨在为每个组件提供独立的数据模型空间，不至于相互影响,如果想多组件共享一个数据 则返回同一份全局实例数据对象即可，然而大部分场景不是这样的

	data: function () {
	  return {
	    counter: 0
	  }
	}

### 构成组件

在 Vue 中，父子组件的关系可以总结为 props down, events up。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。

### 使用 Prop 传递数据

组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的 props 选项。

子组件要显式地用 props 选项声明它期待获得的数据：

	Vue.component('child', {
	  // 声明 props
	  props: ['message'],
	  // 就像 data 一样，prop 可以用在模板内
	  // 同样也可以在 vm 实例中像“this.message”这样使用
	  template: '<span>{{ message }}</span>'
	})

然后我们可以这样向它传入一个普通字符串：

	<child message="hello!"></child>

结果：Hello ！


**Tips：父组件在传递数据时需要使用绑定的模式进行传递，以便让Vue知道属性的值是js表达式而不是字符串,栗子：**.
~~~
正确：
<my-list v-bind:src-data="['item1','item2','item3']"></my-list>
错误：
<my-list src-data="['item1','item2','item3']"></my-list>
~~~

**后一种方式将会把js表达式认为是字符串，而导致语义不正确**

### camelCase vs. kebab-case 命名转换

HTML 特性是不区分大小写的。所以，当使用的不是字符串模版，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名：

	Vue.component('child', {
	  // camelCase in JavaScript
	  props: ['myMessage'],
	  template: '<span>{{ myMessage }}</span>'
	})
	
	Vue.component('child', {
	  // camelCase in JavaScript
	  props: ['myMessage'],
	  template: '<span>{{ myMessage }}</span>'
	})

如果你使用字符串模版，则没有这些限制。

### 动态 Prop

在模板中，要动态地绑定父组件的数据到子模板的 props，与绑定到任何普通的HTML特性相类似，就是用 v-bind。每当父组件的数据变化时，该变化也会传导给子组件：

	<div>
	  <input v-model="parentMsg">
	  <br>
	  <child v-bind:my-message="parentMsg"></child>
	</div>
	
	或者
	
	<child :my-message="parentMsg"></child>

### 字面量语法 vs 动态语法

初学者常犯的一个错误是使用字面量语法传递数值：

	<!-- 传递了一个字符串 "1" -->
	<comp some-prop="1"></comp>

因为它是一个字面 prop，它的值是字符串 "1" 而不是 number。如果想传递一个实际的 number，需要使用 v-bind，从而让它的值被当作 JavaScript 表达式计算：

	<!-- 传递实际的 number -->
	<comp v-bind:some-prop="1"></comp>

### 单向数据绑定

prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。你不应该在子组件内部改变 prop，正确的应对方式是：

1. 定义一个局部变量，并用 prop 的值初始化它：

		props: ['initialCounter'],
		data: function () {
		  return { counter: this.initialCounter }
		}

2. 定义一个计算属性，处理 prop 的值并返回。

		props: ['size'],
		computed: {
		  normalizedSize: function () {
		    return this.size.trim().toLowerCase()
		  }
		}

**PS：注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。**

### Prop 验证

我们可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue 会发出警告。当组件给其他人使用时，这很有用。

要指定验证规格，需要用对象的形式，而不能用字符串数组：

~~~
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
~~~

type 可以是下面原生构造器：

- String
- Number
- Boolean
- Function
- Object
- Array
- Symbol


当 prop 验证失败，Vue 会在抛出警告 (如果使用的是开发版本)

**Tips:props 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。**

## 非 Prop 属性

所谓非 prop 属性，就是它可以直接传入组件，而不需要定义相应的 prop。组件可以接收任意传入的属性，这些属性都会被添加到组件的根元素上。

	<bs-date-input data-3d-date-picker="true"></bs-date-input>

添加属性 data-3d-date-picker="true" 之后，它会被自动添加到 bs-date-input 的根元素上

### 替换/覆盖现有的特性

对于多数特性来说，传递给组件的值会覆盖组件本身设定的值。

class 和 style 特性会更聪明一些，这两个特性的值都会做合并 (merge) 操作

## 自定义事件

我们知道，父组件是使用 props 传递数据给子组件，但子组件怎么跟父组件通信呢？这个时候 Vue 的自定义事件系统就派得上用场了。

### 使用 v-on 绑定自定义事件

每个 Vue 实例都实现了事件接口 (Events interface)，即：

- 使用 $on(eventName) 监听事件
- 使用 $emit(eventName) 触发事件

*Vue 的事件系统分离自浏览器的 EventTarget API。尽管它们的运行类似，但是 $on 和 $emit 不是addEventListener 和 dispatchEvent 的别名。*

另外，父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

**不能用 $on 侦听子组件抛出的事件，而必须在模板里直接用 v-on 绑定，就像以下的例子：**

	<div id="counter-event-example">
	  <p>{{ total }}</p>
	  <button-counter v-on:increment="incrementTotal"></button-counter>
	  <button-counter v-on:increment="incrementTotal"></button-counter>
	</div>
	
	Vue.component('button-counter', {
	  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
	  data: function () {
	    return {
	      counter: 0
	    }
	  },
	  methods: {
	    incrementCounter: function () {
	      this.counter += 1
	      this.$emit('increment')
	    }
	  },
	})
	new Vue({
	  el: '#counter-event-example',
	  data: {
	    total: 0
	  },
	  methods: {
	    incrementTotal: function () {
	      this.total += 1
	    }
	  }
	})

在本例中，子组件已经和它外部完全解耦了。它所做的只是报告自己的内部事件，至于父组件是否关心则与它无关。留意到这一点很重要。

### 给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on。例如：

	<my-component v-on:click.native="doTheThing"></my-component>

### .sync 修饰符

在一些情况下，我们可能会需要对一个 prop 进行『双向绑定』,从 2.3.0 起我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 侦听器。

	<comp :foo.sync="bar"></comp>

会被扩展为：

	<comp :foo="bar" @update:foo="val => bar = val"></comp>

当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：

	this.$emit('update:foo', newValue)

### 使用自定义事件的表单输入组件

没懂文档什么意思...

### 非父子组件通信

有时候两个组件也需要通信 (非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：

var bus = new Vue();

1. 监听

	// 在组件 B 创建的钩子中监听事件
	bus.$on('id-selected', function (id) {
	  // ...
	})

2. 转发
	
	// 触发组件 A 中的事件
	bus.$emit('id-selected', 1)

**在复杂的情况下，我们应该考虑使用专门的状态管理模式.**


## 使用 Slot 分发内容

在使用组件时，我们常常要像这样组合它们：
	
	<app>
	  <app-header></app-header>
	  <app-footer></app-footer>
	</app>

### 编译作用域

在深入内容分发 API 之前，我们先明确内容在哪个作用域里编译。假定模板为：

	<child-component>
	  {{ message }}
	</child-component>

### 单个 Slot

除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。

最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。

最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。

假定 my-component 组件有下面模板：
	
	<div>
	  <h2>我是子组件的标题</h2>
	  <slot>
	    只有在没有要分发的内容时才会显示。
	  </slot>
	</div>

父组件模版：

	<div>
	  <h1>我是父组件的标题</h1>
	  <my-component>
	    <p>这是一些初始内容</p>
	    <p>这是更多的初始内容</p>
	  </my-component>
	</div>

渲染结果：

	<div>
	  <h1>我是父组件的标题</h1>
	  <div>
	    <h2>我是子组件的标题</h2>
	    <p>这是一些初始内容</p>
	    <p>这是更多的初始内容</p>
	  </div>
	</div>

### 具名 Slot

\<slot\> 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。

仍然可以有一个匿名 slot，它是默认 slot，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot，这些找不到匹配的内容片段将被抛弃。

例如，假定我们有一个 app-layout 组件，它的模板为：

	<div class="container">
	  <header>
	    <slot name="header"></slot>
	  </header>
	  <main>
	    <slot></slot>
	  </main>
	  <footer>
	    <slot name="footer"></slot>
	  </footer>
	</div>

父组件模版：

	<app-layout>
	  <h1 slot="header">这里可能是一个页面标题</h1>
	  <p>主要内容的一个段落。</p>
	  <p>另一个主要段落。</p>
	  <p slot="footer">这里有一些联系信息</p>
	</app-layout>

渲染结果为：

	<div class="container">
	  <header>
	    <h1>这里可能是一个页面标题</h1>
	  </header>
	  <main>
	    <p>主要内容的一个段落。</p>
	    <p>另一个主要段落。</p>
	  </main>
	  <footer>
	    <p>这里有一些联系信息</p>
	  </footer>
	</div>

在组合组件时，内容分发 API 是非常有用的机制。


## 父组件通知子组件

1. 子组件监听父组件发送的自定义事件
2. 父组件调用子组件方法

栗子：

~~~
<div class="app">
	<button @click="click">Click</button>
	//非常重要的一步，绑定ref，这样，在父组件的this上就能获取到子组件实例，否则无发获取到子组件实例对象
	<child ref="child"></child>
</div>

const child = {
	template: '<h1>Chile Node !</h1>',
	methods: {
		childCall(arg) {
			console.log('Call is successfully,Argument:' + arg);
		}
	},
	created: function() {
		//创建自定义事件响应处理回调
		this.$on('CallEvent', function(arg) {
			console.log('Listence is Success,Argument:' + arg);
		})
	}
}

new Vue({
	el: '.app',
	components: {
		child
	},
	methods: {
		click() {
			//向子组件投递自定义事件
			this.$refs.child.$emit('CallEvent', ['Event Arg']);
			//直接调用子组件预定义的方法
			this.$refs.child.childCall('Call Arg');
		}
	}
});
~~~









