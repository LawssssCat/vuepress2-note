---
title: WSL 使用笔记
---

Windows Subsystem for Linux

todo 基本架构、命令行！

## 环境准备

手动： 控制面板 》 程序和功能 》 启动或关闭Windows功能 》 勾选`Hyper-V`，`适用于Linux的Windows子系统`、`虚拟机平台` 》 重启系统

命令行： **全部完成后重启系统**

```bash
# 启动 Hyper-V 功能
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V /all /norestart

# 启用 适用于Linux的Windows子系统 功能
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 启用 虚拟机平台 功能
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

## 安装子系统（默认安装ubuntu）

```bash
wsl --install
wsl --install Debian

# 查看已下载子系统
wsl --list
# 查看可下载子系统
wsl --list --online

# 查看已安装子系统
wsl -l -v 
```

### 更新国内镜像源

```bash
# root权限进入默认子系统
wsl -u root

sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo vi cp /etc/apt/sources.list

sed 's@http://.*.ubuntu.com/ubuntu/@http://mirrors.aliyun.com/ubuntu/@' /etc/apt/sources.list
mirrors.aliyun.com/ubuntu/

apt-get update
apt-get upgrade
```

## 制作子系统

如果 `wsl --list --online` 没有我们想要的发行版，需要自行添加子系统。

可以通过导入docker镜像包方式安装子系统！

```bash
# centos为例
docker run -it centos:7 bash
# 导出容器镜像
docker export xxxxxxxxxxx -o centos.tar 
mv centos.tar /mnt/c/Users/iuxt/Desktop
# 导入
# --import <子系统名> <子系统运行目录> <子系统镜像目录>
wsl --import centos C:\centos Desktop\centos.tar
```

## 备份还原

备份/还原

```bash
wsl --export centos C:\users\iuxt\desktop\backup.tar
wsl --import centos C:\users\iuxt\desktop\backup.tar
```

如果是wsl2的话，可以直接使用vhdx文件

## 进入方式

```bash
# 进入默认子系统
wsl
# 进入指定子系统
wsl -d Debian
# 设置默认子系统
wsl --set-default Debian

# 界面方式
进入“资源管理器”子系统目录 》 右键 》 终端打开
进入“资源管理器”子系统目录 》 地址栏 》 输入“wsl”并回车
```

## 互访

win调用wsl命令

```bash
# 调用wsl中的md5sum计算md5值
wsl md5sum centos.tar
wsl -d md5sum centos.tar # 指定子系统
```

wsl访问win文件

```bash
# 打开当前目录图形界面
explorer.exe .
# 打开win目录
cd /mnt/c/
```

## 开机启动

在 `C:\Users\用户名\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` 添加脚本 `wsl-start.vbs`

```vbs
Set ws = CreateObject("Wscript.Shell")
ws.run "wsl -d ArchLinux -u root",vbhide
```

## systemd

之前wsl不支持systemd功能，现在win11支持了！

```bash
$ cat /etc/wsl.conf
[boot]
systemd=true
command = /home/iuxt/start.sh

$ systemctl status docker # 比如开启启动docker
```

## 修改内存配置

`c:\Users\wzk35\.wslconfig` —— 修改wsl2子系统配置，设置内存、虚拟内存、是否回收未使用内存等等

```bash
[wsl2]
memory=4GB
processors=2
swap=2GB
pageReporting=false
```

## usb

安装 usbipd

```bash
usbipd wsl list
# 连接
usbipd wsl attach --hardware-id "22d9:2765"
# 断开
usbipd wsl detach --hardware-id "22d9:2765"
```

```bash
pacman -S linux-tools hwdata usbip usbutils
lsusb
adb devices

```

# 参考

+ 视频|B站-[把布丢](https://zahui.fan/)-《如何优雅的使用WSL》 —— https://www.bilibili.com/video/BV1Ku4y1f7nq/
