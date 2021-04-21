<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [字典-对象](#%E5%AD%97%E5%85%B8-%E5%AF%B9%E8%B1%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 字典-对象

常用api

- dict 创建字典
- len 键值对
- del: 删除键值 del obj[key]
- get 安全去值
- 包含检测: k in d 检查d中是否包含 k
- clear 清空字典
- copy 浅拷贝字典
- fromekys 根据元组、list建立字典，所有的值均为None
- has_key 检查字典中是否包含这个键
- pop 获取并删除该键
- popitem 随机弹出字典中的值
- setDefault 设置默认值，并返回对应的值，如果已经有值则仅仅是返回值而已
- update 使用字典更新字典，不存在的键将会吧添加，存在的键将会被更新

ps：key可以是任何不可变的类型

    dict(name='username',age=22) // {'name':'username','age':22}
    dict([('name','Gumby'),('age':22)])

