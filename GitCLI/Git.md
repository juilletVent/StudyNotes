## 分支移动

git branch -f master HEAD~3

git branch -f <将要移动的分支> <移动到的目标分支位置>

## 使用rebase的方式更新远程分支

git pull --rebase

## 设置远程分支的本地追踪分支

git checkout -b <本地分支名称> <远程分支名称>

git branch -u <远程分支> <本地分支>

## 带有指向的push，pull也是同理

git push origin <提交的分支>:<提交的目标远程分支>

## 相对位置

- ^ 表示上一个版本，可以接多个，另外^可以用与多个parent commit的索引，序号依次排开
- ~ 表示多个历史版本,~2 表示 目标的向上两个版本

