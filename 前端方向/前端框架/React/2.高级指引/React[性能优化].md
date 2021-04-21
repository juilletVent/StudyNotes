<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 性能优化

> 使用生产版本

默认情况下，React包含很多在开发过程中很有帮助的警告。然而，这会导致React更大更慢。因此，在部署应用时，请确认使用了生产版本。

- DevTool 黑色：生产环境
- DevTool 红色：开发环境
- DevTool 灰色：不可用

构建生产版本： npm run build

这将会在该项目的build/文件夹内创建一个生产版本的应用。

> 避免重复渲染

在shouldComponentUpdate HOOK中，返回true将会导致React执行UI更新，默认返回true，如果你明确知道某个操作不需要更新UI，则可以返回false阻止UI更新以提高性能

	shouldComponentUpdate(nextProps, nextState) {
	  return true;
	}

如果你知道在某些情况下你的组件不需要更新，你可以在shouldComponentUpdate内返回false来跳过整个渲染进程，该进程包括了对该组件和之后的内容调用render()指令
