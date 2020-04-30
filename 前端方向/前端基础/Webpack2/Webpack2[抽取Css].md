# Webpack 抽取 Css

## 抽取引入的Css|Less等样式模块

1. 安装并引入 extract-text-webpack-plugin
	
		var extractTextPlugin = require('extract-text-webpack-plugin');

2. 配置rules规则

		{
            test: /\.(css|less)$/,
            loader: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", 'less-loader']
            })
        },

3. 添加plugins插件选项

		new extractTextPlugin({ filename: 'css/[name]-bundle.css', allChunks: true }),

## 抽取Vue单文件组件中的样式

		{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        }

**Tips：虽然Css成功写出到文件中，但是根据打包生成后js文件大小和搜索来看，单文件组件中的样式依然被写入到js文件中，还未找到处理方法**