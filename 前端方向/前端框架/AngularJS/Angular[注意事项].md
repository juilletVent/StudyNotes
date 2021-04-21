<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Angular注意事项](#angular%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Angular注意事项

- 子级scope引用父集scope中的元素 使用$parent前缀
- 路由配置/!#/问题，使用如下方式规避
	
	~~~
	appModule.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.hashPrefix("");
	}]);
	~~~

- 绑定的模型元素，一定要在controller中的scope上声明，否则可能由于视图没有激活对应的模型，而导致js报undefine
- **Service与Controller之间不要直接进行函数赋值**，否则可能由于函数执行上下文的依赖关系导致找不到方法，比如：在service中定义的函数a,在函数a内调用了service内的方法b，如果此时将函数a的引用直接赋值给controller的成员，再由成员来执行调用就会导致无法找到函数b的引用，因为b属于service而不是controller
- 在使用自定义指令设置input元素获得焦点时，取得element后不要直接设置焦点，这样做由于框架执行顺序问题，会没有效果，配合使用$timeout来延时执行就可以了

	~~~
	angular.module('todoMvc')
	.directive('todoFocus', function todoFocus($timeout,$log) {
		'use strict';

		return function (scope, elem, attrs) {
			scope.$watch(attrs.todoFocus, function (now) {
				$timeout(function(){
					if (now) {
						elem.focus();
					}
				},1,false);
			});
		}
	});	
	~~~