## ItemMeta 的简单使用

ItemMeta 配合 ItemStack 实现简单的自定义物品，可以自定义名称，附魔属性，物品描述等等，下面是一个简单的使用栗子

```java
public class GiveItemsFirst implements Listener {
    private Server server = null;

    public GiveItemsFirst(JavaPlugin plugin) {
        this.server = plugin.getServer();
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        // 创建一把铁剑
        ItemStack sword = new ItemStack(Material.IRON_SWORD);
        // 创建文字描述，一个项目对应一行，支持颜色代码，默认紫色
        ArrayList<String> lores = new ArrayList<String>();
        lores.add("所到之处，寸草不生");
        lores.add("SVIP尊享");
        // 取得铁剑对应的Meta标签
        ItemMeta swordMeta = sword.getItemMeta();
        // 设置标签的物品描述
        swordMeta.setLore(lores);
        // 设置自定义的物品名称
        swordMeta.setDisplayName(ChatColor.GOLD + "处决之剑");
        // 设置附魔属性 锋利，第三个属性表示是否忽略最大等级限制，true表示忽略
        swordMeta.addEnchant(Enchantment.DAMAGE_ALL, 10, true);
        // 亡灵杀手
        swordMeta.addEnchant(Enchantment.DAMAGE_UNDEAD, 10, true);
        swordMeta.addEnchant(Enchantment.DAMAGE_ARTHROPODS, 10, true);
        swordMeta.addEnchant(Enchantment.FIRE_ASPECT, 2, true);
        swordMeta.addEnchant(Enchantment.DURABILITY, 3, true);
        swordMeta.addEnchant(Enchantment.LOOT_BONUS_MOBS, 5, true);
        swordMeta.addEnchant(Enchantment.MENDING, 1, true);
        // 设置此标签可以让物品不可摧毁（永不磨损）（可以被烧毁）
        swordMeta.setUnbreakable(true);
        // 将自定义属性设置给创建的铁剑
        sword.setItemMeta(swordMeta);

        // 取得玩家背包，放入其中
        PlayerInventory inventory = player.getInventory();
        inventory.addItem(sword);
        this.server.broadcastMessage(ChatColor.YELLOW + "[+]欢迎新玩家 " + ChatColor.GREEN + player.getName() + " " + ChatColor.YELLOW + "加入游戏。");
    }
}
```

ItemFlag 用于设置物品相关标记，一般用来隐藏某些信息

```
// 添加附魔属性隐藏
swordMeta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
// 设置攻击等主要属性隐藏
swordMeta.addItemFlags(ItemFlag.HIDE_ATTRIBUTES);
// 设置隐藏不可破坏属性
swordMeta.addItemFlags(ItemFlag.HIDE_UNBREAKABLE);
```

Tips：文字的颜色通过 ChatColor 类与字符串拼接完成
