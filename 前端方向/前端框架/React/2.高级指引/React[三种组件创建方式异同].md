<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [组件创建方式](#%E7%BB%84%E4%BB%B6%E5%88%9B%E5%BB%BA%E6%96%B9%E5%BC%8F)
  - [无状态函数式组件](#%E6%97%A0%E7%8A%B6%E6%80%81%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)
  - [React.createClass](#reactcreateclass)
  - [React.Component](#reactcomponent)
    - [组件属性与默认值](#%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E4%B8%8E%E9%BB%98%E8%AE%A4%E5%80%BC)
  - [如何选择哪种方式创建组件](#%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%E5%93%AA%E7%A7%8D%E6%96%B9%E5%BC%8F%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6)
    - [补充一点](#%E8%A1%A5%E5%85%85%E4%B8%80%E7%82%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 组件创建方式

在React中具备三种组件创建方式：

1. 函数式定义的无状态组件
2. es5原生方式React.createClass定义的组件
3. es6形式的extends React.Component定义的组件

## 无状态函数式组件

它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。

	在大部分React代码中，大多数组件被写成无状态的组件，通过简单组合可以构建成其他的组件等；这种通过多个简单然后合并成一个大应用的设计模式被提倡。

无状态组件的创建形式使代码的可读性更好，并且减少了大量冗余的代码，精简至只有一个render方法，大大的增强了编写一个组件的便利，除此之外无状态组件还有以下几个显著的特点：

1. **组件不会被实例化，整体渲染性能得到提升**

	因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。

2. **组件不能访问this对象**

	无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件

3. **组件无法访问生命周期的方法**

	因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。

4. **无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用**


## React.createClass

`React.createClass`是react刚开始推荐的创建组件的方式，这是ES5的原生的JavaScript来实现的React组件。

与无状态组件相比，React.createClass和后面要描述的React.Component都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法

React.createClass会自绑定函数方法（不像React.Component只绑定需要关心的函数）导致不必要的性能开销，增加代码过时的可能性

## React.Component

React.Component是以ES6的形式来创建react的组件的，是React目前极为推荐的创建有状态组件的方式，**React.Component创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象**

React.Component有三种手动绑定方法：可以在构造函数中完成绑定，也可以在调用时使用method.bind(this)来完成绑定，还可以使用arrow function来绑定

this绑定三种方式：

	constructor(props) {
	       super(props);
	       this.handleClick = this.handleClick.bind(this); //构造函数中绑定
	  }
    <div onClick={this.handleClick.bind(this)}></div> //使用bind来绑定
    <div onClick={()=>this.handleClick()}></div> //使用arrow function来绑定

### 组件属性与默认值

组件属性类型propTypes及其默认props属性defaultProps配置与CreateClass不同

React.createClass在创建组件时，有关组件props的属性类型及组件默认的属性会作为组件实例的属性来配置，其中defaultProps是使用getDefaultProps的方法来获取默认组件属性的:

	const TodoItem = React.createClass({
	    propTypes: { // as an object
	        name: React.PropTypes.string
	    },
	    getDefaultProps(){   // return a object
	        return {
	            name: ''    
	        }
	    }
	    render(){
	        return <div></div>
	    }
	})

React.Component在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的

	class TodoItem extends React.Component {
	    static propTypes = {//类的静态属性
	        name: React.PropTypes.string
	    };
	
	    static defaultProps = {//类的静态属性
	        name: ''
	    };
	
	    ...
	}

## 如何选择哪种方式创建组件

1. 能用React.Component创建的组件的就尽量不用React.createClass形式创建组件。
2. 只要有可能，尽量使用无状态组件创建形式
3. 否则（如需要state、生命周期方法等），使用`React.Component`这种es6形式创建组件

### 补充一点

> 无状态组件内部其实是可以使用ref功能的，虽然不能通过this.refs访问到，但是可以通过将ref内容保存到无状态组件内部的一个本地变量中获取到

	function TestComp(props){
	    let ref;
	    return (<div>
	        <div ref={(node) => ref = node}>
	            ...
	        </div>
	    </div>)
	}
