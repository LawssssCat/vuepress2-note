---
title: PIP 使用笔记
tags:
  - python
---

## PIP 安装

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

参考：

+ python3 安装pip <https://blog.csdn.net/lsx6766/article/details/88106114>

方式一：

```bash
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
$ sudo python get-pip.py    # 运行安装脚本
```

方式二：先setuptools,再pip （2024年2月24日 报错）

```bash
# --no-check-certificate
wget https://pypi.python.org/packages/source/s/setuptools/setuptools-19.6.tar.gz#md5=c607dd118eae682c44ed146367a17e26
tar -zxvf setuptools-19.6.tar.gz
cd setuptools-19.6
python3 setup.py build
sudo python3 setup.py install

# --no-check-certificate
wget https://pypi.python.org/packages/source/p/pip/pip-8.0.2.tar.gz#md5=3a73c4188f8dbad6a1e6f6d44d117eeb
tar -zxvf pip-8.0.2.tar.gz
cd pip-8.0.2
python3 setup.py build
sudo python3 setup.py install
```
:::

方式三： ？？？

```bash
python -m ensurepip --default-pip
```

## PIP 基本使用

```bash
python -m pip --version
pip --help
pip install -U pip # 升级

pip install SomePackage              # 最新版本
pip install SomePackage==1.0.4       # 指定版本
pip install 'SomePackage>=1.0.4'     # 最小版本
pip install --upgrade SomePackage # 升级
pip install -U SomePackage # 升级
pip uninstall SomePackage # 卸载

pip search SomePackage # 搜索
pip show # 安装包信息
pip show -f SomePackage # 安装包详情
pip list # 列出已安装包
pip list -o # 列出可升级安装包
pip freeze # 同 list，但输出格式不同
pip freeze > requirements.txt # 常用于导出当前环境的外加模块名称和版本，以便其他环境了解程序使用了哪些模块。一般存放在项目目录 requirements.txt 中
pip install -r requrements.txt
```

### 搜索可用包版本

```bash
# 旧版
$ pip install ansible==
Defaulting to user installation because normal site-packages is not writeable
ERROR: Could not find a version that satisfies the requirement ansible== (from versions: 1.0, 1.1, 1.2, 1.2.1, 1.2.2, 1.2.3,... 9.1.0, 9.2.0, 9.3.0)
ERROR: No matching distribution found for ansible==

# 新版： index 命令
$ pip index versions ansible
WARNING: pip index is currently an experimental command. It may be removed/changed in a future release without prior warning.
ansible (9.3.0)
Available versions: 9.3.0, 9.2.0, 9.1.0, 9.0.1, 8.7.0, 8.6.1, 8.6.0, 8.5.0, 8.4.0, ..., 1.5, 1.4.5, 1.4.4, 1.4.3, 1.4.2, 1.4.1, 1.4, 1.3.4, 1.3.3, 1.3.2, 1.3.1, 1.3.0, 1.2.3, 1.2.2, 1.2.1, 1.2, 1.1, 1.0
$ pip -V
pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)
```

```bash
# ⚠️已停用
$ pip search

# 搜索包
$ pip install pip-search
$ pip_search numpy
$ python3 -m pip_search numpy
                                         🐍 https://pypi.org/search/?q=numpy 🐍
┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Package                ┃ Version           ┃ Released   ┃ Description                                                ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ 📂 numpy               │ 1.26.4            │ 05-02-2024 │ Fundamental package for array computing in Python          │
│ 📂 numpy1              │ 0.0.1             │ 24-01-2021 │ Python                                                     │
│ 📂 topas2numpy         │ 0.2.0             │ 19-05-2017 │ Python functions for reading TOPAS result files            │
│ 📂 numpy-serializer    │ 0.1.3             │ 24-12-2020 │ Preserve numpy arrays shapes while serializing them to     │
│                        │                   │            │ bytes                                                      │
│ 📂 mapchete-numpy      │ 0.1               │ 01-02-2017 │ Mapchete NumPy read/write extension                        │
│ 📂 gdal2numpy          │ 0.0.283           │ 01-03-2024 │ An utils functions package                                 │
│ 📂 numpy-onlinestats   │ 0.1.0             │ 07-08-2023 │ Online statistics for Numpy arrays.                        │
│ 📂 video2numpy         │ 2.3.3             │ 11-09-2023 │ Video reading into numpy                                   │
│ 📂 numpy-ringbuffer    │ 0.2.2             │ 28-06-2022 │ Ring buffer implementation for numpy                       │
│ 📂 numpy-cursor        │ 1.0.5             │ 26-04-2023 │ This package contains a Python implementation of a cursor  │
│                        │                   │            │ for NumPy matrices. The cursor allows you to conveniently  │
│                        │                   │            │ move through a matrix and read or modify its values.       │
│ 📂 pydantic_numpy      │ 4.2.0             │ 24-02-2024 │ Pydantic Model integration of the NumPy array              │
│ 📂 concrete-numpy      │ 0.11.1            │ 28-02-2023 │ Concrete Numpy is an open-source library which simplifies  │
│                        │                   │            │ the use of fully homomorphic encryption (FHE).             │
│ 📂 serde-numpy         │ 0.3.0             │ 15-06-2023 │ A library for deserializing various formats directly into  │
│                        │                   │            │ numpy arrays                                               │
│ 📂 numpy-quaternion    │ 2023.0.3          │ 12-03-2024 │ Add a quaternion dtype to NumPy                            │
│ 📂 numpy-mips64        │ 1.17.4            │ 10-12-2019 │ NumPy is the fundamental package for array computing with  │
│                        │                   │            │ Python.                                                    │
│ 📂 sqlite-numpy        │ 0.2.1             │ 28-02-2020 │ Fast SQLite to numpy array loader                          │
│ 📂 numpy-ml            │ 0.1.2             │ 20-06-2020 │ Machine learning in NumPy                                  │
│ 📂 audio2numpy         │ 0.1.2             │ 21-08-2019 │ Load audio file to numpy array                             │
│ 📂 numpy-ext           │ 0.9.9             │ 07-12-2023 │ numpy extension                                            │
│ 📂 numpy-user-1-11-0   │ 2024.3.1.0        │ 01-03-2024 │ numpy-user-1.11.0                                          │
│ 📂 numpy-posit         │ 1.15.2.0.0.1.dev2 │ 25-09-2018 │ posit (unum type III) integrated NumPy.                    │
│ 📂 pdb-numpy           │ 0.0.2             │ 20-11-2023 │ Pdb_Numpy is a python library allowing simple operations   │
│                        │                   │            │ on pdb coor files.                                         │
│ 📂 hypothesis-numpy2   │ 0.1.2             │ 12-04-2020 │ Provides strategies for generating various `numpy` objects │
│ 📂 mlphys-numpy        │ 1.0.4             │ 14-02-2023 │ Machine Learning for Physical Sciences                     │
│ 📂 numpy-io            │ 0.0.10            │ 22-10-2023 │ an easy training architecture                              │
│ 📂 numpy-cloud         │ 0.0.5             │ 05-11-2018 │ Numpy in the cloud                                         │
│ 📂 numpy-sugar         │ 1.5.4             │ 23-01-2023 │ Missing NumPy functionalities                              │
│ 📂 numpy-camera        │ 0.0.2             │ 12-07-2020 │ ???                                                        │
│ 📂 numpy-illustrated   │ 0.3.1             │ 16-06-2023 │ Helper functions from the NumPy Illustrated guide          │
│ 📂 numpy-dataframe     │ 0.1.7             │ 23-05-2023 │ A simple dataframe implementation using numpy as its basic │
│                        │                   │            │ element                                                    │
│ 📂 numpy-financial     │ 1.0.0             │ 18-10-2019 │ Simple financial functions                                 │
│ 📂 BSON-NumPy          │ 0.1               │ 15-02-2017 │ Module for converting directly from BSON to NumPy ndarrays │
│                        │                   │            │ and vice versa                                             │
│ 📂 numpy2tfrecord      │ 0.0.3             │ 26-03-2023 │ Convert a collection of numpy data to tfrecord             │
│ 📂 nn-numpy            │ 0.0.1             │ 08-12-2019 │ A package which contains a simple implementation of neural │
│                        │                   │            │ network with numpy                                         │
│ 📂 numpy-allocator     │ 1.2.0             │ 25-11-2022 │ Configurable memory allocations                            │
│ 📂 numpy-linreg        │ 0.1.2             │ 27-04-2021 │ Linear Regression with numpy only.                         │
│ 📂 preconvert_numpy    │ 0.0.3             │ 29-07-2019 │ Preconverts common numpy types to their serializable       │
│                        │                   │            │ (jsonifiable, msgpackable, etc...) form.                   │
│ 📂 numpy-ros           │ 0.1.3             │ 22-06-2021 │ Seamlessly convert between ROS messages and NumPy arrays.  │
│ 📂 concretefhe-numpy   │ 0.0.10            │ 21-09-2021 │ Concrete numpy for the Concrete Framework                  │
│ 📂 numpy-ops1234567890 │ 1.0.0             │ 31-12-2022 │ A simple package to do numpy power operation               │
└────────────────────────┴───────────────────┴────────────┴────────────────────────────────────────────────────────────┘
```

## PIP 更换镜像源

```bash
# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
# 永久使用
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## PyPI 网站

https://pypi.python.org/pypi

几乎所有主流的软件包都集中在这里
