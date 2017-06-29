---
title: JavaScript数组去重
date: 2017-06-01 19:24:21
tags: [javascript, 数组去重]
categories: Javascript
---

下面介绍几种自己总结的数组去重的方法
<!-- more -->

### 嵌套循环去重

``` bash
var arr = ['a','c','c','d','er','b','er',true,1,'g',true,true];
for(var i=0;i<arr.length;i++){
    for(var j=i+1;j<arr.length;j++){
        if(arr[i] === arr[j]){
            arr.splice(j,1);
            j--;
        }
    }
}
console.log(arr);
```

### 通过数组的indexOf()方法

``` bash
var arr = ['a','c','c','d','er','b','er',true,1,'g',true,true];
var newarr = [];
for(var i=0;i<arr.length;i++){
    if(newarr.indexOf(arr[i]) == -1){
        newarr.push(arr[i]);
    }
}
console.log(newarr);
```

### 通过数组的indexOf() + lastIndexOf() 方法

``` bash
var arr = ['a','c','c','d','er','b','er',true,1,'g',true,true];
for (var i=arr.length-1; i>=0; i--){
    if(arr.indexOf(arr[i]) != arr.lastIndexOf(arr[i])){
        arr.splice(i, 1);
    }
}
console.log(arr);
```

### 通过对象方法

``` bash
/*
 TODO 对象方法
 TODO    * 新建一个对象，遍历数组，将数组值同时作为 key 和 value 赋给对象
 TODO    * 新建数组，存储对象的属性值
 TODO    * 问题：去重后的数组顺序改变
 */
var arr = ['a','c','c','d','er','b','er',true,1,'g',true,true];
var obj = {};
for(var i=0;i<arr.length;i++){
    obj[arr[i]] = arr[i];
}
var newarr = [];
for(var attr in obj){
    newarr.push(obj[attr]);
}
console.log(newarr);
```