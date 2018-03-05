---
title: vue项目使用WebViewJavascriptBridge
date: 2018-01-08 00:01:05
tags: [vue, WebViewJavascriptBridge]
categories: 移动端
---

现在在做的项目是 hybrid 开发，H5 页面会嵌入到 IOS 客户端 app 中，于是就涉及到了 H5 与 IOS 交互的问题。在这里记录一下项目中用到的交互方式，重点介绍 `WebViewJavascriptBridge`。
<!--more-->

# H5 调用 IOS，无返回

项目中最简单的一个交互需求，是在客户端打开 H5 页面后，页面上有一个后退按钮，可以退回到客户端页面。这个需求纯前端是无法做到的，前端必须调用 IOS 的退回方法。

H5 页面需要调用 IOS 端的方法，且不需要获取返回值时，可以很简单的使用 `schema` 的方式，而不需要通过第三方库来实现。具体方式是：

* 前端与客户端约定好一个 schema 的名称，比如退回就叫做 goback
* 前端通过 `location.href="goback://"` 或 `iframe.src="goback://"` 的方式发起请求
* IOS 端拦截 goback 这个 schema，执行后退逻辑
* 如果需要向客户端传递参数，直接在该 url 后面拼接参数即可，客户端可以进行解析

# 使用 WebViewJavascriptBridge

当 H5 页面与 IOS 端交互比较复杂时，比如页面需要获取 IOS 端传回的返回值，或者 IOS 端需要调用 js 方法。

可以通过第三方库来实现，我们项目用的是 `WebViewJavascriptBridge`。下面介绍我怎么在 vue 项目中使用 `WebViewJavascriptBridge`

[WebViewJavascriptBridge GitHub 地址](https://github.com/marcuswestin/WebViewJavascriptBridge)

* 创建 src/config/bridge.js 文件，用于封装 WebViewJavascriptBridge 
* 将以下代码拷贝到 bridge.js 文件中
```JavaScript
function setupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  let WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

export default {
  callhandler (name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerhandler (name, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}
```
* 在 main.js 中引入该文件
```JavaScript
import Bridge from './config/bridge.js'
Vue.prototype.$bridge = Bridge
```
* 在需要调用客户端方法的组件中（事先需要与客户端同事约定好方法名）
```JavaScript
this.$bridge.callhandler('ObjC Echo', params, (data) => {
  // 处理返回数据
})
```
* 当客户端需要调用 js 函数时,事先注册约定好的函数即可
```JavaScript
this.$bridge.registerhandler('JS Echo', (data, responseCallback) => {
  alert('JS Echo called with:', data)
  responseCallback(data)
})
```

