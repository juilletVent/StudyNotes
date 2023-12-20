<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-04 00:03:34
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-04 23:40:12
 * @Description: Nothing
 -->
1. 修改user表，更改root的host为 %
2. 修改mysql配置文件 my.cnf

        添加 bind-address = 0.0.0.0

## 宝塔类的允许远程

-- 增加用户
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码'
-- 刷新权限信息
flush privileges;
