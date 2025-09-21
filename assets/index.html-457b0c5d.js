import{_ as l,r as t,o as c,c as r,a as n,b as e,d as s,e as i}from"./app-04e6f892.js";const o={},d=n("p",null,[n("img",{src:"https://s2.loli.net/2023/11/19/cqOLPUr73b8omvZ.png",alt:"image.png"})],-1),p=n("p",null,"资料：",-1),b={href:"https://www.zabbix.com/documentation/current/zh",target:"_blank",rel:"noopener noreferrer"},u=i(`<p>没有 Zabbix 的话，需要用一下工具，一个个查 —— 麻烦，低效，无预警！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Linux 那些 “独孤九剑” 级别命令</span>
<span class="token number">1</span>. 服务器上架到机柜
<span class="token number">2</span>. 基础设施监控
    + 硬件 ipmitool（服务器温度，cpu风扇转速）/Megacli（监控raid）/lm_sensors（温度）
    + 网站/业务/api curl/wget
    + 服务 systemctl/service/chkconfig<span class="token punctuation">(</span>c6<span class="token punctuation">)</span>
    + 进程 ps/pstree/pgrep/pidstat/top/htop
    + 内存监控 df/fdisk/iotop<span class="token punctuation">(</span>swap<span class="token punctuation">)</span>/free/mpstat/sar/hcache<span class="token punctuation">(</span>buffer+cache<span class="token punctuation">)</span>
    + cpu监控 lscpu/uptime/vmstat/mpstat/cpuinfo/w/sar/top/htop/glances<span class="token punctuation">(</span>python 开发的 <span class="token function">top</span> plus<span class="token punctuation">)</span>
    + 磁盘监控 iotop/iostat/sar <span class="token comment">#磁盘测试命令 dd,fio</span>
    + 网络监控 iftop（整体带宽使用情况）/nethogs（精确到进程）/nstat/ifstat/mtr/sar/ip/route
<span class="token number">3</span>. 应用监控
    + mysql redis
    + nginx
    + php-fpm
    + python

<span class="token comment"># 监控脚本示例</span>
<span class="token comment">#!/bin/bash</span>
<span class="token comment"># author: xxx</span>
<span class="token comment"># desc: check system memory usage</span>

<span class="token assign-left variable">MEM</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">free</span> -m<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;NR=2{print $NF}&#39;</span><span class="token variable">\`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$MEM</span> <span class="token parameter variable">-le</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;当前的内存还剩余 <span class="token variable">$MEM</span>&quot;</span> <span class="token operator">|</span> mail <span class="token parameter variable">-s</span> <span class="token string">&#39;内存不足了！ oom&#39;</span> youjiu_linux@qq.com
<span class="token keyword">fi</span>

<span class="token comment"># 不同时间的监控现状</span>
<span class="token comment"># 过去 —— Nagios（烂狗屎）+Cacti</span>
<span class="token comment"># 目前 —— Zabbix+Grafana，Prometheus（普罗米修斯），OpenFalcon（小米开源），夜莺（滴滴开源）</span>
<span class="token comment"># 未来 —— Zabbix 6.0/7.0 lts？</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>监控：</p><ol><li>硬件监控 <ul><li>通过远程控制卡：Dell的iDRAC，HP的ILO，IBM的IMM等</li><li>使用IPMI来完成物理设备的监控工作，通常必须要监控的就是温度、硬盘故障等</li><li>路由器、交换机（端口、光衰、日志）、打印机、Windows等</li></ul></li><li>系统监控 <ul><li>cpu、内存、硬盘使用率、硬盘IO、系统负载、进程数</li></ul></li><li>服务监控 <ul><li>apache、nginx、php、fpm、mysql、memcache、redis、tomcat、JVM、TCP连接数</li></ul></li><li>性能监控 <ul><li>网站性能、服务器性能、数据库性能、存储性能</li></ul></li><li>日志监控 <ul><li>系统会生产系统日志，应用程序会有应用的访问日志、错误日志，服务有运行日志等，可以使用ELK来进行日志监控</li></ul></li><li>安全监控 <ul><li>Nginx + Lua 编写了一个 WAP 通过 kibana 可以图形化的展示不同的攻击类型的统计</li><li>用户登录数量、passwd文件变化，本地所有文件改动</li></ul></li><li>网络监控 <ul><li>端口、web（URL）、DB、ping包、IDC带宽网络流量、网络流出速率、网络流入流量、网络流出流量、网络使用率、SMTP、POP3</li></ul></li></ol><h2 id="zabbix-介绍" tabindex="-1"><a class="header-anchor" href="#zabbix-介绍" aria-hidden="true">#</a> zabbix 介绍</h2><p>Zabbix 是由 Alexel Vladishev 开发的一种网络监视、管理系统，可用于监控各种网络服务、服务器和网络机器等状态。</p><p>Zabbix 基于 Server-Client 架构。</p><ul><li>监控端 <ul><li>Server 端 C语言开发</li><li>Client 端 PHP 开发 （通过 Web GUI 管理 Server 端）</li><li>Client 端 Grafana 数据可视化</li></ul></li><li>被监控端 <ul><li>Agent 端 有两个版本：agent-C语言开发，agent2-Go语言开发</li></ul></li></ul><p>Zabbix 可以使用各种 Database-end 和 MySQL、PostgreSQL、SQLite、Oracle 或 IBM DB2 存储资料。</p><p><img src="https://s2.loli.net/2023/11/20/3rSbcA1jz6NHTJD.png" alt="image.png"></p><h3 id="zabbix-features" tabindex="-1"><a class="header-anchor" href="#zabbix-features" aria-hidden="true">#</a> Zabbix features</h3><ul><li>自定义监控脚本，提供需要输出的值即可</li><li>存储的数据库表结构复杂但清晰</li><li>存在模板概念，可以方便管理一组监控项目（item）</li><li>web界面友好，如可以看到每个监控项目的历史记录</li><li>自定义触发器（trigger）规则，可以定义复杂的报警逻辑</li><li>提供ack报警确认机制</li><li>支持邮箱、短信、微信等警告渠道</li><li>触发警告后，可以远程执行系统命令</li><li>有原生的PHP绘图模块</li></ul><h3 id="zabbix-专有名词" tabindex="-1"><a class="header-anchor" href="#zabbix-专有名词" aria-hidden="true">#</a> Zabbix 专有名词</h3><ul><li>zabbix server —— 服务端</li><li>zabbix agent —— 一个进程，负责与 zabbix server 交互。</li><li>host —— 主机/服务器，指 zabbix 监控的实体、服务器、交换机等</li><li>hosts —— 主机组</li><li>applications —— 应用</li><li>events —— 事件</li><li>media —— 发送通知的渠道</li><li>remote command —— 远程命令</li><li>template —— 模板</li><li>item —— 监控项目，对于某一个指标的监控称为items，如某服务器内存情况就是一个item监控项</li><li>trigger —— 触发器，定义报警的逻辑（正常/异常/未知三种状态）</li><li>action —— 挡 trigger 符合设定值后， zabbix 指定的动作，如发送邮件。</li></ul><h3 id="zabbix-程序组件" tabindex="-1"><a class="header-anchor" href="#zabbix-程序组件" aria-hidden="true">#</a> Zabbix 程序组件</h3><ul><li><code>zabbix_server</code> 服务端守护进程</li><li><code>zabbix_agentd</code> agent守护进程</li><li><code>zabbix_proxy</code> 代理服务器</li><li><code>zabbix_database</code> 存储系统，mysql、pgsql</li><li><code>zabbix_web</code> web gui 图像化界面</li><li><code>zabbix_get</code> 命令行工具，测试向agent发起数据采集请求</li><li><code>zabbix_sender</code> 命令行工具，测试向server发送数据</li><li><code>zabbix_java_gateway</code> java网关</li></ul><h3 id="zabbix-版本选择" tabindex="-1"><a class="header-anchor" href="#zabbix-版本选择" aria-hidden="true">#</a> Zabbix 版本选择</h3><ul><li>LTS（Long Time Support 长期维护版本） VS 标准版本 <ul><li>标准版本 —— Zabbix 每6个月发布一个标准版本，如<code>X.2</code>,<code>X.4</code>,...。维护时间也只有6个月。</li><li>长期维护版本一般维护6~7年（approx 1.5years + Full Support 3years + Limited Support 2years）</li></ul></li></ul><h2 id="zabbix-5-0-安装" tabindex="-1"><a class="header-anchor" href="#zabbix-5-0-安装" aria-hidden="true">#</a> zabbix 5.0 安装</h2>`,19),m={href:"https://www.zabbix.com/documentation/current/zh/manual/installation",target:"_blank",rel:"noopener noreferrer"},v=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取ip</span>
$ <span class="token function">ifconfig</span> eth0 <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;NR==2{print $2}&#39;</span>
<span class="token number">10.221</span>.55.11
<span class="token comment"># 关闭selinux</span>
$ <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/&#39;</span> /etc/selinux/config
$ getenforce
Disabled
<span class="token comment"># 关闭防火墙</span>
$ systemctl disable <span class="token parameter variable">--now</span> firewalld
$ iptables <span class="token parameter variable">-L</span>
Chain INPUT
Chain FORWARD
Chain OUTPUT
<span class="token comment"># 内存给大点 4g</span>
$ <span class="token function">free</span> <span class="token parameter variable">-m</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">##################</span>
<span class="token comment"># 参考：</span>
<span class="token comment"># + Download and install Zabbix - https://www.zabbix.com/download</span>
<span class="token comment">##################</span>

<span class="token comment"># 获取 zabbix 的下载源</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> https://mirrors.aliyun.com/zabbix/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm
<span class="token comment"># rpm -Uvh https://repo.zabbix.com/zabbix/5.0/rhel/8/x86_64/zabbix-release-5.0-1.el8.noarch.rpm</span>
<span class="token comment"># 替换源</span>
$ <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s#http://repo.zabbix.com#https://mirrors.aliyun.com/zabbix#&#39;</span> /etc/yum.repos.d/zabbix.repo
<span class="token comment"># 清空缓存，下载 zabbix 服务端</span>
yum clean all
<span class="token comment"># 申请新缓存</span>
yum makecache

<span class="token comment"># 服务端安装 agent 负责采集服务端主机数据（监控自己）</span>
yum <span class="token function">install</span> zabbix-server-mysql zabbix-agent <span class="token parameter variable">-y</span> 

<span class="token comment"># 安装 Software Collections，便于后续安装高版本的 php （默认 yum 安装的 php 版本为 5.4 过低）</span>
<span class="token comment"># 说明：</span>
<span class="token comment"># SCL（Software Collections）可以让你在同一个操作系统上安装和使用多个版本的软件，而不会影响整个系统的安装包。</span>
<span class="token comment"># 软件包会安装在 /opt/rh 目录下</span>
<span class="token comment"># 为了避免系统广泛冲突，/opt/rh 包安装在目录中。例如，允许你在 CentOS 7 机器上安装 Python 3.5，而不会删除或干扰 Python 2.7</span>
<span class="token comment"># /etc/opt/rh/ 软件包的所有配置文件都存储在目录中相应的目录中，SCL 包提供了定义使用所包含应用程序所需的环境变量的 shell 脚本。例如：PATH、LD_LIBRARY_PATH和MANPATH这些脚本存储在文件系统中，作为 /opt/rh/package-r</span>
yum <span class="token function">install</span> centos-release-scl <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他-todo-整理" tabindex="-1"><a class="header-anchor" href="#其他-todo-整理" aria-hidden="true">#</a> 其他（todo 整理）</h2><p>数据库和 Zabbix 配置修改：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>一共调整了这些
zabbix:
StartPollers=500	               Zabbix Server 启动的轮询进程的数量 定义了同时处理监控数据的轮询进程的数量
StartPollersUnreachable=50    用于指定在处理不可达主机（unreachable hosts）时启动的轮询进程的数量
StartTrappers=30	              用于指定启动的 trapper 进程数量。Trapper 进程用于接收来自 Zabbix 发送程序（Zabbix sender）的主动监控数据
StartPingers=5	              用于指定启动的 pinger 进程数量
StartDiscoverers	              用于指定启动的发现进程数量。Discoverer 进程用于发现新的网络设备和服务，以便将其添加到监控中。
StartAlerters=30 	              用于指定启动的告警进程数量。Alerter 进程负责发送告警通知，如电子邮件、短信等
HousekeepingFrequency=1    HousekeepingFrequency 设置为 1。这意味着 &quot;housekeeper&quot; 进程将每秒运行一次。根据注释的信息，该值的范围为 0 到 24。
MaxHousekeeperDelete=100000   &quot;housekeeper&quot; 每次运行时最多删除的历史数据条目数。默认是 50000。
CacheSize=2G                       指定 Zabbix Server 的缓存大小，以便提高检索性能
CacheUpdateFrequency=300  指定缓存更新的频率，以秒为单位。         
StartDBSyncers=20		指定启动的 DB syncer 进程数量，用于将监控数据同步到数据库。
HistoryCacheSize=1G	指定历史数据的缓存大小。
TrendCacheSize=1024M	指定趋势数据的缓存大小。
ValueCacheSize=2G		指定数值数据的缓存大小。	


数据库：
[mysqld]
innodb_buffer_pool_size = 11400M           InnoDB 存储引擎使用的内存池大小     设置为物理内存的70%
innodb_log_buffer_size = 32M	                InnoDB 存储引擎的事务日志缓冲区的大小  这个缓冲区用于存储未提交的事务日志。
max_connections = 100		设置 MySQL 服务器允许的最大连接数  这是同时处理的客户端连接数的上限。
thread_cache_size = 16		指定线程缓存的大小  用于缓存线程以提高线程的重用性。这可以减少创建和销毁线程的开销。
sort_buffer_size = 2M		指定用于执行排序操作的缓冲区大小 对于大型查询，适当设置此值可能有助于提高性能
read_buffer_size = 2M		指定用于读取数据的缓冲区大小 适当调整此值可能对特定类型的查询有性能优势
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function h(k,x){const a=t("ExternalLinkIcon");return c(),r("div",null,[d,p,n("ul",null,[n("li",null,[e("官方文档 "),n("a",b,[e("https://www.zabbix.com/documentation/current/zh"),s(a)])])]),u,n("p",null,[n("a",m,[e("https://www.zabbix.com/documentation/current/zh/manual/installation"),s(a)])]),v])}const f=l(o,[["render",h],["__file","index.html.vue"]]);export{f as default};
