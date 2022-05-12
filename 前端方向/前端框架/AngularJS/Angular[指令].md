<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Angular[指令]](#angular%E6%8C%87%E4%BB%A4)
  - [Directive](#directive)
    - [ng-model](#ng-model)
    - [ng-bind](#ng-bind)
    - [ng-cloak](#ng-cloak)
    - [ng-repeat](#ng-repeat)
    - [ng-class](#ng-class)
    - [ng-show/ng-hide](#ng-showng-hide)
    - [ng-if](#ng-if)
    - [ng-href/ng-src](#ng-hrefng-src)
    - [ng-switch](#ng-switch)
    - [ng-checked/ng-selected](#ng-checkedng-selected)
    - [ng-disabled/ng-readonly](#ng-disabledng-readonly)
    - [常用事件指令](#%E5%B8%B8%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8C%87%E4%BB%A4)
  - [自定义指令](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4)
  - [指令的Ctrl 与 Link 的区别](#%E6%8C%87%E4%BB%A4%E7%9A%84ctrl-%E4%B8%8E-link-%E7%9A%84%E5%8C%BA%E5%88%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Angular[指令]

> 符合HTML5规范

H5的自定义属性均使用data-开头，所以，NG的属性指令如果想符合H5标准则应写为data-ng-*的形式

> 手动启动|多模块设计

当一个页面存在多个Angular模块时，只有第一个模块会自动启动，而后的模块需要手动启动

	angular.bootstrap(elem,['module1',...]);

**PS：NG本身不推荐真正的单页多模块设计，多模块设计应使用如下方式进行**

1. 定义多个模块
2. 定义一个公共模块，依赖前面定义的各个子模块并添加到全局作用域上
	
		var module = angular.module('appRoot',['module1','module2'...]);

## Directive

### ng-model

数据绑定指令，一般用于表单元素，实现V-M的双向数据绑定

### ng-bind

这样的数据绑定方式不会造成表达式初始化时的闪烁

### ng-cloak

用于解决闪烁问题，实际上并没有什么作用，需要为这个属性预先添加CSS样式隐藏，这个属性在NG解析完成后会移除，所以配合CSS样式就可以避免表达式外显了

**Tips：AngularJS引入位置最好放置在head中，这样就可以什么都不用处理，避免表达式外显，因为NG需要动态处理文档**

> 转义

绑定时，会转义HTML源字符，预防跨站脚本攻击，如果需要使用不转义的绑定指定，则使用ng-bind-html指令进行绑定

**使用时需依赖ngSanitize模块，尽量不要使用这个指令**

> Example

	<div ng-bind="userinfo.name"></div>

### ng-repeat

用于遍历数组重复创建当前元素,单条记录的属性、内容均使用表达式进行书写

> Example

	<ul ng-controller="DemoCtrl">
	    <li ng-repeat="item in datas track by $index" data-id="{{item.id}}">
	        <span>{{item.name}}</span>
	    </li>
	</ul>

**Tips:表项具备重复值时，必须使用track by $index附加指令，表名跟踪对象是谁，跟踪对象可变，可自定义，一般使用$index索引即可**

> 表项附加属性

以下属性为迭代时item上的一些属性值

|-------:|--------|
|属性值|类型|含义|
|$index|number|重复元素的迭代器偏移量（0..length-1）|
|$first  |boolean|如果重复的元素在迭代器中是第一个，则为true。
|$middle |boolean|如果重复元素在迭代器中的第一个和最后一个之间，则为true。
|$last   |boolean|如果重复的元素在迭代器中是最后的，则为true。
|$even   |boolean|如果迭代器位置$index为偶数（否则为false），则为true。
|$odd    |boolean|如果迭代器位置$index为奇数（否则为false），则返回true。


**Tips：ng-repeat项目上携带有附加信息：first、last、odd、even、index等属性，可用于表项的分割线、背景设置等定制化内容的编写**
~~~
<span>{{$first?'首条记录':'非首条记录'}}</span>
~~~

### ng-class

赋予一个map对象给ng-class用于设定样式类，型如:{r ed:true,green:false}这样的类，实际使用中多配合表项自身的位置或其他附加属性实现样式的个性定制，例如斑马线效果，或者简单的使用效果：ng-class="var"

~~~
<li ng-repeat="item in datas" data-id="{{item.id}}" ng-class="{red:$even,green:$odd}">
    <span>{{item.name}}</span>
</li>
~~~

### ng-show/ng-hide

显示或隐藏

	ng-show="true"
	ng-hide="false"

### ng-if

决定一个元素是否存在,当绑定的值为假时，整个元素等将会被移除掉，会遗留注释在HTML中[动态创建],该注释用于将移除的元素再次添加进来时标示添加的位置

	ng-if="true"
	ng-if="var"

### ng-href/ng-src

在使用img/a时，元素自身携带有链接属性，如果直接使用表达式书写这些属性，在DOM渲染时将会报错，因为链接不存在，虽然在NG渲染完成后不影响视图，但是控制台会报一个地址无法抵达的错误，NG为了解决这个问题提供了ng-href与ng-src指令，直接使用这两个指令即可

	<img ng-src="{{imgUrl}}"/>
	<a ng-href="{{imgUrl}}"></a>

### ng-switch

通过绑定数据对象，实现switch的分支显示，类似模板标签的IF-ELSEIF标签

Example：
~~~
<div ng-switch="showPiece">
    <div ng-when="show1">content1</div>
    <div ng-when="show2">content2</div>
    <div ng-switch-default>content-def</div>
</div>
~~~

### ng-checked/ng-selected

与ng-model使用一致效果一致，唯一不同的就是数据绑定规则，ng-model实现的是双向数据绑定，一处更改，处处更改，在实现全选/取消全选时 我们可能不想在CheckBox上使用双向绑定，而希望实现单向绑定，这时候就是用ng-checked即可实现,checkBox会被绑定的元素所影响选中状态，但是反过来却不会。[只会做数据到视图的绑定，反过来却不会] ng-selected同样

### ng-disabled/ng-readonly

### 常用事件指令

- ng-blur:失去焦点
- ng-change:发生改变
- ng-copy:拷贝完成
- ng-click:点击事件
- ng-dbclick:双击事件
- ng-focus:得到焦点
- ng-submit:表单提交

## 自定义指令

封装一些常用且通用的东西，NG中依然存在DOM操作，但是DOM操作都应该使用自定义指令来封装

> Define

~~~
moduleVar.directive('指令名',['$scope',...,function($scope){
	return {
		template:'',
		//模板一般使用单独的HTML碎片文件进行定义
		templateUrl:'',	
	};
}]);
~~~

**PS:指令名使用驼峰命名法，在使用时所有的驼峰处改为小写，并添加中划线**

> 私有上下文[scope]

~~~
moduleVar.directive('指令名',['$scope',...,function($scope){
	return {
		//scope为私有指令上下文，用于获取属性
		scope:{
			//对应相应的属性名，使用@前轴，如果省略，则采用键值名匹配属性
			attr1:'@attr1',
			attr2:'@',
		}
		template:'',
		templateUrl:'',	
	};
}]);

//使用
<指令名 attr1="val"></指令名>
~~~

> 转置 & 替换

自定义指令在使用的时候，内部将会包含其他内容，这些内容按照常理应该被嵌入进模板内部，使用方法如下：

~~~
moduleVar.directive('指令名',['$scope',...,function($scope){
	return {
		//指定内容替换替换
		transclude:true,
		//指定源自定义标签替换，也就是用模板替换原标签
		replace:true,
		//替换的模板必须使用ng-transclude指令
		template:'<button ng-transclude><button>',
	};
}]);

//使用
<指令名>Hello</指令名>
//执行效果
<button ng-transclude>Hello<button>
~~~

**注意：**需要注意的是：替换的内容可以访问外部Scope，且如果指令存在局部Scope，替换的模板也会处于外部Scope作用域，而不是指令局部Scope，尤其注意

> 指令类型

- E:元素[标签名]<my></my>
- A:属性[默认形式]
- C:样式类
- M:注释

~~~
moduleVar.directive('指令名',['$scope',...,function($scope){
	return {
		//指令类型
		restrict:'EACM'
		//指定内容替换替换
		transclude:true,
		//指定源自定义标签替换，也就是用模板替换原标签
		replace:true,
		//替换的模板必须使用ng-transclude指令
		template:'<button ng-transclude><button>',
	};
}]);
~~~

> 使用方式:

~~~
<Hello></Hello>
<div class="Hello"></div>
<div Hello=""></div>

注意：使用注释方式时左右两侧必须带有空格
<!-- directive:Hello -->
~~~

> DOM操作时机[link函数]
~~~

HTML:

<Hello HowTo="自定义属性"></Hello>

JS:

moduleVar.controller('ctrlName',['$scope',function(scope){
	scope.load = function(){
		console.log('回调事件');
	}
}]);

moduleVar.directive('指令名',['$scope',...,function($scope){
	return {
		//指令类型
		restrict:'EACM',
		//私有作用域
		scope:{},
		template:'<button ng-transclude><button>',
		controller:function($scope){
			$scope.func = function(){
				console.log('我是指令暴露的方法')；
			}
		},
		link:function(scope,element,attr,ctrl/*父指令控制器*/){
			//do something...
			//绑定事件、作用域
			element.bind('mouseenter',function(){
				scope.load();
		
				//使用apply调用,在复用指令时，不同的控制器函数名可能不同，则由属性传递进来，使用apply进行调用
				scope.$apply(attr.funcName);
			})

			//获取自定义属性
			var attrVal = attr.HowTo();
		}
	};
}]);
~~~

Tips: **^前缀意味着指令将会在它的父元素上面搜索控制器(如果没有^前缀，指令默认只在所属元素上搜索指定的控制器**

> 子指令

~~~
module.directive('childDirective',function(){
	return {
		require:'^parentDirec'//依赖的父指令，使用^开头
		link:function(scope,element,attr,parentDirecCtrl){
			parentDirecCtrl.func();//调用父指令控制器暴露的方法
		}
	}

})
~~~

> 独立scope作用域

为指令定义独立的scope可以使指令独立开来，否则指令复用的时候会产生连带关系,类似于Vue中Data为什么一定要使用函数一样，避免组件复用是多个实例互相影响

~~~
return{
	scope:{},
}
~~~

> 属性

使用节点自定义属性进行交互，如进行指令复用的时候，指令内执行数据加载，在不同的控制其中可能加载数据的方法不同，则需要定义自定义属性，传入对应控制器的回调方法，然后使用scope.$apply进行调用

Example：

	//html部分

	div:ctrl a 持有数据初始化方法initA
	内部使用指令load 指定自定义属性 data-ng-init="initData"

	div:ctrl b 持有数据初始化方法initB
	内部使用指令load 指定自定义属性 data-ng-init="initData"

	//指令部分
	link中进行相关事件绑定，回调中使用attrs获取相关的自定义属性
	let initFun = sttrs.initData;
	//调用
	scope.$apply(initFun);

**注意：进行属性绑定时名称遵循以下规则，如果属性以 data- 开头，ng自动清除该前缀，因为该前缀属于H5标准，如果继续使用中线连接则采取如下转换方式：data-ng-init => ngInit**

**属性绑定类型：**

<table>
<thead>
<tr>
  <th>符号</th>
  <th>说明</th>
  <th>示例</th>
</tr>
</thead>
<tbody><tr>
  <td>@</td>
  <td>值传递，单向绑定。html页面自定义指令里的val属性的值可传给link的scope使用。第一种写法——str : “@”，这种写法html页面的指令属性名为str</td>
  <td>str : “@val”,属性名为val</td>
</tr>
<tr>
  <td>=</td>
  <td>双向绑定数据到指令的属性中，数据值可以是任意类型的。第一种写法：name : “=”，这种写法html页面的自定义指令属性名就是name</td>
  <td>name : “=username”,属性名是username</td>
</tr>
<tr>
  <td>&amp;</td>
  <td>使用父作用域中的一个函数,可以在指令中调用。第一种写法：getName:”&amp;”,这种写法html页面的自定义指令属性名就是gegName</td>
  <td>getName : “&amp;getUserName”,属性名是getUserName</td>
</tr>
</tbody></table>

	


## 指令的Ctrl 与 Link 的区别

link 和 controller之间的区别， 最基本的区别就是 控制器可以导出一个API， 而子指令的link函数可以通过require来与这个API交互。

当你想暴露一个API给其它的指令调用那就用controller,否则用link。















