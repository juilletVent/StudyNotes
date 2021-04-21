<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [分支移动](#%E5%88%86%E6%94%AF%E7%A7%BB%E5%8A%A8)
- [使用rebase的方式更新远程分支](#%E4%BD%BF%E7%94%A8rebase%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9B%B4%E6%96%B0%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)
- [设置远程分支的本地追踪分支](#%E8%AE%BE%E7%BD%AE%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF%E7%9A%84%E6%9C%AC%E5%9C%B0%E8%BF%BD%E8%B8%AA%E5%88%86%E6%94%AF)
- [带有指向的push，pull也是同理](#%E5%B8%A6%E6%9C%89%E6%8C%87%E5%90%91%E7%9A%84pushpull%E4%B9%9F%E6%98%AF%E5%90%8C%E7%90%86)
- [相对位置](#%E7%9B%B8%E5%AF%B9%E4%BD%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

