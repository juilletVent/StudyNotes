<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Async/await](#asyncawait)
  - [Async](#async)
  - [Await](#await)
    - [thenables](#thenables)
    - [Class成员方法](#class%E6%88%90%E5%91%98%E6%96%B9%E6%B3%95)
    - [Promise all](#promise-all)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Async/await

## Async

有一种特殊的语法可以更舒适地与promise协同工作，它叫做async/await，它是非常的容易理解和使用。

	async function f() {
	    return 1
	}

函数前面的async一词意味着一个简单的事情：这个函数总是返回一个promise，如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。

	async function f() {
	    return 1
	}
	f().then(alert) // 1

所以，async确保了函数返回一个promise，即使其中包含非promise。够简单了吧？但是不仅仅只是如此，还有另一个关键词await，只能在async函数里使用，同样，它也很cool。


## Await

这类语法只能在添加了Async的函数内部使用，不能再顶级作用域与没有添加Async的函数作用域使用，否则将会导致语法错误。

	// 只能在async函数内部使用
	let value = await promise

关键词await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行

	async function f() {
	    let promise = new Promise((resolve, reject) => {
	        setTimeout(() => resolve('done!'), 1000)
	    })
	    let result = await promise // 直到promise返回一个resolve值（*）
	    alert(result) // 'done!' 
	}
	f()


### thenables

并不是一定是Promise对象才能执行 Await，只要对象具备then方法，就可以用于Awaiw指令

	class Thenable {
	   constructor(num) {
	       this.num = num
	   }
	   then(resolve, reject) {
	       alert(resolve) // function() {native code}
	       // 1000ms后将this.num*2作为resolve值
	       setTimeout(()=> {resolve(this.num * 2), 1000})
	   }
	}
	async function(f) {
	   // 等待1s，result变为2
	   let result = await new Thenable(1)
	   alert(result)
	}
	f()

如果await得到了一个带有then方法的非promise对象，它将会调用提供原生函数resolve、reject作为参数的方法，然后await一直等待，直到他们其中的一个被调用

### Class成员方法

也支持Async，确保该方法返回Promise对象

### Promise all

	// 直到数组全部返回结果
	let results = await Promise.all([
	   fetch(url1),
	   fetch(url2),
	   ...
	])

