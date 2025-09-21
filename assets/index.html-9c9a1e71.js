import{_ as d,r as l,o as k,c as v,a as n,b as s,d as a,w as t,t as o,e as c}from"./app-04e6f892.js";const m={},h={href:"https://v2.vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},g=n("br",null,null,-1),b={href:"https://github.com/vuepress/awesome-vuepress",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"视频教程：",-1),_={href:"https://www.bilibili.com/video/BV1vb411m7NY",target:"_blank",rel:"noopener noreferrer"},w=n("p",null,"博客/主题：",-1),y={href:"https://docs.shanyuhai.top/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://artiely.github.io/",target:"_blank",rel:"noopener noreferrer"},q=n("h2",{id:"样式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#样式","aria-hidden":"true"},"#"),s(" 样式")],-1),j=n("p",null,"默认主题使用 SASS 作为 CSS 预处理器。",-1),C=n("p",null,"用户可以通过 palette 文件 来自定义样式变量，还可以通过 style 文件 来添加额外的样式。",-1),E={href:"https://ecosystem.vuejs.press/zh/themes/default/styles.html",target:"_blank",rel:"noopener noreferrer"},P=n("h2",{id:"内置功能-默认主题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#内置功能-默认主题","aria-hidden":"true"},"#"),s(" 内置功能（默认主题）")],-1),L=n("h3",{id:"内置组件-提示框",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#内置组件-提示框","aria-hidden":"true"},"#"),s(" 内置组件 - 提示框")],-1),A={href:"https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8",target:"_blank",rel:"noopener noreferrer"},D=c(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

::: v-pre
<span class="token code-snippet code keyword">\`{{ This will be displayed as-is }}\`</span>
:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>这是一个提示</p></div><div class="custom-container warning"><p class="custom-container-title">注意</p><p>这是一个警告</p></div><div class="custom-container danger"><p class="custom-container-title">警告</p><p>这是一个危险警告</p></div><details class="custom-container details"><p>这是一个 details 标签</p></details><p>::: v-pre <code>{{ This will be displayed as-is }}</code> :::</p><h3 id="内置组件-代码引用" tabindex="-1"><a class="header-anchor" href="#内置组件-代码引用" aria-hidden="true">#</a> 内置组件 - 代码引用</h3><p>其中 <code>@code/java</code> 为用户配置内容（配置在 <code>.vuepress/config.ts</code> 中）</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>@[code](@code/java/main/java/org/example/algorithm/SortBubble.java)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><p>可以引用文件内容作为代码块</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>example<span class="token punctuation">.</span>algorithm</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 冒泡排序
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SortBubble</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">SortFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> swapped<span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            swapped <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    swapped <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token class-name">T</span> t <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                    arr<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> t<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            n<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>swapped<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="内置组件-badge" tabindex="-1"><a class="header-anchor" href="#内置组件-badge" aria-hidden="true">#</a> 内置组件 - Badge</h3>`,11),O={href:"https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#badge",target:"_blank",rel:"noopener noreferrer"},S=c(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tip<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>v2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>top<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>warning<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>v2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>middle<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>danger<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>v2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bottom<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),B=n("h3",{id:"内置组件-codegroup",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#内置组件-codegroup","aria-hidden":"true"},"#"),s(" 内置组件 - CodeGroup")],-1),N={href:"https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#codegroup",target:"_blank",rel:"noopener noreferrer"},V=c(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroup</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroupItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>PNPM<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash:no-line-numbers</span>
<span class="token code-block language-bash language-bash language-bash"><span class="token function">pnpm</span> <span class="token function">install</span></span>
<span class="token punctuation">\`\`\`</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroupItem</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroupItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>YARN<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash:no-line-numbers</span>
<span class="token code-block language-bash language-bash language-bash"><span class="token function">yarn</span> <span class="token function">install</span></span>
<span class="token punctuation">\`\`\`</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroupItem</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroupItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>NPM<span class="token punctuation">&quot;</span></span> <span class="token attr-name">active</span><span class="token punctuation">&gt;</span></span>

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash:no-line-numbers</span>
<span class="token code-block language-bash language-bash language-bash"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="token punctuation">\`\`\`</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroupItem</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroup</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),I=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"pnpm"),s(),n("span",{class:"token function"},"install"),s(`
`)])])],-1),z=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),s(),n("span",{class:"token function"},"install"),s(`
`)])])],-1),M=n("div",{class:"language-bash","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),s(),n("span",{class:"token function"},"install"),s(`
`)])])],-1),G=n("h3",{id:"内置组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#内置组件","aria-hidden":"true"},"#"),s(" 内置组件 - "),n("code",null,"@[...](...)")],-1),T={href:"https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97",target:"_blank",rel:"noopener noreferrer"},R=c(`<p>插入文件作为代码块 （拆分文件，方便编辑、统计和复用）</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 最简单的语法 --&gt;</span>
@<span class="token url">[<span class="token content">code</span>](<span class="token url">../foo.js</span>)</span>
<span class="token comment">&lt;!-- 仅导入第 1 行至第 10 行 --&gt;</span>
@<span class="token url">[<span class="token content">code{1-10}</span>](<span class="token url">../foo.js</span>)</span>
<span class="token comment">&lt;!-- 指定代码语言 --&gt;</span>
@<span class="token url">[<span class="token content">code js</span>](<span class="token url">../foo.js</span>)</span>
<span class="token comment">&lt;!-- 行高亮 --&gt;</span>
@<span class="token url">[<span class="token content">code js{2,4-5}</span>](<span class="token url">../foo.js</span>)</span>
@<span class="token url">[<span class="token content">code{3-10} js{3}:no-line-numbers</span>](<span class="token url">../foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义路径</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> getDirname<span class="token punctuation">,</span> path <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/utils&#39;</span>

<span class="token keyword">const</span> __dirname <span class="token operator">=</span> <span class="token function">getDirname</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">importCode</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">handleImportPath</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^@src</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;path/to/src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token comment">&lt;!-- 会被解析至 &#39;path/to/src/foo.js&#39; --&gt;</span>
@<span class="token url">[<span class="token content">code</span>](<span class="token url">@src/foo.js</span>)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-数据-data" tabindex="-1"><a class="header-anchor" href="#使用-数据-data" aria-hidden="true">#</a> 使用 “数据” （data）</h2><p>todo 有没这功能？要查一下。</p><h2 id="vuepress-2-x-配置-mermaid" tabindex="-1"><a class="header-anchor" href="#vuepress-2-x-配置-mermaid" aria-hidden="true">#</a> Vuepress 2.x 配置 Mermaid</h2>`,8),J={href:"https://mermaid.nodejs.cn/",target:"_blank",rel:"noopener noreferrer"},F={href:"https://github.com/eFrane/vuepress-plugin-mermaidjs",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://www.techgrow.cn/posts/bc19d204.html",target:"_blank",rel:"noopener noreferrer"},H=c(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> mermaid <span class="token parameter variable">-D</span>
<span class="token function">npm</span> <span class="token function">install</span> @vuepress/plugin-register-components@next <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> @vuepress/utils <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编辑 <code>.vuepress/config.ts</code> 文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> registerComponentsPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/plugin-register-components&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getDirname<span class="token punctuation">,</span> path <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/utils&#39;</span>
<span class="token keyword">const</span> __dirname <span class="token operator">=</span> <span class="token function">getDirname</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">registerComponentsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">componentsDir</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./components&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的自定义组件目录下，创建 <code>mermaid.vue</code> 源文件，例如源文件路径为 <code>.vuepress/components/mermaid.vue</code>，文件的内容如下：</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mermaid<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;mermaid/dist/mermaid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      m<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">startOnLoad</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      m<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">updated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;mermaid/dist/mermaid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      m<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">startOnLoad</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      m<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Markdown 渲染 - 语法说明 <br> 在 MarkDown 文件内添加 <code>&lt;mermaid&gt;</code> 标签，Mermaid 的内容需要使用 <code>{{ ... }}</code> 包裹住，并写在 <code>&lt;mermaid&gt;</code> 标签内（如下所示）。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>特别注意，<code>&lt;mermaid&gt;</code> 标签内不允许存在空行。</p></div><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mermaid</span><span class="token punctuation">&gt;</span></span>
{{\`
  ......（Mermaid 的内容）
\`}}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mermaid</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h3><h4 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h4>`,11),U=n("h4",{id:"时序图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#时序图","aria-hidden":"true"},"#"),s(" 时序图")],-1),Z=n("h4",{id:"饼图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#饼图","aria-hidden":"true"},"#"),s(" 饼图")],-1),K=n("h4",{id:"类别图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#类别图","aria-hidden":"true"},"#"),s(" 类别图")],-1),X=n("h4",{id:"甘特图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#甘特图","aria-hidden":"true"},"#"),s(" 甘特图")],-1),Q=n("h4",{id:"状态图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#状态图","aria-hidden":"true"},"#"),s(" 状态图")],-1),W=n("h4",{id:"实体关系图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实体关系图","aria-hidden":"true"},"#"),s(" 实体关系图")],-1);function $(nn,sn){const e=l("ExternalLinkIcon"),i=l("Badge"),u=l("CodeGroupItem"),r=l("CodeGroup"),p=l("mermaid");return k(),v("div",null,[n("p",null,[s("官网（vuepress-next）： "),n("a",h,[s("https://v2.vuepress.vuejs.org/zh/"),a(e)]),s(),g,s(" awesome-vuepress： "),n("a",b,[s("https://github.com/vuepress/awesome-vuepress"),a(e)])]),f,n("ul",null,[n("li",null,[s("【啰里啰嗦】一步步搭建 VuePress 及优化 - "),n("a",_,[s("https://www.bilibili.com/video/BV1vb411m7NY"),a(e)]),s(" （快速上手）")])]),w,n("ul",null,[n("li",null,[s("内容不错 - "),n("a",y,[s("https://docs.shanyuhai.top/"),a(e)])]),n("li",null,[s("太花哨，但牛逼 - "),n("a",x,[s("https://artiely.github.io/"),a(e)])])]),q,j,C,n("p",null,[n("a",E,[s("https://ecosystem.vuejs.press/zh/themes/default/styles.html"),a(e)])]),P,L,n("p",null,[n("a",A,[s("https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html#自定义容器"),a(e)])]),D,n("p",null,[n("a",O,[s("https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#badge"),a(e)])]),S,n("ul",null,[n("li",null,[s("VuePress - "),a(i,{type:"tip",text:"v2",vertical:"top"})]),n("li",null,[s("VuePress - "),a(i,{type:"warning",text:"v2",vertical:"middle"})]),n("li",null,[s("VuePress - "),a(i,{type:"danger",text:"v2",vertical:"bottom"})])]),B,n("p",null,[n("a",N,[s("https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#codegroup"),a(e)])]),V,a(r,null,{default:t(()=>[a(u,{title:"PNPM"},{default:t(()=>[I]),_:1}),a(u,{title:"YARN"},{default:t(()=>[z]),_:1}),a(u,{title:"NPM",active:""},{default:t(()=>[M]),_:1})]),_:1}),G,n("p",null,[n("a",T,[s("https://v2.vuepress.vuejs.org/zh/guide/markdown.html#导入代码块"),a(e)])]),R,n("p",null,[s("mermaid 官网 "),n("a",J,[s("https://mermaid.nodejs.cn/"),a(e)])]),n("p",null,[n("s",null,[s("由于第三方插件 "),n("a",F,[s("vuepress-plugin-mermaidjs"),a(e)]),s(" 并没有适配最新版的 VuePress 2.x，因此需要手动配置 VuePress 2.x 来渲染 Mermaid 绘图。")]),s(" （已经支持）")]),n("p",null,[s("手动配置参考： "),n("a",Y,[s("https://www.techgrow.cn/posts/bc19d204.html"),a(e)])]),H,a(p,null,{default:t(()=>[s(o(`
graph TB
  id1(圆角矩形)--普通线-->id2[矩形];
  subgraph 子图
   id2==粗线==>id3{菱形}
   id3-.虚线.->id4>右向旗帜]
   id3--无箭头---id5((圆形))
  end
`),1)]),_:1}),U,a(p,null,{default:t(()=>[s(o(`
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
     John-->>Alice: Great!
     John->>Bob   : How about you?
     Bob-->>John  : Jolly good!
`))]),_:1}),Z,a(p,null,{default:t(()=>[s(o(`
pie
  title Key elements in Product X
  "Calcium" : 42.96
  "Potassium" : 50.05
  "Magnesium" : 10.01
  "Iron" :  5
`))]),_:1}),K,a(p,null,{default:t(()=>[s(o(`
classDiagram
     Animal <|-- Duck
     Animal <|-- Fish
     Animal <|-- Zebra
     Animal : +int age
     Animal : +String gender
     Animal: +isMammal()
     Animal: +mate()
     class Duck{
         +String beakColor
         +swim()
         +quack()
     }
     class Fish{
         -int sizeInFeet
         -canEat()
     }
     class Zebra{
         +bool is_wild
         +run()
     }
`),1)]),_:1}),X,a(p,null,{default:t(()=>[s(o(`
gantt
section Section
          Completed: done,   des1,       2014-01-06, 2014-01-08
          Active   : active, des2,       2014-01-07, 3d
         Parallel 1        : des3,   after des1, 1d
         Parallel 2        : des4,   after des1, 1d
         Parallel 3        : des5,   after des3, 1d
         Parallel 4        : des6,   after des4, 1d
`))]),_:1}),Q,a(p,null,{default:t(()=>[s(o(`
stateDiagram
    [*]-->Active
    state Active {
        [*]-->NumLockOff
        NumLockOff-->NumLockOn : EvNumLockPressed
        NumLockOn-->NumLockOff : EvNumLockPressed
        --
        [*]-->CapsLockOff
        CapsLockOff-->CapsLockOn : EvCapsLockPressed
        CapsLockOn-->CapsLockOff : EvCapsLockPressed
        --
        [*]-->ScrollLockOff
        ScrollLockOff-->ScrollLockOn : EvCapsLockPressed
        ScrollLockOn-->ScrollLockOff : EvCapsLockPressed
    }
`))]),_:1}),W,a(p,null,{default:t(()=>[s(o(`
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
`),1)]),_:1})])}const en=d(m,[["render",$],["__file","index.html.vue"]]);export{en as default};
