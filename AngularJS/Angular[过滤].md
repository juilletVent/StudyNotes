# 过滤

> Use filter

~~~
{{ data | filter}}

Exp:
{{10000|currency}}//货币
{{1552254554|date}}//时间

{{1288323623006 | date:'medium'}}: Oct 29, 2010 11:40:23 AM
{{1288323623006 | date:'yyyy-MM-dd HH:mm:ss Z'}}: 2010-10-29 11:40:23 +0800
{{1288323623006 | date:'MM/dd/yyyy @ h:mma'}}: 10/29/2010 @ 11:40AM
{{1288323623006 | date:"MM/dd/yyyy 'at' h:mma"}}: 10/29/2010 at 11:40AM
~~~

### 描述

使用过滤器可以对数据进行格式化、排序、筛选等操作

使用方法为：紧随表达式 后面 添加 | 筛选器名 参数,

### 常用过滤器

- date		格式化日期
- filter   //根据传入的参数筛选数据集合
- json
- limitTo
- number
- orderBy
- lowercase 

> filter 

如果需要匹配特定属性可使用对象形式传入对应参数

栗子：
~~~
//精准字段匹配完成为true的项目,这里使用的比较对象，也可以定义在scope上下文中然后直接引用
re-repeat="todo in todos | filter:{complted:true}"

//简单匹配
re-repeat="todo in todos | filter:'targetStr'"

//自定义匹配
re-repeat="todo in todos | filter: selector : equalFunction"

selector为键值map对象:{targetKey:targetValue}表明比较的属性以及值

$scope.equalFunction(source,target){
	return source===target;
}
~~~

### 自定义过滤器

> Define
{{true | filterName}}
输出：√
~~~
angular.module('app',[]).filter('filterName',function(){
	return function(srcParm){
		return srcParm ? '\u2713' : '\u2718';
	}
})
~~~

定义的filter过滤器的执行函数将返回一个用于过滤的函数，这个函数才是实际上的过滤函数，第一个参数是将要过滤的源数据，其后可以添加自定义的参数，举个栗子：

~~~
//多个参数使用冒号分隔开
{{true | filterName : 1}}

angular.module('app',[]).filter('filterName',function(){
	return function(srcParm,style){
		style = style || 1;
		if(1==style){
			return srcParm ? '\u2713' : '\u2718';	
		}else{
			return srcParm ? '\u2714' : '\u2719';
		}
	}
})
~~~

