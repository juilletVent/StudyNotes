# 模块

## 包结构

CommonJS模块描述中一个模块应包含如下的文件目录

```
模块描述文件
package.json
# 存放二进制文件
bin
# 存放Javascript代码
lib
# 存档文档
doc
# 存放单元测试用例代码
test
```

## package.json 模块描述详细

属性描述如下：

- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- keywords - 关键字
- maintainers - 包维护者列表，格式：[{"name":"jack","email":"93249@xxx.com","web":"https://xxxx.blog"}] ,npm通过此属性进行权限验证
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。格式同上
- bugs - bug反馈地址
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户- 安装它，然后require("express")配制成包入口文件即可
- license - 项目许可证 格式：[{"type":"GPLv2","url":"https://协议地址"}]
- os - 支持的操作系统
- cpu - 支持的cpu 列表
- engines - 支持的js引擎，有效的值：ejs flussferd epsee jsc spidermonky narwhal node v8
- builtin - 表明当前包是否是内建在底层系统的标准组件
- directories - 包目录结构
- implements 实现规范列表
- scripts - 脚本说明对象，主要包管理器用来安装、编译、测试、卸载包
- bin 表明此包的可执行文件，在使用包管理器进行安装后可以执行相关命令
- devDependencies - 开发时所需要使用的依赖
- 

> 本地安装

在某些时候无法通过网络安装包，或者本身就是一个离线包，则可以使用离线安装的方式进行安装:

    npm install <报名、url、含有package.json的本地目录>

> 更换安装源

    npm config set registry http://xxxx.org

  或者使用nrm插件来实现换源

## npm钩子命令

在scripts中存在钩子脚本定义位置，在安装以及卸载之前会先调用相关脚本进行前置或者清理工作

- preinstall 安装前的钩子
- intstall 安装
- uninstall 卸载前的钩子
- test 测试脚本

> 模块发布

    注册账号
    npm adduser
    发布包
    npm publish .
    查看本项目安装的npm包结构
    npm ls
    



