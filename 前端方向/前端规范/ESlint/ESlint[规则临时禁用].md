## ESlint 代码规范检查临时禁用

### 针对某一段代码

针对某一段代码整体禁用规范检查,针对在 `/* eslint-disable */ 和 /* eslint-enable */` 之间的代码禁用检查，可以指定禁用的规则，如果不指定，则禁用全部规则：

```javascript
/* eslint-disable no-alert, no-console*/
alert("会爆出警告的alert");
console.log("会爆出警告的console");

// 不符合规范的if语句
if (true) {
  return;
} else {
  return;
}

/* eslint-enable */
```

### 针对整个文件

文件头部添加 `/* eslint-disable */`即可

### 针对某一行

- 禁用对当前行的检查：`eslint-disable-line`
- 禁用对下一行代码的检查：`eslint-disable-next-line`

```javascript
alert("foo"); // eslint-disable-line
// eslint-disable-next-line
alert("foo");
/* eslint-disable-next-line */
alert("foo");
alert("foo"); /* eslint-disable-line */
```

### 如果禁用的是某个插件的规则

如果要禁用的规则名称属于某个插件，比如要禁用`eslint-plugin-example` 的 `rule-name` 规则，那么规则名称就写成 `example/rule-name`

```javascript
foo(); // eslint-disable-line example/rule-name
foo(); /* eslint-disable-line example/rule-name */
```
