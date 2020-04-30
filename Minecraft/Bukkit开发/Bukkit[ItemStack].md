## ItemStack 的简单使用

ItemStack 理解为一个物品格子，可以设置里面放的物品类型，物品数量，下面是一个玩家首次进入服务器时发放新手礼包的实现：

```java
// Plugin部分
public class PluginEntrance extends JavaPlugin {

    @Override
    public void onEnable() {
        super.onEnable();
        getLogger().info("§2 myTest plugin has enabled.");
        // 注册事件监听器，并在构造中传入Plugin上下文，方便发送服务器广播
        getServer().getPluginManager().registerEvents(new GiveItemsFirst(this), this);
    }
}

// 监听器部分
public class GiveItemsFirst implements Listener {
    // 存放server上下文
    private Server server = null;

    public GiveItemsFirst(JavaPlugin plugin) {
        // 初始化server，后续发送广播使用
        this.server = plugin.getServer();
    }

    // 监听事件注解
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        // 判断玩家是不是首次加入服务器
        if (!player.hasPlayedBefore()) {
            // 创建包含一个熟牛排的物品栈
            ItemStack food = new ItemStack(Material.COOKED_BEEF);
            // 石剑
            ItemStack sword = new ItemStack(Material.STONE_SWORD);
            // 皮革衣服
            ItemStack cheset = new ItemStack(Material.LEATHER_CHESTPLATE);
            // 取得玩家背包
            PlayerInventory inventory = player.getInventory();
            // 将物品添加进玩家的背包
            inventory.addItem(food);
            inventory.addItem(sword);
            // 将皮衣直接传到玩家身上
            inventory.setChestplate(cheset);
            // 发送服务器广播
            this.server.broadcastMessage(ChatColor.YELLOW + "[+]欢迎新玩家 " + ChatColor.GREEN + player.getName() + " " + ChatColor.YELLOW + "加入游戏。");
        } else {
            // 玩家不是首次进入服务器，发送欢迎语
            this.server.broadcastMessage(ChatColor.YELLOW + "欢迎 " + ChatColor.GREEN + player.getName() + " " + ChatColor.YELLOW + "加入游戏。");
        }
    }
}
```

Tips：文字的颜色通过 ChatColor 类与字符串拼接完成
