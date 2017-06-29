---
title: javascript对象
date: 2017-05-31 10:45:30
tags: [javascript, 对象, 创建对象, 遍历对象]
categories: Javascript
---

# 对象

Javascript是基于原型的面向对象的语言（ECMAScript 5版本）。
在Javascript中，一个对象可以是一个单独的拥有属性和类型的实体。对象具有属性和方法。属性用来描述这个对象的信息，方法用来描述这个对象的行为。
方法是关联到某个对象的函数，或者简单来说，一个方法是一个值为某个函数的对象属性。定义方法就像定义普通的函数。
<!-- more -->

# 对象分类

<b>· 内置对象/原生对象</b>
就是javascript语言预定义的对象。在ECMAScript标准定义，由javascript解释器/引擎提供具体实现。
<b>· 宿主对象</b>
指的是javascript运行环境提供的对象。一般是由浏览器厂商提供实现（目前也有独立的javascript解释器/引擎提供实现），主要分为BOM和DOM。
<b>· 自定义对象</b>
由开发人员自主创建的对象。

# 创建对象

## （一）对象初始化器方式

使用对象初始化器也被称为通过字面值创建对象。语法如下：

``` bash
// obj 为创建的对象名
var obj = {
    // property 为属性或方法名，value 为属性值或函数
    property1: value1, 
    property2: value2,
    ...
    propertyn: function(){
        // 方法体
    }
}
```

## （二）构造函数方式

### javascript预定义类型的构造函数

``` bash
var date = new Date(); //创建一个Date对象
var str = new String("this is string"); //创建一个String对象
var num = new Number(100); //创建一个Number对象
```

### Object类型的构造函数

``` bash
var obj = new Object(); //创建一个自定义对象
obj.property1 = value1; //对象属性
obj.property2 = function(){ //对象方法
    //方法体
}
```

## （三）Object.create()方法

Object.create()方法创建一个拥有指定原型和若干个指定属性的对象。

    Object.create(proto, [propertiesObject])

参数：
    · proto参数：一个对象，作为新创建对象的原型。
    · propertiesObject参数：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符。

``` bash
// 先创建一个作为原型的对象
var obj1 = {
    name : 'protoObject',
    sayMe: function(){
        console.log('this is protoObject');
    }
}
// 通过Object.create()方法创建对象
// obj2 拥有与 obj1 相同的属性和方法
var obj2 = Object.create(obj1);
```

<b>Object.create()方法的一些特殊用法</b>

（1）创建一个原型为null的空对象

    var obj = Object.create( null );

（2）实现子类型构造函数的原型继承父类型构造函数的原型

    Sub.prototype = Object.create( Super.prototype );

（3）创建普通空对象

    var obj = Object.create( Object.prototype ); // 等同于 var obj = {}

# 对象的属性

## 定义对象的属性

一个javascript对象有很多属性。一个对象的属性可以被解释成一个附加到对象上的变量。对象的属性和普通的javascript变量基本没什么区别，仅仅是属性属于某个对象。

定义属性的方法：
1、通过点符号
    
    obj.attrName = value;
2、通过方括号。对象有时也被称为关联数组，因为每个属性都有一个用于访问它的字符串值。

    obj[attrName] = value;

## 访问对象的属性

与定义属性类似，访问属性同样可以通过 点符号 和 方括号 两种方式。

``` bash
var emp = {
    ename: 'Tom';
    salary: 3500
}
console.log( emp.ename ); // 点符号 方式
console.log( emp['salary'] ); // 中括号 方式，属性名需要用单引号或双引号括起来
```

## 遍历（枚举）属性

javascript提供了三种原生方法用于遍历或枚举对象的属性。

### （一）for...in循环

该方法依次访问一个<em>对象及其原型链</em>中所有可枚举的属性。

``` bash
var obj = {
    name : '杨过',
    sex : 'man',
    sayMe : function () {
        console.log('我是杨过');
    }
}
for (var attrName in obj){
    console.log(attrName + '=' + obj[attrName]);
}
```

### （二）Object.keys( object ) 方法

该方法返回一个对象自身包含（不包括原型中）的所有属性的名称的数组。

``` bash
var attrs = Object.keys(obj);
console.log(attrs); // 包含所有属性名称的数组
console.log(attrs[0]); // name
console.log(obj[attrs[0]]); // 杨过
//遍历该数组
for (var i=0; i<attrs.length; i++){
    console.log(attrs[i], obj[attrs[i]]);
}
```

### （三）Object.getOwnPropertyNames( object ) ⽅法

该方法返回一个数组，它包含了一个对象（不包括原型中）所有拥有的属性（无论是否可枚举）的名称。

``` bash
var attrs = Object.getOwnPropertyNames(obj);
```

## 属性访问出错

当不确定对象是否存在、对象的属性是否存在时，可以使用错误处理结构 try...catch 语句来捕捉抛出的错误，避免程序异常终止。

``` bash
// 访问未声明的变量
console.log( emp ); // ReferenceError

// 访问未声明的属性
var emp = {};
console.log( emp.ename ); // undefined

// 访问未声明的属性的成员
console.log( emp.ename.length ); // TypeError
```

## 检测属性是否存在

可以使用如下四种方法检测对象中是否存在指定属性：

### 1.使用 in 关键字

    console.log( 'ename' in emp );

### 2.使用Object对象的hasOwnProperty()方法

    console.log( emp.hasOwnProperty('ename') );

### 3.使用 undefined 进行判断

    console.log( emp.ename == undefined );

### 4.使用if语句进行判断

``` bash
if( emp.ename ){
    console.log('ename属性存在');
}
```

## 删除对象的属性

可以使用 delete 操作符删除一个不是继承而来的属性。

``` bash
var obj = {
    a: 5,
    b: 10
}
delete obj.a;
```

# 对象的方法

## 定义对象的方法

定义方法就像定义普通的函数，除了它们必须被赋给对象的某个属性。

``` bash
var obj1 = {
    name: 'obj1',
    sayMe: function(){
        console.log('this is obj1');
    }
}

var obj2 = new Object();
obj2.sayMe = function(){
    console.log('this is obj2');
}
```

## 调用方法

对象方法的调用类似于对象属性的调用，同样具有 点符号 和 方括号 两种方式。

``` bash
obj1.sayMe(); // 点符号方式
obj2['sayMe'](); // 方括号方式
```

## 删除对象的方法

同样使用delete关键字

    delete obj1.sayMe;


