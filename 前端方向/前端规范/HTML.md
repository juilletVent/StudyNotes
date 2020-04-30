# html 

## 通用约定

- 自闭合（self-closing）标签，无需闭合 ( 例如： img input br hr 等 )
- 可选的闭合标签（closing tag），需闭合 ( 例如：</li> 或 </body> )
- 尽量减少标签数量

		<img src="https://7n.w3cschool.cn/attachments/image/cimg/google.png" alt="Google">
		<input type="text" name="title">
		
		<ul>
		  <li>Style</li>
		  <li>Guide</li>
		</ul>
		
		<!-- Not recommended -->
		<span class="avatar">
		  <img src="...">
		</span>
		
		<!-- Recommended -->
		<img class="avatar" src="...">


### class 与 id

- class 应以功能或内容命名，不以表现形式命名
- class 与 id 单词字母小写，多个单词组成时，采用中划线-分隔
- 使用唯一的 id 作为 Javascript hook, 同时避免创建无样式信息的 class

### 属性顺序

HTML 属性应该按照特定的顺序出现以保证易读性

- id
- class
- name
- data-xxx
- src, for, type, href
- title, alt
- aria-xxx, role

### 引号

属性的定义，统一使用双引号

> 语义嵌套约束

简而言之就是按照预定语义进行标签嵌套，类似ol、ul与li嵌套，table与tr、td嵌套

> 严格嵌套约束

浏览器不允许的嵌套

类似a中嵌套a，a中嵌套button、select

> 布尔值属性不再设置值

直接书写checked disabled selected


## 语义化

<table><thead><tr><th>标签</th>
<th>语义</th>
</tr></thead><tbody><tr><td><code>&lt;p&gt;</code></td>
<td>段落</td>
</tr><tr><td><code>&lt;h1&gt; &lt;h2&gt; &lt;h3&gt; ...</code></td>
<td>标题</td>
</tr><tr><td><code>&lt;ul&gt;</code></td>
<td>无序列表</td>
</tr><tr><td><code>&lt;ol&gt;</code></td>
<td>有序列表</td>
</tr><tr><td><code>&lt;blockquote&gt;</code></td>
<td>大段引用</td>
</tr><tr><td><code>&lt;cite&gt;</code></td>
<td>一般引用</td>
</tr><tr><td><code>&lt;b&gt;</code></td>
<td>为样式加粗而加粗</td>
</tr><tr><td><code>&lt;storng&gt;</code></td>
<td>为强调内容而加粗</td>
</tr><tr><td><code>&lt;i&gt;</code></td>
<td>为样式倾斜而倾斜</td>
</tr><tr><td><code>&lt;em&gt;</code></td>
<td>为强调内容而倾斜</td>
</tr><tr><td><code>code</code></td>
<td>代码标识</td>
</tr><tr><td><code>abbr</code></td>
<td>缩写</td>
</tr></tbody></table>

## HEAD

### 语言属性

	<!-- 中文 -->
	<html lang="zh-Hans">
	
	<!-- 简体中文 -->
	<html lang="zh-cmn-Hans">
	
	<!-- 繁体中文 -->
	<html lang="zh-cmn-Hant">
	
	<!-- English -->
	<html lang="en">

### 字符编码

以无 BOM 的 utf-8 编码作为文件格式; 

指定字符编码的 meta 必须是 head 的第一个直接子元素；

	<meta charset="utf-8">

### 兼容模式

使用最新的IE chrom内核

	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

### SOE

	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <!-- SEO -->
	    <title>Style Guide</title>
	    <meta name="keywords" content="your keywords">
	    <meta name="description" content="your description">
	    <meta name="author" content="author,email address">
	</head>



