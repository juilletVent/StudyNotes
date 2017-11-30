# 垂直居中

## 行级元素垂直居中

将元素高度与行高设置成同样的值就可以了

	height:Apx;
	linr-height:Apx;

## 绝对定位

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

直接指定在需要垂直居中的元素上即可，由于此table-cell为特殊行级元素，所以对百分比高度不敏感

	display: table-cell;
	vertical-align: middle;
	line-height:100px;
	width: 2000px;

**此元素不会撑满一行，如果要自适应宽度，可将宽度设置为一个较大的值，就可以撑满一行了**