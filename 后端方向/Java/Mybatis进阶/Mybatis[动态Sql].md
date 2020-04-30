# 动态 SQL

- [动态 SQL](#%e5%8a%a8%e6%80%81-sql)
  - [foreach 标签](#foreach-%e6%a0%87%e7%ad%be)

## foreach 标签

属性说明：

- collection：需要迭代的集合名称，接前面所说的默认集合名称或者命名注解集合参数都可以
- item：foreach 迭代过程中的每一项，可以直接引用
- index：迭代索引
- open：生成的 sql 前缀
- close：生成的 sql 后缀
- separater：元素分隔符，每次迭代所添加的分隔符

样例：

    <select id="selectByIds" resultType="User">
      select * from t_user where id in
      <foreach collection="ids" item="id" index="i" open="(" close=")" separator=",">
        #{id}
      </foreach>
    </select>
