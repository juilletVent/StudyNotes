<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Insert](#insert)
- [Update](#update)
- [delete](#delete)
- [Query](#query)
    - [别名](#%E5%88%AB%E5%90%8D)
    - [查询 NULL](#%E6%9F%A5%E8%AF%A2-null)
    - [范围 BETWEEN...AND](#%E8%8C%83%E5%9B%B4-betweenand)
    - [指定集合 IN](#%E6%8C%87%E5%AE%9A%E9%9B%86%E5%90%88-in)
    - [逻辑运算符](#%E9%80%BB%E8%BE%91%E8%BF%90%E7%AE%97%E7%AC%A6)
    - [模糊查询](#%E6%A8%A1%E7%B3%8A%E6%9F%A5%E8%AF%A2)
    - [Group By](#group-by)
    - [Having](#having)
    - [Order by](#order-by)
    - [Limit](#limit)
    - [去重](#%E5%8E%BB%E9%87%8D)
    - [联合查询](#%E8%81%94%E5%90%88%E6%9F%A5%E8%AF%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-07 15:07:58
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-07 23:33:22
 * @Description: Nothing
 -->

## Insert

一次插入多个值:

    insert [into] tableName(col,col1)
    values(val,val...),
    (val,val..),
    (val,val..);

使用 set 语法插入：

    insert tableName set col='dsad',col1='dsadsad'

## Update

    update tablename
    set colName='val',col1='val'
    [where条件]

## delete

    delete from tableName where colName='val'

## Query

    select expr... from tableName
    where expr // 查询条件
    group by {colName...} having expr // 分组条件
    order by {colName ase|desc} // 排序条件
    limit limitCount // 限制条件

#### 别名

    select id as '编号' from tableName [as] T
    where T.id = '3243'

#### 查询 NULL

    # 第一种：
    select * from user where nickname <=> null;
    # 第二种
    select * from user where nickname is [not] null;

#### 范围 BETWEEN...AND

    # 可以使用NOT进行取反
    select * from user where age [NOT] BETWEEN 10 AND 20;

#### 指定集合 IN

    # not 取反
    select * from user where age [not] in(1,2,3,4,5);

#### 逻辑运算符

    OR / AND

#### 模糊查询

    [not] LIKE

    select * from user where name like 'hahaha'
    select * from user where name like '%targetVal%' // 模糊搜索
    select * from user where name like '___' // name长度为3

**通配符：%任意长度字符，_（下划线）任意一个字符，大小写不敏感**

#### Group By

    # name会以逗号分隔拼接在一起
    select region,GROUP_CONCAT(name) from user
    group by region;

> 聚合函数

- count 统计，如果指定了统计字段，那么将不会统计统计字段值为null的行
- sum 求和
- max
- min
- avg

```
SELECT addr,
GROUP_ CONCAT(username) AS usersDetail,
COUNT(*) AS totalUsers,
SUM(age) AS sum_ age,
MAX(age) AS max_ age,
MIN(age) AS min_ age,
AVG(age) AS avg_ age
FROM user1
GROUP BY addr;
```

> WITH ROLLUP

    # 会在末尾添加一条数据，包含所有分数据的总合信息
    select region,GROUP_CONCAT(name) from user
    group by region
    with rollup;

#### Having

    对已经分组的数据进行二次筛选
    ...
    HAVING total > 3


#### Order by

    多字段排序
    ...
    order by age asc,len desc

#### Limit

    ... limit 10 // 开始的前10条
    ... limit offset length // 偏移+长度


#### 去重

使用distinct即可

        select distinct(username) from user;


#### 联合查询

UNION 去重 / UNION ALL 简单合并

使用方法：

        子查询1
        UNION [ALL]
        子查询2







