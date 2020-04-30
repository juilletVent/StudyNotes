## Emmet[HTML简写]

- 子元素简写：>
- 兄弟元素简写：+			//a+a=<a></a><a></a>
- 类简写：.
- ID简写：#				//设置ID[#=ID]
- 属性简写:[attr=val]	//设置属性
- 标签内容简写：{content}	//标签内容
- 重复数简写[重复n个]：*n
- 重复时索引引用：$		//对有序刘表进行有序命名或填充时使用
- 简写同级子元素分组：()/*一般在子元素携带有特征信息是单独分组使用*/

示例：

~~~
简写：
div#ctrl$*3

会生成：
<div id="ctrl1"></div>
<div id="ctrl2"></div>
<div id="ctrl3"></div>

综合使用：
ul.pagination.pagination-lg>ul.pager>(li.previous>a[href=#]{上一页})+(li>a[href=#]{$})*5+(li.necxt>a[href=#]{下一页})

得到效果：
<ul class="pagination pagination-lg">
	<ul class="pager">
	  <li class="previous"><a href="#">上一页</a></li>
	  <li><a href="#">1</a></li>
	  <li><a href="#">2</a></li>
	  <li><a href="#">3</a></li>
	  <li><a href="#">4</a></li>
	  <li><a href="#">5</a></li>
	  <li class="necxt"><a href="#">下一页</a></li>
	</ul>
</ul>
~~~