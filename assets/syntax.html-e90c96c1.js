import{_ as l,r as i,o,c as p,a as s,b as n,d as e,e as t}from"./app-04e6f892.js";const c={},r={href:"https://blog.csdn.net/LawssssCat/article/details/103434668",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/LawssssCat/article/details/103410045",target:"_blank",rel:"noopener noreferrer"},u=t(`<h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2><h3 id="多行" tabindex="-1"><a class="header-anchor" href="#多行" aria-hidden="true">#</a> 多行</h3><p>双字节魔法数字符号表示为可解释性脚本</p><p><code>#!</code> 称为 <code>sh-bang</code>、<code>she-bang</code> 源于 <code>sharp</code>（升半音符号）、<code>bang</code>（感叹号）</p><p><code>#!/bin/bash</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># &lt;blink&gt;</span>
  <span class="token comment">###################### IMPORTANT ############################</span>
  <span class="token comment">#### DO NOT MAKE ANY CHANGE TO THIS FILE.                ####</span>
  <span class="token comment">#############################################################</span>
<span class="token comment"># &lt;/blink&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># &lt;blink&gt;</span>
   <span class="token comment">###################### IMPORTANT ########################</span>
   <span class="token comment">###### DO NOT MAKE ANY CHANGES TO THIS FILE. IT IS ######</span>
   <span class="token comment">###### MAINTAINED BY GHACKER@REDHAT.COM.           ######</span>
   <span class="token comment">#########################################################</span>
<span class="token comment"># &lt;/blink&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>详情：<code>file(1)</code>、<code>magic(5)</code></p><h3 id="单行" tabindex="-1"><a class="header-anchor" href="#单行" aria-hidden="true">#</a> 单行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#   * Thu Oct  2 2014 George Hacker &lt;ghacker@redhat.com&gt;</span>
<span class="token comment">#   - added warn and fatal functions</span>
<span class="token comment">#   - fixed stationNum and MYHOST caculation (server33-a -&gt; server-a)</span>
<span class="token comment">#   - added MYHOSTX variable (server33-a -&gt; serverX-a)</span>
<span class="token comment">#   * Thu Sep  2 2010 Joshua M. Hoffman</span>
<span class="token comment">#   - original code</span>
<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2><ul><li><code>$0</code> 命令名、脚本名</li><li><code>$1</code> 第一个参数名</li><li>...</li><li><code>$#</code> 参数个数</li><li><code>$*</code> 所有参数（当作一个整体）</li><li><code>$@</code> 所有参数（每个独立）</li><li><code>$?</code> 上一个命令返回值</li><li><code>$!</code> 上一个后台执行的PID</li></ul><h3 id="默认值" tabindex="-1"><a class="header-anchor" href="#默认值" aria-hidden="true">#</a> 默认值</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># defaults, but use exported values if they are set</span>
<span class="token builtin class-name">:</span> <span class="token variable">\${LOG_FACILITY<span class="token operator">:=</span>local0}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述分两步：</p><ol><li><code>\${LOG_FACILITY:=local0}</code> —— 若空则赋值，并传回</li><li><code>: local0</code> —— 忽略</li></ol><p>对比 <code># {LOG_FACILITY:=local0}</code>，多了<code>\${LOG_FACILITY:=local0}</code>的执行</p><h3 id="别名" tabindex="-1"><a class="header-anchor" href="#别名" aria-hidden="true">#</a> 别名</h3><p><code>alias</code> <code>unalias</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">alias</span> <span class="token assign-left variable">srb</span><span class="token operator">=</span><span class="token string">&quot;ssh root@serverb&quot;</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ps1</span><span class="token operator">=</span><span class="token string">&#39;ps axo pid,ppid,nice,cmd&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>想永久生效，保存进 <code>~/.bashrc</code></p><p><code>unalias &lt;command&gt;</code> 清除别名</p><h3 id="算术-计算" tabindex="-1"><a class="header-anchor" href="#算术-计算" aria-hidden="true">#</a> 算术 / 计算</h3><p><code>$[...]</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">1</span>+1<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">4</span>-2<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">2</span>*2<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">4</span>/2<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">5</span>%2<span class="token punctuation">]</span>
<span class="token function">expr</span> <span class="token number">5</span> % <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>$((...))</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
<span class="token number">11</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token variable">))</span></span>
<span class="token number">12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>RANDOM</code> —— 随机数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token environment constant">$RANDOM</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="变量定义、作用范围" tabindex="-1"><a class="header-anchor" href="#变量定义、作用范围" aria-hidden="true">#</a> 变量定义、作用范围</h2><p>参考：</p>`,31),v={href:"https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins",target:"_blank",rel:"noopener noreferrer"},b=t("<hr><p>查询</p><ul><li><code>env</code></li></ul><p>定义变量</p><ul><li><code>local</code> —— 在<code>function</code>内使用，避免影响 current shell variables</li><li><code>export</code> —— 设置 shell variables ，让 current、other shells that are created from current 使用</li></ul><p>调用命令</p><ul><li><code>.</code> or <code>source</code> —— 在当前环境，调用命令。命令会改变当前环境变量。</li><li><code>bash</code> or <code>/bin/bash</code> —— 构建全新的环境，调用命令。命令无法改变当前变量（隔离）。</li></ul><hr>",8),m={href:"https://superuser.com/questions/821094/what-is-the-difference-between-set-env-declare-and-export-when-setting-a-varia",target:"_blank",rel:"noopener noreferrer"},k=t('<p>First, you must understand that environment variables and shell variables are not the same thing.</p><p>Then, you should know that shells have attributes which govern how it works. These attributes are not environment nor shell variables.</p><p>Now, on to answering your question.</p><ol><li><code>env</code>: without any options, shows current environment variables with their values; However can be used to set environment variable for a single command with the -i flag</li><li><code>set</code>: without options, the name and value of each shell variable are displayed* ~ from running man set in rhel; can also be used to set shell attribute. This command DOES NOT set environment nor shell variable.</li><li><code>declare</code>: without any options, the same as env; can also be used to set shell variable export: makes shell variables environment variables</li></ol><p>In short:</p><ol><li><code>set</code> doesn&#39;t set shell nor environment variables</li><li><code>env</code> can set environment variables for a single command</li><li><code>declare</code> sets shell variables</li><li><code>export</code> makes shell variables environment variables</li></ol><p class="callout info"><code>declare -x VAR=VAL</code> creates the shell variable and also exports it, making it environment variable.<br> So <code>declare -x</code> is almost the same as export according to <a href="https://stackoverflow.com/q/5785668/322020">stackoverflow.com/q/5785668/322020</a></p><p class="callout info"><code>declare -g VAR=VAL</code> creates the shell variable that has global scope</p>',8),h=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">5</span>                <span class="token operator">&lt;=</span> here variable is <span class="token builtin class-name">set</span> without <span class="token builtin class-name">export</span> <span class="token builtin class-name">command</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">$x</span>
<span class="token number">5</span>
$ <span class="token function">bash</span>               <span class="token operator">&lt;=</span> subshell creation
$ <span class="token builtin class-name">echo</span> <span class="token variable">$x</span>            <span class="token operator">&lt;=</span> subshell doesnt know <span class="token variable">$x</span> variable value
$ <span class="token builtin class-name">exit</span>               <span class="token operator">&lt;=</span> <span class="token builtin class-name">exit</span> from subshell
<span class="token builtin class-name">exit</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">$x</span>            <span class="token operator">&lt;=</span> parent shell still knows <span class="token variable">$x</span> variable
<span class="token number">5</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">x</span><span class="token operator">=</span><span class="token number">5</span>         <span class="token operator">&lt;=</span> specify <span class="token variable">$x</span> variable value using <span class="token builtin class-name">export</span> <span class="token builtin class-name">command</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">$x</span>            <span class="token operator">&lt;=</span> parent shell doesn&#39;t see any difference from the first declaration
<span class="token number">5</span>
$ <span class="token function">bash</span>               <span class="token operator">&lt;=</span> create subshell again
$ <span class="token builtin class-name">echo</span> <span class="token variable">$x</span>            <span class="token operator">&lt;=</span> now the subshell knows <span class="token variable">$x</span> variable value
<span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env" tabindex="-1"><a class="header-anchor" href="#env" aria-hidden="true">#</a> env</h3><ul><li><code>a=1</code> 无法在 <code>env</code> 中看到，需要 <code>expor</code></li></ul><h3 id="export" tabindex="-1"><a class="header-anchor" href="#export" aria-hidden="true">#</a> export</h3><p>same as <code>declare -x</code></p><p>当前会话全局变量</p><h3 id="declare" tabindex="-1"><a class="header-anchor" href="#declare" aria-hidden="true">#</a> declare</h3><ul><li><code>a=1</code> 可以通过 <code>declare</code> 查看</li><li><code>perfix_a=1</code> 可以通过 <code> declare -p \${!perfix_@}</code> 查看</li></ul><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> set</h3><p>todo</p><h3 id="local" tabindex="-1"><a class="header-anchor" href="#local" aria-hidden="true">#</a> local</h3><p><code>local</code> —— <code>function</code> 内部作用 - local: can only be used in a function</p><h3 id="父定义、子读" tabindex="-1"><a class="header-anchor" href="#父定义、子读" aria-hidden="true">#</a> 父定义、子读</h3><p><code>source</code>/<code>function</code> - <code>=</code>、<code>declare</code>、<code>export</code></p><p><code>bash</code> - <code>export</code></p><h2 id="数学运算" tabindex="-1"><a class="header-anchor" href="#数学运算" aria-hidden="true">#</a> 数学运算</h2><h3 id="基础运算-——-整数运算" tabindex="-1"><a class="header-anchor" href="#基础运算-——-整数运算" aria-hidden="true">#</a> 基础运算 —— 整数运算</h3><p>可以利用 <code>let</code>/<code>(())</code>/<code>[]</code> 执行数学运算。在高级操作时，<code>expr</code>/<code>bc</code> 两个工具也非常有用！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token builtin class-name">let</span> <span class="token assign-left variable">c</span><span class="token operator">=</span>a+b
<span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 3</span>
<span class="token builtin class-name">let</span> c--<span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 2</span>
<span class="token builtin class-name">let</span> c++<span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 3</span>
<span class="token builtin class-name">let</span> <span class="token assign-left variable">c</span><span class="token operator">+=</span><span class="token number">6</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span>$<span class="token punctuation">[</span> a + b <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 3</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span>$<span class="token punctuation">[</span> a + <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 101</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span> a <span class="token operator">+</span> b <span class="token variable">))</span></span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 3</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span> a <span class="token operator">+</span> <span class="token number">100</span> <span class="token variable">))</span></span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 101</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $a + $b<span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 3</span>
<span class="token assign-left variable">c</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">expr</span> $a + <span class="token number">100</span><span class="token variable">\`</span></span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$c</span> <span class="token comment"># 101</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: warnning 以上方法只能用于整数，不支持浮点数！ :::</p><h3 id="bc-——-精确运算" tabindex="-1"><a class="header-anchor" href="#bc-——-精确运算" aria-hidden="true">#</a> bc —— 精确运算</h3><p>bc 至此精确的数学运算，包含了大量的高级选项。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">2.2</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;1.3 + <span class="token variable">$a</span>&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token comment"># 2.8 —— 默认 scale=2</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;scale=3;1.3 * <span class="token variable">$a</span>&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token comment"># 2.86 —— 更改 scale</span>
<span class="token comment"># 乘方</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;2^10&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token comment"># 1024</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;sqrt(4)&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token comment"># 2</span>
<span class="token comment"># 进制转换</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;obase=2;7&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token comment"># 111</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串-基础" tabindex="-1"><a class="header-anchor" href="#字符串-基础" aria-hidden="true">#</a> 字符串（基础）</h2><h3 id="截取-——-、-、-、" tabindex="-1"><a class="header-anchor" href="#截取-——-、-、-、" aria-hidden="true">#</a> 截取 —— <code>#</code>、<code>##</code>、<code>%</code>、<code>%%</code></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>先赋值一个变量为一个路径，如下：
<span class="token assign-left variable">file</span><span class="token operator">=</span>/dir1/dir2/dir3/my.file.txt

命令    解释    结果
<span class="token variable">\${file<span class="token operator">#</span>*<span class="token operator">/</span>}</span>    拿掉第一条 / 及其左边的字符串    dir1/dir2/dir3/my.file.txt
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file#*/}</span>
dir1/dir2/dir3/my.file.txt

<span class="token variable">\${file<span class="token operator">##</span>*<span class="token operator">/</span>}</span>    拿掉最后一条 / 及其左边的字符串    my.file.txt
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file##*/}</span>
my.file.txt

<span class="token variable">\${file<span class="token operator">#</span>*.}</span>    拿掉第一个 <span class="token builtin class-name">.</span> 及其左边的字符串    file.txt
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file#*.}</span>
file.txt

<span class="token variable">\${file<span class="token operator">##</span>*.}</span>    拿掉最后一个 <span class="token builtin class-name">.</span> 及其左边的字符串    txt
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file##*.}</span>
txt

<span class="token variable">\${file<span class="token operator">%</span><span class="token operator">/</span>*}</span>    拿掉最后一条 / 及其右边的字符串    /dir1/dir2/dir3
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file%/*}</span>
/dir1/dir2/dir3

<span class="token variable">\${file<span class="token operator">%%</span><span class="token operator">/</span>*}</span>    拿掉第一条 / 及其右边的字符串    <span class="token punctuation">(</span>空值<span class="token punctuation">)</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file%%/*}</span>
<span class="token punctuation">(</span>空值<span class="token punctuation">)</span>

<span class="token variable">\${file<span class="token operator">%</span>.*}</span>    拿掉最后一个 <span class="token builtin class-name">.</span> 及其右边的字符串    /dir1/dir2/dir3/my.file
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file%.*}</span>
/dir1/dir2/dir3/my.file

<span class="token variable">\${file<span class="token operator">%%</span>.*}</span>    拿掉第一个 <span class="token builtin class-name">.</span> 及其右边的字符串    /dir1/dir2/dir3/my￼
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># echo \${file%%.*}</span>
/dir1/dir2/dir3/my
记忆方法如下：

<span class="token comment"># 是去掉左边(在键盘上 # 在 $ 之左边)</span>
% 是去掉右边<span class="token punctuation">(</span>在键盘上 % 在 $ 之右边<span class="token punctuation">)</span>
单一符号是最小匹配<span class="token punctuation">;</span>两个符号是最大匹配
*是用来匹配不要的字符，也就是想要去掉的那部分
还有指定字符分隔号，与*配合，决定取哪部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="截取、替换-——-0-5、-、" tabindex="-1"><a class="header-anchor" href="#截取、替换-——-0-5、-、" aria-hidden="true">#</a> 截取、替换 —— <code>:0:5</code>、<code>//.../...</code>、<code>/.../...</code></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>命令                                    解释                           　　 结果
<span class="token variable">\${file<span class="token operator">:</span>0<span class="token operator">:</span>5}</span>            　　　提取最左边的 <span class="token number">5</span> 个字节    　　　　　　　　　　　　/dir1
<span class="token variable">\${file<span class="token operator">:</span>5<span class="token operator">:</span>5}</span>            　　　提取第 <span class="token number">5</span> 个字节右边的连续 <span class="token number">5</span> 个字节    　　　　　/dir2
<span class="token variable">\${file<span class="token operator">/</span>dir<span class="token operator">/</span>path}</span>            将第一个 <span class="token function">dir</span> 提换为 path    　　　　　　　　　 /path1/dir2/dir3/my.file.txt
<span class="token variable">\${file<span class="token operator">/</span><span class="token operator">/</span>dir<span class="token operator">/</span>path}</span>    　　　　将全部 <span class="token function">dir</span> 提换为 path    　　　　　　　　　　　/path1/path2/path3/my.file.txt
<span class="token variable">\${<span class="token operator">#</span>file}</span>    　　　　　　　　　 获取变量长度    　　　　　　　　　　　　　　　　　<span class="token number">27</span>         
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,29),g={href:"https://unix.stackexchange.com/questions/480846/removing-first-forward-slash-from-string",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token string">&#39;file:///path/to/file&#39;</span>

$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${var<span class="token operator">/</span>\\<span class="token operator">/</span><span class="token operator">/</span>}</span>&quot;</span>
file://path/to/file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="根据状态为变量赋值-、-、-、-、-、-、-、" tabindex="-1"><a class="header-anchor" href="#根据状态为变量赋值-、-、-、-、-、-、-、" aria-hidden="true">#</a> 根据状态为变量赋值 <code>-</code>、<code>:-</code>、<code>+</code>、<code>:+</code>、<code>=</code>、<code>:=</code>、<code>?</code>、<code>:?</code></h3><table><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">解释</th><th style="text-align:left;">备注</th></tr></thead><tbody><tr><td style="text-align:left;"><code>\${file-my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没设定,则使用 my.file.txt 作传回值</td><td style="text-align:left;">空值及非空值不作处理</td></tr><tr><td style="text-align:left;"><code>\${file:-my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没有设定或为空值,则使用 my.file.txt 作传回值</td><td style="text-align:left;">非空值时不作处理</td></tr><tr><td style="text-align:left;"><code>\${file+my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 设为空值或非空值,均使用my.file.txt作传回值</td><td style="text-align:left;">没设定时不作处理</td></tr><tr><td style="text-align:left;"><code>\${file:+my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 为非空值,则使用 my.file.txt 作传回值</td><td style="text-align:left;">没设定及空值不作处理</td></tr><tr><td style="text-align:left;"><code>\${file=txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没设定,则回传 txt ,并将 <code>$file</code> 赋值为 txt</td><td style="text-align:left;">空值及非空值不作处理</td></tr><tr><td style="text-align:left;"><code>\${file:=txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没设定或空值,则回传 txt ,将 <code>$file</code> 赋值为txt</td><td style="text-align:left;">非空值时不作处理</td></tr><tr><td style="text-align:left;"><code>\${file?my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没设定,则将 my.file.txt 输出至 STDERR</td><td style="text-align:left;">空值及非空值不作处理</td></tr><tr><td style="text-align:left;"><code>\${file:?my.file.txt}</code></td><td style="text-align:left;">若 <code>$file</code> 没设定或空值,则将 my.file.txt 输出至 STDERR</td><td style="text-align:left;">非空值时不作处理</td></tr></tbody></table><h3 id="扩展字符" tabindex="-1"><a class="header-anchor" href="#扩展字符" aria-hidden="true">#</a> 扩展字符</h3><ul><li><code>*</code> ── 0个以上任何字符</li><li><code>?</code> ── 任何一个字符</li><li><code>~</code> ── 当前用户家目录</li><li><code>~username</code> ── 指定用户家目录</li><li><code>~+</code> ── 当前工作目录</li><li><code>~-</code> ── 上个工作目录</li><li><code>[a-e]</code> —— a到e字符（最小匹配）<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 没有文件时，作为字符串</span>
$ <span class="token builtin class-name">echo</span> aa<span class="token punctuation">[</span><span class="token number">0</span>-33<span class="token punctuation">]</span>
aa<span class="token punctuation">[</span><span class="token number">0</span>-33<span class="token punctuation">]</span>
$ <span class="token function">ls</span> aa<span class="token punctuation">[</span><span class="token number">0</span>-33<span class="token punctuation">]</span>
ls: cannot access <span class="token string">&#39;aa[0-33]&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory

<span class="token comment"># 有文件时，会加工处理</span>
$ <span class="token function">touch</span> aa1 aa2 aa3
$ <span class="token function">ls</span> aa<span class="token punctuation">[</span><span class="token number">0</span>-33<span class="token punctuation">]</span>
aa1  aa2  aa3
$ <span class="token builtin class-name">echo</span> aa<span class="token punctuation">[</span><span class="token number">0</span>-33<span class="token punctuation">]</span>
aa1 aa2 aa3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><code>{a..e}</code> —— a到e字符（固定匹配）<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 没文件时，依然会加工处理</span>
$ <span class="token builtin class-name">echo</span> aa<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span>
aa0 aa1 aa2 aa3
<span class="token punctuation">[</span>kiosk@foundation0 test<span class="token punctuation">]</span>$ <span class="token function">ls</span> aa<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span>
ls: cannot access <span class="token string">&#39;aa0&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
ls: cannot access <span class="token string">&#39;aa1&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
ls: cannot access <span class="token string">&#39;aa2&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
ls: cannot access <span class="token string">&#39;aa3&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory

<span class="token comment"># 有文件时，依然会加工处理</span>
<span class="token punctuation">[</span>kiosk@foundation0 test<span class="token punctuation">]</span>$ <span class="token function">touch</span> aa1 aa2
<span class="token punctuation">[</span>kiosk@foundation0 test<span class="token punctuation">]</span>$ <span class="token builtin class-name">echo</span> aa<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span>
aa0 aa1 aa2 aa3
<span class="token punctuation">[</span>kiosk@foundation0 test<span class="token punctuation">]</span>$ <span class="token function">ls</span> aa<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span>
ls: cannot access <span class="token string">&#39;aa0&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
ls: cannot access <span class="token string">&#39;aa3&#39;</span><span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directory
aa1  aa2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><code>[abc...]</code> ── 包含括号中的任意一个字符</li><li><code>[!abc...]</code> ── 不包含括号中任何一个字符</li><li><code>[~abc...]</code> ── 同<code>[!abc...]</code></li><li><code>[[:alpha:]]</code> ── 任何字母字符 [posix]</li><li><code>[[:lower:]]</code> ── 任何小写字符 [posix]</li><li><code>[[:upper:]]</code> ── 任何大写字符 [posix]</li><li><code>[[:alnum:]]</code> ── 任何字母字符或数字 [posix]</li><li><code>[[:punct:]]</code> ── 除空格和字母数字以外的任何可打印字符 [posix]</li><li><code>[[digit]]</code> ── 任何数字 0~9 [posix]</li><li><code>[[:space:]]</code> ── 空白字符、制表符、换行、回车、换页 [posix]</li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>预设的 [POSIX] 字符串，针对当前区域而调整</p><p>e.g. 可以在命令行中通过<code>tab</code>匹配文件名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">touch</span> aabb
$ <span class="token function">ls</span> aa* <span class="token comment">#tab补全</span>
$ <span class="token function">ls</span> aabb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><h4 id="获取路径的文件夹、文件名" tabindex="-1"><a class="header-anchor" href="#获取路径的文件夹、文件名" aria-hidden="true">#</a> 获取路径的文件夹、文件名</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">a</span><span class="token operator">=</span>/volume1/docker/file1.tar.gz
$ <span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
/volume1/docker/file1.tar.gz
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${a<span class="token operator">%</span><span class="token operator">/</span>*}</span>
/volume1/docker
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${a<span class="token operator">##</span>*<span class="token operator">/</span>}</span>
file1.tar.gz
$ <span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token variable">\${a<span class="token operator">##</span>*<span class="token operator">/</span>}</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">\${b<span class="token operator">%%</span>.*}</span>
file1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串-扩展" tabindex="-1"><a class="header-anchor" href="#字符串-扩展" aria-hidden="true">#</a> 字符串（扩展）</h2><h3 id="打印" tabindex="-1"><a class="header-anchor" href="#打印" aria-hidden="true">#</a> 打印</h3><h4 id="echo" tabindex="-1"><a class="header-anchor" href="#echo" aria-hidden="true">#</a> echo</h4><p><code>set -H</code> 可以打印 <code>!</code></p><p><code>echo -e</code> 转义字符</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>echo 有一个技巧，可能经常被用到，就是将多行输出为当行</p><p>e.g.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token string">&quot;a
&gt; b
&gt; c&quot;</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span>&quot;</span>
a
b
c
$ <span class="token builtin class-name">echo</span> <span class="token variable">$a</span> <span class="token comment"># 当没有&quot;&quot;（双引号）时，以单行输出</span>
a b c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h4 id="printf" tabindex="-1"><a class="header-anchor" href="#printf" aria-hidden="true">#</a> printf</h4><p>格式替代符（format substitution character）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">&quot;%-5s %-10s %-4s<span class="token entity" title="\\n">\\n</span>&quot;</span> No Name Mark
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-5s %-10s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token number">1</span> Sarath <span class="token number">80.2455</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-5s %-10s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token number">1</span> James <span class="token number">12.321312</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;%-5s %-10s %-4.2f<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token number">1</span> Jeff <span class="token number">44.12313</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="颜色-color" tabindex="-1"><a class="header-anchor" href="#颜色-color" aria-hidden="true">#</a> 颜色（color）</h3>`,19),x={href:"https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux",target:"_blank",rel:"noopener noreferrer"},q=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Black        <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">30</span>     Dark Gray     <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">30</span>
Red          <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">31</span>     Light Red     <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">31</span>
Green        <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">32</span>     Light Green   <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">32</span>
Brown/Orange <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">33</span>     Yellow        <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">33</span>
Blue         <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">34</span>     Light Blue    <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">34</span>
Purple       <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">35</span>     Light Purple  <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">35</span>
Cyan         <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">36</span>     Light Cyan    <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">36</span>
Light Gray   <span class="token number">0</span><span class="token punctuation">;</span><span class="token number">37</span>     White         <span class="token number">1</span><span class="token punctuation">;</span><span class="token number">37</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#    .---------- constant part!</span>
<span class="token comment">#    vvvv vvvv-- the code from above</span>
<span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;31m&#39;</span>
<span class="token assign-left variable">NC</span><span class="token operator">=</span><span class="token string">&#39;\\033[0m&#39;</span> <span class="token comment"># No Color</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;I <span class="token variable">\${RED}</span>love<span class="token variable">\${NC}</span> Stack Overflow<span class="token entity" title="\\n">\\n</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\e">\\e</span>[1;42m Green Background <span class="token entity" title="\\e">\\e</span>[0m&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="列提取" tabindex="-1"><a class="header-anchor" href="#列提取" aria-hidden="true">#</a> 列提取</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">lines</span><span class="token operator">=</span><span class="token string">&quot;

a   b  c
1 2 3

&quot;</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$lines</span>&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-v</span> <span class="token string">&#39;^( )*$&#39;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span>
b
<span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符映射" tabindex="-1"><a class="header-anchor" href="#字符映射" aria-hidden="true">#</a> 字符映射</h3><h4 id="tr" tabindex="-1"><a class="header-anchor" href="#tr" aria-hidden="true">#</a> tr</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># tr [OPTION]... SET1 [SET2]</span>
<span class="token comment"># -d set 删除</span>
<span class="token comment"># -s set 压缩多个连续的相同字符为一个字符 e.g. 111 -&gt; 1</span>
<span class="token comment"># -c set 补集 e.g. -c [0-9] 意思为 “指定 0~9 意外的全部字符”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子： 大写转成小写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;HELLO WORLD!&quot;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">&#39;A-Z&#39;</span> <span class="token string">&#39;a-z&#39;</span> <span class="token comment"># hello world!</span>
<span class="token comment"># 💡 可以使用下面的 “字符类” 实现</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例子： todo ROT13加密</p><p>例子： 删除字符</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;hello world 2024!&quot;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;0-9 &#39;</span> <span class="token comment"># helloworld!</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello world 2024!&quot;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;0-9&#39;</span> <span class="token comment"># 2024</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例子： 压缩字符</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;1           2&quot;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-s</span> <span class="token string">&#39; &#39;</span> <span class="token comment"># 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例子： 相加 （没用的技巧）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;
1
2
3
4&quot;</span> <span class="token operator">|</span> <span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token variable"><span class="token variable">$(</span><span class="token function">tr</span> <span class="token string">&#39;\\n&#39;</span> <span class="token string">&#39;+&#39;</span><span class="token variable">)</span></span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment"># 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，tr 可以指定预定的 “字符类”</p><table><thead><tr><th>字符类</th><th>说明</th></tr></thead><tbody><tr><td>alnum</td><td>字母、数字</td></tr><tr><td>alpha</td><td>字母</td></tr><tr><td>digit</td><td>数字</td></tr><tr><td>graph</td><td>图像字符</td></tr><tr><td>lower</td><td>小写字母</td></tr><tr><td>upper</td><td>大写字母</td></tr><tr><td>cntrl</td><td>控制（非打印）字符</td></tr><tr><td>print</td><td>可打印字符</td></tr><tr><td>punct</td><td>标点符号</td></tr><tr><td>space</td><td>空白字符</td></tr><tr><td>xdigit</td><td>十六进制字符</td></tr></tbody></table><p>例子： 大小写转换</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;hello world!&#39;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">&#39;[:lower:]&#39;</span> <span class="token string">&#39;[:upper:]&#39;</span> <span class="token comment"># HELLO WORLD!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="分割-合并" tabindex="-1"><a class="header-anchor" href="#分割-合并" aria-hidden="true">#</a> 分割/合并</h3><h4 id="xargs" tabindex="-1"><a class="header-anchor" href="#xargs" aria-hidden="true">#</a> xargs</h4><p>将多行输入变成 “空格隔开的单行输入”，或者单行变多行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token string">&quot;1 2 3
&gt; 3 4 5 6&quot;</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span>&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span>
<span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$a</span>&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-n</span> <span class="token number">2</span>
<span class="token number">1</span> <span class="token number">2</span>
<span class="token number">3</span> <span class="token number">3</span>
<span class="token number">4</span> <span class="token number">5</span>
<span class="token number">6</span>

<span class="token comment"># -d delim 指定定界符</span>

<span class="token comment"># -I {} 替换字符</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;1 2 3 4&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-I</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- {} ---&quot;</span>
--- <span class="token number">1</span> ---
--- <span class="token number">2</span> ---
--- <span class="token number">3</span> ---
--- <span class="token number">4</span> ---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>xargs 与 find 的结合： 因为 find 的结果中可能有空格，而 xargs 后的命令可能用空格做参数分割，或者用空格加回车做参数分割，如 rm 者可能造成错误。特别当 find 与 xargs 一起使用时，需要加上下面参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token parameter variable">-print0</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-0</span> <span class="token function">rm</span> <span class="token parameter variable">-fv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="拼接-todo" tabindex="-1"><a class="header-anchor" href="#拼接-todo" aria-hidden="true">#</a> 拼接 todo</h3><p>参考：</p>`,29),$={href:"https://www.baeldung.com/linux/join-multiple-lines",target:"_blank",rel:"noopener noreferrer"},w=t(`<h4 id="pure-bash" tabindex="-1"><a class="header-anchor" href="#pure-bash" aria-hidden="true">#</a> Pure Bash</h4><p>todo</p><h4 id="paste" tabindex="-1"><a class="header-anchor" href="#paste" aria-hidden="true">#</a> paste</h4><p>todo</p><h4 id="sed" tabindex="-1"><a class="header-anchor" href="#sed" aria-hidden="true">#</a> sed</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sed</span> <span class="token string">&#39;:a; N; $!ba; s/\\n//g&#39;</span> input.txt 
I cameI sawI conquered<span class="token operator">!</span>

$ <span class="token function">sed</span> <span class="token string">&#39;:a; N; $!ba; s/\\n/,/g&#39;</span> input.txt 
I came,I saw,I conquered<span class="token operator">!</span>

$ <span class="token function">sed</span> <span class="token string">&#39;:a; N; $!ba; s/\\n/; /g&#39;</span> input.txt 
I came<span class="token punctuation">;</span> I saw<span class="token punctuation">;</span> I conquered<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>:a;</code> – we define a <code>label</code> called a</li><li><code>N;</code> – append next line into sed‘s pattern space</li><li><code>$!ba;</code> – if the current line is the last line (<code>$</code>), do not (<code>!</code>) jump to the label <code>:a</code> (a)</li><li><code>s/\\n/REPLACEMENT/g</code> – replace all line breaks with the given <code>REPLACEMENT</code></li></ul><h4 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> awk</h4><p>todo</p><h3 id="去重" tabindex="-1"><a class="header-anchor" href="#去重" aria-hidden="true">#</a> 去重</h3><p>参考</p>`,11),y={href:"https://blog.csdn.net/shenyuye/article/details/107725445",target:"_blank",rel:"noopener noreferrer"},_={href:"https://blog.csdn.net/weixin_42348880/article/details/117278175",target:"_blank",rel:"noopener noreferrer"},E=t(`<h4 id="sort-uniq" tabindex="-1"><a class="header-anchor" href="#sort-uniq" aria-hidden="true">#</a> sort+uniq</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sort</span> <span class="token function">file</span> <span class="token operator">|</span> <span class="token function">uniq</span>
<span class="token comment"># -b 忽略签到空格字符</span>
<span class="token comment"># -r 逆序</span>
<span class="token comment"># -d 按字典顺序（默认）</span>
<span class="token comment"># -n 按数字排序</span>
<span class="token comment"># -M 按月份排序</span>
<span class="token comment"># -k num 按哪一列排序</span>

<span class="token comment"># -z 以 \\0 分割结果，而不是默认的分割方式 \\n </span>

<span class="token comment"># -m file1 file2 合并两个文件，但不对两个合并后的结果排序</span>

<span class="token comment"># -C 检查是否排序，exit 0=有序，1=无序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>uniq将服务删除所有的重复行。经过排序后，所有相同的行都在相邻，因此unqi可以正常删除重复行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> xx
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token number">2</span>
<span class="token number">1</span>
<span class="token number">0</span>
$ <span class="token function">cat</span> xx <span class="token operator">|</span> <span class="token function">sort</span>
<span class="token number">0</span>
<span class="token number">1</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">2</span>
<span class="token number">3</span>
$ <span class="token function">cat</span> xx <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token comment"># 或者 sort -u</span>
<span class="token number">0</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> qq
<span class="token number">1</span> <span class="token number">3</span> <span class="token number">1</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">2</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">1</span>
<span class="token number">3</span> <span class="token number">1</span> <span class="token number">1</span>
$ <span class="token function">cat</span> qq <span class="token operator">|</span> <span class="token function">sort</span>
<span class="token number">1</span> <span class="token number">3</span> <span class="token number">1</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">1</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">2</span>
<span class="token number">3</span> <span class="token number">1</span> <span class="token number">1</span>
$ <span class="token function">cat</span> qq <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k</span> <span class="token number">2,2</span>
<span class="token number">3</span> <span class="token number">1</span> <span class="token number">1</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">1</span>
<span class="token number">2</span> <span class="token number">2</span> <span class="token number">2</span>
<span class="token number">1</span> <span class="token number">3</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">uniq</span> —— 只能去重排序过的行
<span class="token comment"># -u 只显示唯一的行</span>
<span class="token comment"># -d 只显示重复的行</span>

<span class="token comment"># -c 显示行出现次数</span>

<span class="token comment"># -s 指定跳过N个字符</span>
<span class="token comment"># -w 指定用于比较的最大字符数</span>
<span class="token comment"># -s 2 -w 2 从第二个字符后开始，对比两个字符</span>

<span class="token comment"># -z 以 \\0 分割匹配行，与 xargs -0 配合使用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>统计字符出现次数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">INPUT</span><span class="token operator">=</span><span class="token string">&quot;ahebhaaa&quot;</span>
<span class="token assign-left variable">OUTPUT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $INPUT <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/[^\\n]/&amp;\\n/g&#39;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;/^$/d&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;\\n&#39;</span><span class="token variable">\`</span></span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token variable">$OUTPUT</span> <span class="token comment"># 4 a 1 b 1 e 2 h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="awk-1" tabindex="-1"><a class="header-anchor" href="#awk-1" aria-hidden="true">#</a> awk</h4><p class="callout info"> 效率应该比<code>sort</code>后<code>uniq</code>高。（应该！因为未验证！todo） </p><h4 id="sort-awk" tabindex="-1"><a class="header-anchor" href="#sort-awk" aria-hidden="true">#</a> <s>sort+awk</s></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sort</span> <span class="token function">file</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if ($0!=line) print;line=$0}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="sort-sed" tabindex="-1"><a class="header-anchor" href="#sort-sed" aria-hidden="true">#</a> <s>sort+sed</s></h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sort</span> <span class="token function">file</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;$!N; /^.∗\\n\\1$/!P; D&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="拼写检查" tabindex="-1"><a class="header-anchor" href="#拼写检查" aria-hidden="true">#</a> 拼写检查</h3><p>Linux 大多数的发行版都含有一份字典文件。目录 <code>/usr/share/dict/</code> 包含了一些词典文件。“词典文件” 包含了一些词典单词列表的文本文件。我们可以利用这个列表来检查某个单词是否为词典中的单词。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># checkword.sh</span>
<span class="token assign-left variable">word</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function">grep</span> <span class="token string">&quot;^<span class="token variable">$word</span>$&quot;</span> /usr/share/dict/british-english <span class="token parameter variable">-q</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$word</span> is a dictionary word<span class="token punctuation">;</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$word</span> is not a dictionary word<span class="token punctuation">;</span>
<span class="token keyword">fi</span>

$ ./checkword.sh ful
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="look" tabindex="-1"><a class="header-anchor" href="#look" aria-hidden="true">#</a> look</h4><p>查找以字典开头的内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">look</span> <span class="token punctuation">[</span>words<span class="token punctuation">]</span> <span class="token function">file</span> <span class="token comment"># 默认看 /usr/share/dict/words 中的内容</span>

<span class="token comment"># 相当于</span>
<span class="token function">grep</span> <span class="token string">&quot;^word&quot;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> test.fs
android
android<span class="token string">&#39;s
ss
androids
xxxandroid
$ look android test.fs
android
android&#39;</span>s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="aspell" tabindex="-1"><a class="header-anchor" href="#aspell" aria-hidden="true">#</a> aspell</h4><p>检查单词拼写</p><p>用法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">aspell</span> <span class="token parameter variable">-a</span> <span class="token comment"># 交互模式，检查输入，返回推荐拼写 Ctrl+D 退出</span>
<span class="token function">aspell</span> list <span class="token comment"># 交互模式，检查输入，返回拼写错误输入 Ctrl+D 退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">word</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token assign-left variable">output</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>&quot;$word<span class="token punctuation">\\</span>&quot; <span class="token operator">|</span> <span class="token function">aspell</span> list<span class="token variable">\`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token variable">$output</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token comment"># -z 判断是否为空</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$word</span> is a dictionary word<span class="token punctuation">;</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$word</span> is not a dictionary word<span class="token punctuation">;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="json解析-jq" tabindex="-1"><a class="header-anchor" href="#json解析-jq" aria-hidden="true">#</a> json解析 - jq</h3><p>参考</p>`,28),T={href:"https://spin.atomicobject.com/2021/06/08/jq-creating-updating-json/",target:"_blank",rel:"noopener noreferrer"},A=t(`<p>构建</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">AUTH_BODY</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>jq --null-input <span class="token punctuation">\\</span>
  <span class="token parameter variable">--arg</span> user <span class="token string">&quot;<span class="token variable">$USERNAME</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--arg</span> password <span class="token string">&quot;<span class="token variable">$PASSWORD</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token string">&#39;{&quot;user&quot;: $user, &quot;password&quot;: $password}&#39;</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">AUTH_TOKEN_RESPONSE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&#39;Accept: application/json&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&quot;<span class="token variable">\${AUTH_BODY}</span>&quot;</span> <span class="token punctuation">\\</span>
  https://api.example.com/auth/token<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">AUTH_TOKEN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$AUTH_TOKEN_RESPONSE</span>&quot;</span> <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> .data.token<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>-r</code>,<code>--raw-input</code> 将值提取出来（去除双引号<code>&quot;...&quot;</code>），并解析（如：“<code>\\n</code>”）</li></ul><p>搜索</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token builtin class-name">echo</span> <span class="token string">&#39;{ &quot;foo&quot;: &quot;bar&quot; }&#39;</span> <span class="token operator">|</span> jq <span class="token string">&#39;.foo |= &quot;baz&quot;&#39;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;foo&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;baz&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># These would likely be command-line arguments in a real script</span>
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token number">2.3</span>.2
<span class="token assign-left variable">COMMAND_PATH</span><span class="token operator">=</span><span class="token string">&quot;/releases/33/run.sh&quot;</span>

<span class="token function">cat</span> current.json <span class="token operator">|</span> jq <span class="token punctuation">\\</span>
  <span class="token parameter variable">--arg</span> version <span class="token string">&quot;<span class="token variable">$VERSION</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--arg</span> command_path <span class="token string">&quot;<span class="token variable">$COMMAND_PATH</span>&quot;</span> <span class="token punctuation">\\</span>
 <span class="token string">&#39;(.definition.environment[] | select(.name == &quot;VERSION&quot;) | .value) |= $version
  | .definition.command |= $command_path&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="正则表达" tabindex="-1"><a class="header-anchor" href="#正则表达" aria-hidden="true">#</a> 正则表达</h3><h4 id="grep" tabindex="-1"><a class="header-anchor" href="#grep" aria-hidden="true">#</a> grep</h4><p><code>egrep</code> 、 <code>grep -E</code> 扩展正则表达式</p><ul><li><code>.</code> <code>.{n,m}</code></li><li><code>?</code></li><li><code>*</code> 零次或多次</li><li><code>+</code></li><li><code>[:alnum:]</code> <code>[0-9A-Za-z]</code></li><li><code>[:alpha:]</code> <code>[A-Za-z]</code></li><li><code>[:blank:]</code> 空格/制表符</li><li>...</li><li><code>\\b</code></li><li><code>\\B</code></li><li><code>\\&lt;</code> 左侧有空格的字符或左边没字符</li><li><code>\\&gt;</code></li><li><code>\\w</code> 词语组分 <code>[_[:alnum:]]</code></li><li><code>\\W</code> 非词语组分 <code>[^_[:alnum:]]</code></li><li>...</li></ul><p>选项</p><ul><li><p><code>-e PATTERN</code> 或</p></li><li><p><code>-f FILE</code> 从文件读取PATTERN</p></li><li><p><code>-i</code> 忽略大小写</p></li><li><p><code>-v</code> 反向选择</p></li><li><p><code>-w</code> 匹配单词（左右有空格分开，或者开头、结尾）</p></li><li><p><code>-x</code> 全匹配</p></li><li><p><code>-n</code> 显示行数</p></li><li><p><code>-c</code> 匹配数量</p></li><li><p><code>-L</code> <code>--files-without-match</code> 列出内容非匹配的文件名 <code>grep -L workstation /etc/host*</code></p></li><li><p><code>-l</code> <code>--files-with-matches</code> 列出内容匹配的文件名</p></li><li><p><code>-o</code> 只显示匹配的内容</p></li><li><p><code>-q</code> 不显示输出，通过<code>$?</code>判断结果，0匹配到了，非0表示没有匹配到</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@servera ~<span class="token punctuation">]</span><span class="token comment"># grep -e qmgr -e pickup -e cleanup /etc/postfix/master.cf</span>
pickup    unix  n       -       n       <span class="token number">60</span>      <span class="token number">1</span>       pickup
cleanup   unix  n       -       n       -       <span class="token number">0</span>       cleanup
qmgr      unix  n       -       n       <span class="token number">300</span>     <span class="token number">1</span>       qmgr
<span class="token comment">#qmgr     unix  n       -       n       300     1       oqmgr</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p class="callout info"> 用来查文件内容有奇效 <br> 查：哪个文件中有devices字段 <br><code>grep devices */tuned.conf</code></p><h5 id="问题-内容为空时-返回-1" tabindex="-1"><a class="header-anchor" href="#问题-内容为空时-返回-1" aria-hidden="true">#</a> 问题：内容为空时，返回 1</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;!a[$0]++{print}&#39;</span> <span class="token operator">|</span> <span class="token function">grep</span>  <span class="token parameter variable">-v</span> <span class="token string">&quot;^$&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> ok
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span>  <span class="token parameter variable">-v</span> <span class="token string">&quot;^$&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> ok
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组-array" tabindex="-1"><a class="header-anchor" href="#数组-array" aria-hidden="true">#</a> 数组（array）</h2><p>定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">111</span> <span class="token number">222</span> <span class="token number">333</span><span class="token punctuation">)</span>
<span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token punctuation">(</span>
<span class="token number">111</span>
<span class="token number">222</span>
<span class="token number">333</span>
<span class="token string">&quot;ssss&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加 append</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">+=</span><span class="token punctuation">(</span><span class="token string">&quot;bbb&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>长度</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">\${<span class="token operator">#</span>a<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="条件判断" tabindex="-1"><a class="header-anchor" href="#条件判断" aria-hidden="true">#</a> 条件判断</h2><h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h3><p><code>if/then</code> <br><code>if/then/else</code> <br><code>if/then/elif/then/else</code></p><ul><li><code>[]</code> 符合 <code>POSIX</code> 标准，兼容性更强 <ul><li><code>-eq</code>、<code>-ne</code></li><li><code>-gt</code>、<code>-ge</code>、<code>-lt</code>、<code>-le</code></li><li><code>=</code>、<code>==</code>、<code>!=</code></li><li><code>-z</code> 空</li><li><code>-n</code> 非空</li></ul></li><li><code>[[]]</code> 中能用 <code>&lt; &gt;</code> 表示 大于、小于</li><li><code>[[]]</code> 中能用 <code>&amp;&amp;</code> <code>||</code> 表示 与、或</li><li><code>[[]]</code> 中能用 <code>==</code> 进行模式匹配</li><li><code>=~</code> 正则 <code>[[ &quot;expression&quot; =~ &quot;string&quot; ]]</code></li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p><code>[]</code> 和 <code>[[]]</code> 的区别： 前者更早出现，后者更晚出现。后者是前者的功能增强版，语法更兼容，但可能不是全部系统都能用。（实际上现在都2024年了，全部系统都能用了！）</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl is-active mariadb <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
<span class="token assign-left variable">MARIADB_ACTIVE</span><span class="token operator">=</span><span class="token variable">$?</span>

<span class="token function">sudo</span> systemctl is-active postgresql <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
<span class="token assign-left variable">POSTGRESQL_ACTIVE</span><span class="token operator">=</span><span class="token variable">$?</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$MARIADB_ACTIVE</span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  mysql
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$POSTGRESQL_ACTIVE</span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  psql
<span class="token keyword">else</span>
  sqlite3
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h3><p><code>man test</code></p><h4 id="数值比较" tabindex="-1"><a class="header-anchor" href="#数值比较" aria-hidden="true">#</a> 数值比较</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>num1 -eq num2</td><td>判断 num1 是否和 num2 相等</td></tr><tr><td>num1 -ne num2</td><td>判断 num1 是否和 num2 不相等</td></tr><tr><td>num1 -gt num2</td><td>判断 num1 是否大于 num2</td></tr><tr><td>num1 -lt num2</td><td>判断 num1 是否小于 num2</td></tr><tr><td>num1 -ge num2</td><td>判断 num1 是否大于等于 num2</td></tr><tr><td>num1 -le num2</td><td>判断 num1 是否小于等于 num2</td></tr></tbody></table><h4 id="字符串判断" tabindex="-1"><a class="header-anchor" href="#字符串判断" aria-hidden="true">#</a> 字符串判断</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>z str</td><td>判断字符串 str 是否为空</td></tr><tr><td>-n str</td><td>判断宇符串 str 是否为非空</td></tr><tr><td>str1 = str2 与 str1 == str2</td><td>=和==是等价的，都用来判断 str1 是否和 str2 相等。</td></tr><tr><td>str1 != str2</td><td>判断 str1 是否和 str2 不相等。</td></tr><tr><td>str1 \\&gt; str2 判断 str1 是否大于 str2。\\&gt;是&gt;的转义字符，这样写是为了防止&gt;被误认为成重定向运算符。</td><td></td></tr><tr><td>str1 \\&lt; str2</td><td>判断 str1 是否小于 str2。同样，\\&lt;也是转义字符</td></tr></tbody></table><h4 id="文件类型判断" tabindex="-1"><a class="header-anchor" href="#文件类型判断" aria-hidden="true">#</a> 文件类型判断</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>-b filename</td><td>判断文件是否存在，并且是否为块设备文件</td></tr><tr><td>-c filename</td><td>判断文件是否存在，并且是否为字符设备文件</td></tr><tr><td>-d filename</td><td>判断文件是否存在，并且是否为目录文件</td></tr><tr><td>-e filename</td><td>判断文件是否存在</td></tr><tr><td>-f filename</td><td>判断文件是否存在，井且是否为普通文件</td></tr><tr><td>-L filename</td><td>判断文件是否存在，并且是否为符号链接文件</td></tr><tr><td>-p filename</td><td>判断文件是否存在，并且是否为管道文件</td></tr><tr><td>-s filename</td><td>判断文件是否存在，并且是否为非空</td></tr><tr><td>-S filename</td><td>判断该文件是否存在，并且是否为套接字文件</td></tr></tbody></table><h4 id="文件权限判断" tabindex="-1"><a class="header-anchor" href="#文件权限判断" aria-hidden="true">#</a> 文件权限判断</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>-r filename</td><td>判断文件是否存在，并且是否拥有读权限</td></tr><tr><td>-w filename</td><td>判断文件是否存在，并且是否拥有写权限。</td></tr><tr><td>-x filename</td><td>判断文件是否存在，并且是否拥有执行权限</td></tr><tr><td>-u filename</td><td>判断文件是否存在，并且是否拥有 SUID 权限。</td></tr><tr><td>-g filename</td><td>判断文件是否存在，并且是否拥有 SGID 权限。</td></tr><tr><td>-k filename</td><td>判断该文件是否存在，并且是否拥有 SBIT 权限</td></tr></tbody></table><h4 id="文件比较" tabindex="-1"><a class="header-anchor" href="#文件比较" aria-hidden="true">#</a> 文件比较</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>filename1 -nt filename2</td><td>判断 filename1 的修改时间是否比 filename2 的新</td></tr><tr><td>filename -ot filename2</td><td>判断 filename1 的修改时间是否比 filename2 的旧</td></tr><tr><td>filename1 -ef filename2</td><td>判断 filename1 是否和 filename2 的 inode 号一致，可以理解为两个文件是否为同一个文件。这个判断用于判断硬链接是很好的方法</td></tr></tbody></table><h4 id="逻辑运算" tabindex="-1"><a class="header-anchor" href="#逻辑运算" aria-hidden="true">#</a> 逻辑运算</h4><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>expression1 -a expression</td><td>逻辑与</td></tr><tr><td>expression1 -o expression2</td><td>逻辑或</td></tr><tr><td>!expression</td><td>逻辑非</td></tr></tbody></table><h3 id="case" tabindex="-1"><a class="header-anchor" href="#case" aria-hidden="true">#</a> case</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> <span class="token operator">&lt;</span>VALUE<span class="token operator">&gt;</span> <span class="token keyword">in</span>
  <span class="token operator">&lt;</span>PATTERN<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span><span class="token punctuation">)</span>
    COMMAND1
    <span class="token punctuation">..</span><span class="token punctuation">..</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token operator">&lt;</span>PATTERN<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token punctuation">)</span>
    COMMAND2
    <span class="token punctuation">..</span>.
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token operator">&lt;</span>*<span class="token operator">&gt;</span><span class="token punctuation">)</span>
    COMMAND3
    <span class="token punctuation">..</span>.
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="逻辑或" tabindex="-1"><a class="header-anchor" href="#逻辑或" aria-hidden="true">#</a> 逻辑或</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token assign-left variable">emsg</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>./test_error.sh<span class="token variable">)</span></span>&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;other 1&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;emsg: <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">$emsg</span><span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>

<span class="token comment"># error!        &lt;== &amp;2 in &quot;test_error.sh&quot;</span>
<span class="token comment"># other 1       &lt;== &amp;1 in &quot;here&quot;</span>
<span class="token comment"># emsg: &quot;ok!&quot;   &lt;== &amp;1 in &quot;here&quot; from &amp;1 in &quot;test_error.sh&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;===================&quot;</span>

<span class="token assign-left variable">emsg</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>./test_error.sh <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;other 2&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;emsg: <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">$emsg</span><span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>

<span class="token comment"># other 2              &lt;== &amp;1 in &quot;here&quot;</span>
<span class="token comment"># emsg: &quot;ok!\\nerror!&quot;  &lt;== &amp;1 in &quot;here&quot; from &amp;1+&amp;2 in &quot;test_error.sh&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;===================&quot;</span>

<span class="token assign-left variable">emsg</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>./test_error.sh <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token variable">)</span></span>&quot;</span> <span class="token comment"># no catch, throw here.</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;emsg: <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token variable">$emsg</span><span class="token entity" title="\\&quot;">\\&quot;</span>&quot;</span>

<span class="token comment"># nothing to print, case of &quot;set -e&quot; (throw when exception and no catch)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循环" tabindex="-1"><a class="header-anchor" href="#循环" aria-hidden="true">#</a> 循环</h2><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> for</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> 变量名 <span class="token keyword">in</span> 取值列表        
<span class="token keyword">do</span> 
   命令序列（命令行）
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">PACKAGE</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token punctuation">\\</span>
<span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;SPACKAGE was installed on \\
<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> @<span class="token punctuation">$(</span>rpm <span class="token parameter variable">-q</span> <span class="token parameter variable">--qf</span> <span class="token string">&quot;%{INSTALLTIME}<span class="token entity" title="\\n">\\n</span>&quot;</span> SPACKAGE<span class="token punctuation">)</span><span class="token variable">)</span></span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">EVEN</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">seq</span> <span class="token number">2</span> <span class="token number">2</span> <span class="token number">10</span><span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$EVEN</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>$*</code> <code>$@</code> 的区别</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ ./a.sh <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> 
<span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token number">1</span>
<span class="token number">2</span>
<span class="token number">3</span>
<span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> ./a.sh 
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">args</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$*</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$args</span>
<span class="token keyword">done</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">args</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$args</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="固定数量" tabindex="-1"><a class="header-anchor" href="#固定数量" aria-hidden="true">#</a> 固定数量</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">10</span><span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p class="callout warning"> 这里不能 <code>{1..$a}</code></p><h4 id="变量-1" tabindex="-1"><a class="header-anchor" href="#变量-1" aria-hidden="true">#</a> 变量</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span>$a<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="普通数组-array" tabindex="-1"><a class="header-anchor" href="#普通数组-array" aria-hidden="true">#</a> 普通数组（array）</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式1</span>
<span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;1 222&quot;</span> <span class="token number">2</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token variable">\${a<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token punctuation">;</span> <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${a<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span> <span class="token punctuation">;</span> <span class="token keyword">do</span>  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span> <span class="token punctuation">;</span> <span class="token keyword">done</span> 

<span class="token comment"># 方式2</span>
array_var<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;test0&quot;</span>
array_var<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;test1&quot;</span>
array_var<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;test2&quot;</span>
array_var<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;test3&quot;</span>
<span class="token comment"># 打印所有值</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array_var<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token comment"># test0 test1 test2 test3</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array_var<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span> <span class="token comment"># test0 test1 test2 test3</span>
<span class="token comment"># 长度</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>array_var<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token comment"># 4</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>array_var<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span> <span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64),N={href:"https://blog.csdn.net/weixin_44324367/article/details/111312156",target:"_blank",rel:"noopener noreferrer"},I=t(`<h4 id="关联数组-map" tabindex="-1"><a class="header-anchor" href="#关联数组-map" aria-hidden="true">#</a> 关联数组（map）</h4><p>在普通数组中只能使用整数作为数组索引；在关联数组中可以使用任意文本作为数组索引。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 声明关联数组</span>
$ <span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> ass_array
<span class="token comment"># 定义</span>
$ <span class="token assign-left variable">ass_array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">[</span>index1<span class="token punctuation">]</span><span class="token operator">=</span>val1 <span class="token punctuation">[</span>index2<span class="token punctuation">]</span><span class="token operator">=</span>val2<span class="token punctuation">)</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${ass_array<span class="token punctuation">[</span>index1<span class="token punctuation">]</span>}</span> <span class="token comment"># val1</span>
<span class="token comment"># 独立赋值</span>
$ ass_array<span class="token punctuation">[</span>index1<span class="token punctuation">]</span><span class="token operator">=</span>xxxxx
<span class="token comment"># 列出所有键、值</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>ass_array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token comment"># index1 index2</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${ass_array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> <span class="token comment"># xxxxx val2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while" tabindex="-1"><a class="header-anchor" href="#while" aria-hidden="true">#</a> while</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token operator">&lt;</span>CONDITION<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  COMMAND1<span class="token punctuation">;</span>
  <span class="token punctuation">..</span>.
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token keyword">while</span> <span class="token builtin class-name">:</span>
<span class="token keyword">do</span>
  systemctl is-active httpd.service <span class="token operator">&amp;&gt;</span>/dev/null
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    system restart httpd.service <span class="token operator">&amp;&gt;</span>/dev/null
  <span class="token keyword">fi</span>
  <span class="token function">sleep</span> <span class="token number">5</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了避免for的空格换行，可以使用<code>read</code>读</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> dd.sh 
<span class="token comment">#!/bin/bash</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;111 222 333
444 555 66 
7

112312&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> line<span class="token punctuation">;</span> <span class="token keyword">do</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;-- <span class="token variable">$line</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ ./dd.sh 
-- <span class="token number">111</span> <span class="token number">222</span> <span class="token number">333</span>
-- <span class="token number">444</span> <span class="token number">555</span> <span class="token number">66</span>
-- <span class="token number">7</span>
-- 
-- <span class="token number">112312</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是通过管道符<code>|</code>后，<code>while</code>中的变量改变无法传到外面。</p><p>可以用下面这种写法，就能传递变量了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> line
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$line</span>&quot;</span>
<span class="token keyword">done</span> <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;<span class="token variable">$the_list</span>&quot;</span>
<span class="token comment"># -r 屏蔽\\，如果没有该选项，则\\作为一个转义字符，有的话 \\就是个正常的字符了。</span>
<span class="token comment"># -d delim 结束符</span>
<span class="token comment"># IFS=flag 指定分隔符</span>
<span class="token comment"># -n num 读取n个字符</span>
<span class="token comment"># -s 不回显输入（non-echoed）</span>
<span class="token comment"># -p msg 显示提示词</span>
<span class="token comment"># -t timeout 超时时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考</p>`,12),O={href:"https://stackoverflow.com/questions/13122441/how-do-i-read-a-variable-on-a-while-loop",target:"_blank",rel:"noopener noreferrer"},S=t(`<h3 id="until" tabindex="-1"><a class="header-anchor" href="#until" aria-hidden="true">#</a> until</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">until</span> <span class="token operator">&lt;</span>CONDITION<span class="token operator">&gt;</span> <span class="token punctuation">;</span> <span class="token keyword">do</span>
  COMMAND1<span class="token punctuation">;</span>
  <span class="token punctuation">..</span>.
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="continue" tabindex="-1"><a class="header-anchor" href="#continue" aria-hidden="true">#</a> continue</h3><p><code>continue n</code> —— n是跳到哪一层（不是跳几层）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> ./b.sh 
<span class="token comment">#!/bin/bash</span>
<span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span>j<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> j<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span>i<span class="token operator">*</span>j<span class="token operator">==</span><span class="token number">12</span><span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">continue</span> <span class="token number">2</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$i</span>*<span class="token variable">$j</span>=$[<span class="token variable">$i</span>*<span class="token variable">$j</span>]&quot;</span>
  <span class="token keyword">done</span>
  <span class="token builtin class-name">echo</span> 
<span class="token keyword">done</span>

<span class="token punctuation">[</span>student@workstation ~<span class="token punctuation">]</span>$ ./b.sh 
<span class="token number">1</span>*1<span class="token operator">=</span><span class="token number">11</span>*2<span class="token operator">=</span><span class="token number">21</span>*3<span class="token operator">=</span><span class="token number">31</span>*4<span class="token operator">=</span><span class="token number">41</span>*5<span class="token operator">=</span><span class="token number">5</span>
<span class="token number">2</span>*1<span class="token operator">=</span><span class="token number">22</span>*2<span class="token operator">=</span><span class="token number">42</span>*3<span class="token operator">=</span><span class="token number">62</span>*4<span class="token operator">=</span><span class="token number">82</span>*5<span class="token operator">=</span><span class="token number">10</span>
<span class="token number">3</span>*1<span class="token operator">=</span><span class="token number">33</span>*2<span class="token operator">=</span><span class="token number">63</span>*3<span class="token operator">=</span><span class="token number">94</span>*1<span class="token operator">=</span><span class="token number">44</span>*2<span class="token operator">=</span><span class="token number">85</span>*1<span class="token operator">=</span><span class="token number">55</span>*2<span class="token operator">=</span><span class="token number">105</span>*3<span class="token operator">=</span><span class="token number">155</span>*4<span class="token operator">=</span><span class="token number">205</span>*5<span class="token operator">=</span><span class="token number">25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="break" tabindex="-1"><a class="header-anchor" href="#break" aria-hidden="true">#</a> break</h3><p><code>break n</code> 跳出哪层循环</p><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><h3 id="function" tabindex="-1"><a class="header-anchor" href="#function" aria-hidden="true">#</a> function</h3><p>todo</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token variable">$0</span>
<span class="token variable">$1</span>
<span class="token variable">$2</span>
<span class="token variable">$@</span> —— <span class="token string">&quot;a&quot;</span> <span class="token string">&quot;b&quot;</span> <span class="token string">&quot;c&quot;</span>
<span class="token variable">$*</span> —— <span class="token string">&quot;a b c&quot;</span>
<span class="token variable">$?</span> —— 返回值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Fork 炸弹： <code>:() { :|:&amp; };:</code> —— 这个脚本将以指数规模创建信的进程，最终造成拒绝服务攻击。可以通过 <code>/etc/security/limits.conf</code> 配置来限制可生成的最大进程数。</p></div><p>导出函数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> val1 <span class="token comment"># 导出变量</span>
<span class="token builtin class-name">export</span> <span class="token parameter variable">-f</span> func1 <span class="token comment"># 导出函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="exit" tabindex="-1"><a class="header-anchor" href="#exit" aria-hidden="true">#</a> exit</h3><p><code>exit n</code> —— n 返回值，默认0， 取值范围 0~255</p><p>exit 命令用于退出当前程序，并返回程序执行结果</p><p>一般，返回 0 表示成功，非0 表示失败（出错）</p><h2 id="参数处理" tabindex="-1"><a class="header-anchor" href="#参数处理" aria-hidden="true">#</a> 参数处理</h2><p>参考</p>`,20),P={href:"https://man7.org/linux/man-pages/man1/getopt.1.html",target:"_blank",rel:"noopener noreferrer"},L={href:"https://man7.org/linux/man-pages/man1/getopts.1p.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://www.baeldung.com/linux/bash-parse-command-line-arguments",target:"_blank",rel:"noopener noreferrer"},C={href:"https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash",target:"_blank",rel:"noopener noreferrer"},D=s("ul",null,[s("li",null,"[x] 主要的回答"),s("li",null,"[ ] 其他回答"),s("li",null,"[ ] 回答中的链接")],-1),H={href:"https://www.baeldung.com/linux/read-command",target:"_blank",rel:"noopener noreferrer"},M=t(`<h3 id="getopts-posix" tabindex="-1"><a class="header-anchor" href="#getopts-posix" aria-hidden="true">#</a> getopts（POSIX）</h3><p>用法：<code>demo-getopts.sh -vf /etc/hosts foo bar</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span>/tmp/demo-getopts.sh <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
output_file=&quot;&quot;
verbose=0

while getopts &quot;h?vf:&quot; opt; do
  case &quot;$opt&quot; in
    h|\\?)
      show_help
      exit 0
      ;;
    v)  verbose=1
      ;;
    f)  output_file=$OPTARG
      ;;
  esac
done

shift $((OPTIND-1))

[ &quot;\${1:-}&quot; = &quot;--&quot; ] &amp;&amp; shift

echo &quot;verbose=$verbose, output_file=&#39;$output_file&#39;, Leftovers: $@&quot;
EOF</span>

<span class="token function">chmod</span> +x /tmp/demo-getopts.sh

/tmp/demo-getopts.sh <span class="token parameter variable">-vf</span> /etc/hosts foo bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token keyword">while</span> <span class="token builtin class-name">getopts</span> <span class="token string">&#39;:abc:h&#39;</span> opt<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$opt</span>&quot;</span> <span class="token keyword">in</span>
    a<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing option &#39;a&#39;&quot;</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>

    b<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing option &#39;b&#39;&quot;</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>

    c<span class="token punctuation">)</span>
      <span class="token assign-left variable">arg</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$OPTARG</span>&quot;</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing option &#39;c&#39; with &#39;<span class="token variable">\${OPTARG}</span>&#39; argument&quot;</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>

    h<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $0<span class="token variable">)</span></span> [-a] [-b] [-c arg]&quot;</span>
      <span class="token builtin class-name">exit</span> <span class="token number">0</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>

    <span class="token builtin class-name">:</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;option requires an argument.<span class="token entity" title="\\n">\\n</span>Usage: <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $0<span class="token variable">)</span></span> [-a] [-b] [-c arg]&quot;</span>
      <span class="token builtin class-name">exit</span> <span class="token number">1</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>

    ?<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;Invalid command option.<span class="token entity" title="\\n">\\n</span>Usage: <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $0<span class="token variable">)</span></span> [-a] [-b] [-c arg]&quot;</span>
      <span class="token builtin class-name">exit</span> <span class="token number">1</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">shift</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$((</span>$OPTIND <span class="token operator">-</span><span class="token number">1</span><span class="token variable">))</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="getopt" tabindex="-1"><a class="header-anchor" href="#getopt" aria-hidden="true">#</a> getopt</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GETOPT<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>                                                                       User Commands                                                                      GETOPT<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

NAME
       getopt - parse <span class="token builtin class-name">command</span> options <span class="token punctuation">(</span>enhanced<span class="token punctuation">)</span>

SYNOPSIS
       getopt optstring parameters

       getopt <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>--<span class="token punctuation">]</span> optstring parameters

       getopt <span class="token punctuation">[</span>options<span class="token punctuation">]</span> -o<span class="token operator">|</span>--options optstring <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>--<span class="token punctuation">]</span> parameters

DESCRIPTION
       getopt is used to <span class="token builtin class-name">break</span> up <span class="token punctuation">(</span>parse<span class="token punctuation">)</span> options <span class="token keyword">in</span> <span class="token builtin class-name">command</span> lines <span class="token keyword">for</span> easy parsing by shell procedures, and to check <span class="token keyword">for</span> valid options. It uses the GNU getopt<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> routines
       to <span class="token keyword">do</span> this.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above script:</p><ul><li><code>-o</code> option represents the short command-line options</li><li><code>–long</code> option represents the long command-line options</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">VALID_ARGS</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>getopt <span class="token parameter variable">-o</span> abg:d: <span class="token parameter variable">--long</span> alpha,beta,gamma:,delta: -- <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token string">&quot;<span class="token variable">$VALID_ARGS</span>&quot;</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token builtin class-name">:</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
    <span class="token parameter variable">-a</span> <span class="token operator">|</span> --alpha<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing &#39;alpha&#39; option&quot;</span>
        <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token parameter variable">-b</span> <span class="token operator">|</span> --beta<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing &#39;beta&#39; option&quot;</span>
        <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token parameter variable">-g</span> <span class="token operator">|</span> --gamma<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing &#39;gamma&#39; option. Input argument is &#39;<span class="token variable">$2</span>&#39;&quot;</span>
        <span class="token builtin class-name">shift</span> <span class="token number">2</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token parameter variable">-d</span> <span class="token operator">|</span> --delta<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Processing &#39;delta&#39; option. Input argument is &#39;<span class="token variable">$2</span>&#39;&quot;</span>
        <span class="token builtin class-name">shift</span> <span class="token number">2</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    --<span class="token punctuation">)</span> <span class="token builtin class-name">shift</span><span class="token punctuation">;</span> 
        <span class="token builtin class-name">break</span> 
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bash-空格分隔" tabindex="-1"><a class="header-anchor" href="#bash-空格分隔" aria-hidden="true">#</a> Bash 空格分隔</h4><p>例如，<code>--option argument</code></p><p>用法：<code>demo-space-separated.sh -e conf -s /etc /etc/hosts</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span>/tmp/demo-space-separated.sh <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#!/bin/bash

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -e|--extension)
      EXTENSION=&quot;$2&quot;
      shift # past argument
      shift # past value
      ;;
    -s|--searchpath)
      SEARCHPATH=&quot;$2&quot;
      shift # past argument
      shift # past value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument
      ;;
    -*|--*)
      echo &quot;Unknown option $1&quot;
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=(&quot;$1&quot;) # save positional arg
      shift # past argument
      ;;
  esac
done

set -- &quot;\${POSITIONAL_ARGS[@]}&quot; # restore positional parameters

echo &quot;FILE EXTENSION  = \${EXTENSION}&quot;
echo &quot;SEARCH PATH     = \${SEARCHPATH}&quot;
echo &quot;DEFAULT         = \${DEFAULT}&quot;
echo &quot;Number files in SEARCH PATH with EXTENSION:&quot; $(ls -1 &quot;\${SEARCHPATH}&quot;/*.&quot;\${EXTENSION}&quot; | wc -l)

if [[ -n $1 ]]; then
    echo &quot;Last line of file specified as non-opt/last argument:&quot;
    tail -1 &quot;$1&quot;
fi
EOF</span>

<span class="token function">chmod</span> +x /tmp/demo-space-separated.sh

/tmp/demo-space-separated.sh <span class="token parameter variable">-e</span> conf <span class="token parameter variable">-s</span> /etc /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bash-等号分隔" tabindex="-1"><a class="header-anchor" href="#bash-等号分隔" aria-hidden="true">#</a> Bash 等号分隔</h4><p>例如，<code>--option=argument</code></p><p>用法：<code>demo-equals-separated.sh -e=conf -s=/etc /etc/hosts</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span>/tmp/demo-equals-separated.sh <span class="token operator">&lt;&lt;</span><span class="token string">&#39;EOF&#39;
#!/bin/bash

for i in &quot;$@&quot;; do
  case $i in
    -e=*|--extension=*)
      EXTENSION=&quot;\${i#*=}&quot;
      shift # past argument=value
      ;;
    -s=*|--searchpath=*)
      SEARCHPATH=&quot;\${i#*=}&quot;
      shift # past argument=value
      ;;
    --default)
      DEFAULT=YES
      shift # past argument with no value
      ;;
    -*|--*)
      echo &quot;Unknown option $i&quot;
      exit 1
      ;;
    *)
      ;;
  esac
done

echo &quot;FILE EXTENSION  = \${EXTENSION}&quot;
echo &quot;SEARCH PATH     = \${SEARCHPATH}&quot;
echo &quot;DEFAULT         = \${DEFAULT}&quot;
echo &quot;Number files in SEARCH PATH with EXTENSION:&quot; $(ls -1 &quot;\${SEARCHPATH}&quot;/*.&quot;\${EXTENSION}&quot; | wc -l)

if [[ -n $1 ]]; then
    echo &quot;Last line of file specified as non-opt/last argument:&quot;
    tail -1 $1
fi
EOF</span>

<span class="token function">chmod</span> +x /tmp/demo-equals-separated.sh

/tmp/demo-equals-separated.sh <span class="token parameter variable">-e</span><span class="token operator">=</span>conf <span class="token parameter variable">-s</span><span class="token operator">=</span>/etc /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="信息传递" tabindex="-1"><a class="header-anchor" href="#信息传递" aria-hidden="true">#</a> 信息传递</h2><h3 id="读取-read" tabindex="-1"><a class="header-anchor" href="#读取-read" aria-hidden="true">#</a> 读取： read</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># options —— 影响读取命令与输入交互方式</span>
<span class="token comment"># name —— 存储的变量名</span>
$ <span class="token builtin class-name">read</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>name<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># 参数选项</span>

<span class="token comment"># -r 如果没有该选项，则 \\（backslash） 作为一个转义字符；有的话 \\ 就是个正常的字符了</span>

<span class="token comment"># -d delim 定界符/结束符</span>
<span class="token comment"># IFS=flag 指定分隔符</span>
<span class="token comment"># -n/-N num 读取n个字符，除非发生超时或到达 EOF</span>

<span class="token comment"># -s 不回显输入（non-echoed）</span>
<span class="token comment"># -p msg 显示提示词</span>

<span class="token comment"># -t timeout 超时时间</span>

<span class="token comment"># -a array 将单词拆分操作的结果存储在一个数组中而不是单独的变量中</span>

<span class="token comment"># -u fd 从给定的文件描述符中读取输入行</span>
<span class="token comment"># -e 使用\`Bash\`内置的\`Readline\`库读取输入行。在输入的时候可以使用命令补全功能</span>
<span class="token comment"># -i text 将文本打印为标准输出流上的默认输入（只能与\`-e\`结合使用）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认会将<code>stdin</code>（标准输入流）中获取一行，分配给<code>REPLY</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">read</span>
baeldung is a cool tech site <span class="token comment"># what we type</span>
$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$REPLY</span>
baeldung is a cool tech site
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况用 <code>\\n</code> 回车符号拆分输入到各个变量中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">read</span> input1 input2 input3
baeldung <span class="token punctuation">\\</span> <span class="token comment"># what </span>
is a cool <span class="token punctuation">\\</span> <span class="token comment"># we </span>
tech site   <span class="token comment"># type</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$input1</span>] [<span class="token variable">$input2</span>] [<span class="token variable">$input3</span>]&quot;</span>
<span class="token punctuation">[</span>baeldung<span class="token punctuation">]</span> <span class="token punctuation">[</span>is<span class="token punctuation">]</span> <span class="token punctuation">[</span>a cool tech site<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以指定 IFS（Internal Field Separator，内部字段分隔符） 改变拆分符号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># CSV（Comma Separated Value，逗号分隔型数值）</span>
$ <span class="token punctuation">{</span>
      <span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&quot;,&quot;</span>
      <span class="token builtin class-name">read</span> input1 input2 input3
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$input1</span>] [<span class="token variable">$input2</span>] [<span class="token variable">$input3</span>]&quot;</span>
  <span class="token punctuation">}</span>
baeldung,,is,a,cool,tech<span class="token punctuation">;</span>site <span class="token comment"># what we type</span>
<span class="token punctuation">[</span>baeldung<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>is,a,cool,tech<span class="token punctuation">;</span>site<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -p</span>
$ <span class="token punctuation">{</span>
      <span class="token assign-left variable">prompt</span><span class="token operator">=</span><span class="token string">&quot;You shall not pass:&quot;</span>
      <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$prompt</span>&quot;</span> <span class="token parameter variable">-s</span> input
      <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span> input word [<span class="token variable">$input</span>]&quot;</span>
  <span class="token punctuation">}</span>
You shall not pass: <span class="token comment"># invisible input here</span>
input word <span class="token punctuation">[</span>baledung is a cool site<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -e -i 读取变量值作为输入</span>
<span class="token comment"># -a</span>
$ <span class="token punctuation">{</span>
      <span class="token builtin class-name">declare</span> <span class="token parameter variable">-a</span> input_array
      <span class="token assign-left variable">text</span><span class="token operator">=</span><span class="token string">&quot;baeldung is a cool tech site&quot;</span>
      <span class="token builtin class-name">read</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;<span class="token variable">$text</span>&quot;</span> <span class="token parameter variable">-a</span> input_array 
      <span class="token keyword">for</span> <span class="token for-or-select variable">input</span> <span class="token keyword">in</span> <span class="token variable">\${input_array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span> 
          <span class="token keyword">do</span>
              <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;[<span class="token variable">$input</span>] &quot;</span>
          <span class="token keyword">done</span>
  <span class="token punctuation">}</span>
baeldung is a cool tech site <span class="token comment"># default input here</span>
<span class="token punctuation">[</span>baeldung<span class="token punctuation">]</span> <span class="token punctuation">[</span>is<span class="token punctuation">]</span> <span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token punctuation">[</span>cool<span class="token punctuation">]</span> <span class="token punctuation">[</span>tech<span class="token punctuation">]</span> <span class="token punctuation">[</span>site<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="例子-获取用户bash配置" tabindex="-1"><a class="header-anchor" href="#例子-获取用户bash配置" aria-hidden="true">#</a> 例子：获取用户bash配置</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">line</span><span class="token operator">=</span><span class="token string">&quot;root:x:0:0:root:/root:/bin/bash&quot;</span>
<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&quot;:&quot;</span>
<span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> <span class="token variable">$line</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token punctuation">[</span> <span class="token variable">$count</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token variable">$item</span>
  <span class="token punctuation">[</span> <span class="token variable">$count</span> <span class="token parameter variable">-eq</span> <span class="token number">6</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token assign-left variable">shell</span><span class="token operator">=</span>$
  <span class="token builtin class-name">let</span> count++
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span>&#39;s shell is <span class="token variable">$shell</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="例子-从其他命令读取" tabindex="-1"><a class="header-anchor" href="#例子-从其他命令读取" aria-hidden="true">#</a> 例子：从其他命令读取</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token punctuation">{</span> 
      <span class="token function">ls</span> <span class="token parameter variable">-ll</span> / <span class="token operator">|</span> <span class="token punctuation">{</span> <span class="token builtin class-name">declare</span> <span class="token parameter variable">-a</span> input
                   <span class="token builtin class-name">read</span>
                   <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-a</span> input<span class="token punctuation">;</span> 
                   <span class="token keyword">do</span>
                       <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${input<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span> <span class="token variable">\${input<span class="token punctuation">[</span>8<span class="token punctuation">]</span>}</span>&quot;</span>
                   <span class="token keyword">done</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

drwxr-xr-x bin
drwxr-xr-x boot
drwxr-xr-x dev
<span class="token comment"># some more folders</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="例子-超时和特殊字符" tabindex="-1"><a class="header-anchor" href="#例子-超时和特殊字符" aria-hidden="true">#</a> 例子：超时和特殊字符</h4><p>在复杂的脚本中，我们可能想要更多的灵活性来避免阻塞读取调用。</p><p>此外，输入可能包含我们不想转义的特定<code>&lt;backslash&gt;</code>字符（例如在生成的密码中）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token punctuation">{</span>
    <span class="token assign-left variable">prompt</span><span class="token operator">=</span><span class="token string">&quot;You shall not pass:&quot;</span>
    <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$prompt</span>&quot;</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token number">5</span> input
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$input</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>timeout occured!&quot;</span>
        <span class="token keyword">else</span>
            <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>input word [<span class="token variable">$input</span>]&quot;</span>
        <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

You shall not pass: <span class="token comment"># invisible input here</span>
input word <span class="token punctuation">[</span>baeldung<span class="token punctuation">\\</span>is<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="例子-正好读取-n-个字符" tabindex="-1"><a class="header-anchor" href="#例子-正好读取-n-个字符" aria-hidden="true">#</a> 例子：正好读取 N 个字符</h4><p>让我们把事情变得更复杂，假设我们想在输入中恰好有 11 个字符：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token punctuation">{</span>
    <span class="token assign-left variable">prompt</span><span class="token operator">=</span><span class="token string">&quot;Reading exactly 11 chars:&quot;</span>
    <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$prompt</span>&quot;</span> <span class="token parameter variable">-N</span> <span class="token number">11</span> <span class="token parameter variable">-t</span> <span class="token number">5</span> input1 input2 
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>input word1 [<span class="token variable">$input1</span>]&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;input word2 [<span class="token variable">$input2</span>]&quot;</span>
<span class="token punctuation">}</span>

Reading exactly <span class="token number">11</span> chars:baeldung is <span class="token comment"># no &lt;newline&gt; here</span>
input word1 <span class="token punctuation">[</span>baeldung is<span class="token punctuation">]</span>
input word2 <span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>引入<code>-N</code>选项会导致三个主要的副作用：</p><ul><li>行分隔符不再重要</li><li>它不再将输入拆分为单词，因为我们只想将 11 个字符分配给input1。</li><li>如果发生超时， read甚至会将部分输入分配给input1变量。</li></ul><h3 id="管道" tabindex="-1"><a class="header-anchor" href="#管道" aria-hidden="true">#</a> 管道</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cmd1 <span class="token operator">|</span> cmd2 <span class="token operator">|</span> cmd3 -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3>`,44),F={href:"https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash",target:"_blank",rel:"noopener noreferrer"},G={href:"https://stackoverflow.com/questions/48235261/bash-the-difference-between-and-redirect",target:"_blank",rel:"noopener noreferrer"},U=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>         —— 输出/输入重定向到“文件”（覆盖）
<span class="token operator">&gt;&gt;</span>/<span class="token operator">&lt;&lt;</span>        —— 输出/输入重定向到“文件”（追加）
<span class="token operator">&lt;&lt;&lt;</span>       —— 输入重定向到字符串，同<span class="token string">&quot;|&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进程" tabindex="-1"><a class="header-anchor" href="#进程" aria-hidden="true">#</a> 进程</h2><p>通过 <code>()</code> 形式定义一个子 shell</p><p>e.g.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">pwd</span> <span class="token comment"># /mnt/c/Users/xxx</span>
<span class="token punctuation">(</span>cd /bin<span class="token punctuation">;</span> <span class="token function">ls</span><span class="token punctuation">)</span> <span class="token comment"># 子 shell</span>
<span class="token builtin class-name">pwd</span> <span class="token comment"># /mnt/c/Users/xxx</span>

cmd0 <span class="token operator">|</span> <span class="token punctuation">(</span> cmd1<span class="token punctuation">;</span>cmd2<span class="token punctuation">;</span>cmd3 <span class="token punctuation">)</span> <span class="token operator">|</span> cmd4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function j(B,V){const a=i("ExternalLinkIcon");return o(),p("div",null,[s("p",null,[n("todo 参考 "),s("a",r,[n("https://blog.csdn.net/LawssssCat/article/details/103434668"),e(a)])]),s("p",null,[n("todo 参考 "),s("a",d,[n("https://blog.csdn.net/LawssssCat/article/details/103410045"),e(a)])]),u,s("ul",null,[s("li",null,[s("a",v,[n("https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins"),e(a)])])]),b,s("blockquote",null,[s("p",null,[s("a",m,[n("https://superuser.com/questions/821094/what-is-the-difference-between-set-env-declare-and-export-when-setting-a-varia"),e(a)])]),k]),h,s("p",null,[n("e.g. "),s("a",g,[n("https://unix.stackexchange.com/questions/480846/removing-first-forward-slash-from-string"),e(a)])]),f,s("p",null,[s("a",x,[n("https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux"),e(a)])]),q,s("ul",null,[s("li",null,[s("a",$,[n("https://www.baeldung.com/linux/join-multiple-lines"),e(a)])])]),w,s("ul",null,[s("li",null,[s("a",y,[n("Linux使用awk去掉重复值的几种情况"),e(a)])]),s("li",null,[s("a",_,[n("linux sed去除重复,删除文本中的重复行(sort+uniq/awk/sed)"),e(a)])])]),E,s("ul",null,[s("li",null,[n("[ ] "),s("a",T,[n("https://spin.atomicobject.com/2021/06/08/jq-creating-updating-json/"),e(a)])])]),A,s("p",null,[s("a",N,[n("https://blog.csdn.net/weixin_44324367/article/details/111312156"),e(a)])]),I,s("ul",null,[s("li",null,[s("a",O,[n("https://stackoverflow.com/questions/13122441/how-do-i-read-a-variable-on-a-while-loop"),e(a)])])]),S,s("ul",null,[s("li",null,[s("p",null,[n("getopt - "),s("a",P,[n("https://man7.org/linux/man-pages/man1/getopt.1.html"),e(a)])])]),s("li",null,[s("p",null,[n("getopts - "),s("a",L,[n("https://man7.org/linux/man-pages/man1/getopts.1p.html"),e(a)])])]),s("li",null,[s("p",null,[s("a",R,[n("https://www.baeldung.com/linux/bash-parse-command-line-arguments"),e(a)])])]),s("li",null,[s("p",null,[n("[ ] "),s("a",C,[n("https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash"),e(a)])]),D]),s("li",null,[s("p",null,[n("[x] "),s("a",H,[n("https://www.baeldung.com/linux/read-command"),e(a)])])])]),M,s("ul",null,[s("li",null,[s("a",F,[n("What's the difference between <<, <<< and < < in bash?"),e(a)])]),s("li",null,[s("a",G,[n('bash: the difference between "<" and "<<<" redirect [duplicate]'),e(a)])])]),U])}const z=l(c,[["render",j],["__file","syntax.html.vue"]]);export{z as default};
