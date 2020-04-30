# 垂直居中

## 行级元素垂直居中

场景：行级元素垂直居中

将元素高度与行高设置成同样的值就可以了

	height:Apx;
	linr-height:Apx;

## 绝对定位[常用]

场景：子元素高度确定

父元素指定性对定位，子元素指定绝对定位，使用如下CSS完成垂直居中+水平居中

	//父元素
	position: relative;
	//子元素
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -当前元素高度;
	margin-left: -当前元素宽度;

## table-cell定位

场景：子元素高度确定

直接指定在需要垂直居中的元素上即可，由于此table-cell为特殊行级元素，所以对百分比高度不敏感

	display: table-cell;
	vertical-align: middle;
	line-height:100px;//垂直居中的块高度
	width: 2000px;

**Tips：此元素不会撑满一行，如果要自适应宽度，可将宽度设置为一个较大的值，就可以撑满一行其似乎不会撑破容器，很奇特的性质**

## tranform 定位 [终极大招]

场景：父子元素高度均不固定（百分比）

	.parent{
		background-color: gray;
		height: 100%;
		position: relative;
		min-height: 400px;
	}
	.child{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		height: 70%;
		transform: translate(-50%,-50%);
		background: red;
	}

解析：由于translate百分比取值基准为应用的元素本身，所以可以利用此特点配合绝对定位，实现不定高元素垂直居中

## Flex 布局

应用Flex布局指定主线和对其排列方式就行了，比较简单

**PS：兼容性比较烂,IE10+,不推荐使用**