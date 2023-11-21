---
title: Kickstart 使用笔记
tags:
  - 自动化装机
  - PXE
  - Kickstart
  - Cobbler
---

参考： <https://www.bilibili.com/video/BV1UU4y1U7bU?p=22>

通过http网络安装系统

原理： PXE（预启动执行环境）机制 —— 通过网络接口启动计算机，不依赖于本地存储设备/硬盘。

![image.png](https://s2.loli.net/2023/11/20/7ef1V3sIqM6QtFx.png)

## 自动化装机集成工具

+ kickstart

  通过 `ks.cfg` 配置，定义好

  + dhcp
  + 主机名
  + root密码
  + 网络信息
  + 软件包选择
    + vim
    + lrzsz
    + iftop
    + netstate
  + reboot

+ cobbler —— 前者的升级版本

  提供 web 界面

## kickstart 环境准备

```bash
# 配置“阿里云镜像站”
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
wget -O /etc/yum.repo.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

# 最小化安装
yum install bash-completion vim lrzsz wget expect net-tools nc nmap tree dos2unix htop iftop iotop unzip telnet sl psmisc glances bc ntpdate -y

# 关闭防火墙
systemctl stop firewalld 
iptables -F
systemctl disable firewalld 

# 关闭selinux
set -i 's/enforcing/disabled/g' /etc/selinux/config
getenforce

# 配置静态地址
ifconfig ens33 | awk 'NR==2{print $2}'
```

dhcp <https://www.bilibili.com/video/BV1UU4y1U7bU?p=16>

tftp <https://www.bilibili.com/video/BV1UU4y1U7bU?p=19>
