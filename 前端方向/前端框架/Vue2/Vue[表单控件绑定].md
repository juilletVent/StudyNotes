# 表单控件绑定

## 用法

> 文本

	<input v-model="message" placeholder="edit me">
	<p>Message is: {{ message }}</p>

> 文本域

	<span>Multiline message is:</span>
	<p style="white-space: pre-line">{{ message }}</p>
	<br>
	<textarea v-model="message" placeholder="add multiple lines"></textarea>

**在文本区域插值( <textarea></textarea> ) 并不会生效，应用 v-model 来代替**

> 复选框

	<input type="checkbox" id="checkbox" v-model="checked">
	<label for="checkbox">{{ checked }}</label>

多个复选框绑定至同一个数组

	<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
	<label for="jack">Jack</label>
	<input type="checkbox" id="john" value="John" v-model="checkedNames">
	<label for="john">John</label>
	<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
	<label for="mike">Mike</label>
	<br>
	<span>Checked names: {{ checkedNames }}</span>

	new Vue({
	  el: '...',
	  data: {
	    checkedNames: []
	  }
	})

> 单选按钮

	<div id="example-4">
	  <input type="radio" id="one" value="One" v-model="picked">
	  <label for="one">One</label>
	  <br>
	  <input type="radio" id="two" value="Two" v-model="picked">
	  <label for="two">Two</label>
	  <br>
	  <span>Picked: {{ picked }}</span>
	</div>
	
	new Vue({
	  el: '#example-4',
	  data: {
	    picked: ''
	  }
	})

> 选择列表

	<div id="example-5">
	  <select v-model="selected">
	    <option disabled value="">请选择</option>
	    <option>A</option>
	    <option>B</option>
	    <option>C</option>
	  </select>
	  <span>Selected: {{ selected }}</span>
	</div>
	
	new Vue({
	  el: '...',
	  data: {
	    selected: ''
	  }
	})

*如果 v-model 表达初始的值不匹配任何的选项，&lt;select&gt; 元素就会以”未选中”的状态渲染。在 iOS 中，这会使用户无法选择第一个选项，因为这样的情况下，iOS 不会引发 change 事件。因此，像以上提供 disabled 选项是建议的做法。*


多选列表（绑定到一个数组）：

	<div id="example-6">
	  <select v-model="selected" multiple style="width: 50px">
	    <option>A</option>
	    <option>B</option>
	    <option>C</option>
	  </select>
	  <br>
	  <span>Selected: {{ selected }}</span>
	</div>
	
	new Vue({
	  el: '#example-6',
	  data: {
	    selected: []
	  }
	})

动态渲染：

	<select v-model="selected">
	  <option v-for="option in options" v-bind:value="option.value">
	    {{ option.text }}
	  </option>
	</select>
	<span>Selected: {{ selected }}</span>


## 修饰符

> .lazy

在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：

~~~
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
~~~

> .number

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

	<input v-model.number="age" type="number">

这通常很有用，因为在 type="number" 时 HTML 中输入的值也总是会返回字符串类型。

> .trim

如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：

	<input v-model.trim="msg">