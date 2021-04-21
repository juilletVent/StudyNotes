<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [DOM布局](#dom%E5%B8%83%E5%B1%80)
  - [绝对布局特点](#%E7%BB%9D%E5%AF%B9%E5%B8%83%E5%B1%80%E7%89%B9%E7%82%B9)
  - [相对布局特点](#%E7%9B%B8%E5%AF%B9%E5%B8%83%E5%B1%80%E7%89%B9%E7%82%B9)
    - [Relative与Absolute组合使用](#relative%E4%B8%8Eabsolute%E7%BB%84%E5%90%88%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## DOM布局

### 绝对布局特点
使用left、right、top、bottom属性相对于其最接近的一个具有定位属性的父包含块进行绝对定位
![绝对定位](http://img.mukewang.com/53a00b130001e86707360547.jpg)

### 相对布局特点
过left、right、top、bottom属性确定元素在正常文档流中的偏移位置，**偏移后，依然占有其原有位置，其他元素不能占据**
![相对布局](http://img.mukewang.com/53a00d2b00015c4b06190509.jpg)

#### Relative与Absolute组合使用
参照定位的元素必须是相对定位元素的前辈元素

我的理解：使用Absolute进行绝对定位时，将最近的父容器指定为相对定位，此时本元素将以父控件为参照进行定位，而不是body

> 练习代码
~~~
#box3{
    width:200px;
    height:200px;
    position:relative;
}
#box4{
    width:99%;
    position:;
	position:absolute;
    bottom:0;
}

<div id="box3">
    <img src="http://img.mukewang.com/541a7d8a00018cf102000200.jpg">
    <div id="box4">当我还是三年级的学生时是一个害羞的小女生。</div>
</div>
~~~

> 效果

![组合使用](http://img.mukewang.com/541a7f20000161f902560237.jpg)
