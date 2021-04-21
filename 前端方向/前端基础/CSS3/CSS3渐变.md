<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3-渐变](#css3-%E6%B8%90%E5%8F%98)
  - [事件](#%E4%BA%8B%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3-渐变

线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向

语法：

	background: linear-gradient(direction, color-stop1 [n%][, color-stop2 [n%], ...]);
	
	含义：方向[可以使用角度n deg]，色值 [位置] [,色值 [位置]]...

	例子：

	background-image: linear-gradient(to right, 
		rgba(0, 0, 0, 0) 10%, 
		rgba(200, 200, 200, 0.6) 20%, 
		rgba(200, 200, 200, 0.6) 80%, 
		rgba(0, 0, 0, 0) 90%);

径向渐变（Radial Gradients）- 由它们的中心定义

语法：

	background: radial-gradient(center, shape size, start-color, ..., last-color);

center：

- length：用长度值指定径向渐变圆心的横坐标或纵坐标。可以为负值。
- percentage：用百分比指定径向渐变圆心的横坐标或纵坐标。可以为负值。
- left：设置左边为径向渐变圆心的横坐标值。
- center：设置中间为径向渐变圆心的横坐标值或纵坐标。
- right：设置右边为径向渐变圆心的横坐标值。
- top：设置顶部为径向渐变圆心的纵标值。
- bottom：设置底部为径向渐变圆心的纵标值。

**center使用:形状 at 横向中心 纵向中心 **


shape：circle 或 ellipse 圆/椭圆

~~~
20px径向渐变
radial-gradient(20px circle,hsla(220,89%,100%,1),hsla(30,60%,60%,.9));
x轴2em y轴4em 的椭圆径向渐变
radial-gradient(2em 4em ellipse,hsla(220,89%,100%,1),hsla(30,60%,60%,.9));
圆心在顶部中间的圆形渐变
radial-gradient(8em circle at top,hsla(220,89%,100%,1),hsla(30,60%,60%,.9));
同上，50%  为x坐标轴 0% 为y 坐标轴
radial-gradient(8em circle at 50% 0%,hsla(220,89%,100%,1),hsla(30,60%,60%,.9));

椭圆
radial-gradient(50% 50% ellipse at 50% 50%,rgba(255,0,0,1) 0%,rgba(255,255,0,1) 100%);
~~~

**circle只能指定一个半径，ellipse必须指定长轴的短轴，否则无效**

> size

词汇：closest[最近的] farthest[最远的] side[边、侧] corner[角]

- closest-side:圆或椭圆渐变边缘与容器四边的内切圆
- closest-corner：容器盒子模型为圆或椭圆的渐变边缘的内切矩形
- farthest-side：暂不明白，效果与closest-side大致一样
- farthest-corner：暂不明白，效果与farthest-side大致一样

实例：

	radial-gradient(closest-corner circle at 50% 75%, rgb(220, 75, 200),rgb(0, 0, 75));

**使用了预定义size后就不能在指定自定义的渐变尺寸了，否则样式无效**



## 事件

	private whichTransitionEvent(el: any) {
        let transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',

            'animationstart': 'animationend',
            'webkitAnimationStart': 'webkitAnimationEnd',
            'MSAnimationStart': 'MSAnimationEnd',
        };
        for (let t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

	msgDom.on(this.whichTransitionEvent(msgDom[0]), function (e) {
        if (show == 1) {
            console.log('设置延时');
            setTimeout(e => {
                console.log('移除class');
                msgDom.removeClass('layer-top-active');
                show = 0;
            }, 1000);
        } else {
            console.log('清除结点');
            msgDom.remove();
        }
    })



