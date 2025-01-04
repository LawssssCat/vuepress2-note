import{_ as o,r as t,o as p,c,a as n,b as s,d as e,e as l}from"./app-01e1299e.js";const r={},i=n("h2",{id:"sql",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#sql","aria-hidden":"true"},"#"),s(" SQL")],-1),d=n("br",null,null,-1),k={href:"https://www.bilibili.com/video/BV1UE41147KC/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://zhuanlan.zhihu.com/p/123170975",target:"_blank",rel:"noopener noreferrer"},_=l(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> 学号<span class="token punctuation">,</span>班级<span class="token punctuation">,</span>成绩<span class="token punctuation">,</span>rank<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> 成绩 <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> ranking<span class="token punctuation">,</span> 
dense_rank<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> 成绩 <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> dese_rank<span class="token punctuation">,</span>
row_number<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> 成绩 <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> row_num
<span class="token keyword">from</span> 班级表<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function h(w,m){const a=t("ExternalLinkIcon");return p(),c("div",null,[i,n("p",null,[s("【中字】SQL进阶教程 | 史上最易懂SQL教程！10小时零基础成长SQL大师！！ "),d,n("a",k,[s("https://www.bilibili.com/video/BV1UE41147KC/"),e(a)])]),n("p",null,[s("窗口函数 "),n("a",u,[s("https://zhuanlan.zhihu.com/p/123170975"),e(a)])]),_])}const y=o(r,[["render",h],["__file","index.html.vue"]]);export{y as default};