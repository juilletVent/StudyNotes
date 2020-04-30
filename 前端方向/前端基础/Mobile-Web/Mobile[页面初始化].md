# Mobile 页面注意事项

## 禁用缩放，并告知浏览器此页面为Mobile页面

	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />

## 去除Iphone input标签默认样式

	input[type="button"], input[type="submit"], input[type="reset"] {
		-webkit-appearance: none;
	}

