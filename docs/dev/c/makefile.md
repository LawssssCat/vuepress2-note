---
title: Makefile 使用笔记
tags:
  - make
---

+ GNU Make 官网网站： <https://www.gnu.org/software/make/>
+ GNU Make 官方文档地址： <https://www.gnu.org/software/make/manual/>
+ Makefile Tutorial: <https://makefiletutorial.com/>

::: details
参考：

+ [ ] B站|无限十三年|从零开始学Makefile - <https://www.bilibili.com/video/BV1Bv4y1J7QT> todo 看完+笔记
:::

## 基本使用

### 基本格式

```makefile
target : prerequisties
[tab键]command

# target： 目标文件，可以是ObjectFile、可执行文件、标签（Label，此概念将在“伪目标”中叙述）
# prerequistie： 要生成那个target所需要的文件或者目标
# command： 是make要执行的命令

# ⚠️command前需要使用tab键，而非空格xN
```

```makefile
debug :
	@echo hello world!
```

### 基本规则

+ make会在当前目录下找到一个名字叫`Makefile`或`makefile`的脚本文件
+ 如果找到，他会找脚本文件中第一个目标（target），把目标实现，即生成目标文件
  + 如果目标文件不存在，或者目标文件依赖的.o文件（prerequities）更新（即依赖文件修改时间比目标文件修改时间更新），则会执行目标（target）后面所定义的命令（command）来生成目标文件
  + 如果目标文件依赖的.o文件（prerequities）不存在，则make会找到目标为该.o文件的规则，生成该.o文件，然后重新生成目标文件

```bash
# $ make 
$ make debug
echo hello world! # 隐藏命令加@符号
hello world!
```

### 伪目标

“伪目标” 不是一个具体的文件，而是一个标签。

💡这个“伪目标”的取名不要和文件名重名，否则可能会不执行命令
为了避免和文件重名，可以添加特殊标记 `.PHONY` 来显式的指定一个目标为一个“伪目标”。

```makefile
clean :
  @rm -rfv objs

debug :
  @echo hello

.PHONY: clean
```

### 变量

变量在声明时需要给予初始值，而且在使用时需要使用 `${variable}`/`$(variable)` 格式。

```makefile
cpp := src/main.cpp
obj := objs/main.o

$(obj) : ${cpp}
  @g++ -c $(cpp) -o $(obj)

compile : $(obj)
```

#### 预定义变量/自动变量

变量 | 说明
--- | ---
`$@` | 目标（target）的完整名称
`$*` | 目标（target）的主干部分（即：不包括后缀）
`$%` | 如果目标不是归档文件，则为空；<br>如果目标是归档文件成员，则为对应的成员文件名
`$<` | 第一个依赖文件（prerequisties）的名称
`$^` | 所有的依赖文件（prerequisties）。用空格分开，不包含重复的依赖文件
`$^` | 同 `$^` 但包含重复的文件名
`$?` | 依赖中修改时间晚于目标修改时间的所有文件名。用空格分开
`$|` | 所有order-only依赖文件名

```makefile
cpp := src/main.cpp
obj := objs/main.o

$(obj) : ${cpp}
  @g++ -c $^ -o $@

compile : $(obj)

clean :
  @rm -rfv $(obj)

.PHONY : compile clean
```

```bash
$ make compile 
$ make clean 
removed 'objs/main.o'
```

#### 变量范围

Makefile中的变量一般时全局变量，也就是说定义后可以在Makefile中的任意位置使用。
但也可以将变量指定在某个目标范围内。

```makefile
target ... : variable-assignment
target ... : prerequisites
  recipes
  ...
```

```makefile
var1 = Global Var

%.c: var2 = Some Target Var # 全部 .c 目标能访问

.PHONY: test.c

test.c: var3 = Specific Target Var # 只有该目标能访问
test.c:
  @echo $(var1)
  @echo $(var2)
  @echo $(var3)
```

### 常用符号

#### `=` 链接

+ 链接赋值运算符
+ 用于将右边的值分配给左边的变量
+ **如果后面的语句重新定义了该变量，则将使用新的值**

```makefile
HOST_ARCH   = aarch64
TARGET_ARCH = $(HOST_ARCH)

# 改变变量值
HOST_ARCH   = amd64

debug:
  @echo $(TARGET_ARCH) # amd64
```

#### `:=` 赋值

+ 立即赋值运算
+ 用于在定义变量时立即求值
+ 该值在定义后不再更改
+ 即使在后面的语句中重新定义了该变量

```makefile
HOST_ARCH   := aarch64
TARGET_ARCH := $(HOST_ARCH)

# 改变变量值
HOST_ARCH   := amd64

debug:
  @echo $(TARGET_ARCH) # aarch64
```

#### `?=` 默认

+ 默认赋值运算符
+ 如果该变量已经定义，则不进行任何操作
+ 如果该变量尚未定义，则求值并分配

```makefile
HOST_ARCH    = aarch64
HOST_ARCH   ?= amd64

debug:
  @echo $(HOST_ARCH) # aarch64
```

#### `+=` 累加

```makefile
CXXFLAGS := -m64 -fPIC -g -O0 -std=c++11 -w -fopenmp
CXXFLAGS += $(include_paths)
```

#### `\` 续行

```makefile
LDLIBS := cudart opencv_core \
          gomp nvinfer protobuf cudnn pthread \
          cublas nvcaffe_parser nvinfer_plugin
```

### 常用函数

语法： `$(fn arguments)` or `${fn arguments}`

+ `fn` 函数名
+ `arguments` 函数参数
  + 函数名与参数间以空格 ` ` 分割
  + 参数间以逗号 `,` 分割

#### shell

```makefile
$(shell <command> <arguments>)

# 功能： 调用 shell 命令
# 返回： 函数返回 shell 命令执行结果
```

e.g.

```makefile
cpp_srcs := $(shell find src -name "*.cpp")
```

#### subst

```makefile
$(subst <from>,<to>,<text>)

# 功能： 字符串替换函数。
#       把 <text> 中的 <from> 替换成 <to>
# 返回： 替换结果
```

```makefile
cpp_srcs := $(shell find src -name "*.cpp")
cpp_objs := $(subst src/,objs/,$(cpp_srcs))
```

#### patsubst

```makefile
$(patsubst <pattern>,<replacement>,<text>)

# 功能： 模式字符串替换函数。 
#       从 <text> 中 <pattern> 替换成 <replacement> 
#       支持通配符% —— 表示任意长度的字符串
```

```makefile
cpp_srcs := $(shell find src -name "*.cpp")
cpp_objs := $(patsubst src/%.cpp,objs/%.o,$(cpp_srcs))
```

#### foreach

```makefile
$(foreach <var>,<list>,<text>)

# 功能： 循环函数。
#        把字符串 <list> 中的元素逐一去除，执行 <text> 包含的表达式
# 返回： <text> 所返回的每个字符串组成的字符串（以空格分割）

# 伪代码（python）
# res = ""
# for var in list:
#   res = res + " " + text + var
```

```makefile
library_paths := /datav/shared/100_du/03.08/lean/protobuf-3.11.4/lib \
                 /usr/local/cuda-10.1/lib64

library_paths := $(foreach item,$(library_paths),-L$(item))

# 结果：
# g++ *.cpp -o main -L/datav/shared/100_du/03.08/lean/protobuf-3.11.4/lib -L/usr/local/cuda-10.1/lib64 -L...
```

同等效果

```makefile
I_flag := $(I_flag:%=-I%)
```

#### dir

```makefile
$(dir <names...>)

# 功能： 取目录函数。
#       从文件名序列中取出目录部分。
#       目录部分是指最后一个反斜杠 "/" 之前的部分
#       如果没有反斜杠，则返回 "./"
# 返回： 返回文件名序列的目录部分
```

```makefile
$(dir src/foo.c hacks) # 返回值 "src/ ./"
```

```makefile
cpp_srcs := $(shell find src -name "*.cpp")
cpp_objs := $(patsubst src/%.cpp,objs/%.o,$(cpp_srcs))

objs/%.o : src/%.cpp
  @mkdir -p $(dir $@) # 创建目录
  @g++ -c $^ -o $@

compile : $(cpp_objs)

debug :
  @echo $(cpp_srcs)
  @echo $(cpp_objs)

.PHONY : debug compile
```

#### notdir

```makefile
$(notdir <names...>)
```

```makefile
libs := $(notdir $(shell find /usr/lib -name lib*))
```

#### filter/filter-out

```makefile
$(filter <names...>) # 包含
$(filter-out <names...>) # 排除
```

```makefile
libs    := $(notdir $(shell find /usr/lib -name lib*))
a_libs  := $(filter %.a,$(libs))
so_libs := $(filter %.so,$(libs))
```

#### basename

```makefile
$(basename <names...>)
```

```makefile
libs    := $(notdir $(shell find /usr/lib -name lib*))
a_libs  := $(subst lib,$(basename $(filter %.a,$(libs))))
so_libs := $(subst lib,$(basename $(filter %.so,$(libs))))
```

## 隐式规则

业界约定俗成的规则，如什么场景的变量一般用什么变量名。

### 隐式变量名

变量名 | 说明
--- | ---
CC | 指定C编译程序 <br> Program for compiling C programs; default gcc
CXX | 指定C++编译程序 <br> Program for  compiling C++ programs; default g++
CFLAGS | 传递给C编译程序的额外参数 <br> Extra flags to give to the C compiler
CXXFLAGS | 传递给C++编译程序的额外参数 <br> Extra flags to give to the C++ compiler
CPPFLAGS | 传递给C处理器的额外参数 <br> Extra flags to give to the C preprocessor
LDFLAGS | 传递给链接器的额外参数 <br> Extra flags to give to compiler when they are supposed to invoke the linker

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

## 例子

### 例子：编译参数链接/问题：解决缺少头文件问题

代码

::: details
src/main.cpp

@[code](@code/c/src/demo-make-03/src/main.cpp)

add.hpp

@[code](@code/c/src/demo-make-03/include/add.hpp)

add.cpp

@[code](@code/c/src/demo-make-03/src/add.cpp)
:::

Makefile （错误：缺少头文件路径参数）

@[code](@code/c/src/demo-make-03/Makefile-fail-01-header)

```bash
$ make # 缺失头文件问题
src/add.cpp:1:10: fatal error: add.hpp: No such file or directory
    1 | #include <add.hpp>
      |          ^~~~~~~~~
compilation terminated.
make: *** [Makefile:6: objs/add.o] Error 1
```

Makefile （正确）

@[code](@code/c/src/demo-make-03/Makefile)

### 例子：静态库编译

@[code](@code/c/src/demo-make-03/Makefile-staticlib)

### 例子：动态库编译

@[code](@code/c/src/demo-make-03/Makefile-dynamiclib)

### 例子：嵌套编译

大项目中会分出多个小项目，这时需要使用嵌套（递归）make构建。

具体做法为：

1. 每个子项目都写一个Makefile
1. 写一个总的Makefile调用各子项目Makefile

e.g.

将main.cpp外的其他cpp存为一个子项目，编译为一个库文件。然后将main.cpp作为另一个子项目，编译为.o文件。最后再链接库文件成可执行文件。

todo 完成例子
