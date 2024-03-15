---
title: Python 使用笔记
---

书：

+ [ ] Python 编程 —— 从入门到实践
+ [ ] Python 编程快速上手 —— 让繁琐工作自动化
+ [ ] Python 极客项目编程

![image.png](https://s2.loli.net/2023/11/20/c9O82XwApqsyuBb.png)

待看：

+ ~~done80% 《Python 程序设计入门到实战》 by 何敏煌~~
+ todo 《Python 网络编程攻略》 by Dr.M.O.Faruque Sarker
+ doing 《Python 绝技 —— 运用 Python 成为顶级黑客》 by TJ.O' Connor
+ todo 《完全学会 Git · Github · Git Server 的 24 堂课》 by 孙宏明
+ todo All Algorithms implemented in Python https://github.com/TheAlgorithms/Python
+ todo Python Examples https://github.com/geekcomputers/Python
+ todo Python 教程 https://github.com/walter201230/Python
+ todo pandas数据分析 ~~https://www.bilibili.com/video/BV1q2421L7XR~~ （Pandas、Seaborn、Numpy、Matplotlib四大Python数据科学必备工具）

---

官网： https://www.python.org/

在线编写Python：

+ tutorialspoint —— <https://www.tutorialspoint.com/codingground.htm>
+ repl.it —— <https://repl.it/languages/python3>

```bash
$ python -c 'print("hello world")'
hello world
```

Python 生态：（完整：<https://en.wikipedia.org/wiki/List_of_Python_software>）

+ 网站后端 —— 框架：Django；产品：Pinterest、Instagram、Disqus、BitTorrent（BT下载器）
+ 图像处理 —— 框架：OpenCV
+ 矩阵运算 —— 框架：NumPy
+ 3D动画 —— Maya 的 Python Script 支持

## 开发环境配置

### 编译

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
# yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc* make -y
# yum -y install make gcc gcc-c++
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

# 编译安装
# 默认在 /usr/local | 通过 ./configure --prefix=/usr/local/python3 指定安装目录
# ./configure
# --prefix 指定了预期安装目录
# --enable-optimizations 优化选项
./configure --prefix=/usr/local/python3.10 --enable-optimizations
# make && make install
make -j8
make install
# rm ln /usr/bin/python3
ln -s /usr/local/python3.10/bin/python3 /usr/bin/python3
ln -s /usr/local/python3.10/bin/pip3 /usr/bin/pip3
```

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

### 模块管理工具 pip

[link](./pip.md)

### 安装 IDE PyCharm

todo ja-netfilter https://zhaiblog.cn/169.html

使用： <https://pycharm.iswbm.com/preface.html>

## 项目环境

### 虚拟环境

Python 有 2 和 3 两个版本，有的项目需要用 2，有的项目需要用 3。为了避免开发上的混淆，设计了 “虚拟环境（Virtual Environment）” 机制。

通过设置不同虚拟环境，可以随意切换 python 环境，且在虚拟环境中安装软件包不需要管理员权限！

#### 使用 Virtualenv

Python 的虚拟环境主要是放在一个文件夹中，通过特定程序来管理该文件夹的软件包以及使用的 Python 解析器版本。目前（2024年2月25日）最常用的虚拟环境管理程序是 virtualenv

```bash
pip install virtualenv
virtualenv <文件夹名称> # 创建文件夹
virtualenv -p /usr/local/bin/python3 <文件夹名称> # 指定版本
```

上面命令会顺道创建文件夹，并在文件夹中创建必要的程序和数据文件。

```bash
虚拟环境
  ├─Lib
  │  └─site-packages
  │      ├─pip
  │      └─pip-24.0.dist-info
  ├─Scripts
  └─pyvenv.cfg

$ cat pyvenv.cfg
home = xxxxxxxxxxx\AppData\Local\Programs\Python\Python312
implementation = CPython
version_info = 3.12.1.final.0
virtualenv = 20.25.1
include-system-site-packages = false
base-prefix = xxxxxxxxxxx\AppData\Local\Programs\Python\Python312
base-exec-prefix = xxxxxxxxxxx\AppData\Local\Programs\Python\Python312
base-executable = xxxxxxxxxxx\AppData\Local\Programs\Python\Python312\python.exe

# source pyvenv.cfg # 当前会话中激活环境
```

```bash
# 进入
$ source bin/active # for linux
$ .\Scripts\activate # for windows

# 退出
$ deactivate
```

#### 使用官方自带虚拟环境

参考：

+ 官方 - https://docs.python.org/3/library/venv.html

```bash
python3 -m venv tutorial_env
source tutorial_env/bin/activate
```

## 语法

[link](./syntax.md)

## 问题

### Non-ASCII character

如果使用的是 Python 2 版，运行 py 程序后可能会出现无法识别非 ASCII 字符的错误信息。

需要在 py 文件的首行加入声明：

```py
# -*- coding: utf-8 -*-
```

e.g.

```py
# -*- coding: utf-8 -*-
import sys

print("系统信息："+sys.version)
```

## 安装模块

参考：

+ todo <https://cloud.tencent.com/developer/article/1524896>
+ todo <https://developer.aliyun.com/article/1011104>

一般用 pip 安装。如果遇到不能用 pip 安装的场景，使用源码中的 setup.py 脚本安装：

```bash

# python setup.py develop
python setup.py build
python setup.py install # build + install | 不会安装该包的相关依赖包

# 其他辅助命令
python setup.py --help-commands 
```

## 常见模块

### 文件系统

在 Python 中操作磁盘文件，有几个内建模块：

+ os.system
+ os.path
+ glob
+ os.walk
+ shutil

#### 模块： os - 系统命令

os 模块是 Python 内置的与操作系统功能和文件系统相关的模块。

##### os.system/os.command

+ os.system 运行系统指令，返回执行状态值。 e.g. 0/1/2/...
+ os.command 运行系统指令，返回命令结果。 e.g. "command not found"

::: tip
该模块中的语句的执行结果通常与操作系统有关，在不同的操作系统上运行，得到的结果可能不一样。
:::

```py
import os
os.system("notepad")
os.startfile("C:\\Program Files\\Tencent\\QQ\\Bin\\qq.exe") # 调用可执行文件
```

目录相关函数 | 说明
--- | ---
`getcwd()` | 返回当前的工作目录
`listdir(path)`
`mkdir(path[,mode])`
`makedirs(path1/path2/...[,mode])`
`rmdir(path)`
`removedirs(path1/path2/...)`
`chdir(path)` | 将 path 设置为当前工作目录
`abspath(path)`
`exists(path)`
`join(path, name)` | 将路径与目录或者文件名拼接起来
`splitext()` | 分离文件名和扩展名
`basename(path)` | 从一个路径中提取文件名
`dirname(path)` | 从一个路径中提取文件路径，不包含文件名
`isdir(path)`

```py
import os
path = os.getcwd()
lst = os.listdir(path)
for filename in lst:
  if filename.endwith('.py')
    print(filename)
```

##### os.path

函数 | 说明
--- | ---
abspath
basename
dirname
exists
getsize
isabs
isfile
isdir
split
splitdrive
join

另外，在 Python 中有内置属性 `__file__` 代表当前所在的程序文件名。通过 `os.path.abspath(__file__)` 可以获得文件所在的目录位置。（💣但是这个属性在python的交互程序中是没有的❗）

##### os.walk

遍历目录，参考 tree

```py
import os
sample_tree = os.walk("sampletree")
for dirname, subdir, files in sample_tree:
  print(dirname)
  print(subdir)
  print(files)
  print()

# sampletree
# ['a', 'b']
# ['f1','f2']
#
# sampletree/a
# []
# []
#
# sampletree/b
# []
# ['f1']
```

```py
# 列出当前目录下所有文件
for dirname, subdir, files in os.walk("./"):
  for filename in files:
    print(os.path.abspath(os.path.join(dirname, filename)))
```

#### 模块： glob - 文件列表

```py
import glob
files = glob.glob(path) # 获取路径列表
for f in files:
  print(f)
```

#### 模块： shutil - 文件操作

函数 | 说明
--- | ---
`copyfile(s,d)` | 复制s到d，不包含属性
`copy(s,d)` | 复制s到d，包含文件权限属性
`copy2(s,d)` | 复制s到d，包含所有文件属性
`copytree(s,d)`
`rmtree(p)`
`move(s,d)`


#### 模块： IO流 - 文件读写

```py
# file = open(filename, [, mode, encoding])

file = open('a.txt', 'r')
print(file.readlines())
file.close()

# write/read

src_file = open("logo.png", "rb")
tar_file = open("copylogo.png", "wb")
tar_file.write(src_file.read())
tar_file.close()
src_file.close()
```

::: tip
文件类型： 按文件中数据的组织形式，文件分为两大类：

1. 文本文件 —— 存储的是普通 “字符” 文本，默认为 unicode 字符集。
1. 二进制文件 —— 把数据内容用 “字节” 进行存储，无法用笔记本打开，如：mp3、jpg、doc、...
:::

文件打开模式 | 描述
--- | ---
r | 以只读模式打开文件。文件的指针将会放在文件的开头。
w | 以只写模式打开文件。如果文件不存在则创建；如果文件存在则覆盖原有内容，文件指针在文件的开头。
a | 以追加模式打开文件。如果文件不存在则创建，文件指针在文件开头；如果文件存在则在文件末尾追加内容，文件指针在原文件末尾。
b | 以二进制方式打开文件。不能单独使用，需要与其他模式一起使用，如：`rb`、`wb`、...
\+ | 以读写方式打开文件。不能单独使用，需要与其他模式一起使用，如：`a+`

文件对象的常用方法 | 说明
--- | ---
`read([size])`
`readline()`
`readlines()`
`write(str)`
`writelines(s_list)`
`seek(offset[,whence])` | 把文件指针移到最新的位置。<br> offset 表示相对于 whence 的位置。<br><br> whence 不同值代表的不同含义： <ul><li>0: 从文件头开始计算（默认） </li><li>1: 从当前位置开始计算</li><li>2: 从文件尾开始计算</li></ul>
`tell()` | 返回文件指针的当前位置
`flush()` | 把缓冲区的内容写入文件，但不关闭文件
`close()` | 把缓冲区的内容写入文件，且关闭文件，释放文件对象相关资源

## 项目打包

参考：

+ todo 花了两天，终于把 Python 的 setup.py 给整明白了 - <https://zhuanlan.zhihu.com/p/276461821>
+ todo <>https://zhuanlan.zhihu.com/p/128020789

Python 项目打包工具很成熟。如 disutils、 distutils 、distutils2、setuptools等等。
下面介绍他们的关系。

### distutils （包分发的始祖）

distutils 是 Python 的一个标准库，从命名上很容易看出它是一个分发（distribute）工具（utlis）。
它是 Python 官方开发的一个分发打包工具，所有后续的打包工具，全部都是基于它进行开发的。

distutils 的精髓在于编写 setup.py，它是模块分发与安装的指导文件。
比如下面这条命令就是用它来进行模块的安装： `python setup.py install`。
（这样的安装方法是通过源码安装，与之对应的是通过二进制软件包的安装。）

### setuptools/distribute

setuptools 是 distutils 增强版，不包括在标准库中，但大部分 Python 用户都会使用更先进的 setuptools 模块。

::: tip
distribute 是 setuptools 有一个分支版本，分支的原因可能是有一部分开发者认为 setuptools 开发太慢了。
但现在，distribute 又合并回了 setuptools 中。
因此，我们可以认为它们是同一个东西。
:::

```bash
###################
# setuptools 安装 #
###################

# 方式一：
# 下载压缩包： https://pypi.org/project/setuptools/#files
# 安装： 
python setup.py install

# 方式二：通过引导程序安装
wget http://peak.telecommunity.com/dist/ez_setup.py
python ez_setup.py

###################
# setuptools 更新 #
###################

# 方式一：
python ez_setup.py –U setuptools
# 方式二：
pip install -U setuptools
```

#### easy_install

文档： https://setuptools.pypa.io/en/latest/easy_install.html

安装完 setuptools 后，可以使用名叫 easy_install 的第三方管理工具。

```bash
#########
# 镜像源
#########
# 编辑配置文件 /root/.pydistutils.cfg
[easy_install]
index-url=http://mirrors.aliyun.com/pypi/simple/
find-links=http://mirrors.aliyun.com/pypi/simple/

#########
# 安装
#########

# 通过包名，从PyPI寻找最新版本，自动下载、编译、安装
$ easy_install pkg_name

# 通过包名从指定下载页寻找链接来安装或升级包
$ easy_install -f http://pythonpaste.org/package_index.html 

# 指定线上的包地址安装
$ easy_install http://example.com/path/to/MyPackage-1.2.3.tgz

# 从本地的 .egg 文件安装
$ easy_install xxx.egg

# 在安装时你可以添加额外的参数
# 指定安装目录：--install-dir=DIR, -d DIR
# 指定用户安装：--user

#########
# 升级
#########

# 从 pypi 中搜索并升级包
$ easy_install --upgrade pkg_name

# 指定版本进行升级
$ easy_install "SomePackage==2.0"

#########
# 卸载
#########

$ easy_install -m pkg_name
# 注意：这样的删除仅在 easy-install.pth 文件中删除，使 python 不能使用该模块。但实际的包还在电脑中，若要删除彻底，需要手动删除相关的 .egg 及其他文件。
```

todo https://zhuanlan.zhihu.com/p/276461821

### Pyinstaller

编译 py 文件生成 exe 文件

```bash
# 安装工具
pip install PyInstaller
# 生成 exe 文件
pyinstaller -F stusystem.py # stusystem.exe
```

## 场景

### 去重

方式一（低效）

```py
s = "asfj;lenlbans;fisajf;sacxzv"
n = "" # or [] and append
for t in s:
    if t not in n:
        n = n + t
print(n)
```

方式二：set（推荐，但是乱序）

```py
print(set("sdfsfsfasfsdfs"))
```

### 字符串解析

#### array

```py
# string -> array
# filedata <--> {1: 82, 2: 22, 3: 99}
import ast
ast.literal_eval(filedata)
```

#### json

```py
import json, datetime

fp = open('earthquake.json', "r")
earthquakes = json.load(fp)

print("过去 7 天全球发生重大的地震信息：")
for eq in earthquakes['features']:
  print("地点：{}".format(eq['properties']['place']))
  print("震级：{}".format(eq['properties']['mag']))
  et = eq['properties']['time'] / 1000.0
  d = datetime.datetime.fromtimestamp(et). \
  strftime('%Y-%m-%d %H:%M:%S')
  print("时间：{}".format(d))
```

### 中文

todo 中文分词模块 jieba

### 图像绘制

todo matplotlib, pillow

### 日志装饰器

```py
def logger(func):
  def wrapper(*args):
    print("--------------")
    func(*args)
    print("--------------")
  return wrapper

def add(x,y):
  print('{} + {} = {}'.format(x,y,x+y))

te = logger(add)
te(1,1)

# 输出：
# --------------
# 1 + 1 = 2
# --------------
```

语法糖 `@装饰器方法`

```py
def logger(func):
  def wrapper(*args):
    print("--------------")
    func(*args)
    print("--------------")
  return wrapper

@logger
def add(x,y):
  print('{} + {} = {}'.format(x,y,x+y))

add(1,1)

# 输出：
# --------------
# 1 + 1 = 2
# --------------
```

### 数据库

#### sqlite

```py
import sqlite3 

# 连
conn = sqlite3.connect('scores.sqlite')

# 存
conn.execute('insert into student values(1, "王小明");')
conn.commit()

# 取
cursor = conn.execute('select * from student;')
for row in cursor:
  print("No {}: {}".format(row[0], row[1]))

# 关
conn.close()
```

### 网络请求

```py
import requests
www = requests.get("http://mobile.sina.com.cn/")
print(www.text)
```

爬虫 [link](./python-network.md)

### Facebook graph api

todo

```bash
pip install facebook-sdk
```

### Web 框架

todo Django

todo 部署

+ ngrok —— 代理本地网络到外网访问，测试用
+ cloud9 ide —— 云工作空间
+ DigitalOcean —— 云虚拟机
+ Heroku —— 云计算服务
