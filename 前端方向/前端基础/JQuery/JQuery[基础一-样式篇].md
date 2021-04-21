<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JQuery[基础一] 样式篇](#jquery%E5%9F%BA%E7%A1%80%E4%B8%80-%E6%A0%B7%E5%BC%8F%E7%AF%87)
      - [页面加载完成](#%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%88%90)
      - [jQuery对象与DOM对象](#jquery%E5%AF%B9%E8%B1%A1%E4%B8%8Edom%E5%AF%B9%E8%B1%A1)
      - [jQuery对象转化成DOM对象](#jquery%E5%AF%B9%E8%B1%A1%E8%BD%AC%E5%8C%96%E6%88%90dom%E5%AF%B9%E8%B1%A1)
      - [DOM对象转化成jQuery对象](#dom%E5%AF%B9%E8%B1%A1%E8%BD%AC%E5%8C%96%E6%88%90jquery%E5%AF%B9%E8%B1%A1)
      - [id选择器](#id%E9%80%89%E6%8B%A9%E5%99%A8)
      - [类选择器](#%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8)
      - [元素选择器](#%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9%E5%99%A8)
      - [全选择器（*选择器）](#%E5%85%A8%E9%80%89%E6%8B%A9%E5%99%A8%E9%80%89%E6%8B%A9%E5%99%A8)
    - [层级选择器](#%E5%B1%82%E7%BA%A7%E9%80%89%E6%8B%A9%E5%99%A8)
    - [基本筛选选择器](#%E5%9F%BA%E6%9C%AC%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8)
    - [内容筛选选择器](#%E5%86%85%E5%AE%B9%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8)
    - [可见性筛选选择器](#%E5%8F%AF%E8%A7%81%E6%80%A7%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8)
    - [属性筛选选择器](#%E5%B1%9E%E6%80%A7%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8)
    - [表单元素选择器](#%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0%E9%80%89%E6%8B%A9%E5%99%A8)
    - [子元素筛选选择器](#%E5%AD%90%E5%85%83%E7%B4%A0%E7%AD%9B%E9%80%89%E9%80%89%E6%8B%A9%E5%99%A8)
    - [表单对象属性选择器](#%E8%A1%A8%E5%8D%95%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8)
    - [特殊选择器this](#%E7%89%B9%E6%AE%8A%E9%80%89%E6%8B%A9%E5%99%A8this)
    - [综合使用](#%E7%BB%BC%E5%90%88%E4%BD%BF%E7%94%A8)
    - [样式之.attr()与.removeAttr()](#%E6%A0%B7%E5%BC%8F%E4%B9%8Battr%E4%B8%8Eremoveattr)
    - [属性与样式之html()及.text()](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8Bhtml%E5%8F%8Atext)
    - [属性与样式之.val()](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8Bval)
    - [属性与样式之增加样式.addClass()](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8B%E5%A2%9E%E5%8A%A0%E6%A0%B7%E5%BC%8Faddclass)
    - [属性与样式之删除样式.removeClass()](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8B%E5%88%A0%E9%99%A4%E6%A0%B7%E5%BC%8Fremoveclass)
    - [属性与样式之切换样式.toggleClass()[样式切换]](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8B%E5%88%87%E6%8D%A2%E6%A0%B7%E5%BC%8Ftoggleclass%E6%A0%B7%E5%BC%8F%E5%88%87%E6%8D%A2)
    - [属性与样式之样式操作.css()](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8B%E6%A0%B7%E5%BC%8F%E6%93%8D%E4%BD%9Ccss)
    - [样式优先级](#%E6%A0%B7%E5%BC%8F%E4%BC%98%E5%85%88%E7%BA%A7)
    - [属性与样式之元素的数据存储](#%E5%B1%9E%E6%80%A7%E4%B8%8E%E6%A0%B7%E5%BC%8F%E4%B9%8B%E5%85%83%E7%B4%A0%E7%9A%84%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JQuery[基础一] 样式篇

##### 页面加载完成

~~~
$(document).ready(function(){
        alert('页面加载完成');
    });
~~~

##### jQuery对象与DOM对象

<p style="color:red;">jQuery对象与DOM对象是不一样的</p>

- 通过原生DOM模型提供的document.getElementById(“imooc”) 方法获取的DOM元素就是一个DOM对象
- 通过$('#imooc')方法会得到一个$p的jQuery对象

*jQuery是一个类数组对象，而DOM对象就是一个单独的DOM元素*

##### jQuery对象转化成DOM对象

- 利用数组下标的方式读取到jQuery中的DOM对象

~~~
var $div = $('div') //jQuery对象
var div = $div[0] //转化成DOM对象
div.style.color = 'red' //操作dom对象的属性
~~~

- 通过jQuery自带的get()方法/使用数组下标的形式

~~~
var $div = $('div') //jQuery对象
var div = $div.get(0) //通过get方法，转化成DOM对象
//或使用 var div = $div[0];
div.style.color = 'red' //操作dom对象的属性
~~~

##### DOM对象转化成jQuery对象

通过$(dom)方法将普通的dom对象加工成jQuery对象之后，我们就可以调用jQuery的方法了

*$(参数)是一个多功能的方法，通过传递不同的参数而产生不同的作用*
~~~
var div = document.getElementsByTagName('div'); //dom对象
var $div = $(div); //jQuery对象
var $first = $div.first(); //找到第一个div元素
$first.css('color', 'red'); //给第一个元素设置颜色
~~~

##### id选择器

id选择器：一个用来查找的ID，即元素的id属性
~~~
$( "#id" )
var obj = $('#imooc');
//id的唯一，只选择到了第一个匹配的id为imooc的div节点
obj.css("border", "3px solid red");
~~~
*原生语法的支持总是非常高效的，所以在操作DOM的获取上，如果能采用id的话尽然考虑用这个选择器*

##### 类选择器

jQuery使用JavaScript的原生getElementsByClassName()函数来实现的

~~~
$(".imooc")
//通过jQuery直接传入class
var obj = $('.imooc');
//class选择器可以选择多个元素
obj.css("border", "3px solid red");
~~~

##### 元素选择器

元素选择器：根据给定（html）标记名称选择所有的元素

~~~
$( "element" )
var p = $('p');
//标签是可以多个的，所以得到的同样也是一个合集
p.css("border", "3px solid red");
~~~

##### 全选择器（*选择器）

通配符*意味着给所有的元素设置默认的边距

~~~
var elements2 = $('*') ;
~~~

#### 层级选择器

![](http://img.mukewang.com/5590e98b0001f60d06130229.jpg)

#### 基本筛选选择器

使用方法类似伪类，元素在前，选择器在后

![](http://img.mukewang.com/57cd1df2000146de06020498.jpg)

~~~
$(".div:first")
$(".div:last")
$(".div:even")
$(".div:odd")
$(".aaron:eq(2)")
$(".aaron:gt(3)")
$(".aaron:lt(2)")
$("input:not(:checked) + p")
~~~

#### 内容筛选选择器

![](http://img.mukewang.com/57cd20bf0001a97f05290214.jpg)

1. :contains与:has都有查找的意思，但是contains查找包含“指定文本”的元素，has查找包含“指定元素”的元素
2. 如果:contains匹配的文本包含在元素的子元素中，同样认为是符合条件的。
3. :parent与:empty是相反的，两者所涉及的子元素，包括文本节点

~~~
//内容筛选
$(".div:contains(':contains')")
//标签筛选
$(".div:has(span)")
//**************************不明白什么意思************************
$("a:parent")
//匹配空节点
$("a:empty")
~~~

#### 可见性筛选选择器

jQuery选择器之可见性筛选选择器
元素有显示状态与隐藏状态，jQuery根据元素的状态扩展了可见性筛选选择器:visible与:hidden

![](http://img.mukewang.com/5590f6de0001e2b204460106.jpg)

~~~
//筛选显示的元素
$('#div1:visible')
//筛选出隐藏的元素
$('#div1:hidden')
~~~

隐藏元素的方式：

1. CSS display的值是none。
2. type="hidden"的表单元素。
3. 宽度和高度都显式设置为0。
4. 一个祖先元素是隐藏的，该元素是不会在页面上显示
5. CSS visibility的值是hidden
6. CSS opacity的指是0

*Tips:如果元素中占据文档中一定的空间,元素被认为是可见的。
可见元素的宽度或高度，是大于零。
元素的visibility: hidden 或 opacity: 0被认为是可见的，因为他们仍然占用空间布局。*

#### 属性筛选选择器

属性选择器让你可以基于属性来定位一个元素。可以只指定该元素的某个属性，这样所有使用该属性而不管它的值，这个元素都将被定位

![](http://img.mukewang.com/57d654200001c46507360560.jpg)

- [att=val]、[att]、[att|=val]、[att~=val]  属于CSS 2.1规范
- [ns|attr]、[att^=val]、[att*=val]、[att$=val] 属于CSS3规范
- [name!="value"]  属于jQuery 扩展的选择器

*Tips:CSS选择器无论CSS2.1版本还是CSS3版本，IE7和IE8都支持，webkit、Gecko核心及Opera也都支持，只有IE6以下浏览器才不支持*

*[attr="value"]能帮我们定位不同类型的元素，特别是表单form元素的操作*

~~~
//查找所有div中，属性name=p1的div元素
$('div[name=p1]')
////查找所有div中，有属性p2的div元素
$('div[p2]')
//查找所有div中，有属性name中的值只包含一个连字符“-”的div元素
$('div[name|="-"]')
//查找所有div中，有属性name中的值包含一个连字符“空”和“a”的div元素
$('div[name~="a"]')
//查找所有div中，属性name的值是用imooc开头的
$('div[name^=imooc]')
//查找所有div中，属性name的值是用imooc结尾的
$('div[name$=imooc]')
//查找所有div中，有属性name中的值包含一个test字符串的div元素
$('div[name*="test"]')
//查找所有div中，有属性testattr中的值没有包含"true"的div
$('div[testattr!="true"]')
~~~

#### 表单元素选择器

表单选择器的具体方法描述：

![](http://img.mukewang.com/5592040d0001f8eb04940441.jpg)

~~~

$(':input')
 //匹配所有input元素中类型为text的input元素
$('input:text')
//匹配所有input元素中类型为password的input元素
$('input:password')
//匹配所有input元素中的单选按钮,并选中
$('input:radio')
//匹配所有input元素中的复选按钮,并选中
$('input:checkbox')
?.attr('checked','true');
//匹配所有input元素中的提交的按钮,修改背景颜色
$('input:submit')
//匹配所有input元素中的图像类型的元素,修改背景颜色
$('input:image')
//匹配所有input元素中类型为按钮的元素
$('input:button')
//匹配所有input元素中类型为file的元素
$('input:file')
~~~


#### 子元素筛选选择器

子元素筛选选择器不常使用，其筛选规则比起其它的选择器稍微要复杂点

![](http://img.mukewang.com/559105da0001301105960331.jpg)


#### 表单对象属性选择器

表单筛选选择器的描述：

![](http://img.mukewang.com/55920c2f0001198b04940201.jpg)

- 选择器适用于复选框和单选框，对于下拉框元素, 使用 :selected 选择器
- 在某些浏览器中，选择器:checked可能会错误选取到<option>元素，所以保险起见换用选择器input:checked，确保只会选取input元素

~~~
//查找所有input所有可用的（未被禁用的元素）input元素。
var ins = $('input:enabled');
//查找所有input所有不可用的（被禁用的元素）input元素。
var ins = $('input:disabled');
//查找所有input所有勾选的元素(单选框,复选框)
//移除input的checked属性
var ches = $('input:checked');
ches.removeAttr('checked')
//查找所有option元素中,有selected属性被选中的选项
var ops = $('option:selected');
//移除option的selected属性
ops.removeAttr('selected')
~~~

#### 特殊选择器this

this是JavaScript中的关键字，指的是当前的上下文对象，简单的说就是方法/属性的所有者

**this，表示当前的上下文对象是一个html对象，可以调用html对象所拥有的属性和方法。
$(this),代表的上下文对象是一个jquery的上下文对象，可以调用jQuery的方法和属性值。**

~~~
//通过包装成jQuery对象改变颜色
var $this = $(this);
$this.css('color','blue');
~~~

#### 综合使用

~~~
//找到男装下第一类衣服中的第一个p元素，并改变颜色
//可以通过子类选择器  p:first-child 筛选出第一个p元素
var val = $('#menu_con .tag p:first-child');
val.css('color','#9932CC');

//定位至menu_con下的tag下的a，使用lt选择前四个元素，更改CSS样式
var one = $('#menu_con .tag a:lt("4")');
one.css('color','red');

//搭配使用属性选择器
var nodes = $('#menu_con a[name=setColor]');
nodes.css('color','blue');

//不分男女，选中第一类衣服中第9个a元素，并改变颜色
//这里用了nth-child 选择的他们所有父元素的第n个子元素
//使用nth-child,类似于分组查询，根据父元素分组进行选择，下标从1开始，第一个为空元素
var tag = $('.tag a:nth-child(10)');
tag.css('color','#66CD00');

//找到女装下第一类衣服，把a元素中包含文字"更多"的节点，改变颜色
var nodes = $('#menu_female a:contains("更多")');
nodes.css('color','#C71585');
~~~

#### 样式之.attr()与.removeAttr()

操作特性的DOM方法主要有3个，getAttribute方法、setAttribute方法和removeAttribute方法
jQuery中用一个attr()与removeAttr()就可以全部搞定了，包括兼容问题

> attr()有4个表达式

1. attr(传入属性名)：获取属性的值
2. attr(属性名, 属性值)：设置属性的值
3. attr(属性名,函数值)：设置属性的函数值
4. attr(attributes)：给指定元素设置多个属性值，即：{属性名一: “属性值一” , 属性名二: “属性值二” , … … }

> removeAttr()删除方法

removeAttr( attributeName ) : 为匹配的元素集合中的每个元素中移除一个属性（attribute）

<u style="color:red">DOM固有属性、页面固有元素，使用prop进行操作，自定义属性、动态元素，使用attr进行操作</u>

~~~
//找到第一个input，通过attr设置属性value的值
var inone = $('input:first');
inone.attr('value','.attr(color,red)')

//找到第二个input，通过attr获取属性value的值
var inone = $('input:eq(1)');
console.log(inone.attr('value'));

var node = $('input:eq(2)');
node.attr('value',function(i, val){
	return '通过function设置' + val+i;
});

//找到第四个input，通过使用removeAttr删除属性
var inf = $('input:eq(3)');
inf.removeAttr('value')
~~~

#### 属性与样式之html()及.text()

读取、修改元素的html结构或者元素的文本内容是常见的DOM操作，jQuery针对这样的处理提供了2个便捷的方法.html()与.text()

> .html()方法 

获取集合中第一个匹配元素的HTML内容 或 设置每一个匹配元素的html内容，具体有3种用法：

1. html() 不传入值，就是获取集合中第一个匹配元素的HTML内容
2. html( htmlString )  设置每一个匹配元素的html内容
3. html( function(index, oldhtml) ) 用来返回设置HTML内容的一个函数

*Tips:.html()方法内部使用的是DOM的innerHTML属性来处理的，所以在设置与获取上需要注意的一个最重要的问题，这个操作是针对整个HTML内容（不仅仅只是文本内容）*

> .text()方法

得到匹配元素集合中每个元素的文本内容结合，包括他们的后代，或设置匹配元素集合中每个元素的文本内容为指定的文本内容

1. text() 得到匹配元素集合中每个元素的合并文本，包括他们的后代
2. text( textString ) 用于设置匹配元素内容的文本
3. text( function(index, text) ) 用来返回设置文本内容的一个函数

*Tips:.text()结果返回一个字符串，包含所有匹配元素的合并文本*

#### 属性与样式之.val()

jQuery中有一个.val()方法主要是用于处理表单元素的值，比如 input, select 和 textarea

1. val()无参数，获取匹配的元素集合中第一个元素的当前值
2. val( value )，设置匹配的元素集合中每个元素的值
3. val( function ) ，一个用来返回设置值的函数

注意：

- 通过.val()处理select元素， 当没有选择项被选中，它返回null
- .val()方法多用来设置表单的字段的值
- 如果select元素有multiple（多选）属性，并且至少一个选择项被选中， .val()方法返回一个数组，这个数组包含每个选中选择项的值

#### 属性与样式之增加样式.addClass()

1. addClass( className ) : 为每个匹配元素所要增加的一个或多个样式名
2. addClass( function(index, currentClass) ) : 这个函数返回一个或更多用空格隔开的要增加的样式名

*Tips：.addClass()方法不会替换一个样式类名。它只是简单的添加一个样式类名到元素上*

~~~
$('.left div').addClass('newClass')

$("div").addClass(function(index,className) {
    //找到类名中包含了imooc的元素
    if(-1 !== className.indexOf('imooc')){
        //this指向匹配元素集合中的当前元素
        $(this).addClass('imoocClass')
    }
});
~~~

#### 属性与样式之删除样式.removeClass()

1. removeClass( [className ] )：每个匹配元素移除的一个或多个用空格隔开的样式名
2. removeClass( function(index, class) ) ： 一个函数，返回一个或多个将要被移除的样式名

*Tips：如果一个样式类名作为一个参数,只有这样式类会被从匹配的元素集合中删除 。 如果没有样式名作为参数，那么所有的样式类将被移除*

~~~
$('.right > div:first').removeClass(function(index,className){
    //className = aa bb imoocClass
    //把div的className赋给下一个兄弟元素div上作为它的class
    $(this).next().addClass(className)
    //删除自己本身的imoocClass
    return 'imoocClass'
})
~~~

#### 属性与样式之切换样式.toggleClass()[样式切换]

jQuery提供一个toggleClass方法用于简化这种互斥的逻辑，通过toggleClass方法动态添加删除Class，一次执行相当于addClass，再次执行相当于removeClass

1. toggleClass( className )：在匹配的元素集合中的每个元素上用来切换的一个或多个（用空格隔开）样式类名
2. toggleClass( className, switch )：一个布尔值，用于判断样式是否应该被添加或移除
3. toggleClass( [switch ] )：一个用来判断样式类添加还是移除的 布尔值
4. toggleClass( function(index, class, switch) [, switch ] )：用来返回在匹配的元素集合中的每个元素上用来切换的样式类名的一个函数。接收元素的索引位置和元素旧的样式类作为参数

**注意：**

1. toggleClass是一个互斥的逻辑，也就是通过判断对应的元素上是否存在指定的Class名，如果有就删除，如果没有就增加
2. toggleClass会保留原有的Class名后新增，通过空格隔开

~~~
//给所有的tr元素加一个class="c"的样式
$("#table tr").toggleClass("c");

//给所有的偶数tr元素切换class="c"的样式
$("#table tr:odd").toggleClass("c");

//第二个参数判断样式类是否应该被添加或删除
//true，那么这个样式类将被添加;
//false，那么这个样式类将被移除
//所有的奇数tr元素，应该都保留class="c"样式
$("#table tr:even").toggleClass("c", true);
~~~

#### 属性与样式之样式操作.css()

获取元素样式属性的计算值或者设置元素的CSS属性

> 获取

1. css( propertyName ) ：获取匹配元素集合中的第一个元素的样式属性的计算值
2. css( propertyNames )：传递一组数组，返回一个对象结果

> 设置

1. css(propertyName, value )：设置CSS
2. css( propertyName, function )：可以传入一个回调函数，返回取到对应的值进行处理
3. css( properties )：可以传一个对象，同时设置多个样式

~~~
$('.fourth').css("background-color","red");
$('.fifth').css("backgroundColor","yellow");

$('.fourth').css("font-size","15px")
$('.fifth').css('fontSize','0.2em');

$('.seventh').css({
    'font-size'        :"15px",
    "background-color" :"#40E0D0",
    "border"           :"1px solid red"
})
~~~

#### 样式优先级

~~~
外部样式 < 内部样式 < 内联样式
通过.css方法设置的样式属性优先级要高于.addClass方法
~~~

#### 属性与样式之元素的数据存储

html5 dataset是新的HTML5标准，允许你在普通的元素标签里嵌入类似data-*的属性，来实现一些简单数据的存取

数据存取接口：
~~~
jQuery.data( element, key, value )   //静态接口,存数据
jQuery.data( element, key )  //静态接口,取数据   
.data( key, value ) //实例接口,存数据
.data( key ) //实例接口,存数据
~~~

实例：
~~~
<script type="text/javascript">
    $('.left').click(function() {
        var ele = $(this);
        //通过$.data方式设置数据
        $.data(ele, "a", "data test")
        $.data(ele, "b", {
            name : "慕课网"
        })
        //通过$.data方式取出数据
        var reset = $.data(ele, "a") + "</br>" + $.data(ele, "b").name
        ele.find('span').append(reset)
    })
    </script>
    <script type="text/javascript">
    $('.right').click(function() {
        var ele = $(this);
        //通过.data方式设置数据
        ele.data("a", "data test")
        ele.data("b", {
            name: "慕课网"
        })
        //通过.data方式取出数据
        var reset = ele.data("a") + "</br>" + ele.data("b").name
        ele.find('span').append(reset)
    })
    </script>
~~~

