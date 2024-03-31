import{_ as i,r as l,o as t,c,a as n,b as s,d as e,e as d}from"./app-2227e0ad.js";const p={},o=n("p",null,"c语言编译器",-1),r=n("p",null,"参考：",-1),u={href:"https://www.bilibili.com/video/BV1EM41177s1/",target:"_blank",rel:"noopener noreferrer"},v=n("br",null,null,-1),b={href:"https://github.com/WohimLee/GNC-Tutorial",target:"_blank",rel:"noopener noreferrer"},m={href:"https://gcc.gnu.org/",target:"_blank",rel:"noopener noreferrer"},k=n("br",null,null,-1),h={href:"https://gcc.gnu.org/onlinedocs/",target:"_blank",rel:"noopener noreferrer"},f=d(`<p>GCC（GNU Compiler Collection，GNU编译程序集合）是GNU项目的一个产品，是最重要的开放源码软件。如Python就是由C语言开发，由GNU编译程序编译的！</p><p>GCC常见的组成部分：</p><table><thead><tr><th>模块</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>configure</td><td>GCC源码树根目录中的一个脚本，用于设置配置值和创建GCC编译程序必须的make程序文件。</td><td></td></tr><tr><td>gcc</td><td>该驱动程序等同于执行编译程序和链接程序以产生需要的输出。</td><td>只能编译c语言</td></tr><tr><td>c++</td><td>gcc的一个版本，默认语言为C++，而且在链接的时候自动包含标准C++库，这和g++一样。</td><td></td></tr><tr><td>g++</td><td>gcc的一个版本，默认语言为G++，而且在链接的时候自动包含标准C++库，这和c++一样。</td><td>向下兼容，同时能编译C/C++语言 <br> （<span style="background:yellow;">一般选择此作为编译工具</span>）</td></tr><tr><td>libgcc</td><td>该库包含的例程段被作为编译程序的一部分，是因为它们可以被链接到实际的可执行程序中。它们是例程，链接到可执行程序，来执行基本的任务，例如浮点运算。这些库中的例程通常都是平台相关的。</td><td></td></tr><tr><td>libstdc++</td><td>运行时库，包括定义为标准语言一部分的所有的C++类和函数。</td><td></td></tr></tbody></table><p>GCC包含的常见软件：</p><table><thead><tr><th>工具</th><th>说明</th><th>备注</th></tr></thead><tbody><tr><td>ar</td><td>这是一个程序，可通过文档添加、删除和析取文件来维护库文件。通常使用该文件是为了创建和管理链接程序使用的目标库文档。该程序是binutils包的一部分。</td><td>编译静态库是用到</td></tr><tr><td>as</td><td>GNU汇编器。实际上它是一族汇编器，因为它可以被编译或者能够在各种不同平台上工作。该程序是binutils包的一部分。</td><td>简单说：将C/C++源文件转换成汇编语言</td></tr><tr><td>autoconf</td><td>产生的shell脚本自动配置源代码包取编译某个特定版本的UNIX。</td><td></td></tr><tr><td>gdb</td><td>GNU调试器。可用于检查程序运行时的值和行为。</td><td>各种IDE（vscode/visualstudio/...）底层调用该工具</td></tr><tr><td>GNATS（GNU Bug Tracking System）</td><td>一个跟踪GCC和其他GNU程序问题的在线系统。</td><td>经常在别人工程中下载库编译安装时经常看到这东西</td></tr><tr><td>gprof</td><td>该程序会监督编译程序的执行过程，并报告程序中各个函数的运行时间，可以根据所提供的配置车文件来优化程序。该程序是binutils包的一部分。</td><td>静态库/动态库都用到 <br> 新手经常碰到的问题大概率与此库相关，如 ld error ...</td></tr><tr><td>ld</td><td>GNU连接程序。该程序将目标文件的集合组成可执行程序。该程序是binutils包的一部分。</td><td></td></tr><tr><td>libtool</td><td>一个基本库，支持make程序的描述文件使用的简化共享库用法的脚本。</td><td></td></tr><tr><td>make</td><td>一个工具程序，它会读makefile脚本来确定程序中哪部分需要编译和连接，然后发布必要的命令。它读出的脚本（makefile或Makefile）定义了文件关系和依赖关系。</td><td>make工具的支持库</td></tr></tbody></table><h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念" aria-hidden="true">#</a> 基础概念</h2><h3 id="文件后缀解释" tabindex="-1"><a class="header-anchor" href="#文件后缀解释" aria-hidden="true">#</a> 文件后缀解释</h3><table><thead><tr><th>后缀（Suffix）</th><th>说明（File Contains）</th></tr></thead><tbody><tr><td>.c</td><td>源文件 <br> C source code that is to be preprocessed.</td></tr><tr><td>.h</td><td>头文件 <br> C source code header file.</td></tr><tr><td>.i</td><td>预处理文件 <br> C source code that is not to be preprocessed. <br> This type of file is produced as an intermediate step in compilation.</td></tr><tr><td>.s</td><td>汇编语言文件 <br> Assembly language code. <br> this type of file is produced as an intermediate step in compilation.</td></tr><tr><td>.o</td><td>目标文件 <br> An object file in a format appropriate to be supplied to the linker. <br> This type of file is produced as an intermediate step in compilation.</td></tr><tr><td>.a</td><td>静态库文件 <br> Static object library (archive).</td></tr><tr><td>.so <br>.lib/.dll (for windows)</td><td>动态库/共享库/运行时库文件 <br> Shared object library.</td></tr></tbody></table><h2 id="编译过程" tabindex="-1"><a class="header-anchor" href="#编译过程" aria-hidden="true">#</a> 编译过程</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>↓
↓ hello.c （源文件，文本）
↓ 
预处理器（cpp） —— 注释、宏定义
↓
↓ hello.i （修改了的源程序，文本）
↓
编译器（ccl）
↓
↓ hello.s （汇编程序，文本）
↓
汇编器（as）
↓
↓ hello.o （目标程序，二进制）（可重定位程序，relocatable object program）
↓
链接器（ld）
↓
↓ ←←← prinf.o （链接二进制）
↓
↓ hello （目标程序，二进制）（可执行文件）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单来说： 首先把源代码编译成目标文件， 然后把目标文件链接起来。</p><h3 id="创建可执行文件" tabindex="-1"><a class="header-anchor" href="#创建可执行文件" aria-hidden="true">#</a> 创建可执行文件</h3><p>hello.c</p><details class="custom-container details"><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello World!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="预处理-i" tabindex="-1"><a class="header-anchor" href="#预处理-i" aria-hidden="true">#</a> 预处理 .i</h4><p>hello.i</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-E</span> hello.c <span class="token comment"># 输出控制台</span>
gcc <span class="token parameter variable">-E</span> hello.c <span class="token parameter variable">-o</span> hello.i 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-i line-numbers-mode" data-ext="i"><pre class="language-i"><code>version https://git-lfs.github.com/spec/v1
oid sha256:505554e9290cb0124f5b6014f5c5b38838e945cd0f7cfe4ccc5c3e68ee32596b
size 17982
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="生成汇编语言-s" tabindex="-1"><a class="header-anchor" href="#生成汇编语言-s" aria-hidden="true">#</a> 生成汇编语言 .s</h4><p>hello.s</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-S</span> hello.c
gcc <span class="token parameter variable">-S</span> hello.c <span class="token parameter variable">-o</span> hello.s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-s line-numbers-mode" data-ext="s"><pre class="language-s"><code>	.file	&quot;hello.c&quot;
	.text
	.section	.rodata
.LC0:
	.string	&quot;Hello World!&quot;
	.text
	.globl	main
	.type	main, @function
main:
.LFB0:
	.cfi_startproc
	endbr64
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movl	%edi, -4(%rbp)
	movq	%rsi, -16(%rbp)
	leaq	.LC0(%rip), %rax
	movq	%rax, %rdi
	call	puts@PLT
	movl	$0, %eax
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE0:
	.size	main, .-main
	.ident	&quot;GCC: (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0&quot;
	.section	.note.GNU-stack,&quot;&quot;,@progbits
	.section	.note.gnu.property,&quot;a&quot;
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	&quot;GNU&quot;
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="生成目标文件-o" tabindex="-1"><a class="header-anchor" href="#生成目标文件-o" aria-hidden="true">#</a> 生成目标文件 .o</h4><p>hello.o</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-c</span> hello.c
gcc <span class="token parameter variable">-c</span> hello.c <span class="token parameter variable">-o</span> hello.h
<span class="token comment"># 编译多个.c文件</span>
gcc <span class="token parameter variable">-c</span> hello1.c hello2.c <span class="token comment"># ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ll hello.o
<span class="token parameter variable">-rwxrwxrwx</span> <span class="token number">1</span> uv01 uv01 <span class="token number">1512</span> Mar  <span class="token number">9</span> <span class="token number">14</span>:59 hello.o* 
$ <span class="token function">file</span> hello.o
hello.o: ELF <span class="token number">64</span>-bit LSB relocatable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, not stripped
<span class="token comment"># ELF —— Executable and Linking Format，可执行可连接格式</span>
<span class="token comment"># 64-bit</span>
<span class="token comment"># LSB —— Least Significant Bit，最小标识位/最低位有效。表示时是小端模式的程序</span>
<span class="token comment"># relocatable —— 可重定位，运行时才指定内存位置？</span>
<span class="token comment"># x86-64 —— cpu架构</span>
<span class="token comment"># version 1 (SYSV) —— System V | 程序初始化方案？</span>
<span class="token comment"># stripped/not stripped </span>
<span class="token comment">#   + stripped     —— 将程序中的符号表的信息剔除掉了，优点： 1. 可执行文件体积减少； 2. 程序更难以被调试/逆向/破解</span>
<span class="token comment">#   + not stripped —— 保留了上述信息，便于调试</span>

<span class="token comment"># 命令： readelf -h —— 查看二进制文件头文件</span>
<span class="token comment"># Linux的可执行文件一般是elf格式（Executable and Linking Format，可执行可连接格式）的，在这个可执行文件的头部包含了很多重要的信息：如文件格式，加载地址，符号表等。</span>
$ readelf <span class="token parameter variable">-h</span> hello.o 
ELF Header:
  Magic:   7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              <span class="token number">2</span>&#39;s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              REL <span class="token punctuation">(</span>Relocatable <span class="token function">file</span><span class="token punctuation">)</span> <span class="token comment"># 💡文件类型 ❗可重定位，运行时才指定内存位置？</span>
  Machine:                           Advanced Micro Devices X86-64 <span class="token comment"># 适配的cpu架构</span>
  Version:                           0x1
  Entry point address:               0x0 <span class="token comment"># 💡程序入口地址 ❗无指定</span>
  Start of program headers:          <span class="token number">0</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">616</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">0</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">0</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">14</span>
  Section header string table index: <span class="token number">13</span>
$ ./hello.o <span class="token comment"># 未可执行</span>
-bash: ./hello.o: cannot execute binary file: Exec <span class="token function">format</span> error 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="生成可执行文件" tabindex="-1"><a class="header-anchor" href="#生成可执行文件" aria-hidden="true">#</a> 生成可执行文件</h4><p>hello</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc hello.c
gcc hello.c <span class="token parameter variable">-o</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ ll hello <span class="token comment"># 大了10倍，链接了静态库？</span>
<span class="token parameter variable">-rwxrwxrwx</span> <span class="token number">1</span> uv01 uv01 <span class="token number">15960</span> Mar  <span class="token number">9</span> <span class="token number">15</span>:06 hello* 
$ <span class="token function">file</span> hello 
hello: ELF <span class="token number">64</span>-bit LSB pie executable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID<span class="token punctuation">[</span>sha1<span class="token punctuation">]</span><span class="token operator">=</span>2b5da4e7b90b64972cb49265c24db07574df467a, <span class="token keyword">for</span> GNU/Linux <span class="token number">3.2</span>.0, not stripped
<span class="token comment"># dynamically linked —— 动态链接的！</span>
<span class="token comment"># interpreter /lib64/ld-linux-x86-64.so.2</span>
<span class="token comment"># BuildID[sha1]=2b5da4e7b90b64972cb49265c24db07574df467a</span>
<span class="token comment"># for GNU/Linux 3.2.0</span>
<span class="token comment"># not stripped</span>
$ readelf <span class="token parameter variable">-h</span> hello 
ELF Header:
  Magic:   7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              <span class="token number">2</span>&#39;s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              DYN <span class="token punctuation">(</span>Position-Independent Executable <span class="token function">file</span><span class="token punctuation">)</span> <span class="token comment"># 💡文件类型</span>
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x1060 <span class="token comment"># 💡程序入口地址 ❗已指定</span>
  Start of program headers:          <span class="token number">64</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">13976</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">56</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">13</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">31</span>
  Section header string table index: <span class="token number">30</span>
$ ./hello
Hello World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="创建静态库-a" tabindex="-1"><a class="header-anchor" href="#创建静态库-a" aria-hidden="true">#</a> 创建静态库 .a</h3><p>static library 静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中</p><p>代码</p><details class="custom-container details"><p>calc.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="生成目标文件-o-1" tabindex="-1"><a class="header-anchor" href="#生成目标文件-o-1" aria-hidden="true">#</a> 生成目标文件 .o</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gcc <span class="token parameter variable">-c</span> add.c <span class="token parameter variable">-o</span> add.o
gcc <span class="token parameter variable">-c</span> tfunc.c <span class="token parameter variable">-o</span> tfunc.o
<span class="token comment"># gcc -c lib1.c lib2.c ...</span>
gcc <span class="token parameter variable">-c</span> add.c tfunc.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ readelf <span class="token parameter variable">-h</span> add.o tfunc.o
File: add.o
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
File: tfunc.o
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2&#39;</span>s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              REL <span class="token punctuation">(</span>Relocatable <span class="token function">file</span><span class="token punctuation">)</span>
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          <span class="token number">0</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">536</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">0</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">0</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">13</span>
  Section header string table index: <span class="token number">12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="编译静态库-a" tabindex="-1"><a class="header-anchor" href="#编译静态库-a" aria-hidden="true">#</a> 编译静态库 .a</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 库文件命名规范 lib&lt;库名&gt;.a</span>
ar <span class="token parameter variable">-r</span> liboperation.a add.o tfunc.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> liboperation.a 
liboperation.a: current ar archive
$ ar <span class="token parameter variable">-t</span> liboperation.a <span class="token comment"># display contents of the archive</span>
add.o
tfunc.o
$ readelf <span class="token parameter variable">-h</span> liboperation.a <span class="token comment"># 查看库头文件</span>
File: liboperation.a<span class="token punctuation">(</span>add.o<span class="token punctuation">)</span>
ELF Header:
  Magic:   7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              <span class="token number">2</span><span class="token string">&#39;s complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file) # 💡文件类型
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
File: liboperation.a(tfunc.o)
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2&#39;</span>s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              REL <span class="token punctuation">(</span>Relocatable <span class="token function">file</span><span class="token punctuation">)</span> <span class="token comment"># 💡文件类型</span>
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          <span class="token number">0</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">536</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">0</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">0</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">13</span>
  Section header string table index: <span class="token number">12</span>
$ readelf <span class="token parameter variable">-S</span> add.o <span class="token comment"># 地址均未指定</span>
There are <span class="token number">12</span> section headers, starting at offset 0x1d0:

Section Headers:
  <span class="token punctuation">[</span>Nr<span class="token punctuation">]</span> Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  <span class="token punctuation">[</span> <span class="token number">0</span><span class="token punctuation">]</span>                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">0</span>
  <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">]</span> .text             PROGBITS         0000000000000000  00000040
       0000000000000018  0000000000000000  AX       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span> <span class="token number">2</span><span class="token punctuation">]</span> .data             PROGBITS         0000000000000000  00000058
       0000000000000000  0000000000000000  WA       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span> <span class="token number">3</span><span class="token punctuation">]</span> .bss              NOBITS           0000000000000000  00000058
       0000000000000000  0000000000000000  WA       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span> <span class="token number">4</span><span class="token punctuation">]</span> .comment          PROGBITS         0000000000000000  00000058
       000000000000002c  0000000000000001  MS       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span> <span class="token number">5</span><span class="token punctuation">]</span> .note.GNU-stack   PROGBITS         0000000000000000  00000084
       0000000000000000  0000000000000000           <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span> <span class="token number">6</span><span class="token punctuation">]</span> .note.gnu.pr<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> NOTE             0000000000000000  00000088
       0000000000000020  0000000000000000   A       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">8</span>
  <span class="token punctuation">[</span> <span class="token number">7</span><span class="token punctuation">]</span> .eh_frame         PROGBITS         0000000000000000  000000a8
       0000000000000038  0000000000000000   A       <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">8</span>
  <span class="token punctuation">[</span> <span class="token number">8</span><span class="token punctuation">]</span> .rela.eh_frame    RELA             0000000000000000  00000150
       0000000000000018  0000000000000018   I       <span class="token number">9</span>     <span class="token number">7</span>     <span class="token number">8</span>
  <span class="token punctuation">[</span> <span class="token number">9</span><span class="token punctuation">]</span> .symtab           SYMTAB           0000000000000000  000000e0
       0000000000000060  0000000000000018          <span class="token number">10</span>     <span class="token number">3</span>     <span class="token number">8</span>
  <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span> .strtab           STRTAB           0000000000000000  00000140
       000000000000000b  0000000000000000           <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
  <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">]</span> .shstrtab         STRTAB           0000000000000000  00000168
       0000000000000067  0000000000000000           <span class="token number">0</span>     <span class="token number">0</span>     <span class="token number">1</span>
Key to Flags:
  W <span class="token punctuation">(</span>write<span class="token punctuation">)</span>, A <span class="token punctuation">(</span>alloc<span class="token punctuation">)</span>, X <span class="token punctuation">(</span>execute<span class="token punctuation">)</span>, M <span class="token punctuation">(</span>merge<span class="token punctuation">)</span>, S <span class="token punctuation">(</span>strings<span class="token punctuation">)</span>, I <span class="token punctuation">(</span>info<span class="token punctuation">)</span>,
  L <span class="token punctuation">(</span>link order<span class="token punctuation">)</span>, O <span class="token punctuation">(</span>extra OS processing required<span class="token punctuation">)</span>, G <span class="token punctuation">(</span>group<span class="token punctuation">)</span>, T <span class="token punctuation">(</span>TLS<span class="token punctuation">)</span>,
  C <span class="token punctuation">(</span>compressed<span class="token punctuation">)</span>, x <span class="token punctuation">(</span>unknown<span class="token punctuation">)</span>, o <span class="token punctuation">(</span>OS specific<span class="token punctuation">)</span>, E <span class="token punctuation">(</span>exclude<span class="token punctuation">)</span>,
  D <span class="token punctuation">(</span>mbind<span class="token punctuation">)</span>, l <span class="token punctuation">(</span>large<span class="token punctuation">)</span>, p <span class="token punctuation">(</span>processor specific<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="链接静态库" tabindex="-1"><a class="header-anchor" href="#链接静态库" aria-hidden="true">#</a> 链接静态库</h4><div class="custom-container tip"><p class="custom-container-title">提示</p><p>动态链接执行很复杂，比静态链接执行时间长。 但是，极大的节省了 size。 其中用到的 PIC 和动态链接技术是计算机发展史上非常重要的一个里程碑。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># gcc [.c] [.a] -o [.o]</span>
<span class="token comment"># gcc [.c] -o [.o] -l[库名] -L[库路径]</span>
gcc calc.c liboperation.a <span class="token parameter variable">-o</span> calc

<span class="token comment"># 也可以直接使用.o文件链接</span>
gcc calc.o tfunc.o add.o <span class="token parameter variable">-o</span> calc

$ ./calc <span class="token number">1</span> <span class="token number">2</span>
<span class="token number">1</span> + <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> calc
calc: ELF <span class="token number">64</span>-bit LSB pie executable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID<span class="token punctuation">[</span>sha1<span class="token punctuation">]</span><span class="token operator">=</span>50ba230b15340df52d926d4a374a9938bd2c6917, <span class="token keyword">for</span> GNU/Linux <span class="token number">3.2</span>.0, not stripped
$ ldd calc <span class="token comment"># 查看可执行程序的依赖</span>
        linux-vdso.so.1 <span class="token punctuation">(</span>0x00007fffc95dd000<span class="token punctuation">)</span>
        libc.so.6 <span class="token operator">=</span><span class="token operator">&gt;</span> /lib/x86_64-linux-gnu/libc.so.6 <span class="token punctuation">(</span>0x00007f38e7817000<span class="token punctuation">)</span>
        /lib64/ld-linux-x86-64.so.2 <span class="token punctuation">(</span>0x00007f38e7a4d000<span class="token punctuation">)</span>
$ readelf <span class="token parameter variable">-l</span> calc

Elf <span class="token function">file</span> <span class="token builtin class-name">type</span> is DYN <span class="token punctuation">(</span>Position-Independent Executable <span class="token function">file</span><span class="token punctuation">)</span>
Entry point 0x1080
There are <span class="token number">13</span> program headers, starting at offset <span class="token number">64</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="创建动态库-so" tabindex="-1"><a class="header-anchor" href="#创建动态库-so" aria-hidden="true">#</a> 创建动态库 .so</h3><p>shared library 不像静态库是在链接可执行文件时，代码段和数据段直接拷贝到可执行文件中。 动态库来是在运行时加载动态库代码，因此无法在编译和链接阶段获取代码段的符号地址（代码段的符号包括引用的全局数据，调用的函数等）。</p><h4 id="生成目标文件-o-2" tabindex="-1"><a class="header-anchor" href="#生成目标文件-o-2" aria-hidden="true">#</a> 生成目标文件 .o</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># gcc -c -fpic [.c/.cpp] [.c/.cpp] ...</span>
<span class="token comment"># -fpic/-fPIC </span>
<span class="token comment">#       PIC（position independent code）</span>
<span class="token comment">#       -fPIC 与生成动态链接可以说没有直接关系，不用fPIC依然可以编译出so文件。</span>
<span class="token comment">#       但是如果不加 -fPIC 则加载 .so 文件的代码段时，代码段引用的数据对象需要重定位。</span>
<span class="token comment">#       重定位会修改代码段的内容，这就造成每个使用这个 .so 文件代码段的进程在内核里都会生成这个 .so 文件代码段的copy。</span>
<span class="token comment">#       由于于这个 .so 文件代码段和数据段内存映射的位置不一样，每个copy都不一样。</span>
<span class="token comment">#       💡一般用fPIC来生成so，而生成a时则不用fPIC</span>
<span class="token comment"># </span>
<span class="token comment">#       不使用fPIC编译so的情况：（满足以下4个条件）</span>
<span class="token comment">#       1. 该库可能需要经常更新</span>
<span class="token comment">#       2. 该库需要非常高的效率（尤其是有很多全局量的使用时）</span>
<span class="token comment">#       3. 该库并不很大</span>
<span class="token comment">#       4. 该库基本不需要被多个应用程序共享</span>
gcc <span class="token parameter variable">-c</span> <span class="token parameter variable">-fpic</span> tfunc.c add.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> tfunc.o add.o
tfunc.o: ELF <span class="token number">64</span>-bit LSB relocatable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, not stripped
add.o:   ELF <span class="token number">64</span>-bit LSB relocatable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, not stripped
$ readelf <span class="token parameter variable">-h</span> add.o tfunc.o
File: add.o
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
File: tfunc.o
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2&#39;</span>s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              REL <span class="token punctuation">(</span>Relocatable <span class="token function">file</span><span class="token punctuation">)</span>
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          <span class="token number">0</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">536</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">0</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">0</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">13</span>
  Section header string table index: <span class="token number">12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="生成动态库-so" tabindex="-1"><a class="header-anchor" href="#生成动态库-so" aria-hidden="true">#</a> 生成动态库 .so</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># gcc -shared [.o] [.o] ... -o [lib库名.so]</span>
<span class="token comment"># -shared —— 生成共享目标文件。通常用在建立共享库时。</span>
<span class="token comment">#            💡是否添加 -fPIC 的问题：</span>
<span class="token comment">#            从GCC来看，shared应该是包含fPIC选项的，但似乎不是所以系统都支持，所以最好显式加上fPIC选项。</span>
gcc <span class="token parameter variable">-shared</span> tfunc.o add.o <span class="token parameter variable">-o</span> liboperation.so
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> liboperation.so
liboperation.so: ELF <span class="token number">64</span>-bit LSB shared object, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, dynamically linked, BuildID<span class="token punctuation">[</span>sha1<span class="token punctuation">]</span><span class="token operator">=</span>a95332c5ba7a9350a185a84281e834d6285908e1, not stripped
$ readelf <span class="token parameter variable">-h</span> liboperation.so
ELF Header:
  Magic:   7f <span class="token number">45</span> 4c <span class="token number">46</span> 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              <span class="token number">2</span>&#39;s complement, little endian
  Version:                           <span class="token number">1</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span>
  OS/ABI:                            UNIX - System V
  ABI Version:                       <span class="token number">0</span>
  Type:                              DYN <span class="token punctuation">(</span>Shared object <span class="token function">file</span><span class="token punctuation">)</span> <span class="token comment"># 💡文件类型</span>
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          <span class="token number">64</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Start of section headers:          <span class="token number">13696</span> <span class="token punctuation">(</span>bytes into <span class="token function">file</span><span class="token punctuation">)</span>
  Flags:                             0x0
  Size of this header:               <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Size of program headers:           <span class="token number">56</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of program headers:         <span class="token number">11</span>
  Size of section headers:           <span class="token number">64</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">)</span>
  Number of section headers:         <span class="token number">29</span>
  Section header string table index: <span class="token number">28</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="链接动态库" tabindex="-1"><a class="header-anchor" href="#链接动态库" aria-hidden="true">#</a> 链接动态库</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># gcc [.c/.cpp] -o [可执行文件名] -l[库名] -L[库路径] -Wl,-rpath=[库路径]</span>
<span class="token comment"># -Wl.option —— 此选项传递option给链接</span>
<span class="token comment">#               多个option中间用逗号&quot;,&quot;分割</span>
<span class="token comment"># -rpath              —— 运行时动态库路径</span>
<span class="token comment"># -l[库名] -L[库路径]  —— 编译时动态库路径</span>
gcc calc.c <span class="token parameter variable">-o</span> calc <span class="token parameter variable">-loperation</span> -L<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span> -Wl,-rpath<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">file</span> calc
calc: ELF <span class="token number">64</span>-bit LSB pie executable, x86-64, version <span class="token number">1</span> <span class="token punctuation">(</span>SYSV<span class="token punctuation">)</span>, dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID<span class="token punctuation">[</span>sha1<span class="token punctuation">]</span><span class="token operator">=</span>121f5be582653e7d6f188f0aabcaaf085217becc, <span class="token keyword">for</span> GNU/Linux <span class="token number">3.2</span>.0, not stripped
$ ldd calc <span class="token comment"># 查看可执行程序的依赖</span>
        linux-vdso.so.1 <span class="token punctuation">(</span>0x00007ffe9476e000<span class="token punctuation">)</span>
        liboperation.so <span class="token operator">=</span><span class="token operator">&gt;</span> ./liboperation.so <span class="token punctuation">(</span>0x00007f527e631000<span class="token punctuation">)</span>
        libc.so.6 <span class="token operator">=</span><span class="token operator">&gt;</span> /lib/x86_64-linux-gnu/libc.so.6 <span class="token punctuation">(</span>0x00007f527e402000<span class="token punctuation">)</span>
        /lib64/ld-linux-x86-64.so.2 <span class="token punctuation">(</span>0x00007f527e63d000<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="gcc默认头文件搜索路径" tabindex="-1"><a class="header-anchor" href="#gcc默认头文件搜索路径" aria-hidden="true">#</a> GCC默认头文件搜索路径</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token operator">|</span> gcc <span class="token parameter variable">-v</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-c</span> <span class="token parameter variable">-E</span> -
/usr/lib/gcc/x86_64-linux-gnu/7/include
/usr/local/include
/usr/lib/gcc/x86_64-linux-gnu/7/include-fixed
/usr/include/x86_64-linux-gnu
/usr/include
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo 作用</p>`,58);function g(x,y){const a=l("ExternalLinkIcon");return t(),c("div",null,[o,r,n("ul",null,[n("li",null,[s("[x] B站|李呵欠|GNU Makefile编译C/C++教程（Linux系统、VSCODE） - "),n("a",u,[s("https://www.bilibili.com/video/BV1EM41177s1/"),e(a)]),v,s(" 配套文档 - "),n("a",b,[s("https://github.com/WohimLee/GNC-Tutorial"),e(a)])])]),n("p",null,[s("GCC官网地址： "),n("a",m,[s("https://gcc.gnu.org/"),e(a)]),s(),k,s(" GCC官方文档： "),n("a",h,[s("https://gcc.gnu.org/onlinedocs/"),e(a)])]),f])}const L=i(p,[["render",g],["__file","gcc.html.vue"]]);export{L as default};
