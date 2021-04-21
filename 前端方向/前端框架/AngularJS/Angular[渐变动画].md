<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [切换相关流程](#%E5%88%87%E6%8D%A2%E7%9B%B8%E5%85%B3%E6%B5%81%E7%A8%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 切换相关流程

> 进入流程：
	
添加enter进入初始效果 -> 动画开始，切换到 enter-active目标效果 -> 进入完成，删除所有相关class


路由切换相关类：

> route & ng-if

进入：

	.ng-enter
	.ng-enter.ng-enter-active

离开：

	.ng-leave
	.ng-leave.ng-leave-active

> ng-show

添加：
	
	.ng-hide-remove
	.ng-hide-remove.ng-hide-remove-active

移出：

	.ng-hide-add
	.ng-hide-add.ng-hide-add-active

ng-if与ng-router的切换公用一套class，ng-show使用单独的一套class

实现相关的切换动画只需要为相应的class编写切换样式即可，以下是例子：

**使用keyframe编写动画**

	/* Animate view transitions with `ngView` */
	.view-container {
	  position: relative;
	}
	
	.view-frame {
	  margin-top: 20px;
	}
	
	.view-frame.ng-enter,
	.view-frame.ng-leave {
	  background: white;
	  left: 0;
	  position: absolute;
	  right: 0;
	  top: 0;
	}
		
	.view-frame.ng-enter {
	  animation: .5s fade-in;
	  z-index: 100;
	}
	
	.view-frame.ng-leave {
	  animation: .5s fade-out;
	  z-index: 99;
	}
	
	@keyframes fade-in {
	  from {
	    opacity: 0;
	    transform: translateX(50px);
	  }
	  
	  to {
	    opacity: 1;
	    transform: translateX(0px);
	  }
	}
	
	@keyframes fade-out {
	  from {
	    opacity: 1;
	    transform: translateX(0px);
	  }
	  
	  to {
	    opacity: 0;
	    transform: translateX(-50px);
	  }
	}

	//*********************************************

**使用transition完成动画**

	/* img fade in & out */
	.phone{
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  transition: all .5s;
	}
	
	.phone.ng-hide-remove{
	  z-index: 100;
	  opacity: 0;
	  transform: scale(0.5,0.5);
	  transition-delay: .2s;
	}
	
	.phone.ng-hide-remove.ng-hide-remove-active{
	  opacity: 1;
	  transform: scale(1,1);
	}
	
	.phone.ng-hide-add{
	  z-index: 99;
	  transform: translateX(0);
	}
	
	.phone.ng-hide-add.ng-hide-add-active{
	  transform: translateX(-400px);
	}
	
	/* ng-if or ng-router */
	
	.phone.ng-enter{
	  z-index: 100;
	  opacity: 0;
	  transform: scale(0.5,0.5);
	  transition-delay: .2s;
	}
	
	.phone.ng-enter.ng-enter-active{
	  opacity: 1;
	  transform: scale(1,1);
	}
	
	.phone.ng-leave{
	  z-index: 99;
	  transform: translateX(0);
	}
	
	.phone.ng-leave.ng-leave-active{
	  transform: translateX(-400px);
	}