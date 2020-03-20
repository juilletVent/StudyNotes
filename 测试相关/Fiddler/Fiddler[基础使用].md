## 全局断点

点击菜单栏 rules-> automatic breakpoint  ->before requests

然后所有的请求都会被断下，点击工具栏的“Go”可以释放断点

## 独立断点

使用命令设置独立断点，可以统配、包含、精准匹配

- Bpafter xxx: 中断  URL  包含指定字符的全部  session  响应
- Bps xxx: 中断 HTTP 响应状态为指定字符的全部 session 响应
- Bpv xxx: 中断指定请求方式的全部  session  响应
- Bpm xxx: 中断指定请求方式的全部  session  响应 、、同于 bpv xxx
- Bpu xxx:与bpafter类似

ps:一般使用bpu就够用了

## 自动响应（重点）

自动响应可以自动完成对特定请求的响应篡改

1. 点击右侧面板的 AutoResponder
2. 选中左侧log面板中的目标请求，点击右侧AutoResponder面板下方的AddRule按钮添加一条响应规则
3. 点击AutoResponder面板最下方的"Local File to return..."，展开后选择find项，然后选择你要响应的数据即可
4. 点击右侧的save
5. 最后点击顶部的enable rules 即可完成自动响应