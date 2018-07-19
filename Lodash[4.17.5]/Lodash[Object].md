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

