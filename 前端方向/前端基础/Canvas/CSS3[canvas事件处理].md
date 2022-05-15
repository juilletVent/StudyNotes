<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3[canvas事件处理]](#css3canvas%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
  - [canvas绑定鼠标事件：](#canvas%E7%BB%91%E5%AE%9A%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3[canvas事件处理]

## canvas绑定鼠标事件：

> 鼠标抬起
~~~
can.addEventListener('mouseup',function(event){
	console.log('event.x.y:'+event.x+','+event.y);
	console.log('event.clientX.clientY:'+event.clientX+','+event.clientY);
});

~~~

> 鼠标按下

~~~
can.addEventListener('mousemove',function(event){
	mousPosition.x = event.x - can.getBoundingClientRect().left;
	mousPosition.y = event.y - can.getBoundingClientRect().top;
	
	offsetX = (mousPosition.x-CAN_WIDTH/2)/(CAN_WIDTH/2)
	offsetY = (mousPosition.y-CAN_HEIGHT/2)/(CAN_HEIGHT/2)
});
~~~

## 获取鼠标事件的canvas绘图区域相对坐标

~~~
can.addEventListener('mousemove',function(event){
//事件坐标，减去canvas绘图区域左上角坐标，即可得到canvas画布相对坐标
	mousPosition.x = event.x - can.getBoundingClientRect().left;
	mousPosition.y = event.y - can.getBoundingClientRect().top;
});
~~~