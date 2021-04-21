<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [开机启动脚本](#%E5%BC%80%E6%9C%BA%E5%90%AF%E5%8A%A8%E8%84%9A%E6%9C%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 开机启动脚本

1. 编写好你的脚本
2. 添加执行权限 chmod +x #脚本名称#
3. cp脚本到 /etc/init.d/ 目录下
4. 添加到系统服务 chkconfig --add #脚本名称#
5. 设置开机启动 chkconfig #脚本名称# on
6. 重启验证