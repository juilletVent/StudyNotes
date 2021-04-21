<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Canvas绘制动画](#canvas%E7%BB%98%E5%88%B6%E5%8A%A8%E7%94%BB)
  - [使用 window.requestAnimationFrame](#%E4%BD%BF%E7%94%A8-windowrequestanimationframe)
  - [兼容问题|优雅降级](#%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98%E4%BC%98%E9%9B%85%E9%99%8D%E7%BA%A7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Canvas绘制动画

## 使用 window.requestAnimationFrame

> 设置动画绘制

API：window.requestAnimationFrame(callback)

返回：动画执行标识，用于取消动画

解释：浏览器专为动画开放的API接口，接口传入回调函数名，返回注册的动画的执行标示，此标识可以用于取消动画

> 取消动画绘制

API：window.cancelAnimationFrame(animID)

解释：取消由window.requestAnimationFrame(callback)创建的动画

> 栗子

~~~
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var start = null;
var d = document.getElementById('SomeElementYouWantToAnimate');
function step(timestamp) { 
  if (start === null) start = timestamp;
  var progress = timestamp - start;
  d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}
requestAnimationFrame(step);
~~~

**Tips：requestAnimationFrame函数不是定时函数，完成持续调用需用在回调函数中进行递归调用**


## 兼容问题|优雅降级

~~~
window.requestAnimationFrame = (function() {
	return window.requestAnimationFrame || //Chromium
		window.webkitRequestAnimationFrame || //Webkit
		window.mozRequestAnimationFrame || //Mozilla Geko
		window.oRequestAnimationFrame || //Opera Presto
		window.msRequestAnimationFrame || //IE Trident?
		function(callback, element) { //Fallback function
			console.log("Fallback");
			return window.setTimeout(callback, 1000 / 30);
		}
})();
~~~