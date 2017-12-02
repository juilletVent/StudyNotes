# CSS3 canvas绘图基础

## 前置操作

1. 插入canvas标签、赋予ID、width、height属性[无单位]，宽高由于涉及绘制分辨率，所及不要再CSS中指定宽高
2. 取得canvas js对象，调用getContext('2d')方法获取上下文,如果使用3D则传入3d
3. 浏览器不支持canvas，在canvas标签之前写入提示文本，不支持时将显示出来，支持时，将被忽略

## 基本概念

canvas绘制，是先设置绘图状态，然后调用绘制函数执行绘制

~~~
	//前置
	var canvas = $('#canvas');
	var ctx = canvas[0].getContext('2d');
	
	//状态设置[绘制意图]
	ctx.beginPath()		//开始一段路径设置
	ctx.moveTo(50,50)
	ctx.lineTo(350,350)
	ctx.lineWidth = 5;
	ctx.strokeStyle = 'red';
	ctx.fillStyle = 'blue';
	ctx.closePath()		//结束一段路径设置
	ctx.stroke();		//绘制线条
	ctx.fill();			//绘制填充色
~~~

> 路径

绘制之前，需要先确定绘制路径，使用beginPath开始一条新的路径，使用closePath可以关闭一条已经打开的路径，关闭时如果路径不封闭，closePath会自动封闭路径，如果不想封闭，则可以不调用此方法

## 基础绘制方法：

> 直线

moveTo为开始笔画，lineTo为连续绘制方法

- 路径:ctx.moveTo(x,y),ctx.lineTo(x,y)
- 线宽：ctx.strokeWidth = n
- 颜色：ctx.strokeStyle = '#ccc'
- 内填充：ctx.fillStyle = 'red';
- 线段头：ctx.lineCap = 'butt|round|square'  无|圆形|方形
- 线连接头样式：ctx.lineJoin = 'miter|bevel|round' 尖角|钝角|圆角
- 连线尖角：ctx.miterLimli = 10 [用于描述折线转角处，绘制尖角时，实际绘制转角处，与两线线条外边缘相交处的最大像素距离，大于此像素时将采用钝角方式渲染]此属性只在lineJion为miter时生效
- 绘制线：ctx.stroke();
- 绘制填充：ctx.fill();

> 虚线

API：ctx.setLineDash(segments);

参数：一个用于描述虚线的数组类似[2,5]这样的数组，描述含义为，绘制实线2个长度，绘制空白5个长度，然后重复以上操作，达到绘制虚线的效果

恢复：ctx.setLineDash([]);//恢复时传入空数组即可

栗子：
~~~
ctx.beginPath();
ctx.setLineDash([2,5]);
ctx.moveTo(0, 150);
ctx.lineTo(400, 150);
ctx.stroke();
~~~

> 圆形|弧线

圆形：ctx.arc(centerX,centerY,radiu,startPI,endPI,antic)

- 参1、2：圆心位置
- 参2、3、4：半径，开始的弧度、结束的弧度
- 参5：绘制方向[默认FALSE-顺时针]

圆弧：ctx.arcTo(x1, y1, x2, y2, radius)//绘制当前绘制点、(x1,y1)、(x2,y2)三个点依次连接形成的折线的夹角，半径为radius的切线弧

**贝塞尔曲线[二次]：**

路径：ctx.quadraticCurveTo(x1,y1,x2,y2)//绘制当前绘制点、(x1,y1)、(x2,y2)这三个点确定的二次贝塞尔曲线，且绘制点与(x2,y2)就是曲线结束点

**贝塞尔曲线[三次]：**

路径：ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3)//绘制当前绘制点、(x1,y1)、(x2,y2)、(x3,y3)这四个点确定的三次贝塞尔曲线，且绘制点与(x3,y3)就是曲线结束点

*Tips：理解为PS中的钢笔角点上的控制杆点位即可理解*

> 矩形

API:ctx.rect(x,y,width,height)
API:ctx.fillRect(x,y,width,height);
API:ctx.strokeRect(x,y,width,height);

> 文字绘制

1. 设置文字样式：ctx.font = 'bold 40px Arial'[style ]至少设置两个属性
	1. font-style：[normal|italic|oblique]默认|斜体|倾斜字体
	2. font-variant：[normal|small-caps]默认|将小写字母转为大写，并保持大小不变，也就是将小写字母渲染为小一点儿的大写字母
	3. font-weight：[lighter|normal|bold|bolder]更细|正常|加粗|更粗
	4. font-size：n px|n em|150 % 文字大小[还支持文字名|xx-smal]
	5. font-family:可以设置多种字体，支持@font-face [css安全字体]
2. 绘制文字边框：ctx.strokeText('str',x,y[,maxLength]);//可以设置最大绘制长度px单位。
3. 绘制文字填充：ctx.fillText('str',x,y[maxLength]);
4. 文字横向对齐：ctx.textAlign=left|center|right;//以给定的坐标点对齐，center时，坐标点为绘制区域的中心
5. 文字纵向对齐：ctx.textBaseline = top | middle | bottom 以给定的坐标对齐，top时给定的坐标在绘制的文字上方，middle时，绘制基线就是给定的坐标点

**文字测绘：ctx.measureText(str).width可取的目标文本的绘制宽度**

**PS：绘制时可使用绘制样式，渐变、图片等[strokeStyle/fillStyle]**

> 重绘

1. 重设宽高触发重绘清空
2. 使用clearRect方法  cxt.clearRect(0,0,c.width,c.height);
3. 画布填充白色 

	cxt.fillStyle="#000000";  
    cxt.beginPath();  
    cxt.fillRect(0,0,c.width,c.height);  
    cxt.closePath(); 

> 绘制五角星

~~~
function drawFiveStar(ctx,innerR,exterR,x,y,rotate){
	ctx.fillStyle = 'rgb(230, 191, 27)'
	ctx.lineWidth = 4;
	ctx.strokeStyle = 'rgb(235, 200, 52)';
	ctx.beginPath();
	for(var i=0;i<5;i++){
		ctx.lineTo(
			Math.cos((18+i*72-rotate)/180*Math.PI)*exterR+x,
			-Math.sin((18+i*72-rotate)/180*Math.PI)*exterR+y
		);
		ctx.lineTo(
			Math.cos((54+i*72-rotate)/180*Math.PI)*innerR+x,
			-Math.sin((54+i*72-rotate)/180*Math.PI)*innerR+y
		);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
~~~

## 2D变换方法

- 移动绘制坐标系：ctx.translate(x,y);//具备驻留效果，使用时记得移动与恢复成对出现，否则可能导致坐标系混乱
- 旋转：ctx.rotate(n deg)//旋转[**弧度制**]
- 缩放：ctx.scale(sx,sy)//缩放方法不仅仅缩放目标宽高，连带线条宽度，坐标位置，等数值属性将会一同进行缩放
- 矩阵操作：ctx.transform(a,b,c,d,e,f)[x缩放,x倾斜,y倾斜,y缩放,x移动,y移动]
- 重置矩阵：ctx.setTransform(a,b,c,d,e,f)

**注意**：scale将会连带坐标系一同进行缩放，所以，图像的2D变换[移动/旋转/缩放],缩放放置在操作序列的最后进行，如果缩放操作放置在translate之前执行，那将导致位移错误。

**例如：**
~~~
ctx.scale(2,2);
ctx.translate(1000,1000);
~~~
translate本身目的将目标位移至1000,1000出，由于scale函数将坐标系放大二倍，导致实际效果为：

	ctx.translate(500,500)

## 渐变填充

> 创建线性渐变

- var grd = ctx.createLinearGradient(xStart,yStart,xEnd,yEnd)//创建一个渐变对象
- grd.addColorStop(stop,color) stop为浮点数[0-1],线性渐变关键点

> 创建径向渐变

- var grd = ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);//创建将向渐变区域
- grd.addColorStop(stop,color);//stop[0-1],color颜色节点

## 图片填充

> createPattern

ctx.createPattern(img,repeate-style)

- 参数1：js图片对象|canvas对象|video
- 参数2：no-repeat|repeat-x|repeat-y|repeat

> 使用

- 创建js图片对象
- 指定图片引用
- 创建图片填充，赋值给canvas绘制样式
~~~
//以图片方式方式绘制背景
var bgImage = new Image();
bgImage.src = 'bg.jpg';
bgImage.onload = function(){
	var pattern = ctx.createPattern(bgImage,'no-repeat');
	ctx.fillStyle = pattern;
	ctx.rect(0,0,500,500);
}	
~~~

## 检查点是否位于路径内部

API:ctx.isPointInPath(x,y);//判断点是否位于当前绘制路径的内部，用于重绘区代码的重绘逻辑

## 状态保存

- 保存：ctx.save() //保存canvas绘制状态
- 载入：ctx.restore()//恢复绘制状态

## 绘制思想

在图形绘制中，绘制思路应为如下流程：

1. 绘制基本型
2. 通过图形变换，变换绘制的基本型达到目标效果，而不是直接绘制目标

## 附1：2048棋盘绘制

~~~
<!DOCTYPE html>
<html lang="ch">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="renderer" content="webkit">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Document</title>
	<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
	<style>
		.cans {
			margin: 30px auto;
			border: 1px solid gray;
			border-radius: 3px;
			display: block;
		}
	</style>
</head>

<body>
	<canvas id="canvas" height="500" width="1100" class="cans"></canvas>
</body>
<script>
	$(function() {
		canv = $('#canvas')[0];
		ctx = canv.getContext('2d');

		fillRadiusRect(ctx,350, 50, 400, 400, 10,'rgb(186,173,161)');
		for (var x = 0; x < 4; x++) {
			for (var y = 0; y < 4; y++) {
				fillRadiusRect(ctx,98*x+357,98*y+57,92,92,10)
			}
		}
	})

	function fillRadiusRect(ctx,x, y, width, height, radius,color) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(x,y);
		ctx.arc(width-radius,height-radius,radius,0,0.5*Math.PI);
		ctx.lineTo(radius,height);
		ctx.arc(radius,height-radius,radius,0.5*Math.PI,Math.PI);
		ctx.lineTo(0,radius);
		ctx.arc(radius,radius,radius,Math.PI,1.5*Math.PI);
		ctx.lineTo(width-radius,0);
		ctx.arc(width-radius,radius,radius,1.5*Math.PI,2*Math.PI);
		ctx.fillStyle = color || 'rgb(204,190,182)';
		ctx.closePath();
		
		ctx.fill()
		ctx.restore();
	}

	function strokeRadiusRect(ctx,x, y, width, height, radius) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(x,y);
		ctx.arc(width-radius,height-radius,radius,0,0.5*Math.PI);
		ctx.lineTo(radius,height);
		ctx.arc(radius,height-radius,radius,0.5*Math.PI,Math.PI);
		ctx.lineTo(0,radius);
		ctx.arc(radius,radius,radius,Math.PI,1.5*Math.PI);
		ctx.lineTo(width-radius,0);
		ctx.arc(width-radius,radius,radius,1.5*Math.PI,2*Math.PI);
		ctx.strokeStyle = '#d3d3d3'
		ctx.closePath();
		
		ctx.stroke()
		ctx.restore();
	}

</script>

</html>

~~~

## 绘制月亮

~~~
参数：上下文、中心x、y、外圆半径，控制点与半径比，旋转角度
function drawMoom(ctx,x,y,r,d,rot,fillColor/*option*/){
	ctx.beginPath();
	ctx.translate(x,y);
	ctx.rotate(rot/180*Math.PI);
	
	//逆时针绘制 1 π圆弧，绘制的点落到0,0位置，方便绘制内弧
	ctx.arc(0,0,r,0.5*Math.PI,1.5*Math.PI,true);
	
	//计算控制点横坐标
	var ctrlX = x*d;
	//计算内弧半径 公式：innerR = exterR*(Math.sqrt(Math.pow((0-exterR*d),2)+Math.pow((exterR-0),2)))/(exterR*d)
	
	var innerR = r*getDistance(0,r,ctrlX,0)/ctrlX;
	
	ctx.arcTo(ctrlX,0,0,r,innerR);
	
	ctx.fillStyle = fillColor||'rgb(230, 191, 27)';
	ctx.fill();
}

function getDistance(x1,y1,x2,y2){
	return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}
~~~

## 附3：绘制星星

~~~
参数：上下文、星星缩放比、中心点、旋转角度
function drawStar(ctx,r,x,y,rotate){
	ctx.save()
	ctx.fillStyle = 'rgb(230, 191, 27)'
//		由于scale函数会对数值属性一并缩放，所以只能舍弃外边框的绘制
//		ctx.lineWidth = 4;
//		ctx.strokeStyle = 'rgb(235, 200, 52)';
	
	ctx.translate(x,y);
	ctx.rotate(rotate/180*Math.PI);
	ctx.scale(r,r);
	
	drawStarPath(ctx);
	
	ctx.fill()
	ctx.restore()
	
}

function drawStarPath(ctx){
	ctx.beginPath();
	for(var i=0;i<5;i++){
		ctx.lineTo(
			Math.cos((18+i*72)/180*Math.PI)*20,
			-Math.sin((18+i*72)/180*Math.PI)*20
		);
		ctx.lineTo(
			Math.cos((54+i*72)/180*Math.PI)*10,
			-Math.sin((54+i*72)/180*Math.PI)*10
		);
	}
	ctx.closePath();
}
~~~