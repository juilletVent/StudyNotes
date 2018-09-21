# 高阶组件

高阶组件的实际意义就是对大量行为方式类似的组件进行逻辑提升，抽象出一层与UI渲染无关但行为类似的高层组件，已达到局部复用的目的


	function withSubscription(WrappedComponent, selectData) {
	  // ……返回另一个新组件……
	  return class extends React.Component {
	    constructor(props) {
	      super(props);
	      this.handleChange = this.handleChange.bind(this);
	      this.state = {
	        data: selectData(DataSource, props)
	      };
	    }
	
	    componentDidMount() {
	      // ……注意订阅数据……
	      DataSource.addChangeListener(this.handleChange);
	    }
	
	    componentWillUnmount() {
	      DataSource.removeChangeListener(this.handleChange);
	    }
	
	    handleChange() {
	      this.setState({
	        data: selectData(DataSource, this.props)
	      });
	    }
	
	    render() {
	      // ……使用最新的数据渲染组件
	      // 注意此处将已有的props属性传递给原组件
	      return <WrappedComponent data={this.state.data} {...this.props} />;
	    }
	  };
	}


	const CommentListWithSubscription = withSubscription(
	  CommentList,
	  (DataSource) => DataSource.getComments()
	);
	
	const BlogPostWithSubscription = withSubscription(
	  BlogPost,
	  (DataSource, props) => DataSource.getBlogPost(props.id)
	);

props:

从高阶组件返回的组件应该与原包裹的组件具有类似的接口


你不能在组件的render函数中调用高阶函数

高阶组件可以传递所有的props属性给包裹的组件，但是不能传递refs引用。因为并不是像key一样，refs是一个伪属性，React对它进行了特殊处理。如果你向一个由高阶组件创建的组件的元素添加ref应用，那么ref指向的是最外层容器组件实例的，而不是包裹组件















