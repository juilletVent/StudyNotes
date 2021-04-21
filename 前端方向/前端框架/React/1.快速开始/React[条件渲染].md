<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [条件渲染](#%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93)
- [阻止组件渲染](#%E9%98%BB%E6%AD%A2%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 条件渲染

React中条件渲染得益于JSX语法，书写起来就等同于JS流程控制语句一样自然

	function Greeting(props) {
	  const isLoggedIn = props.isLoggedIn;
	  if (isLoggedIn) {
	    return <UserGreeting />;
	  }
	  return <GuestGreeting />;
	}

> 与运算符 &&

	 return (
	    <div>
	      <h1>Hello!</h1>
	      {unreadMessages.length > 0 &&
	        <h2>
	          You have {unreadMessages.length} unread messages.
	        </h2>
	      }
	    </div>
	  );

之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。

> 三目运算符

	 return (
	    <div>
	      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
	    </div>
	  );

## 阻止组件渲染

render方法返回null即可阻止组件渲染

值得注意的是，组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用



