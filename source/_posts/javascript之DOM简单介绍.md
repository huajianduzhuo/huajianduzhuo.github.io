---
title: javascript之DOM简单介绍
date: 2017-06-01 14:00:13
tags: [javascript, DOM]
categories: Javascript
---

# 什么是DOM

DOM 的全称为 Document Object Model，译为文档对象模型。DOM 规定了浏览器应该如何创建 HTML 页面，以及 JavaScript 如何访问和修改浏览器窗口中的 Web 页面的内容。
<!-- more -->

## W3C 对 DOM 的定义

> The Document Object Model is a platform- and language-neutral interface that will allow programs and scripts to dynamically access and update the content, structure and style of documents. The document can be further processed and the results of that processing can be incorporated back into the presented page. 

DOM 是一个独立于任何语言和平台的接口，允许任何语言或脚本动态地访问和更新 HTML 文档的内容、结构和样式。该 HTML 页面可以进一步处理，并且该处理的结果可以被合并到所呈现的 HTML 页面中。

## 为什么要使用 DOM

> "Dynamic HTML" is a term used by some vendors to describe the combination of HTML, style sheets and scripts that allows documents to be animated. The W3C has received several submissions from members companies on the way in which the object model of HTML documents should be exposed to scripts. These submissions do not propose any new HTML tags or style sheet technology.

DHTML（动态的 HTML）是一些厂商为了宣传所使用的术语，用来描述 HTML、CSS 和 JavaScript 的组合，允许 HTML 文档实现动态化。W3C 已经收到一些成员公司提交的关于 HTML 文档的对象模型应该暴露在 JavaScript 中的方法。这些建议中没有建议任何新的 HTML 标签或样式技术。W3C 正在努力确保动态交互和脚本语言的解决方案是一致的。

## 详解什么是 DOM

DOM 的含义：
* D 表示Document，即将一个 HTML 页面表示为一个文档
* O 表示Object，即将一个 HTML 页面中的每一个部分都转换成一个对象
> DOM 实际上是以面向对象方式来描述一个HTML页面。其中Document对象主要处理HTML页面内容。
* M 表示 Model，即通过模型来表示对象之间的关系，方便获取对象
> DOM 将一个 HTML 页面表示为一个树形结构的模型。

## DOM 的发展历程

DOM 的级别包含非 W3C 标准的 0 级和 W3C 标准的 3 级:
* DOM level 0: 定义了 Document 对象的一些属性和方法。
> 值得注意的是: DOM level 0 并不是 W3C 的标准。
* DOM level 1: 是 W3C 在 1998 年 10 月提出的第一个正式的 W3C DOM 标准。
·  DOM Core: 提供了 DOM 模型、内存管理、命名约定等方便访问和操作 HTML 页面的内容。
·  DOM HTML: 提供了一些与 HTML 页面相关的对象以及 HTML 标签的属性和方法等。
> 值得注意的是: DOM level 1 中忽略了事件模型。
* DOM level 2: 是基于 DOM level 1 并且扩展了 DOM level 1，还添加了视图、事件以及 CSS 样式的内容。
·  DOM View: 描述 HTML 文档的各种视图的接口。
·  DOM Events: 描述了事件流、事件监听注册、事件接口以及文档事件接口等内容。
·  DOM Style: 描述了 CSS 样式的接口。
·  DOM Traversal and Range: 描述遍历和操作 HTML 文档的接口。

* DOM level 3: 引入了统一的文档读取和保存的方法，以及文档验证的内容等。
·  DOM Load and Save: 描述了文档的读取和保存的接口。
·  DOM Validation: 描述了文档验证的接口。
> 值得注意的是: DOM level 3 引入的主要是对 XML 文档的支持，对于 HTML 文档的用处并不大。

## DOM 的组成部分

* DOM Core: 指定类属类型，将带有标记的文档看成树状结构并据此对文档进行相关操作。
* DOM HTML: 提供用于操作 HTML 文档以及类似于 JavaScript 对象模型语法的功能部件，在核心 DOM 的基础上支持对所有 HTML 元素对象进行操作。
* DOM CSS: 提供脚本编程实现 CSS 的接口。
* DOM XML

# DOM 节点树

## DOM 树结构

DOM 将 HTML 页面表示为一个树形结构，方便访问和操作 HTML 页面中的内容。

![image](/uploads/DOM/dom_node_tree.png)

当浏览器加载 HTML 页面时，会创建这个 HTML 页面的模型。这个模型就叫做 DOM 树结构，会被保存到浏览器的内存中。

## 节点

节点（node）是个网络术语，表示网络中的连接点。一个网络是由一些节点构成的集合。

在 DOM 树结构中主要由以下 4 种节点组成:

* 文档节点: 表示整个 HTML 页面（相当于 document 对象）。当需要访问任何标签、属性或文本时，都可以通过文档节点进行导航。
* 元素节点: 表示 HTML 页面中的标签（即 HTML 页面的结构）。当访问 DOM 树时，需要从查找元素节点（标签）开始。
* 文本节点: 表示 HTML 页面中的标签所包含的文本内容。
* 属性节点: 表示 HTML 页面中的开始标签包含的属性。

> 值得注意的是: 在 DOM 树结构中，属性节点比较特殊，它并不是所在元素节点的子节点。

## 判断节点类型

通过 DOM 节点树获取 HTML 页面的节点时，可以通过如下 3 个属性进行判断节点类型

|           | nodeName  | nodeType  | nodeValue  |
| :-------: | :-------: | :-------: | :--------: |
| 文档节点   | #document | 9        | null        |
| 元素节点   | 标签名    | 1         | null       |
| 属性节点   | 属性名    | 2         | 属性值      |
| 文本节点   | #text     | 3        | 文本内容    |

## 节点关系

 构成节点树结构的同时，节点与节点之间也存在着如下 3 种关系:

* 祖先节点与后代节点的关系
* 父节点与子节点的关系
* 兄弟节点的关系

# DOM 标准 API

W3C 提供的 DOM 标准通过一系列对象实现，其中主要以以下三种对象为主：
* Document 对象
* Element 对象
* Node 对象为主

# Document 对象

Document 对象表示浏览器加载的 HTML 页面，并作为查找 HTML 页面内容的入口。它提供了全局函数，例如如何从 HTML 页面中查找指定标签或者在 HTML 页面中如何创建标签等。

页面中的所有标签，在 DOM 中具有对应的对象，所有的标签对象，同一继承于document对象，可以使用document对象的方法。

## DOM 查询

获取 HTML 标签就是查找 HTML 页面中的元素节点，也可以称为 DOM 查询。基本有 5 种方式可以使用。

### getElementById()方法 

通过id属性值获取对应标签
由于 id 属性值唯一，只能获取指定唯一标签

### getElementsByName()方法 

通过name属性值获取对应标签
返回一个类数组对象 - NodeList 对象
含义 - 存储结构上类似于数组的存储方式，最终是一个对象(当作数组使用)
注意 - 即使获取到的只有一个标签，返回的依旧是类数组结构 

### getElementsByTagName()方法  

通过标签名获取对应标签
类似于 getElementsByName() 方法

### getElementsByClassName()方法  

通过class属性值获取对应标签
类似于 getElementsByName() 方法
> 值得注意的是: getElementsByClassName() 方法在 IE 浏览器中，只能是 IE 9 版本之后才支持。（换句话讲，getElementsByClassName() 方法存在浏览器兼容问题。）

### 通过 CSS 选择器方式获取

在 HTML5 新特性中提供了两个可以通过 CSS 选择器方式来获取 HTML 页面标签的方法:
* querySelector(selector): 返回第一个选择器匹配的 HTML 页面元素。
* querySelectorAll(selector): 返回全部选择器匹配的 HTML 页面元素。

> 值得注意的是: 这两个方法只能是 IE 8 版本之后才执行。

## DOM 查询分为两类

> 传统方式: getElementById、getElementsByName、getElementsByTagName 和 getElementsByClassName
* 优点: 性能好、查询速度快
* 缺点: 使用麻烦

> HTML5新增: querySelector 和 querySelectorAll
* 优点: 使用简便
* 缺点: 性能差、查询速度慢

## 创建元素节点

通过 Document 对象创建一个新的元素节点（标签），具体语法格式如下:

    document.createElement(标签名)

``` bash
// TODO 创建元素节点 li
var li = document.createElement('li');
var ul = document.getElementById('container');
// TODO 将创建的元素节点 li 添加到 ul 中
ul.appendChild(li);
```

## 创建文本节点

通过 Document 对象创建一个新的文本节点（文本内容），具体语法格式如下:

    document.createTextNode(文本内容)

``` bash
/*
    TODO 创建文本节点
    TODO 添加到 li 中
*/
var textNode = document.createTextNode('这是一个 id 为 six 的选项');
li.appendChild(textNode);
```

## 创建属性节点

通过 Document 对象创建一个新的属性节点，具体语法格式如下:

    document.createAttribute(属性名称)
> 值得注意的是: 属性节点并不是子节点。

``` bash
/*
    TODO 创建属性节点 class
    TODO 为属性节点赋值
    TODO 添加到 li 中
*/
var attrNode = document.createAttribute('class');
attrNode.nodeValue = 'list-group-item';
li.setAttributeNode(attrNode);
```

## document对象的特殊属性

* head属性 - 获取到页面中的 head 标签
* body属性 - 获取到页面中的 body 标签
* documentElement属性 - 获取到页面中的 html 标签

# Node 对象

## 遍历节点

### 获取父节点

通过 HTML 页面的指定标签查找其父节点，我们可以通过如下属性实现:

    node.parentNode

``` bash
var childDiv1 = document.getElementById('childDiv1');
var parent = childDiv1.parentNode;
```

> 值得注意的是：
> · parentNode: 表示获取指定节点的父节点。一个元素节点的父节点可能是一个元素(Element )节点，也可能是一个文档(Document )节点。
> · parentElement: 表示获取当前节点的父元素节点。如果该元素没有父节点，或者父节点不是一个元素节点，则返回 null。

``` bash
var btn2 = document.getElementById('btn2');
btn2.onclick = function(){
    var htmlNode = document.documentElement;
    console.log('<html>标签的parentNode: '+htmlNode.parentNode);
    console.log('<html>标签的parentElement: '+htmlNode.parentElement);
}
/* 结果
    原因在于 <html> 标签的父节点是文档节点。
    文档节点并不是一个元素节点，所以 parentElement 返回 null。
 */
<html>标签的parentNode: [object HTMLElement]
<html>标签的parentElement: null
```

### 获取子节点

通过 HTML 页面的指定标签查找其子节点，我们可以通过如下属性实现:
* firstChild: 获取指定标签的第一个子节点。
* lastChild: 获取指定标签的最后一个子节点。
* childNodes: 获取指定标签的所有子节点。

> 注意：因为下面所介绍的空白节点的存在，父节点调用firstChild、lastChild、childNodes等属性，一般会先得到空白节点。
> 这个问题的解决，一般通过 getElementsByTagName() 方法实现。

### 空白节点

有些浏览器在遍历 DOM 时，会在元素节点之间添加一个文本节点，不管这个文本节点的内容是否为空（即空白节点）。
不会自动添加空白节点的浏览器只有 IE 8 版本以及之前的版本。换句话讲，IE 9 及之后的版本、Chrome、Firefox 和 Safari 等浏览器都会自动添加空白节点。

### 获取兄弟节点

通过 HTML 页面的指定标签查找兄弟节点，我们可以通过如下属性实现:

* previousSibling: 获取指定节点的前一个兄弟节点。
* nextSibling: 获取指定节点的后一个兄弟节点。

> 注意，previousSibling 和 nextSibling 两个属性一般也会先得到空白节点。

``` bash
// 获取 id 为 two 的 <li> 标签的前一个兄弟节点，并且改变背景颜色
var btn6 = document.getElementById('btn6');
btn6.onclick = function () {
    var two = document.getElementById('two');
    var pre = two.previousSibling.previousSibling;
    pre.style.backgroundColor = 'yellow';
}
```

## 插入节点

向 HTML 页面标签插入新的标签或者其他标签，我们可以通过如下方法实现:

### appendChild()

将一个节点添加到指定父节点的子节点列表末尾。

    parent.appendChild(child)

``` bash
var btn1 = document.getElementById('btn1');
btn1.onclick = function () {
    var first = document.getElementById('first'); // ul容器
    first.appendChild(li);
}
```

### insertBefore()

在当前节点的某个子节点之前再插入一个子节点。

    parent.insertBefore(newChild,currentChild)

``` bash
var btn2 = document.getElementById('btn2');
btn2.onclick = function () {
    var second = document.getElementById('second'); // ul容器
    var two2 = document.getElementById('two2'); // 第二个li
    second.insertBefore(li, two2);
}
```


> 注意：如果将新创建的标签插入到HTML页面中指定的标签中 - 新增标签
> 如果将HTML页面中已存在的标签插入到指定标签中 - 移动标签。该节点不再占有原来位置，相当于将该节点的位置移动了。

``` bash
/*
    TODO 移动节点
    TODO 	* 即将一个已存在的节点，插入到其他位置，会将该节点的位置移动
*/
var btn3 = document.getElementById('btn3');
btn3.onclick = function () {
    var move = document.getElementById('move'); // 一个已存在节点，位于ul first
    var second = document.getElementById('second'); // ul second
    var three2 = document.getElementById('three2'); // ul second 中的一个 li
    second.insertBefore(move, three2); // 节点“move”由first ul移动到了second ul
}
```

## 删除节点

从 HTML 页面中删除指定元素节点（标签），我们可以通过以下方法实现:

    parentNode.removeChild(childNode)

## 替换节点

将 HTML 页面中指定元素节点（标签）被替换，我们可以通过以下方法实现:

    parentNode.replaceChild(newChild,oldChild)

> 注意：
>   * 使用新创建的标签替换已存在的标签 - 替换
>   * 使用已存在的标签1替换已存在的标签2 - 标签1移动到标签2的位置，标签2被删除

## 复制节点

将 HTML 页面中指定元素节点（标签）进行复制，我们可以通过以下方法实现:

    node.cloneNode(boolean)

> 需要说明的是: cloneNode() 方法的参数表示是否采用深度克隆。如果为true，则该节点的所有后代节点也都会被克隆；如果为false，则只克隆该节点本身。

# Element 对象

DOM 访问或操作 HTML 页面内容主要是依靠 DOM 节点树这个模型。但在 DOM 中的三个主要对象，除了 Document 和 Node 之外，还有一个就是 Element 对象。
Element 对象描述了所有相同种类的元素所普遍具有的方法和属性，也是访问和操作 HTML 页面内容的主要途径之一。
Element 对象和 Node 对象类似，同样提供了一个 DOM 元素树这个模型。如下图所示:
![image](/uploads/DOM/DOM节点树与元素树的区别.png)

> 值得注意的是: 节点与元素的区别是什么？
> 1、 通过节点访问或操作 HTML 页面内容: 
>   * 元素节点: 表示 HTML 页面中的标签。
>   * 属性节点: 表示 HTML 页面中标签的属性。
>   * 文本节点: 表示 HTML 页面中标签的文本内容。
>
> 2、 通过元素访问或操作 HTML 页面内容:
>   * 元素: 表示 HTML 页面中的标签。
>
> 也就是说，使用节点方式时，标签、属性和文本是平行关系；而使用元素方式时，只有标签，属性和文本成为了标签的一部分。

## 获取元素

由于 Element 对象是继承于 Document 对象的，所以 Document 对象的属性和方法，Element 对象都可以直接使用。
我们已经掌握如何通过 Document 对象获取 HTML 页面标签:
* getElementById() 方法: 通过标签的 id 属性值获取指定标签。
* getElementsByName() 方法: 通过标签的 name 属性值获取指定标签。
* getElementsByTagName() 方法: 通过标签名获取指定标签。
* getElementsByClassName() 方法: 通过标签的 class 属性值获取指定标签。
* querySelector() 方法: 通过 CSS 选择器方式获取匹配的第一个标签。
* querySelector() 方法: 通过 CSS 选择器方式获取匹配的所有标签。

以上获取 HTML 页面标签的方法，在 Element 对象中同样可以使用。

> 值得注意的是: 获取的 HTML 页面中的标签，既是 Node 对象，也是 Element 对象。

## 遍历元素

### 获取父元素

通过 HTML 页面的指定标签查找其父元素，我们可以通过如下属性实现:

> element.parentElement

### 获取子元素

通过 HTML 页面的指定标签查找其子元素，我们可以通过如下属性实现:

> firstElementChild: 获取指定标签的第一个子元素。
> lastElementChild: 获取指定标签的最后一个子元素。
> children: 获取指定标签的所有子元素。

### 获取兄弟元素

通过 HTML 页面的指定标签查找兄弟元素，我们可以通过如下属性实现:

> previousElementSibling: 获取指定节点的前一个兄弟节点。
> nextElementSibling: 获取指定节点的后一个兄弟节点。

### 注意

* 并没有类似于遍历节点中的空白节点问题
* 并不是所有浏览器都支持元素的遍历属性

## 操作属性

Element 对象提供的属性操作的方法，是实际开发中应用最多的。（因为 Element 对象操作属性要比 Node 对象简便。）

### 获取属性

> element.getAttribute(属性名)

``` bash
// <li id="one" title="this is li element" class="list-group-item">这是一个 id 为 one 的选项</li>
var one = document.getElementById('one');
var attr = one.getAttribute('class');
console.log(attr); // list-group-item
```

### 设置属性

> element.setAttribute(属性名, 属性值)

``` bash
one.setAttribute('class', 'list-group-item active');
var attr = one.getAttribute('class');
console.log(attr); // list-group-item active
```

### 删除属性

> element.removeAttribute(属性名)

``` bash
one.removeAttribute('class');
var attr = one.getAttribute('class');
console.log(attr); // null
```

### 判断是否含有属性

> element.hasAttribute(属性名)

``` bash
console.log(one.hasAttribute('class'));
```

Node 对象具有hasAttributes()方法，判断是否具有属性。

# 其他操作

## 获取和更新文本

### 通过 nodeValue 属性获取或更新文本

通过学习 DOM 查询我们知道，获取或更新文本就是对文本节点的操作。文本节点的 nodeValue 属性可以得到文本内容，也可以设置文本内容。

    textNode.nodeValue

### 通过 innerText 或 textContent 属性获取或更新文本

innerText 或 textContent 属性都可以用于获取或更新文本。

> textContent 在 IE8 及以下版本不支持，得到 undefined
> IE8 及以下版本，使用 innerText
> innerText 不能获取被 CSS 样式隐藏的文本内容
>
> 值得注意的是: 并不建议使用 innerText 属性，因为它并不属性任何标准，而且性能不好。

``` bash
// HTML
<li id="one" class="list-group-item">这是一个 id 为 one 的选项</li>
<li id="two" name="list" class="list-group-item">这是一个 <i>id</i> 为 two 的选项</li>

// CSS
i {
    display: none;
}

// JS
console.log(one.innerText); // 这是一个 id 为 one 的选项
console.log(two.innerText); // 这是一个 为 two 的选项
console.log(one.textContent); // 这是一个 id 为 one 的选项
console.log(two.textContent); // 这是一个 id 为 two 的选项
```
> 上面的代码中，第二个 li 中的 id 被i标签包围，而i标签在CSS中设置了隐藏，因此，two.innerText得不到i标签中的内容。

### innerText 或 textContent 属性兼容性解决

``` bash
if(one.textContent){
    console.log(one.textContent);
    console.log(two.textContent);
}else {
    console.log(one.innerText);
    console.log(two.innerText);
}
```

## 获取或更新 HTML

我们可以通过 innerHTML 属性来获取或更新 HTML 页面的指定标签所包含的 HTML 代码内容。

# CSS操作

## 操作内联样式

HTML 页面标签的内联样式主要是通过 style 属性进行设置，所以 DOM 操作标签的内联样式也是通过 style 属性来完成的。

### style属性

    element.style.attrName = attrValue

> 如果设置 CSS 样式时，使用了 !important 预定义的 CSS 样式优先级最高，会导致改变内联样式失效。
> 在修改例如 background-color 这样的 CSS 属性时，不能使用 element.style.background-color 这种方式，浏览器会解析成 JavaScript 的表达式。最终会报错。
> 所有例如 background-color 这样的 CSS 属性在使用时，必须要改为 驼峰式 命名方式（例如 backgroundColor）。

``` bash
// HTML
<div id="div1"></div>

// CSS
#div1 {
    width: 100px;
    height: 100px;
    background-color: lightskyblue;
}

// JS
/*
    TODO 通过标签的 style 属性
    TODO * 得到 CSSStyleDeclaration 对象
    TODO   * 该对象中包含所有 CSS 的样式属性
    TODO * 注意 - 没有获取到当前标签在 <style> 标签中设置的样式内容
    TODO   * 只能获取和设置 style 属性自己的样式内容 -- 即行内样式
*/
console.log(div.style); // CSS2Properties： width、height、background-color都为空

div.style = 'width:200px;height:200px;background-color:yellow;';
console.log(div.style); // CSS2Properties： width、height、background-color为上面设置的
```

### getAttribute()和setAttribute()

* 设置内联样式: setAttribute('style', CSS 样式内容)
* 获取内联样式: getAttribute('style')

> 值得注意的是: 通过 getAttribute() 方法获取的内联样式，并不能准确到具体的样式属性值。而是返回所有 CSS 样式内容。

``` bash
/*
    TODO getAttribute() 方法，得到style属性自身的样式 -- 行内样式
    TODO 	* 没有设置行内样式，得到 null
*/
console.log(div.getAttribute('style')); // null
div.style = 'width:200px;height:200px;background-color:yellow;';
console.log(div.getAttribute('style')); // width: 200px; height: 200px; background-color: yellow;
```

## 获取当前样式

### window.getComputedStyle(element, null)

通过 element.style 属性，我们只能获取内联样式内容，并不能获取 CSS 样式内容。

我们可以通过如下方法获取 HTML 页面标签的当前样式内容（内联样式及外联样式）:

    window.getComputedStyle(element, null)

> 该方法会返回一个包含当前所有的 CSS 样式的对象，我们可以通过 object.attrName 的方式得到指定的样式值。

### element.currentStyle

IE 8 及之前版本的浏览器并不支持 getComputedStyle() 方法。如果，在 IE 8 及之前版本的浏览器，我们需要使用以下属性实现:

    element.currentStyle

### 全浏览器兼容解决方案

``` bash
function getStyle(elem, attrName){
    // 判断 window.getComputedStyle() 方法是否存在
    if (window.getComputedStyle){
        return getComputedStyle(elem, null);
    }else{
        return elem.currentStyle[attrName];
    }
}
```

## clientWidth和clientHeight

* 可见宽度: clientWidth
* 可见高度: clientHeight


    clientWidth = width + padding-left + padding-right

## offsetWidth和offsetHeight

* 实际宽度: offsetWidth
* 实际高度: offsetHeight


    offsetWidth = width + padding-left + padding-right + border-width

## 定位父元素

    element.offsetParent

## offsetLeft和offsetTop 

* 相对于其定位父元素的水平偏移量：offsetLeft
* 相对于其定位父元素的垂直偏移量：offsetTop

## scrollWidth和scrollHeight

* scrollWidth: 获取指定标签滚动区的宽度。
* scrollHeight: 获取指定标签滚动区的高度。

## scrollLeft和scrollTop

* scrollLeft: 获取水平滚动条滚动的距离。
* scrollTop: 获取垂直滚动条滚动的距离。

当一个元素滚动条到达最底部的时候：

    element.scrollHeight = element.scrollTop + element.clientHeight

