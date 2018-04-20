PHP闭包获取上下文变量

	function getMoney() {
	    $rmb = 1;
	    $func = function() use ( &$rmb ) {
	        echo $rmb;
	        //把$rmb的值加1
	        $rmb++;
	    };
	    $func();
	    echo $rmb;
	}
	getMoney();
	
	//输出：
	//1
	//2