import{_ as o,r as i,o as p,c,a as s,b as n,d as a,w as r,e as l}from"./app-01e1299e.js";const d={},u=l(`<h2 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h2><p>源码地址： https://www.python.org/downloads/source/</p><p>参考：</p><ul><li>https://devguide.python.org/getting-started/setup-building/</li></ul><div class="custom-container warning"><p class="custom-container-title">注意</p><p>不要手贱： centos8版本等系统一般都会自带集成python3及python版本，供系统底层调用。 不要删除系统中的python旧版本及其目录结构，避免系统依赖出错。 新版本安装到新地址，安装完后把系统中相关配置指向新版本所在目录，做相关配置即可。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> /etc/os-release
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;Fedora Linux&quot;</span>
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">&quot;39 (Workstation Edition)&quot;</span>
<span class="token assign-left variable">ID</span><span class="token operator">=</span>fedora
<span class="token assign-left variable">VERSION_ID</span><span class="token operator">=</span><span class="token number">39</span>
<span class="token assign-left variable">VERSION_CODENAME</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">PLATFORM_ID</span><span class="token operator">=</span><span class="token string">&quot;platform:f39&quot;</span>
<span class="token assign-left variable">PRETTY_NAME</span><span class="token operator">=</span><span class="token string">&quot;Fedora Linux 39 (Workstation Edition)&quot;</span>
<span class="token assign-left variable">ANSI_COLOR</span><span class="token operator">=</span><span class="token string">&quot;0;38;2;60;110;180&quot;</span>
<span class="token assign-left variable">LOGO</span><span class="token operator">=</span>fedora-logo-icon
<span class="token assign-left variable">CPE_NAME</span><span class="token operator">=</span><span class="token string">&quot;cpe:/o:fedoraproject:fedora:39&quot;</span>
<span class="token assign-left variable">DEFAULT_HOSTNAME</span><span class="token operator">=</span><span class="token string">&quot;fedora&quot;</span>
<span class="token assign-left variable">HOME_URL</span><span class="token operator">=</span><span class="token string">&quot;https://fedoraproject.org/&quot;</span>
<span class="token assign-left variable">DOCUMENTATION_URL</span><span class="token operator">=</span><span class="token string">&quot;https://docs.fedoraproject.org/en-US/fedora/f39/system-administrators-guide/&quot;</span>
<span class="token assign-left variable">SUPPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://ask.fedoraproject.org/&quot;</span>
<span class="token assign-left variable">BUG_REPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://bugzilla.redhat.com/&quot;</span>
<span class="token assign-left variable">REDHAT_BUGZILLA_PRODUCT</span><span class="token operator">=</span><span class="token string">&quot;Fedora&quot;</span>
<span class="token assign-left variable">REDHAT_BUGZILLA_PRODUCT_VERSION</span><span class="token operator">=</span><span class="token number">39</span>
<span class="token assign-left variable">REDHAT_SUPPORT_PRODUCT</span><span class="token operator">=</span><span class="token string">&quot;Fedora&quot;</span>
<span class="token assign-left variable">REDHAT_SUPPORT_PRODUCT_VERSION</span><span class="token operator">=</span><span class="token number">39</span>
<span class="token assign-left variable">SUPPORT_END</span><span class="token operator">=</span><span class="token number">2024</span>-05-14
<span class="token assign-left variable">VARIANT</span><span class="token operator">=</span><span class="token string">&quot;Workstation Edition&quot;</span>
<span class="token assign-left variable">VARIANT_ID</span><span class="token operator">=</span>workstation
$ <span class="token function">uname</span> <span class="token parameter variable">-a</span>
Linux fedora <span class="token number">6.5</span>.6-300.fc39.x86_64 <span class="token comment">#1 SMP PREEMPT_DYNAMIC Fri Oct  6 19:57:21 UTC 2023 x86_64 GNU/Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装依赖</span>
<span class="token comment"># yum install -y zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc* make</span>
<span class="token comment"># yum install -y make gcc gcc-c++</span>
<span class="token comment"># yum install -y openssl-devel bzip2-devel libffi-devel</span>
<span class="token comment"># yum groupinstall -y &#39;Development Tools&#39;</span>
yum <span class="token function">install</span> <span class="token function">wget</span> gcc <span class="token function">make</span> readline-devel
<span class="token comment"># yum install python-devel</span>
<span class="token comment"># yum install libuuid-devel</span>
<span class="token comment"># yum install mysql-devel</span>
<span class="token comment"># 解决 import bz2 报错</span>
yum <span class="token function">install</span>  bzip2-devel
<span class="token comment"># 解决 import curses 报错</span>
yum <span class="token function">install</span>  ncurses-devel
<span class="token comment"># 解决 import sqlite3 报错</span>
yum <span class="token function">install</span> sqlite-devel
<span class="token comment"># 解决 _dbm _gdbm 缺失提醒</span>
yum <span class="token function">install</span> gdbm-devel
<span class="token comment"># 解决 _lzma 缺失提醒</span>
yum <span class="token function">install</span> xz-devel
<span class="token comment"># 解决 _tkinter 缺失提醒</span>
yum <span class="token function">install</span> tk-devel
<span class="token comment"># 解决 readline 缺失提醒及方向键行为非预期的问题</span>
yum <span class="token function">install</span> readline-devel
yum <span class="token function">install</span> zlib-devel
<span class="token comment"># 解决 ImportError: No module named ‘_ctypes’ 错误</span>
yum <span class="token function">install</span> libffi-devel

<span class="token function">wget</span> https://www.python.org/ftp/python/3.10.1/Python-3.10.1.tgz
<span class="token comment"># wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz</span>
<span class="token comment"># 解压</span>
<span class="token comment"># tar -xfv Python-3.12.1.tgz &amp;&amp; cd \${_%.*}</span>
<span class="token function">tar</span> xvf Python-3.10.1.tgz

<span class="token comment">###############</span>
<span class="token comment"># 编译/安装</span>
<span class="token comment">###############</span>

<span class="token comment"># make clean</span>
<span class="token comment"># make distclean # 清理全部，包括 ./configure 生成的 Makefile 相关文件</span>

<span class="token comment"># ./configure</span>
<span class="token comment"># --prefix 指定安装目录，这样的话所有文件将放在一个目录下，方便安装、下载</span>
<span class="token comment">#          若不配置默认在 /usr/local 目录（比较凌乱，与程序其他共享）</span>
<span class="token comment">#          + 可执行文件   —— /usr/local/bin</span>
<span class="token comment">#          + 库文件       —— /usr/local/lib</span>
<span class="token comment">#          + 配置文件     —— /usr/local/etc</span>
<span class="token comment">#          + 其他资源文件 —— /usr/local/share</span>
<span class="token comment"># --enable-optimizations 优化选项（LTO,PGO 等）。加上这个 flag 编译后，性能有 10% 左右的优化，但是这会明显的增加编译时间</span>
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/python3.10 --enable-optimizations
<span class="token comment"># make &amp;&amp; make install</span>
<span class="token function">make</span> <span class="token parameter variable">-j8</span>
<span class="token function">make</span> <span class="token function">install</span>

<span class="token comment">###############</span>
<span class="token comment"># 环境变量</span>
<span class="token comment">###############</span>

<span class="token comment"># 需要管理员权限</span>
<span class="token comment"># ./configure --prefix=/usr/local/python3.10 --enable-optimizations</span>
<span class="token comment"># rm ln /usr/bin/python3</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python3.10/bin/python3 /usr/bin/python3
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python3.10/bin/pip3 /usr/bin/pip3

<span class="token comment"># 不需要管理员权限</span>
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/python3.10/bin/:<span class="token environment constant">$PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题-the-necessary-bits-to-build-these-optional-modules-were-not-found" tabindex="-1"><a class="header-anchor" href="#问题-the-necessary-bits-to-build-these-optional-modules-were-not-found" aria-hidden="true">#</a> 问题： The necessary bits to build these optional modules were not found</h4><p>很多时候，编译完 python 会出现下面提示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>The necessary bits to build these optional modules were not found:
_bz2                  _ctypes               _ctypes_test
_dbm                  _gdbm                 _hashlib
_lzma                 _ssl                  _tkinter
_uuid                 nis                   readline
zlib
To <span class="token function">find</span> the necessary bits, <span class="token function">look</span> <span class="token keyword">in</span> configure.ac and config.log.

Could not build the ssl module<span class="token operator">!</span>
Python requires a OpenSSL <span class="token number">1.1</span>.1 or newer

Checked <span class="token number">111</span> modules <span class="token punctuation">(</span><span class="token number">31</span> built-in, <span class="token number">65</span> shared, <span class="token number">1</span> n/a on linux-x86_64, <span class="token number">1</span> disabled, <span class="token number">13</span> missing, <span class="token number">0</span> failed on <span class="token function">import</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># yum install wget gcc make readline-devel</span>
Python build finished successfully<span class="token operator">!</span>
The necessary bits to build these optional modules were not found:
_bz2                  _dbm                  _gdbm
_hashlib              _lzma                 _sqlite3
_ssl                  _tkinter              _uuid
nis                   zlib
To <span class="token function">find</span> the necessary bits, <span class="token function">look</span> <span class="token keyword">in</span> setup.py <span class="token keyword">in</span> detect_modules<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> the module&#39;s name.


The following modules found by detect_modules<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">in</span> setup.py, have been
built by the Makefile instead, as configured by the Setup files:
_abc                  <span class="token builtin class-name">pwd</span>                   <span class="token function">time</span>


Failed to build these modules:
_ctypes


Could not build the ssl module<span class="token operator">!</span>
Python requires a OpenSSL <span class="token number">1.1</span>.1 or newer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo</p><h4 id="问题-python3-10编译安装报ssl失败解决方法" tabindex="-1"><a class="header-anchor" href="#问题-python3-10编译安装报ssl失败解决方法" aria-hidden="true">#</a> 问题： python3.10编译安装报SSL失败解决方法</h4><p>参考：</p><ul><li>编译Python3.7并配置ssl库为LibreSSL - https://cloud.tencent.com/developer/article/1397343</li><li>python3.10及以上版本编译安装ssl模块 - https://blog.csdn.net/ye__mo/article/details/129436629</li><li>Python3.11を最速インストールしようとしてSSLモジュールでハマった話 - https://qiita.com/KBT777/items/2ae15faa4b8c7101d6f1</li><li>python3安装，支持openssl，支持采集https - https://www.cnblogs.com/mengzhilva/p/11059329.html</li></ul><p>在 python3.10 之后版本不再支持 libressl 使用 ssl。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>openssl 1.0.1以下的版本不支持TLSV1.1 TLSV1.2。 出于安全考虑，很多被调用的HTTPS已经不支持TLSV1.1以下的版本了</p></div>`,17),v={href:"https://docs.python.org/3/whatsnew/3.10.html",target:"_blank",rel:"noopener noreferrer"},m=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Could not build the ssl module<span class="token operator">!</span>
Python requires a OpenSSL <span class="token number">1.1</span>.1 or newer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>在 python 3.7 的报错如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Could not build the ssl module<span class="token operator">!</span>
Python requires an OpenSSL <span class="token number">1.0</span>.2 or <span class="token number">1.1</span> compatible libssl with X509_VERIFY_PARAM_set1_host<span class="token punctuation">(</span><span class="token punctuation">)</span>.
LibreSSL <span class="token number">2.6</span>.4 and earlier <span class="token keyword">do</span> not provide the necessary APIs, https://github.com/libressl-portable/portable/issues/381
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里提到的 LibreSSL 是 OpenSSL 加密软件库的一个分支，是一个安全套接层（SSL）和传输层安全（TLS）协议的开源实现。 在 OpenSSL 爆出心脏出血安全漏洞（Heartbleed bug）之后，一些 OpenBSD 开发者于2014年4月创立了 LibreSSL，目标是重构 OpenSSL 的代码，以提供一个更安全的替代品。LibreSSL 复刻自 OpenSSL 库的 1.0.1g 分支，它将遵循 OpenBSD 基金会在其他项目所使用的安全指导原则。</p></div><p>进入 python 也无法 import ssl</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./python
Python <span class="token number">3.12</span>.2 <span class="token punctuation">(</span>main, Mar <span class="token number">24</span> <span class="token number">2024</span>, <span class="token number">16</span>:37:32<span class="token punctuation">)</span> <span class="token punctuation">[</span>GCC <span class="token number">11.4</span>.0<span class="token punctuation">]</span> on linux
Type <span class="token string">&quot;help&quot;</span>, <span class="token string">&quot;copyright&quot;</span>, <span class="token string">&quot;credits&quot;</span> or <span class="token string">&quot;license&quot;</span> <span class="token keyword">for</span> <span class="token function">more</span> information.
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token function">import</span> ssl
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  File <span class="token string">&quot;&lt;stdin&gt;&quot;</span>, line <span class="token number">1</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
  File <span class="token string">&quot;/home/uv01/build-python/Python-3.12.2/Lib/ssl.py&quot;</span>, line <span class="token number">100</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    <span class="token function">import</span> _ssl             <span class="token comment"># if we can&#39;t import it, let the error propagate</span>
    ^^^^^^^^^^^
ModuleNotFoundError: No module named <span class="token string">&#39;_ssl&#39;</span>

<span class="token comment"># 或者 pip 无法下载 https 资源</span>
pip is configured with locations that require TLS/SSL, however the ssl module <span class="token keyword">in</span> Python is not available.

Retrying <span class="token punctuation">(</span>Retry<span class="token punctuation">(</span>total<span class="token operator">=</span><span class="token number">4</span>, <span class="token assign-left variable">connect</span><span class="token operator">=</span>None, <span class="token assign-left variable">read</span><span class="token operator">=</span>None, <span class="token assign-left variable">redirect</span><span class="token operator">=</span>None, <span class="token assign-left variable">status</span><span class="token operator">=</span>None<span class="token punctuation">))</span> after connection broken by &#39;SSLError<span class="token punctuation">(</span>&quot;Can’t connect to HTTPS URL because the SSL module is not available.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="步骤一-升级openssl" tabindex="-1"><a class="header-anchor" href="#步骤一-升级openssl" aria-hidden="true">#</a> 步骤一： 升级openssl</h5>`,5),b=l(`<h5 id="步骤二-可选1-安装libssl开发工具" tabindex="-1"><a class="header-anchor" href="#步骤二-可选1-安装libssl开发工具" aria-hidden="true">#</a> 步骤二（可选1）： 安装libssl开发工具</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># yum install openssl-devel</span>
<span class="token function">apt</span> <span class="token function">install</span> libssl-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装这个之后，直接重新编译python即可</p><h5 id="步骤二-可选2-编译python编译配置" tabindex="-1"><a class="header-anchor" href="#步骤二-可选2-编译python编译配置" aria-hidden="true">#</a> 步骤二（可选2）： 编译python编译配置</h5><p>修改Python编译源文件的Module/Setup链接，修改如下： （每个人的文件可能不一样，以自己的为准） todo 自动化脚本</p><p>for python-3.11.2</p><div class="language-make line-numbers-mode" data-ext="make"><pre class="language-make"><code># To statically link OpenSSL:
- # _ssl _ssl.c $(OPENSSL_INCLUDES) $(OPENSSL_LDFLAGS) \\
- #    -l:libssl.a -Wl,--exclude-libs,libssl.a \\
- #    -l:libcrypto.a -Wl,--exclude-libs,libcrypto.a
- # _hashlib _hashopenssl.c $(OPENSSL_INCLUDES) $(OPENSSL_LDFLAGS) \\
- #    -l:libcrypto.a -Wl,--exclude-libs,libcrypto.a
+ _ssl _ssl.c $(OPENSSL_INCLUDES) $(OPENSSL_LDFLAGS) \\
+     -l:libssl.a -Wl,--exclude-libs,libssl.a \\
+     -l:libcrypto.a -Wl,--exclude-libs,libcrypto.a
+ _hashlib _hashopenssl.c $(OPENSSL_INCLUDES) $(OPENSSL_LDFLAGS) \\
+     -l:libcrypto.a -Wl,--exclude-libs,libcrypto.a

./configure --prefix=/usr/local/python-3.11.2 \\
  --with-zlib=/usr/include/ \\
  --with-openssl-rpath=auto \\
  --with-openssl=/usr/include/openssl \\
  OPENSSL_LDFLAGS=-L/usr/include/openssl \\
  OPENSSL_LIBS=-l/usr/include/openssl/ssl \\
  OPENSSL_INCLUDES=-I/usr/include/openssl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for python3.10.7</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">OPENSSL</span><span class="token operator">=</span>/usr/local/openssl
_ssl _ssl.c <span class="token punctuation">\\</span>
    -I<span class="token variable"><span class="token variable">$(</span>OPENSSL<span class="token variable">)</span></span>/include -L<span class="token variable"><span class="token variable">$(</span>OPENSSL<span class="token variable">)</span></span>/lib64 <span class="token punctuation">\\</span>    <span class="token punctuation">(</span>看openssl安装目录下面是lib  还是lib64  改成跟自己安装目录一样<span class="token punctuation">)</span>
    <span class="token parameter variable">-lssl</span> <span class="token parameter variable">-lcrypto</span>
_hashlib _hashopenssl.c <span class="token punctuation">\\</span>
     -I<span class="token variable"><span class="token variable">$(</span>OPENSSL<span class="token variable">)</span></span>/include -L<span class="token variable"><span class="token variable">$(</span>OPENSSL<span class="token variable">)</span></span>/lib64 <span class="token punctuation">\\</span>
     <span class="token parameter variable">-lcrypto</span>

./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/python3.10 <span class="token punctuation">\\</span>
  --enable-optimizations <span class="token punctuation">\\</span>
  --with-openssl<span class="token operator">=</span>/usr/local/openssl <span class="token punctuation">\\</span>
  --with-ensurepip<span class="token operator">=</span>yes <span class="token punctuation">\\</span>
  <span class="token assign-left variable">CFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-I/usr/local/openssl/include&quot;</span> <span class="token punctuation">\\</span>
  <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-L/usr/local/openssl/lib64&quot;</span>

<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> altinstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题-enable-shared" tabindex="-1"><a class="header-anchor" href="#问题-enable-shared" aria-hidden="true">#</a> 问题： --enable-shared</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/home/steven/python-2.7 --enable-shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在大多数 Unix 系统上（除了 Mac OS X 之外），共享库的路径不是绝对路径。 因此，如果我们在非标准位置安装 Python，为了不和相同版本的系统 Python 产生干扰，我们需要配置非标准位置安装的 Python共享库的路径，或者通过设置运行时的环境变量， 如 <code>LD_LIBRARY_PATH</code>。</p><p>或者配置编译选项时加上 <code>LDFLAGS=-Wl,-rpath=&lt;path&gt;</code> 参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># LDFLAGS=-Wl,&lt;options...&gt; 链接配置</span>
<span class="token comment"># -rpath=&lt;path&gt; 运行时的动态链接库位置</span>
./configure --enable-shared <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/opt/python <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span>-Wl,-rpath<span class="token operator">=</span>/opt/python/lib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题-安全编译选项" tabindex="-1"><a class="header-anchor" href="#问题-安全编译选项" aria-hidden="true">#</a> 问题： 安全编译选项</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编译选项： 使用 CFLAGS 或者 CFLAGS_NODIST 都可以</span>
<span class="token assign-left variable">CFLAGS_NODIST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${CFLAGS_NODIST}</span> -fPIC&quot;</span>
<span class="token assign-left variable">CFLAGS_NODIST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${CFLAGS_NODIST}</span> -fstack-protector-strong&quot;</span>
<span class="token builtin class-name">export</span> CFLAGS_NODIST

<span class="token comment"># 链接选项： 必须使用 LDFLAGS_NODIST</span>
<span class="token comment"># 💡在 Makefile 中 LDFLAGS 和 LDFLAGS_NODIST 都有使用（重复使用不影响），但是如果仅使用 LDFLAGS 带入参数，则 Makefile 在调用 setup.py 编译四个模块时，无法读取到传入的 LDFLAGS 值（因为没有去读取 LDFLAGS，只读了 LDFLAGS_NODIST）。</span>
<span class="token assign-left variable">LDFLAGS_NODIST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LDFLAGS_NODIST}</span> -Wl,-z,relro&quot;</span>
<span class="token assign-left variable">LDFLAGS_NODIST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LDFLAGS_NODIST}</span> -Wl,-z,now&quot;</span>
<span class="token assign-left variable">LDFLAGS_NODIST</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LDFLAGS_NODIST}</span> -Wl,-z,noexecstack&quot;</span>
<span class="token builtin class-name">export</span> LDFLAGS_NODIST

<span class="token comment"># 链接python的bin文件的专用选项： 使用 LINKFORSHARED 通过执行 ./configure 读取 Makefile 中的 LINKFORSHARED 传入</span>
<span class="token comment"># 💡该选项不同系统不同。</span>
<span class="token comment"># 选项 for SUSE Linux Enterprise Server 12 SP2</span>
<span class="token assign-left variable">LINKFORSHARED</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LINKFORSHARED}</span> -Xlinker -export-dynamic&quot;</span>
<span class="token comment"># 💡解释：为什么 pie 编译选项放在这里传入</span>
<span class="token comment">#         若通过 LDFLAGS 或 LDFLAGS_NODIST 传递的话，会在编译 os 是用到，导致编译 os 报错（这个选项不能用于动态库的编译）</span>
<span class="token comment">#         所以将该选项加到了 LINKFORSHARED 中</span>
<span class="token assign-left variable">LINKFORSHARED</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${LINKFORSHARED}</span> -Xlinker -export-dynamic&quot;</span>
<span class="token builtin class-name">export</span> LINKFORSHARED

./config --enable-optimizations --enable-shared --with-ssl <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/opt/python <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span>-Wl,-rpath<span class="token operator">=</span>/opt/python/lib
<span class="token comment"># 💡 --with-ssl 参数3.7有，3.10已不生效，需手动指定系统 openssl 位置 todo</span>
<span class="token comment"># 💡 -rpath 存在安全编译问题</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题-多线程编译" tabindex="-1"><a class="header-anchor" href="#问题-多线程编译" aria-hidden="true">#</a> 问题： 多线程编译</h4><p>参考：</p><ul><li>Compiling Python from source: multiple threads for tests? https://stackoverflow.com/questions/49793880/compiling-python-from-source-multiple-threads-for-tests</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> <span class="token assign-left variable">PROFILE_TASK</span><span class="token operator">=</span><span class="token string">&quot;-m test.regrtest --pgo -j8&quot;</span> <span class="token parameter variable">-j8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="问题-跳过测试" tabindex="-1"><a class="header-anchor" href="#问题-跳过测试" aria-hidden="true">#</a> 问题： 跳过测试</h4><p>参考：</p><ul><li>Make (install from source) python without running tests | https://stackoverflow.com/questions/44708262/make-install-from-source-python-without-running-tests</li></ul><p><code>--enable-optimizations</code> 听说加了这个参数会优化新能，但会开启一堆测试，增加几倍的编译时间。</p><p>有没有既要也要的办法？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span> <span class="token parameter variable">-j8</span> build_all <span class="token comment"># 只编译，不测试。 me：这样相当于没开--enable-optimizations</span>
<span class="token function">make</span> <span class="token parameter variable">-j8</span> altinstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态编译" tabindex="-1"><a class="header-anchor" href="#静态编译" aria-hidden="true">#</a> 静态编译</h2><p>参考：</p>`,28),k={href:"https://wiki.python.org/moin/BuildStatically",target:"_blank",rel:"noopener noreferrer"},h=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./configure <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-static&quot;</span> --disable-shared
<span class="token comment"># LINKFORSHARED=“ ” 阻止将 -export-dynamic 传递给链接器，这将导致二进制文件被构建为动态链接的可执行文件。您可能需要其他标志才能成功生成。</span>
$ <span class="token function">make</span> <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-static&quot;</span> <span class="token assign-left variable">LINKFORSHARED</span><span class="token operator">=</span><span class="token string">&quot; &quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 通过 statically linked 可判断是否静态编译</span>
<span class="token function">file</span> python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题-部分模块未编译-如-modulenotfounderror-no-module-named-posixsubprocess" tabindex="-1"><a class="header-anchor" href="#问题-部分模块未编译-如-modulenotfounderror-no-module-named-posixsubprocess" aria-hidden="true">#</a> 问题： 部分模块未编译，如 ModuleNotFoundError: No module named &#39;_posixsubprocess&#39;</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ./python
Python <span class="token number">3.12</span>.2 <span class="token punctuation">(</span>main, Mar <span class="token number">24</span> <span class="token number">2024</span>, <span class="token number">11</span>:21:39<span class="token punctuation">)</span> <span class="token punctuation">[</span>GCC <span class="token number">11.4</span>.0<span class="token punctuation">]</span> on linux
Type <span class="token string">&quot;help&quot;</span>, <span class="token string">&quot;copyright&quot;</span>, <span class="token string">&quot;credits&quot;</span> or <span class="token string">&quot;license&quot;</span> <span class="token keyword">for</span> <span class="token function">more</span> information.
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token function">import</span> subprocess
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  File <span class="token string">&quot;&lt;stdin&gt;&quot;</span>, line <span class="token number">1</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
  File <span class="token string">&quot;/home/uv01/build-python/Python-3.12.2/Lib/subprocess.py&quot;</span>, line <span class="token number">104</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    from _posixsubprocess <span class="token function">import</span> fork_exec as _fork_exec
ModuleNotFoundError: No module named <span class="token string">&#39;_posixsubprocess&#39;</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo</p><h3 id="问题-glibc-的问题-musl-libc-的使用" tabindex="-1"><a class="header-anchor" href="#问题-glibc-的问题-musl-libc-的使用" aria-hidden="true">#</a> 问题： Glibc 的问题，Musl libc 的使用</h3><p>参考：</p>`,7),g={href:"https://linuxstory.org/musl-libc-yet-another-libc/",target:"_blank",rel:"noopener noreferrer"},f=l('<p>Python 依赖 Glibc。Glibc 存在很多问题：</p><ul><li>源码可读性差</li><li>性能差</li><li>体积大</li><li>对静态链接支持不佳 【重点】</li></ul><p>理论上来说，Glibc 是支持静态链接的。 但，这也仅仅是从理论上来说，由于一些历史遗留问题（当然，也包括对功能实现的考虑）Glibc 的静态链接并不是真正的静态链接： 如果你的程序中使用了某些不支持静态链接的特性（这一点在大型软件中非常常见），那么即便你在链接时选择静态链接，生成出来的程序实际上仍然是依赖于 Glibc 动态库的，一旦你尝试删除掉它，你立马就会发现这些“静态”链接的程序统统罢工不干了。</p><p>解决上 Glibc 述问题，可使用 Musl （Musl + Busybox）。 Musl 从设计之初就很关注静态链接的可用性，因此它完全可以被静态链接进其他程序中，不存在 Glibc 对动态库的依赖问题。</p><p>todo 解决方法唯有在低glibc系统中编译；或者先编译一个低版本glibc，然后改动态库环境变量</p><h3 id="例子-编译脚本-不能无脑用" tabindex="-1"><a class="header-anchor" href="#例子-编译脚本-不能无脑用" aria-hidden="true">#</a> 例子： 编译脚本（不能无脑用）</h3><p>参考：</p>',7),y={href:"http://main.lv/writeup/compile_python.md",target:"_blank",rel:"noopener noreferrer"},_={href:"https://gist.github.com/maddouri/c4b97474f21fabc9ef61",target:"_blank",rel:"noopener noreferrer"},S={href:"https://web.archive.org/web/20180926104719/http://general-purpose.io/2015/12/06/compiling-python-and-libpython-statically-using-musl-libc/",target:"_blank",rel:"noopener noreferrer"},L={href:"https://askubuntu.com/questions/63711/building-a-static-version-of-python",target:"_blank",rel:"noopener noreferrer"},q={href:"https://github.com/bendmorris/static-python",target:"_blank",rel:"noopener noreferrer"},x=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># set -eux</span>

<span class="token comment"># This a simple script that builds static versions of Python and LibPython using musl-libc</span>
<span class="token comment"># Find the associated article at: http://general-purpose.io/2015/12/06/compiling-python-and-libpython-statically-using-musl-libc/</span>

<span class="token assign-left variable">WORKING_DIR</span><span class="token operator">=</span><span class="token string">&quot;/code/static-python&quot;</span>
<span class="token assign-left variable">MUSL_PREFIX</span><span class="token operator">=</span><span class="token string">&quot;/code/static-python/musl&quot;</span>
<span class="token assign-left variable">PY_PREFIX</span><span class="token operator">=</span><span class="token string">&quot;/code/static-python/python&quot;</span>

<span class="token comment"># COMPILER=&quot;gcc&quot;</span>
<span class="token comment"># COMPILER_VERSION=&quot;4.8&quot;</span>
<span class="token assign-left variable">COMPILER</span><span class="token operator">=</span><span class="token string">&quot;clang&quot;</span>
<span class="token assign-left variable">COMPILER_VERSION</span><span class="token operator">=</span><span class="token string">&quot;3.7&quot;</span>

<span class="token comment"># make the compiler&#39;s actual command name</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CC</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${COMPILER}</span>-<span class="token variable">\${COMPILER_VERSION}</span>&quot;</span>

<span class="token comment"># prepare the working directory</span>
<span class="token function">mkdir</span> <span class="token parameter variable">--parents</span> <span class="token string">&quot;<span class="token variable">\${WORKING_DIR}</span>&quot;</span>

<span class="token comment"># download/extract/build static musl libc</span>
<span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">\${WORKING_DIR}</span>&quot;</span>
<span class="token function">wget</span> <span class="token string">&quot;http://www.musl-libc.org/releases/musl-1.1.12.tar.gz&quot;</span>
<span class="token function">tar</span> <span class="token parameter variable">-xzf</span> musl-1.1.12.tar.gz
<span class="token builtin class-name">cd</span> musl-1.1.12
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${MUSL_PREFIX}</span>&quot;</span> --disable-shared
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># enable the &quot;musl compiler&quot;</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CC</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${MUSL_PREFIX}</span>/bin/musl-<span class="token variable">\${COMPILER}</span>&quot;</span>

<span class="token comment"># download/extract/build static python/libpython</span>
<span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">\${WORKING_DIR}</span>&quot;</span>
<span class="token function">wget</span> <span class="token string">&quot;https://www.python.org/ftp/python/3.5.0/Python-3.5.0.tar.xz&quot;</span>
<span class="token function">tar</span> <span class="token parameter variable">-xJf</span> Python-3.5.0.tar.xz
<span class="token builtin class-name">cd</span> Python-3.5.0
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${PY_PREFIX}</span>&quot;</span> --disable-shared  <span class="token punctuation">\\</span>
            <span class="token assign-left variable">LDFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-static&quot;</span> <span class="token assign-left variable">CFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-static&quot;</span> <span class="token assign-left variable">CPPFLAGS</span><span class="token operator">=</span><span class="token string">&quot;-static&quot;</span>
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># done ! (ignore any error that might happen during &quot;make install&quot;)</span>
<span class="token comment"># we now have:</span>
<span class="token comment">#   \${MUSL_PREFIX}/bin/musl-gcc       : &quot;static gcc&quot; that uses musl</span>
<span class="token comment">#   \${PY_PREFIX}/bin/python3.5        : static python interpreter</span>
<span class="token comment">#   \${PY_PREFIX}/lib/libpython3.5m.a  : static libpython</span>
<span class="token comment">#   \${PY_PREFIX}/include/python3.5m   : include directory for libpython</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="升级" tabindex="-1"><a class="header-anchor" href="#升级" aria-hidden="true">#</a> 升级</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># python -m ensurepip --default-pip # 安装pip</span>
pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> python
pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> <span class="token assign-left variable">python</span><span class="token operator">==</span><span class="token number">3</span>.x.x
pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> <span class="token assign-left variable">python</span><span class="token operator">==</span><span class="token number">3.11</span>.4 <span class="token parameter variable">-i</span> http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
python <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 问题： 无版本</span>
$ pip <span class="token function">install</span> <span class="token parameter variable">--upgrade</span> python
Defaulting to user installation because normal site-packages is not writeable
ERROR: Could not <span class="token function">find</span> a version that satisfies the requirement python <span class="token punctuation">(</span>from versions: none<span class="token punctuation">)</span>
ERROR: No matching distribution found <span class="token keyword">for</span> python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或源码编译、安装、环境配置 （需要注意编译异常和编译选项风险）</p>`,5);function P(O,R){const e=i("ExternalLinkIcon"),t=i("RouterLink");return p(),c("div",null,[u,s("p",null,[n("如果"),s("a",v,[n("要编译 ssl 模块则需要在编译环境中配置 openssl 1.1.1 以上"),a(e)]),n("，否则安装 python3 时提示如下信息：")]),m,s("p",null,[n("首先需要编译/安装 openssl 1.1.1 以上版本。 参考： "),a(t,{to:"/dev/c/lib/openssl.html"},{default:r(()=>[n("link")]),_:1})]),b,s("ul",null,[s("li",null,[s("a",k,[n("https://wiki.python.org/moin/BuildStatically"),a(e)])])]),h,s("ul",null,[s("li",null,[s("a",g,[n("https://linuxstory.org/musl-libc-yet-another-libc/"),a(e)])])]),f,s("ul",null,[s("li",null,[s("a",y,[n("http://main.lv/writeup/compile_python.md"),a(e)])]),s("li",null,[n("maddouri/build-static-python.sh | "),s("a",_,[n("https://gist.github.com/maddouri/c4b97474f21fabc9ef61"),a(e)]),n(" A simple script that builds static versions of Python and LibPython using musl-libc")]),s("li",null,[n("Compiling Python and LibPython Statically Using Musl-Libc | "),s("a",S,[n("https://web.archive.org/web/20180926104719/http://general-purpose.io/2015/12/06/compiling-python-and-libpython-statically-using-musl-libc/"),a(e)])]),s("li",null,[n("todo "),s("a",L,[n("https://askubuntu.com/questions/63711/building-a-static-version-of-python"),a(e)])]),s("li",null,[n("todo "),s("a",q,[n("https://github.com/bendmorris/static-python"),a(e)])])]),x])}const N=o(d,[["render",P],["__file","python-build.html.vue"]]);export{N as default};
