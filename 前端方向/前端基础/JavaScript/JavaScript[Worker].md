<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Worker 后台线程](#worker-%E5%90%8E%E5%8F%B0%E7%BA%BF%E7%A8%8B)
    - [index.html](#indexhtml)
    - [back.js](#backjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Worker 后台线程

### index.html

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Document</title>
	</head>
	<body>
	    <button onclick="cl();">send</button>
	</body>
	<script>
	    var work = new Worker('back.js');
	    work.onmessage = function (e) {
	        console.log('接收到来自Worker的信息：'+e.data);
	    }
	    function cl() {
	        work.postMessage('这是由外部发送至worker的一条信息');
	    }
	</script>
	</html>

### back.js

	var runCount = 0;
	
	function run() {
	    setTimeout(function() {
	        if(runCount++<3){
	            run();
	        }
	    },2000);
	    console.log('runCount:'+runCount);
	}
	
	this.onmessage = function(e) {
	    console.log('接收到来自外部的信息：'+ e.data);
	    this.postMessage('这是一条发送自Worker的消息');
	}
	
	run();

**Tisp:** postMessage不能传递复杂对象，只能传递可以结构性复制的对象，或者字符串，所以一般采用json.stringify序列化之后的字符串进行传递，内部进行反序列化