<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [文件删除注意事项](#%E6%96%87%E4%BB%B6%E5%88%A0%E9%99%A4%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 文件删除注意事项

由于文件具备上下文，只要存在未被释放的info和file对象，都将会对文件进行索引，不会释放文件对象，此时，如果删除文件势必将会导致删除失败：权限不足

解决办法：释放所有的文件持有对象，info和file