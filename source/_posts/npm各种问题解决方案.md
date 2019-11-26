---
title: npm各种问题解决方案
date: 2019-11-27 00:08:30
tags: [npm命令]
categories: node
---

## 安装包失败解决方式

### node-sass

`npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/`
<!--more-->

### electron

`npm config set electron_mirror https://npm.taobao.org/mirrors/electron/`

### phantomjs

`npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/`

## npm 无法识别 `https://`

报错提示： `must be a full url with 'http://'`

解决：`npm config set strict-ssl false`
