<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-08-29 15:16:33
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-08-29 15:23:21
 * @Description: Nothing
 -->
  
  
  String[] array = { "Hello", "World" };
 
	// 将数组转化为ArrayList
	ArrayList<String> list = new ArrayList<>(Arrays.asList(array));
	System.out.println(list);
 
	// Java 8中的做法
	list = Stream.of(array).collect(Collectors.toCollection(ArrayList::new));
	System.out.println(list);
 
	// Java 9中的做法
	List<String> list = List.of("Hello", "World");
	System.out.println(list);
 
	// ArrayList创建同时初始化
	ArrayList<String> list = new ArrayList<String>() {
	    {
        add("Hello");
        add("World");
	    }
	};