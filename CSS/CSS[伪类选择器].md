## CSS常用伪类

#### 锚连接伪类选择器
~~~
.demo a:link {color:gray;}/*链接没有被访问时前景色为灰色*/
.demo a:visited{color:yellow;}/*链接被访问过后前景色为黄色*/
.demo a:hover{color:green;}/*鼠标悬浮在链接上时前景色为绿色*/
.demo a:active{color:blue;}/*鼠标点中激活链接那一下前景色为蓝色*/
~~~

遵守一个爱恨原则LoVe/HAte,也就是Link--visited--hover--active。如果你把顺序搞错了会给你带来意想不到的错误

#### 行为伪类选择器

- hover：鼠标上移
- active：按下样式伪类
- focus：焦点样式

#### UI状态伪类选择器

- checked：选择状态
- enabled：启用状态
- disabled：禁用状态

#### CSS3的:nth选择器
	
-	:first-child选择某个元素的第一个子元素；
-	:last-child选择某个元素的最后一个子元素；
-	:nth-child()选择某个元素的一个或多个特定的子元素；
~~~
默认使用n代表遍历下标，可自行对下标进行处理
~~~
-	:nth-last-child()选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；
~~~
n从最后开始计算
~~~
-	:nth-of-type()选择指定的元素；
-	:nth-last-of-type()选择指定的元素，从元素的最后一个开始计算；
-	:first-of-type选择一个上级元素下的第一个同类子元素；
-	:last-of-type选择一个上级元素的最后一个同类子元素；
-	:only-child选择的元素是它的父元素的唯一一个了元素；
-	:only-of-type选择一个元素是它的上级元素的唯一一个相同类型的子元素；
-	:empty选择的元素里面没有任何内容。

**注意：使用nth-of-type()配合类进行选择时，子类节点即使未匹配上，仍会占据一个位置，如果你匹配的目标位于父节点下的第二个子节点位置，则无论第一个节点是否匹配上，都应使用2来索引**
