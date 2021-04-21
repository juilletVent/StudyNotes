<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [IE下时间对象解析问题](#ie%E4%B8%8B%E6%97%B6%E9%97%B4%E5%AF%B9%E8%B1%A1%E8%A7%A3%E6%9E%90%E9%97%AE%E9%A2%98)
    - [总结](#%E6%80%BB%E7%BB%93)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## IE下时间对象解析问题

IE浏览器下时间对象在创建时，解析时间字符串时存在无法解析 `2019-01-01 10:00:00`这样的标准时间字符串，需将字符串中的`-`替换成`/`才能完成解析工作，火狐、Chrome下无此问题，且将`-`转换为`/`后这两款浏览器依然可以正常解析

#### 总结

解析时间对象时，尽量将标准字符串中的`-`替换为`/`后进行解析，或者使用第三方库进行解析(`moment等`)，避免出现浏览器兼容性问题
