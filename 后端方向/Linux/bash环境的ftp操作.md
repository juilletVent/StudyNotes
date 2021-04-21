<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [通过CURL完成ftp的相关操作](#%E9%80%9A%E8%BF%87curl%E5%AE%8C%E6%88%90ftp%E7%9A%84%E7%9B%B8%E5%85%B3%E6%93%8D%E4%BD%9C)
    - [一、列出文件目录列表](#%E4%B8%80%E5%88%97%E5%87%BA%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95%E5%88%97%E8%A1%A8)
    - [二、下载文件](#%E4%BA%8C%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6)
    - [三、上传单个文件](#%E4%B8%89%E4%B8%8A%E4%BC%A0%E5%8D%95%E4%B8%AA%E6%96%87%E4%BB%B6)
    - [四、从服务器上删除文件](#%E5%9B%9B%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E5%88%A0%E9%99%A4%E6%96%87%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 通过CURL完成ftp的相关操作

#### 一、列出文件目录列表

    curl ftp://malu.me/ --user name:passwd
    curl ftp://malu.me/ –u name:passwd    #简洁写法
    curl ftp://name:passwd@malu.me         #简洁写法2

#### 二、下载文件

    # 单个
    curl ftp://malu.me –u name:passwd -s
    # 多个，curl不支持递归下载，不过可以用数组方式下载文件，比如我们要下载1-10.gif连续命名的文件
    curl –u name:passwd ftp://malu.me/img/[1-10].gif –O #O字母大写

#### 三、上传单个文件

    curl –u name:passwd -T size.mp3 ftp://malu.me/mp3/

#### 四、从服务器上删除文件

    curl –u name:passwd ftp://malu.me/ -X 'DELE mp3/size.mp3'

tips: 上传时，尽量使用cmder、cmd进行，gitbash稍微有点儿问题

tips2:使用bash脚本编写命令时，注意路径分隔符与ftp url协议头中的 “/”,协议中的符号需要使用正斜线，路径分隔符则可能需要转义，尤其是windows系统，举个栗子：

    
    cd C:\\Users\\97161\\Desktop
    curl -u july:sweet12369 -T backup.sh ftp://211.149.248.155/