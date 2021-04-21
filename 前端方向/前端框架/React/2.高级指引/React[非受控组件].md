<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [非受控组件](#%E9%9D%9E%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6)
  - [defaultVal](#defaultval)
  - [文件标签](#%E6%96%87%E4%BB%B6%E6%A0%87%E7%AD%BE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 非受控组件

一个典型的非受控组件

	class NameForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }
	
	  handleSubmit(event) {
	    alert('A name was submitted: ' + this.input.value);
	    event.preventDefault();
	  }
	
	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Name:
	          <input type="text" ref={(input) => this.input = input} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
	}

使用场景：非受控组件将真实数据保存在 DOM 中，因此在使用非受控组件时，更容易同时集成 React 和非 React 代码。如果你想快速而随性，这样做可以减小代码量。否则，你应该使用受控组件

### defaultVal

你希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，你可以指定一个 defaultValue 属性而不是 value

**同样， ` <input type="checkbox"> `  和 `<input type="radio">` 支持 defaultChecked，`<select>` 和 `<textarea>` 支持 defaultValue.**

### 文件标签

在React中，<input type="file" /> 始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置，应该使用File API与文件进行交互

文件相关操作只能使用ref配合回掉进行相关操作






















