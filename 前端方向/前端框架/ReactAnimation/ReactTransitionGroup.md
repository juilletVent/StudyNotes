<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Install](#install)
- [Use](#use)
    - [动画结束后移除组件](#%E5%8A%A8%E7%94%BB%E7%BB%93%E6%9D%9F%E5%90%8E%E7%A7%BB%E9%99%A4%E7%BB%84%E4%BB%B6)
- [动画钩子](#%E5%8A%A8%E7%94%BB%E9%92%A9%E5%AD%90)
- [初始化动画](#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%8A%A8%E7%94%BB)
- [使用 TransitionGroup](#%E4%BD%BF%E7%94%A8-transitiongroup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

`yarn add react-transition-group`

## Use

组件部分

关键帧的 class 会添加到 CSSTransition 的子元素上，所以需要保证其只有一个子元素

```
import { CSSTransition } from 'react-transition-group';

...

return
  <CSSTransition
    # 动画状态，true或false控制
    in={status}
    # class前缀，用于定义动画,***后续所有的样式部分都需要使用这里定义的前缀进行class命名***
    className="fade"
    # Transition动画时长
    timeout={1000}
  >
  <div>目标元素</div>
</CSSTransition>;

...

样式部分

根据组件部分定义的className定义样式名称，一共6个关键帧class

# 入场开始前
.fade-enter
# 入场开始至结束前
.fade-enter-active
# 入场结束
.fade-enter-done

# 离场开始前
.fade-exit
# 离场开始至结束前
.fade-exit-active
# 离场结束
.fade-exit-done

```

#### 动画结束后移除组件

为组件配置 unmountOnExit 属性即可

    <CSSTransition
        in={status}
        className="fade"
        timeout={1000}
        unmountOnExit
      >
      <div>目标元素</div>
    </CSSTransition>

## 动画钩子

提供了关键帧的动画钩子,钩子具备一个参数，为目标元素的 ref

- onEnter
- onEntering
- onEntered
- onExit
- onExiting
- onExited

## 初始化动画

如果需要使用初始化的入场动画，需要为 CSSTransition 添加 apper 属性，在初始化时会添加如下 class，一般来说跟入场动画的 class 定义在一起就行了

- fade-appear
- fade-appear-active

## 使用 TransitionGroup

只需要使用 TransitionGroup 包裹 CSSTransition，并且移除 CSSTransition 的 in 属性即可

```
import { CSSTransition,TransitionGroup } from 'react-transition-group';

<TransitionGroup>
  {
    data.map(
      item=>
        <CSSTransition
          # 使用了transitionGroup后此属性不再需要
          # in={status}
          className="fade"
          timeout={1000}
          unmountOnExit
        >
          <div>目标元素</div>
        </CSSTransition>
    )
  }
</TransitionGroup>

```
