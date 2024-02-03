---
title: Python 使用笔记
---

```bash
$ python -c 'print("hello world")'
hello world
```

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
tar -xf Python-3.11.6.tgz 
# 编译安装
# 默认在 /usr/local | 通过 ./configure --prefix=/usr/local/python3 指定安装目录
./configure
make && make install
```

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

### 安装 pip 安装器

::: tip
Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具
:::

参考： 

+ 官方 - https://docs.python.org/zh-cn/3.11/library/ensurepip.html
+ [安装pip的三种方法](https://www.jianshu.com/p/96bfccc7c680)

```bash
python -m ensurepip
```

在默认情况下，pip 会被安装到当前虚拟环境（如果激活了虚拟环境）或系统的包目录（如果未激活虚拟环境）。 安装位置可通过两个额外的命令行选项来控制:

+ `--rootdir`: 相对于给定的根目录而不是当前已激活虚拟环境（如果存在）的根目录或当前 Python 安装版的默认根目录来安装 pip。
+ `--user`: 将 pip 安装到用户包目录而不是全局安装到当前 Python 安装版（此选项不允许在已激活虚拟环境中使用）。


::: danger
旧版安装方式

```bash
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
$ sudo python get-pip.py    # 运行安装脚本
```
:::

基本使用

```bash
python -m pip --version
pip --help
pip install -U pip # 升级

pip install SomePackage              # 最新版本
pip install SomePackage==1.0.4       # 指定版本
pip install 'SomePackage>=1.0.4'     # 最小版本
pip install --upgrade SomePackage # 升级
pip uninstall SomePackage # 卸载

pip search SomePackage # 搜索
pip show # 安装包信息
pip show -f SomePackage # 安装包详情
pip list # 列出已安装包
pip list -o # 列出可升级安装包
```

更换镜像源

```bash
# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
# 永久使用
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```
