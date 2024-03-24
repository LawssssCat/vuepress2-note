import{_ as i,r as l,o as t,c,a as n,b as s,d as e,e as p}from"./app-2227e0ad.js";const d={},o={href:"https://www.gnu.org/software/make/",target:"_blank",rel:"noopener noreferrer"},r={href:"https://www.gnu.org/software/make/manual/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://makefiletutorial.com/",target:"_blank",rel:"noopener noreferrer"},v={class:"custom-container details"},m=n("p",null,"参考：",-1),b={href:"https://www.bilibili.com/video/BV1Bv4y1J7QT",target:"_blank",rel:"noopener noreferrer"},k=p(`<h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2><h3 id="基本格式" tabindex="-1"><a class="header-anchor" href="#基本格式" aria-hidden="true">#</a> 基本格式</h3><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">target</span> <span class="token punctuation">:</span> prerequisties
[tab键]command

<span class="token comment"># target： 目标文件，可以是ObjectFile、可执行文件、标签（Label，此概念将在“伪目标”中叙述）</span>
<span class="token comment"># prerequistie： 要生成那个target所需要的文件或者目标</span>
<span class="token comment"># command： 是make要执行的命令</span>

<span class="token comment"># ⚠️command前需要使用tab键，而非空格xN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">debug</span> <span class="token punctuation">:</span>
	<span class="token operator">@</span>echo hello world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本规则" tabindex="-1"><a class="header-anchor" href="#基本规则" aria-hidden="true">#</a> 基本规则</h3><ul><li>make会在当前目录下找到一个名字叫<code>Makefile</code>或<code>makefile</code>的脚本文件</li><li>如果找到，他会找脚本文件中第一个目标（target），把目标实现，即生成目标文件 <ul><li>如果目标文件不存在，或者目标文件依赖的.o文件（prerequities）更新（即依赖文件修改时间比目标文件修改时间更新），则会执行目标（target）后面所定义的命令（command）来生成目标文件</li><li>如果目标文件依赖的.o文件（prerequities）不存在，则make会找到目标为该.o文件的规则，生成该.o文件，然后重新生成目标文件</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># $ make </span>
$ <span class="token function">make</span> debug
<span class="token builtin class-name">echo</span> hello world<span class="token operator">!</span> <span class="token comment"># 隐藏命令加@符号</span>
hello world<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="伪目标" tabindex="-1"><a class="header-anchor" href="#伪目标" aria-hidden="true">#</a> 伪目标</h4><p>“伪目标” 不是一个具体的文件，而是一个标签。</p><p>💡这个“伪目标”的取名不要和文件名重名，否则可能会不执行命令 为了避免和文件重名，可以添加特殊标记 <code>.PHONY</code> 来显式的指定一个目标为一个“伪目标”。</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">clean</span> <span class="token punctuation">:</span>
  <span class="token operator">@</span>rm -rfv objs

<span class="token target symbol">debug</span> <span class="token punctuation">:</span>
  <span class="token operator">@</span>echo hello

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3><p>变量在声明时需要给予初始值，而且在使用时需要使用 <code>\${variable}</code>/<code>$(variable)</code> 格式。</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp <span class="token operator">:=</span> src/main.cpp
obj <span class="token operator">:=</span> objs/main.o

<span class="token target symbol"><span class="token variable">$</span>(obj)</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">{</span>cpp<span class="token punctuation">}</span>
  <span class="token operator">@</span>g++ -c <span class="token variable">$</span><span class="token punctuation">(</span>cpp<span class="token punctuation">)</span> -o <span class="token variable">$</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token target symbol">compile</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="预定义变量-自动变量" tabindex="-1"><a class="header-anchor" href="#预定义变量-自动变量" aria-hidden="true">#</a> 预定义变量/自动变量</h4><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>$@</code></td><td>目标（target）的完整名称</td></tr><tr><td><code>$*</code></td><td>目标（target）的主干部分（即：不包括后缀）</td></tr><tr><td><code>$%</code></td><td>如果目标不是归档文件，则为空；<br>如果目标是归档文件成员，则为对应的成员文件名</td></tr><tr><td><code>$&lt;</code></td><td>第一个依赖文件（prerequisties）的名称</td></tr><tr><td><code>$^</code></td><td>所有的依赖文件（prerequisties）。用空格分开，不包含重复的依赖文件</td></tr><tr><td><code>$^</code></td><td>同 <code>$^</code> 但包含重复的文件名</td></tr><tr><td><code>$?</code></td><td>依赖中修改时间晚于目标修改时间的所有文件名。用空格分开</td></tr><tr><td>\`$</td><td>\`</td></tr></tbody></table><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp <span class="token operator">:=</span> src/main.cpp
obj <span class="token operator">:=</span> objs/main.o

<span class="token target symbol"><span class="token variable">$</span>(obj)</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">{</span>cpp<span class="token punctuation">}</span>
  <span class="token operator">@</span>g++ -c <span class="token variable">$^</span> -o <span class="token variable">$@</span>

<span class="token target symbol">compile</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token target symbol">clean</span> <span class="token punctuation">:</span>
  <span class="token operator">@</span>rm -rfv <span class="token variable">$</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span> <span class="token punctuation">:</span> compile clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> compile 
$ <span class="token function">make</span> clean 
removed <span class="token string">&#39;objs/main.o&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td>MAKE</td><td>值：&quot;make&quot;</td></tr><tr><td>CURDIR</td><td>项目根路径</td></tr><tr><td>MAKECMDGOALS</td><td>命令行中输入的目标值</td></tr></tbody></table><h4 id="变量范围" tabindex="-1"><a class="header-anchor" href="#变量范围" aria-hidden="true">#</a> 变量范围</h4><p>Makefile中的变量一般时全局变量，也就是说定义后可以在Makefile中的任意位置使用。 但也可以将变量指定在某个目标范围内。</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">target ...</span> <span class="token punctuation">:</span> variable-assignment
<span class="token target symbol">target ...</span> <span class="token punctuation">:</span> prerequisites
  recipes
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>var1 <span class="token operator">=</span> Global Var

<span class="token target symbol">%.c</span><span class="token punctuation">:</span> var2 <span class="token operator">=</span> Some Target Var <span class="token comment"># 全部 .c 目标能访问</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> test.c

<span class="token target symbol">test.c</span><span class="token punctuation">:</span> var3 <span class="token operator">=</span> Specific Target Var <span class="token comment"># 只有该目标能访问</span>
<span class="token target symbol">test.c</span><span class="token punctuation">:</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>var1<span class="token punctuation">)</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>var2<span class="token punctuation">)</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>var3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用符号" tabindex="-1"><a class="header-anchor" href="#常用符号" aria-hidden="true">#</a> 常用符号</h3><h4 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> <code>=</code> 链接</h4><ul><li>链接赋值运算符</li><li>用于将右边的值分配给左边的变量</li><li><strong>如果后面的语句重新定义了该变量，则将使用新的值</strong></li></ul><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>HOST_ARCH   <span class="token operator">=</span> aarch64
TARGET_ARCH <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>HOST_ARCH<span class="token punctuation">)</span>

<span class="token comment"># 改变变量值</span>
HOST_ARCH   <span class="token operator">=</span> amd64

<span class="token target symbol">debug</span><span class="token punctuation">:</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>TARGET_ARCH<span class="token punctuation">)</span> <span class="token comment"># amd64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="赋值" tabindex="-1"><a class="header-anchor" href="#赋值" aria-hidden="true">#</a> <code>:=</code> 赋值</h4><ul><li>立即赋值运算</li><li>用于在定义变量时立即求值</li><li>该值在定义后不再更改</li><li>即使在后面的语句中重新定义了该变量</li></ul><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>HOST_ARCH   <span class="token operator">:=</span> aarch64
TARGET_ARCH <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>HOST_ARCH<span class="token punctuation">)</span>

<span class="token comment"># 改变变量值</span>
HOST_ARCH   <span class="token operator">:=</span> amd64

<span class="token target symbol">debug</span><span class="token punctuation">:</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>TARGET_ARCH<span class="token punctuation">)</span> <span class="token comment"># aarch64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="默认" tabindex="-1"><a class="header-anchor" href="#默认" aria-hidden="true">#</a> <code>?=</code> 默认</h4><ul><li>默认赋值运算符</li><li>如果该变量已经定义，则不进行任何操作</li><li>如果该变量尚未定义，则求值并分配</li></ul><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>HOST_ARCH    <span class="token operator">=</span> aarch64
HOST_ARCH   <span class="token operator">?=</span> amd64

<span class="token target symbol">debug</span><span class="token punctuation">:</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>HOST_ARCH<span class="token punctuation">)</span> <span class="token comment"># aarch64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="累加" tabindex="-1"><a class="header-anchor" href="#累加" aria-hidden="true">#</a> <code>+=</code> 累加</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>CXXFLAGS <span class="token operator">:=</span> -m64 -fPIC -g -O0 -std<span class="token operator">=</span>c++11 -w -fopenmp
CXXFLAGS <span class="token operator">+=</span> <span class="token variable">$</span><span class="token punctuation">(</span>include_paths<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="续行" tabindex="-1"><a class="header-anchor" href="#续行" aria-hidden="true">#</a> <code>\\</code> 续行</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>LDLIBS <span class="token operator">:=</span> cudart opencv_core \\
          gomp nvinfer protobuf cudnn pthread \\
          cublas nvcaffe_parser nvinfer_plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用函数" tabindex="-1"><a class="header-anchor" href="#常用函数" aria-hidden="true">#</a> 常用函数</h3><p>语法： <code>$(fn arguments)</code> or <code>\${fn arguments}</code></p><ul><li><code>fn</code> 函数名</li><li><code>arguments</code> 函数参数 <ul><li>函数名与参数间以空格 <code></code> 分割</li><li>参数间以逗号 <code>,</code> 分割</li></ul></li></ul><h4 id="shell" tabindex="-1"><a class="header-anchor" href="#shell" aria-hidden="true">#</a> shell</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> &lt;command&gt; &lt;arguments&gt;<span class="token punctuation">)</span>

<span class="token comment"># 功能： 调用 shell 命令</span>
<span class="token comment"># 返回： 函数返回 shell 命令执行结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>e.g.</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp_srcs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find src -name <span class="token string">&quot;*.cpp&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="subst" tabindex="-1"><a class="header-anchor" href="#subst" aria-hidden="true">#</a> subst</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">subst</span> &lt;from&gt;,&lt;to&gt;,&lt;text&gt;<span class="token punctuation">)</span>

<span class="token comment"># 功能： 字符串替换函数。</span>
<span class="token comment">#       把 &lt;text&gt; 中的 &lt;from&gt; 替换成 &lt;to&gt;</span>
<span class="token comment"># 返回： 替换结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp_srcs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find src -name <span class="token string">&quot;*.cpp&quot;</span><span class="token punctuation">)</span>
cpp_objs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">subst</span> src/,objs/,<span class="token variable">$</span><span class="token punctuation">(</span>cpp_srcs<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="patsubst" tabindex="-1"><a class="header-anchor" href="#patsubst" aria-hidden="true">#</a> patsubst</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">patsubst</span> &lt;pattern&gt;,&lt;replacement&gt;,&lt;text&gt;<span class="token punctuation">)</span>

<span class="token comment"># 功能： 模式字符串替换函数。 </span>
<span class="token comment">#       从 &lt;text&gt; 中 &lt;pattern&gt; 替换成 &lt;replacement&gt; </span>
<span class="token comment">#       支持通配符% —— 表示任意长度的字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp_srcs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find src -name <span class="token string">&quot;*.cpp&quot;</span><span class="token punctuation">)</span>
cpp_objs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">patsubst</span> src/%.cpp,objs/%.o,<span class="token variable">$</span><span class="token punctuation">(</span>cpp_srcs<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach" aria-hidden="true">#</a> foreach</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">foreach</span> &lt;var&gt;,&lt;list&gt;,&lt;text&gt;<span class="token punctuation">)</span>

<span class="token comment"># 功能： 循环函数。</span>
<span class="token comment">#        把字符串 &lt;list&gt; 中的元素逐一去除，执行 &lt;text&gt; 包含的表达式</span>
<span class="token comment"># 返回： &lt;text&gt; 所返回的每个字符串组成的字符串（以空格分割）</span>

<span class="token comment"># 伪代码（python）</span>
<span class="token comment"># res = &quot;&quot;</span>
<span class="token comment"># for var in list:</span>
<span class="token comment">#   res = res + &quot; &quot; + text + var</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>library_paths <span class="token operator">:=</span> /datav/shared/100_du/03.08/lean/protobuf-3.11.4/lib \\
                 /usr/local/cuda-10.1/lib64

library_paths <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">foreach</span> item,<span class="token variable">$</span><span class="token punctuation">(</span>library_paths<span class="token punctuation">)</span>,-L<span class="token variable">$</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 结果：</span>
<span class="token comment"># g++ *.cpp -o main -L/datav/shared/100_du/03.08/lean/protobuf-3.11.4/lib -L/usr/local/cuda-10.1/lib64 -L...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同等效果</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>I_flag <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>I_flag<span class="token punctuation">:</span>%<span class="token operator">=</span>-I%<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="dir" tabindex="-1"><a class="header-anchor" href="#dir" aria-hidden="true">#</a> dir</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">dir</span> &lt;names...&gt;<span class="token punctuation">)</span>

<span class="token comment"># 功能： 取目录函数。</span>
<span class="token comment">#       从文件名序列中取出目录部分。</span>
<span class="token comment">#       目录部分是指最后一个反斜杠 &quot;/&quot; 之前的部分</span>
<span class="token comment">#       如果没有反斜杠，则返回 &quot;./&quot;</span>
<span class="token comment"># 返回： 返回文件名序列的目录部分</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">dir</span> src/foo.c hacks<span class="token punctuation">)</span> <span class="token comment"># 返回值 &quot;src/ ./&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>cpp_srcs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find src -name <span class="token string">&quot;*.cpp&quot;</span><span class="token punctuation">)</span>
cpp_objs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">patsubst</span> src/%.cpp,objs/%.o,<span class="token variable">$</span><span class="token punctuation">(</span>cpp_srcs<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token target symbol">objs/%.o</span> <span class="token punctuation">:</span> src/%.cpp
  <span class="token operator">@</span>mkdir -p <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">dir</span> <span class="token variable">$@</span><span class="token punctuation">)</span> <span class="token comment"># 创建目录</span>
  <span class="token operator">@</span>g++ -c <span class="token variable">$^</span> -o <span class="token variable">$@</span>

<span class="token target symbol">compile</span> <span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>cpp_objs<span class="token punctuation">)</span>

<span class="token target symbol">debug</span> <span class="token punctuation">:</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>cpp_srcs<span class="token punctuation">)</span>
  <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>cpp_objs<span class="token punctuation">)</span>

<span class="token builtin-target builtin">.PHONY</span> <span class="token punctuation">:</span> debug compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="notdir" tabindex="-1"><a class="header-anchor" href="#notdir" aria-hidden="true">#</a> notdir</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">notdir</span> &lt;names...&gt;<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>libs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">notdir</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find /usr/lib -name lib*<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="filter-filter-out" tabindex="-1"><a class="header-anchor" href="#filter-filter-out" aria-hidden="true">#</a> filter/filter-out</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> &lt;names...&gt;<span class="token punctuation">)</span> <span class="token comment"># 包含</span>
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter-out</span> &lt;names...&gt;<span class="token punctuation">)</span> <span class="token comment"># 排除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>libs    <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">notdir</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find /usr/lib -name lib*<span class="token punctuation">)</span><span class="token punctuation">)</span>
a_libs  <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.a,<span class="token variable">$</span><span class="token punctuation">(</span>libs<span class="token punctuation">)</span><span class="token punctuation">)</span>
so_libs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.so,<span class="token variable">$</span><span class="token punctuation">(</span>libs<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="basename" tabindex="-1"><a class="header-anchor" href="#basename" aria-hidden="true">#</a> basename</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">basename</span> &lt;names...&gt;<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>libs    <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">notdir</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> find /usr/lib -name lib*<span class="token punctuation">)</span><span class="token punctuation">)</span>
a_libs  <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">subst</span> lib,<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">basename</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.a,<span class="token variable">$</span><span class="token punctuation">(</span>libs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
so_libs <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">subst</span> lib,<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">basename</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.so,<span class="token variable">$</span><span class="token punctuation">(</span>libs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="origin" tabindex="-1"><a class="header-anchor" href="#origin" aria-hidden="true">#</a> origin</h4><p>返回变量出处</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token string">&quot;$(origin M)&quot;</span>, <span class="token string">&quot;command line&quot;</span><span class="token punctuation">)</span>
  KBUILD_EXTMOD <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>M<span class="token punctuation">)</span>
<span class="token keyword">endif</span>

<span class="token comment"># command line</span>
<span class="token comment"># file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> if</h4><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token comment">#if 函数的语法是:</span>
<span class="token comment">#$(if &lt;condition&gt;,&lt;then-part&gt; )</span>
<span class="token comment">#或</span>
<span class="token comment">#$(if &lt;condition&gt;,&lt;then-part&gt;,&lt;else-part&gt; )</span>
<span class="token comment">#&lt;condition&gt;参数是if的表达式，如果其返回的为非空字符串，那么这个表达式就相当于返回真，于是，&lt;then-part&gt;会被计算，否则&lt;else-part&gt;会被计算</span>
<span class="token comment">#</span>
<span class="token comment">#if函数的返回值是，</span>
<span class="token comment">#     如果&lt;condition&gt;为真（非空字符串），那个&lt;then-part&gt;会是整个函数的返回值，</span>
<span class="token comment">#     如果&lt;condition&gt;为假（空字符串），那么&lt;else-part&gt;会是整个函数的返回值，此时如果&lt;else-part&gt;没有被定义，那么，整个函数返回空字串。</span>

SRC_DIR <span class="token operator">:=</span> src

<span class="token comment">#if函数---设置默认值</span>
<span class="token comment">#如果变量SRC_DIR的值不为空,则将SRC_DIR指定的目录作为SUBDIR子目录;否则将/home/src作为子目录</span>
SUBDIR <span class="token operator">+=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">if</span> <span class="token variable">$</span><span class="token punctuation">(</span>SRC_DIR<span class="token punctuation">)</span>,<span class="token variable">$</span><span class="token punctuation">(</span>SRC_DIR<span class="token punctuation">)</span>,/home/src<span class="token punctuation">)</span>

<span class="token target symbol">all</span><span class="token punctuation">:</span>
    <span class="token operator">@</span>echo <span class="token variable">$</span><span class="token punctuation">(</span>SUBDIR<span class="token punctuation">)</span>

<span class="token comment"># 例子：</span>
KBUILD_OUTPUT <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> cd <span class="token variable">$</span><span class="token punctuation">(</span>KBUILD_OUTPUT<span class="token punctuation">)</span> &amp;&amp; /bin/pwd<span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">if</span> <span class="token variable">$</span><span class="token punctuation">(</span>KBUILD_OUTPUT<span class="token punctuation">)</span>,, \\
     <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">error</span> output directory <span class="token string">&quot;$(saved-output)&quot;</span> does not exist<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="逻辑判断" tabindex="-1"><a class="header-anchor" href="#逻辑判断" aria-hidden="true">#</a> 逻辑判断</h3><p>是否定义</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token keyword">ifdef</span> V
  <span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token string">&quot;$(origin V)&quot;</span>, <span class="token string">&quot;command line&quot;</span><span class="token punctuation">)</span>
    KBUILD_VERBOSE <span class="token operator">=</span> <span class="token variable">$</span><span class="token punctuation">(</span>V<span class="token punctuation">)</span>
  <span class="token keyword">endif</span>
<span class="token keyword">endif</span>
<span class="token keyword">ifndef</span> KBUILD_VERBOSE
  KBUILD_VERBOSE <span class="token operator">=</span> 0
<span class="token keyword">endif</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是否相等</p><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code><span class="token target symbol">defconfig</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>/conf
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span>KBUILD_DEFCONFIG<span class="token punctuation">)</span>,<span class="token punctuation">)</span>
	<span class="token variable">$&lt;</span> -d Config.in
<span class="token keyword">else</span>
	<span class="token operator">@</span>echo *** Default configuration is based on <span class="token string">&#39;$(KBUILD_DEFCONFIG)&#39;</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>Q<span class="token punctuation">)</span><span class="token variable">$&lt;</span> -D <span class="token variable">$</span><span class="token punctuation">(</span>KBUILD_DEFCONFIG<span class="token punctuation">)</span> Config.in
<span class="token keyword">endif</span>
	<span class="token variable">$</span><span class="token punctuation">(</span>MTIME_IS_COARSE<span class="token punctuation">)</span> &amp;&amp; sleep 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="隐式规则" tabindex="-1"><a class="header-anchor" href="#隐式规则" aria-hidden="true">#</a> 隐式规则</h2><p>业界约定俗成的规则，如什么场景的变量一般用什么变量名。</p><h3 id="隐式变量名" tabindex="-1"><a class="header-anchor" href="#隐式变量名" aria-hidden="true">#</a> 隐式变量名</h3><table><thead><tr><th>变量名</th><th>说明</th></tr></thead><tbody><tr><td>MAKEFLAGS</td><td><code>make -f1 -f2 ....</code> 中的 <code>-f1 -f2 -f3 ...</code></td></tr><tr><td>CC</td><td>指定C编译程序 <br> Program for compiling C programs; default gcc</td></tr><tr><td>CXX</td><td>指定C++编译程序 <br> Program for compiling C++ programs; default g++</td></tr><tr><td>CFLAGS</td><td>传递给C编译程序的额外参数 <br> Extra flags to give to the C compiler</td></tr><tr><td>CXXFLAGS</td><td>传递给C++编译程序的额外参数 <br> Extra flags to give to the C++ compiler</td></tr><tr><td>CPPFLAGS</td><td>传递给C处理器的额外参数 <br> Extra flags to give to the C preprocessor</td></tr><tr><td>LDFLAGS</td><td>传递给链接器的额外参数 <br> Extra flags to give to compiler when they are supposed to invoke the linker</td></tr></tbody></table><h2 id="交叉编译" tabindex="-1"><a class="header-anchor" href="#交叉编译" aria-hidden="true">#</a> 交叉编译</h2><p>“交叉编译” 指在一个平台上生成另一个平台上的可执行文件。</p><p>使用 make 解释 Makefile 中的指令</p><p>编译工具</p><ul><li>gcc</li><li>ld</li><li>objcopy</li><li>objdump</li></ul><p>交叉编译工具链</p><ul><li><code>arm-linux-gcc</code></li><li><code>arm-none-linux-gnueabi-gcc-ld</code></li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p><strong>Linux 和 裸机（baremetal） 区别</strong>：</p><ul><li>Linux —— 在已安装操作系统的机器上跑。一般：个人pc、公司服务器</li><li>baremetal —— 直接由硬件调起。一般：嵌入式</li></ul></div><h2 id="kbuild-kconfig" tabindex="-1"><a class="header-anchor" href="#kbuild-kconfig" aria-hidden="true">#</a> kbuild/kconfig</h2><p>todo</p><p>Menuconfig配置原理： 在Linux里面我们所看到的menuconfig界面是通过配置内核顶层的Kconfig产生的，而当输入make menuconfig命令的时候系统会读取Makefile来解析Kconfig。</p><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2><h3 id="例子-编译参数链接-问题-解决缺少头文件问题" tabindex="-1"><a class="header-anchor" href="#例子-编译参数链接-问题-解决缺少头文件问题" aria-hidden="true">#</a> 例子：编译参数链接/问题：解决缺少头文件问题</h3><p>代码</p><details class="custom-container details"><p>src/main.cpp</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.hpp&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;a + b = %d\\n&quot;</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.hpp</p><div class="language-hpp line-numbers-mode" data-ext="hpp"><pre class="language-hpp"><code>#ifndef ADD_HPP
#define ADD_HPP

int add(int a, int b);

#endif
// ADD_HPP —— 防止重复加载头文件
// 否则：
// multiple definition of \`add(int, int)&#39;; objs/add.o:xxxx/src/add.cpp:4: first defined here
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>add.cpp</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;add.hpp&quot;</span></span>

<span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Makefile （错误：缺少头文件路径参数）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cpp_srcs := $(shell find src -name *.cpp)
cpp_objs := $(patsubst src/%.cpp,objs/%.o,$(cpp_srcs))

objs/%.o : src/%.cpp
	@mkdir -p $(dir $@)
	@g++ -c $^ -o $@

workspace/exec : $(cpp_objs)
	@mkdir -p $(dir $@)
	@g++ $^ -o $@

run : workspace/exec
	@./$&lt;

debug :
	@echo $(cpp_srcs)
	@echo $(cpp_objs)

clean :
	@rm -rfv objs workspace/exec

.PHONY : run debug clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">make</span> <span class="token comment"># 缺失头文件问题</span>
src/add.cpp:1:10: fatal error: add.hpp: No such <span class="token function">file</span> or directory
    <span class="token number">1</span> <span class="token operator">|</span> <span class="token comment">#include &lt;add.hpp&gt;</span>
      <span class="token operator">|</span>          ^~~~~~~~~
compilation terminated.
make: *** <span class="token punctuation">[</span>Makefile:6: objs/add.o<span class="token punctuation">]</span> Error <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Makefile （正确）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cpp_srcs := $(shell find src -name *.cpp)
cpp_objs := $(patsubst src/%.cpp,objs/%.o,$(cpp_srcs))

#################
include_paths := $(shell pwd)/include
I_flag := $(include_paths:%=-I%)

compile_options := -g -O3 -w $(I_flag)
#################

objs/%.o : src/%.cpp
	@echo &quot;[+] build $@&quot;
	@mkdir -p $(dir $@)
	@g++ -c $^ -o $@ $(compile_options)

workspace/exec : $(cpp_objs)
	@echo &quot;[+] link $@&quot;
	@mkdir -p $(dir $@)
	@g++ $^ -o $@

run : workspace/exec
	@echo &quot;[+] run $@&quot;
	@./$&lt;

debug :
	@echo $(cpp_srcs)
	@echo $(cpp_objs)
	@echo $(compile_options)

clean :
	@rm -rfv objs workspace/exec

.PHONY : run debug clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="例子-静态库编译" tabindex="-1"><a class="header-anchor" href="#例子-静态库编译" aria-hidden="true">#</a> 例子：静态库编译</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#
# 编译静态库。完成静态链接
#

cpp_srcs := $(shell find src -name *.cpp)
lib_srcs := $(filter-out src/main.cpp,$(cpp_srcs))
lib_objs := $(patsubst src/%.cpp,objs/%.o,$(lib_srcs))

include_paths := ./include
library_paths := ./lib
linking_libs  := xxx

I_options := $(include_paths:%=-I%) # 头文件路径
L_options := $(library_paths:%=-L%) # 库路径
l_options := $(linking_libs:%=-l%)  # 库文件

compile_options := -g -O3 -w -std=c++11 $(I_options)
linking_options := $(L_options) $(l_options)

# =========== 编译静态库 ===========

objs/%.o : src/%.cpp
	@echo &quot;[+] preprocess: $@&quot;
	@mkdir -p $(dir $@)
	@g++ -c $^ -o $@ $(compile_options)

lib/libxxx.a : $(lib_objs)
	@echo &quot;[+] build static library: $@&quot;
	@mkdir -p $(dir $@)
	@ar -r $@ $^

static_lib : lib/libxxx.a

# =========== 链接静态库 ===========

workspace/exec : objs/main.o
	@echo &quot;[+] link $@&quot;
	@mkdir -p $(dir $@)
	@g++ $^ -o $@ $(linking_options)

run : workspace/exec
	@echo &quot;[+] run $@&quot;
	@./$&lt;

debug :
	@echo $(cpp_srcs)
	@echo $(lib_srcs)
	@echo $(lib_objs)
	@echo $(compile_options)

clean :
	@rm -rfv objs lib workspace/exec

.PHONY : run debug clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="例子-动态库编译" tabindex="-1"><a class="header-anchor" href="#例子-动态库编译" aria-hidden="true">#</a> 例子：动态库编译</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#
# 编译动态库库。完成动态链接
#

cpp_srcs := $(shell find src -name *.cpp)
lib_srcs := $(filter-out src/main.cpp,$(cpp_srcs))
lib_objs := $(patsubst src/%.cpp,objs/%.o,$(lib_srcs))

include_paths := ./include
library_paths := ./lib
linking_libs  := ddd

I_options := $(include_paths:%=-I%) # 头文件路径
L_options := $(library_paths:%=-L%) # 库路径
r_options := $(library_paths:%=-Wl,-rpath=%) # 运行时库路径
l_options := $(linking_libs:%=-l%)  # 库文件

compile_options := -g -O3 -w -std=c++11 -fPIC $(I_options)
linking_options := $(L_options) $(l_options) $(r_options)

# =========== 编译动态库 ===========

objs/%.o : src/%.cpp
	@echo &quot;[+] preprocess: $@&quot;
	@mkdir -p $(dir $@)
	@g++ -c $^ -o $@ $(compile_options)

lib/libddd.so : $(lib_objs)
	@echo &quot;[+] build dynamic library: $@&quot;
	@mkdir -p $(dir $@)
	@g++ -shared $^ -o $@

dynamic_lib : lib/libddd.so

# =========== 链接动态库 ===========

workspace/exec : objs/main.o
	@echo &quot;[+] link $@&quot;
	@mkdir -p $(dir $@)
	@g++ $^ -o $@ $(linking_options)

run : workspace/exec
	@echo &quot;[+] run $@&quot;
	@./$&lt;

debug :
	@echo $(cpp_srcs)
	@echo $(lib_srcs)
	@echo $(lib_objs)
	@echo $(compile_options)

clean :
	@rm -rfv objs lib workspace/exec

.PHONY : run debug clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="例子-嵌套编译" tabindex="-1"><a class="header-anchor" href="#例子-嵌套编译" aria-hidden="true">#</a> 例子：嵌套编译</h3><p>大项目中会分出多个小项目，这时需要使用嵌套（递归）make构建。</p><p>具体做法为：</p><ol><li>每个子项目都写一个Makefile</li><li>写一个总的Makefile调用各子项目Makefile</li></ol><p>e.g.</p><p>将main.cpp外的其他cpp存为一个子项目，编译为一个库文件。然后将main.cpp作为另一个子项目，编译为.o文件。最后再链接库文件成可执行文件。</p><p>todo 完成例子</p>`,114);function h(g,f){const a=l("ExternalLinkIcon");return t(),c("div",null,[n("ul",null,[n("li",null,[s("GNU Make 官网网站： "),n("a",o,[s("https://www.gnu.org/software/make/"),e(a)])]),n("li",null,[s("GNU Make 官方文档地址： "),n("a",r,[s("https://www.gnu.org/software/make/manual/"),e(a)])]),n("li",null,[s("Makefile Tutorial: "),n("a",u,[s("https://makefiletutorial.com/"),e(a)])])]),n("details",v,[m,n("ul",null,[n("li",null,[s("[ ] B站|无限十三年|从零开始学Makefile - "),n("a",b,[s("https://www.bilibili.com/video/BV1Bv4y1J7QT"),e(a)]),s(" todo 看完+笔记")])])]),k])}const _=i(d,[["render",h],["__file","makefile.html.vue"]]);export{_ as default};
