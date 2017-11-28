# 条件渲染

## v-if

	<h1 v-if="ok">Yes</h1>
	<h1 v-else>No</h1>

### 在 <template> 中配合 v-if 条件渲染一整组

因为 v-if 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 <template> 元素当做包装元素，并在上面使用 v-if。最终的渲染结果不会包含 <template> 元素。

	<template v-if="ok">
	  <h1>Title</h1>
	  <p>Paragraph 1</p>
	  <p>Paragraph 2</p>
	</template>

### v-else

你可以使用 v-else 指令来表示 v-if 的“else 块”：

	<div v-if="Math.random() > 0.5">
	  Now you see me
	</div>
	<div v-else>
	  Now you don't
	</div>

**TISP：v-else 元素必须紧跟在 v-if 或者 v-else-if 元素的后面——否则它将不会被识别。**

### v-else-if

v-else-if，顾名思义，充当 v-if 的“else-if 块”。可以链式地使用多次

	<div v-if="type === 'A'">
	  A
	</div>
	<div v-else-if="type === 'B'">
	  B
	</div>
	<div v-else-if="type === 'C'">
	  C
	</div>
	<div v-else>
	  Not A/B/C
	</div>

类似于 v-else，v-else-if 必须紧跟在 v-if 或者 v-else-if 元素之后。

### 用 key 管理可复用的元素

~~~
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
~~~

那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模版使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来声明“这两个元素是完全独立的——不要复用它们”。只需添加一个具有唯一值的 key 属性即可：

	<template v-if="loginType === 'username'">
	  <label>Username</label>
	  <input placeholder="Enter your username" key="username-input">
	</template>
	<template v-else>
	  <label>Email</label>
	  <input placeholder="Enter your email address" key="email-input">
	</template>

注意, <label> 元素仍然会被高效地复用，因为它们没有添加 key 属性。


## v-show

另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：

	<h1 v-show="ok">Hello!</h1>

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 是简单地切换元素的 CSS 属性 display 。

**注意， v-show 不支持 <template> 语法，也不支持 v-else。**

## v-if 与 v-for 一起使用

当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级








