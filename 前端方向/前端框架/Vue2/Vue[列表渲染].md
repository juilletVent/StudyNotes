<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [列表渲染](#%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93)
  - [v-for](#v-for)
    - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
    - [Template v-for](#template-v-for)
    - [对象迭代 v-for](#%E5%AF%B9%E8%B1%A1%E8%BF%AD%E4%BB%A3-v-for)
    - [整数迭代 v-for](#%E6%95%B4%E6%95%B0%E8%BF%AD%E4%BB%A3-v-for)
  - [数组更新检测](#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)
    - [Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：](#vue-%E5%8C%85%E5%90%AB%E4%B8%80%E7%BB%84%E8%A7%82%E5%AF%9F%E6%95%B0%E7%BB%84%E7%9A%84%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95%E6%89%80%E4%BB%A5%E5%AE%83%E4%BB%AC%E4%B9%9F%E5%B0%86%E4%BC%9A%E8%A7%A6%E5%8F%91%E8%A7%86%E5%9B%BE%E6%9B%B4%E6%96%B0%E8%BF%99%E4%BA%9B%E6%96%B9%E6%B3%95%E5%A6%82%E4%B8%8B)
    - [注意事项](#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
  - [显示过滤/排序结果](#%E6%98%BE%E7%A4%BA%E8%BF%87%E6%BB%A4%E6%8E%92%E5%BA%8F%E7%BB%93%E6%9E%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 列表渲染

## v-for 

我们用 v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组并且 item 是数组元素迭代的别名。

### 基本使用

	<ul id="example-1">
	  <li v-for="item in items">
	    {{ item.message }}
	  </li>
	</ul>
	
	var example1 = new Vue({
	  el: '#example-1',
	  data: {
	    items: [
	      {message: 'Foo' },
	      {message: 'Bar' }
	    ]
	  }
	})

在 v-for 块中，**我们拥有对父作用域属性的完全访问权限**。 v-for 还支持一个可选的第二个参数为当前项的索引。

	<ul id="example-2">
	  <li v-for="(item, index) in items">
	    {{ parentMessage }} - {{ index }} - {{ item.message }}
	  </li>
	</ul>
	
	var example2 = new Vue({
	  el: '#example-2',
	  data: {
	    parentMessage: 'Parent',
	    items: [
	      { message: 'Foo' },
	      { message: 'Bar' }
	    ]
	  }
	})

对父级作用域的完全访问意思是可以访问到parentMessage

你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：

	<div v-for="item of items"></div>


### Template v-for

如同 v-if 模板，你也可以用带有 v-for 的 <template> 标签来渲染多个元素块。例如：

	<ul>
	  <template v-for="item in items">
	    <li>{{ item.msg }}</li>
	    <li class="divider"></li>
	  </template>
	</ul>

### 对象迭代 v-for

你也可以用 v-for 通过一个对象的属性来迭代。

	<ul id="repeat-object" class="demo">
	  <li v-for="value in object">
	    {{ value }}
	  </li>
	</ul>
	
	new Vue({
	  el: '#repeat-object',
	  data: {
	    object: {
	      firstName: 'John',
	      lastName: 'Doe',
	      age: 30
	    }
	  }
	})

附加选项：值、键、索引

	<div v-for="(value, key, index) in object">
	  {{ index }}. {{ key }} : {{ value }}
	</div>


### 整数迭代 v-for

v-for 也可以取整数。在这种情况下，它将重复多次模板。

	<div>
	  <span v-for="n in 10">{{ n }} </span>
	</div>


## 数组更新检测

### Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

### 注意事项

由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

- 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
- 当你修改数组的长度时，例如： vm.items.length = newLength

为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果， 同时也将触发状态更新：

	// Vue.set
	Vue.set(example1.items, indexOfItem, newValue)

	// Array.prototype.splice
	example1.items.splice(indexOfItem, 1, newValue)

## 显示过滤/排序结果

有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。

	<li v-for="n in evenNumbers">{{ n }}</li>
	
	data: {
	  numbers: [ 1, 2, 3, 4, 5 ]
	},
	computed: {
	  evenNumbers: function () {
	    return this.numbers.filter(function (number) {
	      return number % 2 === 0
	    })
	  }
	}

在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个 method 方法：

	<li v-for="n in even(numbers)">{{ n }}</li>
	
	data: {
	  numbers: [ 1, 2, 3, 4, 5 ]
	},
	methods: {
	  even: function (numbers) {
	    return numbers.filter(function (number) {
	      return number % 2 === 0
	    })
	  }
	}
























