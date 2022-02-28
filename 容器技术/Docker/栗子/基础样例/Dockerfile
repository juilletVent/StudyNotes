# 基础依赖Centos的镜像
FROM centos
# 作者
MAINTAINER julyWind
# 写入ll命令别名
RUN echo alias ll="\"ls -l --color\"" >> /root/.bashrc
# 更新 & 安装
RUN yum update -y & yum install wget vim net-tools openssl -y
# 入口执行的命令，数组最终采用空格进行连接，生成一条命令：/usr/sbin/nginx -g deamon off;
# ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]
# 循环shell命令，保持容器不退出
ENTRYPOINT ["/bin/bash","-c","while true;do echo hello docker;sleep 1;done"]
# 暴露80端口
EXPOSE 80 443 3306 21 22