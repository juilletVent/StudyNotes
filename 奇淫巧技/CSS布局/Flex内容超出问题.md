<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Flex 内容超出](#flex-%E5%86%85%E5%AE%B9%E8%B6%85%E5%87%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Flex 内容超出

在Flex布局中，子元素的内容较多时，如果容器配置的是禁止换行，则子元素将会超出父容器，此时为子元素设置：`width:0px`即可，原理：渲染时浏览器将会取得元素的width以及flex宽度对比实际宽度，取较大值，所以，将子元素width设置为0，flex设置为 1 1 即可

	width:0;
	flex:1 1;