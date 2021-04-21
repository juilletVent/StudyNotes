<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Math](#math)
    - [add](#add)
    - [ceil](#ceil)
    - [divide](#divide)
    - [floor](#floor)
    - [max](#max)
    - [maxBy](#maxby)
    - [mean](#mean)
    - [meanBy](#meanby)
    - [min minBy](#min-minby)
    - [multiply](#multiply)
    - [round](#round)
    - [subtract](#subtract)
    - [sum sumBy](#sum-sumby)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Math

### add 

相加

### ceil

_.ceil(number, [precision=0])

向上取整函数，第二个参数确定取舍位数，正数表示向后取舍位数，负数表示向前取舍位数（小数点）

### divide

除法

### floor

_.floor(number, [precision=0])

向下取整函数，第二个为精度控制位，类似ceil函数

### max

返回集合中最大的元素

### maxBy

带有迭代器的max函数

	var objects = [{ 'n': 1 }, { 'n': 2 }];
	 
	_.maxBy(objects, function(o) { return o.n; });
	// => { 'n': 2 }
	 
	// The `_.property` iteratee shorthand.
	_.maxBy(objects, 'n');
	// => { 'n': 2 }

### mean

计算一组值的平均值

### meanBy

带有迭代器的mean

	var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	 
	_.meanBy(objects, function(o) { return o.n; });
	// => 5
	 
	// The `_.property` iteratee shorthand.
	_.meanBy(objects, 'n');
	// => 5

### min minBy

类似于max maxBy

### multiply

乘法函数

### round

精度舍入函数，四舍五入，第二个参数控制精度位置，同ceil函数

	_.round(4.006);
	// => 4
	 
	_.round(4.006, 2);
	// => 4.01
	 
	_.round(4060, -2);
	// => 4100

### subtract

减法

### sum sumBy

求和函数类似max maxBy用法

2018/7/19 10:22:43 沉谙