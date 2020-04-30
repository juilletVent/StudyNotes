var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var currentTarget = process.env.npm_lifecycle_event;
var PATHS = {
 publicPath : '/'
}
module.exports = {
//devtool: 'eval-source-map',
entry: {
    index : './src/js/index.js',
    list : './src/js/list.js',
    about : './src/js/about.js'
},
output: {
path: __dirname+ '/build',//生成的目录
 publicPath: PATHS.publicPath,
 filename: 'js/[name]-[hash:8].js',
chunkFilename: 'js/[name]-[hash:8].js'   //chunk生成的配置
},
module: {
    rules: [

        {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader?importLoaders=1&minimize=true',
					'postcss-loader',
					'sass-loader'
                ]
            })
        },
        {
            test : /\.vue$/,
            loader : 'vue-loader',
            options : {
                postcss : [require('autoprefixer')({browsers : ['last 3 versions']})]
            }
        },

        {
            test : /\.js$/,
            loader : 'babel-loader',
        },
     {
        test: /\.(png|gif|jpe?g)$/,
         loader: 'url-loader',
         query: {
             /*
              *  limit=10000 ： 10kb
              *  图片大小小于10kb 采用内联的形式，否则输出图片
              * */
             limit: 10000,
             name: 'images/[name]-[hash:8].[ext]'
         }

     },
    {
        test: /\.html$/,
        loader: "html-loader?attrs=img:src img:data-src",
        query: {
            minimize: true
        }
        },
    {
        //文件加载器，处理文件静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name]-[hash:8].[ext]'
    }

]
},
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // 将公共模块提取，生成名为`common`的chunk
        chunks: ['index','list','about'], //提取哪些模块共有的部分
        minChunks: 3 // 提取至少3个模块共有的部分
    }),

    new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery"
    }),
 /*
  * clean publishing directory
  * （发布前清空发布目录）
  * */
    new CleanWebpackPlugin(['build'], {
        root: '', // An absolute path for the root  of webpack.config.js
        verbose: true,// Write logs to console.
        dry: false // Do not delete anything, good for testing.
    }),
    /*
     * extract css
     * （提取css文件到单独的文件中）
     */
    new ExtractTextPlugin("css/[name]-[chunkhash:8].css"),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
        filename: './index.html', //生成的html存放路径，相对于path
        template: './src/index.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        chunks: ['common', 'index'],
        //hash: true ,//为静态资源生成hash值
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    }),
    new HtmlWebpackPlugin({
        favicon: './src/images/favicon.ico',
        filename: './about.html',
        template: './src/about.html',
        inject: 'body',
        chunks: ['common', 'about'],
       // hash: true,
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    }),
    new HtmlWebpackPlugin({
        favicon: './src/images/favicon.ico',
        filename: './list.html',
        template: './src/list.html',
        inject: 'body',
        chunks: ['common', 'list'],
        //hash: true
    }),
    //new webpack.optimize.UglifyJsPlugin(),//压缩
    new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'module', '_']
        },
        compress: {
            warnings: false
        },
        output: {//此选项作用：去除注释
            comments: false,
        }
    }),

    new webpack.HotModuleReplacementPlugin() //热加载
],
devServer: {
    contentBase: './',
    host: 'localhost',
    port: 8000,
    inline: true, //自动更新页面
    hot: true,
}
}