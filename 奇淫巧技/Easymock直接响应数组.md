```javascript
[
  function ({ Mock }) {
    Mock.mock({
      "array|5": [
        {
          // 目标数组
        },
      ],
    }).array.forEach((item) => {
      this.push(item);
    });
    return this.pop();
  },
];
```
