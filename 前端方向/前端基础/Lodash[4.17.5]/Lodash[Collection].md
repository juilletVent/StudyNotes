## countBy

_.countBy(collection, [iteratee=_.identity])

统计元素出现次数，第二个参数为元素预处理器，也可以是元素属性

	_.countBy([6.1, 4.2, 6.3], Math.floor);
	// => { '4': 1, '6': 2 }
	 
	// The `_.property` iteratee shorthand.
	_.countBy(['one', 'two', 'three'], 'length');
	// => { '3': 2, '5': 1 }

## forEach=>each  forEachRight=>eachRight

同JS操作一致，调用方式稍有区别

_.forEach(collection, [iteratee=_.identity])

_.forEachRight(collection, [iteratee=_.identity])

## every

_.every(collection, [predicate=_.identity])

检查所有元素是否符合规则，遇到不符合规则的元素直接返回false，第二参数指定比较参数

	_.every([true, 1, null, 'yes'], Boolean);
	// => false
	 
	var users = [
	  { 'user': 'barney', 'age': 36, 'active': false },
	  { 'user': 'fred',   'age': 40, 'active': false }
	];
	 
	// The `_.matches` iteratee shorthand.
	_.every(users, { 'user': 'barney', 'active': false });
	// => false
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.every(users, ['active', false]);
	// => true
	 
	// The `_.property` iteratee shorthand.
	_.every(users, 'active');
	// => false

## filter

_.filter(collection, [predicate=_.identity])

根据条件过滤数组，返回过滤出的数据集，原数组被修改

## find

_.find(collection, [predicate=_.identity], [fromIndex=0])

寻找第一个符合条件的对象

	var users = [
	  { 'user': 'barney',  'age': 36, 'active': true },
	  { 'user': 'fred',    'age': 40, 'active': false },
	  { 'user': 'pebbles', 'age': 1,  'active': true }
	];
	 
	_.find(users, function(o) { return o.age < 40; });
	// => object for 'barney'
	 
	// The `_.matches` iteratee shorthand.
	_.find(users, { 'age': 1, 'active': true });
	// => object for 'pebbles'
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.find(users, ['active', false]);
	// => object for 'fred'
	 
	// The `_.property` iteratee shorthand.
	_.find(users, 'active');
	// => object for 'barney'

## findLast

_.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])

寻找最后一个符合条件的元素

	_.findLast([1, 2, 3, 4], function(n) {
	  	return n % 2 == 1;
	});
	// => 3

## flatMap

_.flatMap(collection, [iteratee=_.identity])

对元素集中的元素执行映射替换，具体含义就是，对每个元素进行回调，将对应的元素替换为回调的返回值，并且进行一级展开
	
	function duplicate(n) {
	  return [n, n];
	}
	 
	_.flatMap([1, 2], duplicate);
	// => [1, 1, 2, 2]

## flatMapDeep

作用与用法与flatMap一致，区别在于，替换时将深度展开回调的返回值，而flatMap仅展开一次

	function duplicate(n) {
	  return [[[n, n]]];
	}
	 
	_.flatMapDeep([1, 2], duplicate);
	// => [1, 1, 2, 2]

## flatMapDepth

作用与用法与flatMap一致,区别在于，替换时可以指定展开深度

## groupBy

_.groupBy(collection, [iteratee=_.identity])

根据条件进行分组，分组键名为分组条件的值，值为符合分组条件的元素集合

	_.groupBy([6.1, 4.2, 6.3], Math.floor);
	// => { '4': [4.2], '6': [6.1, 6.3] }
	 
	// The `_.property` iteratee shorthand.
	_.groupBy(['one', 'two', 'three'], 'length');
	// => { '3': ['one', 'two'], '5': ['three'] }

## includes

_.includes(collection, value, [fromIndex=0])

检查元素是否在集合中，如果使用字符串，则进行字符串包含比较，但三个参数为检查开始下标

	_.includes([1, 2, 3], 1);
	// => true
	_.includes([1, 2, 3], 1, 2);
	// => false
	_.includes({ 'a': 1, 'b': 2 }, 1);
	// => true
	_.includes('abcd', 'bc');
	// => true

## invokeMap

_.invokeMap(collection, path, [args])
	
为每个元素调用子方法，以该元素作为上下文进行调用，并替换对应元素，第三个参数为调用参数

	_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
	// => [[1, 5, 7], [1, 2, 3]]
	 
	_.invokeMap([123, 456], String.prototype.split, '');
	// => [['1', '2', '3'], ['4', '5', '6']]

## keyBy

_.keyBy(collection, [iteratee=_.identity])

通过查询对象指定的值来建立一个新的关联数组

	var array = [
	  { 'dir': 'left', 'code': 97 },
	  { 'dir': 'right', 'code': 100 }
	];
	 
	_.keyBy(array, function(o) {
	  return String.fromCharCode(o.code);
	});
	// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	 
	_.keyBy(array, 'dir');
	// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }

## map

_.map(collection, [iteratee=_.identity])

根据传递的处理函数或字段生成对应的Set集合

	function square(n) {
	  return n * n;
	}
	 
	_.map([4, 8], square);
	// => [16, 64] //使用回调处理
	 
	_.map({ 'a': 4, 'b': 8 }, square);
	// => [16, 64] //默认使用对象的值进行回调的传参(iteration order is not guaranteed)
	 
	var users = [
	  { 'user': 'barney' },
	  { 'user': 'fred' }
	];
	 
	// The `_.property` iteratee shorthand.
	_.map(users, 'user');//传入字符串解释为对象键名
	// => ['barney', 'fred']

## orderBy

_.orderBy(collection, [iteratees=[_.identity]], [orders])

根据提供的条件进行排序

	var users = [
	  { 'user': 'fred',   'age': 48 },
	  { 'user': 'barney', 'age': 34 },
	  { 'user': 'fred',   'age': 40 },
	  { 'user': 'barney', 'age': 36 }
	];
	 
	// Sort by `user` in ascending order and by `age` in descending order.
	_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
	// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

## partition

_.partition(collection, [predicate=_.identity])

根据提供的划分条件，对数组进行划分，返回一个二维数组，数组的第一个元素包含复合条件的元素集合，第二个元素包含不符合条件的元素集合

	var users = [
	  { 'user': 'barney',  'age': 36, 'active': false },
	  { 'user': 'fred',    'age': 40, 'active': true },
	  { 'user': 'pebbles', 'age': 1,  'active': false }
	];
	 
	_.partition(users, function(o) { return o.active; });
	// => objects for [['fred'], ['barney', 'pebbles']]
	 
	// The `_.matches` iteratee shorthand.
	_.partition(users, { 'age': 1, 'active': false });
	// => objects for [['pebbles'], ['barney', 'fred']]
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.partition(users, ['active', false]);
	// => objects for [['barney', 'pebbles'], ['fred']]
	 
	// The `_.property` iteratee shorthand.
	_.partition(users, 'active');
	// => objects for [['fred'], ['barney', 'pebbles']]

## reduce

_.reduce(collection, [iteratee=_.identity], [accumulator])

对集合进行累计操作，具体累计行为自定义，前一次调用的返回值作为下一次调用的参数传入回调，调用的第三个参数作为初始值

	_.reduce([1, 2], function(sum, n) {
	  return sum + n;
	}, 0);
	// => 3
	 
	_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	  (result[value] || (result[value] = [])).push(key);
	  return result;
	}, {});
	// => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)

## reduceRight

与 reduce作用类似，区别仅仅是从右边开始

## reject

_.reject(collection, [predicate=_.identity])

与filter相反，返回未通过过滤器的元素集合
	
	var users = [
	  { 'user': 'barney', 'age': 36, 'active': false },
	  { 'user': 'fred',   'age': 40, 'active': true }
	];
	 
	_.reject(users, function(o) { return !o.active; });
	// => objects for ['fred']
	 
	// The `_.matches` iteratee shorthand.
	_.reject(users, { 'age': 40, 'active': true });
	// => objects for ['barney']
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.reject(users, ['active', false]);
	// => objects for ['fred']
	 
	// The `_.property` iteratee shorthand.
	_.reject(users, 'active');
	// => objects for ['barney']

## sample

从集合中随机获取一个元素

_.sample(collection)

	_.sample([1, 2, 3, 4]);
	// => 2

## sampleSize

从集合中随机获取制定大小的子集

_.sampleSize(collection, [n=1])

	_.sampleSize([1, 2, 3], 2);
	// => [3, 1]
	 
	_.sampleSize([1, 2, 3], 4);
	// => [2, 3, 1]

## shuffle 

不大明白，可能是随机打乱一个数组

_.shuffle(collection)

	_.shuffle([1, 2, 3, 4]);
	// => [4, 1, 3, 2]


## size

通用size调用，求取数组长度、对象属性数量、字符串长度

_.size(collection)

	_.size([1, 2, 3]);
	// => 3
	 
	_.size({ 'a': 1, 'b': 2 });
	// => 2
	 
	_.size('pebbles');
	// => 7

## some

判断元素集合中是否有元素符合条件，如果有任意一个元素符合条件，则返回true

_.some(collection, [predicate=_.identity])

	_.some([null, 0, 'yes', false], Boolean);
	// => true
	 
	var users = [
	  { 'user': 'barney', 'active': true },
	  { 'user': 'fred',   'active': false }
	];
	 
	// The `_.matches` iteratee shorthand.
	_.some(users, { 'user': 'barney', 'active': false });
	// => false
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.some(users, ['active', false]);
	// => true
	 
	// The `_.property` iteratee shorthand.
	_.some(users, 'active');
	// => true

## sortBy

排序方法，感觉没啥用

_.sortBy(collection, [iteratees=[_.identity]])

	var users = [
	  { 'user': 'fred',   'age': 48 },
	  { 'user': 'barney', 'age': 36 },
	  { 'user': 'fred',   'age': 40 },
	  { 'user': 'barney', 'age': 34 }
	];
	 
	_.sortBy(users, [function(o) { return o.user; }]);
	// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
	 
	_.sortBy(users, ['user', 'age']);
	// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]

主要返回的结构为二维数组



----------




*冉伟宏*
*2018/6/25 14:29:27*




