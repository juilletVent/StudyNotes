# Canvas搞基绘图

## 阴影

颜色：ctx.shadowColor = '#ccc'
X偏移：ctx.shadowOffsetX = 15
Y偏移：ctx.shadowOffsetY = 15
模糊半径：ctx.shadowBlur = 2

## 全局属性

- 全局透明度：ctx.globaAlpha = n[0-1]
- 绘制叠加模式：ctx.globaCompositeOperation = mode //指定了绘制时重叠的图形将采用何种方式绘制，总计11中模式

## 剪辑区域

- ctx.clip()//创建剪辑区域

含义：clip将会以当前的封闭路径作为新的绘图区域，而不是现有的canvas画布

## 非零环绕原则

判断点p是否在多边形内，从点p向外做一条射线（可以任意方向），多边形的边从左到右经过射线时环数减1，多边形的边从右往左经过射线时环数加1，最后环数不为0，即表示在多边形内部

在创建内嵌镂空图案的时候，非零环绕原则将使用与fill填充的的规则中，例如：顺时针绘制一个大圆，逆时针绘制一个小圆，fill填充，将会挖空大圆内部

## 扩充canvas Context API
使用js对原型的修改方法
~~~
CanvasRenderingContext2D.prototype.函数名 = function(){
	do somthing...
}
~~~