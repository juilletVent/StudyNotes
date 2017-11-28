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