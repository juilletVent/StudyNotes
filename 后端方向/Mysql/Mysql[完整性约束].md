<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-07 09:46:42
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-09-07 20:59:49
 * @Description: Nothing
 -->

## 常用约束条件

加载字段基础定义之后即可

1. unsigned 无符号
2. zerofill 0 填充
3. NOT NULL 非空
4. DEFAULT 默认值
5. PRIMARY KEY 主键
6. UNIQUE KEY 唯一
7. AUTO_INCREMENT (数值列+索引才能用)
8. FOREIGN KEY 外键约束

#### 复合主键

定义复合主键只能使用 PRIMARY KEY 完成：

```
create table test(
  id int,
  name varchar(10),
  primary key(id,name)
);
```

#### 外键

```
...
如不指定外键名称，将会自动使用键名作为外键名称
[CONSTRAINT keyName] FOREIGN KEY(uid) REFERENCES t_user(id),
...
```

外键参照模式：

- CASCADE：级联
- SET NULL
- NO ACTION | RESTRICT 拒绝对父表的删除/更新操作


