1、将Yarn的缓存路径修改到与项目路径同驱动器下，否则无法创建连接

2、修改项目配置文件的package.json，根下添加

	{
	  "installConfig": {
	    "pnp": true
	  }
	}

3、启用yarn的pnp

	yarn --enable-pnp


如果使用的是脚手架，则查看脚手架相关的参数是否支持