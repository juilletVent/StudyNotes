<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [计算属性](#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)
  - [计算属性](#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-1)
    - [计算属性 VS Methods](#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-methods)
    - [Computed 属性 vs Watched 属性](#computed-%E5%B1%9E%E6%80%A7-vs-watched-%E5%B1%9E%E6%80%A7)
    - [计算setter](#%E8%AE%A1%E7%AE%97setter)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 计算属性

模板内的表达式是非常便利的，但是它们实际上只用于简单的运算。在模板中放入太多的逻辑会让模板过重且难以维护

## 计算属性

HTML：

~~~
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
~~~

JS：

~~~
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
~~~

这里我们声明了一个计算属性 reversedMessage 。我们提供的函数将用作属性 vm.reversedMessage 的 getter 。

### 计算属性 VS Methods

**Tips：计算属性是基于它们的依赖进行缓存的**

计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数，相比而言，只要发生重新渲染，method 调用总会执行该函数。如果你不希望有缓存，请用 method 替代。

### Computed 属性 vs Watched 属性

watch：

~~~
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
~~~

computed :
~~~
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
~~~

### 计算setter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
~~~
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
~~~

现在再运行 vm.fullName = 'John Doe' 时， setter 会被调用， vm.firstName 和 vm.lastName 也相应地会被更新。