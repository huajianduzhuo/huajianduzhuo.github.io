---
title: javascript之BOM简单介绍
date: 2017-06-01 14:00:23
tags: [BOM, window对象, navigator, history, location, screen]
---

# BOM

BOM的全称为 Browser Object Model ，被译为 浏览器对象模型。BOM提供了独立于HTML页面内容，而与浏览器相关的一系列对象。主要被用于管理浏览器窗口及与浏览器窗口之间通信等功能。

BOM是由浏览器所提供的一系列对象，例如 window 对象等。DOM中的document对象实际上是window对象的属性。

Window对象是BOM 结构中的最顶层的对象，其他对象都是以Window对象的属性形式出现。
<!--more-->

> BOM是JavaScript中唯一一个没有标准的内容。

> javascript中的语法标准是 ECMA ，DOM 的标准是 W3C 制定的。

# window对象

Window 对象表示当前浏览器窗口，是BOM 中最顶层的对象。Window对象的属性和方法应用于当前整个浏览器窗口。

## 全局Window对象

由于Window对象是浏览器窗口中最顶层的对象，也就是说，定义在全局域中的变量和函数，实际上都可以是Window对象的属性和方法。

调用window对象的属性和方法时，可以省略"window."。

定义全局变量和函数时，实际上是为window对象添加属性和方法。

    var a = 'a';

* 直接调用全局变量名称 - console.log(a)
* 通过window对象的属性形式调用 - window.a
* 通过this关键字调用 - this.a

> 值得说明的是: 这一点与 JavaScript 作用域有很大关系。

## Window对象与 self 属性

Window 对象的 self 属性返回当前浏览器窗口的只读引用。换句话讲，self 属性返回的是 Window 对象的引用。

``` bash
/*
    TODO self 属性 - 就是 window 对象
    TODO * 直接操作 window 对象 - 属性或方法是可被修改的
    TODO * self 属性 - 相等于只读的 window 对象
    TODO   * 在实际开发中，使用 window = window.self， 更安全
*/
console.log(window == window.self); // true
```

## 滚动窗口操作

Window 对象提供了以下两个滚动浏览器窗口的方法:
* scrollBy(x, y): 根据指定像素值来滚动浏览器窗口。将页面从当前位置移动指定的距离。
  x：向右移动的距离。如果为负值，则向左移动。
  y：向下移动的距离。如果为负值，则向上移动。

* scrollTo(x, y): 将浏览器窗口滚动到指定坐标值。将页面移动到指定的坐标值(x, y)。

# navigator对象

Navigator 对象表示当前浏览器，该对象包含了浏览器的信息。

> 值得注意的是: Navigator 对象没有相应标准，不过各个浏览器都支持。

## 常用属性

Navigator 对象提供一系列常用属性，获取当前浏览器的信息。具体内容如下:

| 属性名称   | 说明      |
| :-------: | :-------: |
| appCodeName | 浏览器的代码名 |
| appName | 浏览器的名称 |
| appVersion | 浏览器的平台和版本信息 |
| platform | 运行浏览器的操作系统平台 |

使用不同浏览器，结果如下：

| 属性名称      | Chrome               | firefox          | IE11   | IE8 |
| :-----------: | ------------------ | ----------------- | ------ | --- |
| appCodeName | Mozilla | Mozilla | Mozilla | Mozilla |
| appName | Netscape | Netscape | Netscape | Microsoft Internet Explorer |
| appVersion | 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 | 5.0 (Windows) | 5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko | 4.0 (compatible; MSIE 8.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729) |
| platform | Win32 | Win32 | Win32 | Win32 |

## userAgent属性

Navigator 对象提供很多属性，可以来识别当前浏览器及操作系统信息。但绝大多数属性在目前浏览器中已经不再起作用了。而 Navigator 对象的 userAgent 属性依旧可以实现识别浏览器的功能。

userAgent 属性返回由客户机发送服务器的 user-agent 头部的值。userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。

<style>
    table th:first-of-type{
        width: 100px;
    }
</style>

| 浏览器产品 | userAgent属性值         |
|---------- | ----------------------- |
| Firefox | Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0 |
| Chrome | Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36 |
| IE 8 | Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) |
| IE 9 | Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) |
| IE 10 | Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) |
| IE 11 | Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko |
| Safari | Mozilla/5.0 (Macintosh; Intel Mac OS X 10124) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30 |

> 值得注意的是: IE 11 版本的 userAgent 属性信息已经不再包含有关 IE 浏览器的信息，所以我们不能通过 userAgent 属性判断 IE 11 浏览器了。

作用：
* 用于判断用户当前的浏览器产品
``` bash
var ua = navigator.userAgent;
if(/firefox/i.test(ua)){
    console.log('当前使用的是 Firefox 浏览器');
}else if(/chrome/i.test(ua)){
    console.log('当前使用的是 Chrome 浏览器');
}else if(/safari/i.test(ua)){
    console.log('当前使用的是 Safari 浏览器');
}else if(/msie/i.test(ua)){
    console.log('当前使用的是 IE 11 之前版本的浏览器');
}else if("ActiveXObject" in window){
    console.log('当前使用的是 IE 11 浏览器');
}
```

* 用于判断用户当前的操作系统
``` bash
if (/windows/i.test(ua)){
    console.log('当前使用的是 Windows 操作系统');
}else if (/mac/i.test(ua)){
    console.log('当前使用的是 Mac 操作系统');
}else if (/android/i.test(ua)){
    console.log('当前使用的是 Android 操作系统');
}else if (/iphone/i.test(ua)){
    console.log('当前使用的是 iPhone 操作系统');
}
```

# history对象

History 对象包含用户在浏览器中访问过的 URL（网址）。

## length属性

History 对象的 length 属性可以获取用户在浏览器中访问网址的数量。
> length 属性声明了浏览器历史列表中的元素数量。

## 前进与后退

History 对象还提供了以下方法实现浏览器前进和后退功能。具体方法如下:
* forward(): 实现跳转下一个页面，作用和浏览器的前进按钮一样。
* back(): 实现转跳到上一个页面，作用和浏览器的回退按钮一样。
* go(): 实现跳转到指定的页面。如果为负数表示后退，如果为正数表示前进。

# location对象

Location 对象包含了浏览器的地址栏中的信息。该对象主要用于获取和设置地址。

## 获取和设置地址

``` bash
// 获取当前浏览器窗口的地址栏信息
console.log('Location对象为: ' + window.location); // 得到location对象
// 设置当前浏览器窗口的地址栏信息
window.location = 'http://www.baidu.com';
```

上述功能我们同样可以通过 Location 对象的 href 属性完成。

``` bash
// 获取当前浏览器窗口的地址栏信息
console.log('Location对象的href属性为: ' + location.href);
// 设置当前浏览器窗口的地址栏信息
location.href = 'http://www.baidu.com';
```

## location对象的属性

| 属性  | 描述  |
| :---: | :---- |
| hash | 设置或返回从井号 (#) 开始的 URL（锚）。 | 
| host | 设置或返回主机名和当前 URL 的端口号。 | 
| hostname | 设置或返回当前 URL 的主机名。 | 
| href | 设置或返回完整的 URL。 | 
| pathname | 设置或返回当前 URL 的路径部分。 | 
| port | 设置或返回当前 URL 的端口号。 | 
| protocol | 设置或返回当前 URL 的协议。 | 
| search | 设置或返回从问号 (?) 开始的 URL（查询部分）。 | 

``` bash
console.log(location.href);// http://localhost:63342/DAY21_prac/CODE/06_Location%E5%AF%B9%E8%B1%A1.html?_ijt=m43hr038iube02pjfo42jk0lpt
console.log(location.host); // localhost:63342
console.log(location.hostname); // localhost
console.log(location.port); // 63342
console.log(location.pathname); // /DAY21_prac/CODE/06_Location%E5%AF%B9%E8%B1%A1.html
console.log(location.protocol); // http:
```

## location对象的方法

| 方法名    | 说明      |
| :-------: | :-------: |
| assign() | 载入一个新的文档，作用和直接修改 location 相同 |
| reload() | 重新载入当前文档，作用和刷新按钮一样。参数为 true 时，则会强制清空缓存刷新页面 |
| replace() | 用新的文档替换当前文档（不会生成历史记录，不能使用回退按钮回退）|

# screen对象

Screen 对象包含有关客户端显示屏幕的信息。

screen对象的属性

| 属性      | 描述     |
| :-------: | :------: | 
| availHeight  | 返回显示屏幕的高度 (除 Windows 任务栏之外)。 |  
| availWidth  | 返回显示屏幕的宽度 (除 Windows 任务栏之外)。  | 
| bufferDepth | 设置或返回调色板的比特深度。  | 
| colorDepth  | 返回目标设备或缓冲器上的调色板的比特深度。  | 
| deviceXDPI  | 返回显示屏幕的每英寸水平点数。  | 
| deviceYDPI  | 返回显示屏幕的每英寸垂直点数。  | 
| fontSmoothingEnabled  | 返回用户是否在显示控制面板中启用了字体平滑。  | 
| height  | 返回显示屏幕的高度。|   
| logicalXDPI  | 返回显示屏幕每英寸的水平方向的常规点数。  | 
| logicalYDPI  | 返回显示屏幕每英寸的垂直方向的常规点数。  | 
| pixelDepth  | 返回显示屏幕的颜色分辨率（比特每像素）。  | 
| updateInterval  | 设置或返回屏幕的刷新率。  | 
| width  | 返回显示器屏幕的宽度。  | 

# 定时器

## setInterval()和clearInterval()

setInterval(code, millisec, lang)
含义：按照设置的时间，周期性执行指定逻辑代码
参数：
* code : 要调用的函数或要执行的代码
* millisec : 定时器的周期时间，以毫秒为单位
* lang : 可选，javascript

返回值：设置当前定时器的标识(唯一，不可重复)

clearInterval(id_of_setinterval)
含义：取消定时器
参数：
* id_of_setinterval ：指定清除的定时器标识

## setTimeout()和clearTimeout()

setTimeout(code, millisec)
含义：按照设置的时间，向后延迟执行指定逻辑代码
参数：
* code - 设置延迟执行的指定逻辑代码
* millisec - 设置定时器的时间，单位为毫秒

返回值：设置当前定时器的标识(唯一，不可重复)

clearTimeout(id_of_settimeout)
含义：取消定时器
参数：
* id_of_settimeout ：指定清除的定时器标识