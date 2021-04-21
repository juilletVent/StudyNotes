<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Angular[介绍]](#angular%E4%BB%8B%E7%BB%8D)
    - [启动点/模块定义[ng-app]](#%E5%90%AF%E5%8A%A8%E7%82%B9%E6%A8%A1%E5%9D%97%E5%AE%9A%E4%B9%89ng-app)
    - [scope 上下文模型](#scope-%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A8%A1%E5%9E%8B)
    - [表达式渲染闪烁问题](#%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B8%B2%E6%9F%93%E9%97%AA%E7%83%81%E9%97%AE%E9%A2%98)
    - [控制器](#%E6%8E%A7%E5%88%B6%E5%99%A8)
    - [数据绑定](#%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)
    - [数据监控](#%E6%95%B0%E6%8D%AE%E7%9B%91%E6%8E%A7)
    - [数据空间[上下文Scope]](#%E6%95%B0%E6%8D%AE%E7%A9%BA%E9%97%B4%E4%B8%8A%E4%B8%8B%E6%96%87scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Angular[介绍]

### 启动点/模块定义[ng-app]

一般来说为一个页面的根节点添加ng-app属性，赋值为一个模块名

	<html ng-app="ModuleName"></html>

使用ng-init可是初始化绑定的值

	<html ng-app="ModuleName" ng-init="user.name='Jack'"></html>

模块定义：


	var moduleName = angular.module("moduleName",['ngRoute']);//第二个参数传递依赖的模块


**如果第二个参数不传，则返回一个已经创建的模块**

### scope 上下文模型

视图与控制器之间的桥梁
暴露数据模型
暴露数据操作方法

### 表达式渲染闪烁问题

1. 使用指令ng-cloak，并为ng-cloak编写CSS样式指定display隐藏，因为在angular渲染后会移除该属性，所以页面就会显示出来了


		[ng-cloak]{
			display:none;
		}



### 控制器

> 暴露数据

使用注入的全局上下文scope对象来进行数据的定义与共享

> 暴露行为

与数据一致使用注入的上下文对象定义对外暴露的数据操作方法

> 检测数据变化[$watch函数]

使用注入的上下文对象scope预定义的API $watch函数绑定数据监测函数

定义：

	module.controller('DemoCtrl',function($scope){
		//控制器执行时，会执行这个函数
		//$scope为全局上下文
	})

	//标准定义：
	helloModule.controller('ContentCtrl',['$scope',function($scope){
		$scope.myData = {
		    user:'chenAn'
		};
		$scope.getMyValue = function(){
		    console.log($scope.myData.user);
		};
		$scope.loadData = function(){
		    console.log('加载数据中...');
		};
		//第一个参数传入绑定的检测的参数，第二个参数为变化时的回调函数
		$scope.$watch('myData.user',function(now,old){
	        console.log('now:'+now+',old:'+old);
	    });
	}]);


注意：定义控制器的时候，第二个参数传入一个数组，数组最后一个元素为函数对象，定义了控制器处理函数，前面的数组成员定义了注入的参数，表示需要注意的变量是哪些，顺序与处理函数的参数一一对应，这样做的原因是避免JS代码混淆对变量注入造成影响，因为注入依赖函数参数的名称

**PS：之所以控制器的回调函数参数名称不能乱写，或必须使用数组定义参数名称字符串的形式指定参数名后才能自定义参数名的原因如下：**在处理时，通过函数对象的 toString() 方法可以知道这个函数定义代码的字符串表现形式，然后就知道它的参数是 $scope 和 $element 。通过名字判断出这是两个外部依赖，然后就去获取资源，最后把资源作为参数，调用定义的函数，如果更改了参数名，NG就无法注入相应的上下文了



### 数据绑定

使用ng-model指令进行数据绑定

	<input type="text" placeholder="请输入" ng-model="myData.user">

使用表达式

	<p>{{myData.user}},Angular</p>

当绑定的数据对象发生改变的时候，相应的视图将进行同步，反之亦然

### 数据监控

使用scope的$watch函数来进行监控

栗子：

	$scope.data = {
		a:'1',
		b:{
			b1:'b1',
			b2:56
		}
	};
	
	$scope.$watch('data',function(now){
		console.log(now);
	},true);

**注意：**监控时，可以传入第三个参数，指定是否进行深层监控，比如一个二维数组，一个自定义数据对象，传入true表示深层监控所有属性的变化，不传/FALSE则表示仅仅监控引用变化，

### 数据空间[上下文Scope]

$Scope 中定义了全局的共享数据上下文、对外暴露的函数接口，实现视图上的数据绑定、更新、定义数据操作方法等