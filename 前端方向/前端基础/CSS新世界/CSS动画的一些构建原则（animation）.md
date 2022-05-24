## 一些需要注意的点

- 复合动画拆分定义，便于复用(与函数式编程思路一样，定义原子操作，然后进行组合)

> Bad

```css
.element {
  animation: fadeInSlideInRight 0.2s;
}
@keyframes fadeInSlideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX (0%);
  }
}
```

> Good

```css
.element {
  animation: fadeIn 0.2s, slideInRight 0.2s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  t o {
    transform: translateX(0%);
  }
}
```

- keyframes 重复定义的关键帧，属性是合并覆盖，并不是直接完全替换
- 关键帧中的样式可以不连续（前一个关键具备的属性，后一个关键帧可以没有）
- !important 无效，当 CSS 动画执行的时候，关键帧中定义的 CSS 优先级就是最高的
- keyframes 中定义的关键帧 CSS 属性优先级最高，甚至超过`!important`
