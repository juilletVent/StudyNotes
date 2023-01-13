## 创建附注标签

```shell
git tag -a v1.2.6 -m "这是 v1.2.6 版本，发布于2023-01-13 11:47:22，发布人：xxxx"
```

## 推送本地标签到远端

```shell
# 推送指定tag
git push origin v1.0
# 推送所有Tag
git push origin --tags
```

## 删除本地 tag

```shell
git tag -d v0.1.2
```
