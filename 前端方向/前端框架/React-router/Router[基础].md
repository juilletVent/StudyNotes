# 路由基础

> 安装

yarn add react-router-dom --save

npm i react-router-dom --save

## 概念

> 路由分类

- Router:根路由容器，其他类型路由在此基础之上封装
- HashRouter：使用shape作为路由前缀，在不支持historyAPI的浏览器中使用 
- BrowserRouter：使用H5 HistoryAPI进行路由控制，路径中没有sharp，IE10+支持
- MemoryRoute：非浏览器环境使用，内存路由


> Nav 连接

- Link:简单导航，最终生成a标签，用于切换导航
- NavLink:Link的加强版本，提供了activeClassName、activeStyle、isActive等选项用于对active进行处理

> Redirect[重定向]

- Redirect:重定向路由->只要此组件被渲染，则执行重定向，通常配合switch或者exact属性使用，一般放在匹配规则的最后面[容错路由]


> View/容器类

- Reute：等同于ng-view/reouter-view，用于呈现路由匹配时渲染的内容，使用component或者render函数渲染
- Switch:Route的容器，用于单一匹配，所有的Route都会对url进行匹配，而不论是否已经有Route已经匹配成功，这时我们就需要Switch提供一个匹配顺序，在Switch包裹的Route匹配列表中，从上至下Switch只要发现有Route匹配成功了，就不会再向下进行Route的匹配


#### 严格匹配

- exact:true，严格匹配当前路径，仅有当路径完全相等才渲染，否则，只要当前路径匹配模式匹配成功就进行渲染
- strict:true，定义是否匹配末尾的slash斜线,如果指定为true，则必须匹配slash
- sensitive：true 大小写敏感





