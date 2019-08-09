## Refs & DOM

> 创建

	class MyComponent extends React.Component {
	  constructor(props) {
	    super(props);
	    this.myRef = React.createRef();
	  }
	  render() {
	    return <div ref={this.myRef} />;
	  }
	}

当一个 ref 属性被传递给一个 render 函数中的元素时，可以使用 ref 中的 current 属性对节点的引用进行访问

- 当 ref 属性被用于一个普通的 HTML 元素时，React.createRef() 将接收底层 DOM 元素作为它的 current 属性以创建 ref 。
- 当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。
- 你不能在函数式组件上使用 ref 属性，因为它们没有实例

> 取的 focus

	class CustomTextInput extends React.Component {
	  constructor(props) {
	    super(props);
	    // 创建 ref 存储 textInput DOM 元素
	    this.textInput = React.createRef();
	    this.focusTextInput = this.focusTextInput.bind(this);
	  }
	
	  focusTextInput() {
	    // 直接使用原生 API 使 text 输入框获得焦点
	    // 注意：通过 "current" 取得 DOM 节点
	    this.textInput.current.focus();
	  }
	
	  render() {
	    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
	    return (
	      <div>
	        <input
	          type="text"
	          ref={this.textInput} />
	
	          
	        <input
	          type="button"
	          value="Focus the text input"
	          onClick={this.focusTextInput}
	        />
	      </div>
	    );
	  }
	}

> 为类组件添加Ref

	class AutoFocusTextInput extends React.Component {
	  constructor(props) {
	    super(props);
	    this.textInput = React.createRef();
	  }
	
	  componentDidMount() {
	    this.textInput.current.focusTextInput();
	  }
	
	  render() {
	    return (
	      <CustomTextInput ref={this.textInput} />
	    );
	  }
	}

current实际指向组件实例，所以可以直接访问组件实例方法

**不能再函数式组件上定义refs属性，但是在函数式组件内部可以使用ref**

Example:

	function CustomTextInput(props) {
	  // 这里必须声明 textInput，这样 ref 回调才可以引用它
	  let textInput = null;
	
	  function handleClick() {
	    textInput.focus();
	  }
	
	  return (
	    <div>
	      <input
	        type="text"
	        ref={(input) => { textInput = input; }} />
	
	      <input
	        type="button"
	        value="Focus the text input"
	        onClick={handleClick}
	      />
	    </div>
	  );  
	}


#### 自定义Form时，Ref转发问题

自定义Form时，getFieldDecorator，会默认要求一个取得一个ref，以帮助你在外层访问getFieldDecorator包装的高阶组件，但是目前多使用func组件，自身是没有ref的，所以需要进行ref转发，具体实现如下：

函数式自定义组件内部：

	# ref来自组件的第二个参数，使用了forwardRef转发之后，组件将会传入第二个参数，就是ref
	if (ref) {
		ref.current = () => {};
	}

	# 导出部分转发ref即可
	export default React.forwardRef(SelectRegion);

当然如果你内部ref确实有用，这可以绑定到具体的元素或组件上


> connect导致的ref问题

connect函数默认不会转发ref，所以在自定义Form组件时如果使用了connect进行包装，name需要手动指定ref转发，不然就使用上面的方法手动转发ref加上hooks->useSelector完成

栗子：

	export default connect<StateProps, DispatchProps, any>(
	  mapStateToProps,
	  mapDispatchToProps,
	  null,
	  { forwardRef: true }
	)(ProviderSelect);




	


