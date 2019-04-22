#!/bin/bash

groupadd sftp
useradd -m -s /bin/nologin -g sftp sftp
chmod 755 /home/sftp
chown root /home/sftp
mkdir -p /home/sftp/upload
chown -R sftp:sftp /home/sftp/upload
chmod -R 755 /home/sftp/upload

exit 0

#Subsystem    sftp    /usr/libexec/openssh/sftp-server    --注释
Subsystem     sftp     internal-sftp         --新增
Match    Group    sftp                       --新增
ChrootDirectory    %h                        --新增，%h为用户主目录的意思
# Example of overriding settings on a per-user basis 
#Match User anoncvs 
X11Forwarding no --取消注释 
AllowTcpForwarding no --取消注释
# PermitTTY no 
ForceCommand internal-sftp --修改

修改后重启sshd服务
