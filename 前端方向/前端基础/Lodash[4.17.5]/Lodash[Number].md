# Number

### clamp

_.clamp(number, [lower], upper)

将值限定在一个范围内，如果超出范围，则返回范围边界的值

	_.clamp(-10, -5, 5);
	// => -5
	 
	_.clamp(10, -5, 5);
	// => 5

### inRange

_.inRange(number, [start=0], end)

判断数值是否处于一个区段内，两个参数时，开始位置为0，第二个参数为结束位置

### random

_.random([lower=0], [upper=1], [floating])

随机数发生器，自动识别传入类型，如果传入浮点数，自动进行浮点数随机，精度不明，如果传入整数，可在第三个参数传入true，指明随机产生浮点数