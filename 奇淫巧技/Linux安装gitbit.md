1.创建Gitblit安装目录

首先我们将在我们的服务器上建立一个目录，并在该目录下安装最新的Gitblit。

$ sudo mkdir -p /opt/gitblit
$ cd /opt/gitblit
创建gitblit目录

2. 下载并解压

现在，我们将从Gitblit官方站点下载最新版的Gitblit。这里我们将安装1.6.2版本。所以，请在安装时根据具体的版本对命令进行修改。

$ sudo wget http://dl.bintray.com/gitblit/releases/gitblit-1.6.2.tar.gz
下载gitblit安装包

接下来，我们将下载到的tar压缩包解压至之前创建的目录 /opt/gitblit/

$ sudo tar -zxvf gitblit-1.6.2.tar.gz
解压gitblit压缩包

3.配置并运行

现在，我们将对Gitblit进行配置。如果你想要定制Gitblit的行为，你可以修改gitblit/data/gitblit.properties。在完成配置后，我们将运行安装好的gitblit。有两种方式来运行gitblit，第一种是通过下面的命令手动运行：

$ sudo java -jar gitblit.jar --baseFolder data
另一种是将gitblit添加为服务。下面是在linux下将gitblit添加为服务的步骤。

由于我在使用Ubuntu，下面的命令将是 sudo cp service-ubuntu.sh /etc/init.d/gitblit，所以请根据你的发行版修改文件名service-ubuntu.sh为相应的你运行的发行版。

$ sudo ./install-service-ubuntu.sh
$ sudo service gitblit start
启动gitblit服务

在你的浏览器中打开http://localhost:8080或https://localhost:8888，也可以将localhost根据本地配置替换为IP地址。输入默认的管理员凭证：admin / admin并点击login按钮。

gitblit欢迎页面

现在，我们将添加一个新的用户。首先，你需要以admin用户登录，username = admin，password = admin。

然后，点击用户图标 > users > (+) new user 来创建一个新用户，如下图所示。

添加新用户

现在，我们将创建一个开箱可用的仓库。点击 repositories > (+) new repository。然后，如下图所示添加新的仓库。

添加新的仓库

使用命令行创建一个新的仓库

touch README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin ssh://arunlinoxide@localhost:29418/linoxide.com.git
git push -u origin master
请将其中的用户名arunlinoxide替换为你添加的用户名。

在命令行中push一个已存在的仓库

git remote add origin ssh://arunlinoxide@localhost:29418/linoxide.com.git
git push -u origin master
注意：强烈建议所有人修改用户名“admin”的密码。