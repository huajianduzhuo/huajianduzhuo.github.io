---
title: javascript实现拖拽
date: 2017-06-06 20:08:43
tags: [拖拽效果, setCapture]
categories: Javascript
---

下面使用javascript代码简单实现拖拽div的效果，并通过setCapture()方法兼容IE 8及之前的IE版本浏览器。
<!-- more -->

创建一个div

``` bash
<div id="d1"></div>
```

为div添加样式，设置定位

``` bash
#d1 {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: lightskyblue;
    z-index: 100;
}
```

实现拖拽的JavaScript代码

``` bash
var d1 = document.getElementById('d1');
function bind(elem, event, callback) {
    if(elem.addEventListener){
        elem.addEventListener(event, callback);
    }else {
        elem.attachEvent('on'+event, callback);
    }
}
/*
    TODO mousedown
    TODO    * 开启开关
    TODO    * 得到offsetX 和 offsetY
*/
var flag = false;
var offsetX;
var offsetY;
/*
    TODO IE 8 浏览器里面，实现拖拽，需要调用元素的 setCapture() 方法，否则报错
*/
bind(d1, 'mousedown', function (e) {
    var e = e || window.event;
    flag = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    if(d1.setCapture){
        d1.setCapture();
    }
})
bind(d1, 'mousemove', function (e) {
    var e = e || window.event;
    if (flag){
        d1.style.top = e.pageY - offsetY + 'px';
        d1.style.left = e.pageX - offsetX + 'px';
    }
})
/*
    TODO IE 8 浏览器，鼠标点击时调用了 setCapture()
    TODO    鼠标松开时，需要调用元素的 releaseCapture() 方法
*/
bind(d1, 'mouseup', function (e) {
    flag = false; // 关闭开关
    if(d1.releaseCapture){
        d1.releaseCapture();
    }
})
```
