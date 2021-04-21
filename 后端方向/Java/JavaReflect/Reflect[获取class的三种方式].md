<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [获取Class的三种方式](#%E8%8E%B7%E5%8F%96class%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 获取Class的三种方式

    // 1.通过类名.class的方式
    Class clazz1 = Person.class; 
    // 2.通过对象. getClass()的方式
    Person person = new Person();
    Class clazz2 = person.getClass();
    // 3.Class类forName();获得 (推荐)
    Class clazz3 = Class.forName( "全路径类名，如：cn.nananmi52.utils");|
