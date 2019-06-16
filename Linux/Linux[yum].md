## yum 在线依赖管理

### query

指令：

	yum [list|info|search|provides|whatprovides]

- y ：执行过程中询问的响应：yes
- --installroot=/some/path 改变软件默认安装路径
- search 搜索某个软件
- list 全部yum软件
- info 与list差不多 但是信息更全
- provides 依据文件查询软件归属


### install & update

- install ：后面接要安装的软件！
- update ：后面接要升级的软件，若要整个系统都升级，就直接 update 即可

### uninstall

- yum remove 'app name'

### 群组

- grouplist ：列出所有可使用的『套件组』，例如 Development Tools 乀类的；
- groupinfo ：后面接 group_name，则可了解该 group 内吨的所有套件名；
- groupinstall：这个好用！可以安装一整组的套件群组，相当的丌错用！
- groupremove ：移除某个套件群组；

	yum grouplist
	yum groupinstall 'dev tootls'


### 换源

首先备份源文件

	mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

下载yum源文件，注意版本不要错，不然完蛋

	wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

建立缓存

	yum makecache