<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JQuery DOM篇](#jquery-dom%E7%AF%87)
    - [JS DOM创建节点](#js-dom%E5%88%9B%E5%BB%BA%E8%8A%82%E7%82%B9)
    - [jQuery节点创建与属性的处理](#jquery%E8%8A%82%E7%82%B9%E5%88%9B%E5%BB%BA%E4%B8%8E%E5%B1%9E%E6%80%A7%E7%9A%84%E5%A4%84%E7%90%86)
    - [DOM内部插入append()与appendTo()](#dom%E5%86%85%E9%83%A8%E6%8F%92%E5%85%A5append%E4%B8%8Eappendto)
    - [DOM外部插入after()与before()](#dom%E5%A4%96%E9%83%A8%E6%8F%92%E5%85%A5after%E4%B8%8Ebefore)
    - [DOM外部插入insertAfter()与insertBefore()](#dom%E5%A4%96%E9%83%A8%E6%8F%92%E5%85%A5insertafter%E4%B8%8Einsertbefore)
    - [DOM节点删除之empty()的基本用法](#dom%E8%8A%82%E7%82%B9%E5%88%A0%E9%99%A4%E4%B9%8Bempty%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
    - [DOM节点删除之remove()的有参用法和无参用法](#dom%E8%8A%82%E7%82%B9%E5%88%A0%E9%99%A4%E4%B9%8Bremove%E7%9A%84%E6%9C%89%E5%8F%82%E7%94%A8%E6%B3%95%E5%92%8C%E6%97%A0%E5%8F%82%E7%94%A8%E6%B3%95)
    - [DOM节点删除之empty和remove区别](#dom%E8%8A%82%E7%82%B9%E5%88%A0%E9%99%A4%E4%B9%8Bempty%E5%92%8Cremove%E5%8C%BA%E5%88%AB)
    - [DOM节点删除之保留数据的删除操作detach()](#dom%E8%8A%82%E7%82%B9%E5%88%A0%E9%99%A4%E4%B9%8B%E4%BF%9D%E7%95%99%E6%95%B0%E6%8D%AE%E7%9A%84%E5%88%A0%E9%99%A4%E6%93%8D%E4%BD%9Cdetach)
    - [DOM节点删除之detach()和remove()区别](#dom%E8%8A%82%E7%82%B9%E5%88%A0%E9%99%A4%E4%B9%8Bdetach%E5%92%8Cremove%E5%8C%BA%E5%88%AB)
    - [DOM拷贝clone()](#dom%E6%8B%B7%E8%B4%9Dclone)
    - [DOM替换replaceWith()和replaceAll()](#dom%E6%9B%BF%E6%8D%A2replacewith%E5%92%8Creplaceall)
    - [DOM包裹wrap()方法](#dom%E5%8C%85%E8%A3%B9wrap%E6%96%B9%E6%B3%95)
    - [DOM包裹unwrap()方法](#dom%E5%8C%85%E8%A3%B9unwrap%E6%96%B9%E6%B3%95)
    - [DOM包裹wrapAll()方法[增加统一的父元素]](#dom%E5%8C%85%E8%A3%B9wrapall%E6%96%B9%E6%B3%95%E5%A2%9E%E5%8A%A0%E7%BB%9F%E4%B8%80%E7%9A%84%E7%88%B6%E5%85%83%E7%B4%A0)
    - [DOM包裹wrapInner()方法](#dom%E5%8C%85%E8%A3%B9wrapinner%E6%96%B9%E6%B3%95)
    - [jQuery遍历之children()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bchildren%E6%96%B9%E6%B3%95)
    - [jQuery遍历之find()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bfind%E6%96%B9%E6%B3%95)
    - [jQuery遍历之parent()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bparent%E6%96%B9%E6%B3%95)
    - [jQuery遍历之parents()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bparents%E6%96%B9%E6%B3%95)
    - [jQuery遍历之closest()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bclosest%E6%96%B9%E6%B3%95)
    - [JQuery 遍历之next方法](#jquery-%E9%81%8D%E5%8E%86%E4%B9%8Bnext%E6%96%B9%E6%B3%95)
    - [jQuery遍历之prev()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bprev%E6%96%B9%E6%B3%95)
    - [jQuery遍历之siblings()](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Bsiblings)
    - [jQuery遍历之add()方法](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Badd%E6%96%B9%E6%B3%95)
    - [jQuery遍历之each()](#jquery%E9%81%8D%E5%8E%86%E4%B9%8Beach)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JQuery DOM篇

####  JS DOM创建节点

原生JavaScript创建流程：

1. 创建节点(常见的：元素、属性和文本)
2. 添加节点的一些属性
3. 加入到文档中

流程中涉及的一点方法：

- 创建元素：document.createElement
- 设置属性：setAttribute
- 添加文本：innerHTML
- 加入文档：appendChild

#### jQuery节点创建与属性的处理

创建元素节点：

~~~
$("<div class='right'><div class='aaron'>动态创建DIV元素节点</div></div>")
~~~

#### DOM内部插入append()与appendTo()

方法：

![](http://img.mukewang.com/56cc12f800017b4104480146.jpg)

~~~
append()前面是被插入的对象，后面是要在对象内插入的元素内容
appendTo()前面是要插入的元素内容，而后面是被插入的对象
~~~

#### DOM外部插入after()与before()

选择器描述：

![](http://img.mukewang.com/57481b6b00018e3405210197.jpg)

- before与after都是用来对相对选中元素外部增加相邻的兄弟节点
- 2个方法都是都可以接收HTML字符串，DOM 元素，元素数组，或者jQuery对象，用来插入到集合中每- 个匹配元素的前面或者后面
- 2个方法都支持多个参数传递after(div1,div2,....) 可以参考右边案例代码

**总结：**

1. append()向每个匹配的元素内部追加内容
2. prepend()向每个匹配的元素内部前置内容
3. appendTo()把所有匹配的元素追加到另一个指定元素的集合中
4. prependTo()把所有匹配的元素前置到另一个指定的元素集合中

#### DOM外部插入insertAfter()与insertBefore()

使用：

![](http://img.mukewang.com/57481d230001b0f305170241.jpg)

1. before()和.insertBefore()实现同样的功能。主要的区别是语法——内容和目标的位置。 对于before()选择表达式在函数前面，内容作为参数，而.insertBefore()刚好相反，内容在方法前面，它将被放在参数里元素的前面
2. after()和.insertAfter() 实现同样的功能。主要的不同是语法——特别是（插入）内容和目标的位置。 对于after()选择表达式在函数的前面，参数是将要插入的内容。对于 .insertAfter(), 刚好相反，内容在方法前面，它将被放在参数里元素的后面
3. before、after与insertBefore。insertAfter的除了目标与位置的不同外，后面的不支持多参数处理

#### DOM节点删除之empty()的基本用法

empty 顾名思义，清空方法，但是与删除又有点不一样，因为它只移除了 指定元素中的所有子节点。

~~~
$('.hello').empty()
~~~

#### DOM节点删除之remove()的有参用法和无参用法

remove与empty一样，都是移除元素的方法，但是remove会将元素自身移除，同时也会移除元素内部的一切，包括绑定的事件及与该元素相关的jQuery数据。

~~~
$(".test1").remove()

$("button:last").on('click', function() {
    //找到所有p元素中，包含了3的元素
    //这个也是一个过滤器的处理
    $("p").remove(":contains('3')")
})
~~~

*PS：remove比empty好用的地方就是可以传递一个选择器表达式用来过滤将被移除的匹配元素集合，可以选择性的删除指定的节点*

*Tips：通过remove方法移除div及其内部所有元素，remove内部会自动操作事件销毁方法，所以使用使用起来非常简单*

#### DOM节点删除之empty和remove区别

> empty方法

- 严格地讲，empty()方法并不是删除节点，而是清空节点，它能清空元素中的所有后代节点
- empty不能删除自己本身这个节点

> remove方法

- 该节点与该节点所包含的所有后代节点将同时被删除
- 提供传递一个筛选的表达式，删除指定合集中的元素

#### DOM节点删除之保留数据的删除操作detach()

挂起/隐藏元素,显示隐藏，数据保留
~~~
//隐藏
p = $("p").detach()
//添加
$("body").append(p);
~~~

#### DOM节点删除之detach()和remove()区别

> remove：移除节点

- 无参数，移除自身整个节点以及该节点的内部的所有节点，包括节点上事件与数据
- 有参数，移除筛选出的节点以及该节点的内部的所有节点，包括节点上事件与数据

> detach：移除节点

- 移除的处理与remove一致
- 与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来
- 例如：$("p").detach()这一句会移除对象，仅仅是显示效果没有了。但是内存中还是存在的。当你append之后，又重新回到了文档流中。就又显示出来了。

#### DOM拷贝clone()

.clone()方法深度 复制所有匹配的元素集合，包括所有匹配元素、匹配元素的下级元素、文字节点。

- 如果节点有事件或者数据之类的其他处理，我们需要通过clone(ture)传递一个布尔值ture用来指定，这样不仅仅只是克隆单纯的节点结构，还要把附带的事件与数据给一并克隆了
- clone()方法是jQuery扩展的，只能处理通过jQuery绑定的事件与数据
- 元素数据（data）内对象和数组不会被复制，将继续被克隆元素和原始元素共享。深复制的所有数据，需要手动复制每一个

#### DOM替换replaceWith()和replaceAll()

用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合

- .replaceWith( newContent )：用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集
合
- .replaceAll( target ) ：用集合的匹配元素替换每个目标元素

~~~
$('<a style="color:red">替换第二段的内容</a>').replaceAll('p:eq(1)')
~~~

<span style='color:red'>
.replaceWith()与.replaceAll() 方法会删除与节点相关联的所有数据和事件处理程序<br/>
.replaceWith()方法返回的jQuery对象引用的是替换前的节点，而不是通过replaceWith/replaceAll方法替换后的节点
</span>

#### DOM包裹wrap()方法

- .wrap( wrappingElement )：在集合中匹配的每个元素周围包裹一个HTML结构
- .wrap( function ) ：一个回调函数，返回用于包裹匹配元素的 HTML 内容或 jQuery 对象

给p元素增加一个div包裹
	
	$('p').wrap('<div></div>')
	$('p').wrap(function() {
    	return '<div></div>';   //与第一种类似，只是写法不一样
	})

#### DOM包裹unwrap()方法

jQuery提供了一个unwarp()方法 ，作用与wrap方法是相反的。将匹配元素集合的父级元素删除，保留自身（和兄弟元素，如果存在）在原来的位置。
	
	//找到p元素，然后调用unwarp方法，这样只会删除父辈div元素了
	$('p').unwarp();

#### DOM包裹wrapAll()方法[增加统一的父元素]

.wrapAll( wrappingElement )：给集合中匹配的元素增加一个外面包裹HTML结构

~~~
//处理前
<p>p元素</p>
<p>p元素</p>

$('p').wrapAll('<div></div>')

//处理后
<div>
    <p>p元素</p>
    <p>p元素</p>
</div>
~~~

.wrapAll( function ) ：一个回调函数，返回用于包裹匹配元素的 HTML 内容或 jQuery 对象

通过回调的方式可以单独处理每一个元素:
~~~
$('p').wrapAll(function() {
    return '<div><div/>'; 
})

//结果
<div>
    <p>p元素</p>
</div>
<div>
    <p>p元素</p>
</div>
~~~

#### DOM包裹wrapInner()方法

包裹子元素

~~~
//源
<div>p元素</div>
<div>p元素</div>

$('div').wrapInner('<p></p>')
$('div').wrapInner(function() {
    return '<p></p>'; 
})

//结果
<div>
    <p>p元素</p>
</div>
<div>
    <p>p元素</p>
</div>
~~~

#### jQuery遍历之children()方法

~~~
//匹配所有子元素
$('.div').children().css('border','1px solid red');
//筛选匹配
$('.div').children(':last').css('border', '3px solid blue')
~~~

#### jQuery遍历之find()方法

	$("div").find("li")

- find只在后代中遍历，不包括自己。
- 如果我们需要实现对所有后代元素的取回，可以传递通配选择器 '*'。
- 选择器 context 是由 .find() 方法实现的；因此，$('.item-ii').find('li') 等价于 $('li', '.item-ii')(找到类名为item-ii的标签下的li标签)。

#### jQuery遍历之parent()方法

因为是父元素，这个方法只会向上查找一级

	parent()无参数
	parent()方法选择性地接受同一型选择器表达式

#### jQuery遍历之parents()方法

返回所有祖辈元素，可携带过滤参数

	$('.item-b').parents(':eq(1)').css('border','1px solid red');

#### jQuery遍历之closest()方法

类似于parent，此方法向上匹配，一旦匹配到过滤条件立即停止搜索

	$("div").closet("li')

返回一个/0个JQuery对象

#### JQuery 遍历之next方法

~~~
//无参数筛选
$("button:first").click(function() {
    $('.item-1').next().css({
        'color':'red',
        'display':'inline-block',
        'border':'1px solid blue'
    }).next().css('font-size','5em');
});

//过滤筛选
$('.item-1').next(':eq(2)').css('border', '1px solid blue')
~~~

#### jQuery遍历之prev()方法

如果想快速查找指定元素集合中每一个元素紧邻的前面同辈元素的元素集合，此时可以用prev()方法

~~~
//匹配所有
$('.item-2').prev().css('border','1px solid red');
//筛选匹配
$('.item-3').prev(':last').css('border', '1px solid blue')
~~~

#### jQuery遍历之siblings()

jQuery是一个合集对象，如果想快速查找指定元素集合中每一个元素的同辈元素，此时可以用siblings()方法

~~~
//全选
$('.item-2').siblings().css('color','red');
//过滤选择
$('.item-2').siblings(':first').css('border', '2px solid blue')
~~~

#### jQuery遍历之add()方法

jQuery是一个合集对象，通过$()方法找到指定的元素合集后可以进行一系列的操作。$()之后就意味着这个合集对象已经是确定的，如果后期需要再往这个合集中添加一新的元素要如何处理？jQuery为此提供add方法，用来创建一个新的jQuery对象 ，元素添加到匹配的元素集合中

	$('li').add('p').css('background', 'red')

#### jQuery遍历之each()

.each() 方法就是一个for循环的迭代器，它会迭代jQuery对象合集中的每一个DOM元素。每次回调函数执行时，会传递当前循环次数作为参数(从0开始计数

~~~
$("li").each(function(index, element) {
     index 索引 0,1
     element是对应的li节点 li,li
     this 指向的是li
})
~~~