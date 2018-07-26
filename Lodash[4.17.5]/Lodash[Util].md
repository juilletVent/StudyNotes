# Util

### attempt

_.attempt(func, [args])

尝试调用目标函数，并捕获错误对象，调用参数，通过...args传入

### bindAll

_.bindAll(object, methodNames)

绑定成员函数的调用this，这样将避免成员函数赋值给外部回调时this指向不正确的问题

	var view = {
	  'label': 'docs',
	  'click': function() {
	    console.log('clicked ' + this.label);
	  }
	};
	 
	_.bindAll(view, ['click']);
	jQuery(element).on('click', view.click);
	// => Logs 'clicked docs' when clicked.

此时回调函数内部的this将会是原始的this，而不是回调执行时的上下文this

### cond

不知道干嘛用的

_.cond(pairs)

### conforms

_.conforms(source)

创建一个判断对应属性书否符合要求的回调函数，单参，参数为需要判断的目标对象，如果所有的属性均符合要求返回true，否则返回false

	var objects = [
	  { 'a': 2, 'b': 1 },
	  { 'a': 1, 'b': 2 }
	];
	 
	_.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
	// => [{ 'a': 1, 'b': 2 }]

上面的表明将会验证b属性符不符合要求，如果符合要求，name将通过filter的验证

### constant

_.constant(value)

创建一个返回对应值的新函数，具体作用没搞懂，返回的值就是传入的值，同一个引用，并未clone

### defaultTo

_.defaultTo(value, defaultValue)

检查值是否有值，如果没有则返回默认值,不修改原值

	_.defaultTo(1, 10);
	// => 1
	 
	_.defaultTo(undefined, 10);
	// => 10


### flow

_.flow([funcs])

创建一个函数调用序列，返回调用入口，传入的参数将作为序列中第一个函数的参数，其后的函数参数使用序列中其前一个函数的返回值作为调用参数

	function square(n) {
	  return n * n;
	}
	 
	var addSquare = _.flow([_.add, square]);
	addSquare(1, 2);
	// => 9

### flowRight

与flowRight用法一致，区别是序列开始方向是从右边开始

### identity

返回接收到的第一个参数，恒等表达式，不知道有啥卵用

### iteratee

_.iteratee([func=_.identity])

麻痹没看懂什么意思
	
	var users = [
	  { 'user': 'barney', 'age': 36, 'active': true },
	  { 'user': 'fred',   'age': 40, 'active': false }
	];
	 
	// The `_.matches` iteratee shorthand.
	_.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
	// => [{ 'user': 'barney', 'age': 36, 'active': true }]
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.filter(users, _.iteratee(['user', 'fred']));
	// => [{ 'user': 'fred', 'age': 40 }]
	 
	// The `_.property` iteratee shorthand.
	_.map(users, _.iteratee('user'));
	// => ['barney', 'fred']
	 
	// Create custom iteratee shorthands.
	_.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
	  return !_.isRegExp(func) ? iteratee(func) : function(string) {
	    return func.test(string);
	  };
	});
	 
	_.filter(['abc', 'def'], /ef/);
	// => ['def']

### matches

_.matches(source)

创建一个函数，执行部分深度比较，如果通过返回true

	var objects = [
	  { 'a': 1, 'b': 2, 'c': 3 },
	  { 'a': 4, 'b': 5, 'c': 6 }
	];
	 
	_.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
	// => [{ 'a': 4, 'b': 5, 'c': 6 }]

创建时传入的对象作为比较对象，创建后的函数对象，在调用时传入的参数将作为另一个比较对象

### matchesProperty

_.matchesProperty(path, srcValue)

深度比较属性值，参数表：属性路径，属性值

	var objects = [
	  { 'a': 1, 'b': 2, 'c': 3 },
	  { 'a': 4, 'b': 5, 'c': 6 }
	];
	 
	_.find(objects, _.matchesProperty('a', 4));
	// => { 'a': 4, 'b': 5, 'c': 6 }

### method

_.method(path, [args])

创建一个在目标对象上调用指定方法的函数

参数表：

- path：调用路径
- args：调用参数

	var objects = [
	  { 'a': { 'b': _.constant(2) } },
	  { 'a': { 'b': _.constant(1) } }
	];
	 
	_.map(objects, _.method('a.b'));
	// => [2, 1]
	 
	_.map(objects, _.method(['a', 'b']));
	// => [2, 1]

传入目标对象，在目标对象上调用对应的方法，并返回值

### methodOf

_.methodOf(object, [args])

