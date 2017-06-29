---
title: javascript中的Date类型
date: 2017-05-27 21:54:10
tags: [javascript, Date]
categories: Javascript
---

javascript中提供Date对象对日期和时间进行存储或操作。

## 创建Date对象

    var myDate = new Date();
<!--more-->

``` bash
/*
 使⽤指定的年⽉⽇ [时分秒] 进⾏初始化
 Date对象中月份从0开始，所以月比传入的值加了1
*/
var d = new Date(2017,6,8);
console.log(d.toLocaleDateString()); // 2017-07-08

var d2 = new Date(2017,6,8,16,58,30);
console.log(d2.toLocaleString()); // 2017-07-08 16:58:30

// 把string转换为Date
var d3 = new Date('2017-6-8');
console.log(d3.toLocaleDateString()); // 2017-06-08

// new Date() 小括号可省略
var d4 = new Date;
console.log(d4.toLocaleDateString()); // 2017-06-08

// 构建⼀个string，值为当前系统时间
var d5 = Date();
console.log(d5); // Thu Jun 08 2017 17:03:35 GMT+0800 (中国标准时间)
console.log(typeof d5); // string

// 初始化为距离计算机元年指定毫秒数的时间
var d6 = new Date(0) ;
console.log(d6.toLocaleDateString()); // 1970-01-01
var d7 = new Date( 1000*3600*24*365 ) ;
console.log(d7.toLocaleDateString()); // 1971-01-01
```

<style>
    table th:first-child {
        width: 150px;
    }
</style>

## 获取日期方法

| 方法   | 说明   |
| ------ | ------ |
| getDate( ) | 返回Date对象“⽇期”部分数值(1 ~ 31)。| 
| getDay( ) | 返回Date对象“星期”部分的数值(0 ~ 6)。| 
| getFullYear( ) | 返回Date对象“年份”部分的实际数值。| 
| getHours( ) | 返回Date对象“⼩时”部分的数值(0 ~ 23)。| 
| getMilliseconds( ) | 返回Date对象“毫秒”部分的数值(0 ~ 999)。| 
| getMinutes( ) | 返回Date对象“分钟”部分的数值(0 ~ 59)。| 
| getMonth( ) | 返回Date对象“⽉份”部分的数值(0 ~ 11)。| 
| getSeconds( ) | 返回Date对象“秒”部分的数值(0 ~ 59)。| 
| getTime( ) | 返回Date对象与UTC时间1970年1 ⽉ 1 ⽇午夜之间相差的毫秒数。| 

## 设置日期方法

| 方法   | 说明   |
| ------ | ------ |
| setDate( ) | 设置Date对象中“⽇期”部分的数值(1 ~ 31 ，但不限于)。| 
| setFullYear( ) | 设置Date对象中“年份”部分的实际数值。| 
| setHours( ) | 设置Date对象中“⼩时”部分的数值(0 ~ 23，但不限于)。| 
| setMilliseconds( ) | 设置Date对象中“毫秒”部分的数值(0 ~ 999，但不限于)。| 
| setMinutes( ) | 设置Date对象中“分钟”部分的数值(0 ~ 59，但不限于)。| 
| setMonth( ) | 设置Date对象中“⽉份”部分的数值(0 ~ 11 ，但不限于)。| 
| setSeconds( ) | 设置Date对象中“秒”部分的数值(0 ~ 59，但不限于)。| 
| setTime( ) | 以毫秒值设置Date对象。| 
| setDate( ) | 设置Date对象中“⽇期”部分的数值(1 ~ 31 ，但不限于)。| 

## 日期格式化方法

| 方法   | 说明   |
| ------ | ------ |
| toString() | 返回Date对象的字符串形式。| 
| toDateString() | 返回Date对象“⽇期”部分(年⽉⽇ )的字符串形式。| 
| toTimeString() | 返回Date对象“时间”部分(时分秒)的字符串形式。| 
| toLocaleString() | 基于本地时间格式，返回Date对象的字符串形式。| 
| toLocaleDateString() | 基于本地时间格式，返回Date对象“ ⽇期”部分(年⽉⽇ )的字符串形式。| 
| toLocaleTimeString() | 基于本地时间格式，返回Date对象“时间”部分(时分秒)的字符串形式。| 
| toGMTString() | 基于GMT时间格式，返回Date对象的字符串形式。| 
| toUTCString() | 基于UTC时间格式，返回Date对象的字符串形式。| 
