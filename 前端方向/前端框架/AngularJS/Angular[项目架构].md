<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [项目整体架构](#%E9%A1%B9%E7%9B%AE%E6%95%B4%E4%BD%93%E6%9E%B6%E6%9E%84)
  - [实际项目结构](#%E5%AE%9E%E9%99%85%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 项目整体架构

- 服务模块
- 指令模块
- 过滤器模块
- 应用启动模块

这是官方建议的分级结构，可以根据自己的项目结构进行重构，主要目的就是项目目录结构分级清晰即可。

## 实际项目结构

~~~
Application
|-- 模块A
||-- 组件A
||	|--控制器A
||	|--样式A
||	|--服务A
||-- 组件B
|	|...
|
|-- 模块N...
|	|...
|
|-- API公共服务
|-- 其他公共服务
|-- 过滤器
|-- 公共指令
|-- 分块Layout模板
|-- ConstantValue
|-- 项目开发/编译配置
|-- 工具集合Utils
|
|-- asset资源目录
|
|-- 其他
~~~

