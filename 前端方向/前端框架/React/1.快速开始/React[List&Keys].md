<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [List & Keys](#list--keys)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## List & Keys

> 列表渲染

渲染列表直接使用循环结构即可，需要注意的是，由于JSX需要借助()进行编译转换，所以在进行列表渲染的时候，一般使用ES6的Array.map方法或类似方法创建回调，然后在将返回的ReactDOM列表进行内嵌，已达到复杂的复用组合，当然，也可以直接使用for循环完成

重点：JSX部分必须使用()包裹

> Keys

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

	const todoItems = todos.map((todo) =>
	  <li key={todo.id}>
	    {todo.text}
	  </li>
	);

当元素没有确定的id时，你可以使用他的序列号索引index作为key

指定Key的位置：需要指定Keys的位置是List循环的上下文，而不是循环体的内部

	function ListItem(props) {
	  // 对啦！这里不需要指定key:
	  return <li>{props.value}</li>;
	}
	
	function NumberList(props) {
	  const numbers = props.numbers;
	  const listItems = numbers.map((number) =>
	    // 又对啦！key应该在数组的上下文中被指定
	    <ListItem key={number.toString()}
	              value={number} />
	
	  );
	  return (
	    <ul>
	      {listItems}
	    </ul>
	  );
	}

**唯一性：**

Key 的唯一性仅仅是在List作用域内是唯一的就行，多个List的作用域是互相独立的，互不干涉

**小坑：**

key不会传递给组件，如果你需要使用与key相同的值，则需要自己单独绑定一个属性



**Tips:**JSX花括号内可以内嵌任何形式的表达式。map()不要嵌套过多层，如果嵌套比较多，那么可能是抽取组件的机会






