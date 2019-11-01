# Mybatis 批量插入

回顾：

传统 JDBC 批量插入实现方式：

- 循环遍历一次 insert
- 使用 Statement、Prestatement 对象的 addBatch 进行批量插入

## Mybatis 批量插入实现思路

1、使用批量插入 insert 语句，搭配佛 foreach 标签完成

栗子：

    <insert id="addUsers">
      insert into t_user(username,password) values
      <foreach collection="users" item="user" separator=",">
        (#{user.username},#{user,password})
      </foreach>
    </insert>

2、构建多条独立的 sql 语句进行插入，配合 foreach

    <!-- 敲黑板：如果使用多条语句的模式，在连接数据库时需要指定参数allowMultQuerys=true -->
    <insert id="addUsers">
      <foreach collection="users" item="user" separator=";">
        insert into t_user(username,password) values
        (#{user.username},#{user,password})
      </foreach>
    </insert>

本质上没有区别，都是构建 sql 完成的

**敲黑板：如果使用多条语句的模式，在连接数据库时需要指定参数 allowMultQuerys=true，也就是数据库 url 路径上添加路径参数**

3、ExecuteType 指定 sql 执行模式

Mysql 支持批处理模式，MyBatis 在获取 SqlSession 的时候可以指定 ExecuteType 为 ExecuteType.BTACH 即可取得一个具备批处理能力的 session，所有的操作将在事务提交的时候进行统一的执行，大数据情况下较前两方式效率高很多，但是业务场景应用不多，只在大批量数据导入的时候才会使用

在批量插入的时候还是推荐使用批处理的模式来进行编写，资源利用效率高不是坏事儿

批量插入的例子：

    @Test
    public void insertEx() {

        long startUnix = System.currentTimeMillis();
        // 取得sqlSessionFactory
        SqlSessionFactory sqlSessionFactory = (SqlSessionFactory) this.ctx.getBean("sqlSessionFactory");
        // 取得sqlSession
        SqlSession sqlSession = sqlSessionFactory.openSession(ExecutorType.BATCH);
        // 取得Dao实现类，通过mapper反射获取，在Mapper xml文件中需要定义
        CardDao mapper = sqlSession.getMapper(CardDao.class);

        List<Card> cardList = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            cardList.add(this.getCardInstance());
            if ((i + 1) % 5000 == 0) {
                mapper.addItemList(cardList);
                sqlSession.flushStatements();
                cardList = new ArrayList<>();
            }
        }
        sqlSession.commit();
        sqlSession.close();

        long endUnix = System.currentTimeMillis();

        System.out.println("runtime offset:" + (endUnix - startUnix) + "ms");
    }

## 最佳实践

100 数量级以下的数据，可以使用简单的 foreach 进行插入，超过这个级别就必须使用批处理进行实现，否则将可能出现性能问题
