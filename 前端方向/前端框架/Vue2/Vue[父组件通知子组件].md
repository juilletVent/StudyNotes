<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue 组件通讯](#vue-%E7%BB%84%E4%BB%B6%E9%80%9A%E8%AE%AF)
  - [父组件到子组件的数据传递 [Props]](#%E7%88%B6%E7%BB%84%E4%BB%B6%E5%88%B0%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BC%A0%E9%80%92-props)
  - [父组件到子组件的事件传递 [ref]](#%E7%88%B6%E7%BB%84%E4%BB%B6%E5%88%B0%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92-ref)
  - [子组件到父组件的事件传递 [emit]](#%E5%AD%90%E7%BB%84%E4%BB%B6%E5%88%B0%E7%88%B6%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BC%A0%E9%80%92-emit)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue 组件通讯

## 父组件到子组件的数据传递 [Props]

	子组件定义选项，这些选项将会被子组件实例this代理，模板中可直接使用
	props:{
        'value':{required:true},
        'required':{default:false},
        'type':{default:0},
        'title':{required:true},
        'hint':{required:true},
        'check':{required:true},
    },

## 父组件到子组件的事件传递 [ref]

1. 子组件在父组件模板使用时，指定ref属性，**注意：是指定，不是绑定，使用`ref='child'`而不是`:ref='child'`**
2. 父组件通过使用实例属性$refs来索引所有指定了ref的子组件
3. 通过如下方式来触发子组件预定义的方法，并携带参数数据

		methods:{
			submit:function(){
				for(var key in this.$refs){
					this.$refs[key].empty();
				}
			},
		}

**Tips：ref属性具备唯一性，不可进行覆盖赋值，否则只有最有一次赋值生效**

## 子组件到父组件的事件传递 [emit]

1. 父组件在组件模板中使用`v-on`或简写`@`进行子组件自定义事件监听,并定义相关的事件回调
2. 子组件使用组件实例方法`$emit`投递自定义事件

        this.$emit('Event-Name',val1,val2);

**Tips：首参数为事件名称，随后的参数作为事件参数携带至父组件事件回调函数**
