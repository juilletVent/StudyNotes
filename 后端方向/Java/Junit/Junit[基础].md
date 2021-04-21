<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Junit 4 单元测试](#junit-4-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)
    - [前置准备](#%E5%89%8D%E7%BD%AE%E5%87%86%E5%A4%87)
    - [常用测试注解](#%E5%B8%B8%E7%94%A8%E6%B5%8B%E8%AF%95%E6%B3%A8%E8%A7%A3)
    - [多场景打包测试](#%E5%A4%9A%E5%9C%BA%E6%99%AF%E6%89%93%E5%8C%85%E6%B5%8B%E8%AF%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-02 23:43:22
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-03 22:17:44
 * @Description: Nothing
 -->
## Junit 4 单元测试

#### 前置准备

下载前置依赖并导入：

    junit-4.12.jar
    hamcrest-core-1.3.jar

在需要做测试的文件中按下 alt+insert，选择 test，然后选择 Junit4,勾选需要创建测试的方法即可完成测试类的创建

#### 常用测试注解

> 无特殊说明均为方法注解

- @Test 标明此方法为测试方法:@Test(expected = Exception.class)捕获异常时使用前面这个东西
- @Ignore 被忽略的测试方法
- @Before 测试开始前的初始化方法
- @After 测结束后的清理方法
- @FixMethodorder(MethodSorters.JVM)：为 Class 注解，而不是方法注解

```
说明：@FixMethodorder标注测试顺序，有三个取值：

  MethodSorters.JVM：按照定义顺序执行
  MethodSorters.DEFAULT：默认顺序，以不可预期的顺序执行
  MethodSorters.NAME_ASCENDING：按照方法名称排序执行

PS：然后尝试了之后发现无效，原因不明。Junit4，想要实现顺序执行可能只能使用名称排序的方法，JVM模式可能由于jdk版本问题，无法按照定义顺序进行执行
```

#### 多场景打包测试

当存在多个测试场景时，打包测试如下

```
package com.gmsoft.test.unittest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses(
        {TestTest.class, TestTest1.class}
)
public class AllTest {
}
```
