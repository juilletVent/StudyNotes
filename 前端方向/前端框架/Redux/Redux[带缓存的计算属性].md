<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Reselect](#reselect)
  - [连接 Selector 和 Redux Store](#%E8%BF%9E%E6%8E%A5-selector-%E5%92%8C-redux-store)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Reselect

Reselect selectors 可以用来高效地计算 Redux store 里的衍生数据

属性定义：

	import { createSelector } from 'reselect'
	
	const getVisibilityFilter = (state) => state.visibilityFilter
	const getTodos = (state) => state.todos
	
	export const getVisibleTodos = createSelector(
	  [ getVisibilityFilter, getTodos ],
	  (visibilityFilter, todos) => {
	    switch (visibilityFilter) {
	      case 'SHOW_ALL':
	        return todos
	      case 'SHOW_COMPLETED':
	        return todos.filter(t => t.completed)
	      case 'SHOW_ACTIVE':
	        return todos.filter(t => !t.completed)
	    }
	  }
	)

依赖计算属性的其他计算属性：

	const getKeyword = (state) => state.keyword
	
	const getVisibleTodosFilteredByKeyword = createSelector(
	  [ getVisibleTodos, getKeyword ],
	  (visibleTodos, keyword) => visibleTodos.filter(
	    todo => todo.text.indexOf(keyword) > -1
	  )
	)

## 连接 Selector 和 Redux Store

导入selectors，然后在mapState2Props中正常调用即可，传入state

	import { getVisibleTodos } from '../selectors'
	
	const mapStateToProps = (state) => {
	  return {
	    todos: getVisibleTodos(state)
	  }
	}




