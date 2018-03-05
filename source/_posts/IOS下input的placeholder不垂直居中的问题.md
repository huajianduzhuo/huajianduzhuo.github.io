---
title: IOS下input的placeholder不垂直居中的问题
date: 2018-03-05 22:34:05
tags: [IOS, safari, placeholder]
categories: 移动端
---

为 `input` 设置 `lineHeight: 1;`, 可以使 input 输入框内用户输入的文本垂直居中，但是在 IOS 的 Safari 浏览器中查看， `placeholder` 提示文字垂直方向靠上，解决此问题，可以为该 input 设置 `lineHeight: normal;`。