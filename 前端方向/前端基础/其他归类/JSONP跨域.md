# 跨域请求

#### 同源策略限制

>同源策略阻止从一个域上加载的脚本获取或操作另一个域上的文档属性。也就是说，受到请求的 URL 的域必须与当前 Web 页面的域相同。这意味着浏览器隔离来自不同源的内容，以防止它们之间的操作。这个浏览器策略很旧，从 Netscape Navigator 2.0 版本开始就存在

#### 如何使用JSONP

HTML:

手写JSONP调用[动态]
~~~
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />  
<script type="text/javascript">  
    function jsonpCallback(result) {  
        //alert(result);  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    }  
    var JSONP=document.createElement("script");  
    JSONP.type="text/javascript";  
    JSONP.src="http://crossdomain.com/services.php?callback=jsonpCallback";  
    document.getElementsByTagName("head")[0].appendChild(JSONP);  
</script>  
~~~

或者

手写JSONP调用[静态]

~~~
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />  
<script type="text/javascript">  
    function jsonpCallback(result) {  
        alert(result.a);  
        alert(result.b);  
        alert(result.c);  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    }  
</script>  
<script type="text/javascript" src="http://crossdomain.com/services.php?callback=jsonpCallback"></script>  
~~~

服务端PHP代码

~~~
<?php  
  
//服务端返回JSON数据  
$arr=array('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);  
$result=json_encode($arr);  
//echo $_GET['callback'].'("Hello,World!")';  
//echo $_GET['callback']."($result)";  
//动态执行回调函数  
$callback=$_GET['callback'];  
echo $callback."($result)"; 
?>
~~~

这种方式必须携带callback=?

Jquery 实现：
~~~
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.getJSON("http://crossdomain.com/services.php?callback=?",  
    function(result) {  
        for(var i in result) {  
            alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
        }  
    });  
</script>  
~~~

或者

这种方式地址可以不用书写callback
~~~
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.ajax({  
        url:"http://crossdomain.com/services.php",  
        dataType:'jsonp',  
        data:'',  
        jsonp:'callback',  
        success:function(result) {  
            for(var i in result) {  
                alert(i+":"+result[i]);//循环输出a:1,b:2,etc.  
            }  
        },  
        timeout:3000  
    });  
</script>  
~~~

或者

这种方式必须携带callback=?
~~~
<script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
    $.get('http://crossdomain.com/services.php?callback=?', {name: encodeURIComponent('tester')}, function (json) { for(var i in json) alert(i+":"+json[i]); }, 'jsonp');  
</script>  
~~~

#### Jsonp原理

此时，服务器先生成 json 数据。
然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp.

最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）

**Tips：**我的理解就是，利用Script标签不受同源限制策略的特性，服务端根据URL请求取得客户端已经注册好的回调函数名，以及其其他参数，查询数据，并使用callback(data)的形式组拼返回的数据，客户端取得返回的数据后，以js形式解析、执行，即回调了预先定义的回调函数，即可实现跨域请求。

**注意：**JQuery的JSONP调用，**callback关键字不能改变**，也就是说，如果服务端的实现不同的话这个方法将不能使用，不管使用$.getJSON还是直接使用底层$.ajax均是这样，JQuery会生成一个固定前缀的随机函数名，发送至服务端进行请求，如果服务端使用的回调获取名称不是callback，就只能自己手写JSONP实现跨域了