<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript 定时器[均属于Window对象方法]](#javascript-%E5%AE%9A%E6%97%B6%E5%99%A8%E5%9D%87%E5%B1%9E%E4%BA%8Ewindow%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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