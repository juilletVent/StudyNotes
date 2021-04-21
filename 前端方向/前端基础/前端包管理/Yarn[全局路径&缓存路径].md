<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [全局安装路径：](#%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84)
- [缓存路径](#%E7%BC%93%E5%AD%98%E8%B7%AF%E5%BE%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#### 全局安装路径：

		yarn config  set global-folder "你的磁盘路径"

然后你会在你的用户目录找到 .yarnrc 的文件，打开它，找到 global-folder ，改为 --global-folder

我们需要将 全局安装路径\node_modules.bin 整个目录 添加到系统环境变量中去，否则通过yarn 添加的全局包 在cmd 中是找不到的

#### 缓存路径

		yarn config set cache-folder "D:\Software\yarn\cache"


检查当前yarn 的 bin的 位置

	yarn global bin

检查当前 yarn 的 全局安装位置

	yarn global dir