import{_ as p,r as a,o as c,c as o,a as n,d as e,w as r,b as s,e as i}from"./app-04e6f892.js";const d={},u=n("p",null,"Bash（Bourne Again Shell）",-1),m=n("h2",{id:"语法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#语法","aria-hidden":"true"},"#"),s(" 语法")],-1),v=i(`<h2 id="三剑客" tabindex="-1"><a class="header-anchor" href="#三剑客" aria-hidden="true">#</a> 三剑客</h2><ul><li>grep 过滤</li><li>awk 转换</li><li>sed 格式化</li></ul><p>todo</p><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h2><p>登录式： <code>/etc/profile</code>、<code>~/.bash_profile</code>、<code>~/.bashrc</code>、<code>/etc/bashrc</code> <br> 非登录式： <code>~/.bashrc</code>、<code>/etc/bashrc</code> （bash特有）</p><ul><li><code>/etc/profile</code> —— 此文件为系统的每个用户设置环境信息，系统中每个用户登录时都要执行这个脚本。如果系统管理员希望某个设置对所有用户都生效，可以写在这个脚本里。这个文件也会从<code>/etc/profile.d</code>目录中配置文件中搜集shell的设置。</li><li><code>~/.bash_profile</code> —— 每个用户都可以使用该文件设置专属于自己的shell信息。当用户登录时，该文件仅执行一次。默认情况下，它设置一些环境变量，执行用户的<code>.bashrc</code>文件。</li><li><code>~/.bashrc</code> —— 该文件包含专属于用户自己的shell信息。当登录时，每次打开新shell时，该文件被读取。</li><li><code>/etc/bashrc</code> —— 为每一个运行bash shell的用户执行此文件，当bash shell被打开时，该文件被读取。</li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>总结：profile for 用户（登录）、bashrc for bash（非登录）</p></div><p>查看其他进程环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cat</span> /proc/1/environ
<span class="token assign-left variable">WSL2_CROSS_DISTRO</span><span class="token operator">=</span>/wslkCcfnf
$ <span class="token function">sleep</span> <span class="token number">10000</span> <span class="token operator">&amp;</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token number">87</span>
$ pgrep <span class="token function">sleep</span>
<span class="token number">87</span>
<span class="token comment"># 下面变量彼此用 \\0 分割，而不是用 \\n 分割</span>
$ <span class="token function">cat</span> /proc/87/environ
<span class="token assign-left variable"><span class="token environment constant">SHELL</span></span><span class="token operator">=</span>/bin/bashWSL_DISTRO_NAME<span class="token operator">=</span>UbuntuNAME<span class="token operator">=</span>lpc19PWD<span class="token operator">=</span>/mnt/c/Users/xxxxLOGNAME<span class="token operator">=</span>uv01MOTD_SHOWN<span class="token operator">=</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.<span class="token environment constant">PATH</span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files <span class="token punctuation">(</span>x86<span class="token punctuation">)</span>/<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token number">5</span>/bin:/snap/binHOSTTYPE<span class="token operator">=</span>x86_64_<span class="token operator">=</span>/usr/bin/sleep
<span class="token comment"># 换行</span>
$ <span class="token function">cat</span> /proc/87/environ <span class="token operator">|</span> <span class="token function">tr</span> <span class="token string">&#39;\\0&#39;</span> <span class="token string">&#39;\\n&#39;</span>
<span class="token assign-left variable"><span class="token environment constant">SHELL</span></span><span class="token operator">=</span>/bin/bash
<span class="token assign-left variable">WSL_DISTRO_NAME</span><span class="token operator">=</span>Ubuntu
<span class="token assign-left variable">NAME</span><span class="token operator">=</span>lpc19
<span class="token assign-left variable"><span class="token environment constant">PWD</span></span><span class="token operator">=</span>/mnt/c/Users/xxxx
<span class="token assign-left variable"><span class="token environment constant">LOGNAME</span></span><span class="token operator">=</span>uv01
<span class="token assign-left variable">MOTD_SHOWN</span><span class="token operator">=</span>update-motd
<span class="token assign-left variable"><span class="token environment constant">HOME</span></span><span class="token operator">=</span>/home/uv01
<span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>C.UTF-8
<span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查当前shell版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token environment constant">$SHELL</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查是否为超级用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token environment constant">$UID</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> Non root user. Please run as root.
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> Root user
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo 用 PS1 改变提示文本</p><h2 id="历史记录" tabindex="-1"><a class="header-anchor" href="#历史记录" aria-hidden="true">#</a> 历史记录</h2><p><code>~/.bash_history</code></p><p><code>history</code> 查看</p><h2 id="回放" tabindex="-1"><a class="header-anchor" href="#回放" aria-hidden="true">#</a> 回放</h2><p>用 <code>script</code> 和 <code>scriptreplay</code> 命令可以将终端的会话记录记录下来并回放。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>script <span class="token comment"># 进入会话记录模式，并默认将会话记录记录在 typescript 文件中</span>
<span class="token builtin class-name">exit</span> <span class="token comment"># 退出会话模式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>会话记录和回放</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 记录命令时间戳</span>
<span class="token comment"># script [options] [file]</span>
<span class="token comment"># -t[&lt;file&gt;], --timing[=&lt;file&gt;] deprecated alias to -T (default file is stderr)</span>
<span class="token comment"># -T, --log-timing &lt;file&gt;       log timing information to file</span>
<span class="token comment"># -a, --append                  append to the log file</span>

<span class="token comment"># 旧写法</span>
script <span class="token parameter variable">-t</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>timing.log <span class="token parameter variable">-a</span> output.session

<span class="token comment"># 新写法</span>
script <span class="token parameter variable">-T</span> timing.log <span class="token parameter variable">-a</span> output.session

<span class="token punctuation">..</span>.

<span class="token builtin class-name">exit</span>

<span class="token comment"># 回放上述命令</span>
<span class="token comment"># scriptreplay [-t] timingfile [typescript] [divisor]</span>
scriptreplay timing.log output.session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会话记录广播</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># session1</span>
<span class="token function">mkfifo</span> scriptfifo
script <span class="token parameter variable">-f</span> scriptfifo

<span class="token punctuation">..</span><span class="token punctuation">..</span>

<span class="token builtin class-name">exit</span>

<span class="token comment"># session2</span>
<span class="token function">cat</span> scriptfifo <span class="token comment"># waiting change</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="系统时间" tabindex="-1"><a class="header-anchor" href="#系统时间" aria-hidden="true">#</a> 系统时间</h2><p>在 UNIX 系统中，时间被存储为一个整数，其大小为自世界标准时间（UTC）时间1970年1月1日0时0分0秒起所流逝的秒数。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>UTC（Coordinated Universal Time，世界标准时间或世界协调时间）是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。</p><p>UNIX 认为 UTC 1979年1月1日0点 是纪元时间或UNIX时间。POSIX标准 推出后，这个时间也被称为 POSIX时间。</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 时间格式化</span>
$ <span class="token function">date</span>
Wed Feb <span class="token number">28</span> <span class="token number">22</span>:01:52 CST <span class="token number">2024</span>
$ <span class="token function">date</span> +%s
<span class="token number">1709128922</span>
$ <span class="token function">date</span> <span class="token parameter variable">--date</span> <span class="token string">&quot;Wed Feb 28 22:01:52 CST 2024&quot;</span> +%s
<span class="token number">1709128912</span>
$ <span class="token function">date</span> +<span class="token string">&quot;%s %B %Y&quot;</span>
<span class="token number">1709129831</span> February <span class="token number">2024</span>

<span class="token comment"># 设置时间</span>
$ <span class="token function">date</span> <span class="token parameter variable">-s</span> <span class="token string">&quot;Wed Feb 28 22:01:52 CST 2024&quot;</span>
date: cannot <span class="token builtin class-name">set</span> date: Operation not permitted
Wed Feb <span class="token number">28</span> <span class="token number">22</span>:01:52 CST <span class="token number">2024</span>

<span class="token comment"># 时间差</span>
$ <span class="token assign-left variable">start</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>
$ <span class="token function">sleep</span> <span class="token number">10</span>
$ <span class="token assign-left variable">end</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;Time taken to execute commands is <span class="token variable"><span class="token variable">$((</span> end <span class="token operator">-</span> start<span class="token variable">))</span></span> seconds.&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>内容</th><th>格式</th></tr></thead><tbody><tr><td>星期（Sat）</td><td><code>%a</code></td></tr><tr><td>星期（Saturday）</td><td><code>%A</code></td></tr><tr><td>月（Nov）</td><td><code>%b</code></td></tr><tr><td>月（November）</td><td><code>%B</code></td></tr><tr><td>日（28）</td><td><code>%d</code></td></tr><tr><td>固定格式日期（<code>mm/dd/yy</code>）</td><td><code>%D</code></td></tr><tr><td>年（10）</td><td><code>%y</code></td></tr><tr><td>年（2010）</td><td><code>%Y</code></td></tr><tr><td>小时（08）</td><td><code>%H</code>/<code>%I</code></td></tr><tr><td>分钟（33）</td><td><code>%M</code></td></tr><tr><td>秒（10）</td><td><code>%S</code></td></tr><tr><td>纳秒（695208515）</td><td><code>%N</code></td></tr><tr><td>UNIX纪元时（以秒为单位，1709128922）</td><td><code>%s</code></td></tr></tbody></table><h2 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h2><h3 id="路径处理" tabindex="-1"><a class="header-anchor" href="#路径处理" aria-hidden="true">#</a> 路径处理</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token assign-left variable">filepath</span><span class="token operator">=</span><span class="token string">&quot;/var/services/backup//tmp//backup__2023-05-02_0.tar.gz&quot;</span>
<span class="token comment"># 获取路径文件夹名</span>
<span class="token comment"># %/ —— 删除最后一个/及其右边的字符串</span>
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${filepath<span class="token operator">%</span><span class="token operator">/</span>*}</span>&quot;</span>
/var/services/backup//tmp/
<span class="token comment"># 获取路径文件名</span>
$ <span class="token assign-left variable">filename</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $filepath<span class="token variable">)</span></span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">$filename</span>
backup__2023-05-02_0.tar.gz
<span class="token comment"># 获取文件名前缀</span>
<span class="token comment"># %.* —— 删除最后一个.及其右边的字符串</span>
<span class="token comment"># %%.* （greedy）</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${filename<span class="token operator">%</span>.*}</span>
backup__2023-05-02_0.tar
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${filename<span class="token operator">%%</span>.*}</span>
backup__2023-05-02_0
<span class="token comment"># 获取文件名后缀</span>
<span class="token comment"># #*. —— 删除前面内容</span>
<span class="token comment"># ##*. （greedy）</span>
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${filename<span class="token operator">#</span>*.}</span>
tar.gz
$ <span class="token builtin class-name">echo</span> <span class="token variable">\${filename<span class="token operator">##</span>*.}</span>
gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件编辑" tabindex="-1"><a class="header-anchor" href="#文件编辑" aria-hidden="true">#</a> 文件编辑</h3><p>追加（append）、覆盖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tee</span> /etc/nginx/sites-available/<span class="token variable">$project_name</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
server {
    listen 80;
    server_name test.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\<span class="token variable">$http_upgrade</span>;
        proxy_set_header Connection &#39;upgrade&#39;;
        proxy_set_header Host \\<span class="token variable">$host</span>;
        proxy_cache_bypass \\<span class="token variable">$http_upgrade</span>;
    }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件查找" tabindex="-1"><a class="header-anchor" href="#文件查找" aria-hidden="true">#</a> 文件查找</h3><p>find</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 行为：打印</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-print</span> <span class="token comment"># 默认，用 \\n 分割每个匹配的文件</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-print0</span> <span class="token comment"># 用 \\0 分割每个匹配的文件</span>
<span class="token comment"># 行为：跳过</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token punctuation">\\</span><span class="token punctuation">(</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;.git&quot;</span> <span class="token parameter variable">-prune</span> <span class="token punctuation">\\</span><span class="token punctuation">)</span> <span class="token parameter variable">-o</span> <span class="token punctuation">\\</span><span class="token punctuation">(</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-print</span> <span class="token punctuation">\\</span><span class="token punctuation">)</span>
<span class="token comment"># 行为：删除</span>
<span class="token comment"># -delete</span>
<span class="token comment"># 行为：执行</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-exec</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;-- {}&quot;</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span> <span class="token comment"># 注意结尾</span>

<span class="token comment"># 匹配文件名</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-iname</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token comment"># 忽略大小写</span>
<span class="token comment"># 匹配整个路径</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-path</span> <span class="token string">&quot;*slynux*&quot;</span>
<span class="token comment"># 匹配整个路径（正则）</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-regex</span> <span class="token string">&quot;.*\\(\\.py\\|\\.sh\\)$&quot;</span>
<span class="token comment"># 匹配用户</span>
<span class="token comment"># -user username</span>
<span class="token comment"># 匹配权限</span>
<span class="token comment"># -perm 644</span>
<span class="token comment"># 匹配类型</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token comment"># 匹配文件</span>
<span class="token comment"># f 普通文件</span>
<span class="token comment"># l 符号链接</span>
<span class="token comment"># d 目录</span>
<span class="token comment"># c 字符设备</span>
<span class="token comment"># b 块设备</span>
<span class="token comment"># s 套接字</span>
<span class="token comment"># p 管道Fifo</span>
<span class="token comment"># 匹配时间（每个文件都有三种时间戳，单位“天”）</span>
<span class="token comment"># -atime 访问时间，用户最近一次访问文件的时间</span>
<span class="token comment"># -mtime 修改时间，文件内容最后一次被修改的时间</span>
<span class="token comment"># -ctime 变化时间，文件元素据（matedata，如权限、所有权）最后一次变化的时间</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-atime</span> <span class="token parameter variable">-7</span> <span class="token parameter variable">-print</span> <span class="token comment"># 在7天内访问</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-atime</span> <span class="token number">7</span> <span class="token parameter variable">-print</span> <span class="token comment"># 在前第7天访问</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-atime</span> <span class="token parameter variable">-7</span> <span class="token parameter variable">-print</span> <span class="token comment"># 在7天前访问</span>
<span class="token comment"># -newer file 比某个文件更新</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-newer</span> file.txt <span class="token parameter variable">-print</span>
<span class="token comment"># 匹配大小</span>
<span class="token comment"># -size +2k</span>
<span class="token comment"># -size -2k</span>
<span class="token comment"># -size 2k</span>
<span class="token comment"># 大小单位</span>
<span class="token comment"># b 块</span>
<span class="token comment"># c 字节</span>
<span class="token comment"># w 字（2字节）</span>
<span class="token comment"># k 千字节</span>
<span class="token comment"># M</span>
<span class="token comment"># G</span>

<span class="token comment"># 取反</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token operator">!</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token comment"># 排除</span>

<span class="token comment"># 多个条件</span>
<span class="token comment"># -o 或</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.pdf&quot;</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token punctuation">\\</span><span class="token punctuation">(</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.pdf&quot;</span> <span class="token punctuation">\\</span><span class="token punctuation">)</span> <span class="token parameter variable">-print</span> <span class="token comment"># 如果参数比较多，可以将相似的放在一起，括起来</span>

<span class="token comment"># 搜索深度</span>
<span class="token parameter variable">-maxdepth</span> <span class="token number">10</span>
<span class="token parameter variable">-mindepth</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件读取" tabindex="-1"><a class="header-anchor" href="#文件读取" aria-hidden="true">#</a> 文件读取</h3><h4 id="cat、tr" tabindex="-1"><a class="header-anchor" href="#cat、tr" aria-hidden="true">#</a> cat、tr</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> filename
<span class="token function">cat</span> <span class="token parameter variable">-s</span> filename <span class="token comment"># 压缩空行，将多个连续空行压缩为一个空行</span>
<span class="token function">cat</span> filename <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-s</span> <span class="token string">&#39;\\n&#39;</span> <span class="token comment"># 删除空行</span>

<span class="token comment"># -T 显示制表符</span>
<span class="token comment"># -n 显示行号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件移动" tabindex="-1"><a class="header-anchor" href="#文件移动" aria-hidden="true">#</a> 文件移动</h3><h4 id="mv" tabindex="-1"><a class="header-anchor" href="#mv" aria-hidden="true">#</a> mv</h4><p>批量改名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">img</span> <span class="token keyword">in</span> *.jpg *.png<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token assign-left variable">new</span><span class="token operator">=</span>image-<span class="token variable">$count</span><span class="token builtin class-name">.</span><span class="token variable">\${img<span class="token operator">##</span>*.}</span>
  <span class="token function">mv</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;<span class="token variable">$img</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$new</span>&quot;</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">let</span> count++
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rename" tabindex="-1"><a class="header-anchor" href="#rename" aria-hidden="true">#</a> rename</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将 JPG 后缀改为 jpg 后缀</span>
<span class="token function">rename</span> *.JPG *.jpg
<span class="token comment"># 将空格改为 _ 连接</span>
<span class="token function">rename</span> <span class="token string">&#39;s/ /_/g&#39;</span> *

<span class="token comment"># 变换文件名大小写</span>
<span class="token function">rename</span> <span class="token string">&#39;y/A-Z/a-z/&#39;</span> *
<span class="token function">rename</span> <span class="token string">&#39;y/a-z/A-Z/&#39;</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> path <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.mp3&quot;</span> <span class="token parameter variable">-exec</span> <span class="token function">mv</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> target_dir <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token function">find</span> path <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.mp3&quot;</span> <span class="token parameter variable">-exec</span> <span class="token function">rename</span> <span class="token string">&#39;s/ /_/g&#39;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件校验和核实" tabindex="-1"><a class="header-anchor" href="#文件校验和核实" aria-hidden="true">#</a> 文件校验和核实</h3><p>校验和（checksum）程序用来从文件中生成校验和密钥，然后利用这个校验和密钥核实文件的完整性。</p><p><code>md5sum</code>/<code>sha1sum</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ md5sum filename
$ md5sum filename <span class="token operator">&gt;</span> file_sum.md5

<span class="token comment"># 生成密钥</span>
$ <span class="token function">touch</span> filename
$ md5sum filename
d41d8cd98f00b204e9800998ecf8427e  filename
$ <span class="token function">touch</span> filename1
$ md5sum filename1
d41d8cd98f00b204e9800998ecf8427e  filename1

<span class="token comment"># 校验和</span>
$ md5sum filename <span class="token operator">&gt;</span> file_sum.md5
$ md5sum <span class="token parameter variable">-c</span> file_sum.md5
filename: OK
$ <span class="token builtin class-name">echo</span> a <span class="token operator">&gt;&gt;</span> filename
$ md5sum <span class="token parameter variable">-c</span> file_sum.md5
filename: FAILED
md5sum: WARNING: <span class="token number">1</span> computed checksum did NOT match
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对目录校验</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成校验文件</span>
<span class="token comment"># 方式一： 使用 md5deep/sha1deep（需要安装）</span>
uv01@lpc19:~$ ll <span class="token builtin class-name">test</span>
total <span class="token number">20</span>
drwxr-xr-x <span class="token number">2</span> uv01 uv01 <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:40 ./
drwxr-x--- <span class="token number">4</span> uv01 uv01 <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:46 <span class="token punctuation">..</span>/
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">43</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:20 file_sum.md5
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">44</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:26 file_sum1.md5
-rw-r--r-- <span class="token number">1</span> uv01 uv01    <span class="token number">2</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:20 filename
-rw-r--r-- <span class="token number">1</span> uv01 uv01    <span class="token number">0</span> Mar  <span class="token number">2</span> <span class="token number">11</span>:17 filename1
uv01@lpc19:~$ md5deep <span class="token parameter variable">-rl</span> test/ <span class="token operator">&gt;</span> test.md5
uv01@lpc19:~$ <span class="token function">cat</span> test.md5
d41d8cd98f00b204e9800998ecf8427e  test/filename1
e914786832e3689d3ccec80c0689ed64  test/file_sum.md5
60b725f10c9c85c70d97880dfe8191b3  test/filename
3152d0d707b419f8291d55de09ef4b0a  test/file_sum1.md5
uv01@lpc19:~$ md5sum <span class="token parameter variable">-c</span> test.md5
test/filename1: OK
test/file_sum.md5: OK
test/filename: OK
test/file_sum1.md5: OK

<span class="token comment"># 方式二： 使用 find 命令</span>
<span class="token function">find</span> test/ <span class="token parameter variable">-type</span> f <span class="token parameter variable">-print0</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-0</span> md5sum <span class="token operator">&gt;&gt;</span> test.md5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分割文件和数据" tabindex="-1"><a class="header-anchor" href="#分割文件和数据" aria-hidden="true">#</a> 分割文件和数据</h3><p>在某些情况下，必须把文件分割成多个更小的片段，比如提高可读性、生成日志等。</p><h4 id="split" tabindex="-1"><a class="header-anchor" href="#split" aria-hidden="true">#</a> split</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成指定大小的文件</span>
$ <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">bs</span><span class="token operator">=</span>100k <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">of</span><span class="token operator">=</span>data.file <span class="token comment"># 创建一个内容全是0的文件</span>
<span class="token number">1</span>+0 records <span class="token keyword">in</span>
<span class="token number">1</span>+0 records out
<span class="token number">102400</span> bytes <span class="token punctuation">(</span><span class="token number">102</span> kB, <span class="token number">100</span> KiB<span class="token punctuation">)</span> copied, <span class="token number">0.00106122</span> s, <span class="token number">96.5</span> MB/s

<span class="token comment"># 分割文件</span>
<span class="token comment"># -b 按大小划分</span>
<span class="token comment">#     k KB</span>
<span class="token comment">#     M MB</span>
<span class="token comment">#     G GB</span>
<span class="token comment">#     c byte</span>
<span class="token comment">#     w word</span>
<span class="token comment"># -l 按行数划分</span>
$ <span class="token function">split</span> <span class="token parameter variable">-b</span> 10k data.file
$ <span class="token function">ls</span>
data.file  xaa  xab  xac  xad  xae  xaf  xag  xah  xai  xaj <span class="token comment"># 默认以字母为后缀</span>
<span class="token comment"># -d 以数字为后缀</span>
<span class="token comment"># -a num 指定后缀长度</span>
$ <span class="token function">split</span> <span class="token parameter variable">-b</span> 10k data.file <span class="token parameter variable">-d</span> <span class="token parameter variable">-a</span> <span class="token number">4</span>
$ <span class="token function">ls</span>
data.file  x0001  x0003  x0005  x0007  x0009  xab  xad  xaf  xah  xaj
x0000      x0002  x0004  x0006  x0008  xaa    xac  xae  xag  xai
<span class="token comment"># 指定前缀</span>
<span class="token comment"># split [OPTION]... [FILE [PREFIX]]</span>
$ <span class="token function">split</span> <span class="token parameter variable">-b</span> 10k data.file split_file
$ <span class="token function">ls</span>
data.file     split_fileac  split_fileaf  split_fileai  x0001  x0004  x0007  xaa  xad  xag  xaj
split_fileaa  split_filead  split_fileag  split_fileaj  x0002  x0005  x0008  xab  xae  xah
split_fileab  split_fileae  split_fileah  x0000         x0003  x0006  x0009  xac  xaf  xai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="csplit" tabindex="-1"><a class="header-anchor" href="#csplit" aria-hidden="true">#</a> csplit</h4><p>split 只能根据文件大小或者行数划分文件，csplit 可以根据关键字划分文件。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> server.log
server-1
<span class="token number">111111111111</span>
server-2
<span class="token number">222222222222</span>
server-3
<span class="token number">333333333333</span>
$ <span class="token function">csplit</span> server.log /server/ <span class="token punctuation">{</span>*<span class="token punctuation">}</span> <span class="token parameter variable">-n</span> <span class="token number">10</span> <span class="token parameter variable">-f</span> server <span class="token parameter variable">-b</span> <span class="token string">&quot;%02d.log&quot;</span> <span class="token parameter variable">-s</span>
<span class="token comment"># {*} 表示重复执行分割，直到文件末尾 {整数}=分割行的次数</span>
<span class="token comment"># -n 后缀的数字个数，如 01 02 03</span>
<span class="token comment"># -f 前缀</span>
<span class="token comment"># -b 后缀</span>
<span class="token comment"># -s 静默模式</span>
$ ll
total <span class="token number">24</span>
drwxr-xr-x <span class="token number">2</span> uv01 uv01 <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:52 ./
drwxr-xr-x <span class="token number">4</span> uv01 uv01 <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:49 <span class="token punctuation">..</span>/
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">66</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:50 server.log
-rw-r--r-- <span class="token number">1</span> uv01 uv01    <span class="token number">0</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:52 server00.log
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">22</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:52 server01.log
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">22</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:52 server02.log
-rw-r--r-- <span class="token number">1</span> uv01 uv01   <span class="token number">22</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:52 server03.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="临时文件" tabindex="-1"><a class="header-anchor" href="#临时文件" aria-hidden="true">#</a> 临时文件</h3><p>linux 中 <code>/tmp</code> 中的内容会在系统重启后被清空，所以这个路径适合存放临时文件。</p><p><code>tempfile</code> （只有 debian 系列中才有，且该工具已废弃，因改用 <code>mktemp</code> 工具）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tempfile
WARNING: tempfile is deprecated<span class="token punctuation">;</span> consider using mktemp instead.
/tmp/filei2TnrT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随机文件名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 可使用 \`$RANDOM\` 创建</span>
<span class="token assign-left variable">temp_file</span><span class="token operator">=</span><span class="token string">&quot;/tmp/file-<span class="token environment constant">$RANDOM</span>&quot;</span>
<span class="token comment"># 也可使用下面命令</span>
<span class="token comment"># 这里 $$ 表示当前运行中的 PID</span>
<span class="token assign-left variable">temp_file</span><span class="token operator">=</span><span class="token string">&quot;/tmp/var.<span class="token variable">$$</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调试" tabindex="-1"><a class="header-anchor" href="#调试" aria-hidden="true">#</a> 调试</h2><ul><li><code>bash -n</code> 不执行，检查语法</li><li><code>bash -v</code> 将脚本内容打印到屏幕，再执行</li><li><code>bash +v</code> 禁止打印输入</li><li><code>bash -x</code> 将脚本内容和输出都打印到屏幕，再执行</li><li><code>bash +x</code> 关闭调试</li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>上述时命令行执行时添加（shebang方式）的形式。另外也可以在脚本文件中添加上诉参数。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> <span class="token parameter variable">-xe</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><ul><li><code>:</code> 不执行任何操作</li><li>自定义调试方法<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">function</span> <span class="token function-name function">DEBUG</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$_DEBUG</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;on&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$@</span> <span class="token operator">||</span> <span class="token builtin class-name">:</span>
<span class="token punctuation">}</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  DEBUG <span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>e.g. 扫描机器是否在线</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">1</span> <span class="token number">254</span><span class="token variable">\`</span></span>
<span class="token keyword">do</span>
  <span class="token function">ping</span> <span class="token parameter variable">-c2</span> <span class="token number">192.168</span>.20.<span class="token variable">$i</span> <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;192.168.20.<span class="token variable">$i</span> is online&quot;</span> <span class="token operator">&gt;&gt;</span> node_online.txt
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;192.168.20.<span class="token variable">$i</span> is offline&quot;</span> <span class="token operator">&gt;&gt;</span> node_offline.txt
  <span class="token keyword">fi</span>
<span class="token keyword">done</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>e.g. 监控主机磁盘：如果主机磁盘分区使用超过80%，则报警。<br> 假设被监控主机ip列表存放再文件<code>/tmp/hosts</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token assign-left variable">hostfile</span><span class="token operator">=</span>/tmp/hosts
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">wc</span> <span class="token parameter variable">-l</span> $hostfile <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span> <span class="token parameter variable">-d</span> <span class="token string">&#39; &#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-lt</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> $hostfile<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token function">ssh</span> <span class="token variable">$i</span> <span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;^/dev/&#39;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1,$5}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> -d% <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if ($2 &gt; 80) print $0}&#39;</span> <span class="token operator">&gt;</span>  disk.log
  <span class="token assign-left variable">str</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> disk.log<span class="token variable">\`</span></span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">\${str}</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cat</span> disk.log <span class="token operator">|</span> mail <span class="token parameter variable">-s</span> <span class="token string">&quot;<span class="token variable">$i</span>: disk is greater than 80%&quot;</span> root@localhost
  <span class="token keyword">fi</span> 
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="终端处理工具" tabindex="-1"><a class="header-anchor" href="#终端处理工具" aria-hidden="true">#</a> 终端处理工具</h2><h3 id="tput" tabindex="-1"><a class="header-anchor" href="#tput" aria-hidden="true">#</a> tput</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 终端列数、行数</span>
$ tput cols <span class="token comment"># 120</span>
$ tput lines <span class="token comment"># 30</span>
<span class="token comment"># 打印当前终端名称</span>
$ tput longname <span class="token comment"># xterm with 256 colors</span>

<span class="token comment"># 将光标位置移动</span>
$ tput cup <span class="token number">100</span> <span class="token number">100</span> <span class="token comment"># 移动</span>
$ tput cup <span class="token number">0</span> <span class="token number">0</span>     <span class="token comment"># 复原</span>
<span class="token comment"># 删除光标到行尾的内容</span>
$ tput ed

<span class="token comment"># 设置终端背景色</span>
$ tput setb no <span class="token comment"># no值可以在0~7之间</span>
<span class="token comment"># 设置文本样式为粗体</span>
$ tput bold
<span class="token comment"># 设置下划线的开关</span>
$ tput smul
$ tput rmul
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>计时</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> Count:
tput sc <span class="token comment"># 保留光标当前的位置</span>

<span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$count</span> <span class="token parameter variable">-lt</span> <span class="token number">40</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">let</span> count++<span class="token punctuation">;</span>
    <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span>
    tput rc <span class="token comment"># 回到sc保存的位置</span>
    tput ed <span class="token comment"># 删除光标到行尾的内容</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token variable">$count</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span> 
    <span class="token builtin class-name">exit</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stty" tabindex="-1"><a class="header-anchor" href="#stty" aria-hidden="true">#</a> stty</h3><p>在输入密码时，不能让输入的内容显示出来</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#Filename: password.sh</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;Enter password: &quot;</span>
stty <span class="token parameter variable">-echo</span>
<span class="token builtin class-name">read</span> password
stty <span class="token builtin class-name">echo</span>
<span class="token builtin class-name">echo</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;password read&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="终端控制-fg、bg、jobs、-、nohup" tabindex="-1"><a class="header-anchor" href="#终端控制-fg、bg、jobs、-、nohup" aria-hidden="true">#</a> 终端控制 fg、bg、jobs、&amp;、nohup</h2><ul><li><p><code>&amp;</code> —— 在后台运行任务，随会话结束结束 | e.g. <code>sleep 111 &amp;</code></p></li><li><p><code>nohup</code> —— 在后台运行任务，不随会话结束结束 | e.g. <code>nohup sleep 111 &amp;</code></p></li><li><p><code>jobs</code> —— 查看后台运行情况</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-l</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>fg %jobnumber</code> —— 将job调至前台</p></li><li><p><code>Ctrl + Z</code> —— 将前台任务调至后台，并且暂停任务</p></li><li><p><code>bg %jobnumber</code> —— 将后台暂停任务继续运行</p></li><li><p><code>kill %num &lt;pid&gt;</code> —— 结束任务</p></li></ul><h2 id="交互自动化" tabindex="-1"><a class="header-anchor" href="#交互自动化" aria-hidden="true">#</a> 交互自动化</h2><p>交互命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># interactive.sh</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;Enter number:&quot;</span> no
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;Enter name:&quot;</span> name
<span class="token builtin class-name">echo</span> You have entered <span class="token variable">$no</span>, <span class="token variable">$name</span>

<span class="token function">chmod</span> +x interactive.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管道输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;1<span class="token entity" title="\\n">\\n</span>hello<span class="token entity" title="\\n">\\n</span>&quot;</span> <span class="token operator">|</span> ./interactive.sh
You have entered <span class="token number">1</span>, hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>文件输入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> input.data
<span class="token number">1</span>
hello
$ ./interactive.sh <span class="token operator">&lt;</span> input.data
You have entered <span class="token number">1</span>, hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>expect 交互自动化工具，但是并没有附带与多数常见linux系统中，即需要下载！</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/expect</span>
<span class="token comment"># automate_expect.sh</span>

<span class="token comment"># 指定需要自动化哪个命令</span>
spawn ./interactive.sh
<span class="token comment"># 提供需要等待的消息</span>
<span class="token function">expect</span> <span class="token string">&quot;Enter number:&quot;</span>
<span class="token comment"># 要发送的消息</span>
send <span class="token string">&quot;1<span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">expect</span> <span class="token string">&quot;Enter name:&quot;</span>
send <span class="token string">&quot;hello<span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token comment"># 指明命令交互结束</span>
<span class="token function">expect</span> eof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">chmod</span> +x automate_expect.sh
$ ./automate_expect.sh
spawn ./interactive.sh
Enter number:1
Enter name:hello
You have entered <span class="token number">1</span>, hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2><h3 id="收集系统信息" tabindex="-1"><a class="header-anchor" href="#收集系统信息" aria-hidden="true">#</a> 收集系统信息</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;hostname is: &quot;</span><span class="token punctuation">;</span> <span class="token function">hostname</span>
<span class="token comment"># cpu、内存</span>
lscpu<span class="token punctuation">;</span> <span class="token function">free</span>
<span class="token comment"># 网络设备、连接</span>
<span class="token function">ip</span> <span class="token function">link</span><span class="token punctuation">;</span> <span class="token function">ip</span> a
<span class="token comment"># 块情况（设备、挂载）、文件系统情况（文件系统、挂载）</span>
lsblk<span class="token punctuation">;</span> <span class="token function">df</span>
<span class="token comment"># Report virtual memory statistics</span>
<span class="token function">vmstat</span> <span class="token number">2</span> <span class="token number">5</span>
<span class="token comment"># 进程情况，每2s检查一次，共检查5次</span>
<span class="token function">top</span> <span class="token parameter variable">-n</span> <span class="token number">5</span> <span class="token parameter variable">-d</span> <span class="token number">2</span>
sar <span class="token parameter variable">-n</span> DEV <span class="token parameter variable">-p</span> <span class="token number">2</span> <span class="token number">5</span>
sar <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">2</span> <span class="token number">5</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,98),b={href:"https://zhuanlan.zhihu.com/p/625392303",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="自动化部署web项目脚本" tabindex="-1"><a class="header-anchor" href="#自动化部署web项目脚本" aria-hidden="true">#</a> 自动化部署Web项目脚本</h3><p>用于自动化部署一个 Node.js 项目。脚本假设已经在服务器上安装了 Git、Node.js、npm、pm2 和 Nginx 等必要的工具和服务。 该脚本执行以下步骤：</p><ol><li>定义了一些变量，包括项目名称、Git 仓库地址、项目路径等。</li><li>检查项目目录是否存在，如果存在则删除。</li><li>克隆代码到指定目录。</li><li>进入项目目录，安装依赖。</li><li>构建项目代码。</li><li>启动项目。</li><li>配置 Nginx 反向代理。</li><li>检查 Nginx 配置是否正确，如果正确，则启用配置并重启 Nginx；否则，恢复原有状态并输出错误信息。</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 定义变量</span>
<span class="token assign-left variable">project_name</span><span class="token operator">=</span><span class="token string">&quot;my-project&quot;</span>
<span class="token assign-left variable">git_repo</span><span class="token operator">=</span><span class="token string">&quot;https://github.com/username/my-project.git&quot;</span>
<span class="token assign-left variable">project_dir</span><span class="token operator">=</span><span class="token string">&quot;/var/www/html/my-project&quot;</span>

<span class="token comment"># 检查目录是否存在</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;<span class="token variable">$project_dir</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Project directory already exists. Removing...&quot;</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$project_dir</span>
<span class="token keyword">fi</span>

<span class="token comment"># 克隆代码</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Cloning project from Git repo...&quot;</span>
<span class="token function">git</span> clone <span class="token variable">$git_repo</span> <span class="token variable">$project_dir</span>

<span class="token comment"># 切换到项目目录</span>
<span class="token builtin class-name">cd</span> <span class="token variable">$project_dir</span> <span class="token operator">||</span> <span class="token builtin class-name">exit</span>

<span class="token comment"># 安装依赖</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Installing dependencies...&quot;</span>
<span class="token function">npm</span> <span class="token function">install</span>

<span class="token comment"># 构建代码</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Building project...&quot;</span>
<span class="token function">npm</span> run build

<span class="token comment"># 启动项目</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Starting project...&quot;</span>
pm2 start server.js <span class="token parameter variable">--name</span> <span class="token variable">$project_name</span>

<span class="token comment"># 配置 Nginx 反向代理</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Configuring Nginx...&quot;</span>
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/nginx/sites-available/<span class="token variable">$project_name</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
server {
    listen 80;
    server_name test.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\<span class="token variable">$http_upgrade</span>;
        proxy_set_header Connection &#39;upgrade&#39;;
        proxy_set_header Host \\<span class="token variable">$host</span>;
        proxy_cache_bypass \\<span class="token variable">$http_upgrade</span>;
    }
}
EOF</span>

<span class="token comment"># 检查 Nginx 配置是否正确</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Checking Nginx configuration...&quot;</span>
<span class="token keyword">if</span> <span class="token function">sudo</span> nginx -t<span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment"># 如果配置无误，启用配置并重启 Nginx</span>
    <span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/nginx/sites-available/<span class="token variable">$project_name</span> /etc/nginx/sites-enabled/
    <span class="token function">sudo</span> systemctl restart nginx
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Deployment complete!&quot;</span>
<span class="token keyword">else</span>
    <span class="token comment"># 如果配置有误，恢复原有状态</span>
    <span class="token function">sudo</span> <span class="token function">rm</span> /etc/nginx/sites-available/<span class="token variable">$project_name</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$project_dir</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Nginx configuration is invalid. Deployment failed.&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><ul><li>《Linux Shell Scripting Cookbook》 by Sarath Lakshman | 译-中 《Linux Shell 脚本攻略》 by 门佳</li></ul>`,6);function h(g,f){const l=a("RouterLink"),t=a("ExternalLinkIcon");return c(),o("div",null,[u,m,n("p",null,[e(l,{to:"/dev/shell/syntax.html"},{default:r(()=>[s("link")]),_:1})]),v,n("p",null,[s("todo "),n("a",b,[s("https://zhuanlan.zhihu.com/p/625392303"),e(t)])]),k])}const _=p(d,[["render",h],["__file","index.html.vue"]]);export{_ as default};
