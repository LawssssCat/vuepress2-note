---
title: C/C++构建笔记
---

## 编译器用法

参考：

+ 详解三大编译器：gcc、llvm 和 clang | <https://zhuanlan.zhihu.com/p/357803433>

todo

+ gcc

  gcc: [link](./gcc.md)

  g++: [link](./gpp.md)

+ LLVM

  todo

+ LLVM2.0 - Clang

  todo

## 编译工程工具

makefile: [link](./makefile.md)

cmake: [link](./cmake.md)

## 交叉编译脚本

```bash
#!/bin/bash

install_arm32() {
  sudo apt install gcc make gcc-arm-linux-gnueabi binutils-arm-linux-gnueabi
}

install_arm64() {
  sudo apt install gcc make gcc-aarch64-linux-gun binutils-aarch64-linux-gnu
}
gen_hello() {
  cat > helloworld.c << EOF
#include<stdio.h>
int main()
{
  printf("Hello World!\n");
  return 0;
}
EOF
}

compile_64() {
  gcc helloworld.c -o helloworld-x86_64
}

compile_arm32() {
  arm-linux-gnueabi-gcc helloworld.c -o helloworld-arm -static
}

compile_arm64() {
  aarchi64-linux-gnu-gcc helloworld.c -o helloworld-aarch64 -static
}

# Main.
# install_arm32
# install_arm64
gen_hello
compile_64 || exit 1
compile_arm32
compile_arm64
```

## 动态链接

参考：

+ 动态符号链接的细节 - <https://www.w3cschool.cn/cbook/ojay2ozt.html> 【非常详细】

Linux支持动态连接库，不仅节省了磁盘、内存空间，而且可以提高程序运行效率。不过引入动态连接库也可能会带来很多问题，例如动态连接库的调试、升级更新和潜在的安全威胁。

为了让动态链接器能够进行符号的重定位，必须把动态链接库的相关信息写入到可执行文件当中：

```bash
# 通过 readelf -d 可以打印出该文件直接依赖的库
$ readelf -d test | grep NEEDED
 0x00000001 (NEEDED)                     Shared library: [libc.so.6]
# 通过 ldd 命令则可以打印出所有依赖或者间接依赖的库
$ ldd test
      linux-gate.so.1 =>  (0xffffe000) # 在文件系统中并没有对应的库文件，它是一个虚拟的动态链接库，对应进程内存映像的内核部分。参考： http://www.linux010.cn/program/Linux-gateso1-DeHanYi-pcee6103.htm
      libc.so.6 => /lib/libc.so.6 (0xb7da2000)
      /lib/ld-linux.so.2 (0xb7efc000) # 动态链接器 | 绝对路径 | readelf -x .interp test | interpeter
      # 程序的加载过程 - 动态链接器
      # 当 Shell 解释器或者其他父进程通过exec启动我们的程序时，系统会先为ld-linux创建内存映像，然后把控制权交给ld-linux，
      # 之后ld-linux负责为可执行程序提供运行环境，负责解释程序的运行，因此ld-linux也叫做dynamic loader（或intepreter）
      # 参考： http://www.ibm.com/developerworks/cn/linux/l-elf/part1/index.html
```

程序有两种方式使用库

+ 编译时通过 `-l`,`-L` 参数隐式使用： `gcc -o test test.c -lmyprintf -L./ -I./`
+ 运行时通过 `LD_LIBRARY_PATH` 环境变量显示使用： `LD_LIBRARY_PATH=$PWD`

::: tip
**指定动态库位置**： 

通过 `LD_LIBRARY_PATH` 参数，它类似 Shell 解释器中用于查找可执行文件的 `PATH` 环境变量，也是通过冒号分开指定了各个存放库函数的路径。

该变量实际上也可以通过 `/etc/ld.so.conf` 文件来指定，一行对应一个路径名。 （一般需要管理员权限） <br>
为了提高查找和加载动态链接库的效率，系统启动后会通过 `ldconfig` 工具创建一个库的缓存 `/etc/ld.so.cache`。
如果用户通过 `/etc/ld.so.conf` 加入了新的库搜索路径或者是把新库加到某个原有的库目录下，最好是执行一下 `ldconfig` 以便刷新缓存。

更多参考： `man ld-linux`, `/lib/ld-linux.so.2`
:::

### 动态链接器（dynamic linker/loader）

Linux 下 elf 文件的动态链接器是 ld-linux.so，即 `/lib/ld-linux.so.2`。
通过 `man ld-linux` 可以获取与动态链接器相关的资料，包括各种相关的环境变量和文件都有详细的说明。

如：

+ `LD_LIBRARY_PATH` 
+ `LD_BIND_NOW`
+ `LD_PRELOAD` 指定预装载一些库，以便替换其他库中的函数，从而做一些安全方面的处理
+ `LD_DEBUG` 用来进行动态链接的相关调试

+ `ld.so.conf`
+ `ld.so.cache`
+ `/etc/ld.so.preload` 指定需要预装载的库

### glibc

glibc官网地址: <https://www.gnu.org/software/libc/> \
glibc源代码包: <https://ftp.gnu.org/gnu/glibc/>

glibc是标准C库的GNU实现。
我们采用C/C++所写的程序，运行时基本都依赖与它。
如果我们想看当前机器glibc的源代码，首先需要知道当前机器glibc的版本号，然后到glibc的官网下载对应版本的源代码。

#### 查看版本号

```bash
# 方法一：
# 使用命令ldd，查看可执行程序依赖libc的路径
$ ldd python
        linux-vdso.so.1 (0x00007fff40beb000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f9b44d70000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f9b44b47000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f9b4552e000)
$ /lib/x86_64-linux-gnu/libc.so.6
GNU C Library (Ubuntu GLIBC 2.35-0ubuntu3.6) stable release version 2.35. # 💡
Copyright (C) 2022 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
Compiled by GNU CC version 11.4.0.
libc ABIs: UNIQUE IFUNC ABSOLUTE
For bug reporting instructions, please see:
<https://bugs.launchpad.net/ubuntu/+source/glibc/+bugs>.

# 方法二：
# ldd是glibc提供的命令，由此可知glibc的版本号
$ ldd --version
ldd (Ubuntu GLIBC 2.35-0ubuntu3.4) 2.35 # 💡
Copyright (C) 2022 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
Written by Roland McGrath and Ulrich Drepper.

# 方法三：
$ getconf GNU_LIBC_VERSION
glibc 2.35

# 方法四：
$ strings /lib/x86_64-linux-gnu/libc.so.6 | grep GLIBC
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_2.18
GLIBC_2.22
GLIBC_2.23
GLIBC_2.24
GLIBC_2.25
GLIBC_2.26
GLIBC_2.27
GLIBC_2.28
GLIBC_2.29
GLIBC_2.30
GLIBC_2.31
GLIBC_2.32
GLIBC_2.33
GLIBC_2.34
GLIBC_2.35 # 💡
GLIBC_PRIVATE
GNU C Library (Ubuntu GLIBC 2.35-0ubuntu3.6) stable release version 2.35.

# 方法五： 调用C函数
#include <stdio.h>
#include <gnu/libc-version.h>
int main(void) 
{ 
    printf("glibc version:%s\n", gnu_get_libc_version());
 
    return 0; 
}
```

#### Musl libc

参考：

+ Musl libc：为什么我们会需要另一个 libc？ | https://linuxstory.org/musl-libc-yet-another-libc/

todo 整理理解

## 静态编译

`-static`

::: tip
静态编译的二进制通过 `ldd` 可以看到 "not a dynamic executable" 的字样。
而 ~~`-nostdlib`~~ 通过 `ldd` 看到的是 "statically linked"，这表示 “它恰好没有链接到任何库，但在其他方面与普通 PIE 相同，指定了 ELF 解释器。” —— me: 这运行情况应该跟静态编译出来的差不多？？？

todo What's the difference between "statically linked" and "not a dynamic executable" from Linux ldd? | https://stackoverflow.com/questions/61553723/whats-the-difference-between-statically-linked-and-not-a-dynamic-executable
:::

### 问题： 安全编译识别失败

todo

`nm` 可以查看 elf 文件的符号信息

```bash
$ gcc -c test.c
$ nm test.o
00000000 B global
00000000 T main
          U printf
```

## 程序执行流程

todo http://www.ibm.com/developerworks/cn/linux/l-elf/part1/index.html

```bash
# 程序入口
$ readelf -h test | grep Entry
  Entry point address:               0x80482b0

# 程序有 printf 符号的地址没有确定 
# 💡 已知： printf 函数在动态链接库 libc.so 中定义，需要进行动态链接； 这里假设采用 lazy mode 方式，即执行到 printf 所在位置时才去解析该符号的地址。

# 反编译发现： 地址指向了 plt （即过程链接表）
$ objdump -d -s -j .text test | grep printf
 804837c:       e8 1f ff ff ff          call   80482a0 <printf@plt>
$ objdump -D test | grep "80482a0" | grep -v call
080482a0 <printf@plt>:
 80482a0:       ff 25 8c 95 04 08       jmp    *0x804958c
# 过程链接表（plt）
$ readelf -d test

Dynamic section at offset 0x4ac contains 20 entries:
  Tag        Type                         Name/Value
 0x00000001 (NEEDED)                     Shared library: [libc.so.6]
 0x0000000c (INIT)                       0x8048258
 0x0000000d (FINI)                       0x8048454
 0x00000004 (HASH)                       0x8048148
 0x00000005 (STRTAB)                     0x80481c0
 0x00000006 (SYMTAB)                     0x8048170
 0x0000000a (STRSZ)                      76 (bytes)
 0x0000000b (SYMENT)                     16 (bytes)
 0x00000015 (DEBUG)                      0x0
 0x00000003 (PLTGOT)                     0x8049578 # 这就是GOT表（全局偏移表）。该地址与0x804958c相近，说明在读GOT表！ 
 0x00000002 (PLTRELSZ)                   24 (bytes)
 0x00000014 (PLTREL)                     REL
 0x00000017 (JMPREL)                     0x8048240
 0x00000011 (REL)                        0x8048238
 0x00000012 (RELSZ)                      8 (bytes)
 0x00000013 (RELENT)                     8 (bytes)
 0x6ffffffe (VERNEED)                    0x8048218
 0x6fffffff (VERNEEDNUM)                 1
 0x6ffffff0 (VERSYM)                     0x804820c
 0x00000000 (NULL)                       0x0

# 全局偏移表（got）
$ readelf -x .got.plt test

Hex dump of section '.got.plt':
  0x08049578 ac940408 00000000 00000000 86820408 ................
  0x08049588 96820408 a6820408                   ........

todo ...
```

## 二进制文件结构

先准备一个二进制可执行文件：

::: details
代码

calc.c

@[code](@code/c/src/demo-gcc-01/calc.c)

add.c

@[code](@code/c/src/demo-gcc-01/add.c)

tfunc.c

@[code](@code/c/src/demo-gcc-01/tfunc.c)

编译/运行（静态库）

```bash

# 【静态链接】
# .o 编译过程各自独立。虽然其中calc.c使用了另外两个的符号，但是此时并不知道那些符号是在哪个文件中定义的。
# -st 当链接器把所有的.o文件链接成可执行文件的过程中，可执行文件才能确定那些符号是在哪里。
gcc -c add.c tfunc.c calc.c
# gcc add.o tfunc.o calc.o -o calc-st
ar -r liboperation.a add.o tfunc.o
gcc calc.c liboperation.a -o calc-st

# 【动态链接】
gcc -c -fpic tfunc.c add.c
gcc -shared tfunc.o add.o -o liboperation.so
gcc calc.c -o calc-dy -loperation -L$(pwd) -Wl,-rpath=$(pwd) 

# 运行
./calc 1 1
```
:::

### ELF 文件

ELF（Executable and Linkable Format，可执行和可链接格式）

::: details
参考：

+ Linux系统中编译、链接的基石-ELF文件：扒开它的层层外衣，从字节码的粒度来探索 - <https://mp.weixin.qq.com/s/ZOvHG_ofiU6iWtoSR9bFow>
:::

通过 `file calc` 可看到 `calc` 程序的文件类型为 ELF

```bash
$ file calc
calc: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=0e4f3ed1b2b35f1c63e26a0b7e6b59bfb2ebe1a2, for GNU/Linux 3.2.0, not stripped
```

ELF文件格式如下：

名称 | 说明
--- | ---
ELF header （ELF 头部）
Program header table （程序表头）
Sections （节）
Section header table （节表头）

通过 `readelf -l calc` 可看到 `calc` 程序的二进制区域划分

```bash
-l # 列出二进制全部区域划分信息
-h # 头文件信息 | 这个内容与结构体Elf32_Ehdr中的成员变量是一一对应的！
-S # 片段布局

$ readelf -l calc

Elf file type is DYN (Position-Independent Executable file) # 💡位置独立的可执行文件
Entry point 0x1080                                          # 💡入口地址
There are 13 program headers, starting at offset 64         # 💡13个程序头信息，从第64个偏移地址开始

Program Headers:
  Type           Offset             VirtAddr           PhysAddr
                 FileSiz            MemSiz              Flags  Align
  PHDR           0x0000000000000040 0x0000000000000040 0x0000000000000040
                 0x00000000000002d8 0x00000000000002d8  R      0x8
  INTERP         0x0000000000000318 0x0000000000000318 0x0000000000000318
                 0x000000000000001c 0x000000000000001c  R      0x1
      [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
  LOAD           0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000660 0x0000000000000660  R      0x1000
  LOAD           0x0000000000001000 0x0000000000001000 0x0000000000001000
                 0x0000000000000225 0x0000000000000225  R E    0x1000
  LOAD           0x0000000000002000 0x0000000000002000 0x0000000000002000
                 0x0000000000000144 0x0000000000000144  R      0x1000
  LOAD           0x0000000000002db0 0x0000000000003db0 0x0000000000003db0
                 0x0000000000000260 0x0000000000000268  RW     0x1000
  DYNAMIC        0x0000000000002dc0 0x0000000000003dc0 0x0000000000003dc0
                 0x00000000000001f0 0x00000000000001f0  RW     0x8
  NOTE           0x0000000000000338 0x0000000000000338 0x0000000000000338
                 0x0000000000000030 0x0000000000000030  R      0x8
  NOTE           0x0000000000000368 0x0000000000000368 0x0000000000000368
                 0x0000000000000044 0x0000000000000044  R      0x4
  GNU_PROPERTY   0x0000000000000338 0x0000000000000338 0x0000000000000338
                 0x0000000000000030 0x0000000000000030  R      0x8
  GNU_EH_FRAME   0x0000000000002014 0x0000000000002014 0x0000000000002014
                 0x0000000000000044 0x0000000000000044  R      0x4
  GNU_STACK      0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000000 0x0000000000000000  RW     0x10
  GNU_RELRO      0x0000000000002db0 0x0000000000003db0 0x0000000000003db0
                 0x0000000000000250 0x0000000000000250  R      0x1

 Section to Segment mapping:
  Segment Sections...
   00
   01     .interp
   02     .interp .note.gnu.property .note.gnu.build-id .note.ABI-tag .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rela.dyn .rela.plt
   03     .init .plt .plt.got .plt.sec .text .fini
   04     .rodata .eh_frame_hdr .eh_frame
   05     .init_array .fini_array .dynamic .got .data .bss
   06     .dynamic
   07     .note.gnu.property
   08     .note.gnu.build-id .note.ABI-tag
   09     .note.gnu.property
   10     .eh_frame_hdr
   11
   12     .init_array .fini_array .dynamic .got
```

### 静态库 vs 动态库

+ 静态链接库（Static Link Library） —— 静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中

    ::: details

    ```bash
    $ objdump -r liboperation.a # 有两个.o文件需要重定位（RELOCATION）
    In archive liboperation.a:

    add.o:     file format elf64-x86-64

    RELOCATION RECORDS FOR [.eh_frame]:
    OFFSET           TYPE              VALUE
    0000000000000020 R_X86_64_PC32     .text



    tfunc.o:     file format elf64-x86-64

    RELOCATION RECORDS FOR [.text]:
    OFFSET           TYPE              VALUE
    000000000000001d R_X86_64_PLT32    atoi-0x0000000000000004


    RELOCATION RECORDS FOR [.eh_frame]:
    OFFSET           TYPE              VALUE
    0000000000000020 R_X86_64_PC32     .text
    ```

    :::

+ 动态链接库（Dynamic Link Library，简称DLL） —— 不像静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中。动态库来是在运行时加载动态库代码（由 ld-linux.so 来负责读取），因此无法在编译和链接阶段获取代码段的符号地址（代码段的符号包括引用的全局数据，调用的函数等）。

    ::: details
    ```bash
    $ objdump -r liboperation.so # 不需要重定位（RELOCATION）

    liboperation.so:     file format elf64-x86-64
    ```
    :::

### 静态链接重定位过程

```bash
$ readelf -h add.o
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          464 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         12
  Section header string table index: 11
$ readelf -s add.o
Symbol table '.symtab' contains 4 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND
     1: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS add.c
     2: 0000000000000000     0 SECTION LOCAL  DEFAULT    1 .text
     3: 0000000000000000    24 FUNC    GLOBAL DEFAULT    1 add

# -Ax: 显示地址的时候，用十六进制来表示。如果使用 -Ad，意思就是用十进制来显示地址;
# -t -x1: 显示字节码内容的时候，使用十六进制(x)，每次显示一个字节(1);
# -N 52：只需要读取 52 个字节;
$ od -Ax -t x1 -N 52 calc.o # 读取字节码
000000 7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
000010 01 00 3e 00 01 00 00 00 00 00 00 00 00 00 00 00
000020 00 00 00 00 00 00 00 00 30 03 00 00 00 00 00 00
000030 00 00 00 00
000034
```

#### todo 重定位节

重定位节（Relocation Section）是DLL文件的一个特殊节，用于存储在加载和链接过程中需要修改的地址偏移量信息。它记录了DLL中涉及到的符号（如函数、变量）的地址，以便在运行时进行重定位，使得DLL可以正确加载和运行。

#### todo 重定位表

重定位表（Relocation Table）是重定位节中的一部分，它包含了需要重定位的地址和偏移量信息。重定位表的作用是指导系统在加载DLL时，根据其中的重定位信息，动态修正代码和数据的地址，以适应当前的加载地址。

### 动态链接 PIC 原理

#### -fpic

位置无关码 `-fpic`

回顾 gcc 编译过程： 首先把源代码编译成目标文件， 然后把目标文件链接起来。

**`-fPIC`**

如果是动态链接库的话，目标文件需要创建成 PIC（position-independent code，位置无关码） ，概念上就是在可执行程序装载它们的时候， 它们可以放在可执行程序的内存里的任何地方。要生成这种形式的目标文件，就需要添加参数 `-fPIC`。

+ -fpic —— 在动态库中生成位置无关的代码。通过全局偏移表（GOT）访问所有常量地址。程序启动时动态加载程序解析GOT条目。对GOT的大小有限制。
+ -fPIC —— 作用同-fpic。但是对GOT表大小无限制。
         即： 如果链接的可执行文件的GOT大小超过计算机特定的最大大小，则会从链接器收到错误消息，指示-fpic不起作用。在这种情况下，需要使用-fPIC重新编译。
         💡为了兼容各个系统，在生成位置无关的代码的时候，应该使用-fPIC参数。

**`-DPIC`**

根据 [Re: What does -DPIC linker flag mean](https://gcc.gnu.org/legacy-ml/gcc-help/2006-10/msg00147.html) 提到： todo

#### GOT/PLT

载入时重定位的描述：

在调用动态库中的函数时，动态加载器动态分配一段进程地址空间，将动态库加载到该地址空间后，再修改代码段的符号地址。
至于需要修改的哪些地址，链接器在动态库的文件头中预先写好，供加载器读取修改。

载入时重定位的缺点：

1. 动态库的代码段不能在进程间共享：
多个进程加载同一个动态库到各自不同的地址空间，导致代码段需要不同的重定位，所以最终每个引用该动态库的进程拥有一份该动态库代码段的不同拷贝。
1. 代码段必须是可写的，增加了被攻击风险。

为了解决载入时重定位的问题，引入了PIC的概念，即位置无关代码。

**PIC实现原理**

1. **GOT**：
在动态库的数据段增加 GOT（Global Offset Table），该表的每一项是符号到地址的绝对映射。
由于代码段到数据段的偏移是固定的，因此可以在编译时确定代码段中的某个符号到GOT特定项之间的偏移。
这样，代码段中的符号偏移就可以在编译时确定了，在加载时也无需修改代码段的内容，只需要填写位于数据段的GOT的所有项的符号的绝对地址就完成了。
因为数据段本来就是进程间不共享，每个进程独立的一份，因此GOT的设计完全解决了以上两个问题，从而达到两个目的：
1，代码段可以在多进程间共享；
2，代码段是只读的。
1. **PLT**：
PLT（Program Linkage Table，程序链接表） 的出现是为了延时定位的目的。
一个动态库中的函数往往要远多于全局变量，并且被调用的函数往往少于定义的函数。
由于 GOT 中包含了该动态库中的所有的全局变量的映射，并且在连接器加载时解析所有的全局变量的地址。
如果用同样的方式去处理函数调用符号，则开销会非常大。
因此在代码段设计了一个 PLT （表中每一项其实是个代码段） 用于执行如下逻辑：
首次访问时，解析参数和向GOT填写函数地址，后续访问直接访问 GOT 中的函数地址。
如此达到了延时定位的目的。

因此，在一个 PIC 的动态库中，
对全局变量使用 GOT 来映射，
对函数调用使用 PLT + GOT 来映射。
从而达到共享库代码段复用，代码段安全访问的目的。
而这些就是 PIC 的意义。

### 分析程序字节码

todo `od -Ad -t x1 -j 1136 -N 434 main`

todo 反汇编 `objdump -d main.o`

## 编译选项

### 安全编译/链接选项

todo linux程序保护机制&gcc编译选项 - <https://www.jianshu.com/p/91fae054f922>

若不加上，可能运行时会泄露某些信息，方便逆向、CTF。

&nbsp; | 编译选项 | 链接选项
--- | --- | ---
必选 | PIC/PIE/Protect-Stack | rpath/Bind-Now/Strip 
可选 | Fortify-Source/ftrapv

<style>
  .level-1 {
    background: red;
  }
  .level-2 {
    background: yellow;
  }
  .level-3 {
    background: green;
  }
</style>

具体含义

编译/链接选项 | 必选 | 含义 | 使用方法
--- | --- | --- | ---
PIC<br>（Position-Independent-Code） | <span class="level-1">必选<br>high</span> | 位置无关代码 <br> 实现动态库随机加载 | `-fPIC`/~~`-fpic`（旧）~~ （编译选项）
PIE(ASLR)<br>PIE<br>（Position-Independent-Executable） | <span class="level-1">必选<br>high </span>| 位置无关代码/随机化<br>可执行文件在加载执行时可像共享库一样随机加载  <br> 降低固定地址类攻击、缓冲溢出攻击的成功率 | `-fPIE`/~~`-fpie`（旧）~~ （编译选项） <br> `-pie` （链接选项） <br> ⚠️需要上述两个选项同时使用 <br> 解释： <ul> <li>`-no-pie`: 关闭</li><li>`-pie`: 开启</li> </ul>
Canary<br>Protect-Stack<br>SP | <span class="level-1">必选<br>high</span> | 栈保护。可以判断是否发生溢出攻击 <br> 参考： <https://www.cnblogs.com/arnoldlu/p/11630979.html> | `-fstack-protector-strong`/~~`-fstack-protector-all`（旧）~~ （编译选项） <br> 解释： <ul><li>`-fno-stack-protector`: 关闭</li><li>`-fstack-protector`: 开启</li><li>`-fstack-protector-all`: 全开启</li></ul>
Fortify<br>Fortify-Source<br>FS | <span class="level-2">可选<br>medium</span> | GCC编译器和glibc库配合提供在编译时和运行时对固定大小的缓冲区的访问 <br> （无论时动态分配的还是静态声明的内存空间） <br> 参考： <https://forum.butian.net/share/1190> <br> <span style="">Fority 其实非常轻微的检查，用于检查是否存在缓冲区溢出的错误。<br>Fortify 是GCC在编译源码时判断程序的哪些buffer会存在可能的溢出。<br>在buffer大小已知的情况下，GCC会把 strcpy、memcpy、memset等函数自动替换成相应的`__strcpy_chk(dst, src, dstlen)`等函数，达到防止缓冲区溢出的作用。</span> | `-O2` （编译选项） <br> `-D_FORTIFY_SOURCE=2` （编译选项，默认开启，但需要`-O2`启动时才会激活） 
ftrapv | <span class="level-2">可选<br>medium</span> | 整数溢出检查 <br> 使用了它之后，在执行有符号整数间的加减乘运算时，不是通过CPU的指令，而是用包含了GCC附属库的libgcc.c里面的函数来实现执行带符号的整数间的加/减/乘/除运算。 <br> <span sytle="background:yellow">对性能影响比较大。</span> | `-ftrapv` （编译选项）
NX(DEP) | <span class="level-1">可选<br>high</span> | 堆栈不可执行 | `-z noexecstack` <br> 解释： <ul><li>`-z execstack`: 关闭</li><li>`-z noexecstack`: 开启</li></ul>
rpath | <span class="level-1">必选<br>high</span> | 禁用： “动态库搜索路径” <br> 禁用： `-rpath` <br> 二进制特征会显示rpath/runpath路径。攻击者更加容易构造rpath类的攻击 <br> ~~指定运行时避免使用链接器 `-Wl,-rpath=.` 寻找动态库的路径~~ | `set(CMAKE_SKIP_RPATH TRUE)` （Cmake）
Bind-Now | <span class="level-1">必选<br>high</span> | 立即绑定 | `-Wl,-z,now` （链接选项） <br> 或：`LD_BIND_NOW=1`
RELRO | <span class="level-1">必选<br>high</span> | GOT表保护<br>全部重定向只读保护，防止内存越界，一旦越界就会segmentation faul。<br>对ret2plt攻击进行防护 | `-Wl,-z,relro` （链接选项） <br> 解释：<ul> <li>`-z norelro`: 关闭</li><li>`-z lazy`: 部分开启</li><li>`-z now`: 完全开启</li> </ul>
Strip | <span class="level-2">必选<br>medium </span>| 去除符号表：链接过程完成后，符号表对可执行文件运行已无任何作用，反而会成为攻击者构造攻击的工具。<br>同时，删除符号表还可以对文件“减肥”，降低文件大小 | `-Wl,-s` （链接选项）

### 安全编译选项检测工具

#### binscope todo

参考：

+ todo binscope说明 - Windows平台MSVC的安全编译选项检测工具 <https://zhuanlan.zhihu.com/p/624647089>
  + todo [binscope](https://www.microsoft.com/en-us/download/details.aspx?id=44995)
  + todo [官方文档 编译器选项](https://docs.microsoft.com/en-us/cpp/build/reference/compiling-a-c-cpp-program?view=msvc-170)
  + todo [官方文档 链接器选项](https://docs.microsoft.com/en-us/cpp/build/reference/linking?view=msvc-170)
  + todo [MSVC编译参数](https://blog.csdn.net/sunweiliang/article/details/89338099)
  + todo [MSVC编译参数](https://blog.csdn.net/john_crash/article/details/50127309)
  + todo [Security Best Practices for C++](https://docs.microsoft.com/en-us/cpp/security/security-best-practices-for-cpp?view=msvc-170)
  + todo [Security Features in the CRT](https://docs.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170)
  + todo [_ITERATOR_DEBUG_LEVEL](https://docs.microsoft.com/en-us/cpp/standard-library/iterator-debug-level?view=msvc-170)
  + todo [Checked Iterators](https://docs.microsoft.com/en-us/cpp/standard-library/checked-iterators?view=msvc-170)
  + todo [Code analysis for C/C++ overview](https://docs.microsoft.com/en-us/cpp/code-quality/code-analysis-for-c-cpp-overview?view=msvc-170)
+ todo BinScope 2014 <https://www.microsoft.com/en-us/download/details.aspx?id=44995>
+ todo binscope github <https://github.com/andrew-d/binscope>
+ todo SecBinaryCheck ResultAnalyzer <https://gitee.com/dangoxj/secbinarycheck-result-analyzer>
