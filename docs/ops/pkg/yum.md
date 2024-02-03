---
title: Yum 使用笔记
tags:
  - yum
  - dnf
---

centos 系列在用。

开始叫 yum，以后叫 dnf。 todo 改名目的

## 配置镜像源

```bash
# 查看系统有哪些可用的yum源
yum repolist all

# 下载镜像源配置
wget -p /etc/yum.repo.d/  http://mirrors.aliyun.com/repo/Centos-7.repo

# 清理包列表缓存
yum clean all 
# 构建包列表缓存
yum makecache
yum repolist 

# 指定本地源安装rpm包
yum install <package-name> --enablerepo=<repository>
yum localinstall <package-name> --enablerepo=<repository>
```

## 场景：内网离线安装软件包

### 下载 RPM 包及相关依赖并保存到本地

#### 一、 downloadonly

yum 命令本身就可以用来下载一个 RPM 包，标准的 yum 命令提供了 `--downloadonly` （只下载）的选项来达到这个目的。

::: tip
在 CentOS/RHEL6 或更早期的版本中，你需要安装一个单独 yum 插件(名称为 `yum-plugin-downloadonly`)才能使用 `--downloadonly` 命令选项
:::

::: tip
如果下载的包包含了任何没有满足的依赖关系，yum 将会把所有的依赖关系包下载，但是都不会被安装。
:::

```bash
yum install --downloadonly <package-name>
```

默认情况下，一个下载的 RPM 包会保存在 `/var/cache/yum/x86_64/[centos/fedora-version]/[repository]/packages` 中

```bash
yum install --downloadonly --downloaddir=<directory> <package>
yum install --downloadonly --downloaddir=./python python
yum reinstall --downloadonly --downloaddir=./python python
```

#### 二、 yumdownloader

yumdownloader 是 yum 工具包(包含了用来进行 yum 包管理的帮助工具套件)的子集。

下载的包会被保存在当前目录中，你需要使用root权限，因为yumdownloader会在下载过程中更新包索引文件。

```bash
yum install yum-utils

# --resolve 依赖包也会被下载
# --enablerepo=<repository> 指定yum源
yumdownloader <package-name> --resolve --enablerepo=[repo]

# --destdir 相关依赖的保存路径
yumdownloader --resolve --destdir /tmp/rpms/maven maven

# --enablerepo 指定yum源
yumdownloader --enablerepo=elrepo-kernel --resolve --destdir=/tmp kernel-lt   
```

#### 三、 repotrack 

这个比较狠，会下载全量的依赖包，也就是说：将主软件、主软件的依赖包以及依赖包的依赖包全量下载下来。
一般情况下使用前两种方法，除非待安装的机器相当干净的情况下才使用方法三。

```bash
# --download_path 相关依赖的保存路径
repotrack --download_path=/tmp/t maven
```

### 打包、解压

```bash
tar -zcvf ansible-yum.tar.gz /tmp/ansible-yum/
# -C, --directory=DIR        change to directory DIR
tar zxvf ansible-yum.tar.gz -C /tmp/ansible-yum/
```

### 安装 RPM 包

#### 一、 直接安装

```bash
# --force 强行置换套件或文件
# --nodeps 不验证套件档的相互关联性
rpm -Uvh *.rpm --nodeps --force
```

### 二、 制作成 repo 安装

```bash
yum install createrep
createrepo /tmp/ansible-yum/

vim /etc/yum.repo.d/ansible-yum.repo
    [ansible]
    name=ansible
    baseurl=file:///tmp/ansible-yum/
    enabled=1
    gpgcheck=0	
yum clean all 
yum makecache
yum repolist 

yum install -y ansible
```

## 查看软件包安装路径

参考：

+ [CentOS下查看yum及rpm安装后的软件位置](https://www.cnblogs.com/droxy/articles/17554595.html)

```bash
# 安装软件
$ yum install -y postgresql15-server
# 软件安装目录
$ rpm -ql python3
/usr/bin/pydoc
/usr/bin/pydoc3
/usr/bin/pydoc3.12
/usr/bin/python3
/usr/bin/python3.12
/usr/lib/.build-id
/usr/lib/.build-id/07
/usr/lib/.build-id/07/023eb4f297ae1d4591ec808ab20b2788c542be
/usr/share/doc/python3
/usr/share/doc/python3/README.rst
/usr/share/man/man1/python3.1.gz
/usr/share/man/man1/python3.12.1.gz
```

e.g.

```bash
[root@yeebian ~]# yum -y install httpd
[root@yeebian ~]# rpm -qa | grep httpd
httpd-tools-2.2.15-60.el6.centos.4.x86_64
httpd-2.2.15-60.el6.centos.4.x86_64
[root@yeebian ~]# rpm -ql httpd-2.2.15-60.el6.centos.4.x86_64
/etc/httpd
/etc/httpd/conf
/etc/httpd/conf.d
...
/usr/lib64/httpd
/usr/lib64/httpd/modules
...
/usr/sbin/apachectl
/usr/sbin/htcacheclean
/usr/sbin/httpd
...
/usr/share/doc/httpd-2.2.15
...
/var/cache/mod_proxy
/var/lib/dav
/var/log/httpd
/var/run/httpd
/var/www
/var/www/cgi-bin
/var/www/error
/var/www/error/HTTP_BAD_GATEWAY.html.var
...
[root@yeebian ~]# rpm -ql httpd-tools-2.2.15-60.el6.centos.4.x86_64
/usr/bin/ab
/usr/bin/htdbm
/usr/bin/htdigest
/usr/bin/htpasswd
/usr/bin/logresolve
/usr/share/doc/httpd-tools-2.2.15
/usr/share/doc/httpd-tools-2.2.15/LICENSE
/usr/share/man/man1/ab.1.gz
/usr/share/man/man1/htdbm.1.gz
/usr/share/man/man1/htdigest.1.gz
/usr/share/man/man1/htpasswd.1.gz
/usr/share/man/man1/logresolve.1.gz
```
