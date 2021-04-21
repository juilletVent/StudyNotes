<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [流程控制指令](#%E6%B5%81%E7%A8%8B%E6%8E%A7%E5%88%B6%E6%8C%87%E4%BB%A4)
    - [IF判断](#if%E5%88%A4%E6%96%AD)
    - [Switch语句](#switch%E8%AF%AD%E5%8F%A5)
    - [循环](#%E5%BE%AA%E7%8E%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 流程控制指令

#### IF判断

语法格式：

	if [ 条件刞断式 ]; then
		do something...
	elif [ 条件判断 ]; then
		do something...
	else
		do something...
	fi   # <==将 if 反过来写，就成为 fi 啦！结束 if 乀意！

栗子：

	#!/bin/bash
	read -p "是否进行PY交易，您将损失一个屁股并获得200金币(y/n)：" yn
	
	if [ "$yn" == 'y' -o "$yn" == 'Y' ]; then
	        echo "成功进行PY交易，获得200金币，失去屁股一个。"
	else
	        echo "您拒绝了对方的PY申请，错过了一次绝佳的出柜机会，心情值降低50%。"
	fi

**注意：条件表达式的方括号后面的分号不能缺少，为必要的语法符号**

#### Switch语句

语法中的引号，括号均不能少

	#!/bin/bash
	
	read -p "请输入您所进行交易的PY次数：" pyCount
	
	case $pyCount in
	 "1")
		echo "您进行了1次PY交易，获得称号，初尝禁果。"
		;;
	 "10")
		echo "不可思议您进行了10次PY交易，您的菊花已经十分灿烂了。"
		;;
	 *)
		echo "无法理解您的语言，请说人话，谢谢"
		;;
	esac

#### 循环

> while

	while [ condition ] <==中括号内的状态就是刞断式
	do <==do 是循环的开始！
	程序段落
	done <==done 是循环的结束

> until 与while相反，条件不成立时执行

	until [ condition ]
	do
	程序段落
	done

栗子：累加函数

	#!/bin/bash
	
	function sumAdd(){
	    sum=0
	    mov=1
	
	    while [ "$mov" -lt 100 ]
	    do
	        sum=$(($sum+$mov))
	        mov=$(($mov+1))
	    done
	    echo $sum 
	}
	
	read -p "请输入累加数：" basicNum
	
	echo $(sumAdd $basicNum)


文件判断小栗子：

	#!/bin/bash
	
	# 判断文件是否存在，不存在就创建
	if [ ! -e "./main.conf" ]; then
	    touch ./main.conf
	    echo "配置文件不存在，建立主要配置文件"
	    exit 1
	# -e为判断档案是否存在，这里用档案的意思是不管他是文件还是目录 elif [ -e "./main.conf" ] && [ -f "./main.conf" ]; then
	# 判断文件是否存在，存在就删除，并创建目录
	elif [ -f "./main.conf" ]; then
	    rm ./main.conf
	    mkdir ./main.conf
	    echo "删除配置文件，建立配置目录"
	    exit 1
	# 判断目录是否存在，存在就删除
	elif [ -d "./main.conf" ]; then
	    rm -rf ./main.conf
	    echo "删除配置目录"
	fi
	exit 1


