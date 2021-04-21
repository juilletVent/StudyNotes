<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [表单](#%E8%A1%A8%E5%8D%95)
  - [多个输入的解决方法](#%E5%A4%9A%E4%B8%AA%E8%BE%93%E5%85%A5%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 表单

一个典型的受控组件

	class NameForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {value: ''};
	
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }
	
	  handleSubmit(event) {
	    alert('A name was submitted: ' + this.state.value);
	    event.preventDefault();
	  }
	
	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Name:
	          <input type="text" value={this.state.value} onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
	}


**注意：Select控件的值只需要在Select的value取得与设置即可，不需要在option上去判断selected**

### 多个输入的解决方法


思路：

设置统一的表单元素更改处理过程，进行集中式的状态更新，对于不同的表单控件，通过在表单元素上设置不同的name，然后在事件对象Event上获取name来进行区分，最后对state进行更新即可

	class Reservation extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      isGoing: true,
	      numberOfGuests: 2
	    };
	
	    this.handleInputChange = this.handleInputChange.bind(this);
	  }
	
	  handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	
	    this.setState({
	      [name]: value
	    });
	  }
	
	  render() {
	    return (
	      <form>
	        <label>
	          Is going:
	          <input
	            name="isGoing"
	            type="checkbox"
	            checked={this.state.isGoing}
	            onChange={this.handleInputChange} />
	        </label>
	        <br />
	        <label>
	          Number of guests:
	          <input
	            name="numberOfGuests"
	            type="number"
	            value={this.state.numberOfGuests}
	            onChange={this.handleInputChange} />
	        </label>
	      </form>
	    );
	  }
	}

受控组件在数据更新上面没有类似Vue中v-model 或者 Angularjs中ng-model双向绑定来的方便，可以尝试使用非受控组件进行替代。