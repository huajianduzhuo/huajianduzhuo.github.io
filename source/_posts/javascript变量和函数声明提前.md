---
title: javascript变量和函数声明提前
date: 2017-05-25 10:05:35
tags: [javascript, 声明提前]
categories: Javascript
---
### 变量声明提前

* javascript变量具有两种作用域：
    a 全局作用域
    b 函数作用域
* 变量在声明它们的脚本或函数中都是有定义的，变量的声明会“被提前”至脚本或函数的顶部
* 变量赋值不会提前
<!-- more -->

``` bash
console.log(a); //变量声明提前，因此这里得到undefined
var a = 'string1';
console.log(a); //这里得到 string1
function fn(){
    /*
        这里输出a得到undefined
        下面一行代码定义了一个局部变量a，由于声明提前，局部变量a在整个函数作用域都可以被找到，所以得到undefined
    */
    console.log(a); 
    var a = 'string2';
    console.log(a); // string2
}
```

### 函数声明提前

* 定义函数有两种方式：
    a 函数声明语句 -- function fn()\{\}
    b 表达式方式 -- var fn = function()\{\}
* 函数声明语句定义的函数“被提前”到外表脚本或外部函数作用域的顶部
    以这种方式声明的函数，可以被在它定义之前出现的代码所调用。
* 以表达式定义的函数，要使用一个以表达式方式定义的函数，必须把它赋值给一个变量。
    变量的声明提前了，但给变量赋值是不会提前的。
    所以，以表达式方式定义的函数在定义之前无法调用。

``` bash
fn1(); // 可以执行
fn2(); // 报错：函数fn2 is not a function
console.log(fn2); // undefined -- 变量声明提前，得到undefined
function fn1() {
    console.log('这是函数声明语句定义的函数');
}

var fn2 = function () {
    console.log('这是表达式定义的函数');
}
```

### 函数与变量同名问题

以表达式方式定义的函数，与变量同名时，与两个变量同名（即变量重新声明赋值）时的情况相同，因此不讨论此种情况。
下面讨论的变量与函数同名的情况，单指以函数声明语句定义的函数。

* 变量与函数同名，变量并不会被函数所覆盖，使用该变量名可得到变量值，而定义的函数则失效。

``` bash
var fn = 'ceshi';
function fn() {
    console.log('this is a ceshi function');
}
console.log(fn); // 打印fn，得到定义的字符串“ceshi”
fn(); // 将fn当作函数调用，报错：fn is not a function
```

* 特殊情况：在定义变量fn之前，调用函数fn，可以正确调用

``` bash
fn(); // 得到“this is a ceshi function”
var fn = 'ceshi';
function fn() {
    console.log('this is a ceshi function');
}
console.log(fn); // 打印fn，得到定义的字符串“ceshi”
fn(); // 将fn当作函数调用，报错：fn is not a function
```