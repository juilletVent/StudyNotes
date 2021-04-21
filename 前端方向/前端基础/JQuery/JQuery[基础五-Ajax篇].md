<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ajax与JQuery插件](#ajax%E4%B8%8Ejquery%E6%8F%92%E4%BB%B6)
    - [使用load()方法异步请求数据](#%E4%BD%BF%E7%94%A8load%E6%96%B9%E6%B3%95%E5%BC%82%E6%AD%A5%E8%AF%B7%E6%B1%82%E6%95%B0%E6%8D%AE)
    - [使用getJSON()方法异步加载JSON格式数据](#%E4%BD%BF%E7%94%A8getjson%E6%96%B9%E6%B3%95%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BDjson%E6%A0%BC%E5%BC%8F%E6%95%B0%E6%8D%AE)
    - [使用getScript()方法异步加载并执行js文件](#%E4%BD%BF%E7%94%A8getscript%E6%96%B9%E6%B3%95%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E5%B9%B6%E6%89%A7%E8%A1%8Cjs%E6%96%87%E4%BB%B6)
    - [使用get()方法以GET方式从服务器获取数据](#%E4%BD%BF%E7%94%A8get%E6%96%B9%E6%B3%95%E4%BB%A5get%E6%96%B9%E5%BC%8F%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE)
    - [使用post()方法以POST方式从服务器发送数据](#%E4%BD%BF%E7%94%A8post%E6%96%B9%E6%B3%95%E4%BB%A5post%E6%96%B9%E5%BC%8F%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE)
    - [使用serialize()方法序列化表单元素值](#%E4%BD%BF%E7%94%A8serialize%E6%96%B9%E6%B3%95%E5%BA%8F%E5%88%97%E5%8C%96%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0%E5%80%BC)
    - [使用ajax()方法加载服务器数据](#%E4%BD%BF%E7%94%A8ajax%E6%96%B9%E6%B3%95%E5%8A%A0%E8%BD%BD%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%95%B0%E6%8D%AE)
    - [使用ajaxSetup()方法设置全局Ajax默认选项](#%E4%BD%BF%E7%94%A8ajaxsetup%E6%96%B9%E6%B3%95%E8%AE%BE%E7%BD%AE%E5%85%A8%E5%B1%80ajax%E9%BB%98%E8%AE%A4%E9%80%89%E9%A1%B9)
    - [使用ajaxStart()和ajaxStop()方法](#%E4%BD%BF%E7%94%A8ajaxstart%E5%92%8Cajaxstop%E6%96%B9%E6%B3%95)
    - [常用插件记录](#%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6%E8%AE%B0%E5%BD%95)
    - [自定义JQuery插件函数](#%E8%87%AA%E5%AE%9A%E4%B9%89jquery%E6%8F%92%E4%BB%B6%E5%87%BD%E6%95%B0)
    - [获取浏览器的名称与版本信息](#%E8%8E%B7%E5%8F%96%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%90%8D%E7%A7%B0%E4%B8%8E%E7%89%88%E6%9C%AC%E4%BF%A1%E6%81%AF)
    - [判断浏览器名称](#%E5%88%A4%E6%96%AD%E6%B5%8F%E8%A7%88%E5%99%A8%E5%90%8D%E7%A7%B0)
    - [检测对象是否为空](#%E6%A3%80%E6%B5%8B%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA)
    - [检测对象是否为原始对象](#%E6%A3%80%E6%B5%8B%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E4%B8%BA%E5%8E%9F%E5%A7%8B%E5%AF%B9%E8%B1%A1)
    - [检测两个节点的包含关系](#%E6%A3%80%E6%B5%8B%E4%B8%A4%E4%B8%AA%E8%8A%82%E7%82%B9%E7%9A%84%E5%8C%85%E5%90%AB%E5%85%B3%E7%B3%BB)
    - [URL操作函数](#url%E6%93%8D%E4%BD%9C%E5%87%BD%E6%95%B0)
    - [使用$.extend()扩展工具函数](#%E4%BD%BF%E7%94%A8extend%E6%89%A9%E5%B1%95%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0)
    - [使用$.extend()扩展Object对象](#%E4%BD%BF%E7%94%A8extend%E6%89%A9%E5%B1%95object%E5%AF%B9%E8%B1%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ajax与JQuery插件

#### 使用load()方法异步请求数据

使用load()方法通过Ajax请求加载服务器中的数据，并把返回的数据放置到指定的元素中，它的调用格式为：

	load(url,[data],[callback])

**1.8版本被废弃**

#### 使用getJSON()方法异步加载JSON格式数据

使用getJSON()方法可以通过Ajax异步请求的方式，获取服务器中的数据，并对获取的数据进行解析，显示在页面中，它的调用格式为：

~~~
jQuery.getJSON(url,[data],[callback])
或
$.getJSON(url,[data],[callback])

example:

$(function () {
    $("#btnShow").bind("click", function () {
        var $this = $(this);
        $.getJSON("http://www.imooc.com/data/sport.json",function(data){
            $this.attr("disabled", "true");
            $.each(data, function (index, sport) {
                //if(index==3)
                $("ul").append("<li>" + sport["name"] + "</li>");
            });
        });
    })
});
~~~

#### 使用getScript()方法异步加载并执行js文件

使用getScript()方法异步请求并执行服务器中的JavaScript格式的文件，它的调用格式如下所示：

~~~
jQuery.getScript(url,[callback])
或
$.getScript(url,[callback])

example:

$(function () {
    $("#btnShow").bind("click", function () {
        var $this = $(this);
        $.getScript("http://www.imooc.com/data/sport_f.js",function(){
            $this.attr("disabled", "true");
        });
    })
});
~~~

#### 使用get()方法以GET方式从服务器获取数据

调用格式如下：

	$.get(URL,data,function(data,status,xhr),dataType)

参数：

1. url地址
2. data 发送的携带参数[json格式]
3. 回调函数
	1. data - 包含来自请求的结果数据
	2. status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
	3. xhr - 包含 XMLHttpRequest 对象
4. dataType 返回的数据格式 	可选。规定预期的服务器响应的数据类型默认地，jQuery 会智能判断
	1. "xml" - 一个 XML 文档
	2. "html" - HTML 作为纯文本
	3. "text" - 纯文本字符串
	4. "script" - 以 JavaScript 运行响应，并以纯文本返回
	5. "json" - 以 JSON 运行响应，并以 JavaScript 对象返回
	6. "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调

~~~
$.get("http://www.imooc.com/data/info_f.php",function(data){
    $this.attr("disabled", "true");
    $("ul").append("<li>我的名字叫：" + data.name + "</li>");
    $("ul").append("<li>男朋友对我说：" + data.say + "</li>");
}, "json");
~~~

#### 使用post()方法以POST方式从服务器发送数据

调用格式，参数与GET一致

~~~
$.post(
	'http://www.imooc.com/data/check.php',
	{txtNumber:val}
	,function (data) {
	    $("ul").append("<li>你输入的<b>  "
	    + $("#txtNumber").val() + " </b>是<b> "
	    + data + " </b></li>");
	 }
);
~~~

#### 使用serialize()方法序列化表单元素值

使用serialize()方法可以将表单中有name属性的元素值进行序列化，生成标准URL编码文本字符串，直接可用于ajax请求，它的调用格式如下：

	$(selector).serialize()

其中selector参数是一个或多个表单中的元素或表单元素本身

~~~
$("#btnAction").bind("click", function () {
    $('#divtest').after(
    $('form').serialize());
})
~~~

#### 使用ajax()方法加载服务器数据

调用详细较为复杂，具体地址：

<a href="http://www.w3school.com.cn/jquery/ajax_ajax.asp" target="_blank">Ajax</a>

~~~
$.ajax({
    url:
    "http://www.imooc.com/data/check.php",
    data: { num: $("#txtNumber").val() },
    type:"post",
    success: function (data) {
        $("ul").append("<li>你输入的<b>  "
        + $("#txtNumber").val() + " </b>是<b> "
        + data + " </b></li>");
    }
 });
~~~

#### 使用ajaxSetup()方法设置全局Ajax默认选项

使用ajaxSetup()方法可以设置Ajax请求的一些全局性选项值，设置完成后，后面的Ajax请求将不需要再添加这些选项值，它的调用格式为：

	jQuery.ajaxSetup([options])或$.ajaxSetup([options])

~~~
$.ajaxSetup({
    dataType:"text",
    type:"post",
    success:function(data){
        $("ul").append("<li>你输入的<b>  "
            + $("#txtNumber").val() + " </b>是<b> "
            + data + " </b></li>");
    }
});
~~~

#### 使用ajaxStart()和ajaxStop()方法

ajaxStart()和ajaxStop()方法是绑定Ajax事件。ajaxStart()方法用于在Ajax请求发出前触发函数，ajaxStop()方法用于在Ajax请求完成后触发函数。它们的调用格式为：

	$(selector).ajaxStart(function())和$(selector).ajaxStop(function())

其中，两个方法中括号都是绑定的函数，当发送Ajax请求前执行ajaxStart()方法绑定的函数，请求成功后，执行ajaxStop ()方法绑定的函数。

~~~
$(document).ajaxStart(function() {
    var load = $('#divload');
    load.html("正在请求数据...");
});

$(document).ajaxStop(function() {
    var load = $('#divload');
    load.stop(false,true);
    load.fadeTo(500,0,function(){
        load.html("加载完成");
        load.fadeTo(500,1);
    });
});
~~~

**Tips：两个函数均需要绑定至document上，否则无效**

#### 常用插件记录

1. jqzoom图片放大插件[淘宝展示图片样式]
2. validate表单验证插件
3. lightBox图片灯箱插件
4. cookie插件
5. autocomplete输入搜索插件
6. contextmenu右键菜单插件
7. draggable拖曳插件
8. droppable放置插件
9. sortable拖曳排序插件
10. accordion面板折叠插件
11. tabs选项卡插件
12. dialog对话框插件
13. menu菜单工具插件
14. spinner微调按钮插件
15. tooltip工具提示插件

#### 自定义JQuery插件函数

~~~
/*------------------------------------------------------------/
功能：计算二个数字相加或相减的结果
参数：数字p1,p2
返回：两数相加后的结果
示例：$.AddNum(1,2);
/------------------------------------------------------------*/
; (function($) {
    $.extend({
        "addNum": function(p1, p2) {
            //如果传入的数字不为空，使用传入的数字，否则为0
            p1 = (p1 == undefined) ? 0 : p1;
            p2 = (p2 == undefined) ? 0 : p2;
            var intResult = parseInt(p1) + parseInt(p2);
            return intResult;
        },
        "subNum": function(p1, p2) {
            //如果传入的数字不为空，使用传入的数字，否则为0
            var intResult = 0;
            p1 = (p1 == undefined) ? 0 : p1;
            p2 = (p2 == undefined) ? 0 : p2;
            if (p1 > p2) { //如果传入的参数前者大于后者
                intResult = parseInt(p1) - parseInt(p2);
            }
            return intResult;
        }
    });
})(jQuery);

复写方式：
	jquery.fn.extend({funcName:function});
	jquery.extend({funcName:function});
	$.fn.extend({funcName:function});
~~~

#### 获取浏览器的名称与版本信息

在jQuery中，通过$.browser对象可以获取浏览器的名称和版本信息，如$.browser.chrome为true，表示当前为Chrome浏览器，$.browser.mozilla为true，表示当前为火狐浏览器，还可以通过$.browser.version方式获取浏览器版本信息

~~~
$(function () {
    var strTmp = "您的浏览器名称是：";
    if ($.browser.chrome) { //谷歌浏览器
        strTmp += "Chrome";
    }
    if ($.browser.mozilla) { //火狐相关浏览器
        strTmp += "Mozilla FireFox";
    }
    strTmp += "<br /><br /> 版本号是：" //获取版本号
           +$.browser.version;
    $(".content").html(strTmp);
});
~~~

**jQuery 从 1.9 版开始，移除了 $.browser 和 $.browser.version ， 取而代之的是 $.support 方法**

#### 判断浏览器名称
~~~
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
~~~

#### 检测对象是否为空

	$.isEmptyObject(obj)

#### 检测对象是否为原始对象

调用名为$.isPlainObject的工具函数，能检测对象是否为通过{}或new Object()关键字创建的原始对象，如果是，返回true，否则，返回false值，调用格式为：

	$.isPlainObject (obj);

#### 检测两个节点的包含关系

	$.contains (container, contained);

参数：

- 容器
- 元素

#### URL操作函数

调用名为$. param的工具函数，能使对象或数组按照key/value格式进行序列化编码，该编码后的值常用于向服务端发送URL请求，调用格式为：

	$. param (obj);

~~~
var objInfo = new Object();
objInfo.name = "jack";
objInfo.sex = 1;
//序列化对象
var objNewInfo =$.param(objInfo);
//序列化之后 ajax可直接发送
~~~

#### 使用$.extend()扩展工具函数

调用名为$. extend的工具函数，可以对原有的工具函数进行扩展，自定义类级别的jQuery插件，调用格式为：

	$. extend ({options});

example：

~~~
;(function ($) {
    $.extend({
        "MinNum": function (p1, p2) {
            return (p1 > p2) ? p2 : p1;
        }
    });
})(jQuery);
$(function () {
    $("#btnShow").bind("click", function () {
        $(".tip").html("");
        var strTmp = "17与18中最小的数是：";
        strTmp += $.MinNum(17, 18);
        //显示在页面中
        $(".tip").show().append(strTmp);
    });
});
~~~

#### 使用$.extend()扩展Object对象

除使用$.extend扩展工具函数外，还可以扩展原有的Object对象，在扩展对象时，两个对象将进行合并，当存在相同属性名时，后者将覆盖前者，调用格式为：

	$. extend (obj1,obj2,…objN);

~~~
$(function () {
    var objInfo = { name: "" };
    var objMess = { name: "白富美,", title: "欢迎与我联系！" };
    var objNewInfo =$.extend(objInfo,objMess);
    var strTmp = "<b>对象 白富美 合并后</b>：<br/><br/>";
    strTmp += objNewInfo.name + objInfo.title;
    //显示在页面中
    $(".tip").show().append(strTmp);
});
~~~

