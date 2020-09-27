## 全局断点

点击菜单栏 rules-> automatic breakpoint ->before requests

然后所有的请求都会被断下，点击工具栏的“Go”可以释放断点

## 独立断点

使用命令设置独立断点，可以统配、包含、精准匹配

- Bpafter xxx: 中断 URL 包含指定字符的全部 session 响应
- Bps xxx: 中断 HTTP 响应状态为指定字符的全部 session 响应
- Bpv xxx: 中断指定请求方式的全部 session 响应
- Bpm xxx: 中断指定请求方式的全部 session 响应 、、同于 bpv xxx
- Bpu xxx:与 bpafter 类似

ps:一般使用 bpu 就够用了

## 自动响应（重点）

自动响应可以自动完成对特定请求的响应篡改

1. 点击右侧面板的 AutoResponder
2. 选中左侧 log 面板中的目标请求，点击右侧 AutoResponder 面板下方的 AddRule 按钮添加一条响应规则
3. 点击 AutoResponder 面板最下方的"Local File to return..."，展开后选择 find 项，然后选择你要响应的数据即可
4. 点击右侧的 save
5. 最后点击顶部的 enable rules 即可完成自动响应

## Logo 过滤

在 filters 面板中勾选 Hide if URL contains 规则填入下面的规则，并开启 filter 即可过滤资源文件

    REGEX:(?insx)/[^\?/]*\.(css|ico|jpg|png|gif|bmp|wav|js|jpeg)(\?.*)?$
