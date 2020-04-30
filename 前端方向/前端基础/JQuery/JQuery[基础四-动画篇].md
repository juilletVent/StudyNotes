## JQuery 动画篇

#### jQuery中隐藏元素的hide方法

$elem.hide()隐藏操作

提供参数：

~~~	
$elem.hide("fast / slow") 200ms/600ms

$("button:last").click(function() {
	$("#a2").hide({
	    duration: 500,
	    complete: function() {
	        alert('执行动画完毕')
	    }
	})
});
~~~

#### jQuery中显示元素的show方法

	$('elem').hide(3000).show(3000)

#### jQuery中显示与隐藏切换toggle方法

提供参数：.toggle( [duration ] [, complete ] )

~~~
$("button:last").click(function() {
    $(".left").toggle(500)
    setTimeout(function(){
      $(".right").toggle(500)
    },300);
});
~~~

#### jQuery中下拉动画slideDown

.slideDown()：用滑动动画显示一个匹配元素

.slideDown()方法将给匹配元素的高度的动画，这会导致页面的下面部分滑下去，弥补了显示的方式

~~~
.slideDown( [duration ] [, complete ] )
$("button:last").click(function() {
    $("#a1").slideDown(500);
    setTimeout(function(){
      $("#a2").slideDown(500,function(){
        //alert('动画执行结束')
      });
    },300);
});
~~~

#### jQuery中上卷动画slideUp

~~~
var isOpen = false;
$("button:last").click(function() {
    if(isOpen){
      $("#a1").slideUp(500);
        setTimeout(function(){
          $("#a2").slideUp(500,function(){
          //alert('动画执行结束')
        });
      },300);
    }else{
      $("#a1").slideDown(500);
        setTimeout(function(){
          $("#a2").slideDown(500,function(){
          //alert('动画执行结束')
        });
      },300);
    }
  isOpen = !isOpen;            
});
~~~

#### jQuery中上卷下拉切换slideToggle

提供参数：.slideToggle( [duration ] ,[ complete ] )

~~~
slideToggle("fast") 200ms
slideToggle("slow") 600ms
~~~


#### jQuery中淡出动画fadeOut & jQuery中淡入动画fadeIn & jQuery中淡入淡出切换fadeToggle

~~~
.fadeOut( [duration ], [ complete ] )
.fadeIn( [duration ], [ complete ] )
.fadeToggle( [duration ] ,[ complete ] )
~~~

#### jQuery中淡入效果fadeTo

事件、透明度、回调函数

	.fadeTo( duration, opacity ,callback)

**Tips：仅仅修改透明度，不对元素的display属性进行修改，不影响布局**


#### jQuery中动画animate(上)

**PS:要特别注意所有用于动画的属性必须是数字的**

语法：
~~~
.animate( properties ,[ duration ], [ easing ], [ complete ] )
参数：属性集合，时长，插值器，完成回调
	 opacity:0 或者 json格式的属性集合 
	{
    left: 50, 
    width: '50px'   
    opacity: 'show',  
    fontSize: "10em",
	}

	特别注意单位，属性值的单位像素（px）,除非另有说明。单位em 和 %需要指定使用
~~~

除了定义数值，每个属性能使用'show', 'hide', 和 'toggle'。这些快捷方式允许定制隐藏和显示动画用来控制元素的显示或隐藏

~~~
.animate({
    width: "toggle"
});
~~~

如果提供一个以+= 或 -=开始的值，那么目标值就是以这个属性的当前值加上或者减去给定的数字来计算的

~~~
.animate({ 
    left: '+=50px'
}, "slow");
~~~

duration时间

easing动画运动的算法[插值器/插补器]

~~~
jQuery库中默认调用 swing。如果需要其他的动画算法，引入Easing插补器插件
调用样例：
$(function() {
	$('.container').animate({
		backgroundPositionY:0,
	},2000,'easeInOutBack');
});

//返回页头
$('html').animate({scrollTop:0});
~~~

complete回调函数

example：
~~~
var v = $("#animation").val();
var $aaron = $("#aaron");
if (v == "1") {
    // 数值的单位默认是px
    $aaron.animate({
        width  :300,
        height :300
    });
} else if (v == "2") {
    // 在现有高度的基础上增加100px
    $aaron.animate({
         width  : "+=100px",
         height : "+=100px"
    });
} else if (v == "3") {
    $aaron.animate({
        fontSize: "5em"
    }, 2000, function() {
        alert("动画 fontSize执行完毕!");
    });
} else if (v == "4") {
    //通过toggle参数切换高度
    $aaron.animate({
        width: "toggle"
    });
} 
~~~

#### jQuery中动画animate(下)

animate在执行动画中，如果需要观察动画的一些执行情况，或者在动画进行中的某一时刻进行一些其他处理，我们可以通过animate提供的第二种设置语法，传递一个对象参数，可以拿到动画执行状态一些通知

语法：

	.animate( properties, options )

参数：

- prop：属性集json
- options:anim选项json集合

~~~
duration - 设置动画执行的时间
easing - 规定要使用的 easing 函数，过渡使用哪种缓动函数
step：规定每个动画的每一步完成之后要执行的函数
progress：每一次动画调用的时候会执行这个回调，就是一个进度的概念
complete：动画完成回调
~~~

example：

~~~
$('#elem').animate({
		width: 'toggle',  
		height: 'toggle'
	}, {
		duration: 5000,
		specialEasing: {
			width: 'linear',
			height: 'easeOutBounce'
		}，
		complete: function() {
				$(this).after('<div>Animation complete.</div>');
		}
	}
);
~~~

#### 有关动画的相关方法

1. $("#div").stop();//停止当前动画，继续下一个动画 
2. $("#div").stop(true);//清除元素的所有动画 
3. $("#div").stop(false, true);//让当前动画直接到达末状态 ，继续下一个动画
4. $("#div").stop(true, true);//清除元素的所有动画，让当前动画直接到达末状态

#### 动画总结

1. JQ建立在JS基础上，故JQ也同属单线程
2. 动画执行的顺序基于动画队列，所有的动画创建与执行均是异步的，你可以在短时间内创建非常多的动画对象，但是执行时按照创建的对了顺序进行的，且异步执行
3. **JQ 动画方法不支持 transform复合属性，以及非数值CSS属性，但是可以使用anim方法让场景下某个无意义的数值属性做动画，然后使用setp 钩子函数去动态设置不支持的动画的CSS属性即可实现不支持动画的属性支持动画**栗子：
	
		$(imgs[0]).animate({
	        textIndent: 180
	    }, {
	        step: function(now) {
	            $(this).css('transform', 'rotateZ(' + (-180 + now) + 'deg)');
	        },
	        easing: "linear",
	        duration: 2000,
	        done:function(){
	            $(imgs[0]).css('textIndent',0);
	        }
	    });


### JQuery 核心方法

#### jQuery中each方法的应用

语法：

	jQuery.each(array, callback )
	jQuery.each( object, callback )

第一个参数传递的就是一个对象或者数组，第二个是回调函数

~~~
$.each(["Aaron", "慕课网"], function(index, value) {
   //index是索引,也就是数组的索引
   //value就是数组中的值了
});
~~~

停止迭代：

~~~
$.each(["Aaron", "慕课网"], function(index, value) {
    return false; //停止迭代
});
~~~

完整实例：

~~~
if (v == "1") {
    // 遍历数组元素
    $.each(['Aaron', '慕课网'], function(i, item) {
        $aaron.append("索引=" + i + "; 元素=" + item);
    });
} else if (v == "2") {
    // 遍历对象属性
    $.each({
        name: "张三",
        age: 18
    }, function(property, value) {
        $aaron.append("属性名=" + property + "; 属性值=" + value);
    });
}
~~~

#### jQuery中查找数组中的索引inArray

用法非常简单，传递一个检测的目标值，然后传递原始的数组，可以通过fromIndex规定查找的起始值，默认数组是0开始

~~~
jQuery.inArray( value, array ,[ fromIndex ] )
$.inArray(5,[1,2,3,4,5,6,7]) //返回对应的索引：4
~~~

**Tips：如果要判断数组中是否存在指定值，你需要通过该函数的返回值不等于(或大于)-1来进行判断**

#### jQuery中去空格神器trim方法

jQuery.trim()函数用于去除字符串两端的空白字符

- 移除字符串开始和结尾处的所有换行符，空格(包括连续的空格)和制表符（tab）
- 如果这些空白字符在字符串中间时，它们将被保留，不会被移除

~~~
var str = $.trim($("#results2").val()).length;
~~~

#### jQuery中DOM元素的获取get方法

jQuery是一个合集对象，如果需要单独操作合集中的的某一个元素，可以通过.get()方法获取到

注意：

- get方法是获取的dom对象，也就是通过document.getElementById获取的对象
- get方法是从0开始索引

负索引值参数：

- get方法还可以从后往前索引，传递一个负索引值，注意的负值的索引起始值是-1

~~~
$(a).get(-2) 
~~~

#### jQuery中DOM元素的获取index方法

语法：参数接受一个jQuery或者dom对象作为查找的条件
~~~
.index()
.index( selector )
.index( element )
~~~

- 如果不传递任何参数给 .index() 方法，则返回值就是jQuery对象中第一个元素相对于它同辈元素的位置
- 如果在一组元素上调用 .index() ，并且参数是一个DOM元素或jQuery对象， .index() 返回值就是传入的元素相对于原先集合的位置
- 如果参数是一个选择器， .index() 返回值就是原先元素相对于选择器匹配元素的位置。如果找不到匹配的元素，则 .index() 返回 -1