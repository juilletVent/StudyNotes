# CSS3变换

CSS3中所有的动画都是基于矩阵运算，也就是都是由Matrix来实现的矩阵变化。
**transform-origin:20% 40%;**
**动画中心参考点：transform-origin: bottom left;**

## CSS3变形--旋转 rotate()

设置一个角度值，用来指定旋转的幅度。如果这个值为正值，元素相对原点中心顺时针旋转；如果这个值为负值，元素相对原点中心逆时针旋转

~~~
raotate(x)

.wrapper span {
  display:block;
 -webkit-transform: rotate(20deg);
 -moz-transform: rotate(20deg);
  transform:rotate(20deg);
 }
~~~

## CSS3中的变形--扭曲 skew()

扭曲skew()函数能够让元素倾斜显示。它可以将一个对象以其中心位置围绕着X轴和Y轴按照一定的角度倾斜。这与rotate()函数的旋转不同，rotate()函数只是旋转，而不会改变元素的形状。skew()函数不会旋转，而只会改变元素的形状。

~~~
skew(x,y)  skewX(x)  skewY(y)

.wrapper span {
  display:block;
  -webkit-transform:skew(-45deg);
  -moz-transform:skew(-45deg);
  transform:skew(-45deg);
}
~~~

## CSS3中的变形--缩放 scale()

缩放 scale()函数 让元素根据中心原点对对象进行缩放。

~~~
scale(X,Y)  scaleX(X)  scaleY(Y)

.wrapper div {
  width: 200px;
  height: 200px;
  line-height: 200px;
  background: orange;
  text-align: center;
  color: #fff;
  opacity: 0;
  transition:all 0.7s linear;
  -webkit-transition:all 0.5s linear;
  -moz-transition:all 0.5s linear;
}

.wrapper:hover div{
  opacity: 0.9;
  -webkit-transform:scale(1.1,1.1);
  -moz-transform:scale(1.1,1.1);
  transform:scale(1.1,1.1);
}
~~~

**注意： scale()的取值默认的值为1，当值设置为0.01到0.99之间的任何值，作用使一个元素缩小；而任何大于或等于1.01的值，作用是让元素放大。**

## CSS3中的变形--位移 translate()

translate()函数可以将元素向指定的方向移动，类似于position中的relative。或以简单的理解为，**使用translate()函数，可以把元素从原来的位置移动，而不影响在X、Y轴上的任何Web组件。**

~~~
translate(x,y)  translateX(x)  translateY(Y)

-webkit-transform:translate(-50%,-50%);
-moz-transform:translate(-50%,-50%);
transform:translate(-50%,-50%);
~~~

## CSS3中的2D变形--矩阵 matrix()[最终实现方法]

matrix() 是一个含六个值的(a,b,c,d,e,f)变换矩阵，用来指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素

相关连接：

- <a href="http://www.zhangxinxu.com/wordpress/?p=2427" target="_blank">http://www.zhangxinxu.com/wordpress/?p=2427</a>
- <a href="http://www.zhangxinxu.com/wordpress/?p=1268" target="_blank">http://www.zhangxinxu.com/wordpress/?p=1268</a>


**PS:此方法是以上2D变换方法的基础实现，高阶应用均源于此方法**

## CSS3中的变形--原点 transform-origin

任何一个元素都有一个中心点，默认情况之下，其中心点是居于元素X轴和Y轴的50%处，在没有重置transform-origin改变元素原点位置的情况下，CSS变形进行的旋转、位移、缩放，扭曲等操作都是以元素自己中心位置进行变形

transform-origin取值和元素设置背景中的background-position取值类似，如下表所示

![](http://img.mukewang.com/53391ea500013e4706860384.jpg)

## CSS3中的动画--过渡属性 transition

在CSS中创建简单的过渡效果可以从以下几个步骤来实现：

1. 在默认样式中声明元素的初始状态样式；
2. 声明过渡元素最终状态样式，比如悬浮状态；
3. 在默认样式中通过添加过渡函数，添加一些不同的样式。

CSS3的过度transition属性是一个复合属性，主要包括以下几个子属性:

- transition-property:指定过渡或动态模拟的CSS属性
- transition-duration:指定完成过渡所需的时间
- transition-timing-function:指定过渡函数
- transition-delay:指定开始出现的延迟时间

简写：

	transition:all .5s linear .18s;
	参数：挂载的属性、执行时间、动画插补器|函数、启动延时

支持过度动画的CSS属性：

![](http://img.mukewang.com/5344eca300010a8005510421.jpg)

~~~
div {
  width: 200px;
  height: 200px;
  background: red;
  margin: 20px auto;
  -webkit-transition-property: width;
  transition-property: width;
  -webkit-transition-duration:.5s;
  transition-duration:.5s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  -webkit-transition-delay: .18s;
  transition-delay:.18s;
}
div:hover {
  width: 400px;
}
~~~

> 动画插补器|执行函数

transition-timing-function属性指的是过渡的“缓动函数”。主要用来指定浏览器的过渡速度

参数列表：

![](http://img.mukewang.com/5344f1320001481905640812.jpg)


## CSS3 Keyframes介绍

Keyframes被称为关键帧，其类似于Flash中的关键帧。在CSS3中其主要以“@keyframes”开头，后面紧跟着是动画名称加上一对花括号“{…}”，括号中就是一些不同时间段样式规则。

~~~
@keyframes changecolor{
  0%{
   background: red;
  }
  50%{
   background: yellow
  }
  100%{
   background: green;
  }
}
~~~

*经验与技巧：在@keyframes中定义动画名称时，其中0%和100%还可以使用关键词from和to来代表，其中0%对应的是from，100%对应的是to。*

支持：**Chrome 和 Safari 需要前缀 -webkit-；Foxfire 需要前缀 -moz-。**

## CSS3中调用动画

> animation-name

animation-name属性主要是用来调用 @keyframes 定义好的动画。需要特别注意: animation-name 调用的动画名需要和“@keyframes”定义的动画名称完全一致（区分大小写），如果不一致将不具有任何动画效果。

	animation-name: none | IDENT[,none|DENT]*;

支持：需要在 Chrome 和 Safari 上面的基础上加上-webkit-前缀，Firefox加上-moz-

> animation-duration

用来指定元素播放动画所持续的时间长，也就是完成从0%到100%一次动画所需时间

	animation-duration: <time>[,<time>]*

> animation-timing-function[插补器]

用来设置动画播放方式。主要让元素根据时间的推进来改变属性值的变换速率，简单点说就是动画的播放方式。

取值：ease	|linear	|ease-in|ease-out	|ease-in-out
含义：快->慢	|线性	|加速	|减速		|加速->减速

> animation-delay [启动延时]

和过渡延迟属性一样，用于定义在浏览器开始执行动画之前等待的时间。

> animation-iteration-count [播放次数]

1. 其值通常为整数，但也可以使用带有小数的数字，其默认值为1，这意味着动画将从开始到结束只播放一次。
2. 如果取值为infinite，动画将会无限次的播放。

**注意：Chrome或Safari浏览器，需要加入-webkit-前缀！**

> animation-direction [播放方向]

取值：normal|alternate

1. normal是默认值，如果设置为normal时，动画的每次循环都是向前播放；
2. 另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。
3. 可用于创建往复动画

**注意：Chrome或Safari浏览器，需要加入-webkit-前缀！**

> animation-play-state[播放状态]

取值：running|paused

可以通过paused将正在播放的动画停下来，也可以通过running将暂停的动画重新播放，这里的重新播放不一定是从元素动画的开始播放，而是从暂停的那个位置开始播放。另外如果暂停[此属性不会清除动画，使用animation:paused才会回到初始样式]了动画的播放，元素的样式将回到最原始设置状态

1. div:hover span { animation:paused;} 相当于清除了animation动画。元素的样式将会回到最原始的设置状态。
2. div:hover span { animation-play-state:paused;} 相当于中止动画。鼠标移开继续播放。

> animation-fill-mode[指定属性动画]

- none：	默认值，表示动画将按预期进行和结束，在动画完成其最后一帧时，动画会反转到初始帧处
- forwards：表示动画在结束后继续应用最后的关键帧的位置
- backwards：会在向元素应用动画样式时迅速应用动画的初始帧
- both：	元素动画同时具有forwards和backwards效果

**注意：如果使用属性动画，设置此值为forwards即可，否则默认**

调用样例：

	div
	{
		animation:mymove 5s infinite;
		-webkit-animation:mymove 5s infinite; /* Safari 和 Chrome */
	}


animation: name duration timing-function delay iteration-count direction;

- animation-name	规定需要绑定到选择器的 keyframe 名称。。
- animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function	规定动画的速度曲线。
	- linear	动画从头到尾的速度是相同的。	测试
    - ease	默认。动画以低速开始，然后加快，在结束前变慢。	测试
    - ease-in	动画以低速开始。	测试
    - ease-out	动画以低速结束。	测试
    - ease-in-out	动画以低速开始和结束。	测试
    - cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。
- animation-delay	规定在动画开始之前的延迟。
- animation-iteration-count	规定动画应该播放的次数。
	- n	定义动画播放次数的数值。	测试
	- infinite	规定动画应该无限次播放。
- animation-direction	规定是否应该轮流反向播放动画。
	- normal	默认值。动画应该正常播放。	测试
	- alternate	动画应该轮流反向播放。


## 轮播图实现原理

外层定义定宽容器，内部嵌套定义要轮播的内容作为一个整体div，内层容器个体宽度需要与外层容器宽度一致，内部外部均清空边距，外部容器设置overflow: hidden,内部容器设置transition渐变属性，轮播使用内部容器的margin-left配合transition实现平滑切换。

- 外框父元素必须定宽[内部元素会动态更改边距，如果不定宽，会导致父元素大小变化]，设置超出隐藏
- 内框容器设置宽度为轮播单位宽度*个数，设置transition过渡属性[一般使用margin-left]
- 轮播子项设置块级元素，左浮动，以免元素之间的空格空元素影响[图片之间留有空隙]
- jq定位内部容器，定时设置左外边距即可

## 手风琴样式实现原理

主要实现原理为通过设置元素高度配合transition过渡实现

- 定义外层容器[定高，以便计算展开的高度]，去除内边距，设置边框
- 定义手风琴标题
- 定义展开的项目，设置transition属性，去除内外边距，指定块级元素，否则高度不生效
- jq定位标题元素，绑定click事件，设置所有的展开项高度为0，通过事件参数获取target元素的下一个同级兄弟节点，设置高度为 父元素高度-(title数*个数)