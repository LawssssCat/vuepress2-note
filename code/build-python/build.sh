#!/bin/bash

# 安装依赖
# yum groupinstall -y 'Development Tools'
yum install wget
yum install gcc make # gcc* gcc-c++
# yum install python-devel
# yum install libuuid-devel
# yum install mysql-devel
# yum install openssl-devel
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
tar -xzf Python-3.10.1.tgz
cd Python-3.10.1

# Modules —— 模块，如：import _ctypes
ls -l Modules

PYTHON_HOME=$(mktemp -d)
./configure --prefix=$(PYTHON_HOME)
make

: <<COMMENT
[root@lpc19 Python-3.10.1]# yum list --installed | grep devel
glibc-devel.x86_64                       2.38-16.fc39               @updates
libxcrypt-devel.x86_64                   4.4.36-2.fc39              @fedora
ncurses-devel.x86_64                     6.4-7.20230520.fc39        @fedora
readline-devel.x86_64                    8.2-6.fc39                 @updates

make

...

/mnt/c/my/workspace/project/vuepress2-note/code/build-python/Python-3.10.1/Modules/_ctypes/_ctypes.c:107:10: fatal error: ffi.h: No such file or directory
  107 | #include <ffi.h>
      |          ^~~~~~~
compilation terminated.

Python build finished successfully!
The necessary bits to build these optional modules were not found:
_bz2                  _dbm                  _gdbm
_hashlib              _lzma                 _sqlite3
_ssl                  _tkinter              _uuid
nis                   zlib
To find the necessary bits, look in setup.py in detect_modules() for the module's name.


The following modules found by detect_modules() in setup.py, have been
built by the Makefile instead, as configured by the Setup files:
_abc                  pwd                   time


Failed to build these modules:
_ctypes


Could not build the ssl module!
Python requires a OpenSSL 1.1.1 or newer
COMMENT
