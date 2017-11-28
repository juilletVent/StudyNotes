# Vue Class与Style绑定

## 绑定HTML Class

### 对象语法

我们可以传给 v-bind:class 一个对象，以动态地切换 class 。

	<div v-bind:class="{ active: isActive }"></div>

上面的语法表示 classactive 的更新将取决于数据属性 isActive 是否为真值 。

我们也可以在对象中传入更多属性用来动态切换多个 class 。此外， v-bind:class 指令可以与普通的 class 属性共存。

如下模板:

	<div class="static"
	     v-bind:class="{ active: isActive, 'text-danger': hasError }">
	</div>

数据：
	
	data: {
	  isActive: true,
	  hasError: false
	}

渲染为：

	<div class="static active"></div>

你也可以直接绑定数据里的一个对象：

	<div v-bind:class="classObject"></div>

	data: {
	  classObject: {
	    active: true,
	    'text-danger': false
	  }
	}

渲染的结果和上面一样。我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式：

	<div v-bind:class="classObject"></div>

	data: {
	  isActive: true,
	  error: null
	},
	computed: {
	  classObject: function () {
	    return {
	      active: this.isActive && !this.error,
	      'text-danger': this.error && this.error.type === 'fatal',
	    }
	  }
	}

### 数组语法

我们可以把一个数组传给 v-bind:class ，以应用一个 class 列表：

	<div v-bind:class="[activeClass, errorClass]">

	data: {
	  activeClass: 'active',
	  errorClass: 'text-danger'
	}

渲染为：

	<div class="active text-danger"></div>

**数组语法中可以混入对象语法，不冲突**

栗子：

	<div v-bind:class="[{ active: isActive }, errorClass]">

## 绑定内联样式

### 对象语法

v-bind:style 的对象语法十分直观——看着非常像 CSS

	<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

	data: {
	  activeColor: 'red',
	  fontSize: 30
	}

直接绑定到一个样式对象通常更好，让模板更清晰：

	<div v-bind:style="styleObject"></div>

	data: {
	  styleObject: {
	    color: 'red',
	    fontSize: '13px'
	  }
	}

### 数组语法

v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：

	<div v-bind:style="[baseStyles, overridingStyles]">

### 自动添加前缀

当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。
































