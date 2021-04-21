<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Git基础命令](#git%E5%9F%BA%E7%A1%80%E5%91%BD%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Git基础命令

命令git init把这个目录变成Git可以管理的仓库

使用git commit命令（-m后面输入的是本次提交的说明，最好是有意义的，方便阅读）：

	$ git add file1.txt
	$ git add file2.txt file3.txt
	$ git commit -m "add 3 files."

git push master