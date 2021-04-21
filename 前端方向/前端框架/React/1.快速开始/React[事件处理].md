<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [事件处理](#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
  - [事件绑定](#%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A)
  - [传递事件参数](#%E4%BC%A0%E9%80%92%E4%BA%8B%E4%BB%B6%E5%8F%82%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 事件处理

两点注意：

- React事件绑定属性的命名采用驼峰式写法，而不是小写
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)


### 事件绑定

为元素或组件绑定事件时，事件处理程序一般定义为class的成员函数，然后在元素的onclick上指定，方式有三种,lambda和bind的this的成员函数与React定义的方法

定义事件处理程序：

	handleClick() {
		this.setState(prevState => ({
		  isToggleOn: !prevState.isToggleOn
		}));
	}

> Lambda表达式绑定：

	render() {
		return (
			//使用Lambda表达式变相绑定运行时this
			<button onClick={()=>this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}

> bind this :

	constructor(){
		...
		//绑定函数运行时this指向
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}

> React实验性语法(属性初始化)：

	handleClick = () => {
		console.log('this is:', this);
	}


两种方式本质上没有区别，都是解决回调函数运行时的this指向问题，子组件或者元素在执行事件处理回调的时候this指向一般是子组件或者下层运行是环境，需要将我们的事件回调处理函数的运行时提升到定义时的环境来

*Tips：不建议使用Lambda内联绑定this，使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数，在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题*


### 传递事件参数

React中事件传递参数有两种方式：Lambda表达式闭包传递 或者 this绑定时隐式传递，详细如下：

	<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
	<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

**通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面**，例如:

	constructor(){
        super();
        this.state = {name:'Hello world!'};
		this.preventPop = this.preventPop.bind(this,this.state.name);
    }
    
    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }









