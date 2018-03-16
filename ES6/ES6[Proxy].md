## Proxy 为对象设置代理

	var proxy = new Proxy(target, handler);

Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

	var proxy = new Proxy({}, {
	  get: function(target, property) {
	    return 35;
	  }
	});
	
	proxy.time // 35
	proxy.name // 35
	proxy.title // 35

	var handler = {
	  get: function(target, name) {
	    if (name === 'prototype') {
	      return Object.prototype;
	    }
	    return 'Hello, ' + name;
	  },
	
	  apply: function(target, thisBinding, args) {
	    return args[0];
	  },
	
	  construct: function(target, args) {
	    return {value: args[1]};
	  }
	};
	
	var fproxy = new Proxy(function(x, y) {
	  return x + y;
	}, handler);
	
	fproxy(1, 2) // 1
	new fproxy(1, 2) // {value: 2}
	fproxy.prototype === Object.prototype // true
	fproxy.foo === "Hello, foo" // true

#### get 

get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（即this关键字指向的那个对象），其中最后一个参数可选 **get方法的第三个参数receiver，总是为当前的 Proxy 实例。**

	var person = {
	  name: "张三"
	};
	
	var proxy = new Proxy(person, {
	  get: function(target, property) {
	    if (property in target) {
	      return target[property];
	    } else {
	      throw new ReferenceError("Property \"" + property + "\" does not exist.");
	    }
	  }
	});
	
	proxy.name // "张三"
	proxy.age // 抛出一个错误

**Tips：get方法可以继承**

> 下面的例子使用get拦截，实现数组读取负数的索引

	function createArray(...elements) {
	  let handler = {
	    get(target, propKey, receiver) {
	      let index = Number(propKey);
	      if (index < 0) {
	        propKey = String(target.length + index);
	      }
	      return Reflect.get(target, propKey, receiver);
	    }
	  };
	
	  let target = [];
	  target.push(...elements);
	  return new Proxy(target, handler);
	}
	
	let arr = createArray('a', 'b', 'c');
	arr[-1] // c

> 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作

	var pipe = (function () {
	  return function (value) {
	    var funcStack = [];
	    var oproxy = new Proxy({} , {
	      get : function (pipeObject, fnName) {
	        if (fnName === 'get') {
	          return funcStack.reduce(function (val, fn) {
	            return fn(val);
	          },value);
	        }
	        funcStack.push(window[fnName]);
	        return oproxy;
	      }
	    });
	
	    return oproxy;
	  }
	}());
	
	var double = n => n * 2;
	var pow    = n => n * n;
	var reverseInt = n => n.toString().split("").reverse().join("") | 0;
	
	pipe(3).double.pow.reverseInt.get; // 63

**注：如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。**

#### Set方法

set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为**目标对象、属性名、属性值和 Proxy 实例本身**，其中最后一个参数可选。

	let validator = {
	  set: function(obj, prop, value) {
	    if (prop === 'age') {
	      if (!Number.isInteger(value)) {
	        throw new TypeError('The age is not an integer');
	      }
	      if (value > 200) {
	        throw new RangeError('The age seems invalid');
	      }
	    }
	
	    // 对于满足条件的 age 属性以及其他属性，直接保存
	    obj[prop] = value;
	  }
	};
	
	let person = new Proxy({}, validator);
	
	person.age = 100;
	
	person.age // 100
	person.age = 'young' // 报错
	person.age = 300 // 报错


#### apply 方法

apply方法拦截**函数**的调用、call和apply操作 

apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

	var target = function () { return 'I am the target'; };
	var handler = {
	  apply: function () {
	    return 'I am the proxy';
	  }
	};
	
	var p = new Proxy(target, handler);
	
	p()
	// "I am the proxy"

#### construct

construct方法用于拦截new命令，下面是拦截对象的写法。

	var handler = {
	  construct (target, args, newTarget) {
	    return new target(...args);
	  }
	};

target: 目标对象

args：构建函数的参数对象

#### this问题

**代理的对象如果具备this依赖，则无法完成代理，原因是在对象内部this将指向Proxy对象而不是代理的对象本身**