---
title: LESS 介绍
date: 2017-08-08 20:49:55
tags: [LESS]
categories: CSS预处理器
---

# less

　　less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
<!--more-->
　　LESS 做为 CSS 的一种形式的扩展，它并没有阉割 CSS 的功能，而是在现有的 CSS 语法上，添加了很多额外的功能。

　　less的中文官网：http://lesscss.cn/
　　bootstrap中关于less的介绍：http://www.bootcss.com/p/lesscss/#docs
 
**Less编译工具**
　　koala 官网： www.koala-app.com 
	
# less中的注释

* 以 // 开头的注释，不会被编译到css文件中
* 以 /**/ 包裹的注释，会被编译到css文件中  
	
# less中的变量

使用 @ 来申明一个变量：`@变量名：变量值;`

1. 作为普通属性值来使用：直接使用
```
@pink: pink;
.box{
    background: @pink;
}
```
2. 作为选择器和属性名：@{ 变量名 } 的形式
```
@wrap: #wrap;
@w: width;

@{wrap}{
    @{w}: 400px;
    height: 300px;
}
```
3. 作为 URL：@{url}
```
@imgUrl: "../img/zdy.jpg";

@{wrap}{
    background: url("@{imgUrl}") no-repeat;
}
```

> 请注意 LESS 中的变量为完全的 ‘常量’ ，所以只能定义一次.

# less中的嵌套规则

LESS 可以用嵌套的方式编写层叠样式.

## 基本嵌套规则
如下 CSS 代码：
```
#list {
    width: 200px;
    background: pink;
}

#list span {
    float: right;
}
```
使用 LESS 可以写为：
```
#list{
    width: 200px;
    background: pink;

    span{
        float: right;
    }
}
```
## & 的使用

如果你想写串联选择器，而不是写后代选择器，就可以用到 & 了。这点对伪类尤其有用，如 :hover 和 :focus.

如下 CSS 代码：
```
#list a {
    float: left;
}
#list a:hover {
    color: red;
}
```
使用 LESS 可以写为：
```
#list{
    a{
        float: left; 
        &:hover{
            color: red;
        }
    }
}
```

# less中的混合

　　在 LESS 中我们可以定义一些通用的属性集为一个class，然后在另一个 class 中去调用这些属性。
　　混合就是将一系列属性从一个规则集引入到另一个规则集的方式。
> 任何 CSS _class_, _id_ 或者 _元素_ 属性集都可以以同样的方式引入.

## 普通混合  
定义一个通用属性集，实现子元素垂直水平居中，在需要居中的子元素上调用该属性集：    
```
.middle{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
#wrap{
    position: relative;
    #inner1{
       .middle;
    }
}
```
## 不带输出的混合
使用普通混合方式，在 LESS 中定义的通用属性集会被编译到 CSS 文件中，如果想隐藏通用属性集，不让它暴露到 CSS 中，可以定义不带参数的属性集合。
```
.middle() {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
#wrap{
    position: relative;
    #inner1{
       .middle;
    }
}
```
## 带参数的混合
在 LESS 中，还可以像函数一样定义一个带参数的属性集合。
```
.border-radius (@radius) {
    border-radius: @radius;
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
}
#header {
    .border-radius(4px);
}
```
## 带参数并且有默认值的混合
参数可以设置默认值，调用时如果不传参数，则使用默认值
```
.border-radius (@radius: 5px) {
    border-radius: @radius;
    -moz-border-radius: @radius;
    -webkit-border-radius: @radius;
}
#header {
    .border-radius;  
}
```
## 带多个参数的混合
参数可以传多个，传入的实参与形参从左往右进行匹配。
```
.middle (@w:100px, @h:100px, @c:pink) {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: @w;
    height:@h;
    background: @c;
}
#wrap{
    position: relative;
    #inner1{
       .middle(50px, 50px);
    }
}
```
## 命名参数
在上面的示例代码中，传入的参数会从左往右与形参进行匹配，如果希望 @w 使用默认值，只传入 @h、@c，则实参与形参不能按照默认方式匹配，这时可以使用命名参数传参。
```
.middle ( @w: 100px, @h: 100px, @c: pink) {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: @w;
    height:@h;
    background: @c;
}
#wrap{
    position: relative;
    #inner2{
        .middle( @h: 200px; @c: deeppink);
    }
}
```
## 匹配模式
混合的参数不一定是变量，也可以是固定值。

变量可以匹配任意的传入值，而固定值就仅仅匹配与其相等的传入值。

只有被匹配的混合才会被使用。

如下代码：
```
.triangle( @_, @w:10px){
    width: 100px;
    height: 100px;
}
.triangle(top, @w:10px){
    border-width: @w;
    position: absolute;
    top: 50px;
}
.triangle(bottom, @w:10px){
    border-width: @w;
    position: absolute;
    bottom: 50px;
}
```
如果这样运行：
```
#box1{
    .triangle(top);
}
```
则会得到：
```
#box1 {
    width: 100px;
    height: 100px;
    border-width: 10px;
    position: absolute;
    top: 50px;
}
```
具体实现如下：
1. 第一个混合定义被成功匹配，因为它接受任意值
2. 第二个混合定义被成功匹配，因为它只接受 top 作为首参
3. 第三个混合定义未被匹配，因为它只接受 bottom 作为首参

**我们也可以匹配多个参数**
```
.mixin (@a) {
}
.mixin (@a, @b) {
}
```
当调用 .mixin 时，如果只传入一个参数，则会匹配到第一个 .mixin 混合，如果传入两个参数，则匹配第二个。

## @arguments变量
@arguments包含了所有传递进来的参数。如果你不想单独处理每一个参数的话就可以像这样写:
```
.border(@w:20px, @c:black, @style:solid){
    width: 100px;
    height: 100px;
    background: pink;
    border: @arguments;
}
#wrap{
    .border(10px, deeppink, solid);
}
```
将输出：
```
#wrap {
    width: 100px;
    height: 100px;
    background: pink;
    border: 10px #ff1493 solid;
}
```
	
# less运算
在 less 中可以进行加减乘除的运算。
任何 _数字_、_颜色_ 或者 _变量_ 都可以参与运算。

如下 LESS 代码：
```
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;
.box{
    color: #888 / 4;
    background-color: @base - @other + #111;
    height: 100% / 2 + @filler;
}
```
运行后得到：
```
.box {
    color: #222222;
    background-color: #070707;
    height: 60%;
}
```

LESS 的运算已经超出了我们的期望，它能够分辨出颜色和单位。如果像下面这样单位运算的话:  

    @var: 1px + 5;
LESS 会输出 `6px`.

括号也同样允许使用:  

    @width: (@var + 5) * 2;

可以在复合属性中进行运算:  

    border: (@width * 2) solid black;
		    
# 作用域

　　LESS 中的作用域跟其他编程语言非常类似，首先会从本地查找变量或者混合模块，如果没找到的话会去父级作用域中查找，直到找到为止。
　　内层声明块作用域中的变量，在父级作用域中无法获取。

## 变量延迟加载

　　同一个作用域中，变量的使用会在变量被全部赋值后执行。
　　如下代码中，.inner 内定义了两次 @test 变量，less 编译时，会在 .inner 作用域中先将变量定义的代码全部执行，然后才使用该变量，所以在 .inner 使用 @test 变量，得到的结果为 3。 

```
.wrap{
    @test: 1;
    .inner{
        @test: 2;
        width: @test; // 3
        @test: 3;
    }
    width: @test; // 1
}
```

# 命名空间
有时候，为了更好组织 CSS 或者单纯是为了更好的封装，将一些变量或者混合模块打包起来, 可以像下面这样在 #bundle 中定义一些属性集之后可以重复使用:
```
#bundle {
    .button() {
        display: block;
        border: 1px solid black;
        background-color: grey;
        &:hover { background-color: white;}
    }
    .tab { ... }
    .citation { ... }
}
```
只需要这样调用：
```
#header a {
    color: orange;
    #bundle > .button;
}
```

# Importing
可以在main文件中通过下面的形式引入 .less 文件, .less 后缀可带可不带:
```
@import "lib.less";
@import "lib";
```
如果想导入一个CSS文件而且不想LESS对它进行处理，只需要使用.css后缀就可以:
```
@import "lib.css";
```
这样LESS就会跳过它不去处理它.

# 字符串插值
变量可以嵌入到字符串中。
上面介绍过的变量作为 URL 使用的方式，就是将变量插入到字符串中。
```
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```

# 避免编译
有时候我们需要输出一些不正确的 CSS 语法或者使用一些 LESS 不认识的专有语法。
要输出这样的值我们可以将避免编译的值用 `""` 包含起来，并在字符串前加上一个 `~`, 例如：
```
.class {
    filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
```
输出结果为：
```
.class {
    filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
}
```
