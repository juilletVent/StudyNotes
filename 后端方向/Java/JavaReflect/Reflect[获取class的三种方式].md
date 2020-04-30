## 获取Class的三种方式

    // 1.通过类名.class的方式
    Class clazz1 = Person.class; 
    // 2.通过对象. getClass()的方式
    Person person = new Person();
    Class clazz2 = person.getClass();
    // 3.Class类forName();获得 (推荐)
    Class clazz3 = Class.forName( "全路径类名，如：cn.nananmi52.utils");|
