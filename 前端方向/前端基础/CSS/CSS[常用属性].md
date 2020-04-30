## CSS常用属性

- letter-spacing：1px 字间距
- font-family:"Microsoft Yahei";		字体	
- font-size:12px;color:#666；		颜色
- font-weight:bold；					粗体
- font-style:italic;					斜体
- letter-spacing:50px; 				字间距
- word-spacing:50px; 				单词间距
- text-decoration:underline;			下划线
- text-decoration:line-through;		删除线
- text-indent:2em;					首行缩进
- line-height:1.5em;					行高
- letter-spacing:50px;				字母间距
- word-spacing:50px;					单词间距
- text-align:center;					文本对齐[仅仅针对行级元素生效]
- display:inline;					元素等级指定[行/块/行内块]
- border:2px solid red;				边框设置
- font:12px/1.5em  "宋体",sans-serif;缩写设置字体信息
- color:rgb(133,45,200);
- color:rgb(20%,33%,25%);
- color:#00ffff;
- border-radius: 25px;				圆角边框
- cursor:auto|move|text|pointer		鼠标样式
- background-attachment:scrollfixed	定义背景图片随滚动轴的移动方式
- font-size:62.5%;这样为body添加后默认的1rem=16px,变成了1rem=10px，子元素可使用类似2rem的相对属性来设置字体大小了

~~~
border-width:2px;
border-style:solid;
dashed（虚线）| dotted（点线）| solid（实线）
border-color:red;

div{border-bottom:1px solid red;}
border-top:1px solid red;
border-right:1px solid red; 
border-left:1px solid red;
border-bottom:1px dotted #ccc;
~~~

- position:relative;				相对定位[元素自身原有位置]
- position:fixed;					固定定位[相对于浏览器视窗]
- position:absolute;				绝对定位[最近的带有定位信息的父元素]
- z-index:-1;						设置元素Z次序[堆叠层次]
- outline:none						取消input默认焦点样式
- resize:none						取消textarea可拖动调整大小

> 常用到px（像素）、em、% 百分比，要注意其实这三种单位都是相对单位
本元素给定字体的 font-size 值，如果元素的 font-size 为 14px ，那么 1em = 14px；如果 font-size 为 18px，那么 1em = 18px

##### 水平居中

- 行级元素居中使用text-align:center居中
- 满足定宽和块状两个条件的元素是可以通过设置“左右margin”值为“auto”来实现居中的

> 不定宽度的块状元素有三种方法居中：

- 加入 table 标签,table为块级元素，且宽度不定
- 设置 display: inline 方法：与第一种类似，显示类型设为 行内元素，进行不定宽元素的属性设置
- 通过给父元素设置 float，然后给父元素设置 position:relative 和 left:50%，子元素设置 position:relative 和 left: -50% 来实现水平居中

#### 垂直居中

###### 使用CSS盒子传统方式

- 将需要居中的元素包裹在table>tr>td中，为tr指定高度，或者多个td公用一个最高高度即可,td可自行实现内元素的垂直居中
- line-height:父元素高度
- display:table-cell；vertical-align:middle；激活表格属性，然后设置垂直居中属性[IE6、7不支持]

###### 使用Flex布局实现
只需要将父元素CSS添加如下属性即可
~~~
display: flex;
align-items:center;
~~~
*Tips:Flex布局教程：*
[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html "Flex布局语法")

##### CSS的Display隐式转换
 1. position : absolute 
 2. float : left 或 float:right 

以上两种情况任意一种，应用该样式的行级节点自动转为行内块级节点
