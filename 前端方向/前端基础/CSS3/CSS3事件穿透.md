<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [点击事件穿透](#%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6%E7%A9%BF%E9%80%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 点击事件穿透

使用CSS3 属性 pointer-events:none

> pointer-events直译为指针事件，当把值设置为none后，他有如下相关特性。

阻止用户的点击动作产生任何效果
阻止缺省鼠标指针的显示
阻止CSS里的hover和active状态的变化触发事件
阻止JavaScript点击动作触发的事件
一条CSS可以做许多事情是不是很神奇，我们在看一下兼容性情况如何。

- IE 　11+
- Firefox 　3.6＋
- Chrome　4.0+
- Safari　　6.0
- Opera　 15.0
- iOS Safari 6.0
- Android Browser　2.1+
- Android Chrome　18.0+

在许多网站上过节的时候页面最上层会用canvas绘制的雨、雪花，避免这些悬浮物遮挡住页面从而影响鼠标点击，可以使用pointer-events=none属性，让这些上方的canvas不会遮挡鼠标事件，让鼠标事件可以穿透上方的canvas来点击页面

**注：但是兼容性很差**