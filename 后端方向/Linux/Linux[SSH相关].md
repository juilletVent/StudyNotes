## Linux 设置免密登录以及屏蔽密码登录

配置文件位置：`/etc/ssh/sshd_config`

### 1. 设置免密登录

1. 生成密钥对
2. 将公钥追加拷贝到目标机器的`~/.ssh/authorized_keys`文件中
3. 修改配置文件：`PubkeyAuthentication yes`
4. 修改配置文件：`RSAAuthentication yes`
5. 重启 ssh 服务：`sudo service ssh restart`

### 2. 屏蔽密码登录

1. 修改配置文件：`PasswordAuthentication no`
2. 修改配置文件：`ChallengeResponseAuthentication no`
3. 修改配置文件：`UsePAM no`
4. 重启 ssh 服务：`sudo service ssh restart`
