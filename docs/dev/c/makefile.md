---
title: Makefile 使用笔记
tags:
  - make
---

## 交叉编译

“交叉编译” 指在一个平台上生成另一个平台上的可执行文件。

使用 make 解释 Makefile 中的指令

编译工具

+ gcc
+ ld
+ objcopy
+ objdump

交叉编译工具链

+ `arm-linux-gcc`
+ `arm-none-linux-gnueabi-gcc-ld`

::: tip
**Linux 和 裸机（baremetal） 区别**： 

+ Linux —— 在已安装操作系统的机器上跑。一般：个人pc、公司服务器
+ baremetal —— 直接由硬件调起。一般：嵌入式
:::
