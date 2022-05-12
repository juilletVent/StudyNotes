<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [关于中文](#%E5%85%B3%E4%BA%8E%E4%B8%AD%E6%96%87)
- [CRLF](#crlf)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 关于中文

如果批处理文件中有中文，且使用 UTF-8 编码进行存储，则可以在脚本头指定环境编码：

```bat
chcp 65001
```

## CRLF

注意回车换行问题 CMD 解析换行使用的是 CRLF 而不是 LF，如果不匹配，将导致错误
