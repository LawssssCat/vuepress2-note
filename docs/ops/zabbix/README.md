---
title: Zabbix 使用笔记
tags:
  - 运维
  - 监控
---

![image.png](https://s2.loli.net/2023/11/19/cqOLPUr73b8omvZ.png)

资料：

+ 官方文档 <https://www.zabbix.com/documentation/current/zh>

没有 Zabbix 的话，需要用一下工具，一个个查 —— 麻烦，低效，无预警！

```bash
# Linux 那些 “独孤九剑” 级别命令
1. 服务器上架到机柜
2. 基础设施监控
    + 硬件 ipmitool（服务器温度，cpu风扇转速）/Megacli（监控raid）/lm_sensors（温度）
    + 网站/业务/api curl/wget
    + 服务 systemctl/service/chkconfig(c6)
    + 进程 ps/pstree/pgrep/pidstat/top/htop
    + 内存监控 df/fdisk/iotop(swap)/free/mpstat/sar/hcache(buffer+cache)
    + cpu监控 lscpu/uptime/vmstat/mpstat/cpuinfo/w/sar/top/htop/glances(python 开发的 top plus)
    + 磁盘监控 iotop/iostat/sar #磁盘测试命令 dd,fio
    + 网络监控 iftop（整体带宽使用情况）/nethogs（精确到进程）/nstat/ifstat/mtr/sar/ip/route
3. 应用监控
    + mysql redis
    + nginx
    + php-fpm
    + python

# 监控脚本示例
#!/bin/bash
# author: xxx
# desc: check system memory usage

MEM=`free -m|awk 'NR=2{print $NF}'`
if [ $MEM -le 100 ]; then
    echo "当前的内存还剩余 $MEM" | mail -s '内存不足了！ oom' youjiu_linux@qq.com
fi

# 不同时间的监控现状
# 过去 —— Nagios（烂狗屎）+Cacti
# 目前 —— Zabbix+Grafana，Prometheus（普罗米修斯），OpenFalcon（小米开源），夜莺（滴滴开源）
# 未来 —— Zabbix 6.0/7.0 lts？
```

监控：

1. 硬件监控
    + 通过远程控制卡：Dell的iDRAC，HP的ILO，IBM的IMM等
    + 使用IPMI来完成物理设备的监控工作，通常必须要监控的就是温度、硬盘故障等
    + 路由器、交换机（端口、光衰、日志）、打印机、Windows等
1. 系统监控
    + cpu、内存、硬盘使用率、硬盘IO、系统负载、进程数
1. 服务监控
    + apache、nginx、php、fpm、mysql、memcache、redis、tomcat、JVM、TCP连接数
1. 性能监控
    + 网站性能、服务器性能、数据库性能、存储性能
1. 日志监控
    + 系统会生产系统日志，应用程序会有应用的访问日志、错误日志，服务有运行日志等，可以使用ELK来进行日志监控
1. 安全监控
    + Nginx + Lua 编写了一个 WAP 通过 kibana 可以图形化的展示不同的攻击类型的统计
    + 用户登录数量、passwd文件变化，本地所有文件改动
1. 网络监控
    + 端口、web（URL）、DB、ping包、IDC带宽网络流量、网络流出速率、网络流入流量、网络流出流量、网络使用率、SMTP、POP3

## zabbix 介绍

Zabbix 是由 Alexel Vladishev 开发的一种网络监视、管理系统，可用于监控各种网络服务、服务器和网络机器等状态。

Zabbix 基于 Server-Client 架构。

+ 监控端
  + Server 端 C语言开发
  + Client 端 PHP 开发 （通过 Web GUI 管理 Server 端）
  + Client 端 Grafana 数据可视化
+ 被监控端
  + Agent 端 有两个版本：agent-C语言开发，agent2-Go语言开发

Zabbix 可以使用各种 Database-end 和 MySQL、PostgreSQL、SQLite、Oracle 或 IBM DB2 存储资料。

![image.png](https://s2.loli.net/2023/11/20/3rSbcA1jz6NHTJD.png)

### Zabbix features

+ 自定义监控脚本，提供需要输出的值即可
+ 存储的数据库表结构复杂但清晰
+ 存在模板概念，可以方便管理一组监控项目（item）
+ web界面友好，如可以看到每个监控项目的历史记录
+ 自定义触发器（trigger）规则，可以定义复杂的报警逻辑
+ 提供ack报警确认机制
+ 支持邮箱、短信、微信等警告渠道
+ 触发警告后，可以远程执行系统命令
+ 有原生的PHP绘图模块

### Zabbix 专有名词

+ zabbix server —— 服务端
+ zabbix agent —— 一个进程，负责与 zabbix server 交互。
+ host —— 主机/服务器，指 zabbix 监控的实体、服务器、交换机等
+ hosts —— 主机组
+ applications —— 应用
+ events —— 事件
+ media —— 发送通知的渠道
+ remote command —— 远程命令
+ template —— 模板
+ item —— 监控项目，对于某一个指标的监控称为items，如某服务器内存情况就是一个item监控项
+ trigger —— 触发器，定义报警的逻辑（正常/异常/未知三种状态）
+ action —— 挡 trigger 符合设定值后， zabbix 指定的动作，如发送邮件。

### Zabbix 程序组件

+ `zabbix_server` 服务端守护进程
+ `zabbix_agentd` agent守护进程
+ `zabbix_proxy` 代理服务器
+ `zabbix_database` 存储系统，mysql、pgsql
+ `zabbix_web` web gui 图像化界面
+ `zabbix_get` 命令行工具，测试向agent发起数据采集请求
+ `zabbix_sender` 命令行工具，测试向server发送数据
+ `zabbix_java_gateway` java网关

### Zabbix 版本选择

+ LTS（Long Time Support 长期维护版本） VS 标准版本
  + 标准版本 —— Zabbix 每6个月发布一个标准版本，如`X.2`,`X.4`,...。维护时间也只有6个月。
  + 长期维护版本一般维护6~7年（approx 1.5years + Full Support 3years + Limited Support 2years）

## zabbix 5.0 安装

<https://www.zabbix.com/documentation/current/zh/manual/installation>

```bash
# 获取ip
$ ifconfig eth0 | awk 'NR==2{print $2}'
10.221.55.11
# 关闭selinux
$ sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
$ getenforce
Disabled
# 关闭防火墙
$ systemctl disable --now firewalld
$ iptables -L
Chain INPUT
Chain FORWARD
Chain OUTPUT
# 内存给大点 4g
$ free -m
```

```bash
##################
# 参考：
# + Download and install Zabbix - https://www.zabbix.com/download
##################

# 获取 zabbix 的下载源
rpm -Uvh https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
# rpm -Uvh https://repo.zabbix.com/zabbix/5.0/rhel/8/x86_64/zabbix-release-5.0-1.el8.noarch.rpm
# 替换源
$ sed -i 's#http://repo.zabbix.com#https://mirrors.aliyun.com/zabbix#' /etc/yum.repos.d/zabbix.repo
# 清空缓存，下载 zabbix 服务端
yum clean all
# 申请新缓存
yum makecache

# 服务端安装 agent 负责采集服务端主机数据（监控自己）
yum install zabbix-server-mysql zabbix-agent -y 

# 安装 Software Collections，便于后续安装高版本的 php （默认 yum 安装的 php 版本为 5.4 过低）
# 说明：
# SCL（Software Collections）可以让你在同一个操作系统上安装和使用多个版本的软件，而不会影响整个系统的安装包。
# 软件包会安装在 /opt/rh 目录下
# 为了避免系统广泛冲突，/opt/rh 包安装在目录中。例如，允许你在 CentOS 7 机器上安装 Python 3.5，而不会删除或干扰 Python 2.7
# /etc/opt/rh/ 软件包的所有配置文件都存储在目录中相应的目录中，SCL 包提供了定义使用所包含应用程序所需的环境变量的 shell 脚本。例如：PATH、LD_LIBRARY_PATH和MANPATH这些脚本存储在文件系统中，作为 /opt/rh/package-r
yum install centos-release-scl -y
```
