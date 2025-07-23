<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [宝塔类的允许远程](#%E5%AE%9D%E5%A1%94%E7%B1%BB%E7%9A%84%E5%85%81%E8%AE%B8%E8%BF%9C%E7%A8%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
