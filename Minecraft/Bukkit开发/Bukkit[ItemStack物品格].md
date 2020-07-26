## ItemStack 的简单使用

ItemStack 理解为一个物品格子，可以设置里面放的物品类型，物品数量，下面是一个玩家首次进入服务器时发放新手礼包的实现：

```java
// Plugin部分
public class GiveItemsFirst implements Listener {
    private Server server = null;

    public GiveItemsFirst(JavaPlugin plugin) {
        this.server = plugin.getServer();
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        if (!player.hasPlayedBefore() || true) {
            // 创建熟牛排物品
            ItemStack food = new ItemStack(Material.COOKED_BEEF);
            // 设置个数 64
            food.setAmount(64);
            // 创建铁剑
            ItemStack sword = new ItemStack(Material.IRON_SWORD);
            // 皮革衣服
            ItemStack cheset = new ItemStack(Material.LEATHER_CHESTPLATE);

            ArrayList<String> lores = new ArrayList<String>();
            lores.add("所到之处，寸草不生");
            lores.add("SVIP尊享");
            // 取得铁剑的属性集合描述 Meta
            ItemMeta swordMeta = sword.getItemMeta();
            // 设置物品描述
            swordMeta.setLore(lores);
            // 设置物品显示名称，支持颜色代码
            swordMeta.setDisplayName(ChatColor.GOLD + "处决之剑");
            // 添加各种附魔，最后一个true为无视附魔上线
            swordMeta.addEnchant(Enchantment.DAMAGE_ALL, 10, true);
            swordMeta.addEnchant(Enchantment.DAMAGE_UNDEAD, 10, true);
            swordMeta.addEnchant(Enchantment.DAMAGE_ARTHROPODS, 10, true);
            swordMeta.addEnchant(Enchantment.FIRE_ASPECT, 2, true);
            swordMeta.addEnchant(Enchantment.DURABILITY, 3, true);
            swordMeta.addEnchant(Enchantment.LOOT_BONUS_MOBS, 5, true);
            swordMeta.addEnchant(Enchantment.MENDING, 1, true);
            // 设置物品不可破坏（耐久无限，可被烧毁）
            swordMeta.setUnbreakable(true);

            // 添加附魔属性隐藏
            swordMeta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
            // 设置攻击等主要属性隐藏
            swordMeta.addItemFlags(ItemFlag.HIDE_ATTRIBUTES);
            // 设置隐藏不可破坏属性
            swordMeta.addItemFlags(ItemFlag.HIDE_UNBREAKABLE);
            // 为铁剑设置属性集
            sword.setItemMeta(swordMeta);
            // 取得玩家背包
            PlayerInventory inventory = player.getInventory();
            // 添加相关物品
            inventory.addItem(food);
            inventory.addItem(sword);
            // 穿上衣服
            inventory.setChestplate(cheset);
            this.server.broadcastMessage(ChatColor.YELLOW + "[+]欢迎新玩家 " + ChatColor.GREEN + player.getName() + " " + ChatColor.YELLOW + "加入游戏。");
        } else {
            this.server.broadcastMessage(ChatColor.YELLOW + "欢迎 " + ChatColor.GREEN + player.getName() + " " + ChatColor.YELLOW + "加入游戏。");
        }
    }
}

```

Tips：文字的颜色通过 ChatColor 类与字符串拼接完成
