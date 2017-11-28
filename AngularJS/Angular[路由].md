# Angular [Route|路由]

1. 引入Angular路由模块
2. 添加模块依赖
3. 配置路由
4. 编写控制器
5. 编写模板
6. 主页面视图板块添加 ng-view指令
	
路由规则：[{url:'/aaa',controller:'MainController'},...]

~~~
//创建模块，并且绑定依赖
var module = angular.module('appModule',['ngRoute']);

//需要注入$routeProvider
module.config(['$routeProvider',function($routeProvider){
    $routeProvider
		//指定路由地址、处理的控制器、模板文件

		路由地址通配后半部分使用固定写法[:占位符]，意思是匹配统一开头的地址,使用问号表示可选的路由参数
        .when('/activeA:name?',{
            controller:'ACtrl',
            templateUrl:'A.html'
        })
		//携带多个路由参数
        .when('/activeB:param1?:param2?',{
            controller:'BCtrl',
            templateUrl:'B.html'
        })
        .when('/activeC:name?',{
            controller:'CCtrl',
            templateUrl:'C.html'
        })
		.otherwise({
			redirectTo:'/activeA'
		});
}]);

//创建控制器
module.controller('ACtrl', ['$scope','$routeParams', function ($scope,$routeParams) {
	//获取路由参数
    $scope.title = '参数为：'+$routeParams.name;

}]);
module.controller('BCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.title = '我是控制器B';

}]);
module.controller('CCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.title = '我是控制器C';

}]);

//创建模板文件
A.html
<h1>{{title}}</h1>

B.html
<h1>{{title}}</h1>

C.html
<h1>{{title}}</h1>
~~~

> 模板不一定非要定义到单独的文件中

可以使用script标签结合ng-templete保存在当前页面

~~~
<script type="text/ng-template" id="main-tpl.html">...</script>
~~~

## 路由地址带有#!/时的处理方式

去掉路由前缀哈希值

~~~
appModule.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix("");
}]);
~~~

## 重定向[$location]

控制器注入$location，使用$location.path进行跳转
~~~
$location.path(path);
~~~