---
title: js原生ajax
date: 2017-07-25 19:55:54
tags: [原生ajax]
categories: ajax
---

AJAX (Asynchronous Javascript And XML)，异步 JavaScript 和 XML，是通过 JavaScript 向服务器异步发送请求的技术。

原生 JavaScript 使用 AJAX 的方法：
<!--more-->

## 创建 XMLHttpRequest 对象

XMLHttpRequest 是 AJAX 的核心对象，ajax 中的所有操作都是通过该对象来完成的。

      var xhr = new XMLHttpRequest();

## 设置请求信息

      xhr.open(method, url [, async]);

* method: 请求类型，get 或 post
* url：请求路径
* async：true（异步）或 false（同步），默认为 true

## 发送请求

    xhr.send(string);

* string: 以 **post** 方式请求时，传递的请求体作为 send 方法的参数

## 接收响应（readyState）

发送异步请求之后，当请求在服务器中处理完成，返回的数据需要在页面中进行处理。

通过为 xhr 绑定 onreadystatechange 事件，判断请求是否完成，当请求完成并且响应状态码是 200 时，处理返回数据。

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            // 处理返回数据
        }
    };

上面的代码中，用到了 XMLHttpRequest 对象的三个属性：
* **onreadystatechange**：存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
* **readyState**：存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
    - 0: 请求未初始化 
    - 1: 服务器连接已建立 
    - 2: 请求已接收 
    - 3: 请求处理中 
    - 4: 请求已完成，且响应已就绪 
* **status**：响应状态码。200 : "OK"； 404 : 未找到页面

## 响应信息

通过 XMLHttpRequest 对象的 responseText 或 responseXML 属性获取服务器返回的响应信息。
* responseText： 获得字符串形式的响应数据。 
* responseXML： 获得 XML 形式的响应数据。 

## get 请求和 post 请求实例

### get

get 请求通过 url 向服务器传递参数

```
var xhr = new XMLHttpRequest();
xhr.open('get', '/testAjax?username=admin&password=123456');
xhr.send();
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        div.innerHTML += '<p>'+ xhr.responseText +'</p>';
    }
}
```

### post

post 请求通过 send 方法的参数向服务器传递参数。

post 请求传递的参数在服务器中接收到的是请求体字符串，需要解析字符串之后才能使用。如果想像 HTML 表单那样 post 数据，需要调用 XMLHttpRequest 对象的 setRequestHeader 方法，设置请求头的 Content-type 属性的值，这样服务器就能直接通过参数名得到参数值了。

```
var xhr = new XMLHttpRequest();
xhr.open('post', '/testAjax');
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send('username=admin&password=123456');
xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status == 200){
        div.innerHTML += '<p>'+ xhr.responseText +'</p>';
    }
}
```

## IE 浏览器兼容性处理

IE 6 及更低版本 IE 浏览器不支持 XMLHttpRequest 对象，所以需要做兼容性处理。

* IE6 浏览器 ajax 核心对象：

        var xhr = new ActiveXObject("Msxml2.XMLHTTP");

* 更低版本 IE 浏览器 ajax 核心对象：

        var xhr = new ActiveXObject("Microsoft.XMLHTTP");

其他步骤与 XMLHttpRequest 方式相同。

ajax 兼容性处理方法：将获取 ajax 核心对象的代码封装到函数中：

```
function getXHR() {
    try {
        return new XMLHttpRequest();
    }catch(e){
        try{
            //兼容IE6的方式
            return new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            //更老版本的ie
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
}
```