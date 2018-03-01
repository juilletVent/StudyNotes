## Symbol

Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

注意，**Symbol函数前不能使用new命令，否则会报错。**这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，**它是一种类似于字符串的数据类型**

Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。

**即使传入参数相同，但是它们是不相等的。**

	// 有参数的情况
	let s1 = Symbol('foo');
	let s2 = Symbol('foo');
	
	s1 === s2 // false

**Symbol 值不能与其他类型的值进行运算，会报错。**

**使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。**

场景：

- 消除“魔术字符串”
- 作为属性名的Symbol

## Symbol.for()，Symbol.keyFor()

我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

	Symbol.for("bar") === Symbol.for("bar")
	// true
	
	Symbol("bar") === Symbol("bar")
	// false

Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key

	let s1 = Symbol.for("foo");
	Symbol.keyFor(s1) // "foo"
	
	let s2 = Symbol("foo");
	Symbol.keyFor(s2) // undefined

**全局性：需要注意的是，Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。**