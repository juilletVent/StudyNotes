## JSX

JSX 当中的表达式要包含在大括号里

	const element = (
	  <h1>
	    Hello, {formatName(user)}!
	  </h1>
	);

书写 JSX 的时候一般都会带上换行和缩进，这样可以增强代码的可读性。与此同时，我们同样推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入 的 bug

**实质：JSX 本身其实也是一种表达式，实质上JSX表达式会被转换为ReactDOM对象，应用于js表达式中，所以理解这一点非常关键**

> 定义JSX属性

命名：js保留关键字的命名注意：HTML class 属性jsx中使用className，相应的中划线命名需要转换为小驼峰命名法

example： 

	//字符串属性
	const element = <div tabIndex="0"></div>;
	//变量属性
	const element = <img src={user.avatarUrl}></img>;

切记你使用了大括号包裹的 JavaScript 表达式时就不要再到外面套引号了。JSX 会将引号当中的内容识别为字符串而不是表达式。

> JSX嵌套

标签需要闭合，允许进行标签嵌套，通HTML书写方式一致

> XSS 问题

React在渲染阶段会对所有的字符串进行转置，不用担心XSS问题



