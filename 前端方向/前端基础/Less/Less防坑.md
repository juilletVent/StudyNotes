<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Less 防坑](#less-%E9%98%B2%E5%9D%91)
    - [计算型CSS属性冲突问题：](#%E8%AE%A1%E7%AE%97%E5%9E%8Bcss%E5%B1%9E%E6%80%A7%E5%86%B2%E7%AA%81%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Less 防坑

### 计算型CSS属性冲突问题：

	.login-main{
	    height: calc(~"100% - 100px");
	}

此类CSS使用时需要加上定界符，且带上“~”符号，Less将不会再执行计算操作，而是去掉特殊格式输出引号内的内容。

另外，calc函数 运算符左右两个需要有空格[巨坑]