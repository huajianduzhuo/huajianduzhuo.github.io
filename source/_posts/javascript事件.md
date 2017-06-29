---
title: javascript事件
date: 2017-06-05 23:30:08
tags: [event对象, 事件监听]
categories: Javascript
---

# 事件监听

为 HTML 页面指定标签绑定指定事件，可以通过以下三种方式实现:

<!--more-->

* HTML 标签的事件属性(onclick=fn()): 这种方式 HTML 代码和 JavaScript 逻辑不能很好地分离，所以不建议使用。
* DOM 标准的事件(element.onclick=function()\{\}): 这种方式只能为指定的一个标签绑定一个事件，并且只能具有一个事件处理函数。
* 事件监听器: 这种方式是目前最受欢迎的一种方式。但 IE 8 及之前的版本不支持！

``` bash
/*
    TODO element.onclick 事件绑定
    TODO 	多次绑定，最后一次有效，会覆盖前面的
*/
btn.onclick = function () {
    console.log('这是事件绑定1');
}
btn.onclick = function () {
    console.log('这是事件绑定2');
}
```

## 事件监听器

### addEventListener()方法

DOM 提供了事件监听器，可以同时绑定多个事件，并且具有多个事件处理函数。具体监听器语法如下:

    element.addEventListener(eventName, functionName, boolean)

|   参数   |        说明      |
| :------: | :-------------- |
| eventName | 为元素指定具体的事件名称（例如单击事件是 click 等） |
| functionName | 绑定事件的处理函数 |
| boolean | 设置事件是捕获阶段还是冒泡阶段。为 false 时为冒泡阶段，一般都是这个值 |

``` bash
/*
    TODO element.addEventListener() 事件监听
    TODO 点击按钮，结果：
    TODO 	* 这是事件绑定2
    TODO 	* 这是事件监听1
    TODO 	* 这是事件监听2
    TODO 多次监听，都有效，且最后一次通过绑定方式的也有效，不覆盖
*/
btn.addEventListener('click',function () {
    console.log('这是事件监听1');
})
btn.addEventListener('click', a)

function a() {
    console.log('这是事件监听2');
}
```

### removeEventListener()方法

移除事件监听器

    removeEventListener(eventName, functionName, boolean)

``` bash
/*
    TODO element.removeEventListener() 解除某个事件绑定
    TODO 结果：
    TODO 	* 这是事件绑定2
    TODO 	* 这是事件监听1
    TODO 为 btn 绑定的 a 函数被解除
*/
btn.removeEventListener('click',a);
```

### attachEvent()方法

IE 8 及之前的版本浏览器并不支持 addEventListener() 方法，而提供了如下方法实现

    element.attachEvent(eventName, functionName)


| 参数          | 说明      |
| ------------- | -------------- |
| eventName     | 为元素指定具体的事件名称（例如单件事件是 onclick 等） |
| functionName  | 绑定事件的处理函数 |

> 值得注意的是: attachEvent() 方法的 eventName 参数与 addEventListener() 方法的 eventName 参数不同

## 监听器的兼容方案

``` bash
function bind(elem, event, callback){
    // 判断是否存在 addEventListener
    if (elem.addEventListener){
        elem.addEventListener(event, callback, false);
    }else{
        elem.attachEvent('on' + event, callback);
    }
}
```

> 注意：在 addEventListener() 方法中的 this 和在 attachEvent() 方法中的 this 指代不同。
> 通过 addEventListener() 方法为 HTML 页面的标签绑定事件时，this 关键字指代绑定该事件的标签元素。
> 通过 attachEvent() 方法为 HTML 页面的标签绑定事件时，this 关键字指代绑定 window 对象。

# 事件对象event

HTML 页面的标签绑定事件的处理函数中，提供了一个事件对象（event）。这个事件对象会返回关于该事件的信息，以及该事件绑定在哪个元素中。
事件对象是以事件的处理函数中的参数形式出现，并不需要我们自己创建，直接使用即可。

``` bash
element.addEventListener(eventName, function(event){
    // event 就是事件对象
}, boolean)
```

## 兼容的事件对象

使用 DOM 标准的事件绑定时，Event 事件对象在 IE 8 及之前的版本浏览器情况有所不同。

* IE 9 及之后的版本和其他浏览器: 通过事件的处理函数的形参直接得到 Event 对象。
``` bash
var btn = document.getElementById('btn');
btn.onclick = function(event){
    console.log(event)
}
```

* IE 8 及之前的版本浏览器: Event 事件对象被提供在 window 对象中。event对象为全局作用域对象。
``` bash
var btn = document.getElementById('btn');
btn.onclick = function(event){
    console.log(window.event)
}
```

想要实现 Event 事件对象的兼容，我们可以在事件的处理函数中添加以下代码:

    event = event || window.event;

测试时发现，不在事件的处理函数中添加形参event，函数中也可以使用，这种方式是不严格的，在Firefox浏览器中会报错：

``` bash
var btn = document.getElementById('btn');
function bind(elem, event, callback){
    if (elem.addEventListener){
        elem.addEventListener(event, callback, false);
    }else{
        elem.attachEvent('on' + event, callback);
    }
}
/*
    TODO 回调函数形参不添加 event，直接使用
    TODO 	* Chrome浏览器：MouseEvent 对象
    TODO 	* Firefox浏览器：ReferenceError: event is not defined
    TODO 	* IE 11：[object PointerEvent]
    TODO 	* IE 8：[object Object]
*/
bind(btn, 'click', function () {
    console.log(event);
})
```

## 事件的目标元素

Event 事件对象提供了 target 属性用于获取触发事件的目标元素（标签）。

IE 8 及之前的版本浏览器不支持 target 属性，而是提供了 srcElement 属性进行替换。

解决方案：

    var target = event.target || event.srcElement;

> this与event.target的区别
>   * event.target - 获取触发当前事件的元素
>   * this - 获取绑定当前事件的元素

## 阻止默认行为

HTML 页面的一些标签具有默认行为。所谓默认行为，就是不用编写 JavaScript 代码就可以实现的动态效果。例如如下标签:
* a 标签: 用户点击 a 标签，会发生页面跳转行为。
* form 标签: 用户点击表单的提交按钮，表单会发生提交行为。

阻止默认行为，就是不让 HTML 页面这些标签的默认行为发生。想要阻止默认行为可以通过 Event 事件对象提供的属性实现:
* IE 8 及之前版本的浏览器: returnValue 属性 -- event.returnValue=false。也可以直接通过return false阻止。
* IE 9 及之后版本和其他浏览器: preventDefault() 方法

``` bash
function bind(elem, eventName, functionName) {
    if(elem.addEventListener){
        elem.addEventListener(eventName, functionName);
    }else {
        elem.attachEvent('on'+eventName, functionName);
    }
}
/*
    TODO event.preventDefault() 方法
    TODO 	* 其他浏览器 -- IE 8 不适用
    TODO event.returnValue 属性
    TODO 	* IE 8 浏览器
    TODO 	* event.returnValue = false;
*/
bind(a, 'click', function (e) {
    if(e.preventDefault){
        e.preventDefault();
    }else {
        e.returnValue = false;
    }
})
```

## 获取鼠标坐标

当 HTML 页面中标签绑定的事件被触发时，我们还可以通过 Event 事件对象获取鼠标当前的坐标值。

* x和y - 结果等同于clientX和clientY
* pageX和pageY - 鼠标相对于当前整个页面的坐标值。如果页面过大（存在滚动条），部分页面可能存在可视区域之外。
* clientX和clientY - 鼠标相对于当前窗口可视区域的坐标值
* screenX和screenY - 鼠标相对于当前屏幕的坐标值，从屏幕（不是浏览器）的左上角开始计算。
* offsetX和offsetY - 鼠标相对于指定元素的坐标值（发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。）如果是div绑定的事件，则是鼠标相对于该div左上角的位移。

# 事件周期

根据 W3C 标准事件的发生流程可以分为捕获阶段、触发阶段以及冒泡阶段。

* 捕获阶段: 事件根据 DOM 树结构从最上层节点向下传播，直到绑定该事件节点为止。
* 触发阶段: 事件发生，执行对应的处理函数的逻辑代码。
* 冒泡阶段: 事件根据 DOM 树结构从绑定事件节点向上传播。

> 如果 addEventListener() 方法的第三个参数值为 true，表示捕获阶段
> 如果 addEventListener() 方法的第三个参数值为 false（默认值），表示冒泡阶段

> 值得注意的是: IE 8 及之前版本的浏览器不支持捕获阶段。

> 捕获阶段和冒泡阶段，相当于实现了父子关系的元素的事件的继承。触发子元素的事件函数时，父元素的事件函数也会触发。

定义父子关系的 div：#d1、#d2，为d1和d2分别绑定事件：
* 因为冒泡阶段的存在，当点击d2时，会先执行d2的事件函数，再执行d1的事件函数。
* 如果使用elem.addEventListener()绑定事件时，第三个参数设置为true，表示捕获阶段，则点击d2时，会先执行d1的事件函数，再执行d2的事件函数。

## 阻止事件冒泡

如果在上述示例中的冒泡阶段，我们可以看到事件会从最底层节点向上传播。如果只想触发当前节点的事件，而不继续向上冒泡，我们可以通过 Event 事件对象提供的属性来完成:

* IE 8 及之前版本的浏览器: cancelBubble 属性设置为true
* IE 9 及之后版本和其他浏览器: stopPropagation() 方法

> <em>注意</em> 以下代码中，将addEventListener第三个参数设置为true，stopPropagation()方法在浏览器中可以阻止事件捕获，这是浏览器的原因，在标准规范中，stopPropagation方法只用来阻止事件冒泡。

``` bash
// HTML
<div id="d1">
    <div id="d2">
        <div id="d3"></div>
    </div>
</div>

// JS
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');
var d3 = document.getElementById('d3');
function bind(elem, event, callback) {
    if(elem.addEventListener){
        elem.addEventListener(event, callback);
    }else {
        elem.attachEvent('on'+event, callback);
    }
}

bind(d1, 'click', function (e) {
    e = e || window.event;
    alert(d1.id);
    // TODO 阻止冒泡
    if(e.stopPropagation){
        /*
            TODO 其他浏览器
            TODO * 如果 addEventListener 方法第三个参数设置为true，则阻止捕获
            TODO 	* 不管点击哪一个div，都只会触发祖先元素的事件函数
            TODO    * 阻止捕获只是浏览器中的效果，标准中只是阻止冒泡
            TODO * 如果 addEventListener 方法第三个参数设置为false，则阻止冒泡
            TODO 	* 点击哪一个div，触发祖该div的事件函数
            */
        e.stopPropagation();
    }else{
        /*
            TODO IE 8 浏览器
            TODO 	* IE 8浏览器不支持事件捕获，只有事件冒泡，会阻止事件冒泡
            TODO 	* 点击哪一个div，触发祖该div的事件函数
            */
        e.cancelBubble = true;
    }
})
bind(d2, 'click', function (e) {
    e = e || window.event;
    alert(d2.id);
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
})
bind(d3, 'click', function (e) {
    e = e || window.event;
    alert(d3.id);
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
})
```

## 事件委托

原本将事件绑定给指定元素，实际上委托给另一个元素，完成事件的绑定和触发。

实现步骤
* 将事件绑定给共同的祖先节点
* 判断触发事件的元素必须原本的元素

``` bash
<button id="btn" class="btn btn-primary">添加</button>
<ul id="parent" class="list-group">
    <li class="list-group-item"><a href="#">链接</a></li>
    <li class="list-group-item"><a href="#">链接</a></li>
    <li class="list-group-item"><a href="#">链接</a></li>
</ul>

var ul = document.getElementById('parent');
/*
    TODO 为 ul 中的所有 a 标签绑定事件
    TODO    * 如果直接循环为a标签添加的话，新增的li中的a标签则没有绑定
    TODO 使用事件委托
    TODO    * 为 ul 绑定事件，则点击 ul、li、a 标签时，都可以触发
    TODO    * 判断 target 为 a 标签时，执行真正的函数代码
*/
ul.onclick = function (event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName === 'A'){
        alert('aaa');
        event.preventDefault(); // 阻止 a 标签的默认行为
    }
}
// TODO 点击添加一行，因为为ul绑定了事件，所以新增的一行里，a标签可以响应
var btn = document.getElementById('btn');
btn.onclick = function () {
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = '<a href="#">链接</a>';
    ul.appendChild(li);
}
```

# 滚轮事件

* onscroll事件 - 1. 滚轮事件，2. 滚动条事件
* onmousewheel事件 - 滚轮事件

> onmousewheel事件为新增事件，只有Chrome浏览器支持

# 键盘事件

* onkeydown - 表示键盘被按下
* onkeyup - 表示键盘被释放
* onkeypress - 表示键盘被按一下

> 获取对应按键
>   * event.keyCode 属性（建议使用）
>   * event.which 属性
>   * event.key 属性

<b>注意：以上三个属性IE 8 及以下版本都不支持</b>

``` bash
var data = document.getElementById('data');
var show = document.getElementById('show');
data.onkeyup = function (e) {
    show.innerHTML = e.keyCode + '  ' + e.which + '    ' + e.key;
}
```

如上代码，按下按键，依次显示keyCode、which、key三个属性：

| 按键    | keyCode   | which    | key      |
| :-----: | :-------: | :------: | :----------: |
| a       | 65        | 65       | a        |
| z       | 90        | 90       | z        |
| 0       | 48        | 48       | 0        |
| 9       | 57        | 57       | 9        |
| pageup  | 38        | 38       | 其他浏览器：ArrowUp <br> IE9-11: Up |

# 鼠标事件

## event的button属性

可以通过 event.button 得到鼠标点击的是左键或右键（IE 8 浏览器不适用）
* 0：左键
* 1：中间的滚轮键
* 2：右键

## 阻止点击右键默认菜单

``` bash
// TODO 专门用于禁用浏览器默认右键菜单
body.oncontextmenu = function(event){
    event = event || window.event;
    if(event.preventDefault){
        event.preventDefault();
    }else {
        window.event.returnValue = false;
    }
}
```

需要为body设置高度
