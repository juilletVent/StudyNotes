# Fragments

在返回子元素列表集合的时候可以使用Fragments，而不是在返回的外层套上额外的div

使用方法如下：

	render() {
	  return (
	    <>
	      <ChildA />
	      <ChildB />
	      <ChildC />
	    </>
	  );
	}

**<></> 是 <React.Fragment/> 的语法糖。**

如果fragment需要有属性 这只能采取显示书写的方式，也就是使用React.fragment标签形式

**Fragment唯一能支持的属性只有key，其他属性并不支持**

	function Glossary(props) {
	  return (
	    <dl>
	      {props.items.map(item => (
	        // 没有`key`，将会触发一个key警告
	        <React.Fragment key={item.id}>
	          <dt>{item.term}</dt>
	          <dd>{item.description}</dd>
	        </React.Fragment>
	      ))}
	    </dl>
	  );
	}



