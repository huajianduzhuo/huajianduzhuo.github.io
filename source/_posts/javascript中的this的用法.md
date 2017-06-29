---
title: javascript中的this的用法
date: 2017-06-05 23:58:38
tags: [this]
categories: Javascript
---

javascript中的this，在不同情况下得到的值不同。
<!--more-->

### 在全局作用域中 

指向 window 对象

``` bash
console.log(this); // Window
```

### 在构造函数中  

指向通过构造函数创建的对象

``` bash
function A() {
    this.name = 'myj';
}
var a = new A();
console.log(a.name); // myj
```

### 在普通函数中 

指向 window 对象

``` bash
function b() {
    console.log(this);
}
b(); // Window 
```
### 在局部函数/回调函数中  

指向 window 对象

``` bash
function d() {
    function e() {
        console.log(this);// Window
    }
    e();
}
d();
```

### 在对象的方法中 

指向当前对象

``` bash
function fn() {
    console.log(this);
}
var obj = {
    sayMe : fn
}
obj.sayMe(); // Object { sayMe: fn() } -- 即obj对象
```

### 在事件的处理函数中 

指向触发当前事件的标签

``` bash
var  btn = document.getElementById('btn');
btn.onclick = function () {
    console.log(this); // <button id="btn">button</button>
}
```

### 使用call和apply调用的函数，第一个参数就是this
