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
