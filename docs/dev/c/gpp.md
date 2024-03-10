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

## 编译选项

编译选项 | 说明 | 备注
--- | --- | ---
-m64 | 指定编译为64位应用
-std= | 指定编译标准，例如： `-std=c++11`/`-std=c++14`
-g | 包含调试信息
-w | 不显示告警
-O | 优化等级，通常使用 `-O3`
-I | 加载头文件路径前
-fPIC <br> （Position-Independent Code） | 产生二进制文件没有绝对地址，使用全部相对地址。二进制可以被加载到内存任意位置，且可以正确的执行 | 共享库必加

## 链接选项

链接选项 | 说明 | 备注
--- | --- | ---
-l | 加在库名前面
-L | 加在库路径前面
-Wl,\<选项\> | 将\<选项\>传递给链接器
-Wl,-rpath="共享库路径" | 指定运行时共享库（.so文件）路径所在的目录
