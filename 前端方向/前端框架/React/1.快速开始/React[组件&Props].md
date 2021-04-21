<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [组件 & Props](#%E7%BB%84%E4%BB%B6--props)
  - [Props & 只读性](#props--%E5%8F%AA%E8%AF%BB%E6%80%A7)
  - [与UI无关的其他属性](#%E4%B8%8Eui%E6%97%A0%E5%85%B3%E7%9A%84%E5%85%B6%E4%BB%96%E5%B1%9E%E6%80%A7)
- [State](#state)
  - [不要直接更新状态](#%E4%B8%8D%E8%A6%81%E7%9B%B4%E6%8E%A5%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81)
  - [状态更新可能是异步的](#%E7%8A%B6%E6%80%81%E6%9B%B4%E6%96%B0%E5%8F%AF%E8%83%BD%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84)
  - [状态更新合并](#%E7%8A%B6%E6%80%81%E6%9B%B4%E6%96%B0%E5%90%88%E5%B9%B6)
- [数据自顶向下流动](#%E6%95%B0%E6%8D%AE%E8%87%AA%E9%A1%B6%E5%90%91%E4%B8%8B%E6%B5%81%E5%8A%A8)
- [有无状态](#%E6%9C%89%E6%97%A0%E7%8A%B6%E6%80%81)
- [生命周期Hook](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9Fhook)
- [属性验证](#%E5%B1%9E%E6%80%A7%E9%AA%8C%E8%AF%81)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 组件 & Props

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

函数定义：

	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}

class定义：

	class Welcome extends React.Component {
	  render() {
	    return <h1>Hello, {this.props.name}</h1>;
	  }
	}


**注意：React中原生HTML标签使用小写，自定义组件使用大写**

**限制：组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。**

> 组件命名

*建议从组件自身的角度来命名props，而不是根据使用组件的上下文命名*

### Props & 只读性

无论是使用函数或是类来声明一个组件，它决不能修改它自己的props

> 纯函数

它没有改变它自己的输入值，当传入的值相同时，总是会返回相同的结果

	function sum(a, b) {
	  return a + b;
	}

**React限制：所有的React组件必须像纯函数那样使用它们的props**

### 与UI无关的其他属性

如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段

如果你不在 render() 中使用某些东西，它就不应该在状态中

## State

State的正确使用姿势

### 不要直接更新状态

构造函数是唯一能够初始化 this.state 的地方

更新state应当使用 setState():

### 状态更新可能是异步的

React 可以将多个setState() 调用合并成一个调用来提高性能。

解释：React会对setState进行调用优化，可能会缓存调用，然后进行集中式的实际调用，这将导致setState实际调用为异步方法

所以如果直接依赖State属性计算下一次的State状态，将会存在一定风险。

正确姿势是创建setState回调进行依赖计算：

	this.setState((prevState, props) => ({
	  counter: prevState.counter + props.increment
	}));

### 状态更新合并

解释：进行State更新的时候，进行的状态覆盖是局部完整覆盖，也就是说，执行状态更新时只需要传入你需要更新的字段数据即可，原State中不相关的属性值不受影响

Example:

	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			comments: []
		};
	}

	handle(){
		this.setState({
			comments:[1]
		})
	}

上面的例子讲完整体替换comments，并保留posts数据

## 数据自顶向下流动

组件树种数据的流动方向为单向，自顶向下流动，采取props属性传递

## 有无状态

内部持有局部状态的组件成为有状态组件，简单的不具有局部状态的组件成为无状态组件


## 生命周期Hook

componentDidMount Mounted钩子

componentWillUnmount UnMounted钩子

## 属性验证

1. 导入PropTypes
2. 为组件指定PropTypes

~~~
import React, { PropTypes } from 'react';

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
~~~


