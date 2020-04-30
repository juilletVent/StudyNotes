## Vue 过渡

只需要定义四个关键帧CSS状态以及两个动画执行函数即可

	//进入以及退出的动画函数
	.v-enter-active,.v-leave-active{
		transition: all .5s ease;
	}

	进入的初始状态、退出的结束状态
	.v-enter,.v-leave-to{
		opacity:0;
		transform: scale(0,0);
	}

	//进入的结束状态、退出的初始状态
	.v-enter-to,.v-leave{
		opacity:1;
		transform: scale(1,1);
	}

	<div id="demo">
	  <button v-on:click="show = !show">
	    Toggle
	  </button>
	  <transition name="fade">
	    <p v-if="show">hello</p>
	  </transition>
	</div>

必须使用transition包裹，为transition指定name属性可以更改默认的前缀，例如name="my"，则关键帧以及函数CSS样式则以my-开头：my-enter{...}


## CSS 动画

定义动画序列，在CSS过度属性的两个函数样式中填入动画执行语句即可，前缀规则一致

	@keyframes show-in{
		0%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
	
	.v-enter-active{
		animation: show-in .5s reverse;
	}
	.v-leave-active{
		animation: show-in .5s;
	}

## 自定义过渡类名

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

栗子：

	<transition 
		enter-class="comeing" 
		enter-to-class="comeing-to"
		leave-class="out"
		leave-to-class="out-to">
		<p v-if="toggle">Hello</p>
	</transition>

相应的CSS类名对应即可

## JavaScript 钩子

可以在属性中声明 JavaScript 钩子

~~~
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

// ...
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
~~~

栗子：
~~~
CSS:
.jsAnim{
	position: relative;
}

.jsAnimItem{
	position: absolute;
	display: block;
	height: 30px;
	width: 100px;
	padding: 5px;
	margin: 3px;
	border: 1px solid gray;
	border-radius: 3px;
	text-align: center;
	line-height: 30px;
}

HTML:
<div class="jsAnim">
	<button @click="showOne=!showOne">change</button>
	<transition-group
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
		:css="false"
		>
		<div class="jsAnimItem" v-if="showOne" :key="1">block-1</div>
		<div class="jsAnimItem" v-else :key="2">block-2</div>
	</transition-group>
</div>

JS:
new Vue({
	el:".jsAnim",
	data:function(){
		return {
			showOne:true
		};
	},
	methods:{
		beforeEnter(el,done){
			$(el).css({
				opacity:0,
				left:200
			});
		},
		enter(el,done){
			$(el).animate({
				opacity:1,
				left:0
			},500,'swing',done);
		},
		leave(el,done){
			$(el).animate({
				opacity:0,
				left:200
			},500,'swing',done);
		}
	}
});
~~~

**当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成。**

**推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。**

**我的理解：文档中的例子表明，可以使用JS钩子来执行第三方引入的动画库，但是在动画队列结束时[所有动画结束]必须回调Vue的done方法，如果仅仅使用JS执行动画的话**

## 多个元素的过渡

我们之后讨论 多个组件的过渡, 对于原生标签可以使用 v-if/v-else 。最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：

	<transition>
	  <table v-if="items.length > 0">
	    <!-- ... -->s
	  </table>
	  <p v-else>Sorry, no items found.</p>
	</transition>

可以这样使用，但是有一点需要注意：必须要key属性

**当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。**

### 过渡模式

同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了 过渡模式

- 默认：同时进行
- in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
- out-in: 当前元素先进行过渡，完成之后新元素过渡进入。

梨子：

	<transition name="fade" mode="out-in">
	  <!-- ... the buttons ... -->
	</transition>

## 列表过渡

那么怎么同时渲染整个列表，比如使用 v-for ？在这种场景中，使用 <transition-group> 组件。在我们深入例子之前，先了解关于这个组件的几个特点：

- 不同于 <transition>， 它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。
- 内部元素 总是需要 提供唯一的 key 属性值

**tag 的意思就是transition-group会被设置的tag标签所替换，如果要渲染ul>li则使用：**

~~~
<transition-group name="list" tag="ul">
    <li v-for="item in items" :key="item.id"></li>
  </transition-group>

实际渲染后外层使用ul包裹
~~~

### 列表的位移过渡

用于解决表项的瞬间移动问题

<transition-group> 组件还有一个特殊之处。不仅可以进入和离开动画，还可以改变定位。要使用这个新功能只需了解新增的 v-move 特性，它会在元素的改变定位的过程中应用。像之前的类名一样，可以通过 name 属性来自定义前缀，也可以通过 move-class 属性手动设置。

大坑[文档没写]：

1. 必须为列表项本身书写过度属性:trasntion
2. 必须为退出过程的样式定义绝对定位：v-leave-active{postion:adsolute;}，但是不要为v-enter-active添加绝对定位，否则将导致添加时的过渡动画位置错误
3. 在使用过渡组时，不要为父容器添加text-align:center样式，否则将导致过渡动画带有横向动画[如果你使用的是纵向translate]




