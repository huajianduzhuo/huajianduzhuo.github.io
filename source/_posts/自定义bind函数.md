---
title: 自定义bind函数
date: 2017-08-17 16:47:48
tags: [自定义bind函数]
categories: Javascript
---

MDN 对 `Function.prototype.bind()` 函数的介绍：

　　bind() 方法创建一个新的函数, 当被调用时，将其 this 关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
<!-- more -->
**语法：**

    fun.bind(thisArg[, arg1[, arg2[, ...]]])

**参数：**
* thisArg
  当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。
* arg1, arg2, ...
  当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

**返回值：**
　　返回由指定的 this 值和初始化参数改造的原函数拷贝

---

为了更好的理解 bind 函数，我定义了一个 mybind 函数，并通过 mybind 函数实现了 bind 函数的作用。  
mybind 函数代码：
```
Function.prototype.mybind = function() {
    if (arguments.length < 1) {
        throw 'Function mybind requires at least one parameter';
    }
    var that = this;
    var $this = arguments[0];
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (i > 0) {
            args.push(arg);
        }
    }
    return function() {
        var newArgs = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            newArgs.push(arg);
        }
        that.apply($this, args.concat(newArgs));
    }
}
```

测试 mybind 函数的作用：
```
var obj = {
    uname: '测试'
};

function fun(a, b) {
    console.log(this.uname, a, b);
}
var fun1 = fun.mybind(obj, 12);
fun1(23);
```
运行后得到： `测试 12 23` ， mybind 函数基本实现了 bind 函数的功能。

