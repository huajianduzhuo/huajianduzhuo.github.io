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
* 以表达式方式定义的函数，与变量提前一样，只有声明提前，而函数创建不会提前，所以在定义之前不能被调用。

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

### 函数和变量同名

　　变量的声明和函数的创建是在JavaScript引擎预解析代码阶段执行的，所以代码在执行时，会发现变量和函数被提前了。
　　在预解析阶段，变量的声明先执行，后执行函数的创建，所以当变量和函数同名时，JavaScript引擎会先声明一个变量，此时值为undefined，再创建函数，函数会覆盖之前声明的变量。
　　所以，在变量被赋值的代码执行之前，可以直接调用函数，而变量赋值的代码执行后，变量的值会覆盖该函数，此时，再调用函数就会报错。