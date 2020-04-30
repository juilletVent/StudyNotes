### JavaScript 定时器[均属于Window对象方法]

- setInterval/clearInterval[定时任务，多次]
~~~
var int=self.setInterval("clock()",50)；
window.clearInterval(int)
~~~

- setTimeout/clearTimeout[延时任务，一次]
~~~
var t=setTimeout("alert('5 seconds!')",5000)；
clearTimeout(t)
~~~