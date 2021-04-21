<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SVG 文本](#svg-%E6%96%87%E6%9C%AC)
    - [使用脚本控制路径文本](#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC%E6%8E%A7%E5%88%B6%E8%B7%AF%E5%BE%84%E6%96%87%E6%9C%AC)
    - [使用超链接](#%E4%BD%BF%E7%94%A8%E8%B6%85%E9%93%BE%E6%8E%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
	
