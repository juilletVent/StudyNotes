## 样式混入 [styled-components]

> Install

	yarn add styled-components --save

	npm i styled-components --save

> How to use ?

	// 引入
	import styled from "styled-components";

	// 定义样式
	const Content = styled.div`
	  float: left;
	  width: calc(100% - 120px);
	  [data-h3]{//将会匹配下级所有带有data-h3属性的元素
	    color: #f00;
	  }
	`;

	//使用:定义过样式的组件可以再JSX中直接使用，并且嵌套的样式是可以正确匹配的，可以
	//在定义的时候书写类似less/sass中的嵌套匹配规则，在JSX模板中也可以正确匹配
	<Content>
      <Switch>
        <Route exact path={`${match.url}`} render={() => <h3>Default</h3>} />
        <Route path={`${match.url}/messages/:id`} component={Message} />
        <Redirect to={`${match.url}`} />
      </Switch>
    </Content>

> 创建补间动画

	const rotate360 = keyframes`  
	from {
	  transform: rotate(0deg);  
	}  
	to { 
	  transform: rotate(360deg);  
	}`;
	Rotate = styled.div`
	  display: inline-block;
	  animation: ${rotate360} 2s linear infinite;
	  padding: 2rem 1rem;
	  font-size: 1.2rem;
	`;

> 扩展样式

	Button = styled.button`
	  color: palevioletred;
	  font-size: 1em;
	  margin: 1em;
	  padding: 0.25em 1em;
	  border: 2px solid palevioletred;
	  border-radius: 3px;
	`;
	
	TomatoButton = Button.extend`
	  color: tomato;
	  border-color: tomato;
	`;
	render(
	  <div>
	    {" "}
	    <Button>Normal Button</Button> <TomatoButton>Tomato Button</TomatoButton>{" "}
	  </div>
	);

> 通过props做样式适配

	const Button = styled.button`
	  background: ${props => (props.primary ? "palevioletred" : "white")};
	  color: ${props => (props.primary ? "white" : "palevioletred")};
	  font-size: 1em;
	  margin: 1em;
	  padding: 0.25em 1em;
	  border: 2px solid palevioletred;
	  border-radius: 3px;
	`;
	render(
	  <div>
	    <Button>Normal</Button> <Button primary>Primary</Button>{" "}
	  </div>
	);


说明：css-in-js其实没有太多的东西，就是解决在组件内部实现css引入，并限定作用域。在Vue中则更加清晰，等价于.vue文件中<style scope>...</style>的作用，只是React中对此类实现没有官方支持，比较开放，所以涌现出非常多的第三方库，styled-components就是其中较好的一个库，当然也可以使用其他的库实现css引入组件