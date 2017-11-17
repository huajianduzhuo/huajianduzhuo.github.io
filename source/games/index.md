---
title: 我做的一些前端小游戏
date: 2017-08-20 10:45:59
comments: false
---

<style>
    h1{
        text-align: center !important;
    }
    #games{
        list-style: none;
        line-height: 1;
    }
    #games a {
        color: #009a61;
    }
    #games a:hover {
        color: #037c4f;
    }
    #games li{
        position: relative;
        background: #efefef;
        border-radius: 5px;
        padding-left: 30px;
    }

    @media (max-width: 768px) {
        #games{
            padding: 0;
        }

        #games li img{
            width: 80%;
        }
    }

    @media (min-width: 768px) {
        #games li img{
            position: absolute;
            top: 10px;
            bottom 10px;
        }
        #games li .img1{
            right: 20px;
            width: 150px;
        }
        #games li .img2{
            width: 250px;
            right: 5px;
            top: 0;
            bottom: 0;
            margin: auto 0;
        }
        #games li .img3{
            right: 10px;
            width: 220px;
        }
    }
</style>

<ul id='games'>
    <li>
        <h2>贪吃蛇</h2>
        <p>试玩游戏：http://mengyujing.com/TanChiShe/</p>
        <p>github地址：https://github.com/huajianduzhuo/TanChiShe</p>
        <img class='img1' src="/uploads/gif/01.gif" />
    </li>
    <li>
        <h2>画图</h2>
        <p>试玩游戏：http://mengyujing.com/draw/</p>
        <p>github地址：https://github.com/huajianduzhuo/draw</p>
        <img class='img2' src="/uploads/gif/02.gif" />
    </li>
    <li>
        <h2>五子棋</h2>
        <p>试玩游戏：http://mengyujing.com/wuZiQi/</p>
        <p>github地址：https://github.com/huajianduzhuo/wuZiQi</p>
        <img class='img3' src="/uploads/gif/03.gif" />
    </li>
</ul>
