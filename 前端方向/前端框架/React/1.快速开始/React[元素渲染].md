<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [元素渲染](#%E5%85%83%E7%B4%A0%E6%B8%B2%E6%9F%93)
  - [元素不可变](#%E5%85%83%E7%B4%A0%E4%B8%8D%E5%8F%AF%E5%8F%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 元素渲染

**元素事实上只是构成组件的一个部分**

### 元素不可变

在React中有一个非常重要的是概念，就是React元素一旦被创建就不允许直接更改，状态更新的唯一办法就是创建新的元素然后传入render函数进行渲染

UI的更新，并不是整体替换，而是有针对性的局部替换

**重点：React元素不可直接修改**