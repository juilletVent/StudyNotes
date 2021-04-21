<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [事件处理](#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
  - [监听事件](#%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6)
  - [方法事件处理器](#%E6%96%B9%E6%B3%95%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%99%A8)
  - [内联处理器方法](#%E5%86%85%E8%81%94%E5%A4%84%E7%90%86%E5%99%A8%E6%96%B9%E6%B3%95)
  - [事件修饰符](#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
  - [键值修饰符](#%E9%94%AE%E5%80%BC%E4%BF%AE%E9%A5%B0%E7%AC%A6)
    - [修饰键](#%E4%BF%AE%E9%A5%B0%E9%94%AE)
    - [滑鼠按键修饰符](#%E6%BB%91%E9%BC%A0%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 事件处理

## 监听事件

可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。

	<div id="example-1">
	  <button v-on:click="counter += 1">增加 1</button>
	  <p>这个按钮被点击了 {{ counter }} 次。</p>
	</div>

	var example1 = new Vue({
	  el: '#example-1',
	  data: {
	    counter: 0
	  }
	})

## 方法事件处理器

许多事件处理的逻辑都很复杂，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。因此 v-on 可以接收一个定义的方法来调用。

	<div id="example-2">
	  <!-- `greet` 是在下面定义的方法名 -->
	  <button v-on:click="greet">Greet</button>
	</div>
	
	var example2 = new Vue({
	  el: '#example-2',
	  data: {
	    name: 'Vue.js'
	  },
	  // 在 `methods` 对象中定义方法
	  methods: {
	    greet: function (event) {
	      // `this` 在方法里指当前 Vue 实例
	      alert('Hello ' + this.name + '!')
	      // `event` 是原生 DOM 事件
	      if (event) {
	        alert(event.target.tagName)
	      }
	    }
	  }
	})
	// 也可以用 JavaScript 直接调用方法
	example2.greet() // -> 'Hello Vue.js!'


## 内联处理器方法

除了直接绑定到一个方法，也可以用内联 JavaScript 语句：

	<div id="example-3">
	  <button v-on:click="say('hi')">Say hi</button>
	  <button v-on:click="say('what')">Say what</button>
	</div>
	
	new Vue({
	  el: '#example-3',
	  methods: {
	    say: function (message) {
	      alert(message)
	    }
	  }
	})


有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：


	<button v-on:click="warn('Form cannot be submitted yet.', $event)">
	  Submit
	</button>
	
	methods: {
	  warn: function (message, event) {
	    // 现在我们可以访问原生事件对象
	    if (event) event.preventDefault()
	    alert(message)
	  }
	}

## 事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题， Vue.js 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。

- .stop
- .prevent
- .capture
- .self
- .once

~~~
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（比如不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
~~~


## 键值修饰符

在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加关键修饰符：

~~~
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
~~~

记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

~~~
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
~~~

全部的按键别名：

- .enter
- .tab
- .delete (捕获 “删除” 和 “退格” 键)
- .esc
- .space
- .up
- .down
- .left
- .right

可以通过全局 config.keyCodes 对象自定义键值修饰符别名：

	// 可以使用 v-on:keyup.f1
	Vue.config.keyCodes.f1 = 112


### 修饰键

可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应。

- .ctrl
- .alt
- .shift
- .meta

~~~
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
~~~

### 滑鼠按键修饰符

- .left
- .right
- .middle





