import{_ as o,r as c,o as d,c as p,a as n,b as s,d as a,w as t,e as l}from"./app-2227e0ad.js";const r={},u=n("h2",{id:"编译器用法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编译器用法","aria-hidden":"true"},"#"),s(" 编译器用法")],-1),v=n("p",null,"参考：",-1),b={href:"https://zhuanlan.zhihu.com/p/357803433",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"todo",-1),k=n("p",null,"gcc",-1),h=n("li",null,[n("p",null,"LLVM"),n("p",null,"todo")],-1),f=n("li",null,[n("p",null,"LLVM2.0 - Clang"),n("p",null,"todo")],-1),g=n("h2",{id:"编译工程工具",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编译工程工具","aria-hidden":"true"},"#"),s(" 编译工程工具")],-1),_=l(`<h2 id="交叉编译脚本" tabindex="-1"><a class="header-anchor" href="#交叉编译脚本" aria-hidden="true">#</a> 交叉编译脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function-name function">install_arm32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gcc <span class="token function">make</span> gcc-arm-linux-gnueabi binutils-arm-linux-gnueabi
<span class="token punctuation">}</span>

<span class="token function-name function">install_arm64</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gcc <span class="token function">make</span> gcc-aarch64-linux-gun binutils-aarch64-linux-gnu
<span class="token punctuation">}</span>
<span class="token function-name function">gen_hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">cat</span> <span class="token operator">&gt;</span> helloworld.c <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#include&lt;stdio.h&gt;
int main()
{
  printf(&quot;Hello World!<span class="token entity" title="\\n">\\n</span>&quot;);
  return 0;
}
EOF</span>
<span class="token punctuation">}</span>

<span class="token function-name function">compile_64</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  gcc helloworld.c <span class="token parameter variable">-o</span> helloworld-x86_64
<span class="token punctuation">}</span>

<span class="token function-name function">compile_arm32</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  arm-linux-gnueabi-gcc helloworld.c <span class="token parameter variable">-o</span> helloworld-arm <span class="token parameter variable">-static</span>
<span class="token punctuation">}</span>

<span class="token function-name function">compile_arm64</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  aarchi64-linux-gnu-gcc helloworld.c <span class="token parameter variable">-o</span> helloworld-aarch64 <span class="token parameter variable">-static</span>
<span class="token punctuation">}</span>

<span class="token comment"># Main.</span>
<span class="token comment"># install_arm32</span>
<span class="token comment"># install_arm64</span>
gen_hello
compile_64 <span class="token operator">||</span> <span class="token builtin class-name">exit</span> <span class="token number">1</span>
compile_arm32
compile_arm64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态链接" tabindex="-1"><a class="header-anchor" href="#动态链接" aria-hidden="true">#</a> 动态链接</h2><p>参考：</p>`,4),x={href:"https://www.w3cschool.cn/cbook/ojay2ozt.html",target:"_blank",rel:"noopener noreferrer"},L=l(`<p>Linux支持动态连接库，不仅节省了磁盘、内存空间，而且可以提高程序运行效率。不过引入动态连接库也可能会带来很多问题，例如动态连接库的调试、升级更新和潜在的安全威胁。</p><p>为了让动态链接器能够进行符号的重定位，必须把动态链接库的相关信息写入到可执行文件当中：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 通过 readelf -d 可以打印出该文件直接依赖的库</span>
$ readelf <span class="token parameter variable">-d</span> <span class="token builtin class-name">test</span> <span class="token operator">|</span> <span class="token function">grep</span> NEEDED
 0x00000001 <span class="token punctuation">(</span>NEEDED<span class="token punctuation">)</span>                     Shared library: <span class="token punctuation">[</span>libc.so.6<span class="token punctuation">]</span>
<span class="token comment"># 通过 ldd 命令则可以打印出所有依赖或者间接依赖的库</span>
$ ldd <span class="token builtin class-name">test</span>
      linux-gate.so.1 <span class="token operator">=</span><span class="token operator">&gt;</span>  <span class="token punctuation">(</span>0xffffe000<span class="token punctuation">)</span> <span class="token comment"># 在文件系统中并没有对应的库文件，它是一个虚拟的动态链接库，对应进程内存映像的内核部分。参考： http://www.linux010.cn/program/Linux-gateso1-DeHanYi-pcee6103.htm</span>
      libc.so.6 <span class="token operator">=</span><span class="token operator">&gt;</span> /lib/libc.so.6 <span class="token punctuation">(</span>0xb7da2000<span class="token punctuation">)</span>
      /lib/ld-linux.so.2 <span class="token punctuation">(</span>0xb7efc000<span class="token punctuation">)</span> <span class="token comment"># 动态链接器 | 绝对路径 | readelf -x .interp test | interpeter</span>
      <span class="token comment"># 程序的加载过程 - 动态链接器</span>
      <span class="token comment"># 当 Shell 解释器或者其他父进程通过exec启动我们的程序时，系统会先为ld-linux创建内存映像，然后把控制权交给ld-linux，</span>
      <span class="token comment"># 之后ld-linux负责为可执行程序提供运行环境，负责解释程序的运行，因此ld-linux也叫做dynamic loader（或intepreter）</span>
      <span class="token comment"># 参考： http://www.ibm.com/developerworks/cn/linux/l-elf/part1/index.html</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序有两种方式使用库</p><ul><li>编译时通过 <code>-l</code>,<code>-L</code> 参数隐式使用： <code>gcc -o test test.c -lmyprintf -L./ -I./</code></li><li>运行时通过 <code>LD_LIBRARY_PATH</code> 环境变量显示使用： <code>LD_LIBRARY_PATH=$PWD</code></li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p><strong>指定动态库位置</strong>：</p><p>通过 <code>LD_LIBRARY_PATH</code> 参数，它类似 Shell 解释器中用于查找可执行文件的 <code>PATH</code> 环境变量，也是通过冒号分开指定了各个存放库函数的路径。</p><p>该变量实际上也可以通过 <code>/etc/ld.so.conf</code> 文件来指定，一行对应一个路径名。 （一般需要管理员权限） <br> 为了提高查找和加载动态链接库的效率，系统启动后会通过 <code>ldconfig</code> 工具创建一个库的缓存 <code>/etc/ld.so.cache</code>。 如果用户通过 <code>/etc/ld.so.conf</code> 加入了新的库搜索路径或者是把新库加到某个原有的库目录下，最好是执行一下 <code>ldconfig</code> 以便刷新缓存。</p><p>更多参考： <code>man ld-linux</code>, <code>/lib/ld-linux.so.2</code></p></div><h3 id="动态链接器-dynamic-linker-loader" tabindex="-1"><a class="header-anchor" href="#动态链接器-dynamic-linker-loader" aria-hidden="true">#</a> 动态链接器（dynamic linker/loader）</h3><p>Linux 下 elf 文件的动态链接器是 ld-linux.so，即 <code>/lib/ld-linux.so.2</code>。 通过 <code>man ld-linux</code> 可以获取与动态链接器相关的资料，包括各种相关的环境变量和文件都有详细的说明。</p><p>如：</p><ul><li><p><code>LD_LIBRARY_PATH</code></p></li><li><p><code>LD_BIND_NOW</code></p></li><li><p><code>LD_PRELOAD</code> 指定预装载一些库，以便替换其他库中的函数，从而做一些安全方面的处理</p></li><li><p><code>LD_DEBUG</code> 用来进行动态链接的相关调试</p></li><li><p><code>ld.so.conf</code></p></li><li><p><code>ld.so.cache</code></p></li><li><p><code>/etc/ld.so.preload</code> 指定需要预装载的库</p></li></ul><h4 id="运行时库的连接-ld-library-path" tabindex="-1"><a class="header-anchor" href="#运行时库的连接-ld-library-path" aria-hidden="true">#</a> 运行时库的连接 <code>LD_LIBRARY_PATH</code></h4><p>库文件在连接（静态库和共享库）和运行（仅限于使用共享库的程序）时被使用，其搜索路径是在系统中进行设置的。</p><p>一般Linux系统把 <code>/lib</code> 和 <code>/usr/lib</code> 两个目录作为默认的库搜索路径，所以使用这两个目录中的库是不需要进行设置搜索路径即可直接使用。 对于处于默认库搜索路径之外的库，需要将库的位置添加到 库的搜索路径之中。 设置库文件的搜索路径有下列两种方式，可任选其一使用：</p><ol><li>会话生效 —— 在环境变量 <code>LD_LIBRARY_PATH</code> 中指明库的搜索路径。</li></ol><p><code>export LD_LIBRARY_PATH=/opt/gtk/lib:$LD_LIBRARY_PATH</code></p><ol><li>永久生效 —— 在 <code>/etc/ld.so.conf</code> 文件中添加库的搜索路径（绝对路径）。 ⚠️一般需管理员权限</li></ol><p>e.g.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/X11R6/lib
/usr/local/lib
/opt/lib
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>另外，为了加快程序执行时对共享库的定位速度，避免使用搜索路径查找共享库的低效率，会有 <code>/etc/ld.so.cache</code> 库列表文件可以直接读取、搜索。 <code>/etc/ld.so.cache</code> 是一个非文本的数据文件，不能直接编辑，它是根据 <code>/etc/ld.so.conf</code> 中设置的搜索路径由 <code>/sbin/ldconfig</code> 命令将这些搜索路径下的共享库文件集中在一起而生成的( <code>ldconfig</code> 命令要以 root 权限执行)。</p><p>如当安装完一些库文件(例如刚安装好glib)，或者修改 <code>ld.so.conf</code> 增加新的库路径后，需要运行一下 <code>/sbin/ldconfig</code> 使所有的库文件都被缓存到 <code>ld.so.cache</code> 中。 否则 <code>ld.so.conf</code> 的更改不生效。</p></div><h3 id="glibc" tabindex="-1"><a class="header-anchor" href="#glibc" aria-hidden="true">#</a> glibc</h3>`,20),y={href:"https://www.gnu.org/software/libc/",target:"_blank",rel:"noopener noreferrer"},C=n("br",null,null,-1),I={href:"https://ftp.gnu.org/gnu/glibc/",target:"_blank",rel:"noopener noreferrer"},w=l(`<p>glibc是标准C库的GNU实现。 我们采用C/C++所写的程序，运行时基本都依赖与它。 如果我们想看当前机器glibc的源代码，首先需要知道当前机器glibc的版本号，然后到glibc的官网下载对应版本的源代码。</p><h4 id="查看版本号" tabindex="-1"><a class="header-anchor" href="#查看版本号" aria-hidden="true">#</a> 查看版本号</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方法一：</span>
<span class="token comment"># 使用命令ldd，查看可执行程序依赖libc的路径</span>
$ ldd python
        linux-vdso.so.1 <span class="token punctuation">(</span>0x00007fff40beb000<span class="token punctuation">)</span>
        libm.so.6 <span class="token operator">=</span><span class="token operator">&gt;</span> /lib/x86_64-linux-gnu/libm.so.6 <span class="token punctuation">(</span>0x00007f9b44d70000<span class="token punctuation">)</span>
        libc.so.6 <span class="token operator">=</span><span class="token operator">&gt;</span> /lib/x86_64-linux-gnu/libc.so.6 <span class="token punctuation">(</span>0x00007f9b44b47000<span class="token punctuation">)</span>
        /lib64/ld-linux-x86-64.so.2 <span class="token punctuation">(</span>0x00007f9b4552e000<span class="token punctuation">)</span>
$ /lib/x86_64-linux-gnu/libc.so.6
GNU C Library <span class="token punctuation">(</span>Ubuntu GLIBC <span class="token number">2.35</span>-0ubuntu3.6<span class="token punctuation">)</span> stable release version <span class="token number">2.35</span>. <span class="token comment"># 💡</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2022</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.
There is NO warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
Compiled by GNU CC version <span class="token number">11.4</span>.0.
libc ABIs: UNIQUE IFUNC ABSOLUTE
For bug reporting instructions, please see:
<span class="token operator">&lt;</span>https://bugs.launchpad.net/ubuntu/+source/glibc/+bugs<span class="token operator">&gt;</span>.

<span class="token comment"># 方法二：</span>
<span class="token comment"># ldd是glibc提供的命令，由此可知glibc的版本号</span>
$ ldd <span class="token parameter variable">--version</span>
ldd <span class="token punctuation">(</span>Ubuntu GLIBC <span class="token number">2.35</span>-0ubuntu3.4<span class="token punctuation">)</span> <span class="token number">2.35</span> <span class="token comment"># 💡</span>
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2022</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.  There is NO
warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
Written by Roland McGrath and Ulrich Drepper.

<span class="token comment"># 方法三：</span>
$ getconf GNU_LIBC_VERSION
glibc <span class="token number">2.35</span>

<span class="token comment"># 方法四：</span>
$ strings /lib/x86_64-linux-gnu/libc.so.6 <span class="token operator">|</span> <span class="token function">grep</span> GLIBC
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
GLIBC_2.18
GLIBC_2.22
GLIBC_2.23
GLIBC_2.24
GLIBC_2.25
GLIBC_2.26
GLIBC_2.27
GLIBC_2.28
GLIBC_2.29
GLIBC_2.30
GLIBC_2.31
GLIBC_2.32
GLIBC_2.33
GLIBC_2.34
GLIBC_2.35 <span class="token comment"># 💡</span>
GLIBC_PRIVATE
GNU C Library <span class="token punctuation">(</span>Ubuntu GLIBC <span class="token number">2.35</span>-0ubuntu3.6<span class="token punctuation">)</span> stable release version <span class="token number">2.35</span>.

<span class="token comment"># 方法五： 调用C函数</span>
<span class="token comment">#include &lt;stdio.h&gt;</span>
<span class="token comment">#include &lt;gnu/libc-version.h&gt;</span>
int main<span class="token punctuation">(</span>void<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
    printf<span class="token punctuation">(</span><span class="token string">&quot;glibc version:%s<span class="token entity" title="\\n">\\n</span>&quot;</span>, gnu_get_libc_version<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
 
    <span class="token builtin class-name">return</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="musl-libc" tabindex="-1"><a class="header-anchor" href="#musl-libc" aria-hidden="true">#</a> Musl libc</h4><p>参考：</p><ul><li>Musl libc：为什么我们会需要另一个 libc？ | https://linuxstory.org/musl-libc-yet-another-libc/</li></ul><p>todo 整理理解</p><h2 id="静态编译" tabindex="-1"><a class="header-anchor" href="#静态编译" aria-hidden="true">#</a> 静态编译</h2><p><code>-static</code></p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>静态编译的二进制通过 <code>ldd</code> 可以看到 &quot;not a dynamic executable&quot; 的字样。 而 <s><code>-nostdlib</code></s> 通过 <code>ldd</code> 看到的是 &quot;statically linked&quot;，这表示 “它恰好没有链接到任何库，但在其他方面与普通 PIE 相同，指定了 ELF 解释器。” —— me: 这运行情况应该跟静态编译出来的差不多？？？</p><p>todo What&#39;s the difference between &quot;statically linked&quot; and &quot;not a dynamic executable&quot; from Linux ldd? | https://stackoverflow.com/questions/61553723/whats-the-difference-between-statically-linked-and-not-a-dynamic-executable</p></div><h3 id="问题-安全编译识别失败" tabindex="-1"><a class="header-anchor" href="#问题-安全编译识别失败" aria-hidden="true">#</a> 问题： 安全编译识别失败</h3><p>todo</p><p><code>nm</code> 可以查看 elf 文件的符号信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ gcc <span class="token parameter variable">-c</span> test.c
$ nm test.o
00000000 B global
00000000 T main
          U <span class="token builtin class-name">printf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="程序执行流程" tabindex="-1"><a class="header-anchor" href="#程序执行流程" aria-hidden="true">#</a> 程序执行流程</h2><p>todo http://www.ibm.com/developerworks/cn/linux/l-elf/part1/index.html</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 程序入口</span>
$ readelf <span class="token parameter variable">-h</span> <span class="token builtin class-name">test</span> <span class="token operator">|</span> <span class="token function">grep</span> Entry
  Entry point address:               0x80482b0

<span class="token comment"># 程序有 printf 符号的地址没有确定 </span>
<span class="token comment"># 💡 已知： printf 函数在动态链接库 libc.so 中定义，需要进行动态链接； 这里假设采用 lazy mode 方式，即执行到 printf 所在位置时才去解析该符号的地址。</span>

<span class="token comment"># 反编译发现： 地址指向了 plt （即过程链接表）</span>
$ objdump <span class="token parameter variable">-d</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-j</span> .text <span class="token builtin class-name">test</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">printf</span>
 804837c:       e8 1f ff ff ff          call   80482a0 <span class="token operator">&lt;</span>printf@plt<span class="token operator">&gt;</span>
$ objdump <span class="token parameter variable">-D</span> <span class="token builtin class-name">test</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;80482a0&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> call
080482a0 <span class="token operator">&lt;</span>printf@plt<span class="token operator">&gt;</span>:
 80482a0:       ff <span class="token number">25</span> 8c <span class="token number">95</span> 04 08       jmp    *0x804958c
<span class="token comment"># 过程链接表（plt）</span>
$ readelf <span class="token parameter variable">-d</span> <span class="token builtin class-name">test</span>

Dynamic section at offset 0x4ac contains <span class="token number">20</span> entries:
  Tag        Type                         Name/Value
 0x00000001 <span class="token punctuation">(</span>NEEDED<span class="token punctuation">)</span>                     Shared library: <span class="token punctuation">[</span>libc.so.6<span class="token punctuation">]</span>
 0x0000000c <span class="token punctuation">(</span>INIT<span class="token punctuation">)</span>                       0x8048258
 0x0000000d <span class="token punctuation">(</span>FINI<span class="token punctuation">)</span>                       0x8048454
 0x00000004 <span class="token punctuation">(</span>HASH<span class="token punctuation">)</span>                       0x8048148
 0x00000005 <span class="token punctuation">(</span>STRTAB<span class="token punctuation">)</span>                     0x80481c0
 0x00000006 <span class="token punctuation">(</span>SYMTAB<span class="token punctuation">)</span>                     0x8048170
 0x0000000a <span class="token punctuation">(</span>STRSZ<span class="token punctuation">)</span>                      <span class="token number">76</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
 0x0000000b <span class="token punctuation">(</span>SYMENT<span class="token punctuation">)</span>                     <span class="token number">16</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
 0x00000015 <span class="token punctuation">(</span>DEBUG<span class="token punctuation">)</span>                      0x0
 0x00000003 <span class="token punctuation">(</span>PLTGOT<span class="token punctuation">)</span>                     0x8049578 <span class="token comment"># 这就是GOT表（全局偏移表）。该地址与0x804958c相近，说明在读GOT表！ </span>
 0x00000002 <span class="token punctuation">(</span>PLTRELSZ<span class="token punctuation">)</span>                   <span class="token number">24</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
 0x00000014 <span class="token punctuation">(</span>PLTREL<span class="token punctuation">)</span>                     REL
 0x00000017 <span class="token punctuation">(</span>JMPREL<span class="token punctuation">)</span>                     0x8048240
 0x00000011 <span class="token punctuation">(</span>REL<span class="token punctuation">)</span>                        0x8048238
 0x00000012 <span class="token punctuation">(</span>RELSZ<span class="token punctuation">)</span>                      <span class="token number">8</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
 0x00000013 <span class="token punctuation">(</span>RELENT<span class="token punctuation">)</span>                     <span class="token number">8</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
 0x6ffffffe <span class="token punctuation">(</span>VERNEED<span class="token punctuation">)</span>                    0x8048218
 0x6fffffff <span class="token punctuation">(</span>VERNEEDNUM<span class="token punctuation">)</span>                 <span class="token number">1</span>
 0x6ffffff0 <span class="token punctuation">(</span>VERSYM<span class="token punctuation">)</span>                     0x804820c
 0x00000000 <span class="token punctuation">(</span>NULL<span class="token punctuation">)</span>                       0x0

<span class="token comment"># 全局偏移表（got）</span>
$ readelf <span class="token parameter variable">-x</span> .got.plt <span class="token builtin class-name">test</span>

Hex dump of section <span class="token string">&#39;.got.plt&#39;</span><span class="token builtin class-name">:</span>
  0x08049578 ac940408 00000000 00000000 <span class="token number">86820408</span> <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  0x08049588 <span class="token number">96820408</span> a6820408                   <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>

todo <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二进制文件结构" tabindex="-1"><a class="header-anchor" href="#二进制文件结构" aria-hidden="true">#</a> 二进制文件结构</h2><p>先准备一个二进制可执行文件：</p><details class="custom-container details"><p>代码</p><p>calc.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">c2i</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token function">c2i</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token function">c2i</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d + %d = %d\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tfunc.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">c2i</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> s<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">atoi</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译/运行（静态库）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 【静态链接】</span>
<span class="token comment"># .o 编译过程各自独立。虽然其中calc.c使用了另外两个的符号，但是此时并不知道那些符号是在哪个文件中定义的。</span>
<span class="token comment"># -st 当链接器把所有的.o文件链接成可执行文件的过程中，可执行文件才能确定那些符号是在哪里。</span>
gcc <span class="token parameter variable">-c</span> add.c tfunc.c calc.c
<span class="token comment"># gcc add.o tfunc.o calc.o -o calc-st</span>
ar <span class="token parameter variable">-r</span> liboperation.a add.o tfunc.o
gcc calc.c liboperation.a <span class="token parameter variable">-o</span> calc-st

<span class="token comment"># 【动态链接】</span>
gcc <span class="token parameter variable">-c</span> <span class="token parameter variable">-fpic</span> tfunc.c add.c
gcc <span class="token parameter variable">-shared</span> tfunc.o add.o <span class="token parameter variable">-o</span> liboperation.so
gcc calc.c <span class="token parameter variable">-o</span> calc-dy <span class="token parameter variable">-loperation</span> -L<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span> -Wl,-rpath<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span> 

<span class="token comment"># 运行</span>
./calc <span class="token number">1</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="elf-文件" tabindex="-1"><a class="header-anchor" href="#elf-文件" aria-hidden="true">#</a> ELF 文件</h3><p>ELF（Executable and Linkable Format，可执行和可链接格式）</p>`,22),E={class:"custom-container details"},R=n("p",null,"参考：",-1),T={href:"https://mp.weixin.qq.com/s/ZOvHG_ofiU6iWtoSR9bFow",target:"_blank",rel:"noopener noreferrer"},G=l(`<p>通过 <code>file calc</code> 可看到 <code>calc</code> 程序的文件类型为 ELF</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> calc
calc: ELF <span class="token number">64</span>-bit LSB pie executable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID<span class="token punctuation">[</span>sha1<span class="token punctuation">]</span><span class="token operator">=</span>0e4f3ed1b2b35f1c63e26a0b7e6b59bfb2ebe1a2, <span class="token keyword">for</span> GNU/Linux <span class="token number">3.2</span>.0, not stripped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ELF文件格式如下：</p><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>ELF header （ELF 头部）</td><td></td></tr><tr><td>Program header table （程序表头）</td><td></td></tr><tr><td>Sections （节）</td><td></td></tr><tr><td>Section header table （节表头）</td><td></td></tr></tbody></table><p>通过 <code>readelf -l calc</code> 可看到 <code>calc</code> 程序的二进制区域划分</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-l</span> <span class="token comment"># 列出二进制全部区域划分信息</span>
<span class="token parameter variable">-h</span> <span class="token comment"># 头文件信息 | 这个内容与结构体Elf32_Ehdr中的成员变量是一一对应的！</span>
<span class="token parameter variable">-S</span> <span class="token comment"># 片段布局</span>

$ readelf <span class="token parameter variable">-l</span> calc

Elf <span class="token function">file</span> <span class="token builtin class-name">type</span> is DYN <span class="token punctuation">(</span>Position-Independent Executable <span class="token function">file</span><span class="token punctuation">)</span> <span class="token comment"># 💡位置独立的可执行文件</span>
Entry point 0x1080                                          <span class="token comment"># 💡入口地址</span>
There are <span class="token number">13</span> program headers, starting at offset <span class="token number">64</span>         <span class="token comment"># 💡13个程序头信息，从第64个偏移地址开始</span>

Program Headers:
  Type           Offset             VirtAddr           PhysAddr
                 FileSiz            MemSiz              Flags  Align
  PHDR           0x0000000000000040 0x0000000000000040 0x0000000000000040
                 0x00000000000002d8 0x00000000000002d8  R      0x8
  INTERP         0x0000000000000318 0x0000000000000318 0x0000000000000318
                 0x000000000000001c 0x000000000000001c  R      0x1
      <span class="token punctuation">[</span>Requesting program interpreter: /lib64/ld-linux-x86-64.so.2<span class="token punctuation">]</span>
  LOAD           0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000660 0x0000000000000660  R      0x1000
  LOAD           0x0000000000001000 0x0000000000001000 0x0000000000001000
                 0x0000000000000225 0x0000000000000225  R E    0x1000
  LOAD           0x0000000000002000 0x0000000000002000 0x0000000000002000
                 0x0000000000000144 0x0000000000000144  R      0x1000
  LOAD           0x0000000000002db0 0x0000000000003db0 0x0000000000003db0
                 0x0000000000000260 0x0000000000000268  RW     0x1000
  DYNAMIC        0x0000000000002dc0 0x0000000000003dc0 0x0000000000003dc0
                 0x00000000000001f0 0x00000000000001f0  RW     0x8
  NOTE           0x0000000000000338 0x0000000000000338 0x0000000000000338
                 0x0000000000000030 0x0000000000000030  R      0x8
  NOTE           0x0000000000000368 0x0000000000000368 0x0000000000000368
                 0x0000000000000044 0x0000000000000044  R      0x4
  GNU_PROPERTY   0x0000000000000338 0x0000000000000338 0x0000000000000338
                 0x0000000000000030 0x0000000000000030  R      0x8
  GNU_EH_FRAME   0x0000000000002014 0x0000000000002014 0x0000000000002014
                 0x0000000000000044 0x0000000000000044  R      0x4
  GNU_STACK      0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000000 0x0000000000000000  RW     0x10
  GNU_RELRO      0x0000000000002db0 0x0000000000003db0 0x0000000000003db0
                 0x0000000000000250 0x0000000000000250  R      0x1

 Section to Segment mapping:
  Segment Sections<span class="token punctuation">..</span>.
   00
   01     .interp
   02     .interp .note.gnu.property .note.gnu.build-id .note.ABI-tag .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rela.dyn .rela.plt
   03     .init .plt .plt.got .plt.sec .text .fini
   04     .rodata .eh_frame_hdr .eh_frame
   05     .init_array .fini_array .dynamic .got .data .bss
   06     .dynamic
   07     .note.gnu.property
   08     .note.gnu.build-id .note.ABI-tag
   09     .note.gnu.property
   <span class="token number">10</span>     .eh_frame_hdr
   <span class="token number">11</span>
   <span class="token number">12</span>     .init_array .fini_array .dynamic .got
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态库-vs-动态库" tabindex="-1"><a class="header-anchor" href="#静态库-vs-动态库" aria-hidden="true">#</a> 静态库 vs 动态库</h3><ul><li><p>静态链接库（Static Link Library） —— 静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中</p><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ objdump <span class="token parameter variable">-r</span> liboperation.a <span class="token comment"># 有两个.o文件需要重定位（RELOCATION）</span>
In archive liboperation.a:

add.o:     <span class="token function">file</span> <span class="token function">format</span> elf64-x86-64

RELOCATION RECORDS FOR <span class="token punctuation">[</span>.eh_frame<span class="token punctuation">]</span>:
OFFSET           TYPE              VALUE
0000000000000020 R_X86_64_PC32     .text



tfunc.o:     <span class="token function">file</span> <span class="token function">format</span> elf64-x86-64

RELOCATION RECORDS FOR <span class="token punctuation">[</span>.text<span class="token punctuation">]</span>:
OFFSET           TYPE              VALUE
000000000000001d R_X86_64_PLT32    atoi-0x0000000000000004


RELOCATION RECORDS FOR <span class="token punctuation">[</span>.eh_frame<span class="token punctuation">]</span>:
OFFSET           TYPE              VALUE
0000000000000020 R_X86_64_PC32     .text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>动态链接库（Dynamic Link Library，简称DLL） —— 不像静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中。动态库来是在运行时加载动态库代码（由 ld-linux.so 来负责读取），因此无法在编译和链接阶段获取代码段的符号地址（代码段的符号包括引用的全局数据，调用的函数等）。</p><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ objdump <span class="token parameter variable">-r</span> liboperation.so <span class="token comment"># 不需要重定位（RELOCATION）</span>

liboperation.so:     <span class="token function">file</span> <span class="token function">format</span> elf64-x86-64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><h3 id="静态链接重定位过程" tabindex="-1"><a class="header-anchor" href="#静态链接重定位过程" aria-hidden="true">#</a> 静态链接重定位过程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ readelf <span class="token parameter variable">-h</span> add.o
ELF Header:
  Magic:   7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              <span class="token number">2</span><span class="token string">&#39;s complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          464 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         12
  Section header string table index: 11
$ readelf -s add.o
Symbol table &#39;</span>.symtab&#39; contains <span class="token number">4</span> entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     <span class="token number">0</span>: 0000000000000000     <span class="token number">0</span> NOTYPE  LOCAL  DEFAULT  UND
     <span class="token number">1</span>: 0000000000000000     <span class="token number">0</span> FILE    LOCAL  DEFAULT  ABS add.c
     <span class="token number">2</span>: 0000000000000000     <span class="token number">0</span> SECTION LOCAL  DEFAULT    <span class="token number">1</span> .text
     <span class="token number">3</span>: 0000000000000000    <span class="token number">24</span> FUNC    GLOBAL DEFAULT    <span class="token number">1</span> <span class="token function">add</span>

<span class="token comment"># -Ax: 显示地址的时候，用十六进制来表示。如果使用 -Ad，意思就是用十进制来显示地址;</span>
<span class="token comment"># -t -x1: 显示字节码内容的时候，使用十六进制(x)，每次显示一个字节(1);</span>
<span class="token comment"># -N 52：只需要读取 52 个字节;</span>
$ od <span class="token parameter variable">-Ax</span> <span class="token parameter variable">-t</span> x1 <span class="token parameter variable">-N</span> <span class="token number">52</span> calc.o <span class="token comment"># 读取字节码</span>
000000 7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
000010 01 00 3e 00 01 00 00 00 00 00 00 00 00 00 00 00
000020 00 00 00 00 00 00 00 00 <span class="token number">30</span> 03 00 00 00 00 00 00
000030 00 00 00 00
000034
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="todo-重定位节" tabindex="-1"><a class="header-anchor" href="#todo-重定位节" aria-hidden="true">#</a> todo 重定位节</h4><p>重定位节（Relocation Section）是DLL文件的一个特殊节，用于存储在加载和链接过程中需要修改的地址偏移量信息。它记录了DLL中涉及到的符号（如函数、变量）的地址，以便在运行时进行重定位，使得DLL可以正确加载和运行。</p><h4 id="todo-重定位表" tabindex="-1"><a class="header-anchor" href="#todo-重定位表" aria-hidden="true">#</a> todo 重定位表</h4><p>重定位表（Relocation Table）是重定位节中的一部分，它包含了需要重定位的地址和偏移量信息。重定位表的作用是指导系统在加载DLL时，根据其中的重定位信息，动态修正代码和数据的地址，以适应当前的加载地址。</p><h3 id="动态链接-pic-原理" tabindex="-1"><a class="header-anchor" href="#动态链接-pic-原理" aria-hidden="true">#</a> 动态链接 PIC 原理</h3><h4 id="fpic" tabindex="-1"><a class="header-anchor" href="#fpic" aria-hidden="true">#</a> -fpic</h4><p>位置无关码 <code>-fpic</code></p><p>回顾 gcc 编译过程： 首先把源代码编译成目标文件， 然后把目标文件链接起来。</p><p><strong><code>-fPIC</code></strong></p><p>如果是动态链接库的话，目标文件需要创建成 PIC（position-independent code，位置无关码） ，概念上就是在可执行程序装载它们的时候， 它们可以放在可执行程序的内存里的任何地方。要生成这种形式的目标文件，就需要添加参数 <code>-fPIC</code>。</p><ul><li>-fpic —— 在动态库中生成位置无关的代码。通过全局偏移表（GOT）访问所有常量地址。程序启动时动态加载程序解析GOT条目。对GOT的大小有限制。</li><li>-fPIC —— 作用同-fpic。但是对GOT表大小无限制。 即： 如果链接的可执行文件的GOT大小超过计算机特定的最大大小，则会从链接器收到错误消息，指示-fpic不起作用。在这种情况下，需要使用-fPIC重新编译。 💡为了兼容各个系统，在生成位置无关的代码的时候，应该使用-fPIC参数。</li></ul><p><strong><code>-DPIC</code></strong></p>`,22),A={href:"https://gcc.gnu.org/legacy-ml/gcc-help/2006-10/msg00147.html",target:"_blank",rel:"noopener noreferrer"},P=l('<h4 id="got-plt" tabindex="-1"><a class="header-anchor" href="#got-plt" aria-hidden="true">#</a> GOT/PLT</h4><p>载入时重定位的描述：</p><p>在调用动态库中的函数时，动态加载器动态分配一段进程地址空间，将动态库加载到该地址空间后，再修改代码段的符号地址。 至于需要修改的哪些地址，链接器在动态库的文件头中预先写好，供加载器读取修改。</p><p>载入时重定位的缺点：</p><ol><li>动态库的代码段不能在进程间共享： 多个进程加载同一个动态库到各自不同的地址空间，导致代码段需要不同的重定位，所以最终每个引用该动态库的进程拥有一份该动态库代码段的不同拷贝。</li><li>代码段必须是可写的，增加了被攻击风险。</li></ol><p>为了解决载入时重定位的问题，引入了PIC的概念，即位置无关代码。</p><p><strong>PIC实现原理</strong></p><ol><li><strong>GOT</strong>： 在动态库的数据段增加 GOT（Global Offset Table），该表的每一项是符号到地址的绝对映射。 由于代码段到数据段的偏移是固定的，因此可以在编译时确定代码段中的某个符号到GOT特定项之间的偏移。 这样，代码段中的符号偏移就可以在编译时确定了，在加载时也无需修改代码段的内容，只需要填写位于数据段的GOT的所有项的符号的绝对地址就完成了。 因为数据段本来就是进程间不共享，每个进程独立的一份，因此GOT的设计完全解决了以上两个问题，从而达到两个目的： 1，代码段可以在多进程间共享； 2，代码段是只读的。</li><li><strong>PLT</strong>： PLT（Program Linkage Table，程序链接表） 的出现是为了延时定位的目的。 一个动态库中的函数往往要远多于全局变量，并且被调用的函数往往少于定义的函数。 由于 GOT 中包含了该动态库中的所有的全局变量的映射，并且在连接器加载时解析所有的全局变量的地址。 如果用同样的方式去处理函数调用符号，则开销会非常大。 因此在代码段设计了一个 PLT （表中每一项其实是个代码段） 用于执行如下逻辑： 首次访问时，解析参数和向GOT填写函数地址，后续访问直接访问 GOT 中的函数地址。 如此达到了延时定位的目的。</li></ol><p>因此，在一个 PIC 的动态库中， 对全局变量使用 GOT 来映射， 对函数调用使用 PLT + GOT 来映射。 从而达到共享库代码段复用，代码段安全访问的目的。 而这些就是 PIC 的意义。</p><h3 id="分析程序字节码" tabindex="-1"><a class="header-anchor" href="#分析程序字节码" aria-hidden="true">#</a> 分析程序字节码</h3><p>todo <code>od -Ad -t x1 -j 1136 -N 434 main</code></p><p>todo 反汇编 <code>objdump -d main.o</code></p><h2 id="编译选项" tabindex="-1"><a class="header-anchor" href="#编译选项" aria-hidden="true">#</a> 编译选项</h2><h3 id="安全编译-链接选项" tabindex="-1"><a class="header-anchor" href="#安全编译-链接选项" aria-hidden="true">#</a> 安全编译/链接选项</h3>',14),B={href:"https://www.jianshu.com/p/91fae054f922",target:"_blank",rel:"noopener noreferrer"},O=l("<p>若不加上，可能运行时会泄露某些信息，方便逆向、CTF。</p><table><thead><tr><th> </th><th>编译选项</th><th>链接选项</th></tr></thead><tbody><tr><td>必选</td><td>PIC/PIE/Protect-Stack</td><td>rpath/Bind-Now/Strip</td></tr><tr><td>可选</td><td>Fortify-Source/ftrapv</td><td></td></tr></tbody></table><p>具体含义</p>",3),S=n("thead",null,[n("tr",null,[n("th",null,"编译/链接选项"),n("th",null,"必选"),n("th",null,"含义"),n("th",null,"使用方法")])],-1),N=n("tr",null,[n("td",null,[s("PIC"),n("br"),s("（Position-Independent-Code）")]),n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high")])]),n("td",null,[s("位置无关代码 "),n("br"),s(" 实现动态库随机加载")]),n("td",null,[n("code",null,"-fPIC"),s("/"),n("s",null,[n("code",null,"-fpic"),s("（旧）")]),s(" （编译选项）")])],-1),D=n("tr",null,[n("td",null,[s("PIE(ASLR)"),n("br"),s("PIE"),n("br"),s("（Position-Independent-Executable）")]),n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high ")])]),n("td",null,[s("位置无关代码/随机化"),n("br"),s("可执行文件在加载执行时可像共享库一样随机加载 "),n("br"),s(" 降低固定地址类攻击、缓冲溢出攻击的成功率")]),n("td",null,[n("code",null,"-fPIE"),s("/"),n("s",null,[n("code",null,"-fpie"),s("（旧）")]),s(" （编译选项） "),n("br"),s(),n("code",null,"-pie"),s(" （链接选项） "),n("br"),s(" ⚠️需要上述两个选项同时使用 "),n("br"),s(" 解释： "),n("ul",null,[n("li",null,[n("code",null,"-no-pie"),s(": 关闭")]),n("li",null,[n("code",null,"-pie"),s(": 开启")])])])],-1),F=n("td",null,[s("Canary"),n("br"),s("Protect-Stack"),n("br"),s("SP")],-1),U=n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high")])],-1),$=n("br",null,null,-1),z={href:"https://www.cnblogs.com/arnoldlu/p/11630979.html",target:"_blank",rel:"noopener noreferrer"},H=n("td",null,[n("code",null,"-fstack-protector-strong"),s("/"),n("s",null,[n("code",null,"-fstack-protector-all"),s("（旧）")]),s(" （编译选项） "),n("br"),s(" 解释： "),n("ul",null,[n("li",null,[n("code",null,"-fno-stack-protector"),s(": 关闭")]),n("li",null,[n("code",null,"-fstack-protector"),s(": 开启")]),n("li",null,[n("code",null,"-fstack-protector-all"),s(": 全开启")])])],-1),V=n("td",null,[s("Fortify"),n("br"),s("Fortify-Source"),n("br"),s("FS")],-1),q=n("td",null,[n("span",{class:"level-2"},[s("可选"),n("br"),s("medium")])],-1),Y=n("br",null,null,-1),M=n("br",null,null,-1),W={href:"https://forum.butian.net/share/1190",target:"_blank",rel:"noopener noreferrer"},j=n("br",null,null,-1),X=n("span",{style:{}},[s("Fority 其实非常轻微的检查，用于检查是否存在缓冲区溢出的错误。"),n("br"),s("Fortify 是GCC在编译源码时判断程序的哪些buffer会存在可能的溢出。"),n("br"),s("在buffer大小已知的情况下，GCC会把 strcpy、memcpy、memset等函数自动替换成相应的"),n("code",null,"__strcpy_chk(dst, src, dstlen)"),s("等函数，达到防止缓冲区溢出的作用。")],-1),K=n("td",null,[n("code",null,"-O2"),s(" （编译选项） "),n("br"),s(),n("code",null,"-D_FORTIFY_SOURCE=2"),s(" （编译选项，默认开启，但需要"),n("code",null,"-O2"),s("启动时才会激活）")],-1),Z=n("tr",null,[n("td",null,"ftrapv"),n("td",null,[n("span",{class:"level-2"},[s("可选"),n("br"),s("medium")])]),n("td",null,[s("整数溢出检查 "),n("br"),s(" 使用了它之后，在执行有符号整数间的加减乘运算时，不是通过CPU的指令，而是用包含了GCC附属库的libgcc.c里面的函数来实现执行带符号的整数间的加/减/乘/除运算。 "),n("br"),s(),n("span",{sytle:"background:yellow"},"对性能影响比较大。")]),n("td",null,[n("code",null,"-ftrapv"),s(" （编译选项）")])],-1),J=n("tr",null,[n("td",null,"NX(DEP)"),n("td",null,[n("span",{class:"level-1"},[s("可选"),n("br"),s("high")])]),n("td",null,"堆栈不可执行"),n("td",null,[n("code",null,"-z noexecstack"),s(),n("br"),s(" 解释： "),n("ul",null,[n("li",null,[n("code",null,"-z execstack"),s(": 关闭")]),n("li",null,[n("code",null,"-z noexecstack"),s(": 开启")])])])],-1),Q=n("tr",null,[n("td",null,"rpath"),n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high")])]),n("td",null,[s("禁用： “动态库搜索路径” "),n("br"),s(" 禁用： "),n("code",null,"-rpath"),s(),n("br"),s(" 二进制特征会显示rpath/runpath路径。攻击者更加容易构造rpath类的攻击 "),n("br"),s(),n("s",null,[s("指定运行时避免使用链接器 "),n("code",null,"-Wl,-rpath=."),s(" 寻找动态库的路径")])]),n("td",null,[n("code",null,"set(CMAKE_SKIP_RPATH TRUE)"),s(" （Cmake）")])],-1),nn=n("tr",null,[n("td",null,"Bind-Now"),n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high")])]),n("td",null,"立即绑定"),n("td",null,[n("code",null,"-Wl,-z,now"),s(" （链接选项） "),n("br"),s(" 或："),n("code",null,"LD_BIND_NOW=1")])],-1),sn=n("tr",null,[n("td",null,"RELRO"),n("td",null,[n("span",{class:"level-1"},[s("必选"),n("br"),s("high")])]),n("td",null,[s("GOT表保护"),n("br"),s("全部重定向只读保护，防止内存越界，一旦越界就会segmentation faul。"),n("br"),s("对ret2plt攻击进行防护")]),n("td",null,[n("code",null,"-Wl,-z,relro"),s(" （链接选项） "),n("br"),s(" 解释："),n("ul",null,[n("li",null,[n("code",null,"-z norelro"),s(": 关闭")]),n("li",null,[n("code",null,"-z lazy"),s(": 部分开启")]),n("li",null,[n("code",null,"-z now"),s(": 完全开启")])])])],-1),an=n("tr",null,[n("td",null,"Strip"),n("td",null,[n("span",{class:"level-2"},[s("必选"),n("br"),s("medium ")])]),n("td",null,[s("去除符号表：链接过程完成后，符号表对可执行文件运行已无任何作用，反而会成为攻击者构造攻击的工具。"),n("br"),s("同时，删除符号表还可以对文件“减肥”，降低文件大小")]),n("td",null,[n("code",null,"-Wl,-s"),s(" （链接选项）")])],-1),en=n("h3",{id:"安全编译选项检测工具",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安全编译选项检测工具","aria-hidden":"true"},"#"),s(" 安全编译选项检测工具")],-1),ln=n("h4",{id:"binscope-todo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#binscope-todo","aria-hidden":"true"},"#"),s(" binscope todo")],-1),tn=n("p",null,"参考：",-1),cn={href:"https://zhuanlan.zhihu.com/p/624647089",target:"_blank",rel:"noopener noreferrer"},on={href:"https://www.microsoft.com/en-us/download/details.aspx?id=44995",target:"_blank",rel:"noopener noreferrer"},dn={href:"https://docs.microsoft.com/en-us/cpp/build/reference/compiling-a-c-cpp-program?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},pn={href:"https://docs.microsoft.com/en-us/cpp/build/reference/linking?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},rn={href:"https://blog.csdn.net/sunweiliang/article/details/89338099",target:"_blank",rel:"noopener noreferrer"},un={href:"https://blog.csdn.net/john_crash/article/details/50127309",target:"_blank",rel:"noopener noreferrer"},vn={href:"https://docs.microsoft.com/en-us/cpp/security/security-best-practices-for-cpp?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},bn={href:"https://docs.microsoft.com/en-us/cpp/c-runtime-library/security-features-in-the-crt?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},mn={href:"https://docs.microsoft.com/en-us/cpp/standard-library/iterator-debug-level?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},kn={href:"https://docs.microsoft.com/en-us/cpp/standard-library/checked-iterators?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},hn={href:"https://docs.microsoft.com/en-us/cpp/code-quality/code-analysis-for-c-cpp-overview?view=msvc-170",target:"_blank",rel:"noopener noreferrer"},fn={href:"https://www.microsoft.com/en-us/download/details.aspx?id=44995",target:"_blank",rel:"noopener noreferrer"},gn={href:"https://github.com/andrew-d/binscope",target:"_blank",rel:"noopener noreferrer"},_n={href:"https://gitee.com/dangoxj/secbinarycheck-result-analyzer",target:"_blank",rel:"noopener noreferrer"},xn=l(`<h2 id="configure" tabindex="-1"><a class="header-anchor" href="#configure" aria-hidden="true">#</a> configure</h2><p>参考：</p><ul><li>简述configure、pkg-config、pkg_config_path三者的关系 | https://www.cnblogs.com/wliangde/p/3807532.html</li></ul><p><code>configure</code> 是一个脚本文件，定义了执行时可以传入的必要参数，告知配置项目。 <code>configure</code> 程序它会根据传入的配置项目检查程序编译时所依赖的环境以及对程序编译安装进行配置，最终生成编译所需的 <code>Makefile</code> 文件供程序 <code>make</code> 读入使用进而调用相关编译程式来编译最终的二进制程序。</p><h3 id="pkg-config-链接库配置生成器" tabindex="-1"><a class="header-anchor" href="#pkg-config-链接库配置生成器" aria-hidden="true">#</a> pkg-config 链接库配置生成器</h3><p>一般来说，如果库的头文件不在 <code>/usr/include</code> 目录中，那么在编译的时候需要用 <code>-I</code> 参数指定其路径。</p><p>由于编译的环境和编译后程序运行的环境大概率不同，通过 <code>-I</code> 指定的文件路径大概率也不一样，这是需要编译后的 <code>lib/pkgconfig</code> 目录中添加 <code>.pc</code> 文件来指定库的各种必要信息，包括版本信息、编译和连接需要的参数等。 这样，不管库文件安装在哪，通过库对应的 <code>.pc</code> 文件就可以准确定位，可以使用相同的编译和连接命令，使得编译和连接界面统一。</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>prefix=/opt/gtk/
exec_prefix=\${prefix}
libdir=\${exec_prefix}/lib
includedir=\${prefix}/include
 
glib_genmarshal=glib-genmarshal
gobject_query=gobject-query
glib_mkenums=glib-mkenums
 
Name: GLib
Description: C Utility Library
Version: 2.12.13
Libs: -L\${libdir} -lglib-2.0
Cflags: -I\${includedir}/glib-2.0 -I\${libdir}/glib-2.0/include
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有可使用的包</span>
<span class="token comment"># 位置在：</span>
<span class="token comment"># + /usr/lib/pkgconfig —— 此目录下都是各种.pc文件。</span>
<span class="token comment"># + /usr/local/lib/pkgconfig —— 新软件一般都会安装.pc文件</span>
<span class="token comment"># + 没有可以自己创建，并且设置环境变量 PKG_CONFIG_PATH 寻找 .pc 文件路径。</span>
$ pkg-config –list-all

<span class="token comment"># 给出在编译时所需要的选项</span>
$ gcc <span class="token parameter variable">-c</span> <span class="token variable"><span class="token variable">\`</span>pkg-config <span class="token parameter variable">--cflags</span> glib-2.0<span class="token variable">\`</span></span> sample.c
<span class="token comment"># 给出连接时的选项</span>
$ gcc sample.o <span class="token parameter variable">-o</span> sample <span class="token variable"><span class="token variable">\`</span>pkg-config <span class="token parameter variable">--libs</span> glib-2.0<span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PKG_CONFIG_PATH</span><span class="token operator">=</span>/opt/gtk/lib/pkgconfig:<span class="token variable">$PKG_CONFIG_PATH</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">LD_LIBRARY_PATH</span><span class="token operator">=</span>/opt/gtk/lib:<span class="token variable">$LD_LIBRARY_PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function Ln(yn,Cn){const e=c("ExternalLinkIcon"),i=c("RouterLink");return d(),p("div",null,[u,v,n("ul",null,[n("li",null,[s("详解三大编译器：gcc、llvm 和 clang | "),n("a",b,[s("https://zhuanlan.zhihu.com/p/357803433"),a(e)])])]),m,n("ul",null,[n("li",null,[k,n("p",null,[s("gcc: "),a(i,{to:"/dev/c/gcc.html"},{default:t(()=>[s("link")]),_:1})]),n("p",null,[s("g++: "),a(i,{to:"/dev/c/gpp.html"},{default:t(()=>[s("link")]),_:1})])]),h,f]),g,n("p",null,[s("makefile: "),a(i,{to:"/dev/c/makefile.html"},{default:t(()=>[s("link")]),_:1})]),n("p",null,[s("cmake: "),a(i,{to:"/dev/c/cmake.html"},{default:t(()=>[s("link")]),_:1})]),_,n("ul",null,[n("li",null,[s("动态符号链接的细节 - "),n("a",x,[s("https://www.w3cschool.cn/cbook/ojay2ozt.html"),a(e)]),s(" 【非常详细】")])]),L,n("p",null,[s("glibc官网地址: "),n("a",y,[s("https://www.gnu.org/software/libc/"),a(e)]),s(),C,s(" glibc源代码包: "),n("a",I,[s("https://ftp.gnu.org/gnu/glibc/"),a(e)])]),w,n("details",E,[R,n("ul",null,[n("li",null,[s("Linux系统中编译、链接的基石-ELF文件：扒开它的层层外衣，从字节码的粒度来探索 - "),n("a",T,[s("https://mp.weixin.qq.com/s/ZOvHG_ofiU6iWtoSR9bFow"),a(e)])])])]),G,n("p",null,[s("根据 "),n("a",A,[s("Re: What does -DPIC linker flag mean"),a(e)]),s(" 提到： todo")]),P,n("p",null,[s("todo linux程序保护机制&gcc编译选项 - "),n("a",B,[s("https://www.jianshu.com/p/91fae054f922"),a(e)])]),O,n("table",null,[S,n("tbody",null,[N,D,n("tr",null,[F,U,n("td",null,[s("栈保护。可以判断是否发生溢出攻击 "),$,s(" 参考： "),n("a",z,[s("https://www.cnblogs.com/arnoldlu/p/11630979.html"),a(e)])]),H]),n("tr",null,[V,q,n("td",null,[s("GCC编译器和glibc库配合提供在编译时和运行时对固定大小的缓冲区的访问 "),Y,s(" （无论时动态分配的还是静态声明的内存空间） "),M,s(" 参考： "),n("a",W,[s("https://forum.butian.net/share/1190"),a(e)]),s(),j,s(),X]),K]),Z,J,Q,nn,sn,an])]),en,ln,tn,n("ul",null,[n("li",null,[s("todo binscope说明 - Windows平台MSVC的安全编译选项检测工具 "),n("a",cn,[s("https://zhuanlan.zhihu.com/p/624647089"),a(e)]),n("ul",null,[n("li",null,[s("todo "),n("a",on,[s("binscope"),a(e)])]),n("li",null,[s("todo "),n("a",dn,[s("官方文档 编译器选项"),a(e)])]),n("li",null,[s("todo "),n("a",pn,[s("官方文档 链接器选项"),a(e)])]),n("li",null,[s("todo "),n("a",rn,[s("MSVC编译参数"),a(e)])]),n("li",null,[s("todo "),n("a",un,[s("MSVC编译参数"),a(e)])]),n("li",null,[s("todo "),n("a",vn,[s("Security Best Practices for C++"),a(e)])]),n("li",null,[s("todo "),n("a",bn,[s("Security Features in the CRT"),a(e)])]),n("li",null,[s("todo "),n("a",mn,[s("_ITERATOR_DEBUG_LEVEL"),a(e)])]),n("li",null,[s("todo "),n("a",kn,[s("Checked Iterators"),a(e)])]),n("li",null,[s("todo "),n("a",hn,[s("Code analysis for C/C++ overview"),a(e)])])])]),n("li",null,[s("todo BinScope 2014 "),n("a",fn,[s("https://www.microsoft.com/en-us/download/details.aspx?id=44995"),a(e)])]),n("li",null,[s("todo binscope github "),n("a",gn,[s("https://github.com/andrew-d/binscope"),a(e)])]),n("li",null,[s("todo SecBinaryCheck ResultAnalyzer "),n("a",_n,[s("https://gitee.com/dangoxj/secbinarycheck-result-analyzer"),a(e)])])]),xn])}const wn=o(r,[["render",Ln],["__file","build.html.vue"]]);export{wn as default};
