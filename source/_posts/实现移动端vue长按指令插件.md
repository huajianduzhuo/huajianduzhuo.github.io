---
title: 实现移动端vue长按指令插件
date: 2019-11-09 18:59:10
tags: [vue, 移动端, 长按指令]
categories: Vue
---

使用定时器实现移动端长按事件，使用 vue 指令为元素添加长按事件

# 链接

[demo](http://mengyujing.com/longtapDemo/#/longtap)  （在手机上查看）

[插件github地址](https://github.com/huajianduzhuo/vueConfig/tree/master/plugins/LongTap)

<!--more-->

# 使用方式

判断为长按事件的条件：

* 手指停留超过一段时间，参见下面的参数`time`
* 手指移动小于一定距离，参见下面的参数`disX`和`disY`

## 使用插件

`import LongTap from './plugins/LongTap'`

`Vue.use(LongTap)`

## 注册长按事件

`<div v-longtap:[arg]="callback"></div>`

或

`<div v-longtap:[arg]="{handler: cb}"></div>`

## 对象字面量配置参数

使用对象字面量方式绑定长按事件，可以配置一些参数

| 参数    | 类型    | 是否必需 | 默认值 | 说明                                                                |
| :-----: | :-----: | :------: | :----: | :-----------------------------------------------------------------: |
| handler | 函数    | 是       | 无     | 长按事件回调函数                                                    |
| time    | integer | 否       | 1200   | 单位：ms，长按间隔时间，必须超过 500ms                              |
| disX    | number  | 否       | 10     | 单位：px，判断手指是否移动了的间隔，若为负数，则允许 X 方向上的移动 |
| disY    | number  | 否       | 10     | 单位：px，判断手指是否移动了的间隔，若为负数，则允许 Y 方向上的移动 |

## 长按回调函数参数

| 参数  | 类型    | 说明                   |
| :---: | :-----: | :--------------------: |
| event | Event   |                        |
| data  | any     | 注册事件时传入的动态指令参数 |
| vNode | vNode   | 触发长按事件的虚拟节点 |

## 长按时元素样式

长按元素时，可以为该元素添加激活时的样式，只需要添加一个全局的样式 `longtap-active` 即可，若有与元素本身的样式重复的，应添加 `!important`。

> 该样式在点击时也会应用。

## demo 代码

```
<template>
  <div class="wrap">
    <div>
      <div class="item"
        v-for="(item, index) in list"
        @click="handleClick"
        v-longtap:[index]="{handler: longtapCB, time: 1000, disX: 10}"
        :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    longtapCB (event, index, vNode) {
      this.$menu(event, vNode.elm, {
        menuDirection: 'horizontal',
        data: {index, name: this.list[index]},
        items: {copy: true},
        customItems: [{
          menuName: '详情',
          handler: this.showInfo
        }]
      })
    },
    showInfo (data) {
      this.$message({message: data.index + ', ' + data.name, duration: 1000})
    },
    handleClick (event) {
      this.$menu(event, event.target, {})
    }
  },
  mounted () {
    setTimeout(() => {
      this.list = ['aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd', 'aa', 'bb', 'cc', 'dd']
    }, 1000)
  }
}
</script>
```

# 源码

```javascript
let r = null, // setTimeout 标志
    cr = null // 改变长按元素样式的定时器
let startX = 0, // touchstart 时手指的位置，用于 touchmove 时判断手指是否移动
    startY = 0
let firstTouch = false

export default {
  inserted (el, binding, vNode) {
    let delayTime = 1200
    let disX = 10,
        disY = 10
    let value = binding.value
    let data = binding.arg
    /** 
     * 可通过传入对象字面量的方式，指定长按时间：v-longtap = "{time: 2000}"
     * 时间必须超过 500ms
     */
    if (value && value.time && Number.isInteger(value.time) && value.time >= 500) {
      delayTime = value.time
    }
    /** 
     * 可通过传入对象字面量的方式，指定手指移动间隔：v-longtap = "{disX: 10, disY: 10}"
     * 如果某一个值为负数，则不判断那个方向
     */
    if (value && value.disX && Number.isInteger(value.disX)) {
      disX = value.disX
    }
    if (value && value.disY && Number.isInteger(value.disY)) {
      disY = value.disY
    }
    /** 
     * 给元素绑定 touchstart 事件
     * 添加一个延迟函数，delayTime 后执行长按回调函数
     * 如果正存在一个长按事件，则本次不执行（最下面为 document 绑定 click 事件，用于取消一次已经触发的长按事件）
     */
    el.addEventListener('touchstart', event => {
      firstTouch = true
      /** 
       * touchend 时延迟删除元素样式
       * 防止多次点击样式延迟删除导致长按时样式被删除
       */
      if (cr) {
        clearTimeout(cr)
        cr = null
      }
      addActiveClass(el, true)
      let touch = event.changedTouches[0]
      startX = touch.clientX
      startY = touch.clientY
      // settimeout 函数
      r = setTimeout(() => {
        r = null
        /** 
         * 如果绑定的值是函数，则执行
         * v-longtap = "cb"
         * v-longtap = "{handler: cb}"
         * 不能是：v-longtap = "cb()"，这种形式绑定时就会执行 cb
         */
        if (typeof value === 'function') {
          value(event, data, vNode)
          event.preventDefault()
          return
        } else if (value && value.handler && typeof value.handler === 'function') {
          value.handler(event, data, vNode)
          event.preventDefault()
          return
        }
      }, delayTime)
      touch = null
    }, false)
    /** 
     * 给元素绑定 touchmove 事件
     * 若手指移动超过 10 像素，则不是长按事件，取消 timeout
     */
    el.addEventListener('touchmove', event => {
      let touch = event.changedTouches[0]
      let diffX = Math.abs(touch.clientX - startX)
      let diffY = Math.abs(touch.clientY - startY)
      if ((disX > 0 && diffX > disX) || (disY > 0 && diffY > disY)) {
        firstTouch && addActiveClass(el, false)
        if (r) {
          clearTimeout(r)
          r = null
        }
        firstTouch = false
      }
      touch = null
    }, false)
    /** 
     * 给元素绑定 touchend 事件
     * 手指离开时，如果时间没有超过 delayTime，则不是长按事件，取消 timeout
     */
    el.addEventListener('touchend', event => {
      firstTouch = false
      cr = setTimeout(() => {
        addActiveClass(el, false)
      }, 100)
      if (r) {
        clearTimeout(r)
        r = null
      }
    }, false)
    /** 
     * 禁止手机浏览器菜单
     */
    el.addEventListener('contextmenu', event => {
      event.preventDefault()
    })
  }
}

function addActiveClass(el, opt) {
  let cns = el.className.split(' ')
  let index = cns.indexOf('longtap-active')
  if (opt) {
    if (index === -1) {
      el.style.transition = 'all 0.3s'
      cns.push('longtap-active')
      el.className = cns.join(' ')
    }
  } else {
    if (index > -1) {
      cns.splice(index, 1)
      el.className = cns.join(' ')
      el.style.transition = 'all 0s'
    }
  }
}
```
