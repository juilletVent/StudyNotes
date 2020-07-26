## 基础事件：玩家移动

**重点：Listener 中定义的事件，实际上跟名字没什么关系，主要是跟事件参数类型有关系，Server 会通过注解查询到需要处理的事件回调有哪些，
在通过反射，拿到相关的参数类型，实现 DI 而不是通过我们定义的方法名称进行解析，否则应该给出相关的事件定义才对，然而你会发现并没有相关
事件接口方法的定义，只有事件类型被定义**。

常用的各种玩家事件（名字不重要，重要的是事件参数的类型）：

- onPlayerMove:玩家移动
- onPlayerInteract:方块交互
- onDemage:实体伤害

创建监听器：

```java
public class PlayerMove implements Listener {
    // 创建事件监听器
}
```

注册监听器：

```java
public class PluginEntrance extends JavaPlugin {

    @Override
    public void onEnable() {
        super.onEnable();
        getLogger().info("§2 myTest plugin has enabled.");
        // 取得事件管理器
        PluginManager pluginManager = getServer().getPluginManager();
        // 注册事件监听器
        pluginManager.registerEvents(new PlayerMove(), this);

    }
}

```

## 移动事件

```java
@EventHandler
    public void onPlayerMove(PlayerMoveEvent e) {
        Player player = e.getPlayer();
        if (e.getFrom() != e.getTo()) {
            player.sendMessage("你不能移动！");
            // 取消玩家触发的事件
            e.setCancelled(true);
        }
    }
```

## 方块交互事件

```java
@EventHandler
public void onPlayerInteract(PlayerInteractEvent e) {
    Player player = e.getPlayer();
    Block clickedBlock = e.getClickedBlock();
    Action action = e.getAction();

    StringBuilder msg = new StringBuilder("玩家：");
    msg.append(player.getName()).append("\n方块：");
    if (null != clickedBlock) {
        msg.append(clickedBlock.getType().toString());
        Location location = clickedBlock.getLocation();
        msg.append("维度：").append(location.getWorld().getName());
        msg.append("坐标：").append(location.getX() + "," + location.getY() + "," + location.getZ());
    } else {
        msg.append("无交互方块");
    }

    this.server.broadcastMessage(msg.toString());
}
```

## 实体伤害

```java
public class Damage implements Listener {
    @EventHandler
    public void onDemage(EntityDamageByEntityEvent event) {
        Entity entity = event.getEntity();
        Entity damager = event.getDamager();
        if (entity.getType().equals(EntityType.ZOMBIE)) {
            if (null != damager && damager instanceof Player) {
                damager.sendMessage("你伤害了僵尸：" + event.getCause().toString());
                return;
            }
        }
        damager.sendMessage("你伤害了一个实体\n实体名：" +
                ChatColor.YELLOW + entity.getName() +
                ChatColor.WHITE + "\n攻击类型：" +
                ChatColor.YELLOW + event.getCause().toString());

    }
}
```
