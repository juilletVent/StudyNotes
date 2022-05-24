#CSS3 3D 变换

> 3D 变换基础方法

![](http://image.zhangxinxu.com/image/blog/201209/3d_axes.png)

- rotateX( angle )
- rotateY( angle )
- rotateZ( angle )

**旋转操作，会改变坐标系的坐标轴，例如 rotateX(90deg)将导致 Y 轴一并旋转 90deg，在此基础上，如果使用 translateZ(50px),将与没有旋转前调用 translateY(50px)，效果一致,以此证明，旋转将会改变三维坐标轴的方向，而元素的三维方向不会脱离坐标轴，所有的 3D 变换都是源于对坐标轴的操作**

> 视点|透视点[**perspective**属性]

两种书写：一种用在舞台元素上（动画元素们的共同父辈元素）；第二种就是用在当前动画元素上

    .stage {
        perspective: 600px;
    }
    #stage .box {
        transform: perspective(600px) rotateY(45deg);
    }

**透视点决定了元素视觉效果的远近，一般设置在 3D 舞台上**

> 视点|[perspective-origin]

解释为平视位置的定义，将影响 3D 图形的渲染，如果视点偏下，将导致图形看起来在上方，反之看起来像下方

    perspective-origin: 25% 75%;

> transform-style: preserve-3d

3D 舞台效果，赋予 3D 效果，设置在舞台元素上，必不可少

前者 flat 为默认值，表示平面的；后者 preserve-3d 表示 3D 透视，如果只有一个 3D 变换元素，则两者表现无差异，但是如果是多个元素一起变换，则 preserve-3d 的表现符合现实认知，而 flat 则表现为，简单的将变换后的元素堆叠在一起

> backface-visibility 背后的图片是否可见

默认情况下，我们是可以看到背后的元素因此，为了切合实际，我们常常会这样设置，使后面元素不可见

    backface-visibility:hidden;
