---
title: CSS3自动旋转魔方
date: 2017-07-03 08:24:38
tags: [CSS3, 3D, 魔方]
categories: CSS3
---

分享一个使用 CSS 3 制作的自动旋转魔方。
GitHub地址：[https://github.com/huajianduzhuo/CSS-3](https://github.com/huajianduzhuo/CSS-3)

<!--more-->

<iframe src="/uploads/magicSquare/magicSquare.html" style="width: 500px; height: 350px; border: 0;overflow: hidden;"></iframe>

## 盒子

盒子使用一个 div ，并为盒子开启 3D 效果。

    <div class="box"></div>

``` bash
.box{
    position: relative;
    width: 210px;
    height: 210px;
    margin: 150px auto;

    transform-style: preserve-3d; // 开启 3D
}
```

## 六个面

魔方的六个面分别使用六个 div，为六个 div 设置在 3d 空间上的偏移：

``` bash
<div class="box">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="back"></div>
    <div class="right"></div>
    <div class="left"></div>
    <div class="front"></div>
</div>
```

``` bash
// 为六个面设置统一的宽高
.box > div{
    position: absolute;
    width: 210px;
    height: 210px
}
// 前面位置不变
.box .front{
    background: red;
    top: 0;
    left: 0;
}
// 左面向左平移一个宽度距离，并沿右侧向内旋转 90度
.box .left{
    top: 0;
    left: -210px;
    background: blue;
    transform-origin: right center;
    transform: rotateY(-90deg);
}
// 右面向右平移一个宽度距离，并沿左侧向内旋转 90度
.box .right{
    top: 0;
    left: 210px;
    background: yellow;
    transform-origin: left center;
    transform: rotateY(90deg);
}
// 后面沿 Z轴向后平移一个宽度距离
.box .back{
    top: 0;
    left: 0;
    background: green;
    transform: translateZ(-210px) rotateY(180deg);
}
// 上面向上平移一个宽度距离，并沿下侧向内旋转 90度
.box .top{
    top: -210px;
    left: 0;
    background: sandybrown;
    transform-origin: center bottom;
    transform: rotateX(90deg);
}
// 底面向下平移一个宽度距离，并沿上侧向内旋转 90度
.box .bottom{
    top: 210px;
    left: 0;
    background: pink;
    transform-origin: center top;
    transform: rotateX(-90deg);
}
```

## 魔方效果

为每个面添加 9 个子 div，设置成魔方的样式。

以一个面为例：

``` bash
<div class="front">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

``` bash
.box > div > div{
    float: left;
    width: 70px;
    height: 70px;
    border: 1px solid;
}
```

## 自动旋转动画

经过上面的步骤，3D 的魔方效果已经实现。下面为盒子添加动画，使魔方可以自动旋转。

> 注意：魔方旋转时应以盒子的中心为中心点，盒子中心点在 z轴上有偏移量。

``` bash
.box{
    animation-name: spin;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 1s;

    transform-style: preserve-3d;
    transform-origin: center center -105px;
}
@keyframes spin {
    from{
        transform: rotateY(0deg) rotateX(0deg);
    }
    to{
        transform: rotateY(360deg) rotateX(720deg);
    }
}
```