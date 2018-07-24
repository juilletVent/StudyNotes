# Seq

### _ 【隐式调用】

_(value)

隐式调用为立即执行，arrays（数组）、collections（集合）、functions（函数）的”.Methods”（lodash的函数）串起来，那些能返回“唯一值(single value)”或者可能返回原生数据类型（primitive value）会自动结束链式反应

	function square(n) {
	  return n * n;
	}
	 
	var wrapped = _([1, 2, 3]);
	 
	// Returns an unwrapped value.
	wrapped.reduce(_.add);
	// => 6
	 
	// Returns a wrapped value.
	var squares = wrapped.map(square);
	 
	_.isArray(squares);
	// => false
	 
	_.isArray(squares.value());
	// => true



### chain 【显示调用】

_.chain(value)

生成一个Lodash容器，用于执行链式调用，并且，先调用此函数生成的容器具备惰性求值的特性，需要调用value方法进行求值。

	var users = [
	  { 'user': 'barney',  'age': 36 },
	  { 'user': 'fred',    'age': 40 },
	  { 'user': 'pebbles', 'age': 1 }
	];
	 
	var youngest = _
	  .chain(users)
	  .sortBy('age')
	  .map(function(o) {
	    return o.user + ' is ' + o.age;
	  })
	  .head()
	  .value();
	// => 'pebbles is 1'

### tap

_.tap(value, interceptor) 

链式写法仅需要一个参数：回调函数，参数也仅需要一个，就是value

	_([1, 4, 3, 5])
	 .tap(function(array) {
	   array.pop();              //对array进行操作
	   console.log(array);       //打印
	   return array.reverse();   //返回值，也可以不返回值
	 })
	 .value();                   //取值
	// → [3,4,1]

### thru

与tap用法一致，不过必须返回值

## 原型链方法

### _.prototype[Symbol.iterator]()

使包装器可以进行迭代操作

	var wrapped = _([1, 2]);
	 
	wrapped[Symbol.iterator]() === wrapped;
	// => true
	 
	Array.from(wrapped);
	// => [1, 2]

### at

_.prototype.at([paths])

at方法的包装版本

	var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
	 
	_(object).at(['a[0].b.c', 'a[1]']).value();
	// => [3, 4]

### chain

_.prototype.chain()

让隐式调用调用的容器显示化，具备惰性求值的特性

	_(users)
	  .chain()
	  .head()
	  .pick('user')
	  .value();

### commit

_.prototype.commit()

执行链式调用，并返回包装对象，而value返回的是最终的结果值，这是commit与value不同之处

### next

获取集合中下一个元素

	var wrapped = _([1, 2]);
	 
	wrapped.next();
	// => { 'done': false, 'value': 1 }
 
	wrapped.next();
	// => { 'done': false, 'value': 2 }
	 
	wrapped.next();
	// => { 'done': true, 'value': undefined }

### plant

_.prototype.plant(value)

克隆一个已有的Lodash执行序列

	function square(n) {
	  return n * n;
	}
	 
	var wrapped = _([1, 2]).map(square);
	var other = wrapped.plant([3, 4]);
	 
	other.value();
	// => [9, 16]
	 
	wrapped.value();
	// => [1, 4]

### reverse

反转数组，会改变原有数组

### value / toJson / valueOf

与value一致，执行链式操作，返回最终结果