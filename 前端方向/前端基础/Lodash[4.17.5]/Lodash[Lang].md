<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Lang](#lang)
    - [castArray](#castarray)
    - [clone](#clone)
    - [cloneDeep](#clonedeep)
    - [conformsTo](#conformsto)
    - [eq](#eq)
    - [gt](#gt)
    - [gte](#gte)
    - [isArguments](#isarguments)
    - [isArray](#isarray)
    - [isArrayBuffer](#isarraybuffer)
    - [isArrayLike](#isarraylike)
    - [isArrayLike](#isarraylike-1)
    - [isBoolean](#isboolean)
    - [isBuffer](#isbuffer)
    - [isDate](#isdate)
    - [isElement](#iselement)
    - [isEmpty](#isempty)
    - [isEqual](#isequal)
    - [isEqualWith](#isequalwith)
    - [isError](#iserror)
    - [isFinite](#isfinite)
    - [isFunction](#isfunction)
    - [isInteger](#isinteger)
    - [isLength](#islength)
    - [isMap](#ismap)
    - [isMatch](#ismatch)
    - [isNaN](#isnan)
    - [isNative](#isnative)
    - [isNil](#isnil)
    - [isNull](#isnull)
    - [isNumber](#isnumber)
    - [isObject](#isobject)
    - [isObjectLike](#isobjectlike)
    - [isPlainObject](#isplainobject)
    - [isRegExp](#isregexp)
    - [isSafeInteger](#issafeinteger)
    - [isSet](#isset)
    - [isString](#isstring)
    - [isSymbol](#issymbol)
    - [isTypedArray](#istypedarray)
    - [isUndefined](#isundefined)
    - [WeakMap](#weakmap)
    - [WeakSet](#weakset)
    - [lt](#lt)
    - [lte](#lte)
    - [toArray](#toarray)
    - [toFinite](#tofinite)
    - [toInteger](#tointeger)
    - [toLength](#tolength)
    - [toNumber](#tonumber)
    - [toPlainObject](#toplainobject)
    - [toSafeInteger](#tosafeinteger)
    - [toString](#tostring)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Lang

### castArray

讲一个非数组的值转换为数组

	_.castArray(value)

### clone

浅拷贝函数

### cloneDeep

深拷贝函数

### conformsTo

判断object对应属性的值是否符合要求，具体判断通过传入的谓词对象确定

_.conformsTo(object, source)

	var object = { 'a': 1, 'b': 2 };
	 
	_.conformsTo(object, { 'b': function(n) { return n > 1; } });
	// => true
	 
	_.conformsTo(object, { 'b': function(n) { return n > 2; } });
	// => false

### eq

_.eq(value, other)

比较两个值是否相等，NaN可以正确处理

### gt

_.gt(value, other)

比较第一个值是否大于第二个值

### gte

_.gte(value, other)

比较第一个值是否大于等于第二个值

### isArguments

_.isArguments(value)

检查一个对象是不是参数列表arguments

### isArray

检查一个值是不是数组

### isArrayBuffer

检查一个值是否是ArrayBuffer

### isArrayLike

检查一个值是否类似于数组

如果该值具备length属性 且length大于0小于Number.MAX_SAFE_INTEGER，则视为类数组值

### isArrayLike

检查一下个值是不是类数组对象

与isArrayLike类似，但是只有当值为对象时才成立

### isBoolean

判断是否是逻辑值

### isBuffer

判断是否是Buffer

### isDate

判断是否是时间日期型

### isElement

判断是否是DOM节点

### isEmpty

判断判断值是否为空，判定条件：如果对象不存在可枚举属性，或者集合类的length属性为0，则认为是空

### isEqual

比较两个值是否相等，深度比较

### isEqualWith

带有比较器的比较方法

_.isEqualWith(value, other, [customizer])

### isError

判断是否是Error对象

### isFinite

判断一个值是否是一个有效且有限的值

### isFunction

判断一个值是否是一个函数

### isInteger

判断一个值是否是一个整数

### isLength

判断一个值是否是一个有效长度值

### isMap

判断一个值是否是Map

### isMatch

在两个对之间执行深度比较

	var object = { 'a': 1, 'b': 2 };
	 
	_.isMatch(object, { 'b': 2 });
	// => true
	 
	_.isMatch(object, { 'b': 1 });
	// => false

### isNaN

### isNative

判断一个值是不是Native Code函数

### isNil

判断一个值是否是null or undefined

### isNull

### isNumber

判断一个值是否是数字

### isObject

### isObjectLike

如果val不是null，并且使用typeod返回objec的就认为是类类型对象

### isPlainObject

检查一个对象是否是普通对象，如果是通过Object构造函数创建的 or Prototype属性为null的对象则认为是普通对象

### isRegExp

判断值是否是一个正则表达式

### isSafeInteger

判断一个值是否是一个安全的整数

### isSet

判断是否是Set

### isString

str判断

### isSymbol

判断是否是符号类型

### isTypedArray

判断值是否是类似于Int8Array这类类型化数组

### isUndefined

空值判断

### WeakMap

WeakMap判断

### WeakSet

WeakSet判断

### lt

小于

### lte

小于等于

### toArray

Converts value to an array.

### toFinite

Converts value to a finite number.

### toInteger

Converts value to an integer.

### toLength

转换一个值作为类数类型的length属性之用

### toNumber

Converts value to a number.

### toPlainObject

转换一个对象成为普通对象，将会把对象所有的可枚举属性全部展开，作为生成的对象的普通属性，也就是直接属性，而不是处于原型链上的属性

### toSafeInteger

转和一个值成为一个安全整数

### toString

转换一个值成为字符串，具体转换规则依据类型而定