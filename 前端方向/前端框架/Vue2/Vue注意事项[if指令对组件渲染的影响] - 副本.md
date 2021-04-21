<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [v-if指令对组件渲染的影响](#v-if%E6%8C%87%E4%BB%A4%E5%AF%B9%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93%E7%9A%84%E5%BD%B1%E5%93%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# v-if指令对组件渲染的影响

在使用v-if对子组件进行动态渲染时，子组件数据可能无法实时更新

表现为切换子组件显示时数据才同步，初始化数据不显示

改用v-show指令完成显示切换

原因：两个指令这作用原理不同 v-if删除了DOM节点 v-show只是隐藏