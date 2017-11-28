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