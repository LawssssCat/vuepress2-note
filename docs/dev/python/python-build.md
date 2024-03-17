---
title: python 编译/升级
---

## 编译


源码地址： https://www.python.org/downloads/source/

参考： https://www.cnblogs.com/minseo/p/17817739.html

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

# 默认在 /usr/local | 通过 ./configure --prefix=/usr/local/python3 指定安装目录
# ./configure
# --prefix 指定了预期安装目录 | 所有文件放在一个目录下
#          若不配置，默认比较凌乱
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
