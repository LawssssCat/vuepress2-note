import{_ as i,r as l,o as t,c as o,a as n,b as e,d as a,e as c}from"./app-04e6f892.js";const p={},r={href:"https://www.bilibili.com/video/BV1UU4y1U7bU?p=22",target:"_blank",rel:"noopener noreferrer"},d=c(`<p>通过http网络安装系统</p><p>原理： PXE（预启动执行环境）机制 —— 通过网络接口启动计算机，不依赖于本地存储设备/硬盘。</p><p><img src="https://s2.loli.net/2023/11/20/7ef1V3sIqM6QtFx.png" alt="image.png"></p><h2 id="自动化装机集成工具" tabindex="-1"><a class="header-anchor" href="#自动化装机集成工具" aria-hidden="true">#</a> 自动化装机集成工具</h2><ul><li><p>kickstart</p><p>通过 <code>ks.cfg</code> 配置，定义好</p><ul><li>dhcp</li><li>主机名</li><li>root密码</li><li>网络信息</li><li>软件包选择 <ul><li>vim</li><li>lrzsz</li><li>iftop</li><li>netstate</li></ul></li><li>reboot</li></ul></li><li><p>cobbler —— 前者的升级版本</p><p>提供 web 界面</p></li></ul><h2 id="kickstart-环境准备" tabindex="-1"><a class="header-anchor" href="#kickstart-环境准备" aria-hidden="true">#</a> kickstart 环境准备</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置“阿里云镜像站”</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repo.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

<span class="token comment"># 最小化安装</span>
yum <span class="token function">install</span> bash-completion <span class="token function">vim</span> lrzsz <span class="token function">wget</span> <span class="token function">expect</span> net-tools <span class="token function">nc</span> nmap tree dos2unix <span class="token function">htop</span> iftop iotop <span class="token function">unzip</span> telnet sl psmisc glances <span class="token function">bc</span> ntpdate <span class="token parameter variable">-y</span>

<span class="token comment"># 关闭防火墙</span>
systemctl stop firewalld 
iptables <span class="token parameter variable">-F</span>
systemctl disable firewalld 

<span class="token comment"># 关闭selinux</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/enforcing/disabled/g&#39;</span> /etc/selinux/config
getenforce

<span class="token comment"># 配置静态地址</span>
<span class="token function">ifconfig</span> ens33 <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;NR==2{print $2}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),m={href:"https://www.bilibili.com/video/BV1UU4y1U7bU?p=16",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1UU4y1U7bU?p=19",target:"_blank",rel:"noopener noreferrer"};function u(v,k){const s=l("ExternalLinkIcon");return t(),o("div",null,[n("p",null,[e("参考： "),n("a",r,[e("https://www.bilibili.com/video/BV1UU4y1U7bU?p=22"),a(s)])]),d,n("p",null,[e("dhcp "),n("a",m,[e("https://www.bilibili.com/video/BV1UU4y1U7bU?p=16"),a(s)])]),n("p",null,[e("tftp "),n("a",b,[e("https://www.bilibili.com/video/BV1UU4y1U7bU?p=19"),a(s)])])])}const f=i(p,[["render",u],["__file","index.html.vue"]]);export{f as default};
