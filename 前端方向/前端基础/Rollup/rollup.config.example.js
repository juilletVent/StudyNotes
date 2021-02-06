/* eslint-disable */
import typescript from "rollup-plugin-typescript2";
import progress from "rollup-plugin-progress";
import external from "rollup-plugin-peer-deps-external";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import eslint from "@rollup/plugin-eslint";

export default {
  // 多入口配置
  input: [
    "./src/spg.ts",
    "./src/commands/spg-def.ts",
    "./src/commands/spg-gen.ts",
    "./src/commands/spg-init.ts"
  ],
  output: {
    dir: "dist",
    // 输出格式：CommonJS，更多类型，参考官方文档
    format: "cjs",
    // 为输出的文件添加首行，下面的配置针对的是CLI项目，非CLI项目不需要
    banner: "#!/usr/bin/env node",
    // 是否开启sourcemap，如果需要进行代码调试则需要开启，如果使用了TypeScript，则tsconfig.json中也要开启sourcemap相关选项才可以
    sourcemap: true
  },
  // 监听的变化自动重建的文件夹
  watch: "src/**",
  plugins: [
    // eslint插件
    eslint({
      fix: true,
      throwOnError: true
    }),
    // 外部引入，必备
    external(),
    // TypeScript转码，必备
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    // node模块解析，必备
    resolve(),
    // 转码CommonJS，必备
    commonjs(),
    // dist目录清理
    clear({
      targets: ["dist"]
    }),
    // 文件拷贝插件
    copy({
      targets: [
        { src: "src/utils/tplUtils/tpl", dest: "dist" },
        { src: "src/components", dest: "dist" }
      ]
    }),
    // 解析JSON文件
    json(),
    // 目标代码压缩
    terser(),
    // build进度
    progress({
      // clearLine: false, // default: true
    })
  ]
};

// babel.config.ts
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: ["transform-es2015-modules-commonjs"]
};

// 单元测试 jest.config.ts
const path = require("path");

module.exports = {
  rootDir: path.join(__dirname),
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.(spec|test).(t|j)s"],
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    "^.+\\.js$": "babel-jest",
    // 将.ts后缀的文件使用ts-jest处理
    "^.+\\.(ts)$": "ts-jest"
  },
  // 如果需要使用babel-js处理外部库，请将外部库定义在这里
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!(lodash-es|other-es-lib))",
  // ],
  moduleNameMapper: {
    // 解析路径别名，不然解析不了路径别名
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  // 忽略的目录
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/typeings/",
    "<rootDir>/src/tpl/",
    "<rootDir>/src/conf/",
    "<rootDir>/src/types/",
    "<rootDir>/src/components/",
    "<rootDir>/dist/",
    "<rootDir>/.easy-mock.js"
  ]
};

// 打包流程：TS代码交给TypeScript插件转码成ESNext模块，再交给Rollup使用@rollup/plugin-commonjs插件最终转为CommonJS模块代码
