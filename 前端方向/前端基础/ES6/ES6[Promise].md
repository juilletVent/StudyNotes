<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Promise](#promise)
  - [链式调用](#%E9%93%BE%E5%BC%8F%E8%B0%83%E7%94%A8)
  - [catch 错误捕获](#catch-%E9%94%99%E8%AF%AF%E6%8D%95%E8%8E%B7)
  - [finally](#finally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Promise
	
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署

	const promise = new Promise(function(resolve, reject) {
	  // ... some code
	
	  if (/* 异步操作成功 */){
	    resolve(value);
	  } else {
	    reject(error);
	  }
	});

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

	promise.then(function(value) {
	  // success
	}, function(error) {
	  // failure
	});

then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数

栗子：
	
	function timeout(ms) {
	  return new Promise((resolve, reject) => {
	    setTimeout(resolve, ms, 'done');
	  });
	}
	
	timeout(100).then((value) => {
	  console.log(value);
	});

Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出

	let promise = new Promise(function(resolve, reject) {
	  console.log('Promise');
	  resolve();
	});
	
	promise.then(function() {
	  console.log('resolved.');
	});
	
	console.log('Hi!');
	
	// Promise
	// Hi!
	// resolved

加载图片额栗子：

	function loadImageAsync(url) {
	  return new Promise(function(resolve, reject) {
	    const image = new Image();
	
	    image.onload = function() {
	      resolve(image);
	    };
	
	    image.onerror = function() {
	      reject(new Error('Could not load image at ' + url));
	    };
	
	    image.src = url;
	  });
	}

Ajax栗子：
	
	const getJSON = function(url) {
	  const promise = new Promise(function(resolve, reject){
	    const handler = function() {
	      if (this.readyState !== 4) {
	        return;
	      }
	      if (this.status === 200) {
	        resolve(this.response);
	      } else {
	        reject(new Error(this.statusText));
	      }
	    };
	    const client = new XMLHttpRequest();
	    client.open("GET", url);
	    client.onreadystatechange = handler;
	    client.responseType = "json";
	    client.setRequestHeader("Accept", "application/json");
	    client.send();
	
	  });
	
	  return promise;
	};
	
	getJSON("/posts.json").then(function(json) {
	  console.log('Contents: ' + json);
	}, function(error) {
	  console.error('出错了', error);
	});

## 链式调用

Promise.then方法返回的是另外一个Promise对象，在then方法传入的回调函数内返回的对象对作为下一个Promise对象对应的回调函数的参数，也就是说有如下对应关系：

	new Promise(function(resolve,reject){
		//一步操作结果，调用resolve/reject，传入异步结果
	}).then(function(data){
		//第一轮成功回调，返回 另外一个Promise对象
		return new promise(...);
	}).then(function(data){
		//第二轮成功回调
		//接收到第一轮回调返回的Promise对象中resolve函数传入的参数
	})

栗子：

	let a = new Promise(function(resolve,reject){
		setTimeout(function() {
			resolve('success');
		},2000)
	}).then(function(data){
		console.log('First Call Back:'+data);
		console.log('return Promise Object');
		return new Promise(function(resolve,reject){
			setTimeout(function() {
				resolve('success-second');
			},2000)
		});
	}).then(function(data){
		console.log(data);
	})
	
	//输出结果：

	$ node Promise.js
	First Call Back:success
	return Promise Object
	success-second

## catch 错误捕获

	let a = new Promise(function(resolve,reject){
		setTimeout(function() {
			resolve('success');
		},2000)
	}).then(function(data){
		console.log('First Call Back:'+data);
		throw new Error('test Error');
	}).catch(function(e){
		console.log(e);
	})

## finally

finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的

与Java的finally基本一致，前端几乎用不上，多用于资源释放

