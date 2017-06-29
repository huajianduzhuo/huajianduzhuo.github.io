---
title: javascript作用域
date: 2017-05-26 19:36:33
tags: [javascript, 作用域]
categories: Javascript
---

# 作用域

变量和函数都具有作用域。作用域就是变量和函数的可被访问的范围，控制着变量和函数的可见性和生命周期。

变量的作用域可被分为全局作用域和函数作用域（局部作用域）。如果变量是被定义在全局作用域的话，在javascript代码中的任何位置都可以访问该变量；如果变量是被定义在指定函数内部的话，在javascript代码中只能在该函数内访问该变量。

函数的作用域也可被分为全局作用域和函数作用域（局部作用域）。被定义在指定函数内部的函数被称之为局部函数或内部函数。
<!-- more -->
    
    注意：ECMAScript6 之前的javascript没有语句块作用域。

## 变量的作用域

一个变量的作用域，是程序源代码中定义这个变量的区域。

### 全局变量

在所有函数之外声明的变量，叫做全局变量，因为它可被当前文档中的其他代码所访问。

``` bash
var msg = 'this is message'; // 定义全局变量 msg
//在全局作用域访问变量 msg
console.log(msg); // 输出 this is message
function fn(){
    //在函数作用域访问变量 msg
    console.log(msg); // 输出 this is message
}
fn();
```

还有一种特殊的方式定义全局变量，就是在函数内定义变量时，没有使用关键字var，则该变量称为全局变量。

``` bash
function fun(){
    // 定义变量没有使用var关键字
    str = 'this is string';
    // 在函数作用域访问变量 str
    console.log(str); // 输出 this is string
}
fun();
// 在全局作用域访问变量 str
console.log(str); // 输出 this is string
```

### 局部变量

在函数内部声明的变量，叫做局部变量，因为它只能在该函数内部访问。

``` bash
function fun(){
    // 定义局部变量 str
    var str = "this is string";
    // 在函数作用域访问变量 str
    console.log(str); // 输出 this is string
}
fun();
// 在全局作用域访问变量 str
console.log(str); // 输出报错
```

> 注：关于声明提前的问题，请参考另一篇博客 [javascript变量和函数声明提前](/javascript变量和函数声明提前/)

## 函数的作用域

### 全局函数

全局函数是被定义在全局作用域的，在任何位置都可以访问或调用该函数。

``` bash
function fn(num1, num2){
    console.log(num1 + num2);
}
fn(1, 2); // 输出 3
```

### 内部函数

定义在一个函数内部的函数，称为内部函数，只能在该内部函数的外部函数调用。内部函数在全局作用域调用会报错。

``` bash
function outer(){ // 全局函数
    function inner(){ // 局部函数
        console.log("inner");
    }
    inner(); // 调用正常
}
inner(); // 报错
```

# 作用域链

JavaScript是基于词法作用域的语言，通过阅读包含变量定义在内的数行源码就能知道变量的作用域。全局变量在程序中始终都是有定义的。局部变量在声明它的函数体内以及其所嵌套的函数内始终是有定义的。

