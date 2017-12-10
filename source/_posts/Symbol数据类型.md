---
title: Symbol数据类型
date: 2017-12-10 18:32:09
tags: [Symbol]
categories: ES6
---

# Symbol 概述

`Symbol` 是ES6引入的一种新的原始数据类型，表示独一无二的值。
<!--more-->
Symbol 值通过 Symbol 函数生成。Symbol 函数前不能使用 `new` 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

```JavaScript
let a = Symbol()
console.log(typeof a) // symbol

let c = new Symbol() // TypeError: Symbol is not a constructor
```

Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。

```JavaScript
let a = Symbol('haha')
console.log(a) // Symbol(haha)

let b = Symbol({name: 'weizhuang'})
console.log(b); // Symbol([object Object])
```

> 注意，Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。

```JavaScript
let a = Symbol('zhuang')
let d = Symbol('zhuang')
console.log(a === d); // false

let e = Symbol()
let f = Symbol()
console.log(e === f); // false
```

## Symbol 与其他数据类型

Symbol 值不能与其他类型的值进行运算，会报错。

```JavaScript
let a = Symbol('zhuang')
a + 'lian'  // TypeError: Cannot convert a Symbol value to a string
a + 10      // TypeError: Cannot convert a Symbol value to a number
a + true    // TypeError: Cannot convert a Symbol value to a number
```

Symbol 值可以显式转为字符串。

```JavaScript
console.log(String(a)); // Symbol(zhuang)
console.log(a.toString()); // Symbol(zhuang)
```

Symbol 值也可以转为布尔值，但是不能转为数值。

```JavaScript
console.log(Boolean(a));  // true
console.log(Number(a));  // TypeError: Cannot convert a Symbol value to a number
```

# 作为属性名的 Symbol

Symbol 值可以作为对象的属性名。由于每一个 Symbol 值都是不相等的，这样就可以保证不会出现同名的属性名。

```JavaScript
let a = Symbol('a')
let obj = {
  [a]: 'weizhuang'
}
console.log(obj[a]); // weizhuang
```

> 注意，Symbol 值作为对象属性名时，不能用点运算符。

## 属性名的遍历

Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 Symbol 属性名。

`Object.getOwnPropertySymbols` 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```JavaScript
let a = Symbol('a')
let obj = {
  [a]: 'weizhuang',
  b: 'honglian'
}
for (let key in obj) {
  console.log(key + ': ' + obj[key]); // b: honglian
}
console.log(Object.getOwnPropertyNames(obj)); // ["b"]
console.log(Object.keys(obj)); // ["b"]
console.log(JSON.stringify(obj)); // {"b":"honglian"}
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a)]
```

另一个新的 API，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```JavaScript
console.log(Reflect.ownKeys(obj)); // ["b", Symbol(a)]
```

# Symbol.for()、Symbol.keyFor()

有时，我们希望重新使用同一个 Symbol 值，`Symbol.for` 方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

Symbol.for() 与 Symbol() 这两种写法，都会生成新的 Symbol。它们的区别是，**前者会被登记在全局环境中供搜索，后者不会**。Symbol.for() 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。

```JavaScript
let s1 = Symbol.for('zhuang')
let s2 = Symbol.for('zhuang')
console.log(s1 === s2); // true

let s3 = Symbol('lian')
let s4 = Symbol('lian')
console.log(s3 === s4); // false

let s5 = Symbol('fei')
let s6 = Symbol.for('fei')
console.log(s5 === s6); // false
```

`Symbol.keyFor` 方法返回一个**已登记**的 Symbol 类型值的key。

```JavaScript
let s1 = Symbol.for('zhuang')
console.log(Symbol.keyFor(s1)); // zhuang
let s3 = Symbol('lian')
console.log(Symbol.keyFor(s3)); // undefined
```

> 上面代码中，变量 s3 属于未登记的 Symbol 值，所以返回 undefined。



