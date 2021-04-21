<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Object](#object)
    - [assign](#assign)
    - [assignIn](#assignin)
    - [assignInWith](#assigninwith)
    - [assignInWith](#assigninwith-1)
    - [at](#at)
    - [create](#create)
    - [defaults](#defaults)
    - [defaultsDeep](#defaultsdeep)
    - [toPairs](#topairs)
    - [toPairsIn](#topairsin)
    - [findKey](#findkey)
    - [findLastKey](#findlastkey)
    - [forIn](#forin)
    - [forInRight](#forinright)
    - [forOwn](#forown)
    - [forOwnRight](#forownright)
    - [functions functionsIn keys keysIn](#functions-functionsin-keys-keysin)
    - [get](#get)
    - [has](#has)
    - [hasIn](#hasin)
    - [invert](#invert)
    - [invertBy](#invertby)
    - [invoke](#invoke)
    - [mapKeys](#mapkeys)
    - [mapValues](#mapvalues)
    - [merge](#merge)
    - [mergeWith](#mergewith)
    - [omit](#omit)
    - [omitBy](#omitby)
    - [pick](#pick)
    - [pickBy](#pickby)
    - [result](#result)
    - [set](#set)
    - [setWith](#setwith)
    - [transform](#transform)
    - [unset](#unset)
    - [update](#update)
    - [values](#values)
    - [baluesIn](#baluesin)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Object

### assign

_.assign(object, [sources])

将所有原始对象的可枚举属性添加到目标对象之上，后传入的参数属性将会覆盖之前的参数属性值

### assignIn

_.assignIn(object, [sources])

类似于assign，只是原型链上面的属性也会被添加到目标对象上

### assignInWith

带有迭代器的assignInWith函数

function customizer(objValue, srcValue) {
  return _.isUndefined(objValue) ? srcValue : objValue;
}
 
var defaults = _.partialRight(_.assignInWith, customizer);
 
defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }

对传入的值进行自定义覆盖，包含原型链上的值

### assignInWith

不包含原型链上面的值的自定义覆盖函数

### at

_.at(object, [paths])

创建一个与对象路径对应的值的数组

	var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	 
	_.at(object, ['a[0].b.c', 'a[1]']);
	// => [3, 4]

### create

_.create(prototype, [properties])

根据传入的原型对象和属性对象创建新的对象，方便实现ES5继承

	function Shape() {
	  this.x = 0;
	  this.y = 0;
	}
	 
	function Circle() {
	  Shape.call(this);
	}
	 
	Circle.prototype = _.create(Shape.prototype, {
	  'constructor': Circle
	});
	 
	var circle = new Circle;
	circle instanceof Circle;
	// => true
	 
	circle instanceof Shape;
	// => true

### defaults

_.defaults(object, [sources])

将sources对象集合的所有可枚举属性添加到目标对象之上，如果存在已经存在的属性，则会忽略

	_.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	// => { 'a': 1, 'b': 2 }

### defaultsDeep

同defaults，只是具备深度赋值的特性


### toPairs

将对象的直接属性转换为二维数组键值对

	function Foo() {
	  this.a = 1;
	  this.b = 2;
	}
	
	Foo.prototype.c = 3;
	
	_.toPairs(new Foo);
	// => [['a', 1], ['b', 2]]

### toPairsIn

带有原型链上属性的toPairs函数，作用一致

### findKey

_.findKey(object, [predicate=_.identity])

寻找对象中符合条件的属性键名,返回第一个符合的键名，顺序不确定，有待测试

	var users = {
	  'barney':  { 'age': 36, 'active': true },
	  'fred':    { 'age': 40, 'active': false },
	  'pebbles': { 'age': 1,  'active': true }
	};
	 
	_.findKey(users, function(o) { return o.age < 40; });
	// => 'barney' (iteration order is not guaranteed)
	 
	// The `_.matches` iteratee shorthand.
	_.findKey(users, { 'age': 1, 'active': true });
	// => 'pebbles'
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.findKey(users, ['active', false]);
	// => 'fred'
	 
	// The `_.property` iteratee shorthand.
	_.findKey(users, 'active');
	// => 'barney'

### findLastKey

作用等同于findKey，不同的是方向相反，从最后开始

### forIn

_.forIn(object, [iteratee=_.identity])

	_.forIn(new Foo, function(value, key) {
	  console.log(key);
	});

for-in的实现，遍历对象属性，包括原型链上的属性

### forInRight

逆向的forIn

### forOwn

不包含原型链属性的for-in

### forOwnRight

右侧开始的forOwn

### functions functionsIn keys keysIn

作用类似，或许我有哪里没看懂吧，不携带in的，获取对象的keys集合，不包含原型链上的属性，携带有in的函数，能够获取包含原型链上的属性。

### get

获取对象属性值

_.get(object, path, [defaultValue])

	var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 
	_.get(object, 'a[0].b.c');
	// => 3
	 
	_.get(object, ['a', '0', 'b', 'c']);
	// => 3
	 
	_.get(object, 'a.b.c', 'default');
	// => 'default'

### has

判断对象是否具有对应的属性，path规则等同于之前的path规则

_.has(object, path)

### hasIn

包含原型链上的属性，是否存在

### invert

翻转键与值，如果翻转后存在键值冲突，则使用覆盖策略

### invertBy

_.invertBy(object, [iteratee=_.identity])

翻转键与值，如果翻转后存在键值冲突，采用合并策略，也就是二维数组的形式，并提供第二个参数作为键名自定义函数，如果不提供，则使用原值作为键值

	var object = { 'a': 1, 'b': 2, 'c': 1 };
	 
	_.invertBy(object);
	// => { '1': ['a', 'c'], '2': ['b'] }
	 
	_.invertBy(object, function(value) {
	  return 'group' + value;
	});
	// => { 'group1': ['a', 'c'], 'group2': ['b'] }

### invoke

_.invoke(object, path, [args])

调用对象的成员函数，第二个参数为函数路径，其后的所有参数作为调用参数传入调用的成员函数

	var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
	 
	_.invoke(object, 'a[0].b.c.slice', 1, 3);
	// => [2, 3]

### mapKeys

不是很明白这个函数的具体目的，

	_.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	  return key + value;
	});
	// => { 'a1': 1, 'b2': 2 }

### mapValues

不清楚具体意义，返回一个具备指定键值的对象

_.mapValues(object, [iteratee=_.identity])

	var users = {
	  'fred':    { 'user': 'fred',    'age': 40 },
	  'pebbles': { 'user': 'pebbles', 'age': 1 }
	};
	 
	_.mapValues(users, function(o) { return o.age; });
	// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 
	// The `_.property` iteratee shorthand.
	_.mapValues(users, 'age');
	// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)

### merge

_.merge(object, [sources])

与assign作用差不多，合并对象属性,已经存在的进行覆盖处理

	var object = {
	  'a': [{ 'b': 2 }, { 'd': 4 }]
	};
	 
	var other = {
	  'a': [{ 'c': 3 }, { 'e': 5 }]
	};
	 
	_.merge(object, other);
	// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

### mergeWith

_.mergeWith(object, sources, customizer)

根据定制化的函数，进行对象合并

	function customizer(objValue, srcValue) {
	  if (_.isArray(objValue)) {
	    return objValue.concat(srcValue);
	  }
	}
	 
	var object = { 'a': [1], 'b': [2] };
	var other = { 'a': [3], 'b': [4] };
	 
	_.mergeWith(object, other, customizer);
	// => { 'a': [1, 3], 'b': [2, 4] }

### omit

_.omit(object, [paths])

返回一个未被排除属性【直接属性/可枚举属性】的对象，例如对象具备a,b,c属性，paths传入['a','b'] ,则生成的对象将会排除a、b属性，留下c属性，并返回一个新对象。

	var object = { 'a': 1, 'b': '2', 'c': 3 };
	 
	_.omit(object, ['a', 'c']);
	// => { 'b': '2' }

### omitBy

_.omitBy(object, [predicate=_.identity])

同omit，不过采用谓词判定，谓词返回true的时候保留相应的属性，属性范围为直接属性/可枚举属性

### pick

与omit作用相反，创建被选择的属性集合的新对象

### pickBy

谓词版pick，作用同omitBy相反，用法与范围均一致

### result

与get类似，不过如果给定的路径是一个函数，那么将会采用父元素作为this绑定，然后调用该函数，并返回函数执行的结果

	var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	 
	_.result(object, 'a[0].b.c1');
	// => 3
	 
	_.result(object, 'a[0].b.c2');
	// => 4
	 
	_.result(object, 'a[0].b.c3', 'default');
	// => 'default'
	 
	_.result(object, 'a[0].b.c3', _.constant('default'));
	// => 'default'

### set

_.set(object, path, value)

在对象上设置对应路径的属性与值，如果属性不存在则创建对应的属性，该方法会修改原始对象，而不是返回一个新的对象。

	var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 
	_.set(object, 'a[0].b.c', 4);
	console.log(object.a[0].b.c);
	// => 4
	 
	_.set(object, ['x', '0', 'y', 'z'], 5);
	console.log(object.x[0].y.z);
	// => 5

### setWith

没懂啥意思^_^

_.setWith(object, path, value, [customizer])

	var object = {};
	 
	_.setWith(object, '[0][1]', 'a', Object);
	// => { '0': { '1': 'a' } }

### transform

_.transform(object, [iteratee=_.identity], [accumulator])

大致意思就是对数组的每一项或对象的各个属性进行迭代，然后通过result进行累加（此处的累加不是表面的累加的意思，result只是作为返回值的一个载体，你可以通过传入初始的数组或传入初始的对象进行赋值，以便返回最终结果，引用传递）操作，对于迭代函数，可以显示的返回false来提前终止迭代，第三个参数为result的初始值，作为迭代函数的第一个参数传入

迭代函数参数表： (result, value, key, object) 

	_.transform([2, 3, 4], function(result, n) {
	  result.push(n *= n);
	  return n % 2 == 0;
	}, []);
	// => [4, 9]
	 
	_.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	  (result[value] || (result[value] = [])).push(key);
	}, {});
	// => { '1': ['a', 'c'], '2': ['b'] }

### unset

unset一个属性

_.unset(object, path)
	
	var object = { 'a': [{ 'b': { 'c': 7 } }] };
	_.unset(object, 'a[0].b.c');
	console.log(object);
	// => { 'a': [{ 'b': {} }] };

### update

_.update(object, path, updater)

更新一个属性值

、参数表：目标对象，属性路径字符串，更新器（单参：原始值，返回值作为更新的最终值）

	var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 
	_.update(object, 'a[0].b.c', function(n) { return n * n; });
	console.log(object.a[0].b.c);
	// => 9

### values

获取对象的直接属性集合

_.values(object)

### baluesIn

_.valuesIn(object)

获取对象的可枚举属性属性，包括原型链上的属性