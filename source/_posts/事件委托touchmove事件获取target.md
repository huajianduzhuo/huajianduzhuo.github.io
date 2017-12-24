---
title: 事件委托touchmove事件获取target
date: 2017-12-24 13:59:56
tags: [touchmove, target]
categories: 移动端
---

　　今天做项目时发现，移动端 touchmove 事件获取到的 target 元素，总是 touchstart 事件时的 target，而不能跟随手指的移动动态得到当前 target。

<!--more-->

　　最近项目需要做一个通讯录页面，并且要仿照 iPhone 原生的通讯录，其中有一个功能，即滑动右侧的英文字母列表，通讯录列表要相应滑动到对应的位置。如下图所示：

<style>
#imgWrapper {
  width: 200px;
  overflow: hidden;
  margin: 0 auto;
}
</style>

<div id="imgWrapper">
  ![mobile](http://ovqy85q1k.bkt.clouddn.com/mobile.gif)
</div>

右侧字母列表的代码如下（vue 实现）：

```HTML
<ul class="letter-list" @touchmove.prevent="scrollToLetter()">
  <li v-for="(letter, index) in letters" :id="letter" :key="index">
    {{ letter }}
  </li>
</ul>
```

　　如代码所示，我想要使用事件委托，为 ul 绑定 touchmove 事件，通过 `e.changedTouches[0].target.id` ，可以获取当前触摸到的字符，并将联系人列表移动到相应字符的位置。

　　然而，当我这样写完，测试时发现效果不对，联系人列表只能滑动到 touchstart 时对应的字符位置，通过 log 打印发现，`e.changedTouches[0].target` 获取到的永远是 touchstart 时的 target，所有这种方式获取 target 是错误的。

　　通过上网查阅资料，最终通过以下方式获取到了正确的 target：

```JavaScript
const touch = event.changedTouches[0]
const letterE = document.elementFromPoint(touch.clientX, touch.clientY)
console.log(letterE);
if (!letterE) return
const letter = letterE.id
```

`document.elementFromPoint` 方法的浏览器兼容性如下：

* **desktop**

Feature | Chrome | Firefox (Gecko) | Internet Explorer | Opera | Safari (WebKit)
--------|--------|-----------------|-------------------|-------|----------------
Basic support | 53.0 | ? | ? |  | ?

* **mobile**

Feature | Android | Android Webview | Firefox Mobile (Gecko) | Firefox OS | IE Mobile | Opera Mobile | Safari Mobile | Chrome for Android
--------|---------|-----------------|------------------------|------------|-----------|--------------|---------------|-------------------
Basic support | 未实现 | 53.0 | ? | ? | ? |  | ? | 53.0