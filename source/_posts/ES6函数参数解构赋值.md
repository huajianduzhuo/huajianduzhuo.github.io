---
title: ES6函数参数解构赋值
date: 2017-11-26 22:02:18
tags: [ES6, 解构赋值]
categories: ES6
---

## 函数参数解构赋值

函数的参数可以使用解构赋值。
<!--more -->

```JavaScript
function move({x, y}) {
  return [x, y];
}
move({x: 3, y: 5}); // [3, 5]

function move2([x, y]) {
  return {x, y};
}
move2([4, 5]); // {x: 4, y: 5};
```

但是，以上写法，当函数调用没有传递参数时，就会报错：

```JavaScript
move(); // ​​Cannot destructure property `x` of 'undefined' or 'null'.​
move2(); // ​​Cannot read property 'Symbol(Symbol.iterator)' of undefined​​
```

所以，当参数使用解构赋值时，需要为参数设置一个默认值。上面的函数改写为：

```JavaScript
function move({x, y} = {}) {
  return [x, y];
}
move({x: 3, y: 5}); // [3, 5]
move({x:3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [undefined, undefined]

function move2([x, y] = []) {
  return {x, y};
}
move2([4, 5]); // {x: 4, y: 5}
move2([4]); // {x: 4, y: undefined}
move2(); // {x: undefined, y: undefined}
```

## 函数参数解构赋值默认值

如下函数 move，接受一个对象为参数，并被解构为变量 x 和 y。变量 x 和 y 使用默认值，可以写成如下形式：

```javascript
function move({x=0, y=0} = {}) {
  return [x, y];
}
```

调用该函数：

```JavaScript
move({x:1, y:2}); // [1, 2]
move({x:3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

> 需要注意的是，ES6 内部使用严格相等运算符（===），判断一个位置是否有值，只有一个解构的成员严格等于 undefined，才会触发默认值。

```JavaScript
move({x: undefined}); // [0, 0]
move({x: null}); // [null, 0]
```

