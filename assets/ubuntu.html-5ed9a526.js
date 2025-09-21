import{_ as e,r as t,o as i,c as r,a as s,b as n,d as u,e as l}from"./app-04e6f892.js";const c={},o=s("h2",{id:"更换镜像源",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#更换镜像源","aria-hidden":"true"},"#"),n(" 更换镜像源")],-1),p=s("h3",{id:"国内",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#国内","aria-hidden":"true"},"#"),n(" 国内")],-1),d={href:"https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/",target:"_blank",rel:"noopener noreferrer"},m=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">uname</span> <span class="token parameter variable">-a</span>
Linux lpc19 <span class="token number">5.10</span>.16.3-microsoft-standard-WSL2 <span class="token comment">#1 SMP Fri Apr 2 22:23:49 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux</span>
$ <span class="token function">cat</span> /etc/os-release
<span class="token assign-left variable">PRETTY_NAME</span><span class="token operator">=</span><span class="token string">&quot;Ubuntu 22.04.3 LTS&quot;</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;Ubuntu&quot;</span>
<span class="token assign-left variable">VERSION_ID</span><span class="token operator">=</span><span class="token string">&quot;22.04&quot;</span>
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">&quot;22.04.3 LTS (Jammy Jellyfish)&quot;</span>
<span class="token assign-left variable">VERSION_CODENAME</span><span class="token operator">=</span>jammy
<span class="token assign-left variable">ID</span><span class="token operator">=</span>ubuntu
<span class="token assign-left variable">ID_LIKE</span><span class="token operator">=</span>debian
<span class="token assign-left variable">HOME_URL</span><span class="token operator">=</span><span class="token string">&quot;https://www.ubuntu.com/&quot;</span>
<span class="token assign-left variable">SUPPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://help.ubuntu.com/&quot;</span>
<span class="token assign-left variable">BUG_REPORT_URL</span><span class="token operator">=</span><span class="token string">&quot;https://bugs.launchpad.net/ubuntu/&quot;</span>
<span class="token assign-left variable">PRIVACY_POLICY_URL</span><span class="token operator">=</span><span class="token string">&quot;https://www.ubuntu.com/legal/terms-and-policies/privacy-policy&quot;</span>
<span class="token assign-left variable">UBUNTU_CODENAME</span><span class="token operator">=</span>jammy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> /etc/apt/sources.list /etc/apt/sources.list.bak
$ <span class="token function">cat</span> /etc/apt/sources.list
<span class="token comment"># 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

<span class="token comment"># 预发布软件源，不建议启用</span>
<span class="token comment"># deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse</span>
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse</span>
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token comment"># sudo apt-get upgrade</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(b,h){const a=t("ExternalLinkIcon");return i(),r("div",null,[o,p,s("p",null,[s("a",d,[n("https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/"),u(a)])]),m])}const g=e(c,[["render",v],["__file","ubuntu.html.vue"]]);export{g as default};
