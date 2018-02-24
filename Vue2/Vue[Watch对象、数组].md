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