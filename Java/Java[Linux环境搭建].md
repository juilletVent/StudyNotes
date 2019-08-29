## Linux下Java环境搭建

1. 下载JDK以及Tomcat
2. 移动至opt目录下，并解压
3. 修改/etc/profile,添加如下配置

    # 路径需要更换为自己的路径，不能照搬
    JAVA_HOME=/opt/jdk1.8.0_144 
    CLASSPATH=.:$JAVA_HOME/lib
    PATH=$PATH:$JAVA_HOME/bin

    export JAVA_HOME CLASSPATH PATH

4. 重载环境变量，执行

    source /etc/profile

5. tomcat项目部署，将项目wra包放置到tomca_home/webapps下即可，tomcat会自动解压加载
