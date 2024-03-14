---
title: BusyBox 使用笔记
---

参考：

+ cnblogs|iriczhao|busybox使用总结-01 <https://www.cnblogs.com/iriczhao/p/15614746.html>
+ CSDN|iriczhao|Busybox源码分析-01-源码目录结构和程序入口 - <https://blog.csdn.net/iriczhao/article/details/127308538>

busybox官网： <https://www.busybox.net/>

Busybox 是一个开源项目，遵循GPL v2协议。
Busybox 将众多的UNIX命令集合进了一个很小的可执行程序中，可以用来替代 GNU fileutils、shellutils 等工具集。

像 ls、mv 和其他此类命令像是 Linux 的一部分，而事实是这些命令是 GNU Coreutils 软件包的一部分，并且大多数 Linux 发行版都预装了它。
GNU Coreutils几乎是各种 UNIX/Linux 命令的事实上的提供者，几乎是因为总是有替代品，而 BusyBox 就是 GNU Coreutils 的替代品之一。

BusyBox 是 GNU Coreutils 的绝佳替代品，虽然其中各种命令与相应的GNU工具相比，所能提供的选项比较少，但是对于一般的应用场景也足够了，特别是在操作系统的小尺寸很重要的情况下。如：

+ 在嵌入式系统的设计中。
+ 在 Docker 用户中，许多 Docker 镜像使用 BusyBox 为您提供最小镜像。

## 代码分析/目录结构

参考： [link](./busybox-src.md)

## 编译笔记

todo 交叉编译工具链
<https://blog.csdn.net/weixin_48983798/article/details/107290244>
<https://www.cnblogs.com/arnoldlu/p/14243491.html>
<https://blog.csdn.net/m0_46577050/article/details/125588421>

todo ARCH/CROSS_COMPILE作用
<https://blog.csdn.net/weixin_42963900/article/details/129171817>
<https://www.cnblogs.com/jiangzhaowei/p/12288515.html>

todo CC/CXX/CPPFLAGS/CFLAGS/CXXFLAGS/LDFLAGS
<https://blog.csdn.net/lusic01/article/details/78645316>
<https://blog.csdn.net/lailaiquququ11/article/details/126691913>
<https://blog.csdn.net/zmlovelx/article/details/80263030>
<https://blog.csdn.net/langzijing/article/details/78555812>

todo 安全编译增改措施

```bash
make 
make V=1 # KBUILD_VERBOSE | 调试模式，增加make命令输出日志
make C=1 # KBUILD_CHECKSRC | enable sparse checking
make M=dir # KBUILD_EXTMOD / SUBDIRS | 子目录
# KBUILD_SRC is set on invocation of make in OBJ directory
# KBUILD_SRC is not intended to be used by the regular user (for now)
# make O=dir/to/store/output/files/ # KBUILD_OUTPUT

CROSS_COMPILE=aarch64-linux-gnu-
##################################### --> 默认： CONFIG_CROSS_COMPILER_PREFIX in .config
CROSS_COMPILE ?=
# bbox: we may have CONFIG_CROSS_COMPILER_PREFIX in .config,
# and it has not been included yet... thus using an awkward syntax.
ifeq ($(CROSS_COMPILE),)
CROSS_COMPILE := $(shell grep ^CONFIG_CROSS_COMPILER_PREFIX .config 2>/dev/null)
CROSS_COMPILE := $(subst CONFIG_CROSS_COMPILER_PREFIX=,,$(CROSS_COMPILE))
CROSS_COMPILE := $(subst ",,$(CROSS_COMPILE))
#")
endif
#####################################

ARCH
#####################################
ifneq ($(CROSS_COMPILE),)
SUBARCH := $(shell echo $(CROSS_COMPILE) | cut -d- -f1 | sed 's:^.*/::g')
else
SUBARCH := $(shell uname -m)
endif
SUBARCH := $(shell echo $(SUBARCH) | sed -e s/i.86/i386/ -e s/sun4u/sparc64/ \
					 -e s/arm.*/arm/ -e s/sa110/arm/ \
					 -e s/s390x/s390/ -e s/parisc64/parisc/ \
					 -e s/ppc.*/powerpc/ -e s/mips.*/mips/ )

ARCH ?= $(SUBARCH)
#####################################
```

## 交叉编译

在准备编译前，可以先参考INSTALL、README以及examples目录和docs目录下的文件。获取到相关的构建说明、安装说明和一些使用的示例。

### Ubuntu 22.04 jammy

```bash
$ screenfetch
                          ./+o+-       uv01@lpc19
                  yyyyy- -yyyyyy+      OS: Ubuntu 22.04 jammy(on the Windows Subsystem for Linux)
               ://+//////-yyyyyyo      Kernel: x86_64 Linux 5.10.16.3-microsoft-standard-WSL2
           .++ .:/++++++/-.+sss/`      Uptime: 5h 48m
         .:++o:  /++++++++/:--:/-      Packages: 571
        o:+o+:++.`..```.-/oo+++++/     Shell: bash 5.1.16
       .:+o:+o/.          `+sssoo+/    Disk: 1.3T / 4.0T (32%)
  .++/+:+oo+o:`             /sssooo.   CPU: AMD Ryzen 7 7840HS w/ Radeon 780M Graphics @ 16x 3.793GHz
 /+++//+:`oo+o               /::--:.   GPU: NVIDIA GeForce RTX 4050 Laptop GPU
 \+/+o+++`o++o               ++////.   RAM: 322MiB / 15640MiB
  .++.o+++oo+:`             /dddhhh.
       .+.o+oo:.          `oddhhhh+
        \+.++o+o``-````.:ohdhhhhh+
         `:o+++ `ohhhhhhhhyo++os:
           .o:`.syhhhhhhh/.oo++o`
               /osyyyyyyo++ooo+++/
                   ````` +oo+++o\:
                          `oo++.
```

编译环境

```bash
sudo apt-get update
# 编译工具
sudo apt-get install make build-essential
# curses.h：No such file or directory
sudo apt-get install libncurses5-dev libncursesw5-dev
# 交叉编译：
sudo apt-get gcc-arm-linux-gnueabi
sudo apt-get gcc-arm-linux-gnueabihf
sudo apt-get gcc-i686-linux-gnu
```

编译源码

```bash
tar -xf busybox-1.36.1.tar.bz2
cd busybox-1.36.1/
```

编译目标（命令选项）

```bash
make help # 全部target
######################################
make clean # 清除构建结果
make mrproper # 清除构建结果、安装文件、配置文件
make menuconfig
make savedefconfig # todo 执行 make saveconfig 作用是通过执行.config 生成最小的 defconfig 文件；
make olddefconfig # todo 　通过make oldconfig将刚增加的config项的.config做依赖检查重新生成新的.config文件，且新生成的.config和以前的不同是，将旧的.config重命名为.config.old文件
######################################
```

生成编译配置

```bash
make menuconfig # 使用 ARCH 参数

######################################
# 配置
######################################

# 链接
Settings > Build static binary (no shared libs) # 编译使用静态链接

# 安装
Settings >  (./_install) Destination path for 'make install' # 安装目录
```

编译、编译参数

```bash
# -j8 启动8个线程进行编译
make -j${nproc} # 编译

# CROSS_COMPILE # 交叉编译器的路径
# ARCH          # 对应的架构，这里以arm为例
make -j8 ARCH=x86_64 CROSS_COMPILE=x86_64-linux-gnu- # x86_64
make -j8 ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- # arm64
make -j8 ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- # armv8l/arm32
make -j8 ARCH=i686 CROSS_COMPILE=i686-linux-gnu- # i686
```

::: tip
不同 cpu 架构交叉编译后的文件格式如下：

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
ELF 64-bit LSB executable, x86-64, version 1 (GNU/Linux), statically linked, BuildID[sha1]=b09604e98d0991efee238212a2811192087b88c3, for GNU/Linux 3.2.0, stripped
```
:::

安装

```bash
make install # 安装

# 默认安装在 ./_install/
./_install/bin/busybox # 查看全部命令
./_install/bin/busybox echo 123
./_install/bin/busybox sh

file busybox # 查看文件编译架构
```

### Fedora Linux 39 (Workstation Edition)

```bash
$ uname -a
Linux fedora 6.5.6-300.fc39.x86_64 #1 SMP PREEMPT_DYNAMIC Fri Oct  6 19:57:21 UTC 2023 x86_64 GNU/Linux
$ cat /etc/os-release
NAME="Fedora Linux"
VERSION="39 (Workstation Edition)"
ID=fedora
VERSION_ID=39
VERSION_CODENAME=""
PLATFORM_ID="platform:f39"
PRETTY_NAME="Fedora Linux 39 (Workstation Edition)"
ANSI_COLOR="0;38;2;60;110;180"
LOGO=fedora-logo-icon
CPE_NAME="cpe:/o:fedoraproject:fedora:39"
DEFAULT_HOSTNAME="fedora"
HOME_URL="https://fedoraproject.org/"
DOCUMENTATION_URL="https://docs.fedoraproject.org/en-US/fedora/f39/system-administrators-guide/"
SUPPORT_URL="https://ask.fedoraproject.org/"
BUG_REPORT_URL="https://bugzilla.redhat.com/"
REDHAT_BUGZILLA_PRODUCT="Fedora"
REDHAT_BUGZILLA_PRODUCT_VERSION=39
REDHAT_SUPPORT_PRODUCT="Fedora"
REDHAT_SUPPORT_PRODUCT_VERSION=39
SUPPORT_END=2024-05-14
VARIANT="Workstation Edition"
VARIANT_ID=workstation
```

```bash
# yum -y install gcc gcc-c++ glibc glibc-devel pcre pcre-devel openssl openssl-devel systemd-devel zlib-devel libmcrypt-devel glibc-static ncurses-devel
yum -y install make gcc

yum install -y binutils-aarch64-linux-gnu
yum install -y binutils-x86_64-linux-gnu
yum install -y binutils-arm-linux-gnu

gcc-x86_64-linux-gnu
gcc-aarch64-linux-gnu
gcc-arm-linux-gnu
# gcc-i686-linux-gnu
glibc-devel.i686
```

## 配置运行

如果使用Busybox来创建根文件系统，使用起来比较方便，只需要在/dev目录下创建必要的设备节点，在/etc目录下增加一些配置文件即可，当然如果Busybox是动态链接的，那么还需要在/lib目录下包含相关的运行库文件。

```bash
busybox --list # 查看支持的命令

busybox echo hello world 
```

## 作为init进程

​在linux内核启动的最后阶段，会调用run_init_process()函数启动用户空间进程，对于Busybox来说，它同样将提供一个init程序，满足linux内核最后阶段的启动跳转。只要run_init_process()创建进程成功，那么此函数将不会返回了，从而从内核态进入了用户态进程。

busybox的init程序的描述源文件位于源代码下的init/init.c文件中。
核心功能的由init_main函数实现。

## 使用（linux）

```bash
# 下载
$ sudo apt install busybox

# 使用
$ busybox cat sample.txt

# 如果 BusyBox 未实现命令，则会引发“找不到小程序”的错误
$ busybox xyz
xyz: applet not found
```

## 使用（docker）

```bash
$ docker pull busybox
$ docker run -it --rm busybox
```
