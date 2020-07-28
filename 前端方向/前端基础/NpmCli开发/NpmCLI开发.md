## Npm CLI 工具开发流程

1、创建 package.json，同正常项目一致，但是需要额外添加 bin、main，标准 CLI 入口在哪里：

package.json 样例:

```json
{
  "name": "sl",
  "version": "1.0.0",
  "description": "test command cli",
  "bin": "bin/sl.js",
  "main": "bin/sl.js",
  "license": "MIT",
  "dependencies": {
    "@types/node": "^14.0.26",
    "commander": "^6.0.0",
    "shelljs": "^0.8.4"
  },
  "repository": "https://dsa.com",
  "author": "july",
  "private": "false"
}
```

2、创建如下项目结构：

```
├─ bin # 指令存放位置
│  └─ test.js
├─ lib # 指令实现/支撑存放位置
│  ├─ commands #指令实现
│  └─ utils # 工具集
├─ package.json
├─ README.md
└─ yarn.lock
```

3、安装指令插件依赖：commander：`yarn add commander`

4、在 bin 下创建测试指令 sl.js，内容如下：

```javascript
// 这一句非常重要，他标注了yarn/npm生成相关的bat/shell脚本时实际运行时所使用的运行环境，如果不写。运行指令时将直接打开指令js文件
#!/usr/bin/env node
// 为运行时的node添加额外的环境变量
// #!/usr/bin/env node --max_old_space_size=6144
// 如果是Python脚本的话
// #!/usr/bin/env python

const program = require("commander");
const child_process = require("child_process");
const appInfo = require("../package.json");

program
  .version(appInfo.version) // 拿到 package.json 你定义的版本
  // 定义你的子command，对应指令文件名:sl-list.js
  .command("list [-a]")
  // 定义list子指令别名
  .alias('ls')
  .description("打印当前的文件列表") // 描述
  // 不知道为什么不能注册以字母a开头的option选项
  // .option("-a, --all", "显示所有的文件")
  .option("-rbq, --rbqrbq", "逗号前面是选项简写，后面是选项全称")
  // 需要传值的参数
  .option("-p, --path <path>", "显示所有的文件")
  .action(function(cmd) {
    // console.log("cmd", cmd);
    let commond = "ls -l";
    // 实际取值使用全称取值
    if (cmd.rbqrbq) {
      commond += "a";
    }
    child_process.execSync(commond, { stdio: "inherit" });
  })
  .on("--help", function() {
    // --help  commander 有默认处理，一般这部分无事可做，你还想干啥？
  })
  .parse(process.argv);
```

新建子指令文件 sl-list.js

```javascript
#!/usr/bin/env node

const program = require("commander");
const child_process = require("child_process");
const appInfo = require("../package.json");

program
  .option("-rbq, --惹不起", "显示所有的文件")
  .option("-p, --path <path>", "显示所有的文件")
  .action(function(args) {
    // 执行cli的command
    console.log("这是子指令");

    let commond = "ls";
    if (args.all) {
      commond += " -a";
    }
    child_process.execSync(commond, { stdio: "inherit" });
  })
  .parse(process.argv);
```

5、安装测试：

安装：`yarn global add file:项目所在目录的绝对全路径，含盘符，不需要转义`

测试：

    sl
    sl rbqrbq
    # 子指令测试
    sl list

## 总结

总体来说开发 cli 工具并不复杂，需要注意的点有以下几个：

1. 指令 js 文件需要指定 node 运行环境:`#!/usr/bin/env node`，如果你编写的是 python 或者其他语言的脚本，则需要对应定义运行环境，否 yarn 或者 npm 在安装时生成执行脚本入口的时候会直接生成打开文件的语句，造成安装失败
2. 子指令需要拆分定义，有一个约定：commond 方法定义的子指令文件名规则为:`指令名-子指令名.js`
3. 指令参数选项 option 有一个坑：不能使用以字母 a 开头的 option 名称，不知道是为什么，姿势有问题？
