---
title: javascript中的特殊函数
date: 2017-05-26 21:15:46
tags: [javascript, 匿名函数, 自调函数, 回调函数, 作为值的函数]
categories: Javascript
---

## 特殊函数

JavaScript中拥有5种特殊函数：内部函数、匿名函数、自调函数、回调函数、作为值的函数。
<!-- more -->

### 内部函数

在指定函数中定义的函数，详见 “作用域” 篇。

### 匿名函数

javascript可以将函数作为数据使用。作为函数主体，它像普通的数据一样，不一定要有名字。默认名字的函数被称之为匿名函数。如下：

    function (a){return a;}

匿名函数的两种用法：
* 回调函数：可以将匿名函数作为参数传递给其他函数。接收方函数能够利用所传递的函数来完成某些事情。
* 自调函数：定义匿名函数来执行某些一次性任务。

### 自调函数

自调函数就是函数在定义后自行调用，自调函数只能被调用一次，可以用来做代码优化，节省全局的命名空间。

自调函数语法结构：
* (function(形参){函数体})(实参)
    两对并列小括号，第一对小括号放置一个匿名函数，第二对小括号的作用为“立即调用”

``` bash
(function(){
    console.log('这是第一种自调函数');
})()
```

* (function(形参){函数体}(实参))
    与第一种方式类似，同样是两对小括号，不同的是，第对个小括号放在第对个小括号里面，放置在函数体后面。

``` bash
(function(str){
    console.log('hello' + str);
}('world'))
```

### 回调函数

当一个函数作为参数传递给另一个函数时，作为参数的函数被称之为回调函数。

``` bash
function add(a, b){
    return a() + b();
}
var one = function(){return 1;}
var two = function(){return 2;}
console.log(add(one, two)); // 输出 3
// 可以直接使用匿名函数来替代one和two，以作为目标函数的参数
console.log(add(function(){return 1;}, function(){return 2;}));
```

上述代码中，函数one和two都作为函数add()的参数传递。所以函数one()和two()都是回调函数。
如果回调函数是一个匿名函数，就称之为匿名回调函数。

回调函数的优点：
* 它可以在不做命名的情况下传递函数（这意味着可以节省全局变量）。
* 可以将一个函数的调用操作委托给另一个函数。
* 回调函数也有助于提升性能。

### 作为值的函数

将一个函数作为另一个函数的结果进行返回，作为结果返回的函数称之为作为值的函数。

``` bash
function fn(args){
    return function add(){
        return args + 10;
    }
}
var f = fn(20);
console.log(f()); // 输出 30
```