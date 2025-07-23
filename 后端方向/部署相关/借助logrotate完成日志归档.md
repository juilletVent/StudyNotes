<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [借助 logrotate 完成日志归档](#%E5%80%9F%E5%8A%A9-logrotate-%E5%AE%8C%E6%88%90%E6%97%A5%E5%BF%97%E5%BD%92%E6%A1%A3)
  - [1、配置 logrotate](#1%E9%85%8D%E7%BD%AE-logrotate)
  - [2、测试 logrotate](#2%E6%B5%8B%E8%AF%95-logrotate)
  - [3、配置 crontab](#3%E9%85%8D%E7%BD%AE-crontab)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 借助 logrotate 完成日志归档

## 1、配置 logrotate

logrotate 的默认配置文件存放位置目录：`/etc/logrotate.d`

在该目录下创建一个配置文件，文件名随意，此处我们要备份 nginx 日志文件，就取名为：`nginx`,文件全路径：`/etc/logrotate.d/nginx`,文件内容如下：

```
# 匹配要处理的日志文件路径，可以使用通配符：* ，但是由于后处理脚本使用shell进行了文件名处理，因此如果你有多个log文件需要归档，还是写成多个匹配规则吧
/etc/nginx/logs/test.log {
    # 每天归档一次
    daily
    # 保留最近180天的归档文件
    rotate 180
    # 文件不存在忽略报错
    missingok
    # 启用压缩
    compress
    # 延迟压缩
    delaycompress
    # 空文件不归档
    notifempty
    # 新创建的文件的权限为0640，拥有者为nginx用户，所属组也为nginx用户组
    create 0640 nginx nginx
    # 仅运行一次共享脚本
    sharedscripts
    # 以日期作为归档文件的后缀
    dateext
    # 日期格式：此处使用Unix时间戳作为后缀
    dateformat -%s
    # 后处理Shell脚本，主要是处理归档后的文件，将Unix时间戳转换为日期格式，并重命名
    postrotate
        # 取得当前Unix时间戳
        unix=$(date +\%s)
        # 将Unix时间戳转换为日期时间格式
        timeStr=$(date -d @${unix} +"%Y-%m-%d-%H-%M-%S")
        # 重命名归档文件，注意修改此处的路径与文件名，改为实际的日志路径与文件名
        mv /etc/nginx/logs/test.log-${unix} /etc/nginx/logs/test-${timeStr}.log
        # 通知nginx重新打开日志文件
        /bin/kill -USR1 $(cat /run/nginx.pid 2>/dev/null) 2>/dev/null || true
        # 上一行似乎没什么卵用，直接重载nginx才管用
        nginx -s reload
    endscript
}
```

## 2、测试 logrotate

```shell
# 手动执行 logrotate
logrotate -f /etc/logrotate.d/nginx
```

将会在 `/etc/nginx/logs` 目录下生成归档文件，例如：`test-2020-01-01-12-01-01.log`

## 3、配置 crontab

```shell
# 编辑 crontab
crontab -e
# 添加一行，每天凌晨1点执行 logrotate
0 1 * * * logrotate -f /etc/logrotate.d/nginx
```
