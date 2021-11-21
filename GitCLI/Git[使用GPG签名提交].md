<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [生成密钥对](#%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5%E5%AF%B9)
- [安装基础件](#%E5%AE%89%E8%A3%85%E5%9F%BA%E7%A1%80%E4%BB%B6)
- [导入秘钥](#%E5%AF%BC%E5%85%A5%E7%A7%98%E9%92%A5)
  - [使用 CLI 操作](#%E4%BD%BF%E7%94%A8-cli-%E6%93%8D%E4%BD%9C)
  - [GUI 操作](#gui-%E6%93%8D%E4%BD%9C)
- [单个项目配置](#%E5%8D%95%E4%B8%AA%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
- [全局配置 GPG 提交](#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE-gpg-%E6%8F%90%E4%BA%A4)
  - [全局配置文件](#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
- [开启提交代理](#%E5%BC%80%E5%90%AF%E6%8F%90%E4%BA%A4%E4%BB%A3%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 生成密钥对

按照 github 官方指南生成密钥对即可，长度必须为 4096，不要用默认的 2048

## 安装基础件

如果安装了 gitbash 或者 cmder 这些终端工具，就不需要安装任何基础套件，安装了之后反而会导致存在多个 gpg 程序，需要你自己对应环境变量去匹配使用，否则将导致秘钥导入不生效的问题；

如果你已经安装了 gitbash 并且也单独安装了 gnugp/gpg4win，则可以用 everything 搜一下`gpg.exe`有几个，然后检查环境变量，把多余的 gpg 程序环境变量删除掉，在全局环境变量中，保证只能所引导一个 gpg.exe 程序，否则可能会导致混乱

- gnupg ：提供 gpg 命令
- gpg4win ：提供操作的 GUI 图形，如果纯粹使用 CLI 的话，这个东西可以不要

## 导入秘钥

### 使用 CLI 操作

**非常重要：一定要明确这里使用的 gpg.exe 到底是什么位置提供的，在 gitconfig 文件中必须配置为一样的 gpg 程序路径，才能正确识别到 gpg 秘钥，不同程序会创建不同的秘钥库，并不共通,如果提交时出现下面的错误，基本判断为导入秘钥操作与 git 配置的 gpg 程序不是同一个 exe 文件，导致秘钥导入无效所产生的**

```
gpg: skipped "4020AEF0": No secret key
```

```bash
# 导出
gpg --output mygpgkey_pub.gpg --armor --export 375A500B
gpg --output mygpgkey_sec.gpg --armor --export-secret-key 375A500B
# 导入
gpg --import ~/mygpgkey_pub.gpg
gpg --allow-secret-key-import --import ~/mygpgkey_sec.gpg


# 公钥私钥一起导入了，也可以分开导入
gpg  --import ./git_gpgkey_pub.gpg ./git_gpgkey_sec.gpg
# 将导入的私钥设置为授信的:编辑秘钥，进入交互模式，使用邮箱或者ID进入，都可以
gpg --edit-key youemail
gpg --edit-key 8BF6A83D4F8FE1957D86E5903D61B9364020AEF0
# 设置授信
commond > trust
# 不限制
commond > 5
# 保存退出
commond > save
```

### GUI 操作

使用 GUI 操作导入公钥私钥然后右键设置已认证即可,然后找到 gui 安装目录下 gpg.exe 所有的目录，将该目录配置到 gitconfig 中即可，gui 程序也是对上面 CLI 操作步骤的封装，实质上是一样的

## 单个项目配置

增加如下配置

```ini
; .git/config 文件
[user]
; name指gpg签名生成时你填的名字
    name = WeiHong Ran
; email指gpg签名生成时你填的邮箱
    email = youemail
; signingkey指公钥ID的后八位，或者说指纹的后八位
    signingkey = 4020AAAA
[commit]
; 此处gpgSign的值可为true或者false，true指开启gpg签名
    gpgSign = true
[gpg]
; 这里 program 的位置是 Gpg4win 安装时的默认位置，斜线需要转义
; 非常重要：这里的程序必须与你上面导入秘钥所使用的的gpg.exe程序是同一个，不然就会导致秘钥找不到
; 类似报错：gpg: skipped "4020AEF0": No secret key
	program = c:\\Program Files (x86)\\gnupg\\bin\\gpg.exe
```

## 全局配置 GPG 提交

按顺序执行以下命令开启全局 GPG 提交签名，不用再单独为每个项目配置 GPG 了：

```bash
# 由于是命令行模式，需要携带引号执行
# 设置GPG签名程序路径
git config --global gpg.program "c:\Program Files (x86)\gnupg\bin\gpg.exe"
# 设置你的昵称
git config --global user.name youname
# 设置你的邮箱（与证书的一致）
git config --global user.email youemail
# 指定用于签名的证书特征ID
git config --global user.signingkey BD9817AA
# 开启GPG签名
git config --global commit.gpgsign true
```

### 全局配置文件

文件位置：`用户家目录/.gitconfig`

配置样例：

```ini
; 关键配置，其他配置没有写进来
[user]
	name = youname
	email = youemail
	; 这里的key就是证书指纹，可以写全也可以只写一段，只要能索引的到就行
	signingkey = BD9817AA
[http]
	proxy = socks5://127.0.0.1:8887
[gpg]
	program = c:\\Program Files (x86)\\gnupg\\bin\\gpg.exe
[https]
	proxy = socks5://127.0.0.1:8887
[commit]
	gpgsign = true

```

## 开启提交代理

git 的代理请使用 socks5,不要使用 http(s) 代理

```bash
git config --global http.proxy socks5://127.0.0.1:8887
```
