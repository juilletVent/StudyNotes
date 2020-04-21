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