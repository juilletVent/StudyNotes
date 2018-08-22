## webpack

在Webpack4中，webpack拆分为两个包，用法为，局部安装webpack webpack-cli，不要全局安装webpack，容易出现依赖包找不到的问题。


## mode 运行模式

在新版的webpack编译环境中需要指定编译模式 --mode，development/production

	"start": "webpack-dev-server --mode development",
    "dev": "webpack --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production"

在webpack配置文件中如果需要获取mode参数可以使用如下方式：

	const config = (env, argv) => {
	    const isDev = argv.mode == 'development' ? true : false;
	    if (isDev) {
			...
	    } else {
			...
	    }
	    return config;
	};

将config转换为一个函数，env为环境变量，argv为命令参数

## Vue-loader

新版（15及以上）的vue-loader需要配置VueLoaderPlugin才能正确解析Vue文件

	const VueLoaderPlugin = require('vue-loader/lib/plugin.js');

	plugins: [
        new VueLoaderPlugin()
    ],

如果不想配置请使用14版本

