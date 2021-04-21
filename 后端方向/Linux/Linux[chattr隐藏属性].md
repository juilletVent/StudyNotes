<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [chattr 可以设置文件/目录的隐藏属性 有些场景下 非常有用](#chattr-%E5%8F%AF%E4%BB%A5%E8%AE%BE%E7%BD%AE%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95%E7%9A%84%E9%9A%90%E8%97%8F%E5%B1%9E%E6%80%A7-%E6%9C%89%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8B-%E9%9D%9E%E5%B8%B8%E6%9C%89%E7%94%A8)
- [lsattr](#lsattr)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## chattr 可以设置文件/目录的隐藏属性 有些场景下 非常有用

- A：即 Atime，告诉系统不要修改对这个文件的最后访问时间。
- S：即 Sync，一旦应用程序对这个文件执行了写操作，使系统立刻把修改的结果写到磁盘。
- a：即 Append Only，系统只允许在这个文件之后追加数据，不允许任何进程覆盖或截断这个文件。如果目录具有这个属性，系统将只允许在这个目录下建立和修改文件，而不允许删除任何文件。
- b：不更新文件或目录的最后存取时间。
- c：将文件或目录压缩后存放。
- d：当 dump 程序执行时，该文件或目录不会被 dump 备份。
- D:检查压缩文件中的错误。
- i：即 Immutable，系统不允许对这个文件进行任何的修改。如果目录具有这个属性，那么任何的进程只能修改目录之下的文件，不允许建立和删除文件。
- s：彻底删除文件，不可恢复，因为是从磁盘上删除，然后用 0 填充文件所在区域。
- u：当一个应用程序请求删除这个文件，系统会保留其数据块以便以后能够恢复删除这个文件，用来防止意外删除文件或目录。
- t:文件系统支持尾部合并（tail-merging）。
- X：可以直接访问压缩文件的内容。

参数

- -R 递归处理，将指定目录下的所有文件及子目录一并处理。
- -v<版本编号> 设置文件或目录版本。
- -V 显示指令执行过程。
- +<属性> 开启文件或目录的该项属性。
- -<属性> 关闭文件或目录的该项属性。
- =<属性> 指定文件或目录的该项属性。

## lsattr

用于查看文件已经设置的控制属性

使用样例：

```bash
# 为文件添加i属性标记
chattr +i test.file
# 查看文件的隐藏属性
lsattr test.file
```
