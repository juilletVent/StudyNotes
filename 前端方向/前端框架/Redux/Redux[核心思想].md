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


















