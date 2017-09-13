---
title: Vue学习笔记
date: 2017-09-03 19:51:45
tags: [Vue]
categories: Vue
---

<div class='vuel'>
  ![image](/uploads/Vue/logo.png)
</div>
<style>
  .posts-expand .post-body .vuel {
    margin: 0 auto;
    line-height: 1.2;
  }
  .posts-expand .post-body .vuel img {
    border: 0;
    margin: 0 auto;
    padding: 0;
    width: 150px;
  }
</style>

<!--more-->

## 生命周期

* **beforeCreate**

  数据代理
  数据绑定

* **created**  =>  异步任务（定时器、ajax、事件监听）

  编译模板

* **beforeMount**

  批量更新到挂载元素

* **mounted**  =>  异步任务（定时器、ajax、事件监听）

  更新数据

* **beforeUpdate**

  重新渲染虚拟 DOM

* **updated**

  vm.$destroy()

* **beforeDestroy**   =>  清除定时器

* **destroyed**

<div class='lifecycle'>
  ![image](/uploads/Vue/lifecycle.png)
</div>
<style>
.posts-expand .post-body .lifecycle img {
  margin: 0 auto;
  padding: 0;
  width: 380px;
}
</style>

## 自定义指令

指令：自定义元素属性

Vue 预定义了一些指令，也可以自定义

### 全局指令

```JavaScript
Vue.directive('my-directive', function(el, binding){
  el.innerHTML = binding.value.toUpperCase()
})
```

### 局部指令

```JavaScript
directives: {
  'my-directive': function(el, binding){
    el.innerHTML = binding.value.toLowerCase()
  }
}
```

### 使用指令

注册指令时，指令名不用写 `v-`，但是使用指令时，必须添加上。
```HTML
<div v-my-directive="msg"></div>
```

