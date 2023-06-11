## 使用 Docker 部署 gitlab

推荐配置：4G 内存以上，2C 机器

## 流程如下

确定已经安装好 docker 和 docker-compose

新建 docker-compose 文件，内容如下：

```yaml
version: "3"
services:
  gitlab-production:
    container_name: gitlab-production
    image: gitlab/gitlab-ce
    restart: always
    ports:
      - "10980:80"
      - "10443:443"
      - "10022:22"
    volumes:
      - "/root/gitlab-data/etc/gitlab:/etc/gitlab"
      - "/root/gitlab-data/var/log/gitlab:/var/log/gitlab"
      - "/root/gitlab-data/var/opt/gitlab:/var/opt/gitlab"
    privileged: true
```

执行 `docker-compose up -d` 启动 gitlab

然后修改 gitlab.rb 文件，内容如下：

```ruby
# 如果使用公有云且配置了域名了，可以直接设置为域名，如下
# external_url 'http://gitlab.redrose2100.com'
# 如果没有域名，则直接使用宿主机的ip，如下
external_url 'http://192.168.6.225'
# 同样如果有域名，这里也可以直接使用域名
# gitlab_rails['gitlab_ssh_host'] =  'gitlab.redrosee2100.com'
# 同样如果没有域名，则直接使用宿主机的ip地址
gitlab_rails['gitlab_ssh_host'] = '192.168.6.225'
# 端口为启动docker时映射的ssh端口
gitlab_rails['gitlab_shell_ssh_port'] = 22
# 设置时区为东八区，即北京时间
gitlab_rails['time_zone'] = 'Asia/Shanghai'

# 关于邮箱的配置
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.163.com"   # 邮箱服务器
gitlab_rails['smtp_port'] = 465    # 邮箱服务对应的端口号
gitlab_rails['smtp_user_name'] = "hitredrose@163.com"   # 发件箱的邮箱地址
gitlab_rails['smtp_password'] = "xxxxxxxxxxx"      # 发件箱对应的授权码，注意不是登录密码，是授权码
gitlab_rails['smtp_domain'] = "163.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = 'hitredrose@163.com'     # 发件箱地址
gitlab_rails['gitlab_email_display_name'] = 'gitlab.redrose2100.com'    # 显示名称
gitlab_rails['gitlab_email_reply_to'] = 'noreply@example.com'     # 提示不要回复
```

重启 Docker，执行 `docker-compose restart`，然后就可以访问了

## 查看 root 用户的默认密码

```
cat /root/gitlab-data/etc/gitlab/initial_root_password
```
