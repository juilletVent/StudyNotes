<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [指令](#%E6%8C%87%E4%BB%A4)
  - [定义指令](#%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4)
  - [钩子函数](#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)
  - [钩子函数参数](#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0)
  - [函数简写](#%E5%87%BD%E6%95%B0%E7%AE%80%E5%86%99)
  - [对象字面量](#%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E9%87%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 指令

## 定义指令

> 全局指令

~~~
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
~~~

> 组件指令

也可以注册局部指令，组件中接受一个 directives 的选项：

~~~
directives: {
  focus: {
    // 指令的定义---
  }
}
~~~

然后你可以在模板中任何元素上使用新的 v-focus 属性：

	<input v-focus>

## 钩子函数

指令定义函数提供了几个钩子函数（可选）：

- bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
- inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
- update: 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- componentUpdated: 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
- unbind: 只调用一次， 指令与元素解绑时调用。

**接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。**

## 钩子函数参数

钩子函数被赋予了以下参数：

- el: 指令所绑定的元素，可以用来直接操作 DOM 。
- binding: 一个对象，包含以下属性：
	- name: 指令名，不包括 v- 前缀。
    - value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
    - oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    - expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
    - arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
    - modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
- vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
- oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

**除了 el 之外，其它参数都应该是只读的，尽量不要修改他们。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。**

栗子：

	<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>

	Vue.directive('demo', {
	  bind: function (el, binding, vnode) {
	    var s = JSON.stringify
	    el.innerHTML =
	      'name: '       + s(binding.name) + '<br>' +
	      'value: '      + s(binding.value) + '<br>' +
	      'expression: ' + s(binding.expression) + '<br>' +
	      'argument: '   + s(binding.arg) + '<br>' +
	      'modifiers: '  + s(binding.modifiers) + '<br>' +
	      'vnode keys: ' + Object.keys(vnode).join(', ')
	  }
	})
	new Vue({
	  el: '#hook-arguments-example',
	  data: {
	    message: 'hello!'
	  }
	})

## 函数简写

大多数情况下，我们可能想在 bind 和 update 钩子上做重复动作，并且不想关心其它的钩子函数。可以这样写:

	Vue.directive('color-swatch', function (el, binding) {
	  el.style.backgroundColor = binding.value
	})

## 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法类型的 JavaScript 表达式。

	<div v-demo="{ color: 'white', text: 'hello!' }"></div>

	Vue.directive('demo', function (el, binding) {
	  console.log(binding.value.color) // => "white"
	  console.log(binding.value.text)  // => "hello!"
	})