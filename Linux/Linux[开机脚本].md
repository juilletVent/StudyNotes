## 开机启动脚本

1. 编写好你的脚本
2. 添加执行权限 chmod +x #脚本名称#
3. cp脚本到 /etc/init.d/ 目录下
4. 添加到系统服务 chkconfig --add #脚本名称#
5. 设置开机启动 chkconfig #脚本名称# on
6. 重启验证