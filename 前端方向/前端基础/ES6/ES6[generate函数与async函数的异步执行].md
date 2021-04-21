<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Generate 函数](#generate-%E5%87%BD%E6%95%B0)
- [Async 函数](#async-%E5%87%BD%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Generate 函数

Generate函数借助yield表达式将执行权交回外部，但是异步流程执行核心仍然为 callback 或者 promise，并且由于需要调用next推进generate继续执行，需要一个执行器才能完成函数的自动执行，下面是一个generate函数自动执行的promise实现：


	function* gen() {
	  var a = yield new Promise((res, rej) => {
	    setTimeout(() => {
	      res("success-1");
	    }, 2000);
	  });
	  console.log("a:", a);
	
	  var b = yield new Promise((res, rej) => {
	    setTimeout(() => {
	      res("success-2");
	    }, 2000);
	  });
	
	  console.log("b:", b);
	  console.log("done");
	}
	
	function runGen(fn) {
	  let iterator = fn();
	  let res = iterator.next();
	
	  function runInner(res) {
	    if (!res.done) {
	      let pros = res.value;
	      pros.then(val => {
	        res = iterator.next(val);
	        runInner(res);
	      });
	    }
	  }
	
	  runInner(res);
	}
	
	runGen(gen);

## Async 函数

async函数相当于generate的语法糖，需要配合promise使用，自带执行器，只需要await后表达式返回值为promise即可完成异步编写，样例：

	async function testAsync() {
	  var a = await new Promise((res, rej) => {
	    setTimeout(() => {
	      res("success-1");
	    }, 2000);
	  });
	  console.log("a:", a);
	
	  var b = await new Promise((res, rej) => {
	    setTimeout(() => {
	      res("success-2");
	    }, 2000);
	  });
	
	  console.log("b:", b);
	  console.log("done");
	}
	
	testAsync().then(val => {
	  console.log("async done");
	});
