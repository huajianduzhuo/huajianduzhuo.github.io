---
title: node设置命令行参数
date: 2020-03-23 22:48:04
tags: [node, 命令行参数, yargs, cross-env]
categories: node
---

项目中，经常需要根据不同的命令，执行不同的操作。如根据 NODE_ENV 控制开发或生产环境，或者根据不同的参数调用不同环境的API。这就需要项目能够获取到命令行的参数。

下面简单讨论几种在命令行传入参数，并在项目中获取参数值的方法。

<!--more-->

# cross-env

`process.env` 可以获取到用户环境的对象。可以在执行命令时设置参数到环境变量，然后在项目中通过 `process.env` 去获取参数值。

不同系统的命令行中，设置环境变量的命令不同。如Windows系统：`set key=value`，而Mac系统：`key=value`。

为了项目中可以统一使用同一命令设置环境变量，可以使用`cross-env`。

## 安装

`npm i -D cross-env`

## 使用

在`package.json`中，配置

```javascript
"scripts": {
    "start": "cross-env by=baiyuWHITE node index.js"
}
```

在`index.js`中，输出

```javascript
console.log(process.env.by) // baiyuWHITE
```

# process.argv

`process.argv` 返回一个数组，包含启动node进程时传入的命令行参数。

默认包含两个值，第一个为node命令的绝对路径，第二个为执行的文件的路径。后面的值则为传入的命令行参数。

执行 `node index.js by=baiyu age=29` 命令，在 index.js 中输入 `process.argv`：

```javascript
console.log(process.argv)
```

得到以下数组：

```javascript
[
  '/Users/略/v12.5.0/bin/node',
  '/Users/略/projects/test/index.js',
  'by=baiyu',
  'age=29'
]
```

## node命令与npm命令的区别

传递命令行参数时，执行JavaScript文件使用 node 命令与使用 npm 命令，有一些区别。

**使用 node 命令时**，命令后面的参数，会以空格分隔原样添加到 argv 数组中。

如执行 `node index.js by=baiyu --age=29 actor`，会得到

```javascript
[
  '/Users/略bin/node',
  '/Users/略/index.js',
  'by=baiyu',
  '--age=29',
  'actor'
]
```

**使用 npm 命令时**，开始设置参数前，应该先添加 ` -- `，否则参数名中以 `--` 开头的都会被忽略。

执行 `npm start by=baiyu --age=29 actor` 命令，得到

```javascript
[
  '/Users/略bin/node',
  '/Users/略/index.js',
  'by=baiyu',
  'actor'
]
```

如上，`--` 开头的参数 age 被忽略

因此，使用 npm 命令时，应该执行如下格式的命令：

`npm start -- --by=baiyu age=29 actor`

得到结果

```javascript
[
  '/Users/略bin/node',
  '/Users/略/index.js',
  '--by=baiyu',
  'age=29',
  'actor'
]
```

> 使用 node 命令时，不要在开始传参前添加 ` -- `，否则 `--` 也会被作为参数添加进 `argv` 数组。

# yargs

如上使用 `process.argv` 获取命令行参数时，得到的数组中，参数都是 `key=value` 格式的字符串，使用参数的话需要解析，非常麻烦。

这时，就可以使用 [yargs](https://www.npmjs.com/package/yargs) 插件。

## 安装

`npm i -D yargs`

## 使用

index.js
```javascript
let argv = require('yargs').argv
console.log(argv)
```

**node命令**

执行 `node index.js --by=baiyu --age=29` ，得到一个包含命令行参数的对象

```javascript
{ _: [], by: 'baiyu', age: 29, '$0': 'index.js' }
```

**npm命令**

与使用 `process.argv` 时同理，执行 npm 命令时，开始参数前，需要添加 ` -- ` ，否则以 `--` 开头的参数会被忽略。

执行 `npm start -- --by=baiyu --age=29 actor` ，得到对象

```javascript
{ _: [ 'actor' ], by: 'baiyu', age: 29, '$0': 'index.js' }
```

如上，通过得到的对象，就可以很方便的获取参数的值。

> 使用 yargs 需要注意：`key=value`  格式的参数，key 前面必须加上 `--`，否则将直接作为字符串添加到属性 `_` 的数组中。

如执行以下命令：

`npm start -- by=baiyu --age=29 actor`

得到的结果为

```javascript
{ _: [ 'by=baiyu', 'actor' ], age: 29, '$0': 'index.js' }
```
