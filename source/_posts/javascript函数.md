---
title: javascript函数
date: 2017-05-26 18:07:49
tags: [javascript, function, 预定义函数, arguments]
categories: Javascript
---

# 函数的定义与使用

函数是指一段javascript代码，只需要定义一次，就可以被多次执行或调用。简单来说，函数就是一组可重用的代码。

## 函数定义
<!-- more -->

### 1. 函数声明方式

> function 函数名(参数列表){
>     函数体
> }

``` bash
function fn(){
    console.log('this is function);
}
```

### 2. 字面量（直接量）方式

> var 函数名 = function(参数列表){
>     函数体
> }

``` bash
var fun = function(){
    console.log('this is function);
}
```

## 函数的调用

定义一个函数并不会自动执行函数，仅仅是赋予了函数名称以及明确函数被调用时该做些什么。调用函数才会真正执行这些动作。

调用函数的语法结构为： 函数名()

``` bash
fun();
```

## 函数的参数

函数的参数是指定义函数时，小括号中的内容，参数可以在函数体中使用。javascript中的函数定义并未制定函数参数的类型，函数调用时也未对传入的参数做任何的类型检查。

函数的参数可以分为以下两种：

* 形参

出现在函数定义文法中的参数列表是函数的形式参数，简称形参。简单来说，就是定义函数时使用的参数。

* 实参

函数调用时实际传入的参数是函数的实际参数，简称形参。

* 值得注意的是：
一般情况下，形参和实参的个数是相同的。但在javascript中，这一点并不强求，特殊情况下，函数形参和实参的个数可以不相同。形参和实参的匹配为从左到右一一对应。遗漏的参数将得到undefined，多余的参数将忽略。

``` bash
function fn(num1, num2){    // num1 和 num2 是形参
    console.log( num1 + num2 );
}
fn(1, 2); // 1和2是实参， 输出 3
```

## 函数返回值 -- return语句

函数还可以包含一个返回语句（return）。return并不是必需的。return语句使函数可以作为一个值来使用。

``` bash
function fn(msg){
    return "hello" + msg;
}
var res = fn("world");  // 变量res的值为 helloworld
```

* 注意：不明确return或return关键字后面没有内容时，默认返回undefined。

## arguments对象

### 替代形参

在函数代码中，使用arguments对象，无需指明形参参数名，就可以访问传入的实参。

使用方式为：arguments[index]，index从0开始。

``` bash
function fn(){
    return arguments[0] + arguments[1];
}
fn(2, 3); // 结果为 5 
```

### 检测参数个数

通过arguments.length属性，可以得到传入的参数的个数。

### 模拟函数的重载效果

用arguments对象判断传入的参数个数，可以模拟函数重载效果。

# 预定义函数

javascript预定义了一组函数，又称为全局函数，允许直接使用。

### eval()

eval()函数用于执行以字符串（String）形式出现的javascript代码。此函数可以动态的执行javascript代码。

``` bash
// 定义一个字符串，内容为javascript代码
var js = 'console.log("this is javascript")';
// 通过eval()函数执行上述内容
eval(js); // 输出 this is javascript
```

### 字符编码与解码

encodeURI()函数可把字符串作为URI进行编码。对以下在URI中具有特殊含义的ASCII标点符号，encodeURI()函数是不会进行转义的：

    , / ? : @ & = + $ #

decodeURI()函数可对encodeURI()函数编码过的URI进行解码。
decodeURI()函数和encodeURI()函数主要针对中文进行编解码。
对于在URI中具有特殊含义的ASCII标点符号，可以使用encodeURIComponent()函数和decodeURIComponent()函数。

### uneval()

创建一个Object的源代码的字符串表示。

### isFinite()

判断传入的值是否是有限的数值。

### isNaN()

判断一个值是否为数字。

### parseInt()

解析字符串参数，并返回指定的整数。

### parseFloat()

解析字符串参数，并返回一个浮点数。

