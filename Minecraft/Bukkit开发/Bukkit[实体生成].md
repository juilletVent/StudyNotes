## 使用指令生成实体

使用指令生成指定数量的生物实体

```java
public class GenerateZombie implements CommandExecutor {
    private Server server;

    public GenerateZombie(Server server) {
        this.server = server;
    }

    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String commandStr, String[] args) {
      // commandStr为命令本体字符串
      // args 为空格分隔的指令参数
        Logger logger = server.getLogger();
        int count = 1;
        if (null != args[0]) {
            try {
                count = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
                logger.log(Level.WARNING, "指令参数错误，生成僵尸的数字格式有误");
                return false;
            }
            if (count <= 0) {
                logger.log(Level.WARNING, "指令参数错误，生成僵尸的数字不能小于1");
                return false;
            }
            if (count > 1000) {
                logger.log(Level.WARNING, "指令参数错误，生成僵尸的数字不能大于1000");
                return false;
            }
        }
        if (commandSender instanceof Player) {
            Player player = (Player) commandSender;
            // 取得玩家所在位置
            Location location = player.getLocation();
            // 取得玩家所在维度
            World world = player.getWorld();
            // 执行生成
            for (int i = 0; i < count; i++) {
                world.spawnEntity(location, EntityType.ZOMBIE);
            }
            commandSender.sendMessage("Hey gays,look down,zombie has generated");
        }
        return false;
    }
}

// 主类注册
getCommand("gen").setExecutor(new GenerateZombie(server));

// yml定义指令
commands:
  gen:
    description: A simple Command Example to generate zombie.
    usage: /gen [count]
```


