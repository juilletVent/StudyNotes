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