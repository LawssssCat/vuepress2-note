---
title: Linux内核
---

参考：

+ B站|源码被猫吃了|内核下载 - <https://www.bilibili.com/video/BV1pG4y1k7cR/>
+ B站|源码被猫吃了|内核编译 - <https://www.bilibili.com/video/BV18U4y167r1/>
+ B站|源码被猫吃了|busybox编译 - <https://www.bilibili.com/video/BV1yt4y1j765/>

## 内核

内核官网： <https://www.kernel.org>

内核源码下载方式：

+ 官网下载 <https://www.kernel.org> `tar -xf`
+ Linux Kernel source tree
  + Linus Torvalds <https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/> `tar -xzf`
+ git clone <git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git>

编译方式：

+ `make menuconfig`
+ `make xconfig`
+ `make gconfig` （需要 GTK package）

## busybox

[link](./busybox.md)
