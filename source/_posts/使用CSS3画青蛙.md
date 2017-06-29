---
title: 使用CSS3画青蛙
date: 2017-06-23 19:24:13
tags: [CSS3]
categories: CSS3
---

CSS3 提供了很多强大的新特性，我们可以使用 CSS3 做出很多漂亮的图形或动画，下面介绍我使用 CSS3 画青蛙的方法。先上最终效果：
<!--more-->

<iframe style=" width: 210px; height: 260px; padding-top:40px; border: 0; float:left;" src="/uploads/frog/frog.html"></iframe>

# 整体结构

该青蛙完全使用 div + CSS3 构造，下面是青蛙大体的 HTML 结构：

``` bash
<!-- 青蛙整体结构 start -->
    <div class="frog">
        <div class="eye"></div>
        <div class="face"></div>
        <div class="body"></div>
        <div class="front_foot"></div>
        <div class="leg"></div>
    </div>
<!-- 青蛙整体结构 end -->
```

**整体部分CSS样式**

``` bash
.frog{
    position: absolute;
    width: 170px;
    height: 200px;
}
```

# 眼睛

**眼睛部分HTML结构**

``` bash
<div class="eye">
    <div class="left_eye">
        <div class="eye_ball">
            <div class="eye_ball_white"></div>
            <div class="eye_ball_black"></div>
        </div>
    </div>
    <div class="right_eye">
        <div class="eye_ball">
            <div class="eye_ball_white"></div>
            <div class="eye_ball_black"></div>
        </div>
    </div>
</div>
```

**眼睛部分CSS样式**

``` bash
.eye{
    position: relative;
    z-index: 200;
    width: 89px;
    height: 47px;
    margin: 0 auto;
}
.left_eye, .right_eye{
    position: relative;
    width: 40px;
    height: 47px;
    border: 3px solid;
    background: #ffffff;
    float: left;
}
.left_eye{
    border-radius: 27px 27px 28px 28px;
}
.right_eye{
    margin-left: -3px;
    border-radius: 27px 25px 25px 28px;
}
.eye_ball{
    position: absolute;
    bottom: -3px;
    left: 6px;
    width: 24px;
    height: 33px;
    border: 2px solid;
    background: #f9440a;
    border-radius: 18px 20px 25px 20px;
}
.eye_ball_black{
    width: 7px;
    height: 15px;
    background: #2f0305;
    border-radius: 50%;
    margin: 8px auto;
}
.eye_ball_white{
    float: left;
    margin-top: 12px;
    margin-left: -1px;
    width: 10px;
    height: 6px;
    background: #fff;
    border: 1px solid;
    border-radius: 8px 7px 8px 5px;
    transform: skew(0, -15deg);
}
```

# 脸部

**脸部HTML结构**

``` bash
<div class="face">
    <div class="nose_left"></div>
    <div class="nose_right"></div>
    <div class="mouse">
        <div class="mouse_top"></div>
        <div class="mouse_bottom"></div>
    </div>
    <div class="mouse_left_black"></div>
    <div class="mouse_left_pink"></div>
    <div class="mouse_right_black"></div>
    <div class="mouse_right_pink"></div>
</div>
```

**脸部CSS样式**

``` bash
.face{
    position: relative;
    top: -15px;
    z-index: 100;
    margin: 0 auto;
    width: 100px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid;
    background: #09b31a;
}
.nose_left, .nose_right{
    width: 2px;
    height: 3px;
    background: #000;
}
.nose_left{
    position: absolute;
    top: 24px;
    left: 47px;
}
.nose_right{
    position: absolute;
    top: 23px;
    left: 54px;
}
.mouse{
    position: relative;
    width: 58px;
    height: 35px;
    margin: 0 auto;
    margin-top: 28px;
    overflow: hidden;
}
.mouse_top{
    position: absolute;
    bottom: 19px;
    left: -14px;
    z-index: 200;
    height: 80px;
    width: 80px;
    border-bottom: 2px solid;
    border-radius: 50%;
    background: #09b31a;
}
.mouse_bottom{
    position: absolute;
    left: 0px;
    bottom: 0;
    height: 54px;
    width: 54px;
    border: 2px solid;
    border-radius: 50%;
    background: #f70e08;
}
.mouse_left_black{
    position: absolute;
    left: 19px;
    top:30px;
    width: 4px;
    height: 9px;
    background: #000;
    transform: skew(-30deg);
    z-index: 300;
    border-radius: 5px 15px 10px 12px;
}
.mouse_left_pink{
    position: absolute;
    left: 8px;
    top:27px;
    width: 15px;
    height: 11px;
    background: radial-gradient(#fd91b6 40%, white 100%);
    border-radius: 50%;
    transform: rotate(-20deg);
    z-index: 350;
}
.mouse_right_black{
    position: absolute;
    right: 21px;
    top: 27px;
    width: 2px;
    height: 6px;
    background: #000;
    transform: skew(40deg);
    z-index: 300;
    border-radius: 10px 12px 5px 15px;
}
.mouse_right_pink{
    position: absolute;
    right: 7px;
    top: 21px;
    width: 15px;
    height: 10px;
    background: radial-gradient(#fd91b6 40%, white 100%);
    border-radius: 50%;
    transform: rotate(-20deg);
    z-index: 350;
}
```

# 身体

**身体HTML结构**

``` bash
<div class="body">
    <div class="body_left1"></div>
    <div class="body_left2"></div>
    <div class="body_right1"></div>
    <div class="body_right2"></div>
    <div class="body_center_top"></div>
    <div class="body_center"></div>
</div>
```

**身体CSS样式**

``` bash
.body{
    position: relative;
    top: -24px;
    z-index: 80;
    width: 60px;
    height: 55px;
    margin: 0 auto;
    background: #20c826;
    border: 2px solid;
    border-bottom: 0px;
    overflow: hidden;
}
.body .body_center_top{
    width: 25px;
    height: 16px;
    margin: 12px auto;
    margin-bottom: 0;
    border: 2px solid;
    background: #ffffff;
    border-radius: 50%;
}
.body .body_center{
    width: 25px;
    height: 56px;
    margin: -8px auto;
    border: 2px solid;
    border-top: 0;
    background: #ffffff;
}
.body_left1, .body_left2 {
    position: absolute;
    left: -9px;
    width: 19px;
    height: 9px;
    border-radius: 40%;
    background: #00a26d;
    border: 1px solid #0a9b33;
    transform: rotate(-20deg);
}
.body_left1{
    top: 20px;
}
.body_left2{
    top: 36px;
}
.body_right1, .body_right2 {
    position: absolute;
    right: -9px;
    width: 19px;
    height: 8px;
    border-radius: 10px 4px 4px 6px;
    background: #00a26d;
    border: 1px solid #0a9b33;
    transform: rotate(-10deg);
}
.body_right1{
    top: 15px;
}
.body_right2{
    top: 30px;
}
```

# 前脚

**前脚HTML结构**

``` bash
<div class="front_foot">
    <div class="front_foot_padding1"></div>
    <div class="front_foot_padding2"></div>
    <div class="front_foot_left1">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
    <div class="front_foot_left2">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
    <div class="front_foot_left3">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
    <div class="front_foot_right1">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
    <div class="front_foot_right2">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
    <div class="front_foot_right3">
        <div></div>
        <div class="front_foot_cover"></div>
    </div>
</div>
```

**前脚CSS样式**

``` bash
.front_foot{
    position: relative;
    top: -24px;
    z-index: 80;
    width: 64px;
    height: 18px;
    margin: 0 auto;
}
.front_foot > div{
    position: absolute;
    width: 5px;
    height: 15px;
    background: #20c826;
    border-left: 2px solid;
    border-right: 2px solid;
}
.front_foot > div > div:first-child{
    position: absolute;
    background: #20c826;
    border: 2px solid;
    width: 10px;
    height: 5px;
    border-radius: 50%;
    bottom: -4px;
    left: -5px;
}
.front_foot > div .front_foot_cover{
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 16px;
    background: #20c826;
}
.front_foot_left1{
    transform-origin: 2px 0;
    transform: rotate(50deg);
}
.front_foot_left2{
    top: 4px;
    left: 5px;
    transform-origin: 2px 0;
    transform: rotate(10deg);
}
.front_foot_left3{
    top: -1px;
    left: 10px;
    transform-origin: right 0;
    transform: rotate(-50deg);
}
.front_foot_right1{
    top: -1px;
    right: 10px;
    transform-origin: left 0;
    transform: rotate(45deg);
}
.front_foot_right2{
    top: 5px;
    right:5px;
    transform-origin: left 0;
    transform: rotate(-15deg);
}
.front_foot_right3{
    right: 1px;
    top: -1px;
    transform-origin: right 0;
    transform: rotate(-60deg);
}
.front_foot .front_foot_padding1, .front_foot .front_foot_padding2{
    position: absolute;
    top: 0;
    width: 20px;
    height: 5px;
    border: 0;
    background: #20c826;
}
.front_foot .front_foot_padding2{
    right: 0;
}
```

# 后腿

**后腿HTML结构**

``` bash
<div class="leg">
    <div class="big_leg_left">
        <div class="big_leg_left_inner1">
            <div></div>
        </div>
        <div class="big_leg_left_inner2">
            <div></div>
        </div>
    </div>
    <div class="big_leg_right">
        <div class="big_leg_right_inner1">
            <div></div>
        </div>
        <div class="big_leg_right_inner2">
            <div></div>
        </div>
    </div>
    <div class="small_leg_left">
        <div class="back_foot_left1">
            <div></div>
        </div>
        <div class="back_foot_left2">
            <div></div>
        </div>
        <div class="back_foot_left3">
            <div></div>
        </div>
    </div>
    <div class="small_leg_right">
        <div class="back_foot_right1">
            <div></div>
        </div>
        <div class="back_foot_right2">
            <div></div>
        </div>
        <div class="back_foot_right3">
            <div></div>
        </div>
    </div>
</div>
```

**后腿CSS样式**

``` bash
.leg{
    position: relative;
    top: -75px;
    z-index: 60;
    width: 185px;
    height: 85px;
    margin: 0 auto;
}
.big_leg_left, .big_leg_right{
    position: absolute;
    width: 48px;
    height: 48px;
    background: #20c826;
    border: 2px solid;
    border-radius: 50%;
    overflow: hidden;
}
.big_leg_left{
    left: 18px;
    transform: skew(20deg);
}
.big_leg_right{
    right: 31px;
    transform: skew(-20deg);
}
.big_leg_left .big_leg_left_inner1, .big_leg_left .big_leg_left_inner2, .big_leg_right .big_leg_right_inner1, .big_leg_right .big_leg_right_inner2{
    width: 26px;
    height: 13px;
    border-radius: 13px 13px 0 0;
    background: #00a26d;
    border: 1px solid #0a9b33;
}
.big_leg_left .big_leg_left_inner1{
    transform: rotate(10deg);
    margin-left: -3px;
}
.big_leg_left .big_leg_left_inner1 > div{
    width: 26px;
    height: 13px;
    border-radius: 13px 13px 0 0;
    margin-top: 10px;
    margin-left: 2px;
    background: #20c826;
}
.big_leg_left .big_leg_left_inner2{
    transform: rotate(-20deg);
    margin-top: 7px;
    margin-left: -12px;
}
.big_leg_left .big_leg_left_inner2 > div{
    width: 26px;
    height: 13px;
    border-radius: 13px 13px 0 0;
    margin-top: 12px;
    margin-left: 2px;
    background: #20c826;
}
.big_leg_right .big_leg_right_inner1{
    transform: rotate(-50deg);
    position: absolute;
    right: 10px;
    top: -4px;
}
.big_leg_right .big_leg_right_inner1 > div{
    width: 40px;
    height: 20px;
    border-radius: 20px 20px 0 0;
    margin-top: 12px;
    margin-left: -11px;
    background: #20c826;
}
.big_leg_right .big_leg_right_inner2{
    transform: rotate(-20deg);
    position: absolute;
    right: -10px;
    top: 10px;
}
.big_leg_right .big_leg_right_inner2 > div{
    width: 40px;
    height: 20px;
    border-radius: 20px 20px 0 0;
    margin-top: 12px;
    margin-left: -11px;
    background: #20c826;
}
.small_leg_left, .small_leg_right{
    position: absolute;
    top: 48px;
    background: #20c826;
    border-left: 2px solid;
    border-right: 2px solid;
    width: 12px;
    height: 18px;
}
.small_leg_left{
    left: 34px;
    transform: skew(-47deg);
}
.small_leg_right{
    right: 47px;
    transform: skew(47deg);
}
.small_leg_left > div{
    position: absolute;
    bottom: -7px;
    width: 3px;
    height: 8px;
    background: #20c826;
    border-left: 2px solid;
    border-right: 2px solid;
}
.small_leg_left > div > div{
    position: absolute;
    bottom: -6px;
    left: -6px;
    width: 10px;
    height: 5px;
    background: #20c826;
    border: 2px solid;
    border-top: 0;
    border-radius: 50%;
}
.small_leg_left .back_foot_left1{
    left: -3px;
}
.small_leg_left .back_foot_left2{
    left: 2px;
}
.small_leg_left .back_foot_left3{
    left: 7px;
}
.small_leg_right > div{
    position: absolute;
    bottom: -7px;
    width: 3px;
    height: 8px;
    background: #20c826;
    border-left: 2px solid;
    border-right: 2px solid;
}
.small_leg_right > div > div{
    position: absolute;
    bottom: -5px;
    right: -7px;
    width: 10px;
    height: 5px;
    background: #20c826;
    border: 2px solid;
    border-top: 0;
    border-radius: 50%;
}
.small_leg_right .back_foot_right1{
    right: -2px;
}
.small_leg_right .back_foot_right2{
    right: 2px;
}
.small_leg_right .back_foot_right3{
    right: 7px;
}
```