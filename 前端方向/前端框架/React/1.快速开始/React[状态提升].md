## 状态提升

使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理

	class Calculator extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleChange = this.handleChange.bind(this);
	    this.state = {temperature: ''};
	  }
	
	  handleChange(e) {
	    this.setState({temperature: e.target.value});
	  }
	
	  render() {
	    const temperature = this.state.temperature;
	    return (
	      <fieldset>
	        <legend>输入一个摄氏温度</legend>
	        <input
	          value={temperature}
	          onChange={this.handleChange} />
	
	        <BoilingVerdict
	          celsius={parseFloat(temperature)} />
	
	      </fieldset>
	    );
	  }
	}

























