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