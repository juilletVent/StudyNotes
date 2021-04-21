<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [动态 SQL](#%E5%8A%A8%E6%80%81-sql)
  - [foreach 标签](#foreach-%E6%A0%87%E7%AD%BE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
