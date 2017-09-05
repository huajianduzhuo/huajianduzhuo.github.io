---
title: WebSocket和Socket.io介绍以及聊天室功能实现
date: 2017-09-04 20:53:44
tags: [WebSocket, Socket.io]
categories: WebSocket
---

我在做“你画我猜”小游戏时，为了实现画面实时传递，以及猜题时的聊天室功能，使用了 Socket.io，本文主要介绍 Socket.io 是什么，以及如何使用。
<!--more-->

# WebSocket

在介绍 Socket.io 之前，首先需要说一说什么是 WebSocket。

**详细了解参考：**
* MDN上的介绍：https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
* 知乎上的介绍：https://www.zhihu.com/question/20215561 
* WebSocket 与 Socket.io 介绍：http://www.cnblogs.com/mazg/p/5467960.html

## 为什么需要WebSocket

我们知道，在 HTML5 之前，客户端和服务器通过 HTTP 协议交换数据，但是，HTTP 协议具有两个特点：
* **HTTP 协议是一种单向的网络协议**。在建立连接后，它只允许客户端 Browser/UA (User Agent) 向服务器 WebServer 发送请求后，WebServer 才能返回相应的数据。而 WebServer 不能主动推送数据给 Browser/UA。

* **HTTP 协议是无状态的**。客户端向服务器发送连接请求中会包含 identity info（鉴别信息），每次当一个连接结束时，服务器就会将这些鉴别信息丢掉，客户端再次发送 HTTP 请求时，就需要重新发送这些信息。

现在，假设我们需要开发一个基于 Web 的应用程序，需要获取服务器的实时数据，比如股票的实时行情、聊天室的聊天内容等，这就需要客户端和服务器之间反复进行 HTTP 通信，客户端不断发送请求，去获取当前的实时数据。下面介绍两种常见的方式：

* **ajax 轮询**
    ajax 轮询的原理非常简单，就是让浏览器定时（隔几秒）向服务器发送一次请求，询问是否有新的数据，如果有就返回最新数据，浏览器接收到后将最新数据显示出来，然后重复这一过程。

* **Long Polling**
    Long Polling 的原理与 ajax 轮询的原理差不多，都是采用轮询的方式，它是 Polling 的一种改进。客户端发送请求到服务器后，服务器并不立即响应客户端，而是保持住这次连接，当有新的数据时，才返回给客户端，客户端接收到数据，进行展示，再立即发送一个新的请求给服务器，并重复这个过程。如果服务器的数据长期没有更新，一段时间后，这个请求就会超时，客户端收到超时消息后，再立即发送一个新的请求给服务器。

从上面可以看出，这两种方式都需要不断的建立 HTTP 连接，然后等待服务器处理。

ajax 轮询假如某段时间内服务器没有更新的数据，但是客户端仍然需要定时发送请求，服务器再把以前的老数据返回过来，客户端拿到老数据，再把没有变化的数据再显示出来，即这段时间内，客户端和服务器会定时交换不变的数据信息，这样既浪费了带宽，又浪费了 CPU 的利用率。

Long Polling 虽然解决了带宽和 CPU 利用率的问题，但是如果服务器的数据更新的过快，服务器在返回给客户端一次数据包之后，只能等待客户端再次发送一次请求来之后，才能发送下一个数据包给客户端。在服务器两次返回数据之间，需要等待客户端接收到数据之后处理数据的时间，以及客户端再次发送连接请求后，服务器验证客户端的鉴别信息，并成功建立连接的时间，在网络拥塞的情况下，这个应该是用户不能接受的。

另外，由于 HTTP 协议是无状态的，每次建立连接都需要重新传输 identity info（鉴别信息），这些信息不仅浪费处理时间，而且在网络传输中会耗费大量的流量，往往比实际需要传输的数据量还要大。这样的数据包在网络上周期性的传输，对网络带宽也是一直浪费。

在这样的情况下，假如客户端能有一种新的网络协议，可以支持客户端和服务器的双向通信的就好了。于是，WebSocket 应运而生。

## WebSocket 协议

WebSocket 是 HTML5 新增的一种通信协议。WebSocket 协议是一种持久化的双向通信协议，它建立在TCP之上，同 HTTP 一样通过 TCP 来传输数据，但是它和 HTTP 最大的不同有两点：

* WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和 Browser/UA 都能主动的向对方发送或接收数据，就像 Socket 一样，不同的是 WebSocket 是一种建立在 Web 基础上的一种简单模拟 Socket 的协议。

* WebSocket 需要通过握手连接，类似于 TCP 它也需要客户端和服务器端进行握手连接，连接成功后才能相互通信。

## WebSocket 工作流程

浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。因为 WebSocket 连接本质上就是一个 TCP 连接，所以在数据传输的稳定性和数据传输量的大小方面，和传统轮询以技术比较，具有很大的性能优势。

为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息 "Upgrade: WebSocket" 表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

## WebSocket 握手

下面是一个典型的 WebSocket 发送请求和响应请求的例子：

**浏览器向服务器发起 WebSocket 请求：**
```
GET / HTTP/1.1
Connection:Upgrade
Host:127.0.0.1:8088
Origin:null
Sec-WebSocket-Extensions:x-webkit-deflate-frame
Sec-WebSocket-Key:puVOuWb7rel6z2AVZBKnfw==
Sec-WebSocket-Version:13
Upgrade:websocket
```
这个请求与普通的 HTTP 请求有一些区别
> Upgrade: websocket
> Connection: Upgrade

表示请求的目的就是要将客户端和服务器端的通讯协议从 HTTP 协议升级到 WebSocket 协议

> Sec-WebSocket-Key: 
> Sec-WebSocket-Extensions:
> Sec-WebSocket-Version: 

客户端浏览器需要向服务器端提供的握手信息，服务器端解析这些头信息。Sec-WebSocket-Key 是一个 Base64 encode的值，这个是浏览器随机生成的，Sec-WebSocket-Version 是告诉服务器所使用的 Websocket Draft（协议版本）。

**服务器返回：**
服务器端返回以下信息，以表明服务器端获取了客户端的请求，同意创建 WebSocket 连接。
```
HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Server:beetle websocket server
Upgrade:WebSocket
Date:Mon, 26 Nov 2013 23:42:44 GMT
Access-Control-Allow-Credentials:true
Access-Control-Allow-Headers:content-type
Sec-WebSocket-Accept:FCKgUr8c7OsDsLFeJTWrJw6WO8Q= 
```
> Upgrade: websocket
> Connection: Upgrade

告诉客户端即将升级的是Websocket协议

> Sec-WebSocket-Accept 

这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key。

## WebSocket 服务器

从握手的协议可以看出，如果我们要使用 WebSocket，我们需要一个实现 WebSocket 协议规范的服务器，这不在我们讨论的范围。

值得一提的是：WebSocket 是可以和 HTTP 共用监听端口的，也就是它可以公用端口完成 socket 任务。

## WebSocket 与 HTTP、TCP 的关系

WebSocket 与 HTTP 协议一样都是基于 TCP 的，所以他们都是可靠的协议，Web 开发者调用的 WebSocket 的 send 函数在 browser 的实现中最终都是通过 TCP 的系统接口进行传输的。

WebSocket 和 Http 协议一样都属于应用层的协议，那么他们之间有没有什么关系呢？答案是肯定的，WebSocket 在建立握手连接时，数据是通过 HTTP 协议传输的，正如我们上面所看到的 "GET/chat HTTP/1.1"，这里面用到的只是 HTTP 协议一些简单的字段。但是在建立连接之后，真正的数据传输阶段是不需要 HTTP 协议参与的。

![image](/uploads/websocket/websocket.png)

## WebSocket API

```
var ws = new WebSocket(“ws://echo.websocket.org”);
ws.onopen = function(){ws.send(“Test!”); };
ws.onmessage = function(evt){console.log(evt.data);ws.close();};
ws.onclose = function(evt){console.log(“WebSocketClosed!”);};
ws.onerror = function(evt){console.log(“WebSocketError!”);};
```

上面的 JavaScript 代码中，调用了 WebSocket 的 API。

创建一个 WebSocket 对象，需要调用 WebSocket 的构造函数，并传入需要连接的服务器地址。WebSocket 的 URL 以 ws:// 开头。

WebSocket 对象具有4个事件：

* onopen：WebSocket 连接成功后触发
* onmessage：浏览器接收到 WebSocket 服务器发送过来的数据时触发
* onclose：浏览器接收到 WebSocket 服务器传来的关闭连接请求时触发
* onerror：连接失败，发送、接收数据失败或者处理数据出现错误时触发

## 浏览器支持
<style>
    table {
        font-size: 12px;
        line-height: 1.2;
    }
    th:first-child, td:first-child:not(.gutter) {
        width: 30%;
    }
    .post-body a img{
        width: 350px;
        height: 300px;
    }
</style>

**Desktop**

Feature | Chrome | Edge | Firefox (Gecko) | Internet Explorer | Opera | Safari
------- | ------- | ------- | ------- | ------- | ------- | -------
Version -76 support  | 6 | No support | 4.0 (2.0) | No support | 11.00 (disabled) | 5.0.1
Protocol version 7 support  | No support | No support | 6.0 (6.0)`Moz` | No support | No support | No support
Protocol version 10 support  | 14 | No support | 7.0 (7.0)`Moz` | HTML5 Labs | ? | ?
Standard - RFC 6455 Support | 16 | (Yes) | 11.0 (11.0) | 10 | 12.10 | 6.0
Usable in Workers | (Yes) | (Yes) | 37.0 (37.0) | ? | ? | ?

**Mobile**

Feature | Android | Edge | Firefox Mobile (Gecko) | IE Mobile | Opera Mobile | Safari Mobile
------- | ------- | ------- | ------- | ------- | ------- | -------
Version -76 support  | ? | No support | ? | ? | ? | ?
Protocol version 7 support  | ? | No support | ? | ? | ? | ?
Protocol version 8 support (IETF draft 10)  | ? | No support | 7.0 (7.0) | ? | ? | ?
Standard - RFC 6455 Support | 4.4 | (Yes) | 11.0 (11.0) | ? | 12.10 | 6.0
Usable in Workers | (Yes) | (Yes) | 37.0 (37.0) | ? | ? | ?

# Socket.io

Socket.io 用于浏览器与 Node.js 之间实现实时通信。

* 官网：https://socket.io/
* 官网聊天室案例：https://socket.io/get-started/chat/
* Socket.io 中文介绍：http://www.cnblogs.com/xiezhengcai/p/3956401.html
* Socket.io 简述：http://blog.csdn.net/yczz/article/details/51743815

在写这篇文章之前，我只是使用了 Socket.io，但对于它却并不是很了解，之前我一直认为 Socket.io 就是对 WebSocket 协议的实现。事实上，这种看法并不完全正确。

## Socket.io 介绍

Socket.io 是一个完全由 JavaScript 实现、基于 Node.js、支持 WebSocket 协议的用于实时通信、跨平台的开源框架，它包括了客户端的 JavaScript 和服务器端的 Node.js。

Socket.io 设计的目标是支持任何的浏览器，任何 Mobile 设备。支持主流的 PC 浏览器 (IE,Safari,Chrome,Firefox,Opera等)，Mobile 浏览器(iphone Safari/ipad Safari/Android WebKit/WebOS WebKit等)。

但是，WebSocket 协议是 HTML5 新推出的协议，浏览器对它的支持并不完善，由此可以看出，Socket.io 不可能仅仅是对 WebSocket 的实现，它还支持其他的通信方式，如上面介绍过的 ajax 轮询和 Long Polling。根据浏览器的支持程度，自主选择使用哪种方式进行通讯。

**Socket.io 支持的通信方式：**

* WebSocket
* Adobe Flash Socket
* AJAX long-polling
* AJAX multipart streaming
* Forever IFrame
* JSONP polling

## Socket.io 的使用

node 端使用 express 框架

### 引入

服务器端：
`npm install --save socket.io`

浏览器端（引入本地文件）：
`<script src="/socket.io/socket.io.js"></script>`

浏览器端（CDN 加速）：
`<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"> </script>`

### 创建 io 服务器

```
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function() {
    console.log('App listening on port 3000!');
});
```

### 服务端

Socket.IO 提供了默认事件（如：connect, message, disconnect）。另外，Socket.IO允许发送并接收自定义事件。

**监听客户端连接，回调函数会传递本次连接的socket**
> io.on('connection',function(socket){  });

**给所有客户端广播消息**
> io.sockets.emit('String',data);

**给指定的客户端发送自定义事件**
> socket.emit('String', data);
> io.sockets.socket(socketid).emit('String', data);

**接收客户端发送的自定义事件**
> socket.on('String',function(data));

**给除了自己以外的客户端广播消息**
> socket.broadcast.emit("msg", data); 

### 房间

房间是 Socket.IO 提供的一个非常好用的功能。房间相当于为指定的一些客户端提供了一个命名空间，所有在房间里的广播和通信都不会影响到房间以外的客户端。

**使用 join() 方法将 socket 加入房间：**
```
io.on('connection', function(socket){
    socket.on('group1', function (data) {
        socket.join('group1');
    });
    socket.on('group2',function(data){
        socket.join('group2');
    });
});
```

**使用 leave() 方法离开房间：**
> socket.leave('some room');

**向房间中除了当前 socket 的其他 socket 发送消息**
> socket.broadcast.to('group1').emit('event_name', data);
broadcast方法允许当前socket client不在该分组内

**向房间中所有的 socket 发送消息**
> io.sockets.in('group1').emit('event_name', data);

**获取连接的客户端 socket**
```
io.sockets.clients().forEach(function (socket) {
    //.....
})
```

**获取所有房间（分组）信息**
> io.sockets.manager.rooms

**来获取此socketid进入的房间信息**
> io.sockets.manager.roomClients[socket.id]

**获取particular room中的客户端，返回所有在此房间的socket实例**
> io.sockets.clients('particular room')

### 命名空间

通过命名空间可以为 Socket.IO 设置子程序。默认命名空间为 “/”，Socket.IO 默认连接该路径。

使用 of() 函数可以自定义命名空间。

```
var chat = io.of('/chat');
chat.on('connection', function(socket){
  console.log('someone connected');
});
```

### 客户端

**建立一个 socket 连接**
> var socket = io.connect( window.location.protocol + '//' + window.location.host);

或
> var socket = io( window.location.protocol + '//' + window.location.host);

**建立有命名空间的 socket 连接**
> var chat = io.connect( window.location.protocol + '//' + window.location.host + '/chat');

**监听服务器消息**
```
socket.on('msg',function(data){
    console.log(data);
});
```
> socket.on("String",function(data){}) 监听服务端发送的消息, String 参数与服务器端 socket.emit('String', data) 第一个参数 String 相同。

**向服务器发送消息**
> socket.emit('msg', data);

**监听 socket 断开与重连**

```
socket.on('disconnect', function() {
    console.log("与服务器断开");
});

socket.on('reconnect', function() {
    console.log("重新连接到服务器");
});
```

**客户端 socket.on() 监听的事件**

* connect：连接成功
* connecting：正在连接
* disconnect：断开连接
* connect_failed：连接失败
* error：错误发生，并且无法被其他事件类型所处理
* message：同服务器端message事件
* anything：同服务器端anything事件
* reconnect_failed：重连失败
* reconnect：成功重连
* reconnecting：正在重连

# 聊天室

流程：
* 创建 socket 服务器
* 浏览器建立 socket 连接
* 页面输入聊天内容，点击 “发送” 按钮，向自定义 socket 事件 "chat" 发送聊天信息
* 服务器监听浏览器 "chat" 事件，当接收到浏览器发来的聊天信息时，将信息发送给所有连接了 socket 的浏览器
* 浏览器监听服务器发来的 "chat" 事件，接收到聊天信息时，在页面上显示

![image](/uploads/gif/chat.gif)

node 端代码：
```
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    // 监听客户端发送的 chat 事件
    socket.on('chat', function (chatinfo) {
        // 向当前 socket 发送聊天信息
        socket.emit('chat', chatinfo);
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat', chatinfo);
    });
});

server.listen(3000, function() {
    console.log('App listening on port 3000!');
});
```

HTML 代码：
```
<div id="chat">
    <ul id="chatList">
    </ul>
    <form>
        <input type="text" name="chatContent" id="chatContent" />
        <input type="button" id="sendChatContent" value="发送" />
    </form>
</div>
```

浏览器 socket 代码：
```
// 建立 socket 连接
var url = window.location.protocol+'//'+window.location.host;
socket = io.connect(url);

// 点击“发送”，向服务器发送聊天信息
$('#sendChatContent').click(function (ev) {
    var username = $('#username').text();
    var chatContent = $('#chatContent').val().trim();
    if(!chatContent){
        return;
    }
    if(socket){
        // 向服务器 chat 事件，发送信息
        socket.emit('chat', {username: username, chatContent: chatContent});
    }
    $('#chatContent').val('');
});

// 监听服务器发送来的 chat 事件
socket.on('chat', function (chatinfo) {
    $('#chatList').append('<li><span class="chatusername">' + chatinfo.username + '</span>：<span class="chatcontent">' + chatinfo.chatContent + '</span></li>');
    $('#chatList').scrollTop(10000);
});
```

