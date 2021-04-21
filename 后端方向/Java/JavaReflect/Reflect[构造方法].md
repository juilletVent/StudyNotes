<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [获取构造方法](#%E8%8E%B7%E5%8F%96%E6%9E%84%E9%80%A0%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 获取构造方法

栗子：

```
Class clazz = Class.forName("cn.nanami52.Utils");
// 获取无参构造
Constructor cons = clazz.getConstructor();
// 获取带参构造
Constructor consEx = clazz.getConstructor(String.class,Integer.Class);
Utils utils = (Utils)consEx.newInstance("name",0)
```
