## 函数

定义语法：与js定义一致，不过bash中没有函数形参的概念，所有参数均为约定形式，$0代表bash本身执行路径，函数参数为$1-$n表示，调用时不需要括号，参数跟在函数名之后，多个参数空格分隔

栗子：

	#!/bin/bash
	
	function print(){
	    echo "Hello,$1，PY世界欢迎您，祝您PY愉快。";
	    echo "\$0:$0"
	}
	
	function sayHello(){
	    echo "Hello."
	    print $1
	}
	
	
	read -p "请输入您的姓名：" name
	
	yourName=${name:-"无名氏"}
	
	sayHello $yourName

#### 返回值

在bash中函数返回值一般不常用，需要返回值时一般使用hack写法，下面为五中hack写法：

> return 配合$(())

	myfun() {
		return $(( 5 + 1 )); 
	}
	myfun
	RESULTS=$?
	echo $RESULTS

> 使用echo

	myfun() {
		echo $(( 5 + 1 ));
	}
	RESULTS=$(myfun)
	echo $RESULTS

> 全局变量方式

这种方式似乎是错误的，测试了一下，bash中存在函数作用域，内层变量会屏蔽外部变量

	myfun() {
		foo=$(( 5 + 1 )); 
	}
	myfun
	RESULTS=$foo
	echo $RESULTS

> 地址形式

	myfun() {
		eval $1="\$(( 5 + 1 ))"; 
	}
	myfun RESULTS
	echo $RESULTS

> 使用地址传递

	myfun() {
		let $1=5+1; 
	}
	myfun RESULTS
	echo $RESULTS