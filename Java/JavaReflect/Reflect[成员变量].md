## Field 成员变量

#### 成员变量的获取

~~~
clazz.getFields(); // 所有公开属性
clazz.getDeclaredFields(); // 取得所有声明的属性
clazz.getField("fieldName"); // 取得某个公开的属性
clazz.getDeclaredField("fieldName") // 获取声明的属性，不论公开与否
~~~

#### 值得获取与设置

取得field后可以使用field调用相关api对某一个对象实例属性进行赋值，如果是私有属性，则需要先设置其可以访问才能进行取值、赋值操作：

~~~
// 设置操作权限
field.setAccessible(true);
Field.setAccessible(fieldObjs,true); //fieldObjs为Field实例数组，同时设置一组field的访问权限
// 取值
filed.get(obj)
// 赋值
filed.set(obj,val)
~~~