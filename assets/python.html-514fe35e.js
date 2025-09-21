import{_ as t,r as l,o as i,c as o,a as n,b as a,d as p,e}from"./app-04e6f892.js";const c={},r=e(`<p>相比其他语言，Python 丰富的的库几乎可以覆盖安全研究的方方面面，例如：</p><ul><li>Scapy 库可以很方便地实现跨平台的网络嗅探、网络发包等需求</li><li>PyPDF 文档分析工具提供强大的 PDF 格式解析功能，这些功能对 PDF 格式的 Fuzz 测试、PDF 0day 分析、PDF Exploit 的编写起到极大帮助</li><li>IDA 分析</li><li>代码审计</li><li>在 Exploit Safari 中，堆布局时非常关键的一环，lldb 提供的 Python 接口可以很方便地对 WebKit 对象进行分析，对每个 WebKit 对象大小以及快速发现对象的可利用特性2，对最终编写出完整的攻击代码了决定性的作用。</li></ul><p>todo IDAPython/IDC/Immunity Debugger/Valatility —— 纯Python打造的计算机内存取证分析工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>easy_install pyPDF python-nmap pygeoip mechanize BeautifulSoup4
<span class="token comment"># 与蓝牙相关的库</span>
<span class="token function">apt-get</span> <span class="token function">install</span> python-bluez bluetooth python-obexftp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nmap" tabindex="-1"><a class="header-anchor" href="#nmap" aria-hidden="true">#</a> nmap</h2><p>Python-nmap 是一个 Python 模块，用于与 Nmap 安全扫描器进行交互。它可以帮助您编写 Python 脚本来执行 Nmap 扫描，并从扫描结果中提取信息。</p>`,6),d={href:"https://xael.org/pages/python-nmap-en.html",target:"_blank",rel:"noopener noreferrer"},m=e(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># deprecate</span>
<span class="token function">wget</span> https://xael.org/pages/python-nmap-0.7.1.tar.gz <span class="token parameter variable">-O</span> nmap.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xzf</span> nmap.tar.gz
<span class="token builtin class-name">cd</span> python-nmap-0.7.1/
python3 setup.py <span class="token function">install</span>
<span class="token comment"># or</span>
easy_install python-nmap

<span class="token comment"># recommend</span>
pip <span class="token function">install</span> python-nmap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function u(h,v){const s=l("ExternalLinkIcon");return i(),o("div",null,[r,n("p",null,[a("官网： "),n("a",d,[a("https://xael.org/pages/python-nmap-en.html"),p(s)])]),m])}const y=t(c,[["render",u],["__file","python.html.vue"]]);export{y as default};
