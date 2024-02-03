---
title: RPM 使用笔记
---

centos 系列在用

RPM（RedHat Package Manager）是一个功能强大的包管理器，可以用来构建、安装、查询、验证、更新和删除单个软件包。一个软件包包含文件存档和用于安装和删除存档文件的元数据。元数据包括帮助脚本、文件属性和关于包的描述性信息。

RPM 包里面都包含什么？
里面包含可执行的二进制程序；
RPM包中还包括程序运行时所需要的文件；

+ 二进制包（用于封装要安装的软件）
+ 源包（包含生成二进制包所需的源代码和配方）

一个 RPM 包中的应用程序，有时除了自身所带的附加文件保证其正常以外，还需要其它特定版本文件，这就是软件包的依赖关系；

::: tip
安装 rpm 软件包的工具，但是无法处理依赖。为了处理依赖，出现了 yum 包管理工具。 todo link yum page
:::

RPM 的优点如下：

1. RPM 内含已编译过的程序与设置文件等数据，可以让用户免除重新编译的困扰。
2. RPM 在被安装之前，会先检查系统的硬盘容量、操作系统版本等，可避免文件被错误安装。
3. RPM 文件本身提供软件版本信息、依赖属性软件名称、软件用途说明、软件所含文件信息，便于了解软件。
4. RPM 管理的方式使用数据库记录 RPM 文件的相关参数，便于升级、删除、查询与验证。

## 使用

参考： 

+ [RPM 命令字面解释](https://www.cnblogs.com/xiaochaohuashengmi/archive/2011/10/08/2203153.html)
+ [RPM 命令字面解释（详细）](https://blog.csdn.net/wb1046329430/article/details/116424135)

RPM 默认安装路径： （约定）

路径 | 解释
--- | ---
/etc | 一些设置文件放置的目录如 /etc/crontab
/usr/bin | 一些可执行文件
/usr/lib | 一些程序使用的动态函数库
/usr/share/doc | 一些基本的软件使用手册与帮助文档
/usr/share/man | 一些 man page 文件

### 初始化 rpm 数据库

rpm 数据库通过来记录 rpm 包是否安装；所以我们要经常用下面的两个命令来初始化 rpm 数据库；

```bash
[root@localhost beinan]# rpm --initdb
[root@localhost beinan]# rpm --rebuilddb 注：这个要花好长时间；
```

注：这两个参数是极为有用，有时rpm 系统出了问题，不能安装和查询，大多是这里出了问题；

```bash
[root@localhost RPMS]# updatedb
[root@localhost RPMS]# locate 软件名或文件名
```

通过updatedb，我们可以用 locate 来查询一些软件安装到哪里了；系统初次安装时要执行updatedb ，每隔一段时间也要执行一次；以保持已安装软件库最新；updatedb 是slocate软件包所有；如果您没有这个命令，就得安装slocate ；

todo `rpm --initdb` 和 `updatedb` 的关系

### 配置文件

RPM包管理，的配置文件是 rpmrc

通过 `rpm --showrc` 查看

比如 Fedora Core 4.0 中的 rpmrc 文件位于

```bash
[root@localhost RPMS]# locate rpmrc
/usr/lib/rpm/rpmrc
/usr/lib/rpm/redhat/rpmrc
```

### 导入签名

```bash
[root@localhost fc40]# rpm --import RPM-GPG-KEY
[root@localhost fc40]# rpm --import RPM-GPG-KEY-fedora
```

关于RPM的签名功能，详情请参见 `man rpm`

### 从rpm软件包抽取文件

`rpm2cpio file.rpm |cpio -div`

### 常用命令

[RPM 命令选项查询](https://www.runoob.com/linux/linux-comm-rpm.html)

```bash
-q 使用询问模式

-a 查询所有套件
-p 查询指定的RPM套件档

-l 显示套件的文件列表
-R 显示套件的关联性信息
-i 显示套件的相关信息
-c 只列出组态配置文件，本参数需配合"-l"参数使用。
-d 只列出文本文件，本参数需配合"-l"参数使用。
-s 显示文件状态，本参数需配合"-l"参数使用。
--scripts 列出安装套件的 Script 的变量
--requires 查询该套件所需要的兼容度

-----

-i<套件档>/--install<套件档> 安装指定的套件档
-U<套件档>/--upgrade<套件档> 升级指定的套件档
-e<套件档>/--erase<套件档> 删除指定的套件

--root<根目录> 设置欲当作根目录的目录
-relocate<原目录>/<新目录> 设置目录映射

--force 强行置换套件或文件
--nodeps 不验证套件档的相互关联性

-v 显示指令执行过程
-vv 详细显示指令执行过程，便于排错
-h/--hash 套件安装时列出标记
```

```bash
rpm -q samba //查询程序是否安装
rpm -qa | grep httpd       # [搜索指定rpm包是否安装]--all搜索*httpd*
rpm -ql httpd          # [搜索rpm包]--list所有文件安装目录

# 列出RPM软件包内的文件信息[Query Package list]
rpm -qlp
#查看rpm包的安装脚本
rpm -qp --scripts
#查看rpm包的依赖性关系
rpm -qp --requires
#查看rpm包详细信息
rpm -qi
－qpi：列出RPM软件包的描述信息[Query Package install package(s)]；
－qf：查找指定文件属于哪个RPM软件包[Query File]；
rpm -qpi Linux-1.4-6.i368.rpm # [查看rpm包]--query--package--install package信息
rpm -qpi http://mirrors.kernel.org/fedora/core/4/i386/os/ Fedora/RPMS/gaim-1.3.0-1.fc4.i386.rpm
rpm -qpf Linux-1.4-6.i368.rpm # [查看rpm包]--file
rpm -qpR file.rpm        # [查看包]依赖关系
rpm2cpio file.rpm |cpio -div # [抽出文件]
#查看rpm包的更新记录
rpm -qp --changelog
 
#安装rpm包
rpm -ivh
rpm -ivh  /media/cdrom/RedHat/RPMS/samba-3.0.10-1.4E.i386.rpm # 按路径安装并显示进度
rpm -ivh http://mirrors.kernel.org/fedora/core/4/i386/os/ Fedora/RPMS/gaim-1.3.0-1.fc4.i386.rpm
rpm -ivh --relocate /=/opt/gaim gaim-1.3.0-1.fc4.i386.rpm    # 指定安装目录 | gaim 的所有文件都是安装在 /opt/gaim 中，我们只是把gaim 目录备份一下，然后卸掉gaim；这样其实也算提取文件的一点用法；
rpm -ivh --test gaim-1.3.0-1.fc4.i386.rpm    # 用来检查依赖关系；并不是真正的安装；
#更新软件
rpm -Uvh
rpm -Uvh --oldpackage gaim-1.3.0-1.fc4.i386.rpm # 新版本降级为旧版本
#卸载软件
rpm -e
 
rpm --recompile vim-4.6-4.src.rpm # 这个命令会把源代码解包并编译、安装它，如果用户使用命令：
rpm --rebuild vim-4.6-4.src.rpm # 在安装完成后，还会把编译生成的可执行文件重新包装成i386.rpm的RPM软件包。

#在安装过程中指定相对安装路径
rpm -ivh --nodeps --force --root=你指定的路径
#在安装过程中忽略依赖性关系
rpm -ivh --nodeps --force
 
#重新编译rpm包
rpm -ba spec配置文件
#如何修改rpm源码包的编译参数
修改安装源码包后产生的 spec 文件。
```
