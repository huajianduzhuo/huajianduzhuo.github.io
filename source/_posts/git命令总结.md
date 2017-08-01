---
title: git常用命令总结
date: 2017-07-31 08:36:45
tags: [git命令]
categories: git
---

总结一下常用的 git 命令，以及在使用 git 过程中，可能用到的几个 Linux 命令。
<!--more-->

# git 命令

## 配置信息

`git config --global user.name "Your Name"`  
`git config --global user.email "email@example.com"`

## 创建版本库

### 初始化git项目
`git init`
### 查看状态
`git status`
### 添加到暂存区
`git add <filename>`
### 提交到本地版本库
`git commit -m "message" <filename>`
### 查看工作区和最近版本区别
`git diff`

## 查看日志

### 查看日志
`git log`
### 查看7位版本号日志
`git reflog`

## 版本回退和版本穿梭

### 回退到上一版本
`git reset --hard HEAD^`
### 回退到指定版本
`git reset --hard HEAD[^^^...]`
### 前进到某一版本
`git reset --hard HEAD[```...]`
### 版本穿梭
`git reset --hard [7位版本号]`

## 撤销修改

### 撤销工作区修改
`git checkout -- <filename>`
### 撤销add
`git reset HEAD <filename>`

## 删除文件
`git rm <filename>`
> 会同时删除工作区、暂存区、本地版本库的文件，但是需要 **commit** ，告诉 git 本次修改。


## 管理分支

### 查看分支
`git branch`
> 前面带 *，是当前所在分支

### 创建分支
`git branch <分支名>`
### 切换分支
`git checkout <分支名>`
### 创建分支并切换至该分支
`git checkout -b dev`
### 合并分支
`git merge <分支名>`
### 合并冲突
使用 `git merge <>` 合并发生冲突时，手动解决冲突后，需要使用 `git add` 和 `git commit` ，将解决冲突之后的文件提交到本地版本库。
> 注意：提交冲突解决后的文件时，不要指定文件名。

### 终止合并
`git merge --abort`
> 合并冲突后，不想解决冲突，退回合并前的状态。

### 删除分支
`git branch -d <分支名>`  
分支没有被合并，强制删除：  
`git branch -D <分支名>`

## 远程库GitHub

### 创建 SSH KEY
`ssh-keygen -t rsa -C “example@163.com”`
> 创建 SSH KEY 完成后，需要将 SSH （在用户文件夹下.ssh文件夹中的github_rsa.pub文件中）添加到 GitHub 账号中。

**测试连通性**  
`ssh -T git@github.com`

### 关联远程库
`git remote add origin https://github.com/huajianduzhuo/git.git`

### 推送远程库
`git push -u origin master`
> -u 只在项目第一次推送远程库时需要，之后不用写

平常推送远程库
`git push origin master`

### 从远程库拉取最新版本
`git pull origin master`

### 从远程库克隆
`git clone <https | ssh url>`

### 查看远程库信息
`git remote`
查看远程库详细信息  
`git remote -v`


# LINUX 命令

#### 退出VIM：
`esc + :q!`

#### 保存并退出VIM：
`esc + :wq!`

#### 进入VIM，编辑文件：
`vim <filename>`
> 点击 a，进入可编辑状态

#### 删除一行
`d + d`

#### 查看文件：
`cat <filename>`

#### 显示当前目录路径
`pwd`

#### 新建文件
`touch <filename>`