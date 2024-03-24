---
title: python 编译/升级
---

## 编译


源码地址： https://www.python.org/downloads/source/

参考： 

+ https://devguide.python.org/getting-started/setup-building/

::: warning
不要手贱：
centos8版本等系统一般都会自带集成python3及python版本，供系统底层调用。
不要删除系统中的python旧版本及其目录结构，避免系统依赖出错。
新版本安装到新地址，安装完后把系统中相关配置指向新版本所在目录，做相关配置即可。
:::

```bash
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
$ uname -a
Linux fedora 6.5.6-300.fc39.x86_64 #1 SMP PREEMPT_DYNAMIC Fri Oct  6 19:57:21 UTC 2023 x86_64 GNU/Linux
```

```bash
# 安装依赖
# yum install -y zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc* make
# yum install -y make gcc gcc-c++
# yum install -y openssl-devel bzip2-devel libffi-devel
# yum groupinstall -y 'Development Tools'
yum install wget gcc make readline-devel
# 解决 import bz2 报错
yum install  bzip2-devel
# 解决 import curses 报错
yum install  ncurses-devel
# 解决 import sqlite3 报错
yum install sqlite-devel
# 解决 _dbm _gdbm 缺失提醒
yum install gdbm-devel
# 解决 _lzma 缺失提醒
yum install xz-devel
# 解决 _tkinter 缺失提醒
yum install tk-devel
# 解决 readline 缺失提醒及方向键行为非预期的问题
yum install readline-devel
yum install zlib-devel
# 解决 ImportError: No module named ‘_ctypes’ 错误
yum install libffi-devel

wget https://www.python.org/ftp/python/3.10.1/Python-3.10.1.tgz
# wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz
# 解压
# tar -xfv Python-3.12.1.tgz && cd ${_%.*}
tar xvf Python-3.10.1.tgz

###############
# 编译/安装
###############

# make clean
# make distclean # 清理全部，包括 ./configure 生成的 Makefile 相关文件

# ./configure
# --prefix 指定安装目录，这样的话所有文件将放在一个目录下，方便安装、下载
#          若不配置默认在 /usr/local 目录（比较凌乱，与程序其他共享）
#          + 可执行文件   —— /usr/local/bin
#          + 库文件       —— /usr/local/lib
#          + 配置文件     —— /usr/local/etc
#          + 其他资源文件 —— /usr/local/share
# --enable-optimizations 优化选项（LTO,PGO 等）。加上这个 flag 编译后，性能有 10% 左右的优化，但是这会明显的增加编译时间
./configure --prefix=/usr/local/python3.10 --enable-optimizations
# make && make install
make -j8
make install

###############
# 环境变量
###############

# 需要管理员权限
# ./configure --prefix=/usr/local/python3.10 --enable-optimizations
# rm ln /usr/bin/python3
ln -s /usr/local/python3.10/bin/python3 /usr/bin/python3
ln -s /usr/local/python3.10/bin/pip3 /usr/bin/pip3

# 不需要管理员权限
PATH=/usr/local/python3.10/bin/:$PATH
```

#### 问题： 多线程编译

参考：

+ Compiling Python from source: multiple threads for tests?
https://stackoverflow.com/questions/49793880/compiling-python-from-source-multiple-threads-for-tests

```bash
make PROFILE_TASK="-m test.regrtest --pgo -j8" -j8
```

#### 问题： 跳过测试

参考：

+ Make (install from source) python without running tests | https://stackoverflow.com/questions/44708262/make-install-from-source-python-without-running-tests

`--enable-optimizations` 听说加了这个参数会优化新能，但会开启一堆测试，增加几倍的编译时间。

有没有既要也要的办法？

```bash
make -j8 build_all # 只编译，不测试。 me：这样相当于没开--enable-optimizations
make -j8 altinstall
```

#### 问题： python3.10编译安装报SSL失败解决方法

💡 python3.10编译安装报SSL失败解决方法： <https://blog.csdn.net/mdh17322249/article/details/123966953>

::: details
说明： python3.10之后版本不在支持libressl使用ssl，需要使用openssl安装来解决编译安装

编译、安装、配置 openssl

```bash
# 编译、安装
wget https://www.openssl.org/source/openssl-1.1.1w.tar.gz
tar -zxvf openssl-1.1.1w.tar.gz
cd openssl-1.1.1w
# ./config
./config --prefix=/usr/local/openssl
make 
make install

# 修改链接文件
mv /usr/bin/openssl /usr/bin/openssl.bak
ln -sf /usr/local/openssl/bin/openssl /usr/bin/openssl

# 添加路径至ld.so.conf
## 路径最后不带“/”，否则报错
echo "/usr/local/openssl/lib" >> /etc/ld.so.conf
ldconfig -v

openssl version
```

修改Python编译源文件的Module/Setup链接，修改如下： （每个人的文件可能不一样，以自己的为准）

1. 第211行路径修改为OpenSSL编译的路径
1. 第212-214解除注释

```make
210 # socket line above, and edit the OPENSSL variable:
211  OPENSSL=/usr/local/openssl
212  _ssl _ssl.c \
213      -I$(OPENSSL)/include -L$(OPENSSL)/lib \
214      -lssl -lcrypto
```
:::

```bash
$ python3 --version
Python 3.11.5
```

#### 问题： --enable-shared

```bash
./configure --prefix=/home/steven/python-2.7 --enable-shared
```

在大多数 Unix 系统上（除了 Mac OS X 之外），共享库的路径不是绝对路径。 
因此，如果我们在非标准位置安装 Python，为了不和相同版本的系统 Python 产生干扰，我们需要配置非标准位置安装的 Python共享库的路径，或者通过设置运行时的环境变量，
如 `LD_LIBRARY_PATH`。

或者配置编译选项时加上 `LDFLAGS=-Wl,-rpath=<path>` 参数

```bash
# LDFLAGS=-Wl,<options...> 链接配置
# -rpath=<path> 运行时的动态链接库位置
./configure --enable-shared --prefix=/opt/python LDFLAGS=-Wl,-rpath=/opt/python/lib
```

#### 问题： 安全编译选项

```bash
# 编译选项： 使用 CFLAGS 或者 CFLAGS_NODIST 都可以
CFLAGS_NODIST="${CFLAGS_NODIST} -fPIC"
CFLAGS_NODIST="${CFLAGS_NODIST} -fstack-protector-strong"
export CFLAGS_NODIST

# 链接选项： 必须使用 LDFLAGS_NODIST
# 💡在 Makefile 中 LDFLAGS 和 LDFLAGS_NODIST 都有使用（重复使用不影响），但是如果仅使用 LDFLAGS 带入参数，则 Makefile 在调用 setup.py 编译四个模块时，无法读取到传入的 LDFLAGS 值（因为没有去读取 LDFLAGS，只读了 LDFLAGS_NODIST）。
LDFLAGS_NODIST="${LDFLAGS_NODIST} -Wl,-z,relro"
LDFLAGS_NODIST="${LDFLAGS_NODIST} -Wl,-z,now"
LDFLAGS_NODIST="${LDFLAGS_NODIST} -Wl,-z,noexecstack"
export LDFLAGS_NODIST

# 链接python的bin文件的专用选项： 使用 LINKFORSHARED 通过执行 ./configure 读取 Makefile 中的 LINKFORSHARED 传入
# 💡该选项不同系统不同。
# 选项 for SUSE Linux Enterprise Server 12 SP2
LINKFORSHARED="${LINKFORSHARED} -Xlinker -export-dynamic"
# 💡解释：为什么 pie 编译选项放在这里传入
#         若通过 LDFLAGS 或 LDFLAGS_NODIST 传递的话，会在编译 os 是用到，导致编译 os 报错（这个选项不能用于动态库的编译）
#         所以将该选项加到了 LINKFORSHARED 中
LINKFORSHARED="${LINKFORSHARED} -Xlinker -export-dynamic"
export LINKFORSHARED

./config --enable-optimizations --enable-shared --with-ssl --prefix=/opt/python LDFLAGS=-Wl,-rpath=/opt/python/lib
```

## 静态编译

参考：

+ <https://wiki.python.org/moin/BuildStatically>

```bash
$ ./configure LDFLAGS="-static" --disable-shared
# LINKFORSHARED=“ ” 阻止将 -export-dynamic 传递给链接器，这将导致二进制文件被构建为动态链接的可执行文件。您可能需要其他标志才能成功生成。
$ make LDFLAGS="-static" LINKFORSHARED=" "
```

### 问题： Glibc 的问题，Musl libc 的使用

参考：

+ <https://linuxstory.org/musl-libc-yet-another-libc/>

Python 依赖 Glibc。Glibc 存在很多问题：

+ 源码可读性差
+ 性能差
+ 体积大
+ 对静态链接支持不佳 【重点】

理论上来说，Glibc 是支持静态链接的。
但，这也仅仅是从理论上来说，由于一些历史遗留问题（当然，也包括对功能实现的考虑）Glibc 的静态链接并不是真正的静态链接：
如果你的程序中使用了某些不支持静态链接的特性（这一点在大型软件中非常常见），那么即便你在链接时选择静态链接，生成出来的程序实际上仍然是依赖于 Glibc 动态库的，一旦你尝试删除掉它，你立马就会发现这些“静态”链接的程序统统罢工不干了。

解决上 Glibc 述问题，可使用 Musl （Musl + Busybox）。
Musl 从设计之初就很关注静态链接的可用性，因此它完全可以被静态链接进其他程序中，不存在 Glibc 对动态库的依赖问题。

### 编译

参考：

+ <http://main.lv/writeup/compile_python.md>
+ maddouri/build-static-python.sh | <https://gist.github.com/maddouri/c4b97474f21fabc9ef61> 
A simple script that builds static versions of Python and LibPython using musl-libc
+ Compiling Python and LibPython Statically Using Musl-Libc | <https://web.archive.org/web/20180926104719/http://general-purpose.io/2015/12/06/compiling-python-and-libpython-statically-using-musl-libc/>
+ todo <https://askubuntu.com/questions/63711/building-a-static-version-of-python>
+ todo <https://github.com/bendmorris/static-python>

```bash
#!/bin/bash
# set -eux

# This a simple script that builds static versions of Python and LibPython using musl-libc
# Find the associated article at: http://general-purpose.io/2015/12/06/compiling-python-and-libpython-statically-using-musl-libc/

WORKING_DIR="/code/static-python"
MUSL_PREFIX="/code/static-python/musl"
PY_PREFIX="/code/static-python/python"

# COMPILER="gcc"
# COMPILER_VERSION="4.8"
COMPILER="clang"
COMPILER_VERSION="3.7"

# make the compiler's actual command name
export CC="${COMPILER}-${COMPILER_VERSION}"

# prepare the working directory
mkdir --parents "${WORKING_DIR}"

# download/extract/build static musl libc
cd "${WORKING_DIR}"
wget "http://www.musl-libc.org/releases/musl-1.1.12.tar.gz"
tar -xzf musl-1.1.12.tar.gz
cd musl-1.1.12
./configure --prefix="${MUSL_PREFIX}" --disable-shared
make
make install

# enable the "musl compiler"
export CC="${MUSL_PREFIX}/bin/musl-${COMPILER}"

# download/extract/build static python/libpython
cd "${WORKING_DIR}"
wget "https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tar.xz"
tar -xJf Python-3.5.0.tar.xz
cd Python-3.5.0
./configure --prefix="${PY_PREFIX}" --disable-shared  \
            LDFLAGS="-static" CFLAGS="-static" CPPFLAGS="-static"
make
make install

# done ! (ignore any error that might happen during "make install")
# we now have:
#   ${MUSL_PREFIX}/bin/musl-gcc       : "static gcc" that uses musl
#   ${PY_PREFIX}/bin/python3.5        : static python interpreter
#   ${PY_PREFIX}/lib/libpython3.5m.a  : static libpython
#   ${PY_PREFIX}/include/python3.5m   : include directory for libpython
```

## 升级

```bash
# python -m ensurepip --default-pip # 安装pip
pip install --upgrade python
pip install --upgrade python==3.x.x
pip install --upgrade python==3.11.4 -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
python --version
```

```bash
# 问题： 无版本
$ pip install --upgrade python
Defaulting to user installation because normal site-packages is not writeable
ERROR: Could not find a version that satisfies the requirement python (from versions: none)
ERROR: No matching distribution found for python
```

或源码编译、安装、环境配置 （需要注意编译异常和编译选项风险）
