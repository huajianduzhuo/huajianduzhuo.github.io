---
title: JavaScript数组排序
date: 2017-06-01 19:24:10
tags: [数组排序, sort]
categories: Javascript
---

Javascript中数组使用sort()方法进行排序。

### 语法

    arrayObject.sort(sortby)

### 参数
* sortby：可选。规定排序顺序。必须是函数。
<!-- more -->

### 返回值
对数组的引用。请注意，数组在原数组上进行排序，不生成副本。

### 说明
如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。

如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：
* 若a应该出现在b之前，则返回一个小于0的值
* 若a应该出现在b之后，则返回一个大于0的值
* 若a等于b，则返回0

### 示例

``` bash
var arr = [23,4,12,3,67,5,8,60];
/*
    TODO 不传参数，默认排序
    TODO    按字符顺序排序
 */
console.log(arr.sort()); // [ 12, 23, 3, 4, 5, 60, 67, 8 ]
/*
    TODO 由小到大 排序
 */
arr.sort(function (a, b) {
    return a-b;
});
console.log(arr); // [ 3, 4, 5, 8, 12, 23, 60, 67 ]
/*
    TODO 由大到小 排序
 */
arr.sort(function (a, b) {
    if(a > b){
        return -1;
    }else if(a < b){
        return 1;
    }else {
        return 0;
    }
});
console.log(arr); // [ 67, 60, 23, 12, 8, 5, 4, 3 ]
```
