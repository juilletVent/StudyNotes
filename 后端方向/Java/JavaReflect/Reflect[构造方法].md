## 获取构造方法

栗子：

```
Class clazz = Class.forName("cn.nanami52.Utils");
// 获取无参构造
Constructor cons = clazz.getConstructor();
// 获取带参构造
Constructor consEx = clazz.getConstructor(String.class,Integer.Class);
Utils utils = (Utils)consEx.newInstance("name",0)
```
