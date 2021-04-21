<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vuex](#vuex)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [Promise依赖](#promise%E4%BE%9D%E8%B5%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vuex

vuex数据流图示

![图示](https://vuex.vuejs.org/vuex.png)

## 安装

> script

	<script src="/path/to/vue.js"></script>
	<script src="/path/to/vuex.js"></script>

> npm 

	npm install vuex --save

> Yarn

	yarn add vuex

在模块化构建环境中，必须显示的通过 Vue.use(Vuex); 来安装Vuex

	import Vue from 'vue'
	import Vuex from 'vuex'
	
	Vue.use(Vuex)

而使用Script引入时则不需要安装

## Promise依赖

由于IE不提供Promise支持，所以使用Vuex必须提供Promise类库，且在Vuex安装之前进行引入

	<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>

	npm install es6-promise --save # npm
	yarn add es6-promise # Yarn

模块化构建

	import 'es6-promise/auto'






