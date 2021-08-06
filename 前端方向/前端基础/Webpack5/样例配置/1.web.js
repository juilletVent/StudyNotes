const path = require("path");

module.exports = {
  target: "web",
  mode: "production",
  // devtool: "source-map",
  entry: {
    main: "src/index.ts",
  },
  output: {
    // 绝对路径
    path: path.resolve(__dirname, "dist"),
    // initial chunk 的模块命名规则
    filename: "static/js/[name].[chunkhash:8].js",
    // non-initial chunk 的模块命名规则（可以延迟加载的块）
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: "/", // 目标部署路径，浏览器请求时的baseUrl
    // publicPath: "", // relative to HTML file
    // publicPath: "https://cdn.example.com/", // absolute URL
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        // 额外的匹配规则，对查询字符串进行匹配,问号开始：require('./src/test.tsx?inline')，这样就符合规则
        // resourceQuery: /inline/,
        // 包含的目录
        include: [path.resolve(__dirname, "app")],
        // 排除的目录
        exclude: [path.resolve(__dirname, "app/demo-files")],
        // 单个Loader
        // loader: "babel-loader",
        // options: {
        //   presets: ["es2015"],
        // },
        // 多个Loader，与选项
        use: [
          // apply multiple loaders and options instead
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              // ...
            },
          },
        ],
        parser: {
          dataUrlCondition: {
            // 如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
            maxSize: 4 * 1024,
          },
          // 当提供函数时，返回 true 值时告知 webpack 将模块作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
          // dataUrlCondition: (source, { filename, module }) => {
          //   const content = source.toString();
          //   return content.includes('some marker');
          // },
        },
        // 条件匹配Loader
        // oneOf: [
        //   {
        //     resourceQuery: /inline/, // foo.css?inline
        //     use: 'url-loader',
        //   },
        //   {
        //     resourceQuery: /external/, // foo.css?external
        //     use: 'file-loader',
        //   },
        // ],
        // 配置文件使用Base64进行编码
        // generator: {
        //   dataUrl: {
        //     encoding: "base64",
        //     mimetype: "mimetype/png",
        //   },
        // },
      },
    ],
  },
  resolve: {
    // 别名路径映射
    alias: {
      utils: path.resolve(__dirname, "src/utilities/"),
      tpl: path.resolve(__dirname, "src/templates/"),
      // 精确匹配
      xyz$: path.resolve(__dirname, "path/to/file.js"),
      // import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入
      // import Test2 from 'xyz/file.js'; // 非精确匹配，触发普通解析
    },
    // 解析时自动添加的文件拓展名，从前向后查找
    extensions: [".js", ".json", ".wasm"],
  },
  // 外部依赖
  // externals: "react", // 精确匹配
  // externals: /^[a-z\-]+($|\/)/, // 正则匹配
  // externals: ["react", /^@angular/] // 数组
  // 对象配置
  externals: {
    // this["angular"]
    angular: "this angular",
    react: {
      // UMD
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
  },
};
