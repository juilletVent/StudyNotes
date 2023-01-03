<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [单向 CSS 过渡变换](#%E5%8D%95%E5%90%91-css-%E8%BF%87%E6%B8%A1%E5%8F%98%E6%8D%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
