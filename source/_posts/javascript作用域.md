---
title: javascript作用域
date: 2017-05-26 19:36:33
tags: [javascript, 作用域]
categories: Javascript
---

# 作用域

　　变量和函数都具有作用域。作用域就是变量和函数的可被访问的范围，控制着变量和函数的可见性和生命周期。
　　ES5 中的作用域可被分为全局作用域和函数作用域（局部作用域）。如果变量或函数是被定义在全局作用域的话，在javascript代码中的任何位置都可以访问；如果被定义在函数内部的话，只能在该函数内访问。
<!-- more -->
> 注意：ECMAScript6 之前的javascript没有语句块作用域。

## 全局作用域

* 生命周期：全局作用域在页面打开时创建，在页面关闭时销毁。
* 所有在 script 标签中直接编写的内容都在全局作用域。
* 在全局作用域中有一个全局对象 window
    -- window代表的是整个浏览器窗口
    -- 在全局作用域中创建的变量都会作为window对象的属性保存
    -- 在全局作用域中创建的函数都会作为window对象的方法保存
* 在全局作用域中创建的变量和函数可以在整个页面中使用
    -- 在全局作用域中创建的变量称为全局变量
* 在函数中，不使用 var 关键字声明变量，该变量会默认成为全局变量
    -- 会造成作用域内变量混乱，不建议使用

**全局变量**
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

**函数内部不使用var关键字定义全局变量**
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

**全局函数**
``` bash
function fn(num1, num2){
    console.log(num1 + num2);
}
fn(1, 2); // 输出 3
```

## 函数作用域

每调用一次函数，就会创建一个新的函数作用域。

```
function fun(){
}
创建函数，没有创建函数作用域
fun();
调用函数，创建一个新的函数作用域
```

* 生命周期：函数作用域在**函数调用**时创建，在函数调用结束时销毁。
* 在函数作用域，可以访问全局变量。
* 在函数作用域中定义的变量称为局部变量，在全局中无法访问局部变量
    -- 在函数作用域中，如果不使用 var 关键字来声明变量，则该变量将会变为全局变量（避免这样使用）。
* 当我们在函数作用域中，使用一个变量时，会先在自身作用域中寻找
    -- 如果找到了，则直接使用
    -- 如果没找到，则去上一级作用域中寻找，直到找到为止
    -- 如果找到全局作用域中，依然没有，则会报错
* 如果需要在函数中访问全局变量，也可以使用 window 来访问。

**局部变量**
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

**局部函数**
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

一个函数 fn **被创建后**，fn 对象内部具有隐含属性 scope（作用域链），scope 是一个数组，该数组中包含函数 fn 的作用域链中的各个对象。

``` bash
function fn(){
}
```
如上，全局函数对象 fn 的 scope 属性中，只具有一个对象 window，在 fn 中使用变量时，若 fn 中不存在该变量，则沿着 scope 中的变量对象查找，即在 window 中查找。


``` bash
function fn1(){
    function fn2(){
    }
}
```
如上，局部函数对象 fn2 的 scope 属性中，具有两个对象，分别是 fn1 的闭包对象和 window，fn2 中使用的变量，若自身没有，则在 fn1 中找，还没有，在 window 中找。
