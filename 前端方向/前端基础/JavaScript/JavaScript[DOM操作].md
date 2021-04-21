<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [DOM对象](#dom%E5%AF%B9%E8%B1%A1)
      - [选取元素](#%E9%80%89%E5%8F%96%E5%85%83%E7%B4%A0)
      - [选取表单元素值](#%E9%80%89%E5%8F%96%E8%A1%A8%E5%8D%95%E5%85%83%E7%B4%A0%E5%80%BC)
      - [获取标签属性值](#%E8%8E%B7%E5%8F%96%E6%A0%87%E7%AD%BE%E5%B1%9E%E6%80%A7%E5%80%BC)
      - [节点属性](#%E8%8A%82%E7%82%B9%E5%B1%9E%E6%80%A7)
      - [访问子节点childNodes[属性]](#%E8%AE%BF%E9%97%AE%E5%AD%90%E8%8A%82%E7%82%B9childnodes%E5%B1%9E%E6%80%A7)
      - [访问父节点[属性]](#%E8%AE%BF%E9%97%AE%E7%88%B6%E8%8A%82%E7%82%B9%E5%B1%9E%E6%80%A7)
      - [访问兄弟节点[属性]](#%E8%AE%BF%E9%97%AE%E5%85%84%E5%BC%9F%E8%8A%82%E7%82%B9%E5%B1%9E%E6%80%A7)
      - [插入节点appendChild()](#%E6%8F%92%E5%85%A5%E8%8A%82%E7%82%B9appendchild)
      - [插入节点insertBefore()](#%E6%8F%92%E5%85%A5%E8%8A%82%E7%82%B9insertbefore)
      - [删除节点removeChild()](#%E5%88%A0%E9%99%A4%E8%8A%82%E7%82%B9removechild)
      - [替换元素节点replaceChild()](#%E6%9B%BF%E6%8D%A2%E5%85%83%E7%B4%A0%E8%8A%82%E7%82%B9replacechild)
      - [创建元素节点createElement](#%E5%88%9B%E5%BB%BA%E5%85%83%E7%B4%A0%E8%8A%82%E7%82%B9createelement)
      - [创建文本节点createTextNode](#%E5%88%9B%E5%BB%BA%E6%96%87%E6%9C%AC%E8%8A%82%E7%82%B9createtextnode)
      - [浏览器窗口可视区域大小](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AA%97%E5%8F%A3%E5%8F%AF%E8%A7%86%E5%8C%BA%E5%9F%9F%E5%A4%A7%E5%B0%8F)
      - [网页尺寸scrollHeight](#%E7%BD%91%E9%A1%B5%E5%B0%BA%E5%AF%B8scrollheight)
      - [网页尺寸offsetHeight](#%E7%BD%91%E9%A1%B5%E5%B0%BA%E5%AF%B8offsetheight)
      - [网页卷去的距离与偏移量](#%E7%BD%91%E9%A1%B5%E5%8D%B7%E5%8E%BB%E7%9A%84%E8%B7%9D%E7%A6%BB%E4%B8%8E%E5%81%8F%E7%A7%BB%E9%87%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## DOM对象

文档对象模型DOM（Document Object Model）定义访问和处理HTML文档的标准方法。DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）。

节点属性：![](http://img.imooc.com/5375c953000117ee05240129.jpg)

遍历节点树：![](http://img.imooc.com/53f17a6400017d2905230219.jpg)

DOM操作：![](http://img.imooc.com/538d29da000152db05360278.jpg)

按名称选取，name可能重复，所以选取出来是数组：
~~~
//通过标签name属性，选取元素
document.getElementsByName('myt');
//通过标签名选取元素[p,span,a,h1等]
document.getElementsByTagName(Tagname)；
~~~

##### 选取元素
~~~
function getValue()
{
  var myH = document.getElementById('myHead');
  alert(myH.innerHTML)
}
function getElements()
{
  var myS = document.getElementsByName('sex');
  alert(myS.length);
}

function getTagElements()
{
  var myI = document.getElementsByTagName('input');
  alert(myI.length);
}
~~~

##### 选取表单元素值

~~~
var val = inputObj.value;
~~~

##### 获取标签属性值

~~~
var text = domObj.getAttribute('title');
domObj.setAttribute('name','value');
~~~

##### 节点属性
在文档对象模型 (DOM) 中，每个节点都是一个对象

- nodeName 	： 	节点的名称
	1. 元素节点的 nodeName 与标签名相同
	2. 属性节点的 nodeName 是属性的名称
	3. 文本节点的 nodeName 永远是 #text
	4. 文档节点的 nodeName 永远是 #document

- nodeValue 	：	节点的值
	1. 元素节点的 nodeValue 是 undefined 或 null
	2. 文本节点的 nodeValue 是文本自身
	3. 属性节点的 nodeValue 是属性的值
- nodeType 	：	节点的类型
~~~
元素          1
属性          2
文本          3
注释          8
文档          9
~~~

##### 访问子节点childNodes[属性]

访问选定元素节点下的所有子节点的列表，返回的值可以看作是一个数组，他具有length属性。

***Tips：兼容问题，回车符/空白文本在现代浏览器中会被当做一个空白节点，在统计元素个数时会出现不同的结果，IE不统计空白节点***

![](http://img.mukewang.com/538d2b8a000163e303430127.jpg)

~~~
elementNode.childNodes
//文本节点使用data属性即可取得节点内容

//均为属性
node.firstChild
node.lastChild
~~~

##### 访问父节点[属性]
~~~
elementNode.parentNode
//具备可传递性
elementNode.parentNode.parentNode
~~~

##### 访问兄弟节点[属性]
~~~
nextSibling 属性可返回某个节点之后紧跟的节点（处于同一树层级中）
nodeObject.nextSibling
previousSibling 属性可返回某个节点之前紧跟的节点（处于同一树层级中）
nodeObject.previousSibling  
~~~
*Tips:如果无此节点，则该属性返回 null*

##### 插入节点appendChild()
参数为创建节点的标签名称，返回被添加的节点
~~~
var otest = document.getElementById("test");  
var item = document.createElement('li');
item.innerHTML = 'append';
otest.appendChild(item);
~~~

##### 插入节点insertBefore()
参数：新节点，参考节点（在此节点之前插入）
返回值：插入的节点
insertBefore(newnode,node);
~~~
//取得父节点
var otest = document.getElementById("test");
//取得父节点的一个子节点  
var tar = document.getElementById("js");
//创建新节点  
var item = document.createElement('li');
item.innerHTML = 'php';
使用父对象，子节点对象，新节点执行插入操作
otest.insertBefore(item,tar);
~~~

##### 删除节点removeChild()
参数：要删除的节点
返回值：被删除的节点
~~~
nodeObject.removeChild(node)

var content=document.getElementById("content");
// 在此完成该函数
while(content.firstChild){
content.removeChild(content.firstChild);
}
~~~

##### 替换元素节点replaceChild()
parentNode.replaceChild (newnode,oldnew)
参数：

- newnode : 必需，用于替换 oldnew 的对象。 
- oldnew : 必需，被 newnode 替换的对象。 
- 返回值：被替换的节点

##### 创建元素节点createElement

createElement()方法可创建元素节点。此方法可返回一个 Element 对象。

参数：tagName，这个字符串用来指明创建元素的类型。
~~~
document.createElement(tagName)

function createa(url,text)
{
    var alink = document.createElement('a');
    alink.href = url;
    alink.target = "_blank";
    alink.style.color = "#ff0000";
    alink.innerHTML = text;
    main.appendChild(alink);
    return alink;
}
~~~

##### 创建文本节点createTextNode

参数：data : 字符串值，可规定此节点的文本。

~~~
document.createTextNode(data)
~~~

##### 浏览器窗口可视区域大小

~~~
var w= document.documentElement.clientWidth
  || document.body.clientWidth;
var h= document.documentElement.clientHeight
  || document.body.clientHeight;
  document.write('height:'+h+'<br/>width:'+w);
~~~

##### 网页尺寸scrollHeight

scrollHeight和scrollWidth，获取网页内容高度和宽度[Document]

~~~
var w=document.documentElement.scrollWidth
   || document.body.scrollWidth;
var h=document.documentElement.scrollHeight
   || document.body.scrollHeight;
~~~

##### 网页尺寸offsetHeight

offsetHeight和offsetWidth，获取网页内容高度和宽度(包括滚动条等边线，会随窗口的显示大小改变)。

~~~
var w= document.documentElement.offsetWidth
    || document.body.offsetWidth;
var h= document.documentElement.offsetHeight
    || document.body.offsetHeight;
~~~

##### 网页卷去的距离与偏移量

~~~
scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离 ，即左边灰色的内容。
scrollTop:设置或获取位于对象最顶端与窗口中可见内容的最顶端之间的距离 ，即上边灰色的内容。
offsetLeft:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 。
offsetTop:获取指定对象相对于版面或由 offsetParent 属性指定的父坐标的计算顶端位置 。
~~~

