# JavaScript 动画

## 思想

基础数值动画使用setInterval定时器，定时改变CSS样式实现

## 缓冲速度

如果想要实现速度变化的动画效果，可使用如下算法模拟：

当前动画效果步进值 = (1-当前效果位置/目标效果位置)*全局步进值

例如：

~~~
将元素向右移动200px

//设置步进值为10px;
var step = 10;
var currPos = 0;
targetPos = 200;

while(vurrPos<targetPos){
	currPos += (1-currPos/targetPos)*setp;
}
~~~

当然也可以配合其他数学函数实现更多的缓冲效果，例如实现一个前快后慢的缓冲，使用Cos函数实现

例如：

~~~
将元素向右移动200px

//设置步进值为10px;
var step = 10;
var currPos = 0;
targetPos = 200;


while(vurrPos<targetPos){
	currPos += (currPos/targetPos*0.5*Math.PI)*setp;
}
~~~

使用到了Cos函数图形的[0,π/2]区间上的函数变化，效果为前高后低，故呈现出前快后慢的效果

## 动画链

使用回调接口实现[callback]，前一段动画结束时，执行传入的下一段动画的函数即可