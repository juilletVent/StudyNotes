<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [lrzsz 文件上传乱码问题](#lrzsz-%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## lrzsz 文件上传乱码问题

原因：上传时文件内包含控制字符串，导致流程中断或乱码

解决方法：

```
# 上传时增加额外的参数， -b 表明将文件使用二进制传输，-e 忽略所有控制字符
rz -be
```
