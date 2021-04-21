<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Watch 数组](#watch-%E6%95%B0%E7%BB%84)
- [Watch 对象](#watch-%E5%AF%B9%E8%B1%A1)
- [Watch 对象具体属性(配合computed实现)](#watch-%E5%AF%B9%E8%B1%A1%E5%85%B7%E4%BD%93%E5%B1%9E%E6%80%A7%E9%85%8D%E5%90%88computed%E5%AE%9E%E7%8E%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Watch 数组

	data() {
	    return {
	        winChips: new Array(11).fill(0)   
	    }
	},
	watch: {
	　　winChips: {
	　　　　handler(newValue, oldValue) {
	　　　　　　for (let i = 0; i < newValue.length; i++) {
	　　　　　　　　if (oldValue[i] != newValue[i]) {
	　　　　　　　　　　console.log(newValue)
	　　　　　　　　}
	　　　　　　}
	　　　　},
	　　　　deep: true
	　　}
	}

## Watch 对象

深度监听使用第二种方式

	data() {
	　　return {
	　　　　bet: {
	　　　　　　pokerState: 53,
	　　　　　　pokerHistory: 'local'
	　　　　}   
	    }
	},
	watch: {
	　　bet: {
	　　　　handler(newValue, oldValue) {
	　　　　　　console.log(newValue)
	　　　　},
	　　　　deep: true
	　　}
	}

## Watch 对象具体属性(配合computed实现)

	data() {
	　　return {
	　　　　bet: {
	　　　　　　pokerState: 53,
	　　　　　　pokerHistory: 'local'
	　　　　}   
	    }
	},
	computed: {
	　　pokerHistory() {
	　　　　return this.bet.pokerHistory
	　　}
	},
	watch: {
	　　pokerHistory(newValue, oldValue) {
	　　　　console.log(newValue)
	　　}
	}