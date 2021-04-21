<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Action 生成](#action-%E7%94%9F%E6%88%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Action 生成

使用高阶函数进行Action Creator生成可以减少样板代码的编写

	function makeActionCreator(type, ...argNames) {
	  return function(...args) {
	    let action = { type }
	    argNames.forEach((arg, index) => {
	      action[argNames[index]] = args[index]
	    })
	    return action
	  }
	}
	
	const ADD_TODO = 'ADD_TODO'
	const EDIT_TODO = 'EDIT_TODO'
	const REMOVE_TODO = 'REMOVE_TODO'
	
	export const addTodo = makeActionCreator(ADD_TODO, 'todo')
	export const editTodo = makeActionCreator(EDIT_TODO, 'id', 'todo')
	export const removeTodo = makeActionCreator(REMOVE_TODO, 'id')

相关的库有 redux-actions、redux-act

