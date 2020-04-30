## Minecraft 中给予玩家刷怪笼

刷怪笼本身默认只有一个，不带有 NBT 标签，这种刷怪笼使用指令：

    /give @p minecraft:spawner

由于没有任何 NBT 标签属性，默认为猪刷怪笼，我们需要为刷怪笼指定 NBT 标签才能让其刷指定的怪物，指定刷新频率，每次刷怪数量等等

NBT 标签属性：

- SpawnCount：每次生成的实体数量
- SpawnData：生成实体的信息 {id:"minecraft:wither_skeleton"} // 凋零骷髅
- SpawnPotentials：生成实体的信息，优先级高于 SpawnData，可以设置多个实体，weight 制定了每次实体生成时尝试的权重
- Delay：生成尝试延迟
- MinSpawnDelay：最小生成尝试延迟
- MaxSpawnDelay：最大生成尝试延迟
- MaxNearbyEntities：最大怪物存在数量（判定范围内的）
- RequiredPlayerRange：刷怪笼开始工作时玩家所处的最远距离

        # 同时生成两种怪物
        /give @p minecraft:spawner{BlockEntityTag:{SpawnCount:100,Delay:1,MinSpawnDelay:0,MaxSpawnDelay:1,MaxNearbyEntities:10,RequiredPlayerRange:100,SpawnData:{id:"minecraft:wither_skeleton"},SpawnPotentials:[
          {Weight:1,Entity:{id:"minecraft:wither_skeleton"}}
          {Weight:1,Entity:{id:"minecraft:zombie"}}
          ]}} 1

        # 使用这种方式似乎有问题，生成了一次之后变成了猪
        /give @p minecraft:spawner{BlockEntityTag:{SpawnCount:100,SpawnData:{id:"minecraft:wither_skeleton"}}} 1

        /give @p minecraft:spawner{BlockEntityTag:{SpawnCount:50,SpawnPotentials:[{Weight:1,Entity:{id:"minecraft:wither_skeleton"}}]}} 1

Tips:指令过长的问题通过命令方块解决
