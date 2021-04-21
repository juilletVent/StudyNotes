<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [类型推断](#%E7%B1%BB%E5%9E%8B%E6%8E%A8%E6%96%AD)
  - [上下文类型推断](#%E4%B8%8A%E4%B8%8B%E6%96%87%E7%B1%BB%E5%9E%8B%E6%8E%A8%E6%96%AD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 类型推断

TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型

栗子：

	let x = 3;

变量x的类型被推断为数字。 这种推断发生在初始化变量和成员，设置默认参数值和决定函数返回值时

推断类型在定义数组时，如果没有通用类型可以使用，则使用联合数组类型：

	let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

推断为：
		
	(Rhino | Elephant | Snake)[]



## 上下文类型推断

	window.onmousedown = function(mouseEvent) {
	    console.log(mouseEvent.button);  //<- Error
	};

此处TS会进行反向推断 也就是自左向右，依据上下文推断mouseEvent类型，因此，就能推断出mouseEvent参数的类型了。 如果函数表达式不是在上下文类型的位置，mouseEvent参数的类型需要指定为any，这样也不会报错了

如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。 重写上面的例子：

	window.onmousedown = function(mouseEvent: any) {
	    console.log(mouseEvent.button);  //<- Now, no error is given
	};

这样就屏蔽了上下文推断