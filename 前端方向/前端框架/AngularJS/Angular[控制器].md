<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Controller](#controller)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Controller

$scope具备多级作用域，控制器如果需要使用顶级scope作用域需要进行依赖注入，如果不需要则最好监理独立作用域的scope

通常情况下，控制器不应被赋予太多的责任和义务，它只需要负责一个单一视图所需的业务逻辑。最常见的保持控制器“纯度”的方法是将那些**不属于控制器的逻辑都封装到服务（services）中**，然后在控制器中通过依赖注入调用相关服务。控制器通常只做两件事：

1. 初始化$scope对象
2. 为 $scope添加行为方法

**Tips：控制器的定义位置应处于模块之下，而不应该在全局作用域之下**

~~~
var myApp = angular.module('myApp',[]);

myApp.controller('GreetingCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
	$scope.sayHello = function(name) {
		alert(name); 
	};
}]);
~~~

以上代码绑定的方法可以在GreetingCtrl作用域范围内直接使用ng-click绑定进行回调







