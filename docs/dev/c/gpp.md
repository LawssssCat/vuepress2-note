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