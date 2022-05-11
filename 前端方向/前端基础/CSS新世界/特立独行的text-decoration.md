## text-decoration 实际上是简写

包含的属性如下：

- text-decoration-line：表示装饰线的类型
- text-decoration-style：表示装饰线的样式风格。
- text-decoration-color：表示装饰线的颜色。
- text-decoration-thickness：表示装饰线的粗细

## 非常有意思的特性：属性叠加

如果父元素和子元素使用相同的 CSS 属性，那么子元素的属性值一定会覆盖父元素的属性值。CSS 属性那么多，几乎都遵循了这个规律，然而，在这么多 CSS 属性中出现了一个异类，那就是 text-decoration 属性。当父元素和子元素同时设置 textdecoration 效果的时候，文字的装饰线效果是累加的，而不是覆盖的。

```html
<section>
  <p>子元素</p>
  <p>子元素</p>
</section>
```

```css
section {
  text-decoration: dashed underline;
}
p {
  text-decoration: wavy overline;
}
```

这个例子中：p 元素将会同事应用两个样式，而不是仅仅应用自己当前层级的样式，这与绝大多数的 CSS 属性表现出来的覆盖特性有非常大的不同

## 优化文字下划线显示（如果使用到文字下划线，固定添加即可）

普通的下划线会与文字下边缘贴合在一起，显示效果不佳，这个属性将下划线与文字之间适当隔开了

```css
text-underline-position: under;
```

### 调整下划线渲染的位置

text-underline-offset 属性只对下划线类型的装饰线有效，对删除线和上划线都无效。

```css
text-underline-offset：1em;
```
