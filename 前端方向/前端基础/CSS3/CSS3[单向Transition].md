## 单向 CSS 过渡变换

```html
<div class="a"></div>
<div class="b"></div>
```

```css
/*one way transition*/
div.a {
  width: 200px;
  height: 200px;
  background: blue;
  margin-bottom: 10px;
}
div.a:hover {
  background: red;
  transition: all 1s;
}

/*two-way transition*/
div.b {
  width: 200px;
  height: 200px;
  background: blue;
  transition: all 2s;
}
div.b:hover {
  background: red;
  transition: all 2s;
}
```
