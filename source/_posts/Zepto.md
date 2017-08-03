---
title: Zepto
date: 2017-08-03 10:36:02
tags: [zepto]
categories: 移动端
---

　　Zepto是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api。 如果你会用jquery，那么你也会用zepto。
　　Zepto.js (1.1.6)文档下载：http://www.css88.com/doc/zeptojs-1.1.6_api/
　　需要注意的是Zepto的一些可选功能是专门针对移动端浏览器的，因为它的最初目标在移动端提供一个精简的类似jquery的js库。
<p style="font-size: 14px;height:20px;margin:0;padding-left:30px;"> Zepto 官网：http://zeptojs.com/ 
Zepto API中文文档：http://www.css88.com/doc/zeptojs_api/</p>
<!--more-->

# Zepto特点

1、轻量级，压缩版本只有8kb左右
2、针对移动端的框架
3、语法同jquery大部分一样，都是$为核心函数
4、响应，执行快。
5、目前功能完善的框架体积最小的一个

# Zepto核心函数

Zepto 核心函数与 jQuery 相同，使用 $ 指向 Zepto 本身。

与jQuery的核心函数相同，Zepto 的核心函数有四种类型的参数：
* 1、function(){}
    参数为一个函数，代表页面加载完成后立即执行函数里的代码。
* 2、选择器字符串
    　　参数为选择器字符串，返回一个 Zepto 集合对象，与 jQuery 对象类似，Zepto 集合对象也是一个类数组对象，包含所有符合指定选择器的 DOM 元素。
    　　Zepto 集合对象同样拥有与 jQuery 对象类似的方法。
* 3、html标签字符串
    参数为 html 标签字符串，可以用来创建 DOM 节点。
* 4、DOM节点
    参数为 DOM 节点，返回一个包含该 DOM 节点的 Zepto 集合对象。

```
$('div')  //=> 所有页面中得div元素
$('#foo') //=> ID 为 "foo" 的元素

// 创建元素:
$("<p>Hello</p>") //=> 新的p元素
// 创建带有属性的元素:
$("<p />", { text:"Hello", id:"greeting", css:{color:'darkblue'} })
//=> <p id=greeting style="color:darkblue">Hello</p>

// 当页面ready的时候，执行回调:
Zepto(function($){
  alert('Ready to Zepto!')
})
```

# Zepto核心方法

Zepto 的核心方法与 jQuery 类似，如：

1、$.ajax() 、 $.get() 、$.post()
2、$.each()
3、$.trim()
4、$.isArray()
.....

Zepto 集合对象同样拥有与 jQuery 对象类似的方法，如：

1、addClass()
2、show()
3、find()
.....

可参考 Zepto 官方文档。

# Zepto 与 jQuery 的区别

## attr和prop

在 jQuery 中，prop() 方法多用在获取标签的固有属性，尤其是布尔值属性（如disabled、checked、selected），attr() 方法多用在获取自定义属性。如果用 attr() 方法获取布尔值属性，且该属性在标签内没有定义，则会得到 undefined，而 prop() 方法会得到 false。

jQuery代码：
```
<button id="btn">haha</button>
console.log($('#btn').prop('disabled')); // =>> false
console.log($('#btn').attr('disabled')); // =>> undefined
```

在 Zepto 中，**attr() 方法也可以获取标签的布尔值属性**。不过 prop() 方法在读取属性时优先级高于 attr() 方法，布尔值属性的读取还是建议用 prop() 方法。
> 需要注意的是：在 Zepto 中，removeProp() 的方法，在1.2+版本中才支持。

Zepto代码：
```
<button id="btn">haha</button>
console.log($('#btn').prop('disabled')); // =>> false
console.log($('#btn').attr('disabled')); // =>> false
```

## 使用核心函数创建DOM节点

Zepto 和 jQuery 都可以通过核心函数创建 DOM 元素，不同的是，Zepto 可以添加一个参数配置对象，配置对象中的属性会直接添加到新创建的标签属性内，实现结构、样式分离，而且容易管理。

代码：
```
var newdiv = $('<div>通过zepto创建的div</div>', {
    id: 'newdiv',
    css: {
        height: '30px',
        lineHeight: '30px',
        background: 'yellow'
    }
});
$('body').append(newdiv);
```
以上代码，使用 Zepto，运行后得到
```
<div id="newdiv" style="height: 30px; line-height: 30px; background: yellow;">通过zepto创建的div</div>
```
如果使用的是 jQuery，则会得到 
```
<div>通过jQuery创建的div</div>
```

然而，在一个例外的情况下，jQuery 传入配置对象也会起作用，如下代码：
```
var newdiv = $('<div></div>', {
    id: 'newdiv',
    css: {
        height: '30px',
        lineHeight: '30px',
        background: 'yellow'
    }
});
$('body').append(newdiv);
```
使用jQuery，得到：
```
<div id="newdiv" style="height: 30px; line-height: 30px; background: yellow;"></div>
```
如上，如果传入的HTML标签字符串是一个空标签，则即使使用 jQuery，配置对象也会起作用。这样的话，只要为配置对象添加 text 属性，就可以为标签添加内容。

## offset()方法

offset() 方法用来获取目标元素相对于视口的偏移量对象。

在 jQuery 中，得到的偏移量对象包含两个整型属性：top 和 left。

在 Zepto 中，得到的偏移量对象包含4个属性：top, left, width和height。且获取到的 width 和 height 包含 padding 和 border 的值，相当于 jQuery 中的 outerWidth() 和 outerHeight()。

不论是 jQuery 还是 Zepto，offset() 都只对可见元素有效，若元素不可见，则得到的属性值都是 0。

## width() 和 height()

获取一个元素的宽高：

**jQuery：**

* width()、height()方法：获取 content 内容区的值，没有单位
* .css('width')：获取content内容区的值，有单位px
* innerWidth()、innerHeight()：content + padding的值，没有单位
* outerHeight()、outerWidth()：content + padding + border的值，没有单位

**Zepto：**

* width()、height()方法：content + padding + border的值，没有单位，相当于 jQuery 中的 outerWidth() 和 outerHeight()
* .css('width')：获取content内容区的值，有单位px
* zepto 中没有 innerHeight()、innerWidth()、outerHeight() 和 outerWidth() 这四个方法

## 获取隐藏元素的宽高

jQuery 通过 width()、innerWidth()、outerWidth() 这三组方法，都可以获取隐藏元素的宽高。

Zepto 的 width()、height() 方法无法得到隐藏元素的宽高，隐藏元素调用这两个方法，只能返回 0。

使用 Zepto 如果想要获取隐藏元素的宽高，可以通过 css() 方法，获取特定的样式值。

## each()方法

**jQuery 的 each() 方法：**
1、可以遍历数组,以index，item的形式，
2、可以遍历对象，以key-value的形式
3、不可以遍历字符串。

**zepto 的 each() 方法：**
1、可以遍历数组,以index，item的形式，
2、可以遍历对象，以key-value的形式
3、可以遍历字符串。
4、遍历json对象，以字符串的形式遍历。

## 事件委托

在 jQuery 中，事件委托使用 delegate() 方法（live() 方法在 jQuery1.7 以上已经废除）。
```
$('#box').delegate('.a','click',function () {
    alert('delegate');
});
```
> 注意，delegate() 方法的回调函数中的 this 指向触发事件的元素。

在 Zepto 中，Zepto 官网表示已经要废除 live、delegate 等方法，推荐使用 on 方法代替。
```
$('#box').on('touchstart', '.a', function () {
    alert('我是a触发的事件委托');
});
```

# 事件绑定

* on()
    绑定事件处理程序
* off()
    方法移除用目标元素on绑定的事件处理程序。
* bind()
    为每个匹配元素的特定事件绑定事件处理函数，可同时绑定多个事件，也可以自定义事件。
* one()
    为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。只执行一次。
* trigger()
    触发由bind定义的事件（通常是自定义事件）
* unbind()
    bind的反向操作，删除匹配元素所绑定的bind事件。
* delegate
    基于一组特定的根元素为所有选择器匹配的元素附加一个处理事件，匹配的元素可能现在或将来才创建。
* undelegate
    移除通过delegate 注册的事件
* live
    类似delegate，添加一个事件处理器到符合目前选择器的所有元素匹配，匹配的元素可能现在或将来才创建。
* die
    删除通过 live 添加的事件。

> 注意：新版本的zepto中已经舍弃了bind，delegate，live，同样jquery中舍弃了live等。
> zepto 现在统一使用on，off标准事件来绑定事件。

# Touch events

touch 模块添加以下事件，可以直接调用，也可以通过 on 绑定事件：
* tap()：点击事件。利用在document上绑定touch事件来模拟tap事件的，并且tap事件会冒泡到document上
* singleTap()：单击事件
* doubleTap()：双击事件
* longTap()：当一个元素被按住超过 750ms 触发。
* swipe, swipeLeft, swipeRight, swipeUp, swipeDown：当元素被划过（同一个方向大于30px）时触发。(可选择给定的方向)

```
$('#box1').tap(function (e) {
    console.log('这是box1的tap事件');
});
```

# form表单方法

## serialize()
* 在Ajax post请求中将用作提交的表单元素的值编译成 URL-encoded 字符串。---key(name)/value
* 不能使用的表单元素：buttons、未选中的radio/checkboxs 将会被跳过。

## serializeArray()
* 将用作提交的表单元素的值编译成拥有name和value对象组成的数组。
* 不能使用的表单元素，buttons、未选中的radio/checkboxs 将会被跳过。
* 结果不包含file inputs的数据。

## submit()
* 为 "submit" 事件绑定一个处理函数，或者触发元素上的 "submit" 事件。
* 当参数function没有给出时，触发当前表单“submit”事件，并且执行默认的提交表单行为，除非调用了 `preventDefault()` 阻止默认行为。
* 当给定function参数时，在当前元素上它简单得为其在“submit”事件绑定一个处理函数。