<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-07 19:11:23
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-09-07 20:19:23
 * @Description: Nothing
 -->
## 连接查询

#### 内连接

    --查询emp id username age addr dep id depName depDesc
    SELECT e.id,e. username , e.age, e.addr,
    d.id,d.depName, d.depDesc
    FROM dep "AS d
    JOIN emp AS e
    ON d.id=e.depId;

*Tips:内连接的条件控制两个表一同输出，如果条件不成立，两个表的数据都不会出现在结果中*


#### 外连接

左与右类似

```
select a.user,a,pwd,b.deptName from
user as a
left join dept as b
on a.deptId = b.id;
```


