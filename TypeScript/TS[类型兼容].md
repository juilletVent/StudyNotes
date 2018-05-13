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



