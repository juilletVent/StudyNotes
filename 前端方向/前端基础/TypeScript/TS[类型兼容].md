<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [类型兼容](#%E7%B1%BB%E5%9E%8B%E5%85%BC%E5%AE%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 类型兼容

> TS类型兼容检查

TS中类型兼容不同于强类型语言，只要被复制对象类型包含的属性是实际赋值对象属性的子集就可以成功赋值。TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性

	interface Named {
	    name: string;
	}
	
	let x: Named;
	// y's inferred type is { name: string; location: string; }
	let y = { name: 'Alice', location: 'Seattle' };
	x = y;

这种类型兼容检查，发生在赋值、函数调用。**这个比较过程是递归进行的，检查每个成员及子成员。**



