## 模块体积监控 （webpack-bundle-analyzer）

只需要简单的将插件引入即可，打包后会产生一张模块大小分布的可视化占比图，能直观地反映出打包后的文件中各个模块的体积占比

使用：

```javascript
const Analyzer = require(webpack - bundle - analyzer).BundleAnalyzerPlugin;

module.exports = {
  // other config ...
  plugins: [
    // other plugins ...
    new Analyzer()
  ]
};
```

## 点线程打包，榨干 CPU 性能（HappyPack/ThreadLoad）

HappyPack 已经不再维护，仅讨论 ThreadLoad，这个插件可以开启多线程处理，能对多个文件进行并行处理，webpack 原有执行逻辑为串行处理，无法充分利用本地的多核资源

安装：

    # speed-measure-webpack-plugin 为打包时间监控插件，非必须
    yarn add speed-measure-webpack-plugin thread-loader -D

**Tips:踩坑注意：speed-measure-webpack-plugin会影响loader的环境变量读取，如果发现打包后环境变量丢失，则可能是此插件导致的，去掉即可**

栗子：

```javascript
// 打包时间性能分析
const SpeedPlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedPlugin();
// 装载thread-loader
const useThreadLoad = (loader, enable = true) => {
  const conf = {
    loader: "thread-loader",
    options: {
      // 并发进程数
      workers: 3,
      // 并发任务数
      workerParallelJobs: 6,
      // 移除空闲进程的时间
      poolTimeout: 2000
    }
  };

  if (loader === null || loader === undefined) {
    throw new Error("传入的loader不能为null或者undefined");
  }

  if (loader.length !== undefined) {
    if (enable) {
      loader.unshift(conf);
    }
    return loader;
  }
  if (enable) {
    return [conf, loader];
  }
  return [loader];
};

// 配置部分
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: packageSrcAbsPaths,

  // 使用定义的工具函数
  use: useThreadLoad({
    loader: require.resolve('babel-loader'),
    options: {
      rootMode: 'upward',
      customize: require.resolve('babel-preset-react-app/webpack-overrides'),
      presets: ['react-app'],
      plugins: [
        [
          require.resolve('babel-plugin-named-asset-import'),
          {
            loaderMap: {
              svg: {
                ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
              },
            },
          },
        ],
      ],
      cacheDirectory: true,
      // Save disk space when time isn't as important
      cacheCompression: true,
      compact: true,
    },
  }),
  // loader: require.resolve('babel-loader'),
},

// 使用时间监控插件
module.exports = smp.wrap(webpackConfig)
```
