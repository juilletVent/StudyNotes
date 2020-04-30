## webStorage

1. 存储数据：


		localStorage.name = 'value';
		localStorage['name'] = 'value';
		localStorage.setItem('name','value');

　　注意键和值总是字符串。建议使用webStorage API(setItem,getItem,removeItem,key,length)

2. 获取数据：

		var value = localStorage.getItem('name');
		var value = localStorage.name;
		var value = localStorage['name'];

3. 删除数据：清空所有数据

		localStorage.clear();
		//删除特定数据；
		localStorage.removeItem('name');

4. 检测浏览器是否支持：
	
		//type为localStorage或sessionStorage
		function storageAvailable(type) {
		　　try {
		　　　　var storage = window[type],
		　　　　x = '__storage_test__';
		　　　　storage.setItem(x, x);
		　　　　storage.removeItem(x);
		　　　　return true;
		　　}
		　　catch(e) {
		　　　　return false;
		　　}
		}
		if (storageAvailable('localStorage')) {
		　　// Yippee! We can use localStorage awesomeness
		}
		else {
		　　// Too bad, no localStorage for us
		}

5. 就是存储对象了，我们需要进行转换为字符串存入，等到使用的时候取出再转为对象。

		var str = JSON.stringify(obj);
		localStorage.mydata = str;
		var obj = JSON.parse(localStorage.mydata);