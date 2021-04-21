<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [读取配置文件](#%E8%AF%BB%E5%8F%96%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-04 23:23:53
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-04 23:39:28
 * @Description: Nothing
 -->
## 读取配置文件

在 java 中配置文件一般可以写成如下形式

    dbname=test
    user=root
    pwd=root
    port=3306

在 javaWeb 项目中，一般不使用路径+FileInputStream 的形式进行读入，一般采用如下形式进行读入：

```
#properties文件内容，配置文件放置在src下时可直接书写名称，如果放置在包下，则需要根据包路径进行索引

username=root
passwrod=root

#读取栗子

@Test
public void readConfig() {
    Properties properties = new Properties();
    InputStream is = TestMysql.class.getClassLoader().getResourceAsStream("db.properties");
    # 带有路径的读取
    #InputStream is = TestMysql.class.getClassLoader().getResourceAsStream("com/nanami52/config/db.properties");
    try {
        properties.load(is);
        System.out.println(properties.getProperty("username"));
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
