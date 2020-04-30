## 有序合成

	// 有序合成
    //创建被合成的物品
    ItemStack wing = new ItemStack(Material.ELYTRA);
    //命名空间
    NamespacedKey wingKey = new NamespacedKey(this,"wing_key");
    //创建有序合成实例
    ShapedRecipe wingRecipe = new ShapedRecipe(wingKey,wing);
    //添加有序合成表，含义：三个字符串对应工作台三行，空格代表空，字母代表需要放置东西
    wingRecipe.shape(" D "," F ","   ");
    //添加合成表的解释，对上面的字母进行实体解释，解释相关字母是什么东西
    //此处，D解释为钻石
    wingRecipe.setIngredient('D',Material.DIAMOND);
    //F解释为羽毛
    wingRecipe.setIngredient('F',Material.FEATHER);

	//添加到合成管理器中
    Bukkit.addRecipe(wingRecipe);


## 无序合成

	//无序合成，创建过程同有序合成(此处使用一个苹果加上三个金锭，一次性合成10个金苹果)
	ItemStack shulkerShell = new ItemStack(Material.ENCHANTED_GOLDEN_APPLE,10);
	NamespacedKey shulkerShellKey = new NamespacedKey(this,"shulker_shell");
	ShapelessRecipe shulkerShellRecipe = new ShapelessRecipe(shulkerShellKey,shulkerShell);
	//添加合成所需的物品，只需要一个的
	shulkerShellRecipe.addIngredient(Material.APPLE);
	//需要多个的可以使用另外一个重载声明
	shulkerShellRecipe.addIngredient(3,Material.GOLD_INGOT);

	//添加到合成管理器中
	Bukkit.addRecipe(shulkerShellRecipe);

Tips:`ItemStack`类标表示一个物品集合，默认只有一个物品，如果想使用一个合成表合成n个物品，只需要在创建ItemStack时传入第二个参数，标明合成多少个物品即可