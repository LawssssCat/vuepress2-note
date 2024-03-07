---
title: BusyBox 使用笔记
---

参考：

+ cnblogs|iriczhao|busybox使用总结-01 <https://www.cnblogs.com/iriczhao/p/15614746.html>
+ CSDN|iriczhao|Busybox源码分析-01-源码目录结构和程序入口 - <https://blog.csdn.net/iriczhao/article/details/127308538>

busybox官网： <https://www.busybox.net/>

Busybox是一个开源项目，遵循GPL v2协议。
Busybox将众多的UNIX命令集合进了一个很小的可执行程序中，可以用来替代GNU fileutils、shellutils等工具集。
Busybox中各种命令与相应的GNU工具相比，所能提供的选项比较少，但是对于一般的应用场景也足够了，特别是在嵌入式系统的设计中。

## busybox代码目录结构

在较老版本的Busybox中，对于Busybox的多个程序是全部塞进了一个名为utility.c的文件中，后来更改了Busybox的整体源码结构和设计，将这些程序拆分成了各个工具模块。

目录名称 | 功能说明
--- | ---
docs | 相关支持文档
applets    | 实现applets框架的文件。目录中包含了几个main()的文件
applets_sh | 此目录包含了几个作为shell脚本实现的applet示例。在“make install”时不会被自动安装，需要使用时，手动处理
testsuite  | 命令测试套
include    | busybox项目的头文件
configs    | busybox自带的默认配置文件
libbb        | 与busybox实现相关的库文件（可复用函数）
arch       | 包含用于不同体系架构的makefile文件。约束busybox在不同架构体系下的编译构建过程
archival   | 与压缩相关命令的实现源文件。
debianutils   | 针对Debian的套件。
init       | init进程的实现源码目录
console-tools | 与控制台相关的一些命令
klibc-utils  | klibc命令套件
e2fsprogs  | 针对Linux Ext2 FS prog的命令。例如chattr、lsattr
coreutils     | 常用的一些核心命令。例如chgrp、rm、cat等
editors    | 常用的编辑命令。例如diff、vi等
networking | 与网络相关的命令，例如arp
findutils  | 用于查找的命令，例如find、grep等
libpwdgrp    | libpwdgrp相关的命令
loginutils   | 与用户管理相关的命令
mailutils  | 与mail相关的命令套件
miscutils  | 该文件下是一些杂项命令，针对特定应用场景
modutils   | 与模块相关的命令
printutils | Print相关的命令
procps     | 与内存、进程相关的命令
runit      | 与Runit实现相关的命令
shell      | 与shell相关的命令，例如ash、mash等
sysklogd   | 系统日志记录工具相关的命令
util-linux | Linux下常用的命令，主要与文件系统操作相关的命令。

## busybox交叉编译

```bash
tar -xf busybox-1.36.1.tar.bz2
cd busybox-1.36.1/

make clean # 清除构建结果
make mrproper # 清除构建结果、安装文件、配置文件
make menuconfig

# 配置
Settings > Build static binary (no shared libs) # 编译使用静态链接

# -j8 启动8个线程进行编译
make -j8 # 编译

make install # 安装

# 默认安装在 ./_install/
./_install/bin/busybox # 查看全部命令
./_install/bin/busybox echo 123
./_install/bin/busybox sh

file busybox # 查看文件编译架构
```

架构

```bash
$ file busybox

# armv8l
ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), statically linked, stripped
# aarch64
ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), statically linked, for GNU/Linux 3.7.0,BuildID[sha1]=a54574822995b2e2a267e52e731f214f844d931b, stripped
# i686
ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), statically linked, stripped
# x86_64
ELF 64-bit LSB executable, x86-64, EABI5 version 1 (SYSV), statically linked, stripped
```

## 配置运行

如果使用Busybox来创建根文件系统，使用起来比较方便，只需要在/dev目录下创建必要的设备节点，在/etc目录下增加一些配置文件即可，当然如果Busybox是动态链接的，那么还需要在/lib目录下包含相关的运行库文件。

```bash
busybox --list # 查看支持的命令

busybox echo hello world 
```

## busybox的init进程

​在linux内核启动的最后阶段，会调用run_init_process()函数启动用户空间进程，对于Busybox来说，它同样将提供一个init程序，满足linux内核最后阶段的启动跳转。只要run_init_process()创建进程成功，那么此函数将不会返回了，从而从内核态进入了用户态进程。

busybox的init程序的描述源文件位于源代码下的init/init.c文件中。
核心功能的由init_main函数实现。

## 代码分析

Busybox是在linux内核启动后加载运行的用户空间程序，在源码设计上是基于C语言完成设计和开发的。与常规程序一样，Busybox的入口同样是main()，定义在libbb/appletlib文件的末尾处。
