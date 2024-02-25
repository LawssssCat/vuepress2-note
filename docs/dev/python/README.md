---
title: Python 使用笔记
---

书：

+ [ ] Python 编程 —— 从入门到实践
+ [ ] Python 编程快速上手 —— 让繁琐工作自动化
+ [ ] Python 极客项目编程

![image.png](https://s2.loli.net/2023/11/20/c9O82XwApqsyuBb.png)

doing 《Python 程序设计入门到实战》 by 何敏煌
todo 《Python 网络编程攻略》 by Dr.M.O.Faruque Sarker
todo 《Python 绝技 —— 运用 Python 成为顶级黑客》 by TJ.O' Connor
todo 《完全学会 Git · Github · Git Server 的 24 堂课》 by 孙宏明

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

## 环境配置

### 编译

源码地址： https://www.python.org/downloads/source/

参考： https://www.cnblogs.com/minseo/p/17817739.html

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
wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz

# 安装依赖
yum -y install make gcc gcc-c++
# 解压
tar -xfv Python-3.12.1.tgz && cd ${_%.*}
# 编译安装
# 默认在 /usr/local | 通过 ./configure --prefix=/usr/local/python3 指定安装目录
./configure
make && make install
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

### （可选）创建虚拟环境

参考：

+ 官方 - https://docs.python.org/3/library/venv.html

```bash
python3 -m venv tutorial_env
source tutorial_env/bin/activate
```

### 模块管理工具 pip

[link](./pip.md)

### 安装 IDE PyCharm

todo ja-netfilter https://zhaiblog.cn/169.html

## 语法

[link](./syntax.md)
