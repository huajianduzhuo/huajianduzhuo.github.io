---
title: margin-top向上传递问题解决方案
date: 2017-07-27 11:18:08
tags: [margin-top]
categories: CSS
---

　　当为子元素设置 margin-top 属性时，如果父元素不做特殊设置，子元素的 margin-top 属性会默认被传递给父元素，使父元素相对于上面的元素向下移动 margin-top 的值，而子元素的 margin-top 属性则没有效果。
　　这与预想的子元素相对父元素的顶部离开一段距离的效果是不一样的，这个问题是由 **CSS外边距合并** 产生的。
<!--more-->
## 外边距合并

　　外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

> 了解CSS外边距合并，可参考：[w3school CSS 外边距合并](http://www.w3school.com.cn/css/css_margin_collapsing.asp)、[深入理解BFC和Margin Collapse ](http://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html)

## 解决方案

* 为父元素设置 padding-top ，代替为子元素设置 margin-top
    > 这种方式具有局限性，一些场景不适用
* 为父元素设置 overflow: hidden （推荐）
* 为父元素设置 border
* 为父元素或者子元素开启绝对定位
    > 可能会打乱布局
* 为父元素或者子元素设置浮动
    > 可能会打乱布局

    