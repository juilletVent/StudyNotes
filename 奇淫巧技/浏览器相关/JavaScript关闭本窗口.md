## 低版本极速浏览器无法关闭弹出窗口时的polyfill

#### 出现场景

A页面处于兼容模式下，JS打开B页面，B页面已经在过去的某个时间设置为极速模式，此时打开的B页面将以极速模式渲染，在B页面中使用```window.close();```尝试关闭当前页面时将会失败。

> 出现版本：360极速浏览器 9.5

	$scope.closeWindow = () => {
	  try {
	    window.open(window.location, '_self').close();
	  } catch (e) {
	    window.close();
	  }
	};

#### 总结

在关闭js弹出窗口时，统一使用上面的方式，有助于规避问题