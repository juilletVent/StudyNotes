<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue输入类组件的数据绑定问题](#vue%E8%BE%93%E5%85%A5%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue输入类组件的数据绑定问题

在封装输入类的Vue组件时，仍使用v-model指令进行数据绑定，由于v-model指令实际上为：

	<input type="text" v-bind:value="dataA" v-on:input="dataA = $event.target.value" />

v-model是动态绑定值到value，然后监听input的input事件获取值后赋给dataA的一个过程。

因此，我们可以在自定义组件的时候为自定义组件绑定v-model属性，然后在自定义组件内指定props参数value

添加如下计算属性：

	currentValue: {
        get:function() {
            return this.value;
        },
        set:function(val) {
            this.$emit('input', val);
        }
    }

组件内实际的输入控件使用v-model绑定至此计算属性即可实现父组件的数据绑定到子组件的输入框