## 动态创建use引用现有图形



> 定义基本图形

	<defs>
		<polygon id="star" points="0 -10 2 -2 10 0 2 2 0 10 -2 2 -10 0 -2 -2" fill="white">
	</defs>
	//图形容器
	<g id="star-group"></g>

> 创建use引用元素

	var use = document.createElementNS(SVG_NS,'use');
	use.setAttributeNS(XLINK_NS,"xlink:href","#id");