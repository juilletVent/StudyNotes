# Iterator

## 概念

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

> Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

## 默认 Iterator 接口

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）


栗子：

	const obj = {
	  [Symbol.iterator] : function () {
	    return {
	      next: function () {
	        return {
	          value: 1,
	          done: true
	        };
	      }
	    };
	  }
	};