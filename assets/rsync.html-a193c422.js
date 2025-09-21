import{_ as n,o as a,c as s,e}from"./app-04e6f892.js";const i={},t=e(`<p><code>remote synchronize</code></p><p>features</p><ul><li>可以实现跨平台、全量、增量、本地、远程数据同步备份</li><li>同步数据镜像时，通过“quick check”算法，仅同步大小、最后修改时间发生变化的文件、目录 <ul><li>当然，也可以根据权限、属主等属性变化进行同步</li></ul></li></ul><h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>shell模式：使用ssh程序传送

<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. SRC DEST
<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. SRC <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST:DEST
<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST:SRC DEST

daemon模式：使用tcp连接rsync daemon。需要远程机器上开启了rsync daemon，默认端口873

<span class="token function">rsync</span> <span class="token parameter variable">--daemon</span>
<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST::SRC DEST
<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. SRC <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST::DEST
<span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">]</span><span class="token punctuation">..</span>. rsync://<span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST<span class="token punctuation">[</span>:PORT<span class="token punctuation">]</span>/SRC <span class="token punctuation">[</span>DEST<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-n</span> 执行一次空运行。不做任何改变，但是会显示与真实执行一样的结果。可用于在正真执行前，严查命令是否正确。
<span class="token parameter variable">-v</span> verbose
<span class="token parameter variable">-a</span> <span class="token string">&quot;archive mode&quot;</span> 会启用下面参数： equals <span class="token parameter variable">-rlptgoD</span>
    <span class="token parameter variable">-r</span> 递归 
    <span class="token parameter variable">-l</span> 同步软链接
    <span class="token parameter variable">-H</span> 同步硬链接
    <span class="token parameter variable">-D</span> 同步设备文件
    <span class="token parameter variable">-p</span> 保留权限
    <span class="token parameter variable">-o</span> 保留所有者
    <span class="token parameter variable">-g</span> 保留所属组
    <span class="token parameter variable">-t</span> 保留时间戳
<span class="token parameter variable">-A</span> 同步时保留ACLs内容
<span class="token parameter variable">-X</span> 同步时保留selinux内容
<span class="token parameter variable">--delete</span> 同步删除（删除目标文件夹中无关的内容）

     <span class="token parameter variable">--iconv</span><span class="token operator">=</span>CONVERT_SPEC    request charset conversion of filenames

 -z, <span class="token parameter variable">--compress</span>              compress <span class="token function">file</span> data during the transfer
 -h, --human-readable        output numbers <span class="token keyword">in</span> a human-readable <span class="token function">format</span>
     <span class="token parameter variable">--progress</span>              show progress during transfer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rsync</span> <span class="token parameter variable">-a</span> file/photo/ secret/photo/ <span class="token parameter variable">-nv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="问题-file-name-too-long" tabindex="-1"><a class="header-anchor" href="#问题-file-name-too-long" aria-hidden="true">#</a> 问题：File name too long</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--iconv</span><span class="token operator">=</span>utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="实时同步" tabindex="-1"><a class="header-anchor" href="#实时同步" aria-hidden="true">#</a> 实时同步</h2><p>要实现实时同步，需要在目标机器上开启一个后台进程，实时监听某一个具体文件或目录的变化（增加、删除、修改）</p><ul><li>inotify</li><li>sersync</li></ul>`,14),l=[t];function p(c,r){return a(),s("div",null,l)}const u=n(i,[["render",p],["__file","rsync.html.vue"]]);export{u as default};
