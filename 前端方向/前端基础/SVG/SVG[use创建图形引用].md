<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [动态创建use引用现有图形](#%E5%8A%A8%E6%80%81%E5%88%9B%E5%BB%BAuse%E5%BC%95%E7%94%A8%E7%8E%B0%E6%9C%89%E5%9B%BE%E5%BD%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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