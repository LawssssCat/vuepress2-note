import{_ as e,r as i,o as l,c as d,a as s,b as n,d as t,e as c}from"./app-04e6f892.js";const r={},o=c(`<p>Windows Subsystem for Linux</p><p>todo 基本架构、命令行！</p><h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><p>手动： 控制面板 》 程序和功能 》 启动或关闭Windows功能 》 勾选<code>Hyper-V</code>，<code>适用于Linux的Windows子系统</code>、<code>虚拟机平台</code> 》 重启系统</p><p>命令行： <strong>全部完成后重启系统</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动 Hyper-V 功能</span>
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V /all /norestart

<span class="token comment"># 启用 适用于Linux的Windows子系统 功能</span>
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

<span class="token comment"># 启用 虚拟机平台 功能</span>
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装子系统-默认安装ubuntu" tabindex="-1"><a class="header-anchor" href="#安装子系统-默认安装ubuntu" aria-hidden="true">#</a> 安装子系统（默认安装ubuntu）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wsl <span class="token parameter variable">--install</span>
wsl <span class="token parameter variable">--install</span> Debian

<span class="token comment"># 查看已下载子系统</span>
wsl <span class="token parameter variable">--list</span>
<span class="token comment"># 查看可下载子系统</span>
wsl <span class="token parameter variable">--list</span> <span class="token parameter variable">--online</span>

<span class="token comment"># 查看已安装子系统</span>
wsl <span class="token parameter variable">-l</span> <span class="token parameter variable">-v</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新国内镜像源" tabindex="-1"><a class="header-anchor" href="#更新国内镜像源" aria-hidden="true">#</a> 更新国内镜像源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># root权限进入默认子系统</span>
wsl <span class="token parameter variable">-u</span> root

<span class="token function">sudo</span> <span class="token function">cp</span> /etc/apt/sources.list /etc/apt/sources.list.bak
<span class="token function">sudo</span> <span class="token function">vi</span> <span class="token function">cp</span> /etc/apt/sources.list

<span class="token function">sed</span> <span class="token string">&#39;s@http://.*.ubuntu.com/ubuntu/@http://mirrors.aliyun.com/ubuntu/@&#39;</span> /etc/apt/sources.list
mirrors.aliyun.com/ubuntu/

<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="制作子系统" tabindex="-1"><a class="header-anchor" href="#制作子系统" aria-hidden="true">#</a> 制作子系统</h2><p>如果 <code>wsl --list --online</code> 没有我们想要的发行版，需要自行添加子系统。</p><p>可以通过导入docker镜像包方式安装子系统！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># centos为例</span>
<span class="token comment"># docker run -it centos:7 bash</span>
<span class="token function">docker</span> create <span class="token parameter variable">--name</span> CentOS7.9 8652b9f0cb4c
<span class="token comment"># 导出容器镜像</span>
<span class="token function">docker</span> <span class="token builtin class-name">export</span> xxxxxxxxxxx <span class="token parameter variable">-o</span> centos.tar 
<span class="token function">mv</span> centos.tar /mnt/c/Users/iuxt/Desktop
<span class="token comment"># 导入</span>
<span class="token comment"># --import &lt;子系统名&gt; &lt;子系统运行目录&gt; &lt;子系统镜像目录&gt;</span>
wsl <span class="token parameter variable">--import</span> centos C:<span class="token punctuation">\\</span>centos Desktop<span class="token punctuation">\\</span>centos.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="备份还原" tabindex="-1"><a class="header-anchor" href="#备份还原" aria-hidden="true">#</a> 备份还原</h2><p>备份/还原</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>wsl <span class="token parameter variable">--export</span> centos C:<span class="token punctuation">\\</span>users<span class="token punctuation">\\</span>iuxt<span class="token punctuation">\\</span>desktop<span class="token punctuation">\\</span>backup.tar
wsl <span class="token parameter variable">--import</span> centos C:<span class="token punctuation">\\</span>users<span class="token punctuation">\\</span>iuxt<span class="token punctuation">\\</span>desktop<span class="token punctuation">\\</span>backup.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是wsl2的话，可以直接使用vhdx文件</p><h2 id="进入方式" tabindex="-1"><a class="header-anchor" href="#进入方式" aria-hidden="true">#</a> 进入方式</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入默认子系统</span>
wsl
<span class="token comment"># 进入指定子系统</span>
wsl <span class="token parameter variable">-d</span> Debian
<span class="token comment"># 设置默认子系统</span>
wsl --set-default Debian

<span class="token comment"># 界面方式</span>
进入“资源管理器”子系统目录 》 右键 》 终端打开
进入“资源管理器”子系统目录 》 地址栏 》 输入“wsl”并回车
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="互访" tabindex="-1"><a class="header-anchor" href="#互访" aria-hidden="true">#</a> 互访</h2><p>win调用wsl命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 调用wsl中的md5sum计算md5值</span>
wsl md5sum centos.tar
wsl <span class="token parameter variable">-d</span> md5sum centos.tar <span class="token comment"># 指定子系统</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wsl访问win文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开当前目录图形界面</span>
explorer.exe <span class="token builtin class-name">.</span>
<span class="token comment"># 打开win目录</span>
<span class="token builtin class-name">cd</span> /mnt/c/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开机启动" tabindex="-1"><a class="header-anchor" href="#开机启动" aria-hidden="true">#</a> 开机启动</h2><p>在 <code>C:\\Users\\用户名\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup</code> 添加脚本 <code>wsl-start.vbs</code></p><div class="language-vbs line-numbers-mode" data-ext="vbs"><pre class="language-vbs"><code>Set ws = CreateObject(&quot;Wscript.Shell&quot;)
ws.run &quot;wsl -d ArchLinux -u root&quot;,vbhide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="systemd" tabindex="-1"><a class="header-anchor" href="#systemd" aria-hidden="true">#</a> systemd</h2><p>之前wsl不支持systemd功能，现在win11支持了！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> /etc/wsl.conf
<span class="token punctuation">[</span>boot<span class="token punctuation">]</span>
<span class="token assign-left variable">systemd</span><span class="token operator">=</span>true
<span class="token builtin class-name">command</span> <span class="token operator">=</span> /home/iuxt/start.sh

$ systemctl status <span class="token function">docker</span> <span class="token comment"># 比如开启启动docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改内存配置" tabindex="-1"><a class="header-anchor" href="#修改内存配置" aria-hidden="true">#</a> 修改内存配置</h2><p><code>c:\\Users\\wzk35\\.wslconfig</code> —— 修改wsl2子系统配置，设置内存、虚拟内存、是否回收未使用内存等等</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>wsl2<span class="token punctuation">]</span>
<span class="token assign-left variable">memory</span><span class="token operator">=</span>4GB
<span class="token assign-left variable">processors</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token assign-left variable">swap</span><span class="token operator">=</span>2GB
<span class="token assign-left variable">pageReporting</span><span class="token operator">=</span>false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usb" tabindex="-1"><a class="header-anchor" href="#usb" aria-hidden="true">#</a> usb</h2><p>安装 usbipd</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>usbipd wsl list
<span class="token comment"># 连接</span>
usbipd wsl attach --hardware-id <span class="token string">&quot;22d9:2765&quot;</span>
<span class="token comment"># 断开</span>
usbipd wsl detach --hardware-id <span class="token string">&quot;22d9:2765&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pacman <span class="token parameter variable">-S</span> linux-tools hwdata usbip usbutils
lsusb
adb devices

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>`,39),p={href:"https://zahui.fan/",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const a=i("ExternalLinkIcon");return l(),d("div",null,[o,s("ul",null,[s("li",null,[n("视频|B站-"),s("a",p,[n("把布丢"),t(a)]),n("-《如何优雅的使用WSL》 —— https://www.bilibili.com/video/BV1Ku4y1f7nq/")])])])}const h=e(r,[["render",u],["__file","index.html.vue"]]);export{h as default};
