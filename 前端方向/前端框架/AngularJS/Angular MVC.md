<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Angular MVC基础](#angular-mvc%E5%9F%BA%E7%A1%80)
  - [Controller 注意事项](#controller-%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
  - [使用](#%E4%BD%BF%E7%94%A8)
  - [路由](#%E8%B7%AF%E7%94%B1)
  - [指令](#%E6%8C%87%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Angular MVC基础

## Controller 注意事项

1. 不要试图复用Controller，Controller的作用应该专一化
2. 不要在Controller里面操作DOM，这不是控制器的职责
3. 不要在Controller做数据格式化操作
4. 不要在Controller里面做数据过滤
5. 不要进行Controller之间的互相调用


## 使用

1. 根节点添加指令 ng-app="ModuleName"
2. 在目标节点添加ng-controller="ctrlName"
3. 绑定数据：ng-model="$scope.userInfo.email" [scope为全局空间，可以省略]model必须位于控制其内部
4. 事件响应：
	1. 在scope上添加事件处理函数 $scope.getFormData = function(){...}
	2. 在控件上绑定指令:ng-click="getFormData()"
5. 显示/隐藏：ng-hide/ng-show="$scope.menuState.show"

## 路由

~~~
moduleName.config(function($routerProvider){
	$routeProvider.when('/hello',{
		templateUrl:'tpls/hello/html',
		controller:'HelloCtrl'
	}).otherwise(
		{redirectTo:'/hello'}
	)
});
~~~

## 指令

匹配模式：
- E:元素[标签名]<my></my>
- A:属性[默认形式]
- C:样式类
- M:注释