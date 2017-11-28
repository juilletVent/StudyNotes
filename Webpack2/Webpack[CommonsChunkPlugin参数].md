# Webpack 提取公共模块

## 使用webpack自带的模块实现公共模块的提取

	{
		//公用块名称
		name: string,
		names: string[],
		//Commons块的文件名模板
		filename: string,
		
		//导出公共块的引用次数，大于等于2，小于等于模块总数
		minChunks: number|Infinity|function(module, count) -> boolean,
		//选择执行导出操作的模块名称集，默认为全部选择	
		chunks: string[],
				
		children: boolean,
		// If `true` all children of the commons chunk are selected
		
		deepChildren: boolean,
		// If `true` all descendants of the commons chunk are selected
		
		async: boolean|string,
		
		minSize: number,
		// Minimum size of all common module before a commons chunk is created.
	}

## 缓存问题

	new webpack.optimize.CommonsChunkPlugin({
        names: ['vender','manifest'],
        filename:'js/[name]-[chunkHash:4].js',
        chunks: ['index','home'],
        minChunks: 2,
    }),

**Tisp:names添加manifest，抽取引导文件，将runtime部分的代码提取到一个单独的文件中，使得vender公共部分固定下来，缓存生效，搭配chunkHash控制vender版本**