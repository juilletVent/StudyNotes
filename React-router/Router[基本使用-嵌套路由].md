# 演示使用[嵌套路由]

使用流程，在app外层包裹Router(BrowserRouter/HashRouter)，如果使用了Redux，则将Provider包裹在Router外面,接管url，然后添加Switch组件，在Switch组件中添加路由匹配规则[Route组件，指定component属性来指定匹配时渲染的React组件]和匹配时渲染的组件，Switch的功能是实现单一匹配，在Switch外添加Link/NavLink路由导航，并制定to属性，标识导航位置，嵌套路由时，在组件内部再次构建上述过程。

缺省路由：在Switch最下方添加缺省路由，实现在路由匹配失败时进行路由重定向

> index.js

~~~
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

const About = () => (
  <div>
    <h3>About</h3>
  </div>
);
const Home = () => (
  <div>
    <h3>Home</h3>
  </div>
);
const Message = ({ match }) => {
  console.log(arguments);
  
  return (
    <div>
      <h3>new messages</h3> <h3>{match.params.id}</h3>
    </div>
  )
};

const Inbox = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <Link to={`${match.url}`}>def</Link>
    &nbsp;
    <Link to={`${match.url}/messages/1`}>child</Link>
    <Switch>
      <Route exact path={`${match.url}`} render={() => <h3>Default</h3>} />
      <Route path={`${match.url}/messages/:id`} component={Message} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
        <Redirect to="/" />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

~~~

> app.js

~~~
import React, { Component } from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/inbox">Inbox</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;

~~~


