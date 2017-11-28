# Angular[服务]

定义服务，所有的业务逻辑都应该出现在服务中，而不是controller中

module.service('ServiceName',[function(){
	//定义数据对象...

	//定义数据对象方法...

	//对外暴露数据方法...
}]);

使用时感觉应该是对内注入类似$http之类的系统服务，前往后台取得数据，然后定义数据对象存储下来，并对controller的数据提供数据支持，所有的视图操作、视图逻辑都应该与数据的业务逻辑分离，也就是说，Service更像是重新划归了一个controller，并且起了个别名，也可以理解为针对数据的工具类

Angular定义了很多常用的Service：

- $animate    |动画
- $filter     |过滤器
- $http       |ajax
- $interval   |定时器
- $location   |
- $log        |日志
- $timeout    |延时函数
- $window	  |窗口对象


## $http

~~~
// Simple GET request example:
$http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
~~~

The response object has these properties:

- data – {string|Object} – The response body transformed with the transform functions.
- status – {number} – HTTP status code of the response.
- headers – {function([headerName])} – Header getter function.
- config – {Object} – The configuration object that was used to generate the request.
- statusText – {string} – HTTP status text of the response.
- xhrStatus – {string} – Status of the XMLHttpRequest (complete, error, timeout or abort).


## 快捷调用

	$http.get('/someUrl', config).then(successCallback, errorCallback);
	$http.post('/someUrl', data, config).then(successCallback, errorCallback);



















