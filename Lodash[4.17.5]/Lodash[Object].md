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

