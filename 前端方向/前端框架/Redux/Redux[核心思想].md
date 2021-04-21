<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Redux 介绍](#redux-%E4%BB%8B%E7%BB%8D)
  - [核心概念](#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
  - [三大原则](#%E4%B8%89%E5%A4%A7%E5%8E%9F%E5%88%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Redux 介绍

## 核心概念

Redux的核心概念就是对传入原有状态，与事件Action，并返回一个新的状态给调用者(纯函数理念)

Example：

	function visibilityFilter(state = 'SHOW_ALL', action) {
	  if (action.type === 'SET_VISIBILITY_FILTER') {
	    return action.filter;
	  } else {
	    return state;
	  }
	}
	
	function todos(state = [], action) {
	  switch (action.type) {
	  case 'ADD_TODO':
	    return state.concat([{ text: action.text, completed: false }]);
	  case 'TOGGLE_TODO':
	    return state.map((todo, index) =>
	      action.index === index ?
	        { text: todo.text, completed: !todo.completed } :
	        todo
	   )
	  default:
	    return state;
	  }
	}

	
	function todoApp(state = {}, action) {
	  return {
	    todos: todos(state.todos, action),
	    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
	  };
	}


## 三大原则


> 单一数据源

**整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中**


> State 本身只读

**唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象**


> 使用纯函数来执行修改

**为了描述 action 如何改变 state tree ，你需要编写 reducers**


















