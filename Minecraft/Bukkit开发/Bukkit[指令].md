## 基础指令编写

#### 指令注册

```java
    public class PluginEntrance extends JavaPlugin {
        @Override
        public void onEnable() {
            super.onEnable();
            // getLogger().info("§2 myTest plugin has enabled.");
            getCommand().setExecutor(new TestCommand());
        }
    }
```

然后在 plugin.yml 中添加指令注册部分的说明：

```yml
name: test
main: cn.nanami52.TestCommond.TestCommondPlugin
description: 测试
author: july
version: 1.0
commands:
  # 指令名
  hello:
    # 指令描述
    description: 测试问候
    # 指令用法
    usage: /hello
```

#### 指令定义

创建一个类，实现接口`CommandExecutor`，实现方法 onCommand

```java

    public class TestCommond implements CommandExecutor {

        @Override
        public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
            if (sender instanceof Player) {
                Player player = (Player) sender;
                player.sendMessage(ChatColor.YELLOW + "Hello " + player.getName());
            }
            return true;
        }
    }
```

onCommand 参数解释：

- sender:命令发送者：玩家/命令方块/控制台
- cmd:
- label:命令本体
- args:参数

栗子：使用玩家发送 /hello july

那么：sender => 玩家，label：hello,args:[july]

#### 指令参数

```java

    public class TestCommond implements CommandExecutor {

        @Override
        public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
            if (sender instanceof Player) {
                Player player = (Player) sender;

                if(args.length==1){
                    switch(args[0]){
                        case 'add':
                            player.sendMessage(ChatColor.YELLOW + "Add " + player.getName());
                            break;
                        case 'remove':
                            player.sendMessage(ChatColor.YELLOW + "Remove " + player.getName());
                            break;
                        default:
                            player.sendMessage(ChatColor.RED + "无效的指令参数 ");
                            break;
                    }
                }
                player.sendMessage(ChatColor.RED + "Hello");
            }
            return true;
        }
    }
```

## 玩家传送指令

yml 指令注册部分同上

```java
    public class TestCommond implements CommandExecutor {
        @Override
        public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
            if (sender instanceof Player) {
                Player player = (Player) sender;
                # teleport为传送API
                player.teleport(player.getWorld().getSpawnLocation())
                player.sendMessage(ChatColor.YELLOW + "已将您传送至出生点。");
            }
            return true;
        }
    }
```
