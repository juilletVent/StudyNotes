<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [参数绑定](#%E5%8F%82%E6%95%B0%E7%BB%91%E5%AE%9A)
  - [Query 参数绑定](#query-%E5%8F%82%E6%95%B0%E7%BB%91%E5%AE%9A)
  - [Body 参数绑定](#body-%E5%8F%82%E6%95%B0%E7%BB%91%E5%AE%9A)
  - [Path 参数绑定](#path-%E5%8F%82%E6%95%B0%E7%BB%91%E5%AE%9A)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 参数绑定

**Tips：编写了参数绑定注解后，Swagger 文档注解参数部分可以不再进行书写，只提供一个空参数集合注解即可：@ApiImplicitParams({})**

## Query 参数绑定

在形参上直接添加注解即可：

    // 简单类型
    @RequestParam(value = "当前页码", required = false)
    // 复合类型(一般用于查询模型定义)，有待记录

## Body 参数绑定

为形参添加如下注解即可：

    @ApiParam(value = "用户信息") @RequestBody User user

## Path 参数绑定

路径上按照如下形式定义路径参数：

    /get/{id}

    @PathVariable("planId") Long id
