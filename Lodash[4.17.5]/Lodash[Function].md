# Function

## after

创建一个限制调用的函数副本，第一个参数为限制的调用次数，假设当n等于3时，则对副本的前两次调用无效，自第三次起的调用有效

_.after(n, func)

**返回一个函数副本，调用应使用这个函数副本完成**

## before

创建一个限制调用的函数副本，第一个参数为限制的调用次数，假设当n等于3时，则对副本的前两次调用有效，自第三次起的调用无效

_.before(n, func)

## ary

创建一个目标函数副本，过滤多余的调用参数，参数个数由第二个参数指定，默认为原函数参数个数

_.ary(func, [n=func.length])

	_.map(['6', '8', '10'], _.ary(parseInt, 1));
	// => [6, 8, 10]

## delay

延迟调用函数

_.delay(func, wait, [args])

	_.delay(function(text) {
	  	console.log(text);
	}, 1000, 'later');
	// => Logs 'later' after one second.

## flip

逆转参数序列调用目标函数

_.flip(func)

	var flipped = _.flip(function() {
	  return _.toArray(arguments);
	});
	 
	flipped('a', 'b', 'c', 'd');
	// => ['d', 'c', 'b', 'a']

## once

创建一个一次调用的函数副本，多次调用返回第一层调用的结果

_.once(func)











































