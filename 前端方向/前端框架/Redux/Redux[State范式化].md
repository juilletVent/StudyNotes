<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [State 范式化](#state-%E8%8C%83%E5%BC%8F%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# State 范式化

范式化规则

- 任何类型的数据在 state 中都有自己的 “表”。
- 任何 “数据表” 应将各个项目存储在对象中，其中每个项目的 ID 作为 key，项目本身作为 value。
- 任何对单个项目的引用都应该根据存储项目的 ID 来完成。
- ID 数组应该用于排序。