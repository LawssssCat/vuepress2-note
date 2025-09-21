import{_ as a,r as i,o as l,c as t,a as n,b as e,d as o,e as c}from"./app-04e6f892.js";const r={},d={href:"https://jupyterf.org/",target:"_blank",rel:"noopener noreferrer"},p=c(`<ul><li>iPython —— 为 Python 用户提供一个更好用的 Shell 环境。同时支持 Shell 支持原生指令和 Python 功能</li><li>todo iPython (jupyter) Notebook</li><li>todo jupyter 提供了一个简单的单机服务器。通过浏览器在本地计算机中即可创建程序执行模块，还可以重复使用之前设计的程序片段</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install ipython
pip install jupyter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ipython" tabindex="-1"><a class="header-anchor" href="#ipython" aria-hidden="true">#</a> iPython</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入</span>
ipython
<span class="token comment"># 执行系统命令</span>
<span class="token function">ls</span>
<span class="token comment"># 执行python命令</span>
print<span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 创建文件，记录执行过程，方便后续复用命令</span>
edit <span class="token number">3</span>-1.py

<span class="token comment"># 指引</span>
quickref

<span class="token comment"># 查看 % 开头的增强版命令</span>
%lsmagic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo</p>`,5);function u(m,v){const s=i("ExternalLinkIcon");return l(),t("div",null,[n("p",null,[e("官网： "),n("a",d,[e("https://jupyterf.org/"),o(s)])]),p])}const b=a(r,[["render",u],["__file","jupyter.html.vue"]]);export{b as default};
