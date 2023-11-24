---
title: JumpServer 使用笔记
tags:
  - JumpServer
---

官网： <https://www.jumpserver.org/> \
Github： <https://github.com/jumpserver/jumpserver/>

## 堡垒机介绍

### 堡垒机运维思想

+ 事前阻止 —— 阻止危险命令的输入
+ 实时监控 —— 事故预警
+ 事后审计 —— 事后复盘
+ 多用户 —— 确定命令的执行人、执行权限

### 堡垒机作用

由于跳板机的不足，企业需要一种满足角色管理、权限控制、资源访问控制操作记录和审计、系统变更和维护控制、生成资产统计报表等多需求的一体化服务机器。

1. 核心系统运维和安全审计管理
1. 过滤和拦截非法请求访问、恶意攻击；拒绝不合法命令；进行审计口监控、报警和追踪
1. 报警、记录、分析、处理

### 堡垒机核心功能

1. 单点登录
1. 账号管理
1. 身份认证
1. 资源授权
1. 访问控制
1. 操作审计

### 堡垒机应用的场景

没有堡垒机时，存在的问题

1. 多个用户一个账号 —— 追责不明
1. 一个用户多个账号 —— 运维人员麻烦
1. 缺少统一的权限管理平台，难以实现高粒度的命令权限控制
1. 对于传统网络设备无法堆运维人员的远程连接命令进行加密、审计

## JumpServer 介绍

### 工作流程图

![image.png](https://s2.loli.net/2023/11/20/TfQBqAYbi7N9Ep5.png)

### 模块说明

+ Lina —— 负责前端展示
+ Luna —— 负责网页终端前端
+ Core —— 后台管理平台。由 Django 开发
+ CoCo/KoKo —— 实现 SSH Server 和 Web Terminal Server 接口。使用 Paramiko 和 Flask 开发 | 后来使用 Golang 开发，提供更强的并发性能
+ Guacamole —— 提供插件/额外功能支持

![image.png](https://s2.loli.net/2023/11/20/RcXDh21eHCyOqpa.png)

### 核心架构说明

+ 由 nginx 决定请求交给哪个组件处理

![image.png](https://s2.loli.net/2023/11/20/vDFH28AZC4BJGQw.png)

### 硬件要求

项目 | 机器配置 | 操作系统 | 备注
--- | --- | --- | ---
Jumpserver 服务器 | 4核心/16G内存/200G硬盘 | CentOS/RHEL 7.x 64位系统 | 保证系统干净，支持 unzip 解压

>
> 说明：
>
> 1. 硬盘容量主要用于存储审计录像，所以容量的选择根据用户资产数量以及使用程度来评估，建议最好200G以上。以100台Linux虚拟机资产为例，正常使用200G可以存储5\~6个月的录像。
>
>     存储空间评估标准
>     每小时产生录像大小（Linux和Windows平均值） | 每天操作时限 | 保存时限 | 存储空间 | 备注
>     --- | --- | --- | --- | ---
>     10MB | 4小时 | 30天 | 109G\*10\*4\*30\=127GB | 主要是存储录像
>
> 1. 需要干净的操作系统，用官方DVD安装的系统可以保证安装成功。系统中不要安装docker，否则会出现冲突。
>

## 实验环境

```txt
配置
2个cpu、4G内存、50G硬盘、CentOS7

依赖
python2（旧）/python3（新） —— 3.6.x
mysql server —— 5.6
mariadb（在Centos7上，mysql收费了，开源社区放出mariadb开源软件替代） —— 5.6 
redis （缓存数据库）
```

环境初始化

```bash
hostnamectl set-hostname teach_jumpserver

# 关闭防火墙
iptables -F
systemctl disable firewalld 
systemctl stop firewalld

# 关闭SELinux
sed 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config -i
reboot # 系统级别设置，重启才会生效
getenforce
```

安装依赖

```bash
# 配置yum源
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
wget -O /etc/yum.repos.d/epel.repo https://mirrors.aliyun.com/repo/epel-7.repo
yum clean all
yum makecache

# 安装系统初始化所需的软件 （如果系统是最小化安装，则需要安装这些软件）
yum install -y bash-completion vim lrzsz wget expect net-tools nc nmap tree dos2unix htop iftop iotop unzip telnet sl psmisc nethogs glances bc ntpdate openldap-devel
```

安装 jumpserver

```bash
# 安装 jumpserver 所需环境
yum install -y git python-pip gcc automake autoconf python-devel vim sshpass lrzsz readline-devel

# 修改系统的字符集，改为中文 （希望在 jumpserver 上显示中文，避免乱码）
localedef -c -f UTF-8 -i zh_CN zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
# 写入全局配置文件，才能永久生效
echo 'LANG="zh_CN.UTF-8"' > /etc/locale.conf
# 检查变量值，确保值均为"zh_CN.UTF-8"
locale
######### before
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
######### after
LANG=zh_CN.UTF-8
LC_CTYPE="zh_CN.UTF-8"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_COLLATE="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_MESSAGES="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```
