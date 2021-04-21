<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [第十四章 网络编程](#%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0-%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B)
    - [强大的网络模块 urllib与urllib2](#%E5%BC%BA%E5%A4%A7%E7%9A%84%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%9D%97-urllib%E4%B8%8Eurllib2)
    - [socket 服务端编写](#socket-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E7%BC%96%E5%86%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 第十四章 网络编程

相关的一些模块索引：

<img src="./img/网络相关模块.png">


与windows网络编程概念概念一致，都是基于sockte api

> 创建服务端代码

    # coding=utf-8

    import socket

    server = socket.socket();

    hostname = socket.gethostname()
    port = 9979

    server.bind(('127.0.0.1',port))
    server.listen(5)

    print 'server is started.'

    while True:
        client,addr = server.accept()

        print 'got a client'+str(addr)

        client.send('thx you connect,byebye')
        client.close()


> 创建客户端代码

    # coding=utf-8

    import socket

    client = socket.socket()
    hostname = socket.gethostname()

    client.connect(('127.0.0.1',9979))

    print client.recv(2014)

#### 强大的网络模块 urllib与urllib2

这两个模块可以将网络地址像本地文件一样打开，一个小例子：

    from urllib import urlopen
    webpack = urlopen('http://www.baidu.com')
    data = webpack.readlines()
    print data

    # 另外一个保存网页的栗子：
    webpack = urllib.urlopen('http://www.baidu.com')
    data = webpack.readlines()
    fp = open('/Users/ran/Desktop/testfile','w')
    for line in data:
        fp.write(line)
        # print line
    fp.flush()
    fp.close()


> 将文件下载到本地

    # 将网络文件下载到本地
    urllib.urlretrieve('http://www.baidu.com','/Users/ran/Desktop/baidu.html')
    # 这个函数返回了一个元组（文件名，header）header含有远程文件的一些信息


#### socket 服务端编写

搜索关键字： socketServer、fork模式 多线程模式 异步io


