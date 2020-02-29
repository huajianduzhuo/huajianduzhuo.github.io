---
title: Web Components初识
date: 2020-03-01 03:30:19
tags: [Web Components]
categories: Web Components
---

# Web Components

MDN: [https://developer.mozilla.org/zh-CN/docs/Web/Web_Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

自定义 HTML 标签，必须使用 `-` 连字符，以区分于原生 HTML标签。

<!-- more -->

## 定义自定义元素

定义一个自定义元素，首先需要定义一个类，并继承 `HTMLElement` 类，来继承 HTML 元素的特性。

通过标签使用自定义元素，即该类的实例。

```javascript
class UserCard extends HTMLElement {
  constructor () {
    super()
  }
}
```

然后，需要调用 `window.customElements.define` 方法，将 `user-card` 标签与这个类关联。

```javascript
window.customElements.define('user-card', UserCard)
```

## 自定义元素添加内容

自定义元素中的内容，在创建的 class 的构造函数中定义。`this` 即为自定义元素实例。

```javascript
class UserCard extends HTMLElement {
  constructor () {
    super()
    let image = document.createElement('img')
    image.classList.add('image')

    let wrap = document.createElement('div')
    wrap.classList.add('wrap')

    let name = document.createElement('p')
    name.classList.add('name')
    name.innerText = '姓名：白宇'

    let works = document.createElement('p')
    works.classList.add('works')
    works.innerText = '作品：银河补习班'

    wrap.append(name, works)
    this.append(image, wrap)
  }
}
```


