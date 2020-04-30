<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-07 23:10:29
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-07 23:20:44
 * @Description: Nothing
 -->
## Mysql 子查询

```
select * from tablename 
where score > (select score from tablename where name='lili'); 
```

#### 逻辑判断值

EXISTS

栗子：

如果没有查到id=324的数据，则什么都不会输出
select * from tablename
where EXISTS(select id from tablename where id='324')

#### ANY SOME ALL

子查询时可以使用关键字进行子查询集合限定：

- ANY 查询条件针对子查询结果中任意一条成立即可
- SOME 查询条件针对子查询结果中任意一条成立即可
- ALL 查询条件针对子查询全部结果都必须通过才成立


