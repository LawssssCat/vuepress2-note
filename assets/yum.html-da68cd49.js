import{_ as e,r as i,o as l,c as r,a as n,b as d,d as t,e as a}from"./app-04e6f892.js";const o={},c=a(`<p>centos 系列在用。</p><p>开始叫 yum，以后叫 dnf。 todo 改名目的</p><h2 id="配置镜像源" tabindex="-1"><a class="header-anchor" href="#配置镜像源" aria-hidden="true">#</a> 配置镜像源</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看系统有哪些可用的yum源</span>
yum repolist all

<span class="token comment"># 下载镜像源配置</span>
<span class="token function">wget</span> <span class="token parameter variable">-p</span> /etc/yum.repo.d/  http://mirrors.aliyun.com/repo/Centos-7.repo

<span class="token comment"># 清理包列表缓存</span>
yum clean all 
<span class="token comment"># 构建包列表缓存</span>
yum makecache
yum repolist 

<span class="token comment"># 指定本地源安装rpm包</span>
yum <span class="token function">install</span> <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span> <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span>
yum localinstall <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span> <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token operator">&lt;</span>repository<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="场景-内网离线安装软件包" tabindex="-1"><a class="header-anchor" href="#场景-内网离线安装软件包" aria-hidden="true">#</a> 场景：内网离线安装软件包</h2><h3 id="下载-rpm-包及相关依赖并保存到本地" tabindex="-1"><a class="header-anchor" href="#下载-rpm-包及相关依赖并保存到本地" aria-hidden="true">#</a> 下载 RPM 包及相关依赖并保存到本地</h3><h4 id="一、-downloadonly" tabindex="-1"><a class="header-anchor" href="#一、-downloadonly" aria-hidden="true">#</a> 一、 downloadonly</h4><p>yum 命令本身就可以用来下载一个 RPM 包，标准的 yum 命令提供了 <code>--downloadonly</code> （只下载）的选项来达到这个目的。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>在 CentOS/RHEL6 或更早期的版本中，你需要安装一个单独 yum 插件(名称为 <code>yum-plugin-downloadonly</code>)才能使用 <code>--downloadonly</code> 命令选项</p></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>如果下载的包包含了任何没有满足的依赖关系，yum 将会把所有的依赖关系包下载，但是都不会被安装。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下，一个下载的 RPM 包会保存在 <code>/var/cache/yum/x86_64/[centos/fedora-version]/[repository]/packages</code> 中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=</span><span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>package<span class="token operator">&gt;</span>
yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=</span>./python python
yum reinstall <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=</span>./python python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="二、-yumdownloader" tabindex="-1"><a class="header-anchor" href="#二、-yumdownloader" aria-hidden="true">#</a> 二、 yumdownloader</h4><p>yumdownloader 是 yum 工具包(包含了用来进行 yum 包管理的帮助工具套件)的子集。</p><p>下载的包会被保存在当前目录中，你需要使用root权限，因为yumdownloader会在下载过程中更新包索引文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> yum-utils

<span class="token comment"># --resolve 依赖包也会被下载</span>
<span class="token comment"># --enablerepo=&lt;repository&gt; 指定yum源</span>
yumdownloader <span class="token operator">&lt;</span>package-name<span class="token operator">&gt;</span> <span class="token parameter variable">--resolve</span> <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token punctuation">[</span>repo<span class="token punctuation">]</span>

<span class="token comment"># --destdir 相关依赖的保存路径</span>
yumdownloader <span class="token parameter variable">--resolve</span> <span class="token parameter variable">--destdir</span> /tmp/rpms/maven maven

<span class="token comment"># --enablerepo 指定yum源</span>
yumdownloader <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>elrepo-kernel <span class="token parameter variable">--resolve</span> <span class="token parameter variable">--destdir</span><span class="token operator">=</span>/tmp kernel-lt   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="三、-repotrack" tabindex="-1"><a class="header-anchor" href="#三、-repotrack" aria-hidden="true">#</a> 三、 repotrack</h4><p>这个比较狠，会下载全量的依赖包，也就是说：将主软件、主软件的依赖包以及依赖包的依赖包全量下载下来。 一般情况下使用前两种方法，除非待安装的机器相当干净的情况下才使用方法三。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># --download_path 相关依赖的保存路径</span>
repotrack <span class="token parameter variable">--download_path</span><span class="token operator">=</span>/tmp/t maven
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打包、解压" tabindex="-1"><a class="header-anchor" href="#打包、解压" aria-hidden="true">#</a> 打包、解压</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> ansible-yum.tar.gz /tmp/ansible-yum/
<span class="token comment"># -C, --directory=DIR        change to directory DIR</span>
<span class="token function">tar</span> zxvf ansible-yum.tar.gz <span class="token parameter variable">-C</span> /tmp/ansible-yum/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-rpm-包" tabindex="-1"><a class="header-anchor" href="#安装-rpm-包" aria-hidden="true">#</a> 安装 RPM 包</h3><h4 id="一、-直接安装" tabindex="-1"><a class="header-anchor" href="#一、-直接安装" aria-hidden="true">#</a> 一、 直接安装</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># --force 强行置换套件或文件</span>
<span class="token comment"># --nodeps 不验证套件档的相互关联性</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> *.rpm <span class="token parameter variable">--nodeps</span> <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、-制作成-repo-安装" tabindex="-1"><a class="header-anchor" href="#二、-制作成-repo-安装" aria-hidden="true">#</a> 二、 制作成 repo 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> createrep
createrepo /tmp/ansible-yum/

<span class="token function">vim</span> /etc/yum.repo.d/ansible-yum.repo
    <span class="token punctuation">[</span>ansible<span class="token punctuation">]</span>
    <span class="token assign-left variable">name</span><span class="token operator">=</span>ansible
    <span class="token assign-left variable">baseurl</span><span class="token operator">=</span>file:///tmp/ansible-yum/
    <span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
    <span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>	
yum clean all 
yum makecache
yum repolist 

yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ansible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看软件包安装路径" tabindex="-1"><a class="header-anchor" href="#查看软件包安装路径" aria-hidden="true">#</a> 查看软件包安装路径</h2><p>参考：</p>`,29),p={href:"https://www.cnblogs.com/droxy/articles/17554595.html",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装软件</span>
$ yum <span class="token function">install</span> <span class="token parameter variable">-y</span> postgresql15-server
<span class="token comment"># 软件安装目录</span>
$ <span class="token function">rpm</span> <span class="token parameter variable">-ql</span> python3
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>e.g.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@yeebian ~<span class="token punctuation">]</span><span class="token comment"># yum -y install httpd</span>
<span class="token punctuation">[</span>root@yeebian ~<span class="token punctuation">]</span><span class="token comment"># rpm -qa | grep httpd</span>
httpd-tools-2.2.15-60.el6.centos.4.x86_64
httpd-2.2.15-60.el6.centos.4.x86_64
<span class="token punctuation">[</span>root@yeebian ~<span class="token punctuation">]</span><span class="token comment"># rpm -ql httpd-2.2.15-60.el6.centos.4.x86_64</span>
/etc/httpd
/etc/httpd/conf
/etc/httpd/conf.d
<span class="token punctuation">..</span>.
/usr/lib64/httpd
/usr/lib64/httpd/modules
<span class="token punctuation">..</span>.
/usr/sbin/apachectl
/usr/sbin/htcacheclean
/usr/sbin/httpd
<span class="token punctuation">..</span>.
/usr/share/doc/httpd-2.2.15
<span class="token punctuation">..</span>.
/var/cache/mod_proxy
/var/lib/dav
/var/log/httpd
/var/run/httpd
/var/www
/var/www/cgi-bin
/var/www/error
/var/www/error/HTTP_BAD_GATEWAY.html.var
<span class="token punctuation">..</span>.
<span class="token punctuation">[</span>root@yeebian ~<span class="token punctuation">]</span><span class="token comment"># rpm -ql httpd-tools-2.2.15-60.el6.centos.4.x86_64</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function u(v,b){const s=i("ExternalLinkIcon");return l(),r("div",null,[c,n("ul",null,[n("li",null,[n("a",p,[d("CentOS下查看yum及rpm安装后的软件位置"),t(s)])])]),m])}const k=e(o,[["render",u],["__file","yum.html.vue"]]);export{k as default};
