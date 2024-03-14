---
title: G++使用笔记
---

c++语言编译器

## 基础概念

### 文件后缀解释

后缀（Suffix） | 说明（File Contains）
--- | ---
.C/.c++/.cc/.cp/.cpp/.cxx| 源文件 <br> C++ source code that is to be preprocessed.
.h | 头文件 <br> C or C++ header file.
\<none\> | The standard C++ system header files have no suffix
.ii | 预处理文件 <br> C++ source code that is not to be preprocessed. <br> This type of file is produced as an intermediate step in compilation.
.s | 汇编语言文件 <br> Assembly language code. <br> this type of file is produced as an intermediate step in compilation.
.o | 目标文件 <br> An object file in a format appropriate to be supplied to the linker. <br> This type of file is produced as an intermediate step in compilation.
.a | 静态库文件 <br> Static object library (archive).
.so<br>.lib/.dll (for windows) | 动态库/共享库/运行时库文件 <br> Shared object library.

## 编译过程

参考 gcc（[link](./gcc.md)），处理将工具 gcc 换成 g++ 外，其他操作一样。

## 编译/链接选项

todo gcc编译参数 - <https://blog.csdn.net/langzijing/article/details/78555812>

编译选项 | 说明 | 备注
--- | --- | ---
-m64 | 指定编译为64位应用
-std= | 指定编译标准，例如： `-std=c++11`/`-std=c++14`
-g | 包含调试信息
-w | 不显示告警
-O | 优化等级，通常使用 `-O3`
-I | 加载头文件路径前
-fPIC <br> （Position-Independent Code） | 产生二进制文件没有绝对地址，使用全部相对地址。二进制可以被加载到内存任意位置，且可以正确的执行 | 共享库必加

链接选项 | 说明 | 备注
--- | --- | ---
-l | 加在库名前面
-L | 加在库路径前面
-Wl,\<选项\> | 将\<选项\>传递给链接器
-Wl,-rpath="共享库路径" | 指定运行时共享库（.so文件）路径所在的目录

### 安全编译/链接选项

todo linux程序保护机制&gcc编译选项 - <https://www.jianshu.com/p/91fae054f922>

若不加上，可能运行时会泄露某些信息，方便逆向、CTF。

&nbsp; | 编译选项 | 链接选项
必选 | PIC/PIE/Protect-Stack | rpath/Bind-Now/Strip 
可选 | Fortify-Source/ftrapv

具体含义

编译/链接选项 | 必选 | 含义 | 使用方法
--- | --- | --- | ---
PIC<br>（Position-Independent-Code） | 必选 | 实现动态库随机加载 | `-fPIC`/~~`-fpic`（旧）~~ （编译选项）
PIE(ASLR)<br>PIE<br>（Position-Independent-Executable） | 必选 | 降低固定地址类攻击、缓冲溢出攻击的成功率；<br>具备PIE的可执行文件在加载执行时可像共享库一样随机加载 | `-fPIE`/~~`-fpie`（旧）~~ （编译选项） <br> `-pie` （链接选项） <br> ⚠️需要上述两个选项同时使用
Canary<br>Protect-Stack | 必选 | 栈保护。可以判断是否发生溢出攻击 <br> 参考： <https://www.cnblogs.com/arnoldlu/p/11630979.html> | `-fstack-protector-strong`/~~`-fstack-protector-all`（旧）~~ （编译选项）
Fortify<br>Fortify-Source | 可选 | GCC编译器和glibc库配合提供在编译时和运行时对固定大小的缓冲区的访问 <br> （无论时动态分配的还是静态声明的内存空间） <br> 参考： <https://forum.butian.net/share/1190> <br> <span style="">Fority 其实非常轻微的检查，用于检查是否存在缓冲区溢出的错误。<br>Fortify 是GCC在编译源码时判断程序的哪些buffer会存在可能的溢出。<br>在buffer大小已知的情况下，GCC会把 strcpy、memcpy、memset等函数自动替换成相应的`__strcpy_chk(dst, src, dstlen)`等函数，达到防止缓冲区溢出的作用。</span> | `-O2` （编译选项） <br> `-D_FORTIFY_SOURCE=2` （编译选项，默认开启，但需要`-O2`启动时才会激活） 
ftrapv | 可选 | 整数溢出检查 <br> 使用了它之后，在执行有符号整数间的加减乘运算时，不是通过CPU的指令，而是用包含了GCC附属库的libgcc.c里面的函数来实现执行带符号的整数间的加/减/乘/除运算。 <br> <span sytle="background:yellow">对性能影响比较大。</span> | `-ftrapv` （编译选项）
NX(DEP)
rpath | 必选 | 二进制特征会显示rpath/runpath路径。攻击者更加容易构造rpath类的攻击 <br> ~~指定运行时链接器寻找动态库的路径：`-Wl,-rpath=.`~~ | `set(CMAKE_SKIP_RPATH TRUE)` （Cmake）
RELRO<br>Bind-Now | 必选 | 全部重定向只读保护，防止内存越界，一旦越界就会segmentation faul。<br>对ret2plt攻击进行防护 | `-Wl,-z,now` （链接选项）
Strip | 必选 | 去除符号表：链接过程完成后，符号表对可执行文件运行已无任何作用，反而会成为攻击者构造攻击的工具。<br>同时，删除符号表还可以对文件“减肥”，降低文件大小 | `-Wl,-s` （链接选项）
