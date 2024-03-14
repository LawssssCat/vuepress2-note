---
title: Busybox 代码分析
---

git: <https://git.busybox.net/busybox/>

Busybox是在linux内核启动后加载运行的用户空间程序，在源码设计上是基于C语言完成设计和开发的。与常规程序一样，Busybox的入口同样是main()，定义在libbb/appletlib文件的末尾处。

## 代码目录结构

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
