---
title: Vue实现思路简单分析
date: 2017-09-12 16:05:21
tags: [数据代理, 数据绑定, 模板解析]
categories: Vue
---

<div class='vuedata'>
  ![image](/uploads/Vue/data.png)
</div>
<style>
@media screen and (min-width: 768px) {
  .posts-expand .post-body .vuedata {
    position: relative;
    margin: 0 auto;
    line-height: 1.2;
    width: 300px;
    height: 250px;
  }
  .posts-expand .post-body .vuedata img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0;
    margin: 0 auto;
    padding: 0;
    width: 450px;
    max-width: 450px;
  }
}
</style>

<!--more-->
主要分析 Vue 数据代理、模板解析、数据绑定等方面，配合一些代码，简单实现 Vue 基本功能。

> 注意：本文并没有直接参考 Vue 源码，参考源码为：https://github.com/DMQ/mvvm

# 数据代理

Vue 中，配置对象中的 data 对象中的数据，保存在 vm 对象的 `$data` 属性中，由 vm 对象进行代理。

创建如下 vm 实例：
```JavaScript
let vm = new Vue({
  el: '#app',
  data: {
    msg: 'cencen'
  }
})
```

通过 vm 代理读取 `$data` 中的数据：
```JavaScript
console.log(vm.msg); // cencen
```

通过 vm 代理更改 `$data` 中的数据：
```JavaScript
vm.msg = '岑大王';
console.log(vm.$data.msg); // 岑大王
```

**模拟实现原理**

* 将传入的选项对象中的 data 属性值，保存在 vm 实例的 `$data` 属性中

* 遍历 data 对象的所有属性，添加到 vm 实例上。

* 在 vm 上定义新的属性时，使用访问描述符
  * 属性的 get 方法返回 vm 实例上的 `$data` 属性对象上对应的属性值
  * set 方法将新的属性值设置到 `$data` 对象上对应的属性。

```JavaScript
function Vue(option){
  this.$option = option;
  // 将 option 选项对象的 data 属性，保存到变量 data和 vm 的 $data 属性
  let data = this.$data = this.$option.data;
  let vm = this;
  // 遍历 data 对象的所有属性，添加 vm 代理
  Object.keys(data).forEach(function(key){
    vm._proxy(key);
  })
}

Vue.prototype = {
  // 代理方法
  _proxy (key){
    let vm = this;
    // 在 vm 实例上添加对应的属性，实现对 $data 对象上的属性的代理
    Object.defineProperty(vm, key, {
      configurable: false, // 不可重新定义
      enumerable: true, // 可枚举
      // 代理读
      get: function proxyGetter(){
        return vm.$data[key];
      },
      // 代理写
      set: function proxySetter(newVal){
        vm.$data[key] = newVal;
      }
    })
  }
}
```

# 模板解析

Vue 使用模板，实现在页面上使用 model 中的数据。

模板解析，就是操作页面上的节点，按照相应的规则解析所使用的模板语法，并显示出理想的页面。

## 批量更新

解析模板时，为了防止多次操作页面上的节点，造成过多的重绘重排，可以采用**批量更新**的方法：

* 将挂载元素下的所有子节点，移出到代码片段（fragment）中
* 在 fragment 中进行模板解析，编译所有子节点
* 解析完成后，再将 fragment 插入到挂载元素进行显示

这样对于页面来说，只进行了移出所有子元素和插入编译好的代码片段两次重排操作。
```javascript
function Compile(el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el); // 移出
        this.init(); // 解析 fragment
        this.$el.appendChild(this.$fragment); // 插入
    }
}

Compile.prototype = {
  node2Fragment: function(el) {
    // 将 el 所有子节点取出，放入暂存元素
    let childStr = el.innerHTML;
    el.innerHTML = '';
    let tempEl = document.createElement('div');
    tempEl.innerHTML = childStr;
    // 创建fragment
    let fragment = document.createDocumentFragment();
    let child;
    // 遍历暂存元素，将所有子节点放入fragment
    while(child = tempEl.firstChild){
      fragment.appendChild(child);
    }

    return fragment;
  },

  isElementNode: function(node) {
    return node.nodeType == 1;
  }
}
```

## 解析过程

在 fragment 中解析模板时，需要遍历 fragment 的所有子节点，根据节点类型，具有不同的解析方式。

* 遍历子节点 `fragment.chileNodes`
* 判断节点类型 `node.nodeType`
* 若为元素节点：对指令属性进行解析
  * 事件指令解析
  * 一般指令解析
* 若为文本节点：解析表达式
  * 通过正则匹配表达式字符串：`/\{\{(.*)\}\}/`
  * `exp = RegExp.$1` 获取表达式名
  * 得到表达式的值`vm[exp]`后，设置到该文本节点的 textContent
* 若子节点还包含子节点 `if(node.childNodes && node.childNodes.length)`，递归解析该子节点的所有子节点

```JavaScript
Compile.prototype = {
  init: function() {
      this.compileElement(this.$fragment);
  },

  compileElement: function(el) {
      var childNodes = el.childNodes, // 获取所有子节点
          me = this;
      // 遍历子节点
      [].slice.call(childNodes).forEach(function(node) {
          var text = node.textContent;
          var reg = /\{\{(.*)\}\}/;

          if (me.isElementNode(node)) { 
              // 元素节点，解析指令
              me.compile(node);

          } else if (me.isTextNode(node) && reg.test(text)) { 
              // 包含表达式的文本节点，解析表达式
              me.compileText(node, RegExp.$1);
          }

          // 元素节点包含子节点，递归解析
          if (node.childNodes && node.childNodes.length) {
              me.compileElement(node);
          }
      });
  }
}
```

## 元素节点指令属性解析

* 获取元素所有属性：`attrs = node.attributes`
* 遍历属性：`[].slice.call(attrs).forEach(function(attr){})`
* 得到属性名：`attrName = attr.name`
* 得到属性值（表达式名）：`exp = attr.value`
* 判断是否是 Vue 指令：`attrName.indexOf('v-') == 0`
* 获取指令名（不包含 v-）：`direcName = attrName.substring(2)`
* 判断是否为事件指令：`direcName.indexOf('on') === 0`
  * 事件名：`eventType = direcName.split(':')[1]`
  * 得到回调函数：`callback = vm.$options.methods[exp]`
  * 给元素绑定事件（事件函数绑定 this 为 vm）：`node.addEventListener(eventType, callback.bind(vm), false)`
* 不是事件指令，则为一般指令
  * `v-text`：操作节点 textContent
  * `v-model`：操作节点 value
  * `v-html`：操作节点 innerHTML
  * `v-class`：操作节点 className
* 移除指令属性：`node.removeAttribute(attrName)`

```JavaScript
Compile.prototype = {
    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name; // 属性名
            // Vue 属性
            if (me.isDirective(attrName)) {
                var exp = attr.value; // 表达式
                var dir = attrName.substring(2); // 指令名
                if (me.isEventDirective(dir)) {
                    // 事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    }
}

var compileUtil = {
    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }
}
```

# 数据绑定

数据绑定（model => view），一旦更新了 data 中的数据，页面中直接或间接使用了该属性的节点都会更新。

## 数据劫持

vue.js 采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

## 实现数据绑定的思想

Vue 通过数据劫持实现数据绑定，最核心的方法就是`Object.defineProperty()`，在属性的 getter 方法中，将数据与页面中使用了该数据的节点进行绑定，在 setter 方法中，监视数据变化，当数据发生了变化，通知绑定了该数据的页面节点进行更新。

实现过程中，比较重要的几点：

* 实现一个数据监听器 **Observer**，能够对数据对象 data 的所有属性进行监听，如有变动可拿到最新值并通知订阅者
* 实现一个解析器 **Compile**，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 
* 实现一个 **Watcher**，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
* mvvm入口函数，整合以上三者

![image](/uploads/Vue/2.png)

## 实现过程

### Observer

* 定义 `observe` 方法，传入一个参数，判断参数如果是对象，则调用 Observer 构造函数，监视该对象所有属性。这里传入 data，监视 data 中所有属性。

* `Observer` 构造函数中，遍历 data 所有属性，进行如下操作：
  * 重新调用 `observe` 方法，传入当前属性，若该属性值是对象，则可以实现监视 data 任意层次数据
  * 为每一个属性创建一个 dep （dependency）对象，该对象包含一个 id 属性（作为该 dep 的唯一标识），和一个 subs 属性（初始为空数组，用于存储订阅了该属性数据变化的 watcher）。
  * 使用`defineProperty()`为 data 重新定义所有属性，定义 getter/setter 方法，实现数据劫持。
  * `getter` 方法，用于获取值。当一个 watcher 获取值时，getter 方法会判断当前 dep 和 watcher 是否建立了数据订阅关系，如果没有，则在当前属性的 dep 对象的 subs 属性中，存储该 watcher，并在 watcher 对象的 depIds 属性中存储当前 dep。
  * `setter` 方法，用于监视当前属性数据变化，当数据发生改变，则通知该属性的 dep，dep 通知 subs 属性中所有 watcher，watcher 则触发绑定的回调函数，更新视图。

> data 对象中每个层次的属性，都对应一个 dep 对象。

### Compile

Compile 解析模板的过程，在第二章已经分析过，这里需要分析一下 Compile 解析模板过程中，是如何实现订阅数据变化的。

模板解析过程中，当解析表达式（{ {...} }）和元素节点的非事件指令（v-model、v-text、v-html、v-class等）时，将该模板替换成数据显示到页面后，会调用 Wacther 构造函数，为该节点创建一个 watcher 对象，并为该 watcher 对象绑定一个更新该节点视图的回调函数。

### Wacther

watcher 对象在编译模板的过程中被创建，作为 data 中的数据和视图页面的桥梁。

> 页面中每一个表达式、元素非事件指令，都对应一个 watcher 对象。

watcher 对象中包含如下属性：
* vm  ： vm对象
* exp ： 对应指令的表达式
* cb  ： 当表达式所对应的数据发生改变时，用于更新页面的回调函数
* value ： 表达式当前的值
* depIds ： 存储表达式中各级属性所对应的 dep 对象的集合对象。属性名为 dep 的 id, 属性值为 dep

由于 watcher 对象中存储了模板对应表达式的值，所以创建 watcher 对象时，会调用该表达式的各级属性的 getter 方法来获取当前值。在 Observer 中，已经介绍过，getter 方法会判断当前 watcher 对象的 depIds 属性中，是否包含该数据的 dep 对象，若没有，则会分别在 dep 对象的 subs 属性存储当前 watcher 对象，在 watcher 对象的 depIds 属性中，存储该数据的 dep 对象。

### model 到 view 绑定

watcher 对象中，存储了更新该对象对应的页面节点的回调函数，并且在相应表达式的各级属性中订阅了数据变化的通知。

当数据发生变化时，由于数据劫持，在 setter 方法中，会通过该数据对应的 dep 对象，通知所有订阅了该数据变化的 watcher，watcher 对象则调用存储的回调函数，更新视图。

## 双向数据绑定


前面介绍了 model => view 的数据绑定，Vue 通过 `v-model` 指令实现了 view => model 的数据绑定。

当解析 `v-model` 指令时，会给当前元素添加 `input` 监听事件，当元素的值发生改变时，会将最新的值赋给当前表达式对应的 data 属性。

```JavaScript
model: function(node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
        val = this._getVMVal(vm, exp);
    node.addEventListener('input', function(e) {
        var newValue = e.target.value;
        if (val === newValue) {
            return;
        }

        me._setVMVal(vm, exp, newValue);
        val = newValue;
    });
},

_getVMVal: function(vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function(k) {
        val = val[k];
    });
    return val;
},

_setVMVal: function(vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function(k, i) {
        // 非最后一个key，更新val的值
        if (i < exp.length - 1) {
            val = val[k];
        } else {
            val[k] = value;
        }
    });
}
```
