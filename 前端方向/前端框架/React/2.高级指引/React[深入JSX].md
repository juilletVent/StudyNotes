# 深入JSX

### 指定元素类型

大写开头的 JSX 标签表示一个 React 组件。这些标签将会被编译为同名变量并被引用，所以如果你使用了 <Foo /> 表达式，则必须在作用域中先声明 Foo 变量


### 必须声明

由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

*Tips：如果你使用 <script> 加载 React，它将作用于全局*



### 点表示法，集中导出

可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件

	import React from 'react';
	
	const MyComponents = {
	  DatePicker: function DatePicker(props) {
	    return <div>Imagine a {props.color} datepicker here.</div>;
	  }
	}
	
	function BlueDatePicker() {
	  return <MyComponents.DatePicker color="blue" />;
	}


### 首字母大写

自定义组件应使用大写开头，原生标签使用小写，原因是，小写在编译后使用字符串传递，大写在采用变量传递，大小写为React的约定

### 运行时类型选择

你不能使用表达式来作为 React 元素的标签。如果你的确想通过表达式来确定 React 元素的类型，请先将其赋值给大写开头的变量。也就是说你可以借助变量来动态渲染组件

	import React from 'react';
	import { PhotoStory, VideoStory } from './stories';
	
	const components = {
	  photo: PhotoStory,
	  video: VideoStory
	};
	
	function Story(props) {
	  // 正确！JSX 标签名可以为大写开头的变量。
	  const SpecificStory = components[props.storyType];
	  return <SpecificStory story={props.story} />;
	}

## 属性

组件属性只能使用JavaScript表达式，流程控制语句不属于表达式，所以不能直接在JSX中使用，可以放置在JSX外围，运算结束后通过插值传入JSX

> prop default value

属性默认值为true，意思就是定义了一个Props不填入具体表达式，则这个表达式就是true

### 扩展属性

可以借助es6展开运算符，进行props赋值展开，谨慎使用，放置过多的不相干属性流入子组件

	function App2() {
	  const props = {firstName: 'Ben', lastName: 'Hector'};
	  return <Greeting {...props} />;
	}


## 子代

组件中建嵌入的其他内容、其他组件将会在实体属性children上表现，你可以通过此属性访问在自定义组件标签中插入的东西，如：

	<MyComponent>Hello world!</MyComponent>

MyComponent 的 props.children 值将会直接是 "hello world!"

JSX 会移除空行和开始与结尾处的空格。标签邻近的新行也会被移除，字符串常量内部的换行会被压缩成一个空格，内容不会转义，可以使用HTML实体

### JavaScript表达式

列表渲染正确姿势

	function Item(props) {
	  return <li>{props.message}</li>;
	}
	
	function TodoList() {
	  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
	  return (
	    <ul>
	      {todos.map((message) => <Item key={message} message={message} />)}
	    </ul>
	  );
	}

> 条件渲染组件

	<div>
	  {props.messages.length > 0 &&
	    <MessageList messages={props.messages} />
	  }
	</div>

**Tips:** js中  true && anything = anything,React不会渲染假值，但是会渲染falsy值，并不会进行隐式转换

























