## clipPath创建剪贴蒙版

#### 剪贴蒙版

> define

	<clipPath id="clip-light">
		定义蒙版形状，此处的形状讲作为剪贴蒙版的显示区域
	</clipPath>

> use

	<ellipse clip-path="url(#clip-light)">

	</ellipse

#### 普通蒙版

> define

	<mask id="mask">
		在此处绘制图形，使用黑白两色，黑色为蒙版遮盖的部分，白色为显示的部分
	</mask>

> use
	
	<circle mask="url(#mask)"></circle>

PS:mask不能加到use上
	