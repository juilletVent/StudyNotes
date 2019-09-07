<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-07 09:34:08
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-09-07 16:05:14
 * @Description: Nothing
 -->

1. 查看Mysql版本：mysql --version / mysql -V
2. 查看帮助：help [sql 语句] 或者 ? sql语句
3. \c 可以取消当前语句的执行
4. sql语句默认以; 或 \g结束
5. 尽量不要使用数据库关键子进行定义，如果一定要使用，那么在书写sql时使用反引号括起来


常用Sql函数：

- version()
- user()
- now()
- database()

常用操作：

1. 创建数据库：create (database|schema) [IF NOT EXISTS] 数据库名称 [DEFAULT] CHARACTER SET [=] utf8mb4
2. 查看全部数据库：SHOW (DATABASES|SCHEMAS)
3. 查看最后一次警告信息：SHOW WARNINGS
4. 查看数据表：SHOW TABLES
5. 查看数据库编码方式：SHOW CREATE DATABASE '数据库名称'
6. 查看数据表信息：SHOW CREATE TABLE '表名称'
7. 查看表结构：DESC 表名 、SHOW COLUMNS FROM 表名
8. 变更数据库编码方式：ALERT DATABASE 数据库名 DEFAULT CHARACTER SET 'utf8mb4'
9. 选中数据库：use 数据库名称
10. 查询当前的数据库名称：select DATABASE()|SCHEMA();
11. 删库跑路：DROP DATABASE [IF EXISTS] dbname;
12. 重置自增长索引：alert table tableName AUTO_INCREMENT=1;
13. 清空表，不要使用delete语句，直接使用：truncate table 表名;

        需要注意的是，truncate相当于保留mysql表的结构，重新创建了这个表，所有的状态都相当于新表，truncate删除后不记录mysql日志，不可以恢复数据

14. 随机数：RAND()  0-1开区间内的随机数