---
title: GCC使用笔记
---

c语言编译器

参考：

+ [x] B站|李呵欠|GNU Makefile编译C/C++教程（Linux系统、VSCODE） - <https://www.bilibili.com/video/BV1EM41177s1/><br> 配套文档 - <https://github.com/WohimLee/GNC-Tutorial>

GCC官网地址： <https://gcc.gnu.org/> \
GCC官方文档： <https://gcc.gnu.org/onlinedocs/>

GCC（GNU Compiler Collection，GNU编译程序集合）是GNU项目的一个产品，是最重要的开放源码软件。如Python就是由C语言开发，由GNU编译程序编译的！

GCC常见的组成部分：

模块 | 说明 | 备注
--- | --- | ---
configure | GCC源码树根目录中的一个脚本，用于设置配置值和创建GCC编译程序必须的make程序文件。
gcc | 该驱动程序等同于执行编译程序和链接程序以产生需要的输出。 | 只能编译c语言
c++ | gcc的一个版本，默认语言为C++，而且在链接的时候自动包含标准C++库，这和g++一样。
g++ | gcc的一个版本，默认语言为G++，而且在链接的时候自动包含标准C++库，这和c++一样。 | 向下兼容，同时能编译C/C++语言 <br> （<span style="background:yellow">一般选择此作为编译工具</span>）
libgcc | 该库包含的例程段被作为编译程序的一部分，是因为它们可以被链接到实际的可执行程序中。它们是例程，链接到可执行程序，来执行基本的任务，例如浮点运算。这些库中的例程通常都是平台相关的。
libstdc++ | 运行时库，包括定义为标准语言一部分的所有的C++类和函数。

GCC包含的常见软件：

工具 | 说明 | 备注
--- | --- | ---
ar | 这是一个程序，可通过文档添加、删除和析取文件来维护库文件。通常使用该文件是为了创建和管理链接程序使用的目标库文档。该程序是binutils包的一部分。 | 编译静态库是用到
as | GNU汇编器。实际上它是一族汇编器，因为它可以被编译或者能够在各种不同平台上工作。该程序是binutils包的一部分。 | 简单说：将C/C++源文件转换成汇编语言
autoconf | 产生的shell脚本自动配置源代码包取编译某个特定版本的UNIX。
gdb | GNU调试器。可用于检查程序运行时的值和行为。 | 各种IDE（vscode/visualstudio/...）底层调用该工具
GNATS（GNU Bug Tracking System） | 一个跟踪GCC和其他GNU程序问题的在线系统。 | 经常在别人工程中下载库编译安装时经常看到这东西
gprof | 该程序会监督编译程序的执行过程，并报告程序中各个函数的运行时间，可以根据所提供的配置车文件来优化程序。该程序是binutils包的一部分。 | 静态库/动态库都用到 <br> 新手经常碰到的问题大概率与此库相关，如 ld error ...
ld | GNU连接程序。该程序将目标文件的集合组成可执行程序。该程序是binutils包的一部分。
libtool | 一个基本库，支持make程序的描述文件使用的简化共享库用法的脚本。
make | 一个工具程序，它会读makefile脚本来确定程序中哪部分需要编译和连接，然后发布必要的命令。它读出的脚本（makefile或Makefile）定义了文件关系和依赖关系。 | make工具的支持库

## 基础概念

### 文件后缀解释

后缀（Suffix） | 说明（File Contains）
--- | ---
.c | 源文件 <br> C source code that is to be preprocessed.
.h | 头文件 <br> C source code header file.
.i | 预处理文件 <br> C source code that is not to be preprocessed. <br> This type of file is produced as an intermediate step in compilation.
.s | 汇编语言文件 <br> Assembly language code. <br> this type of file is produced as an intermediate step in compilation.
.o | 目标文件 <br> An object file in a format appropriate to be supplied to the linker. <br> This type of file is produced as an intermediate step in compilation.
.a | 静态库文件 <br> Static object library (archive).
.so <br>.lib/.dll (for windows) | 动态库/共享库/运行时库文件 <br> Shared object library.

## 编译过程

```bash
↓
↓ hello.c （源文件，文本）
↓ 
预处理器（cpp） —— 注释、宏定义
↓
↓ hello.i （修改了的源程序，文本）
↓
编译器（ccl）
↓
↓ hello.s （汇编程序，文本）
↓
汇编器（as）
↓
↓ hello.o （目标程序，二进制）（可重定位程序，relocatable object program）
↓
链接器（ld）
↓
↓ ←←← prinf.o （链接二进制）
↓
↓ hello （目标程序，二进制）（可执行文件）
```

简单来说： 首先把源代码编译成目标文件， 然后把目标文件链接起来。

### 创建可执行文件

hello.c

::: details
@[code](@code/c/src/demo-gcc-01/hello.c)
:::

#### 预处理 .i

hello.i

```bash
gcc -E hello.c # 输出控制台
gcc -E hello.c -o hello.i 
```

::: details
@[code](@code/c/src/demo-gcc-01/hello.i)
:::

#### 生成汇编语言 .s

hello.s

```bash
gcc -S hello.c
gcc -S hello.c -o hello.s
```

::: details
@[code](@code/c/src/demo-gcc-01/hello.s)
:::

#### 生成目标文件 .o

hello.o

```bash
gcc -c hello.c
gcc -c hello.c -o hello.h
# 编译多个.c文件
gcc -c hello1.c hello2.c # ...
```

::: details
```bash
$ ll hello.o
-rwxrwxrwx 1 uv01 uv01 1512 Mar  9 14:59 hello.o* 
$ file hello.o
hello.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
# ELF —— Executable and Linking Format，可执行可连接格式
# 64-bit
# LSB —— Least Significant Bit，最小标识位/最低位有效。表示时是小端模式的程序
# relocatable —— 可重定位，运行时才指定内存位置？
# x86-64 —— cpu架构
# version 1 (SYSV) —— System V | 程序初始化方案？
# stripped/not stripped 
#   + stripped     —— 将程序中的符号表的信息剔除掉了，优点： 1. 可执行文件体积减少； 2. 程序更难以被调试/逆向/破解
#   + not stripped —— 保留了上述信息，便于调试

# 命令： readelf -h —— 查看二进制文件头文件
# Linux的可执行文件一般是elf格式（Executable and Linking Format，可执行可连接格式）的，在这个可执行文件的头部包含了很多重要的信息：如文件格式，加载地址，符号表等。
$ readelf -h hello.o 
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file) # 💡文件类型 ❗可重定位，运行时才指定内存位置？
  Machine:                           Advanced Micro Devices X86-64 # 适配的cpu架构
  Version:                           0x1
  Entry point address:               0x0 # 💡程序入口地址 ❗无指定
  Start of program headers:          0 (bytes into file)
  Start of section headers:          616 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         14
  Section header string table index: 13
$ ./hello.o # 未可执行
-bash: ./hello.o: cannot execute binary file: Exec format error 
```
:::

#### 生成可执行文件

hello

```bash
gcc hello.c
gcc hello.c -o hello
```

:::details
```bash
$ ll hello # 大了10倍，链接了静态库？
-rwxrwxrwx 1 uv01 uv01 15960 Mar  9 15:06 hello* 
$ file hello 
hello: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=2b5da4e7b90b64972cb49265c24db07574df467a, for GNU/Linux 3.2.0, not stripped
# dynamically linked —— 动态链接的！
# interpreter /lib64/ld-linux-x86-64.so.2
# BuildID[sha1]=2b5da4e7b90b64972cb49265c24db07574df467a
# for GNU/Linux 3.2.0
# not stripped
$ readelf -h hello 
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Position-Independent Executable file) # 💡文件类型
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x1060 # 💡程序入口地址 ❗已指定
  Start of program headers:          64 (bytes into file)
  Start of section headers:          13976 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         13
  Size of section headers:           64 (bytes)
  Number of section headers:         31
  Section header string table index: 30
$ ./hello
Hello World!
```
:::

### 创建静态库 .a

static library
静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中

代码

::: details
calc.c

@[code](@code/c/src/demo-gcc-01/calc.c)

add.c

@[code](@code/c/src/demo-gcc-01/add.c)

tfunc.c

@[code](@code/c/src/demo-gcc-01/tfunc.c)
:::


#### 生成目标文件 .o

```bash
gcc -c add.c -o add.o
gcc -c tfunc.c -o tfunc.o
# gcc -c lib1.c lib2.c ...
gcc -c add.c tfunc.c
```

::: details
```bash
$ readelf -h add.o tfunc.o
File: add.o
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
File: tfunc.o
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
  Start of section headers:          536 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         13
  Section header string table index: 12
```
:::

#### 编译静态库 .a

```bash
# 库文件命名规范 lib<库名>.a
ar -r liboperation.a add.o tfunc.o
```

::: details
```bash
$ file liboperation.a 
liboperation.a: current ar archive
$ ar -t liboperation.a # display contents of the archive
add.o
tfunc.o
$ readelf -h liboperation.a # 查看库头文件
File: liboperation.a(add.o)
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file) # 💡文件类型
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
File: liboperation.a(tfunc.o)
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file) # 💡文件类型
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          536 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         13
  Section header string table index: 12
$ readelf -S add.o # 地址均未指定
There are 12 section headers, starting at offset 0x1d0:

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .text             PROGBITS         0000000000000000  00000040
       0000000000000018  0000000000000000  AX       0     0     1
  [ 2] .data             PROGBITS         0000000000000000  00000058
       0000000000000000  0000000000000000  WA       0     0     1
  [ 3] .bss              NOBITS           0000000000000000  00000058
       0000000000000000  0000000000000000  WA       0     0     1
  [ 4] .comment          PROGBITS         0000000000000000  00000058
       000000000000002c  0000000000000001  MS       0     0     1
  [ 5] .note.GNU-stack   PROGBITS         0000000000000000  00000084
       0000000000000000  0000000000000000           0     0     1
  [ 6] .note.gnu.pr[...] NOTE             0000000000000000  00000088
       0000000000000020  0000000000000000   A       0     0     8
  [ 7] .eh_frame         PROGBITS         0000000000000000  000000a8
       0000000000000038  0000000000000000   A       0     0     8
  [ 8] .rela.eh_frame    RELA             0000000000000000  00000150
       0000000000000018  0000000000000018   I       9     7     8
  [ 9] .symtab           SYMTAB           0000000000000000  000000e0
       0000000000000060  0000000000000018          10     3     8
  [10] .strtab           STRTAB           0000000000000000  00000140
       000000000000000b  0000000000000000           0     0     1
  [11] .shstrtab         STRTAB           0000000000000000  00000168
       0000000000000067  0000000000000000           0     0     1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
  L (link order), O (extra OS processing required), G (group), T (TLS),
  C (compressed), x (unknown), o (OS specific), E (exclude),
  D (mbind), l (large), p (processor specific)
```
:::

#### 链接静态库

::: tip
动态链接执行很复杂，比静态链接执行时间长。
但是，极大的节省了 size。
其中用到的 PIC 和动态链接技术是计算机发展史上非常重要的一个里程碑。
:::

```bash
# gcc [.c] [.a] -o [.o]
# gcc [.c] -o [.o] -l[库名] -L[库路径]
gcc calc.c liboperation.a -o calc

# 也可以直接使用.o文件链接
gcc calc.o tfunc.o add.o -o calc

$ ./calc 1 2
1 + 2 = 3
```

::: details
```bash
$ file calc
calc: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=50ba230b15340df52d926d4a374a9938bd2c6917, for GNU/Linux 3.2.0, not stripped
$ ldd calc # 查看可执行程序的依赖
        linux-vdso.so.1 (0x00007fffc95dd000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f38e7817000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f38e7a4d000)
$ readelf -l calc

Elf file type is DYN (Position-Independent Executable file)
Entry point 0x1080
There are 13 program headers, starting at offset 64

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
:::

### 创建动态库 .so

shared library
不像静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中。
动态库来是在运行时加载动态库代码，因此无法在编译和链接阶段获取代码段的符号地址（代码段的符号包括引用的全局数据，调用的函数等）。

#### 生成目标文件 .o

```bash
# gcc -c -fpic [.c/.cpp] [.c/.cpp] ...
# -fpic/-fPIC 
#       PIC（position independent code）
#       -fPIC 与生成动态链接可以说没有直接关系，不用fPIC依然可以编译出so文件。
#       但是如果不加 -fPIC 则加载 .so 文件的代码段时，代码段引用的数据对象需要重定位。
#       重定位会修改代码段的内容，这就造成每个使用这个 .so 文件代码段的进程在内核里都会生成这个 .so 文件代码段的copy。
#       由于于这个 .so 文件代码段和数据段内存映射的位置不一样，每个copy都不一样。
#       💡一般用fPIC来生成so，而生成a时则不用fPIC
# 
#       不使用fPIC编译so的情况：（满足以下4个条件）
#       1. 该库可能需要经常更新
#       2. 该库需要非常高的效率（尤其是有很多全局量的使用时）
#       3. 该库并不很大
#       4. 该库基本不需要被多个应用程序共享
gcc -c -fpic tfunc.c add.c
```

::: details
```bash
$ file tfunc.o add.o
tfunc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
add.o:   ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
$ readelf -h add.o tfunc.o
File: add.o
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
File: tfunc.o
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
  Start of section headers:          536 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         13
  Section header string table index: 12
```
:::

#### 生成动态库 .so

```bash
# gcc -shared [.o] [.o] ... -o [lib库名.so]
# -shared —— 生成共享目标文件。通常用在建立共享库时。
#            💡是否添加 -fPIC 的问题：
#            从GCC来看，shared应该是包含fPIC选项的，但似乎不是所以系统都支持，所以最好显式加上fPIC选项。
gcc -shared tfunc.o add.o -o liboperation.so
```

::: details
```bash
$ file liboperation.so
liboperation.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, BuildID[sha1]=a95332c5ba7a9350a185a84281e834d6285908e1, not stripped
$ readelf -h liboperation.so
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file) # 💡文件类型
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          64 (bytes into file)
  Start of section headers:          13696 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         11
  Size of section headers:           64 (bytes)
  Number of section headers:         29
  Section header string table index: 28
```
:::

#### 链接动态库

```bash
# gcc [.c/.cpp] -o [可执行文件名] -l[库名] -L[库路径] -Wl,-rpath=[库路径]
# -Wl.option —— 此选项传递option给链接
#               多个option中间用逗号","分割
# -rpath              —— 运行时动态库路径
# -l[库名] -L[库路径]  —— 编译时动态库路径
gcc calc.c -o calc -loperation -L$(pwd) -Wl,-rpath=$(pwd) 
```

::: details
```bash
$ file calc
calc: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=121f5be582653e7d6f188f0aabcaaf085217becc, for GNU/Linux 3.2.0, not stripped
$ ldd calc # 查看可执行程序的依赖
        linux-vdso.so.1 (0x00007ffe9476e000)
        liboperation.so => ./liboperation.so (0x00007f527e631000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f527e402000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f527e63d000)
```
:::

## GCC默认头文件搜索路径

```bash
$ echo | gcc -v -x -c -E -
/usr/lib/gcc/x86_64-linux-gnu/7/include
/usr/local/include
/usr/lib/gcc/x86_64-linux-gnu/7/include-fixed
/usr/include/x86_64-linux-gnu
/usr/include
```

todo 作用
