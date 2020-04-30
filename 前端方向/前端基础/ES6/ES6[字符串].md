## 字符串

repeat方法返回一个新字符串，表示将原字符串重复n次。

includes(), startsWith(), endsWith() ，indexOf
判断字符串是否包含

**padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。**

模板字符串
	
	$('#result').append(`
	  There are <b>${basket.count}</b> items
	   in your basket, <em>${basket.onSale}</em>
	  are on sale!
	`);

**模板字符串中嵌入变量，需要将变量名写在${}之中。**

###标签模板

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。

	alert`123`
	// 等同于
	alert(123)

