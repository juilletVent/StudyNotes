## 生成密钥对

按照 github 官方指南生成密钥对即可，长度必须为 4096，不要用默认的 2048

## 安装基础件

- gnupg （必须）：提供 gpg 命令
- gpg4win （可选的 GUI）：提供操作的 GUI 图形，如果纯粹使用 CLI 的话，这个东西可以不要

Tips：不需要安装任何附加组件如果你安装了 gitbash 或者 cmder，他们都是都有 gpg 套件的

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
// 退出
commond > exit
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
