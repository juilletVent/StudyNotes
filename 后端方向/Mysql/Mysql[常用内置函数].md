<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [数学函数](#数学函数)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-08 08:13:23
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-08 09:19:23
 * @Description: Nothing
 -->

## 数学函数

- ceil 向上取整
- floor 向下取整
- round 四舍五入 round(1.21313,5)
- truncate 小数按精度截取 truncate(2.32432,2) 不会进行舍入操作，而是直接截断
- mod 求余数 mod(3,2) => 1
- abs 绝对值
- power 幂运算
- pi 圆周率
- rand 随机数 如果 round 传入了参数，则相当于对参数签名，参数一致时，返回值一样
- sign 取得数字符号 sign(-12) => -1 sign(12) => 1 sign(0) => 0
- wxp 计算自然对数 e 的 x 方
- COALESCE(B, A) 逐个检查参数，返回第一个不为 NULL 的参数
