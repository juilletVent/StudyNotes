## SVG 动画

> 定位动画目标元素

	<animate xlink:href="url(#rect1)"></animate>

	<rect x='0'..>
		<animate></animate>
		//多个动画可以叠加
	</rect>

> 基本动画

	<animate xlink:href="url(#rect1)"
		attributeType="XML" //还可以操纵CSS
		sttributeName="x"	//目标属性
		from="10"
		to="110"
		dur="3s"
		fill="remove|freeze"//结束后是否保留效果
		repeatCount="100|indefinite"//循环
		begin="0[文档加载后立即执行]|anim1.end + 1s[anim1执行结束后1s开始]"
	></animate>

> 变换动画

	<animateTransform id="rotate"
		attributeName="transform"
		attributeTypee="XML"
		type="rotate|translate|scale"
		...
	>
		
	</animateTransform>

暂时不能多动画叠加

> 轨迹动画

	<animateMotion xlink:href="url(#rect1)"
		path="可以直接书写path定义指令|"
		rotate="auto"//移动过程中自动调整旋转角度为切线方向
		dur="3s">
		//如果不使用path属性，则使用如下形式，不要写url
		<mpath xlink:href="#path"></mpath>
	</animateMotion>

