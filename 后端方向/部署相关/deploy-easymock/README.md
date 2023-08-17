## 注意点

1. 启动前，需要先修改`easymock-data`文件夹下的权限，docker 默认以非 root 权限启动，如果目录不具备写权限，则启动会失败，修改为 777 权限即可，或者给到启动用户适当的权限即可。
2. 启动成功后，接口预览会失败，处理方法如下：

```bash
# 将容器中的index.html文件拷贝到宿主机进行修改
docker cp deploy-easymock_web_1:/home/easy-mock/easy-mock/node_modules/restc/faas/index.html ./
# 修改index.html文件
# 将：https://github.elemecdn.com/highlightjs/cdn-release/9.8.0/build/highlight.min.js
# 替换成 https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js
# 然后将修改后的文件拷贝回容器
docker cp index.html deploy-easymock_web_1:/home/easy-mock/easy-mock/node_modules/restc/faas/index.html
# 也可以直接用修改好的文件替换容器中的文件
# 重启服务
docker-compose restart
```
