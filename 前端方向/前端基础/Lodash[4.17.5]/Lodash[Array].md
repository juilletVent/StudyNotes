<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Lodash Array](#lodash-array)
  - [chunk](#chunk)
  - [compact](#compact)
  - [concat](#concat)
  - [different](#different)
  - [differenceBy(array, [values], [iteratee=_.identity])](#differencebyarray-values-iteratee_identity)
  - [differenceWith](#differencewith)
  - [drop](#drop)
  - [dropRight](#dropright)
  - [dropWhile](#dropwhile)
  - [fill](#fill)
  - [findIndex](#findindex)
  - [findLastIndex](#findlastindex)
  - [flatten](#flatten)
  - [flattenDeep](#flattendeep)
  - [flattenDepth](#flattendepth)
  - [fromPairs](#frompairs)
  - [head](#head)
  - [last](#last)
  - [indexOf](#indexof)
  - [lastIndexOf](#lastindexof)
  - [initial](#initial)
  - [tail](#tail)
  - [intersection](#intersection)
  - [intersectionBy](#intersectionby)
  - [intersectionWith](#intersectionwith)
  - [join](#join)
  - [nth](#nth)
  - [pull](#pull)
  - [pullAll](#pullall)
  - [pullAllBy](#pullallby)
  - [pullAllWith](#pullallwith)
  - [pullAt](#pullat)
  - [remove](#remove)
  - [reverse](#reverse)
  - [slice](#slice)
  - [sortedIndex](#sortedindex)
  - [sortedIndexBy](#sortedindexby)
  - [sortedIndexOf](#sortedindexof)
  - [sortedLastIndex](#sortedlastindex)
  - [sortedLastIndexBy](#sortedlastindexby)
  - [sortedLastIndexOf](#sortedlastindexof)
  - [sortedUniq](#sorteduniq)
  - [sortedUniqBy](#sorteduniqby)
  - [take](#take)
  - [takeRight](#takeright)
  - [takeRightWhile](#takerightwhile)
  - [takeWhile](#takewhile)
  - [union](#union)
  - [unionBy](#unionby)
  - [unionWith](#unionwith)
  - [uniq](#uniq)
  - [uniqBy](#uniqby)
  - [uniqWith](#uniqwith)
  - [without](#without)
  - [xor](#xor)
  - [xorBy](#xorby)
  - [xorWith](#xorwith)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Lodash Array

## chunk

分割数组 f(array,size)，最后一个不能均分时全部放入  

返回一个二维数组

## compact

清除数组中的无效值 f(arrat)  
	
	无效值null, 0, "", undefined, and NaN

去除无效数值的新数组

## concat 

连接新的值进入数组，调用形式,新的值如果包含数组，会进行一维展开，其余的不作处理

	_.concat(array, [values])

	_.concat(['hello'],1,[2,4])  //['hello',1,2,4]

返回一个处理之后的新的数组

## different

提出第一个数组中包含在第二数组中的值

	_.difference([2, 1], [2, 3]);
	// => [1]

返回一个新的数组

## differenceBy(array, [values], [iteratee=_.identity])

类似于different 第三个参数为元素处理迭代器，用作比较前对元素进行处理

## differenceWith

类似于different 第三个参数为比较器，用作两个元素的比较规则

## drop

从数组头部开始删除元素，删除个数默认为1,

_.drop(array, [n=1])

	_.drop(array, [n=1])
	
	_.drop([1, 2, 3]);
	// => [2, 3]
	 
	_.drop([1, 2, 3], 2);
	// => [3]
	 
	_.drop([1, 2, 3], 5);
	// => []

## dropRight

作用雷同与drop只不过是从右侧开始

_.dropRight(array, [n=1])

## dropWhile

依据提供的条件进行删除

_.dropWhile(array, [predicate=_.identity])

## fill 

填充数组元素，返回原数组，不创建新的数组，第三个参数标记结束为止，不含endPosition

_.fill(array, value, [start=0], [end=array.length])

	var array = [1, 2, 3];
	 
	_.fill(array, 'a');
	console.log(array);
	// => ['a', 'a', 'a']
	 
	_.fill(Array(3), 2);
	// => [2, 2, 2]
	 
	_.fill([4, 6, 8, 10], '*', 1, 3);
	// => [4, '*', '*', 10]

## findIndex

根据提供的判断器在给定的缓冲区进行寻找，返回找到的索引值，第三个参数标记开始寻找的位置

_.findIndex(array, [predicate=_.identity], [fromIndex=0])

	var users = [
	  { 'user': 'barney',  'active': false },
	  { 'user': 'fred',    'active': false },
	  { 'user': 'pebbles', 'active': true }
	];
	 

	// 使用比较器进行寻找
	_.findIndex(users, function(o) { return o.user == 'barney'; });
	// => 0
	//使用对象键值执行寻找
	// The `_.matches` iteratee shorthand.
	_.findIndex(users, { 'user': 'fred', 'active': false });
	// => 1
	//使用单个属性与值进行检索
	// The `_.matchesProperty` iteratee shorthand.
	_.findIndex(users, ['active', false]);
	// => 0
	使用属性名进行寻找，值使用真值
	// The `_.property` iteratee shorthand.
	_.findIndex(users, 'active');
	// => 2

## findLastIndex

使用等同于findIndex，只是从右侧开始

## flatten

将传入的数组的内部元素展开一层，意思就是如果内部元素存在嵌套数组，则展开一个层级

_.flatten(array)

	_.flatten([1, [2, [3, [4]], 5]]);
	// => [1, 2, [3, [4]], 5]

## flattenDeep

作用类似于flatten，只是flattenDeep进行深度展开，会展开传入数组的所有层级

_.flattenDeep(array)

	_.flattenDeep([1, [2, [3, [4]], 5]]);
	// => [1, 2, 3, 4, 5]

## flattenDepth

按照指定的层级进行展开

_.flattenDepth(array, [depth=1])

	var array = [1, [2, [3, [4]], 5]];
	 
	_.flattenDepth(array, 1);
	// => [1, 2, [3, [4]], 5]
	 
	_.flattenDepth(array, 2);
	// => [1, 2, 3, [4], 5]

## fromPairs

使用数组创建键值对象

_.fromPairs(pairs)

	_.fromPairs([['a', 1], ['b', 2]]);
	// => { 'a': 1, 'b': 2 }

## head

获取数组第一个元素，如果不存在返回未定义

_.head(array)

## last

获取数组最后一个元素，如果不存在返回未定义

## indexOf

寻找元素，从某个位置开始

_.indexOf(array, value, [fromIndex=0])

	_.indexOf([1, 2, 1, 2], 2);
	// => 1
	 
	// Search from the `fromIndex`.
	_.indexOf([1, 2, 1, 2], 2, 2);
	// => 3

## lastIndexOf

寻找元素，从数组末尾开始，可以指定开始位置

## initial

取除了最后一个元素的全部成员

_.initial(array)

	_.initial([1, 2, 3]);
	// => [1, 2]

## tail

取除了第一个元素的全部成员

_.tail(array)

	_.tail([1, 2, 3]);
	// => [2, 3]

## intersection

求交集

_.intersection([arrays])

	_.intersection([2, 1], [2, 3]);
	// => [2]

## intersectionBy

作用与intersection类似，添加元素预处理器

_.intersectionBy([arrays], [iteratee=_.identity])

	//使用预处理函数处理元素对象
	_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
	// => [2.1]
	//使用字段名进行对象比较
	// The `_.property` iteratee shorthand.
	_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	// => [{ 'x': 1 }]

## intersectionWith

作用与intersection类似，添加比较器

_.intersectionWith([arrays], [comparator])

	var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 
	_.intersectionWith(objects, others, _.isEqual);
	// => [{ 'x': 1, 'y': 2 }]

## join

数组转字符串

	_.join(array, [separator=','])

## nth

获取数组的索引n处的元素。如果n是负数，则返回从结尾开始的第n个元素

_.nth(array, [n=0])

## pull

根据给定的移除的值删除数组对应的元素，返回原数组

_.pull(array, [values])

	var array = ['a', 'b', 'c', 'a', 'b', 'c'];
	 
	_.pull(array, 'a', 'c');
	console.log(array);
	// => ['b', 'b']

## pullAll

作用同pull，第二个参数接受数组作为比较参数

_.pullAll(array, values)


## pullAllBy

作用同pullAll，第三个参数预处理，可以传入字符串作为比较字段

	var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
	 
	_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
	console.log(array);
	// => [{ 'x': 2 }]

## pullAllWith

第三个参数接受一个比较器，进行比较

_.pullAllWith(array, values, [comparator])

	var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
	 
	_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
	console.log(array);
	// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]

## pullAt

移除指定下表集合的元素，返回移除的元素组成的新数组，修改原数组

_.pullAt(array, [indexes])

	var array = ['a', 'b', 'c', 'd'];
	var pulled = _.pullAt(array, [1, 3]);
	 
	console.log(array);
	// => ['a', 'c']
	 
	console.log(pulled);
	// => ['b', 'd']


## remove

移除符合条件的元素，修改原数组，并返回已经移除元素组成的数组对象

_.remove(array, [predicate=_.identity])

	var array = [1, 2, 3, 4];
	var evens = _.remove(array, function(n) {
	  return n % 2 == 0;
	});
	 
	console.log(array);
	// => [1, 3]
	 
	console.log(evens);
	// => [2, 4]

## reverse

逆转

## slice

截取

## sortedIndex

使用二分搜索，确定目标元素应该插入在有序序列的哪个下标

_.sortedIndex(array, value)

	_.sortedIndex([30, 50], 40);
	// => 1

## sortedIndexBy

同sortedIndex作用一致，第三个参数返回每个元素采用什么值进行比较的回调
	
_.sortedIndexBy(array, value, [iteratee=_.identity])
	
	var objects = [{ 'x': 4 }, { 'x': 5 }];
	 
	_.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	// => 0
	 
	// The `_.property` iteratee shorthand.
	_.sortedIndexBy(objects, { 'x': 4 }, 'x');
	// => 0

## sortedIndexOf

_.sortedIndexOf(array, value)

搜索元素下标，适用于有序序列，采用二分搜索

## sortedLastIndex

同 sortedIndexOf ，从右侧开始

## sortedLastIndexBy

第三个参数返回用作比较的的值

	var objects = [{ 'x': 4 }, { 'x': 5 }];
	 
	_.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
	// => 1
	 
	// The `_.property` iteratee shorthand.
	_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
	// => 1

## sortedLastIndexOf

_.sortedLastIndexOf(array, value)

搜索元素在数组中最后出现的位置，采用二分搜索，适用于有序序列

	_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
	// => 3

## sortedUniq

去除有序列中重复的值

_.sortedUniq(array)

	_.sortedUniq([1, 1, 2]);
	// => [1, 2]

## sortedUniqBy

提供第三个参数进行元素预处理

_.sortedUniqBy(array, [iteratee])

	_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
	// => [1.1, 2.3]

## take

使用数组头部的几个元素创建新的数组

_.take(array, [n=1])

	_.take([1, 2, 3]);
	// => [1]
	 
	_.take([1, 2, 3], 2);
	// => [1, 2]
	 
	_.take([1, 2, 3], 5);
	// => [1, 2, 3]
	 
	_.take([1, 2, 3], 0);
	// => []

## takeRight

使用数组尾部的几个元素构建新的数组

_.takeRight(array, [n=1])


## takeRightWhile

使用数组尾部的元素构建新的数组，第二个参数作为判断条件
	
	takeRvar users = [
	  { 'user': 'barney',  'active': true },
	  { 'user': 'fred',    'active': false },
	  { 'user': 'pebbles', 'active': false }
	];
	 
	_.takeRightWhile(users, function(o) { return !o.active; });
	// => objects for ['fred', 'pebbles']
	 
	// The `_.matches` iteratee shorthand.
	_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
	// => objects for ['pebbles']
	 
	// The `_.matchesProperty` iteratee shorthand.
	_.takeRightWhile(users, ['active', false]);
	// => objects for ['fred', 'pebbles']
	 
	// The `_.property` iteratee shorthand.
	_.takeRightWhile(users, 'active');
	// => []ightWhile

## takeWhile

雷同于takeRightWhile，自左侧开始匹配


## union

_.union([arrays])

传入一个二维数组，生成所有二维数组的唯一集合

	_.union([2], [1, 2]);
	// => [2, 1]

## unionBy

带有预处理的union方法

_.unionBy([arrays], [iteratee=_.identity])
	
	_.unionBy([2.1], [1.2, 2.3], Math.floor);
	// => [2.1, 1.2]
	 
	// The `_.property` iteratee shorthand.
	_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
	// => [{ 'x': 1 }, { 'x': 2 }]

## unionWith

自定义比较器的union

_.unionWith([arrays], [comparator])
	
	var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 
	_.unionWith(objects, others, _.isEqual);
	// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]

## uniq

去重

_.uniq(array)

	_.uniq([2, 1, 2]);
	// => [2, 1]

## uniqBy

带有元素预处理的uniq

_.uniqBy(array, [iteratee=_.identity])

## uniqWith

自定义比较器的uniq

_.uniqWith(array, [comparator])

	var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 
	_.uniqWith(objects, _.isEqual);
	// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

## without

作用同pull,去除指定元素，不过本方法返回一个新的数组

_.without(array, [values...])

	_.without([2, 1, 2, 3], 1, 2);
	// => [3]

## xor

去除传入数组的差集

_.xor([arrays])

	_.xor([2, 1], [2, 3]);
	// => [1, 3]

## xorBy

带有预处理器的xor

## xorWith

自定义比较器的xor方法，最后一个参数传入比较器

	var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
	var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
	 
	_.xorWith(objects, others, _.isEqual);
	// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]

**Tips:压缩部分暂时不知道干嘛用的，不记录了**

*2018/06/10 17:06 小冉*
