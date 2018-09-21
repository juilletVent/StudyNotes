# Render props

这是一个在React中复用代码非常有用的小技巧，

下面这个组件可以追踪鼠标位置：

	class MouseTracker extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	    this.state = { x: 0, y: 0 };
	  }
	
	  handleMouseMove(event) {
	    this.setState({
	      x: event.clientX,
	      y: event.clientY
	    });
	  }
	
	  render() {
	    return (
	      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
	        <h1>Move the mouse around!</h1>
	        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
	      </div>
	    );
	  }
	}

现在如我我有一张图需要跟随鼠标进行布局，想复用上面的MouseTracker组件，可能我们会这样书写：

	class Cat extends React.Component {
	  render() {
	    const mouse = this.props.mouse
	    return (
	      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
	    );
	  }
	}

	class MouseWithCat extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	    this.state = { x: 0, y: 0 };
	  }
	
	  handleMouseMove(event) {
	    this.setState({
	      x: event.clientX,
	      y: event.clientY
	    });
	  }
	
	  render() {
	    return (
	      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
	
	        {/*
	          We could just swap out the <p> for a <Cat> here ... but then
	          we would need to create a separate <MouseWithSomethingElse>
	          component every time we need to use it, so <MouseWithCat>
	          isn't really reusable yet.
	        */}
	        <Cat mouse={this.state} />
	      </div>
	    );
	  }
	}
	
	class MouseTracker extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Move the mouse around!</h1>
	        <MouseWithCat />
	      </div>
	    );
	  }
	}

上面的代码能够实现相关的逻辑，但是有一个非常关键的问题，我们创建了一个具有针对性的MouseWithCat，并且在Render中进行了组件硬编码，这将导致每一次组件复用都会创建一个类似的针对性的组件，这在大型应用中是灾难性的。

正确的做法是，我们应该抽离UI渲染的细节，让Mouse组件不关心UI如何渲染，对外提供一个RenderProps属性，在使用的时候动态传入具体的渲染细节，正确姿势如下：

	class Cat extends React.Component {
	  render() {
	    const mouse = this.props.mouse;
	    return (
	      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
	    );
	  }
	}
	
	class Mouse extends React.Component {
	  constructor(props) {
	    super(props);
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	    this.state = { x: 0, y: 0 };
	  }
	
	  handleMouseMove(event) {
	    this.setState({
	      x: event.clientX,
	      y: event.clientY
	    });
	  }
	
	  render() {
	    return (
	      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
	
	        {/*
	          Instead of providing a static representation of what <Mouse> renders,
	          use the `render` prop to dynamically determine what to render.
	        */}
	        {this.props.render(this.state)}
	      </div>
	    );
	  }
	}
	
	class MouseTracker extends React.Component {
	  render() {
	    return (
	      <div>
	        <h1>Move the mouse around!</h1>
	        <Mouse render={mouse => (
	          <Cat mouse={mouse} />
	        )}/>
	      </div>
	    );
	  }
	}

