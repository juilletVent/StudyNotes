<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [注释](#%E6%B3%A8%E9%87%8A)
- [数据类型](#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
- [修改表](#%E4%BF%AE%E6%94%B9%E8%A1%A8)
- [存储引擎](#%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-07 08:23:53
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-09-07 15:07:47
 * @Description: Nothing
 -->

### 注释

1. 单行注释： // 或者 #
2. 多行注释：/\*\*/

### 数据类型

- tinyint 0-255 / -128 - 127 1 字节
- smallint 65535 / -32768 - 32767 2 字节
- MEDIUMINT 16777215 / -8388608 - 8388607 3 字节
- int
- bigint
- bool / boolean
- float
- double
- decimal 定点数，字符串存储不存在精度丢失
- char 定长
- varchar 变长
- tinytext 2^8
- text 2^16
- mediumtext 2^24
- longtext 2^32
- enum 枚举
- time 仅存储 hh-MM-ss
- date 仅存储 yyyy-mm-dd
- datetime 存储完整日期时间
- timestamp 时间戳
- year 年份


### 修改表

修改表：

> 添加字段

    alert table test
    add email varchar(20),
    add username varchar(20) [first|(after 'colName')]; // 添加到头部,多个操作可以写到一起，逗号分隔

> 删除字段

    alert table test
    drop username;

  
> 修改字段

    alert table test
    alert testCol SET DEFAULT 'def val',
    alert testCol DROP DEFAULT,
    -- 修改字段类型、属性
    modify colName varchar(500) not null set default '000',
    -- 修改字段名称
    change srcColName newName varchar(10) ColAttr [first|after]
    -- 添加唯一索引
    add unique key('name')

> 添加/删除主键

    alert table tablename
    add primary key (id);

    alert table tablename
    drop primary key;

> 删除索引

    alert table
    drop index 索引名称;

> 修改表名称

    alert table tableName
    rename [to|as] newTableName;

    -- 另一个语法
    rename table tableName to newName;


### 存储引擎

在创建表的末尾添加 ENGINE=引擎名称即可 ： create table ...(...)ENGINE=Innodb

> MyISAM

可以在建表是指定数据文件以及索引文件位置，在原有的默认位置处会生成软件链接，连接到sql指定的实际存储位置，只有这个模式支持

// 数据文件保存位置
DATA DIRECORY [=] 绝对路径
// 索引文件保存位置
INDEX DIRECORY [=] 绝对路径

会产生三个文件：

- .frm 表结构描述文件
- .myd 表数据文件
- .myi 表索引文件

单表数据量上限：2^64 条
索引数量上限：64 个
复合索引最多支持字段数： 16 个字段
索引值最大值：1000B

> InnoDB

文件：

- .frm 表结构描述文件
- .ibd 表空间（包含了数据&索引）

特点：

- 具备数据库事务功能，MyISAM不支持数据库事务
- 支持行级锁，可应对高并发
- 拥有独立缓冲池
    


