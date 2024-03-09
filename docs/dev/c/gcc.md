---
title: GCC使用笔记
---

参考：

+ [x] B站|李呵欠|GNU Makefile编译C/C++教程（Linux系统、VSCODE） - <https://www.bilibili.com/video/BV1EM41177s1/><br> 配套文档 - <https://github.com/WohimLee/GNC-Tutorial>

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

### 文件后缀解释

后缀（Suffix） | 说明（File Contains）
--- | ---
.c | 源文件 <br> C source code that is to be preprocessed.
.h | 头文件 <br> C source code header file.
.i | 预处理文件 <br> C source code that is not to be preprocessed. <br> This type of file is produced as an intermediate step in compilation.
.s | 汇编语言文件 <br> Assembly language code. <br> this type of file is produced as an intermediate step in compilation.
.o | 目标文件 <br> An object file in a format appropriate to be supplied to the linker. <br> This type of file is produced as an intermediate step in compilation.
.a | 静态库文件 <br> Static object library (archive).
.so | 动态库/共享库/运行时库文件 <br> Shared object library.

### 创建可执行文件

hello.c

::: details
@[code](@code/c/src/demo-gcc-01/hello.c)
:::

hello.i —— 预处理

```bash
gcc -E hello.c # 输出控制台
gcc -E hello.c -o hello.i 
```

::: details
@[code](@code/c/src/demo-gcc-01/hello.i)
:::

hello.s —— 生成汇编语言

```bash
gcc -S hello.c
gcc -S hello.c -o hello.s
```

::: details
@[code](@code/c/src/demo-gcc-01/hello.s)
:::

hello.o —— 目标文件（可重定位程序，即未链接静态库？）

```bash
gcc -c hello.c
gcc -c hello.c -o hello.h
# 编译多个.c文件
gcc -c hello1.c hello2.c # ...


$ ll hello.o
-rwxrwxrwx 1 uv01 uv01 1512 Mar  9 14:59 hello.o* 
$ file hello.o
hello.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
# ELF —— Executable and Linking Format，可执行可连接格式
# 64-bit
# LSB —— Least Significant Bit，最小标识位/最低位有效。表示时是小端模式的程序
# relocatable —— 可重定位
# x86-64 —— cpu架构
# version 1 (SYSV) —— System V | 程序初始化方案？
# stripped/not stripped 
#   + stripped     —— 将程序中的符号表的信息剔除掉了，优点： 1. 可执行文件体积减少； 2. 程序更难以被调试/逆向/破解
#   + not stripped —— 保留了上述信息，便于调试
$ ./hello.o # 未可执行
-bash: ./hello.o: cannot execute binary file: Exec format error 
```

hello —— 可执行文件

```bash
gcc hello.c
gcc hello.c -o hello


$ ll hello # 大了10倍，链接了静态库？
-rwxrwxrwx 1 uv01 uv01 15960 Mar  9 15:06 hello* 
$ file hello 
hello: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=2b5da4e7b90b64972cb49265c24db07574df467a, for GNU/Linux 3.2.0, not stripped
# dynamically linked —— 动态链接的！
# interpreter /lib64/ld-linux-x86-64.so.2
# BuildID[sha1]=2b5da4e7b90b64972cb49265c24db07574df467a
# for GNU/Linux 3.2.0
# not stripped
$ ./hello
Hello World!
```

### 创建静态库 .a

static library

代码

::: details
calc.c

@[code](@code/c/src/demo-gcc-01/calc.c)

add.c

@[code](@code/c/src/demo-gcc-01/add.c)

tfunc.c

@[code](@code/c/src/demo-gcc-01/tfunc.c)
:::


首先将库函数编译成.o文件

```bash
gcc -c add.c -o add.o
gcc -c tfunc.c -o tfunc.o
# gcc -c lib1.c lib2.c ...
gcc -c add.c tfunc.c
```

编译静态库

```bash
# 库文件命名规范 lib<库名>.a
ar -r liboperation.a add.o tfunc.o


$ file liboperation.a 
liboperation.a: current ar archive
```

链接成可执行文件

```bash
# gcc [.c] [.a] -o [.o]
# gcc [.c] -o [.o] -l[库名] -L[库路径]
gcc calc.c liboperation.a -o calc

# 也可以直接使用.o文件链接
gcc calc.o tfunc.o add.o -o calc


$ file calc
calc: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=50ba230b15340df52d926d4a374a9938bd2c6917, for GNU/Linux 3.2.0, not stripped
$ ./calc 1 2
1 + 2 = 3
```

### 创建动态库 .so

shared library

编译二进制.o文件

```bash
# gcc -c -fpic [.c/.cpp] [.c/.cpp] ...
# -fpic —— 
gcc -c -fpic tfunc.c add.c


$ file tfunc.o add.o
tfunc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
add.o:   ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
```

编库

```bash
# gcc -shared [.o] [.o] ... -o [lib库名.so]
# -shared —— 生成共享目标文件。通常用在建立共享库时。
gcc -shared tfunc.o add.o -o liboperation.so


$ file liboperation.so
liboperation.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, BuildID[sha1]=a95332c5ba7a9350a185a84281e834d6285908e1, not stripped
```

链接动态库到可执行文件

```bash
# gcc [.c/.cpp] -o [可执行文件名] -l[库名] -L[库路径] -Wl,-rpath=[库路径]
# -Wl.option —— 此选项传递option给链接
#               多个option中间用逗号","分割
# -rpath              —— 运行时动态库路径
# -l[库名] -L[库路径]  —— 编译时动态库路径
gcc calc.c -o calc -loperation -L$(pwd) -Wl,-rpath=$(pwd) 

$ file calc
calc: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=121f5be582653e7d6f188f0aabcaaf085217becc, for GNU/Linux 3.2.0, not stripped
$ ldd calc # 查看可执行程序的依赖
        linux-vdso.so.1 (0x00007ffe9476e000)
        liboperation.so => ./liboperation.so (0x00007f527e631000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f527e402000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f527e63d000)
```

## GCC默认头文件搜索路径

```bash
$ echo | gcc -v -x -c -E -
/usr/lib/gcc/x86_64-linux-gnu/7/include
/usr/local/include
/usr/lib/gcc/x86_64-linux-gnu/7/include-fixed
/usr/include/x86_64-linux-gnu
/usr/include
```
