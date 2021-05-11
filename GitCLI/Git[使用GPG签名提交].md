## 生成密钥对

按照 github 官方指南生成密钥对即可，长度必须为 4096，不要用默认的 2048

## 安装基础件

如果安装了 gitbash 或者 cmder 这些终端工具，就不需要安装任何基础套件，安装了之后反而会导致存在多个 gpg 程序，需要你自己对应环境变量去匹配使用，否则将导致秘钥导入不生效的问题；

如果你已经安装了 gitbash 并且也单独安装了 gnugp/gpg4win，则可以用 everything 搜一下`gpg.exe`有几个，然后检查环境变量，把多余的 gpg 程序环境变量删除掉，在全局环境变量中，保证只能所引导一个 gpg.exe 程序，否则可能会导致混乱

- gnupg ：提供 gpg 命令
- gpg4win ：提供操作的 GUI 图形，如果纯粹使用 CLI 的话，这个东西可以不要

## 导入秘钥

CLI 操作（没成功）：

```js
// 公钥私钥一起导入了，也可以分开导入
gpg  --import ./git_gpgkey_pub.gpg ./git_gpgkey_sec.gpg
// 将导入的私钥设置为授信的:编辑秘钥，进入交互模式
gpg --edit-key 971616154@qq.com
// 设置授信
commond > trust
// 不限制
commond > 5
// 保存退出
commond > save
```

GUI 操作：使用 GUI 操作导入公钥私钥然后右键设置已认证即可（自己测试使用 GUI 成功完成提交），CLI 不知道为什么没成功

## 修改 git 提交配置

增加如下配置

```ini
; .git/config 文件
[user]
; name指gpg签名生成时你填的名字
    name = WeiHong Ran
; email指gpg签名生成时你填的邮箱
    email = 971616154@qq.com
; signingkey指公钥ID的后八位，或者说指纹的后八位
    signingkey = 4020AEF0
[commit]
; 此处gpgSign的值可为true或者false，true指开启gpg签名
    gpgSign = true
[gpg]
; 这里 program 的位置是 Gpg4win 安装时的默认位置，斜线需要转义
	program = c:\\Program Files (x86)\\gnupg\\bin\\gpg.exe
```
