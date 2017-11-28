## JQuery 基础

#### jQuery鼠标事件之click与dbclick事件

- 方法一：$ele.click()
- 方法二：$ele.click( handler(eventObject) )
- 方法三：$ele.click( [eventData ], handler(eventObject))

**PS：双击事件，与单击事件设置在同一个元素上是不可取的，会引发混乱**

#### jQuery鼠标事件之mousedown与mouseup事件

- 方法一：$ele.mousedown()
- 方法二：$ele.mousedown( handler(eventObject) )
- 方法三：$ele.mousedown( [eventData ], handler(eventObject))

- 方法一：$ele.mouseup()
- 方法二：$ele.mouseup( handler(eventObject) )
- 方法三：$ele.mouseup( [eventData ], handler(eventObject))

*PS：eventData作为触发函数的参数传入*

*Tips：用event 对象的which区别按键，敲击鼠标左键which的值是1，敲击鼠标中键which的值是2，敲击鼠标右键which的值是3*

#### jQuery鼠标事件之mousemove事件

事件类型：MouseEvent

位置定位：pageX、pageY

**PS：定义方式同上**

#### jQuery鼠标事件之mouseover与mouseout事件

jQuery当中同样提供了这样的事件来监听用户的移入移出操作，mouseover()与mouseout()事件，两者用法类似

**PS：定义方式同上**

#### jQuery鼠标事件之mouseenter与mouseleave事件

- 嵌套使用鼠标上移事件时，使用mouseenter定义事件，内层元素不能触发外层元素的事件，如果使用mouseover定义鼠标事件，内层元素的回调会寻找父元素的回调一并调用，造成混乱
- 普通使用时，两种事件没有区别

- 当鼠标指针离开元素时，会发生 mouseleave 事件，与mouseout事件的区别同上

#### jQuery鼠标事件之hover事件

~~~
$("p").hover(
//上移事件
    function() {
        $(this).css("background", 'red');
    },
//移除事件
    function() {
        $(this).css("background", '#bbffaa');
    }
);
~~~

#### jQuery鼠标事件之focusin事件
	
~~~
$("input:first").focusin(function() {
     $(this).css('border','2px solid red')
})

//不同函数传递数据
function fn(e) {
     $(this).val(e.data)
}
$("input:last").focusin('慕课网', fn)
~~~

#### jQuery鼠标事件之focusout事件

失去焦点事件

#### jQuery表单事件之blur与focus事件

同样用于焦点事件设置，这两个事件不支持冒泡事件处理，外层容器无法被触发，focusin/focusout可冒泡捕获内层事件，不需要外层捕获事件时使用使用这两个事件

#### jQuery表单事件之change事件

&lt;input&gt;元素，&lt;textarea&gt;和&lt;select&gt;元素的值都是可以发生改变的，开发者可以通过change事件去监听这些改变的动作

> input元素

~~~
监听value值的变化，当有改变时，失去焦点后触发change事件。
对于单选按钮和复选框，当用户用鼠标做出选择时，该事件立即触发。
~~~

> select 元素

~~~
对于下拉选择框，当用户用鼠标作出选择时，该事件立即触发
~~~

> textarea 元素

~~~
多行文本输入框，当有改变时，失去焦点后触发change事件
~~~

**Tips:以上事件均在失去焦点后触发**

#### jQuery表单事件之select事件

当 textarea 或文本类型的 input 元素中的文本被选择时，会发生 select 事件。
这个函数会调用执行绑定到select事件的所有函数，包括浏览器的默认行为。可以通过在某个绑定的函数中返回false来防止触发浏览器的默认行为

**select事件只能用于&lt;input&gt;元素与&lt;textarea&gt;元素**

#### jQuery表单事件之submit事件

具体能触发submit事件的行为：

- &lt;input type=submit"&gt;
- &lt;input type="image"&gt;
- &lt;button type="submit"&gt;
- 当某些表单元素获取焦点时，敲击Enter（回车键）

~~~
form元素是有默认提交表单的行为，如果通过submit处理的话，需要禁止浏览器的这个默认行为
传统的方式是调用事件对象  e.preventDefault() 来处理， jQuery中可以直接在函数中最后结尾return false即可

$("#target").submit(function(data) { 
   return false; //阻止默认行为，提交表单
});
~~~

#### jQuery键盘事件之keydown()与keyup()事件与keypress事件

理论上它可以绑定到任何元素，但keydown/keyup事件只是发送到具有焦点的元素上，不同的浏览器中，可获得焦点的元素略有不同，但是表单元素总是能获取焦点，所以对于此事件类型表单元素是最合适的。

~~~
//直接绑定事件
$elem.keydown( handler(eventObject) )
//传递参数
$elem.keydown( [eventData ], handler(eventObject) )
//手动触发已绑定的事件
$elem.keydown()
~~~

**Tips：做表单验证时，动态提示非常有用，input表单元素的值在keydown结束后改表，需要获取最新的值时绑定keyup函数**

*keypress事件与keydown和keyup的主要区别：
只能捕获单个字符，不能捕获组合键
无法响应系统功能键（如delete，backspace）
不区分小键盘和主键盘的数字字符*

#### on()的多事件绑定

基本用法：.on( events [,selecter]  [, data ] , handler(eventObject)   )

- 多个事件绑定同一个函数：
	
	 	$("#elem").on("mouseover mouseout",function(){ });

	通过空格分离，传递不同的事件名，可以同时绑定多个事件

- 多个事件绑定不同函数

		$("#elem").on({
		    mouseover:function(){},  
		    mouseout:function(){}
		});

	通过空格分离，传递不同的事件名，可以同时绑定多个事件，每一个事件执行自己的回调方法

- 将数据传递至函数

		function greet( event ) {
		  alert( "Hello " + event.data.name ); //Hello 慕课网
		}
		$( "button" ).on( "click", {
		  name: "慕课网"
		}, greet );

	可以通过第二参数（对象），当一个事件被触发时，要传递给事件处理函数的


使用：
~~~
//事件绑定一
$("#test1").on('click', function(e) {
    $(this).text('触发事件：' + e.type)
})

//多事件分别绑定
$("#test3").on({
    mousedown: function(e) {
        $(this).text('触发事件：' + e.type)
    },
    mouseup: function(e) {
        $(this).text('触发事件：' + e.type)
    }
})

//多事件同时绑定
$("#test2").on('mousedown mouseup', function(e) {
    $(this).text('触发事件：' + e.type)
})
~~~

#### on()的高级用法

~~~
<div class="left">
    <p class="aaron">
        <a>目标节点</a> //点击在这个元素上
    </p>
</div>

$("div").on("click","p",fn)
~~~

<span style="color:red;">事件绑定在最上层div元素上，当用户触发在a元素上，事件将往上冒泡，一直会冒泡在div元素上。如果提供了第二参数，那么事件在往上冒泡的过程中遇到了选择器匹配的元素，将会触发事件回调函数</span>

#### 卸载事件off()方法

根据on绑定事件的一些特性，off方法也可以通过相应的传递组合的事件名，名字空间，选择器或处理函数来移除绑定在元素上指定的事件处理函数。当有多个过滤参数时，只有与这些参数完全匹配的事件处理函数才会被移除

> 删除指定事件

	$("elem").off("mousedown")
	$("elem").off("mousedown mouseup")

> 删除全部事件

	$("elem").off()


#### jQuery事件对象的作用

事件对象是用来记录一些事件发生时的相关信息的对象。事件对象只有事件发生时才会产生，并且只能是事件处理函数内部访问，在所有事件处理函数运行结束后，事件对象就被销毁

> event.target

简单来说：event.target代表当前触发事件的元素，可以通过当前元素对象的一系列属性来判断是不是我们想要的元素

#### jQuery事件对象的属性和方法

- event.type：获取事件的类型
- event.pageX 和 event.pageY：获取鼠标当前相对于页面的坐标
- event.preventDefault() 方法：阻止默认行为
		
		我们可以用 event.isDefaultPrevented() 来确定这个方法是否(在那个事件对象上)被调用过了
- event.stopPropagation() 方法：阻止事件冒泡
		
		事件是可以冒泡的，为防止事件冒泡到DOM树上，也就是不触发的任何前辈元素上的事件处理函数

- event.which：获取在鼠标单击时，单击的是鼠标的哪个键

		左键报告1，中间键报告2，右键报告3

- event.currentTarget : 在事件冒泡过程中的当前DOM元素

		冒泡前的当前触发事件的DOM对象, 等同于this.

- this和event.target的区别：

		js中事件是会冒泡的，所以this是可以变化的，但event.target不会变化，它永远是直接接受事件的目标DOM元素；

- .this和event.target都是dom对象

		如果要使用jquey中的方法可以将他们转换为jquery对象

~~~
//为 <span> 元素绑定 click 事件  
$("span").click(function() {
    $("#msg").html($("#msg").html() + "<p>内层span元素被单击</p>");
});
//为 Id 为 content 的 <div> 元素绑定 click 事件  
$("#content").click(function(event) {
    $("#msg").html($("#msg").html() + "<p>外层div元素被单击</p>");
    event.stopPropagation(); //阻止事件冒泡  
});
//为 <body> 元素绑定 click 事件  
$("body").click(function() {
    $("#msg").html($("#msg").html() + "<p>body元素被单击</p>");
});
~~~

**Tips:DOM事件传递，由内到外，子元素按层级向上传递，类似于有序广播，如果不希望祖先级元素收到事件，可调用event.stopPropagation()阻止事件继续向上传递，或者返回FALSE**

#### jQuery自定义事件之trigger事件

简单来讲就是：根据绑定到匹配元素的给定的事件类型执行所有的处理程序和行为

trigger除了能够触发浏览器事件，同时还支持自定义事件，并且自定义时间还支持传递参数

~~~
$('#elem').on('Aaron', function(event,arg1,arg2) {
    alert("自触自定义时间")
 });
$('#elem').trigger('Aaron',['参数1','参数2'])
~~~