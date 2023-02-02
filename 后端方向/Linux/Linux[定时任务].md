<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [at 单次任务](#at-单次任务)
- [crontab 周期任务](#crontab-周期任务)
- [anacron 补救性任务](#anacron-补救性任务)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## at 单次任务

需要 atd 服务支持，基本被 crontab 替代，目前 centos 7+发行版已经默认不携带这个服务了

## crontab 周期任务

需要 crond 服务支持

log 位置：/var/log/cron

周期任务编写规则：

    0 	12 	* 	* 	* 	mail dmtsai -s "at 12:00" < /home/dmtsai/.bashrc
    分 	时 	日 	月 	周	指令

| 含义     | 分钟 | 小时 | 日期 | 月份 | 星期                  | 指令 |
| -------- | ---- | ---- | ---- | ---- | --------------------- | ---- |
| 数字范围 | 0-59 | 0-23 | 1-31 | 1-12 | 0-7(0/7 都代表星期日) | 指令 |

| 特殊字符 | 含义                                                             |
| -------- | ---------------------------------------------------------------- |
| \*星号   | 任意值                                                           |
| ,逗号    | 多条件，栗子：1,2 表示在当前段 1 或者 2 的时候均执行任务         |
| -短横线  | 取值区间，区间内的所有取值都满足                                 |
| \/ 斜线  | 代表间隔多久执行一次，栗子：\*/5 代表每 5(分钟、小时...)执行一次 |

**定期执行指定目录下的全部可执行文件：run-parts 可以执行指定目录中的全部可执行命令**

    */5 * * * * run-parts /root/runcron

## anacron 补救性任务

当你的服务器在关机的的时间段内有计划任务时，这些任务如果不进行补救，就会遗失，anacron 就是处理这些任务的；开机后立刻迚行 anacron 癿劢作，他会去侦测停机期间应该迚行但是并没有迚行的 crontab 仸务，并将该仸务执行一遍后，anacron 就会自劢停止了。
