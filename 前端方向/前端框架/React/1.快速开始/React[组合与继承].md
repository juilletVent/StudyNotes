<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [组合与继承](#%E7%BB%84%E5%90%88%E4%B8%8E%E7%BB%A7%E6%89%BF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 组合与继承

> 包含关系

一些组件不能提前知道它们的子组件是什么。这对于 Sidebar 或 Dialog 这类通用容器尤其常见，我们建议这些组件使用 children 属性将子元素直接传递到输出

	function FancyBorder(props) {
	  return (
	    <div className={'FancyBorder FancyBorder-' + props.color}>
	      {props.children}
	    </div>
	  );
	}

	function WelcomeDialog() {
	  return (
	    <FancyBorder color="blue">
	      <h1 className="Dialog-title">
	        Welcome
	      </h1>
	      <p className="Dialog-message">
	        Thank you for visiting our spacecraft!
	      </p>
	    </FancyBorder>
	  );
	}

<FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。由于 FancyBorder 在一个 <div> 内渲染了 {props.children}，所以被传递的所有元素都会出现在最终输出中。

解释一下：

自定义组件标签内部插入的内容都会在组件内部通通
过props.children传递进来，在组件的render函数中既可以用props.children进行渲染

> 多个内容入口

如果组件存在多个内容插槽，则可以通过使用自定义属性进行传入、

	function SplitPane(props) {
	  return (
	    <div className="SplitPane">
	      <div className="SplitPane-left">
	        {props.left}
	      </div>
	      <div className="SplitPane-right">
	        {props.right}
	      </div>
	    </div>
	  );
	}
	
	function App() {
	  return (
	    <SplitPane
	      left={
	        <Contacts />
	      }
	      right={
	        <Chat />
	      } />
	  );
	}


属性和组合为你提供了以清晰和安全的方式自定义组件的样式和行为所需的所有灵活性。请记住，组件可以接受任意元素，包括基本数据类型、React 元素或函数。

如果要在组件之间复用 UI 无关的功能，我们建议将其提取到单独的 JavaScript 模块中。这样可以在不对组件进行扩展的前提下导入并使用该函数、对象或类。
