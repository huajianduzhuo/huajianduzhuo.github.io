---
title: 'vue {{}}中内容的换行问题'
date: 2019-11-26 23:35:51
tags: [换行]
categories: Vue
---

换行的两种方式：

* 使用 `<br>` 和 `v-html`
* 设置 `white-space: pre-wrap;`

使用不同方式显示内容时，换行问题总结：
<!--more-->

| 文本显示方式 |   `\n`    |   `<br>`    |
|:-----------:|:-------:|:---------:|
|vue 中使用 `{ { } }`|默认不换行，`\n` 的位置会有空格，设置样式 `white-space: pre-wrap;` ，可以换行|不换行|
|textContent|默认不换行，`\n` 的位置会有空格，可通过设置 `white-space: pre-wrap;` 换行|不换行|
|innerHTML|默认不换行，`\n` 的位置会有空格，可通过设置 `white-space: pre-wrap;` 换行|换行|
|innerText|默认换行|不换行|
|textarea 标签的 value|默认换行|不换行|