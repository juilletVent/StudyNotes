<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [FTP服务器配置时注意](#ftp%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E6%97%B6%E6%B3%A8%E6%84%8F)
  - [说明](#%E8%AF%B4%E6%98%8E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# FTP服务器配置时注意

在配置FTP服务器时，开放运营商以及防火墙20-22端口

配置FTP服务器PASV端口浮动 例如5000-5009，然后再运营商以及防火墙开放这些端口 否则无法连接

否则配置服务器FTP为PROT模式，开放20-22端口即可

所有FTP服务器软件都支持PORT方式。大部分FTP服务器软件PORT方式和PASV方式都支持。Serv-U默认配置下两种方式都支持。**如果要关闭PASV方式，请打开Serv-U，进入 Domains -> user.dns0755.net -> Settings -> Advanced -> 把“Allow passive mode data transfers”前面的钩去掉。**

**在 Serv-U的Local Server -> Settings -> Advanced -> PASV port range里，填入给PASV模式使用的本地端口范围，如60000-60020。请把端口范围限制在20个以内。之后，再在windows防火墙里打开这个范围的端口就可以了。**

## 说明

FTP的两种连接模式：Port模式和Pasv模式

FTP是File Transfer Protocol（文件传输协议）的缩写，用来在两台计算机之间互相传送文件。相比于HTTP，FTP协议要复杂得多。复杂的原因，是因为FTP协议要用 到两个TCP连接，一个是命令链路，用来在FTP客户端与服务器之间传递命令；另一个是数据链路，用来上传或下载数据。
FTP协议有两种工作方式：PORT模式和PASV模式，中文意思为主动式和被动式。

PORT（主动）模式的连接过程是：客户端向服务器的FTP端口（默认是21）发送连接请求，服务器接受连接，建立一条命令链路。

工作原理：当需要传送数据时，客户端在命令链路上用 PORT命令告诉服务器：“我打开了XX端口，你过来连接我”。当服务端收到这个Port命令后就会向客户端打开的那个端口发送连接请求，建立一条数据链路来传送数据。

PASV（被动）模式的连接过程是：客户端向服务器的FTP端口（默认是21）发送连接请求，服务器接受连接，建立一条命令链路。

工作原理：需要传送数据时，服务器在命令链路上用 PASV命令告诉客户端：“我打开了XX端口，你过来连接我”。当客户端收到这个信息后，就可以向服务端的端口发送连接请求，建立一条数据链路来传送数据。

从上面的解释中可以看出，两种模式的命令链路连接方法是一样的，而数据链路的建立方法就完全不同。对于Port模式，是客户端在本地打开一个端口等服务端去连接建立数据连接；而Pasv模式就是服务端打开一个端口等待客户端去建立一个数据连接。FTP的复杂性就在于此。
 
PORT模式:当数据传输时，客户端建立套接字接听。绑定port中的端口。服务器中使用的端口是20；

PASV模式：当数据传输时，服务端建立套接字接听。客户端去连接pasv中指定的端口。这时候服务器端用的端口不是20，而是pasv中的端口。