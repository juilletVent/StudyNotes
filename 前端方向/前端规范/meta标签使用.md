<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [关于meta标签中的http-equiv属性使用介绍](#%E5%85%B3%E4%BA%8Emeta%E6%A0%87%E7%AD%BE%E4%B8%AD%E7%9A%84http-equiv%E5%B1%9E%E6%80%A7%E4%BD%BF%E7%94%A8%E4%BB%8B%E7%BB%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-10-07 19:40:02
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-10-07 19:40:02
 * @Description: Nothing
 -->
## 关于meta标签中的http-equiv属性使用介绍

meta是html语言head区的一个辅助性标签。也许你认为这些代码可有可无。其实如果你能够用好meta标签，会给你带来意想不到的效果，meta标签的作用有：搜索引擎优化（SEO），定义页面使用语言，自动刷新并指向新的页面，实现网页转换时的动态效果，控制页面缓冲，网页定级评价，控制网页显示的窗口等！ 

meta标签的组成：meta标签共有两个属性，它们分别是http-equiv属性和name属性，不同的属性又有不同的参数值，这些不同的参数值就实现了不同的网页功能。 

1、name属性 

name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。 

meta标签的name属性语法格式是： 

<metaname="参数"content="具体的参数值">。 

其中name属性主要有以下几种参数：　 

A、Keywords(关键字)　 

说明：keywords用来告诉搜索引擎你网页的关键字是什么。 

举例：<metaname="keywords"content="science,education,culture,politics,ecnomics，relationships,entertaiment,human"> 

B、description(网站内容描述) 

说明：description用来告诉搜索引擎你的网站主要内容。 

举例：<metaname="description"content="Thispageisaboutthemeaningofscience,education,culture."> 

C、robots(机器人向导) 

说明：robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。 

content的参数有all,none,index,noindex,follow,nofollow。默认是all。 

举例：<metaname="robots"content="none"> 

D、author(作者) 

说明：标注网页的作者 

举例：<metaname="author"content="root,root@xxxx.com"> 

2、http-equiv属性 

http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。 

meta标签的http-equiv属性语法格式是： 

<metahttp-equiv="参数"content="参数变量值">； 

其中http-equiv属性主要有以下几种参数： 

A、Expires(期限) 

说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。 

用法：<metahttp-equiv="expires"content="Fri,12Jan200118:18:18GMT"> 

注意：必须使用GMT的时间格式。 

B、Pragma(cache模式) 

说明：禁止浏览器从本地计算机的缓存中访问页面内容。 

用法：<metahttp-equiv="Pragma"content="no-cache"> 

注意：这样设定，访问者将无法脱机浏览。 

C、Refresh(刷新) 

说明：自动刷新并指向新页面。 

用法：<metahttp-equiv="Refresh"content="2;URL=http://www.jb51.net">(注意后面的引号，分别在秒数的前面和网址的后面) 

注意：其中的2是指停留2秒钟后自动刷新到URL网址。 

D、Set-Cookie(cookie设定) 

说明：如果网页过期，那么存盘的cookie将被删除。 

用法：<metahttp-equiv="Set-Cookie"content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/"> 

注意：必须使用GMT的时间格式。 

E、Window-target(显示窗口的设定) 

说明：强制页面在当前窗口以独立页面显示。 

用法：<metahttp-equiv="Window-target"content="_top"> 

注意：用来防止别人在框架里调用自己的页面。 

F、content-Type(显示字符集的设定) 

说明：设定页面使用的字符集。 

用法：<metahttp-equiv="content-Type"content="text/html;charset=gb2312"> 

G、content-Language（显示语言的设定） 

用法：<metahttp-equiv="Content-Language"content="zh-cn"/> 

H、Cache-Control指定请求和响应遵循的缓存机制。 
Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、on 

ly-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如下 
Public指示响应可被任何缓存区缓存 
Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效 
no-cache指示请求或响应消息不能缓存 
no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。 
max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应 
min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应 
max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。 

Meta标签使用技巧： 

Meta标签是用来描述网页属性的一种语言，标准的Meta标签可以便于搜索引擎排序，提高搜索引擎网站权重排名。要想网站做的更符合搜索引擎标准就必须了解meta标签，下面由Seoer惜缘于大家讲讲meta标签含义与使用方法： 

1、META标签的keywords 

写法为：<metaname="Keywords"content="信息参数"/> 

meat标签的Keywords的的信息参数，代表说明网站的关键词是什么。 

2、META标签的Description 

<metaname="Description"content="信息参数"/> 

meta标签的Description的信息参数，代表说明网站的主要内容，概况是什么。 

3、META标签的http-equiv=Content-Typecontent="text/html 

http-equiv=Content-Type代表的是HTTP的头部协议，提示浏览器网页的信息， 

<metahttp-equiv="Content-Type"content="text/html;charset=信息参数"/> 

meta标签的charset的信息参数如GB2312时，代表说明网站是采用的编码是简体中文； 

meta标签的charset的信息参数如BIG5时，代表说明网站是采用的编码是繁体中文； 

meta标签的charset的信息参数如iso-2022-jp时，代表说明网站是采用的编码是日文； 

meta标签的charset的信息参数如ks_c_5601时，代表说明网站是采用的编码是韩文； 

meta标签的charset的信息参数如ISO-8859-1时，代表说明网站是采用的编码是英文； 

meta标签的charset的信息参数如UTF-8时，代表世界通用的语言编码； 

4、META标签的generator 

<metaname="generator"content="信息参数"/> 

meta标签的generator的信息参数，代表说明网站的采用的什么软件制作。 

5、META标签的author 

<metaname="author"content="信息参数"> 

meta标签的author的信息参数，代表说明网页版权作者信息。 

6、META标签的http-equiv="Refresh" 

<Metahttp-equiv="Refresh"Content="时间;Url=网址参数"> 

meta标签的Refresh代表多少时间网页自动刷新，加上Url中的网址参数就代表，多长时间自动链接其他网址。 

7、META标签的HTTP-EQUIV="Pragma"CONTENT="no-cache" 

<METAHTTP-EQUIV="Pragma"CONTENT="no-cache">代表禁止浏览器从本地计算机的缓存中访问页面内容,这样设定，访问者将无法脱机浏览。 

8、META标签的COPYRIGHT 

<METANAME="COPYRIGHT"CONTENT="信息参数"> 

meta标签的COPYRIGHT的信息参数，代表说明网站版权信息。 

9、META标签的http-equiv="imagetoolbar" 

<metahttp-equiv="imagetoolbar"content="false"/> 

指定是否显示图片工具栏，当为false代表不显示，当为true代表显示。 

10、META标签的Content-Script-Type 

<Metahttp-equiv="Content-Script-Type"Content="text/javascript"> 

W3C网页规范，指明页面中脚本的类型。 

11、META标签的revisit-after 

<METAname="revisit-after"CONTENT="7days"> 

revisit-after代表网站重访,7days代表7天，依此类推。 

12、META标签的Robots<metaname="Robots"contect="信息参数"> 

Robots代表告诉搜索引擎机器人抓取哪些页面 

其中的属性说明如下： 

信息参数为all：文件将被检索，且页面上的链接可以被查询； 

信息参数为none：文件将不被检索，且页面上的链接不可以被查询； 

信息参数为index：文件将被检索； 

信息参数为follow：页面上的链接可以被查询； 

信息参数为noindex：文件将不被检索，但页面上的链接可以被查询； 

信息参数为nofollow：文件将被检索，但页面上的链接不可以被查询；