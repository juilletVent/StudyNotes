<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack 提取公共模块](#webpack-%E6%8F%90%E5%8F%96%E5%85%AC%E5%85%B1%E6%A8%A1%E5%9D%97)
  - [使用webpack自带的模块实现公共模块的提取](#%E4%BD%BF%E7%94%A8webpack%E8%87%AA%E5%B8%A6%E7%9A%84%E6%A8%A1%E5%9D%97%E5%AE%9E%E7%8E%B0%E5%85%AC%E5%85%B1%E6%A8%A1%E5%9D%97%E7%9A%84%E6%8F%90%E5%8F%96)
  - [缓存问题](#%E7%BC%93%E5%AD%98%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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