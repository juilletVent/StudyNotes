<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [plugin.yml 插件描述文件](#pluginyml-%E6%8F%92%E4%BB%B6%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6)
- [主类](#%E4%B8%BB%E7%B1%BB)
- [检查用户是否是首次登录](#%E6%A3%80%E6%9F%A5%E7%94%A8%E6%88%B7%E6%98%AF%E5%90%A6%E6%98%AF%E9%A6%96%E6%AC%A1%E7%99%BB%E5%BD%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## plugin.yml 插件描述文件

name: 插件名称
main: 插件主类全路径
version: 插件版本
author: 作者
commands:
命令

## 主类

主类需要继承 JavaPlugin,实现 onEnable onDisabled 两个方法，另外还有一个 onLoaded 方法可选实现

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

Tips：为文字添加颜色，`ChatColor.GREEN+"Hello"` ，添加了颜色代码的文字将在出现下一个颜色代码之前都保持之前的颜色

## 检查用户是否是首次登录

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e){
      Player P = e.getPlayer();
      if(p.hasPlayedBefore()){
        # 欢迎新玩家
      }else{
        # 欢迎咸鱼
      }
    }
