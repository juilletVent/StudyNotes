<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [装饰器栗子](#%E8%A3%85%E9%A5%B0%E5%99%A8%E6%A0%97%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 装饰器栗子

```ts
function testA() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const getName = descriptor.value;
    descriptor.value = function () {
      console.log("HOC before");
      getName.apply(this);
      console.log("HOC after");
    };
    return descriptor;
  };
}

function format(target: Object, propertyName: string) {
  // 属性值
  let _val = target[propertyName];

  // 属性读取访问器
  const getter = () => {
    const d = new Date(_val);
    console.log(`Get: ${propertyName} => ${_val}`);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };

  // 属性写入访问器
  const setter = (newVal) => {
    console.log(`Set: ${propertyName} => ${newVal}`);
    _val = newVal;
  };

  // 删除属性
  if (delete target[propertyName]) {
    // 创建新属性及其读取访问器、写入访问器
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
}

class Greeter {
  @format
  time = 0;
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }

  @testA()
  getName() {
    console.log(this.hello);
  }
}

const aaa = new Greeter("BBBBBB");
aaa.time = Date.now();
console.log(aaa.time);
aaa.getName();
```
