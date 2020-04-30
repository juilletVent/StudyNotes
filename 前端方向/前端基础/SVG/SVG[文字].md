# SVG 文本

使用text标签：

- x,y：基线定位位置
- dx,dy：偏移位置，可以传递数组，做到精确控制字符，对应每个字符的偏移

对齐：text-anchor 横向 start | middle | end | inherit
纵向dominant-baseline: middle

可以使用style css 控制字形

tspan标签：


获取文字容器外框：obj.getBBox();

路径文本：

栗子：

	<svg>
	    <path id="path1" d="M 100 200 Q 200 100 300 200 T 500 200" stroke="rgb(0,255,0)" fill="none"/>
	    
	    <text style="font-size: 24px">
	        <textPath xlink:href="#path1">
	            这是实例文本
	        </textPath>
	    </text>
	</svg>

### 使用脚本控制路径文本

设置属性：obj.setAttributeNS 实际测试 使用普通的js函数设置属性即可生效

### 使用超链接

外部书写A标签 指定xlink:href xlink:title xlink:target三个属性，内部嵌套图形即可
	
