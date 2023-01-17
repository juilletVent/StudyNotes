<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [创建附注标签](#%E5%88%9B%E5%BB%BA%E9%99%84%E6%B3%A8%E6%A0%87%E7%AD%BE)
- [推送本地标签到远端](#%E6%8E%A8%E9%80%81%E6%9C%AC%E5%9C%B0%E6%A0%87%E7%AD%BE%E5%88%B0%E8%BF%9C%E7%AB%AF)
- [删除本地 tag](#%E5%88%A0%E9%99%A4%E6%9C%AC%E5%9C%B0-tag)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
