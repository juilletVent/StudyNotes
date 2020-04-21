## plugin.yml  插件描述文件

name: 插件名称
main: 插件主类全路径
version: 插件版本
author: 作者
commands:
  命令


## 主类

主类需要继承 JavaPlugin,实现 onEnable onDisabled两个方法，另外还有一个onLoaded方法可选实现


一个简单的打招呼栗子：

    public class Main extends JavaPlugin implements Listener {
      @Override
      public void onEnable (){
        getServer().getPluginManager().registerEvents(this, this);
      }

      @Override
      public void onDisable(){}

      @EventHandler
      public void onPlayerJoin(PlayerJoinEvent e){
        Player P = e.getPlayer();
        e.setJoinMessage(p.getName() +"welcome to my server!" );
      }

      @EventHandLer
      public void onP1ayerQuit (PlayerQuitEvent e){
        Player P = e.getPlayer();
        e.setQuitMessage(p.getName() +"has left the :(");
      }
    }