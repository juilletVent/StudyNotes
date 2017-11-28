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
























