<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack 样式分离](#webpack-%E6%A0%B7%E5%BC%8F%E5%88%86%E7%A6%BB)
  - [样式分离](#%E6%A0%B7%E5%BC%8F%E5%88%86%E7%A6%BB)
  - [Webpack4 及以后的样式分离（mini-css-extract-plugin）](#webpack4-%E5%8F%8A%E4%BB%A5%E5%90%8E%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%88%86%E7%A6%BBmini-css-extract-plugin)
  - [CSS 前缀添加（PostCSS+autoprefixer）](#css-%E5%89%8D%E7%BC%80%E6%B7%BB%E5%8A%A0postcssautoprefixer)
  - [规范化 Css 编写风格（stylelint）](#%E8%A7%84%E8%8C%83%E5%8C%96-css-%E7%BC%96%E5%86%99%E9%A3%8E%E6%A0%BCstylelint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Webpack 样式分离

## 样式分离

使用 styled-loader 处理后的样式最终会以 style 标签的形式插入到页面中，这种方式无法利用客户端缓存样式文件，比较多的做法是，使用插件`extract-text-webpack-plugin`进行样式分离抽出。

安装:

```
yarn add extract-text-webpack-plugin -D
```

webpack 配置：

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module:{
  rules:[
    {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        // 遭遇插件处理不了的文件时，使用什么loader处理，一般用不上
        fallback: "style-loader",
        // 使用哪些预处理器先处理，处理完了后再交给插件处理
        use: ["css-loader","less-loader"]
      })
    }
  ]
},
plugins: [
  new ExtractTextPlugin("styles.css"),
]
```

**Tips:目前（2020-05-26）此插件已被废弃，作者推荐使用`mini-css-extract-plugin`进行替换**

## Webpack4 及以后的样式分离（mini-css-extract-plugin）

Webpack4 之后官方推荐使用 mini-css-extract-plugin 进行样式分离，extract-text-webpack-plugin 无法做到按需加载，异步加载的样式文件只能通过同步加载一次性到位，所以上面的插件被废弃，插件具体的使用方法参考插件文档

安装：

```
yarn add mini-css-extract-plugin -D
```

配置样例：

```
module: {
  rules: [
    {
      test: /\.(css|less)$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true
          }
        },
        "css-loader",
        "less-loader"
      ]
    }
  ]
},
plugins: [new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css",
  ignoreOrder: false
})],
```

## CSS 前缀添加（PostCSS+autoprefixer）

安装：

```
yarn add postcss-loader autoprefixer -D
```

postcss 需要在项目根目录下创建文件 postcss.config.js，目前来说只需要导出一个空对象即可。与 autoprefixer 结合添加私有 CSS 前缀：

```
# postcss.config.js中

const autoprefixer = require('autoprefixe');

module.exports = {
  plugins:[
    autoprefixer({
      // 为grid添加前缀支持
      grid:true,
      // 指定浏览器范围
      browsers:[
        '> 1%',
        'last 3 version',
        'android 4.2',
        'ie 8',
      ]
    })
  ]
}
```

## 规范化 Css 编写风格（stylelint）

安装：`yarn add stylelint`
