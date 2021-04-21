<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Scope](#scope)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Scope

在NG中，Scope负责联系各个控制器、服务、指令等模块，Scope具备与dom结构相同的树形结构， 且具备JS原型链机制，子级继承父级scope属性，所以使用依赖注入时注意Scope作用域，指令可以不具备Scope，此时他所使用的Scope就是在应用指令时的局部Scope作用域


> 析构

最佳实践: 指令应该自己管理自身分配的内存。当指令被移除时， 你可以使用element.on('$destroy', ...) 或 scope.$on('$destroy', ...)来执行一个清理的工作

