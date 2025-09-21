import{_ as n,o as s,c as a,e as t}from"./app-04e6f892.js";const e={},p=t(`<h2 id="测试概念" tabindex="-1"><a class="header-anchor" href="#测试概念" aria-hidden="true">#</a> 测试概念</h2><p><strong>目标</strong></p><p>测试的目标是验证代码是错误的。（即：目标是给代码找错误！）</p><p><strong>指标</strong></p><ul><li>覆盖率 —— 低则测试不充分，但高不代表有效！不要求100%，否则影响开发进度。</li></ul><p><strong>可测试性</strong></p><p>测试用例是简单的、可行的！</p><p>考虑：</p><ul><li>可观察</li><li>可控制</li><li>小规模</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>原则： F.I.R.S.T
F fast 快速
I isolated 隔离
R repeatable 可重复
S self-validating 可自验证（断言）
T timely 及时的（开发完就测，别等个一年半载再测）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分层</strong></p><ul><li>UT（Unit Test） —— 单元测试 <ul><li>核心在于分支覆盖率</li><li>不关注业务正确性</li></ul></li><li>CT（Component Test） —— 组件测试</li><li>IT（Integration Test） —— 集成测试</li><li>ST（System Test） —— 系统测试</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>单元测试分层

Controller:
@WebMVCTest

Service:
@SpringJunitConfig

DAO:
@JdbcTest
@DataJpaTest
@MybatisTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>测试四象限

Q1 —— 是否完成功能开发
Unit Tests
Component Tests

Q2 —— 是否解决业务问题
Functional Tests
Examples
Story Tests
Simulations

Q3 —— 是否符合用户使用场景
Exploratory Testing
Scenaries
UAT（User Acceptance Testing）
Alpha / Beta

Q4 —— 是否满足性能需求
Performance <span class="token operator">&amp;</span> Load Testing
Security Testing
<span class="token string">&quot;llity&quot;</span> Testing
Mutation Testing（变异测试）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用例结构" tabindex="-1"><a class="header-anchor" href="#用例结构" aria-hidden="true">#</a> 用例结构</h3><ul><li>SUT（System Under Test，被测试系统）</li><li>DOC（Depended-on Components，依赖组件）</li><li>Test Double，测试替身 <ul><li>Stub，打桩 —— 为SUT提供输入</li><li>Spy，间谍 —— 监听状态</li><li>Mock，模拟 —— 模拟输入输出</li><li>Fake，伪造 —— 减轻环境依赖</li></ul></li></ul><h4 id="stub" tabindex="-1"><a class="header-anchor" href="#stub" aria-hidden="true">#</a> Stub</h4><p>提供输入条件</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">InputReader</span> <span class="token punctuation">{</span>
  <span class="token class-name">String</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token annotation punctuation">@MockSystem</span><span class="token punctuation">(</span>properties <span class="token operator">=</span> <span class="token string">&quot;msg=hello-world!&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;msg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;hello-world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="mock" tabindex="-1"><a class="header-anchor" href="#mock" aria-hidden="true">#</a> Mock</h4><p>提供模拟输入/输出</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">InputReader</span> inputReader <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">InputReader</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">when</span><span class="token punctuation">(</span>inputReader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">assertThat</span><span class="token punctuation">(</span>inputReader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="spy" tabindex="-1"><a class="header-anchor" href="#spy" aria-hidden="true">#</a> Spy</h4><p>检测数据/调用情况</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">interface</span> <span class="token class-name">Star</span> <span class="token punctuation">{</span>
  <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">StarWrapper</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Star</span> star<span class="token punctuation">;</span>

  <span class="token class-name">StarWrapper</span><span class="token punctuation">(</span><span class="token class-name">Star</span> star<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>star <span class="token operator">=</span> star<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      star<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSpy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Star</span> mock <span class="token operator">=</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">Star</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">StarWrapper</span> starWrapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StarWrapper</span><span class="token punctuation">(</span>mock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  starWrapper<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>mock<span class="token punctuation">,</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">times</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  starWrapper<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">verify</span><span class="token punctuation">(</span>mock<span class="token punctuation">,</span> <span class="token class-name">Mockito</span><span class="token punctuation">.</span><span class="token function">times</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试模式" tabindex="-1"><a class="header-anchor" href="#测试模式" aria-hidden="true">#</a> 测试模式</h3><ul><li>白盒测试 —— 看代码</li><li>黑盒测试 —— 不看代码</li></ul><h3 id="测试角色" tabindex="-1"><a class="header-anchor" href="#测试角色" aria-hidden="true">#</a> 测试角色</h3><ul><li>开发者 —— DT（Developer Test，开发者测试）</li><li>测试人员</li><li>“用户”（公司高层）/PM（项目经理）/SA/SE</li><li>灰度测试人员 —— 部分被筛选的用户</li><li>全体用户</li></ul><h3 id="测试阶段" tabindex="-1"><a class="header-anchor" href="#测试阶段" aria-hidden="true">#</a> 测试阶段</h3><ul><li><p><strong>UT（Unit Test，单元测试）</strong>【白盒、DT】 —— 最小的测试粒度。测试用例由开发人员编写，通过断言、代码覆盖率统计（coverage）的手段，在开发阶段用于验证代码模块是否符合预期、代码质量是否合格。</p><p>todo 单元测试策略 https://blog.csdn.net/2301_77645573/article/details/131293738</p></li><li><p><strong>SIT（System Integration Test，集成测试/组装测试/联合测试）</strong>【白盒+黑盒、DT】 —— 在 UT（单元测试）的基础上，将所有模块按照设计要求组装成系统或子系统，进行设计上的和需求上的验证。即测试模块间的接口，也测试业务功能。</p><p>todo 集成测试策略</p><ul><li><strong>冒烟测试（Smoke Testing）</strong>：开发人员进行。用于确认代码中的更改会按预期运行，且不会破坏整个版本的稳定性。<div class="custom-container tip"><p class="custom-container-title">提示</p><p>冒烟测试源自于硬件行业。意思是对一个硬件或硬件组件进行更改或修复后，直接给设备加电。如果没有冒烟，则该组件就通过了测试。</p></div></li><li><strong>可用性测试（Sanity Testing/Functional Testing）</strong>：开发人员/测试人员进行。用于验证主要的功能是否能跑通。</li><li><strong>回归测试（Regression Testing）</strong>：在上述测试中发现代码缺陷/设计问题需要更改需求。在修改了旧代码后，重复以前的全部或部分的相同测试以确认修改没有引入新的错误或导致其他代码产生错误。<div class="custom-container tip"><p class="custom-container-title">提示</p><p>所谓“回归”指测试人员重走一遍当初发现问题的步骤，看问题是否已经修复。</p></div></li></ul></li><li><p><strong>ST（System Test，系统测试）</strong>【黑盒】 —— 将已经确认的软件、数据、接口、计算机硬件、外设、网络等所有与系统有关的元素结合在一起，完整地模拟客户环境对系统进行的黑盒测试。</p><ol><li>根据需求，测试功能是否实现。</li><li>根据规范，测试性能、安全性、健壮性、可维护性是否达标。</li></ol></li><li><p><strong>UAT（User Acceptance Test，用户验收测试/用户接受测试）</strong>【黑盒】 —— 用户根据用例描述测试每一个场景，反馈系统问题。开发人员基于问题对系统和业务的影响进行判断，适当的修正系统或记录业务需求，根据需求优先级，集成进下一个迭代版本中。</p><ul><li><strong>Alpha 测试</strong>：内测版本，开发者内部交流；是由用户在开发者的场所来进行的，在一个受控的环境中进行。测试完后一般不会有大问题。</li><li><strong>Beta 测试</strong>：公测版本，面向所有用户；由软件的最终用户在一个或多个用户场所来进行的，开发者通常不在现场，用户记录测试中遇到的问题并报告给开发者，开发者对系统进行最后的修改，并开始准备发布最终的软件。</li><li><strong>Gamma 测试</strong>：指软件正式发行的候选版，相当成熟，与正式版本相差无几，成为正式发布的候选版。</li><li><strong>UAT Sign off（里程碑）</strong>：意思是用户验收测试（UAT）通过并获得批准，即用户对软件系统的测试结果满意，并同意将其投入使用。</li></ul></li></ul>`,31),i=[p];function l(o,c){return s(),a("div",null,i)}const r=n(e,[["render",l],["__file","index.html.vue"]]);export{r as default};
