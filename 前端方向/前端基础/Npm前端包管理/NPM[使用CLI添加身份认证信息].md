## 获取 Token

使用账号密码借助 npm api 接口获取 Token

```js
  /**
   * 获取Npm用户Token
   * @returns 用户Token
   */
  async getNpmToken() {
    try {
      const { data } = await axios.put(
        `http://192.168.2.10:8081/repository/front-product/-/user/org.couchdb.user:${this.user}`,
        {
          _id: `org.couchdb.user:${this.user}`,
          name: this.user,
          password: this.password,
          type: 'user',
          roles: [],
        }
      );
      this.token = data.token;
      return this.token;
    } catch (error) {
      ErrorHelper.throwError(ErrorCode.ERROR_NPM_LOGIN_FAILED, error.message);
    }
  }
```

## 配置 Token 信息

在使用 npm publish 命令时需要对应仓库的 Token 认证信息，可以使用 npm config 命令提前写入 npmrc 文件中来达到登录的效果：

```shell
# 始终携带Token（如果需要的话）
npm config set always-auth=true
# 设置Token
npm config set http://192.168.2.10:8081/repository/front-product/:_authToken=YOUR_NPM_TOKEN
```

此时，再执行需要登录的命令就会发现，不会再报 403 了，直接执行命令即可。
