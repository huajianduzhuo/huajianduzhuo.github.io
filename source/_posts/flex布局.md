---
title: flex布局
date: 2017-08-06 23:03:40
tags: [flex]
categories: CSS3
---

# flex 布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
<!--more-->

CSS3 弹性盒子（Flexible Box 或 Flexbox），是一种用于在页面上布置元素的布局模式，使得当页面布局必须适应不同的屏幕尺寸和不同的显示设备时，元素可预测的运行行/列。
对于许多应用程序，弹性盒子模型提供了对块模型的改进，因为它不使用浮动，flex容器的边缘也不会与其内容的边缘折叠。

弹性盒模型，分老版与新版
* 老版本的通常称之为 box
* 新版本的通常称之为 flex

任何一个容器都可以指定为 Flex 布局。
```
.box{
  display: flex;
}
```

行内元素也可以使用 Flex 布局。
```
.box{
  display: inline-flex;
}
```

> 注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。

## flex 布局基本概念

flex 布局重要的两组概念

### 容器与项目

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。


### 主轴与侧轴

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

主轴由容器的布局方向决定
    新版：flex-direction
    老版：-webkit-box-orient

# 老版

容器设置为 
display: webkit-box

## 容器

### 容器的布局方向

-webkit-box-orient
* horizontal ：主轴为 X 轴
* vertical ：主轴为 Y 轴

### 容器的排列方向

-webkit-box-direction
* normal ：项目正序排列
* reverse ：项目倒序排列

### 富裕空间的管理

不会给项目区分配空间，只是确定富裕空间的位置。
理解：确定容器的布局方向和排列方向后，项目布局的起点。如主轴为 X 轴，排列方向为 normal，主轴富裕空间为 start，则项目在左侧，富裕空间在右侧；主轴富裕空间为 center，则项目在中间，富裕空间在两侧。

**主轴富裕空间**

-webkit-box-pack
* start
* end
* center
* justify

**侧轴富裕空间**

-webkit-box-align
* start
* end
* center

## 项目

### 弹性空间的管理

将富裕空间按比例分配到各个项目上

-webkit-box-flex: 1;

# 新版

容器设置为
display: flex;

## 容器

### flex-direction

新版中，容器的布局方向和排列方向使用同一个属性。

flex-direction
* row：主轴为水平方向，起点在左端。
* column：主轴为水平方向，起点在右端。
* row-reverse：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

### justify-content

定义了项目在主轴上的对齐方式。
可以看做主轴上富裕空间的管理。

* flex-start：左对齐
* flex-end：右对齐
* center：居中
* space-between：两端对齐，项目之间的间隔都相等。
* space-around(box 没有的)：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items

定义项目在交叉轴（侧轴）上如何对齐。

* flex-start：交叉轴的起点对齐。
* flex-end：交叉轴的终点对齐。
* center：交叉轴的中点对齐。
* baseline(box 没有的)：项目的第一行文字的基线对齐。
* stretch(默认值)：等高布局，如果项目未设置高度或设为auto，将占满整个容器的高度。

### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。

控制容器为单行/列还是多行/列。并且定义了侧轴的方向，新行/列将沿侧轴方向堆砌。

继承性：不可继承

* nowrap：默认值，不换行
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。

### flex-flow

“flex-direction”和“flex-wrap”的简写，控制主轴和侧轴的位置以及方向

继承性：不可继承

默认值：row nowrap

### align-content

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

* flex-start：与交叉轴的起点对齐。
    所有行/列从侧轴起点开始填充。第一行/列的侧轴起点边和容器的侧轴起点边对齐。接下来的每一行/列紧跟前一行/列。
* flex-end：与交叉轴的终点对齐。
    所有弹性元素从侧轴末尾开始填充。最后一个弹性元素的侧轴终点和容器的侧轴终点对齐。同时所有后续元素与前一个对齐。
* center：与交叉轴的中点对齐。
    所有行/列朝向容器的中心填充。每行/列互相紧挨，相对于容器居中对齐。容器的侧轴起点边和第一行/列的距离相等于容器的侧轴终点边和最后一行/列的距离。
* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    所有行/列在容器中平均分布。相邻两行/列间距相等。容器的侧轴起点边和终点边分别与第一行/列和最后一行/列的边对齐。
* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    所有行/列在容器中平均分布，相邻两行/列间距相等。容器的侧轴起点边和终点边分别与第一行/列和最后一行/列的距离是相邻两行/列间距的一半。
* stretch（默认值）：轴线占满整个交叉轴。
    拉伸所有行/列来填满剩余空间。剩余空间平均的分配给每一行/列。

## 项目

### order

定义项目的排列顺序。数值越小，排列越靠前，默认为0。

`order: <integer>;`

### flex-grow

定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

`flex-grow: <number>; /* default 0 */`

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### flex-shrink

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

`flex-shrink: <number>; /* default 1 */`

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小（width的值）。

`flex-basis: <length> | auto; /* default auto */`

可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

### flex

flex-grow, flex-shrink 和 flex-basis的简写，默认值为 0 1 auto。后两个属性可选。

`flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self

align-self属性允许单个项目侧轴有与其他项目不一样的对齐方式，可覆盖align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
* auto
    设置为父元素的 align-items 值，如果该元素没有父元素的话，就设置为 stretch。
* flex-start
    flex 元素会对齐到 cross-axis 的首端。
* flex-end
    flex 元素会对齐到 cross-axis 的尾端。
* center
    flex 元素会对齐到 cross-axis 的中间，如果该元素的 cross-size 的尺寸大于 flex 容器，将在两个方向均等溢出。
* baseline
    所有的 flex 元素会沿着基线对齐。
* stretch
    flex 元素将会基于容器的宽和高，按照自身 margin box 的 cross-size 拉伸。

# 参考
  
[阮一峰 flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
[阮一峰 flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
[青蛙游戏](http://flexboxfroggy.com/)