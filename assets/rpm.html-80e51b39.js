import{_ as r,r as t,o as i,c as l,a,b as s,d as e,e as p}from"./app-04e6f892.js";const c={},o=p('<p>centos 系列在用</p><p>RPM（RedHat Package Manager）是一个功能强大的包管理器，可以用来构建、安装、查询、验证、更新和删除单个软件包。一个软件包包含文件存档和用于安装和删除存档文件的元数据。元数据包括帮助脚本、文件属性和关于包的描述性信息。</p><p>RPM 包里面都包含什么？ 里面包含可执行的二进制程序； RPM包中还包括程序运行时所需要的文件；</p><ul><li>二进制包（用于封装要安装的软件）</li><li>源包（包含生成二进制包所需的源代码和配方）</li></ul><p>一个 RPM 包中的应用程序，有时除了自身所带的附加文件保证其正常以外，还需要其它特定版本文件，这就是软件包的依赖关系；</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>安装 rpm 软件包的工具，但是无法处理依赖。为了处理依赖，出现了 yum 包管理工具。 todo link yum page</p></div><p>RPM 的优点如下：</p><ol><li>RPM 内含已编译过的程序与设置文件等数据，可以让用户免除重新编译的困扰。</li><li>RPM 在被安装之前，会先检查系统的硬盘容量、操作系统版本等，可避免文件被错误安装。</li><li>RPM 文件本身提供软件版本信息、依赖属性软件名称、软件用途说明、软件所含文件信息，便于了解软件。</li><li>RPM 管理的方式使用数据库记录 RPM 文件的相关参数，便于升级、删除、查询与验证。</li></ol><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>参考：</p>',10),d={href:"https://www.cnblogs.com/xiaochaohuashengmi/archive/2011/10/08/2203153.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://blog.csdn.net/wb1046329430/article/details/116424135",target:"_blank",rel:"noopener noreferrer"},v=p(`<p>RPM 默认安装路径： （约定）</p><table><thead><tr><th>路径</th><th>解释</th></tr></thead><tbody><tr><td>/etc</td><td>一些设置文件放置的目录如 /etc/crontab</td></tr><tr><td>/usr/bin</td><td>一些可执行文件</td></tr><tr><td>/usr/lib</td><td>一些程序使用的动态函数库</td></tr><tr><td>/usr/share/doc</td><td>一些基本的软件使用手册与帮助文档</td></tr><tr><td>/usr/share/man</td><td>一些 man page 文件</td></tr></tbody></table><h3 id="初始化-rpm-数据库" tabindex="-1"><a class="header-anchor" href="#初始化-rpm-数据库" aria-hidden="true">#</a> 初始化 rpm 数据库</h3><p>rpm 数据库通过来记录 rpm 包是否安装；所以我们要经常用下面的两个命令来初始化 rpm 数据库；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost beinan<span class="token punctuation">]</span><span class="token comment"># rpm --initdb</span>
<span class="token punctuation">[</span>root@localhost beinan<span class="token punctuation">]</span><span class="token comment"># rpm --rebuilddb 注：这个要花好长时间；</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注：这两个参数是极为有用，有时rpm 系统出了问题，不能安装和查询，大多是这里出了问题；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost RPMS<span class="token punctuation">]</span><span class="token comment"># updatedb</span>
<span class="token punctuation">[</span>root@localhost RPMS<span class="token punctuation">]</span><span class="token comment"># locate 软件名或文件名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过updatedb，我们可以用 locate 来查询一些软件安装到哪里了；系统初次安装时要执行updatedb ，每隔一段时间也要执行一次；以保持已安装软件库最新；updatedb 是slocate软件包所有；如果您没有这个命令，就得安装slocate ；</p><p>todo <code>rpm --initdb</code> 和 <code>updatedb</code> 的关系</p><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><p>RPM包管理，的配置文件是 rpmrc</p><p>通过 <code>rpm --showrc</code> 查看</p><p>比如 Fedora Core 4.0 中的 rpmrc 文件位于</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost RPMS<span class="token punctuation">]</span><span class="token comment"># locate rpmrc</span>
/usr/lib/rpm/rpmrc
/usr/lib/rpm/redhat/rpmrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入签名" tabindex="-1"><a class="header-anchor" href="#导入签名" aria-hidden="true">#</a> 导入签名</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost fc40<span class="token punctuation">]</span><span class="token comment"># rpm --import RPM-GPG-KEY</span>
<span class="token punctuation">[</span>root@localhost fc40<span class="token punctuation">]</span><span class="token comment"># rpm --import RPM-GPG-KEY-fedora</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关于RPM的签名功能，详情请参见 <code>man rpm</code></p><h3 id="从rpm软件包抽取文件" tabindex="-1"><a class="header-anchor" href="#从rpm软件包抽取文件" aria-hidden="true">#</a> 从rpm软件包抽取文件</h3><p><code>rpm2cpio file.rpm |cpio -div</code></p><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3>`,20),u={href:"https://www.runoob.com/linux/linux-comm-rpm.html",target:"_blank",rel:"noopener noreferrer"},b=p(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-q</span> 使用询问模式

<span class="token parameter variable">-a</span> 查询所有套件
<span class="token parameter variable">-p</span> 查询指定的RPM套件档

<span class="token parameter variable">-l</span> 显示套件的文件列表
<span class="token parameter variable">-R</span> 显示套件的关联性信息
<span class="token parameter variable">-i</span> 显示套件的相关信息
<span class="token parameter variable">-c</span> 只列出组态配置文件，本参数需配合<span class="token string">&quot;-l&quot;</span>参数使用。
<span class="token parameter variable">-d</span> 只列出文本文件，本参数需配合<span class="token string">&quot;-l&quot;</span>参数使用。
<span class="token parameter variable">-s</span> 显示文件状态，本参数需配合<span class="token string">&quot;-l&quot;</span>参数使用。
<span class="token parameter variable">--scripts</span> 列出安装套件的 Script 的变量
<span class="token parameter variable">--requires</span> 查询该套件所需要的兼容度

-----

-i<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span>/--install<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span> 安装指定的套件档
-U<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span>/--upgrade<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span> 升级指定的套件档
-e<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span>/--erase<span class="token operator">&lt;</span>套件档<span class="token operator">&gt;</span> 删除指定的套件

--root<span class="token operator">&lt;</span>根目录<span class="token operator">&gt;</span> 设置欲当作根目录的目录
-relocate<span class="token operator">&lt;</span>原目录<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>新目录<span class="token operator">&gt;</span> 设置目录映射

<span class="token parameter variable">--force</span> 强行置换套件或文件
<span class="token parameter variable">--nodeps</span> 不验证套件档的相互关联性

<span class="token parameter variable">-v</span> 显示指令执行过程
<span class="token parameter variable">-vv</span> 详细显示指令执行过程，便于排错
-h/--hash 套件安装时列出标记
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-q</span> samba //查询程序是否安装
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> httpd       <span class="token comment"># [搜索指定rpm包是否安装]--all搜索*httpd*</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ql</span> httpd          <span class="token comment"># [搜索rpm包]--list所有文件安装目录</span>

<span class="token comment"># 列出RPM软件包内的文件信息[Query Package list]</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qlp</span>
<span class="token comment">#查看rpm包的安装脚本</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qp</span> <span class="token parameter variable">--scripts</span>
<span class="token comment">#查看rpm包的依赖性关系</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qp</span> <span class="token parameter variable">--requires</span>
<span class="token comment">#查看rpm包详细信息</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qi</span>
－qpi：列出RPM软件包的描述信息<span class="token punctuation">[</span>Query Package <span class="token function">install</span> package<span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">]</span>；
－qf：查找指定文件属于哪个RPM软件包<span class="token punctuation">[</span>Query File<span class="token punctuation">]</span>；
<span class="token function">rpm</span> <span class="token parameter variable">-qpi</span> Linux-1.4-6.i368.rpm <span class="token comment"># [查看rpm包]--query--package--install package信息</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qpi</span> http://mirrors.kernel.org/fedora/core/4/i386/os/ Fedora/RPMS/gaim-1.3.0-1.fc4.i386.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-qpf</span> Linux-1.4-6.i368.rpm <span class="token comment"># [查看rpm包]--file</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qpR</span> file.rpm        <span class="token comment"># [查看包]依赖关系</span>
rpm2cpio file.rpm <span class="token operator">|</span>cpio <span class="token parameter variable">-div</span> <span class="token comment"># [抽出文件]</span>
<span class="token comment">#查看rpm包的更新记录</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qp</span> <span class="token parameter variable">--changelog</span>
 
<span class="token comment">#安装rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span>  /media/cdrom/RedHat/RPMS/samba-3.0.10-1.4E.i386.rpm <span class="token comment"># 按路径安装并显示进度</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> http://mirrors.kernel.org/fedora/core/4/i386/os/ Fedora/RPMS/gaim-1.3.0-1.fc4.i386.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--relocate</span> /<span class="token operator">=</span>/opt/gaim gaim-1.3.0-1.fc4.i386.rpm    <span class="token comment"># 指定安装目录 | gaim 的所有文件都是安装在 /opt/gaim 中，我们只是把gaim 目录备份一下，然后卸掉gaim；这样其实也算提取文件的一点用法；</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--test</span> gaim-1.3.0-1.fc4.i386.rpm    <span class="token comment"># 用来检查依赖关系；并不是真正的安装；</span>
<span class="token comment">#更新软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> <span class="token parameter variable">--oldpackage</span> gaim-1.3.0-1.fc4.i386.rpm <span class="token comment"># 新版本降级为旧版本</span>
<span class="token comment">#卸载软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span>
 
<span class="token function">rpm</span> <span class="token parameter variable">--recompile</span> vim-4.6-4.src.rpm <span class="token comment"># 这个命令会把源代码解包并编译、安装它，如果用户使用命令：</span>
<span class="token function">rpm</span> <span class="token parameter variable">--rebuild</span> vim-4.6-4.src.rpm <span class="token comment"># 在安装完成后，还会把编译生成的可执行文件重新包装成i386.rpm的RPM软件包。</span>

<span class="token comment">#在安装过程中指定相对安装路径</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--nodeps</span> <span class="token parameter variable">--force</span> <span class="token parameter variable">--root</span><span class="token operator">=</span>你指定的路径
<span class="token comment">#在安装过程中忽略依赖性关系</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--nodeps</span> <span class="token parameter variable">--force</span>
 
<span class="token comment">#重新编译rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ba</span> spec配置文件
<span class="token comment">#如何修改rpm源码包的编译参数</span>
修改安装源码包后产生的 spec 文件。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function k(h,g){const n=t("ExternalLinkIcon");return i(),l("div",null,[o,a("ul",null,[a("li",null,[a("a",d,[s("RPM 命令字面解释"),e(n)])]),a("li",null,[a("a",m,[s("RPM 命令字面解释（详细）"),e(n)])])]),v,a("p",null,[a("a",u,[s("RPM 命令选项查询"),e(n)])]),b])}const P=r(c,[["render",k],["__file","rpm.html.vue"]]);export{P as default};
