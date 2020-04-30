## 自定义组件双向绑定

	<TipsBlock>
      {getFieldDecorator('businessStatus', {
        initialValue: [1, 2],
		# 自定义组件必须是getFieldDecorator函数的直接子元素
      })(<TipsSelect items={selectData} model={SelectModel.MODEL_MULTIPLE} />)}
    </TipsBlock>

**注意:自定义组件必须是getFieldDecorator函数的直接子元素,否则关键性的onChange和value属性将会被外层元素劫持**

#### 自定义组件内部

自定义组件内部初始值来源于组件外部属性上挂载的value的值，在组件内值发生变化时，一定要回调props上的onChange时间，并将改变后的值回传