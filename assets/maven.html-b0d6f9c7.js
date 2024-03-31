import{_ as p,r as l,o as i,c as o,a as n,b as a,d as e,e as t}from"./app-2227e0ad.js";const c={},r=t('<p>Maven 是一个自动化的构建工具，主要用于 Java 项目。通过 Maven 插件方式，Maven 还可以用于构建和管理 C#、Ruby、Scala和其他语言编写的项目，如 <code>scala-maven-plugin</code>、<code>dotnet-maven-plugin</code>。</p><p>Maven 的主要目标是让开发人员能够在最短时间内完成开发工作的完整状态：</p><ul><li>简化构建过程</li><li>统一构建环境</li><li>整合构建信息</li><li>易扩展</li></ul><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2><p>参考：</p>',5),d={href:"https://medium.com/learning-from-jhipster/0-%E7%94%A8maven%E5%BB%BA%E7%AB%8B%E5%B0%88%E6%A1%88-1f504f9a712b",target:"_blank",rel:"noopener noreferrer"},u={href:"https://medium.com/learning-from-jhipster/1-maven%E7%9A%84%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-phase-plugin-goal-d69a2591dc45",target:"_blank",rel:"noopener noreferrer"},v={href:"https://medium.com/learning-from-jhipster/2-%E5%B0%87-plugin-goals-%E7%B6%81%E5%AE%9A%E8%87%B3-phase-13c6b6b8d9bd",target:"_blank",rel:"noopener noreferrer"},m={href:"https://medium.com/learning-from-jhipster/3-%E4%BD%BF%E7%94%A8-maven-wrapper-f4b7e460278",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>Maven 通过 POM （Project Object Model，项目对象模型）文件管理项目构建</p><p>目录结构</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>pom.xml             —— 项目描述文件 【重点】
/src/main/java
/src/main/resources
/src/main/webapp    —— Web应用程序
/src/main/config
/src/test/java
/target
LICENSE.txt         —— 项目许可证
NOTICE.txt          —— 通知和归因
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>帮助</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ mvn help:describe <span class="token parameter variable">-Dcmd</span><span class="token operator">=</span><span class="token punctuation">[</span>PHASENAME<span class="token punctuation">]</span>

$ mvn help:describe <span class="token parameter variable">-Dcmd</span><span class="token operator">=</span>clean
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token string">&#39;clean&#39;</span> is a phase within the <span class="token string">&#39;clean&#39;</span> lifecycle, <span class="token function">which</span> has the following phases:
* pre-clean: Not defined
* clean: org.apache.maven.plugins:maven-clean-plugin:2.5:clean
* post-clean: Not defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编译命令</span>
mvn clean <span class="token function">install</span> <span class="token parameter variable">-Dcheckstyle.skip</span><span class="token operator">=</span>true <span class="token parameter variable">-DskipTests</span> <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true

<span class="token comment"># 查看依赖书上</span>
mvn dependency:tree

<span class="token comment"># 查看有效POM</span>
mvn help:effective-pom

<span class="token comment"># 安装一个包到本地仓库</span>
mvn install:install-file <span class="token parameter variable">-Dfile</span><span class="token operator">=</span><span class="token operator">&lt;</span>path-to-file<span class="token operator">&gt;</span> <span class="token parameter variable">-DgroupId</span><span class="token operator">=</span><span class="token operator">&lt;</span>group-id<span class="token operator">&gt;</span> <span class="token parameter variable">-DartifactId</span><span class="token operator">=</span><span class="token operator">&lt;</span>artifact-id<span class="token operator">&gt;</span> <span class="token parameter variable">-Dversion</span><span class="token operator">=</span><span class="token operator">&lt;</span>version<span class="token operator">&gt;</span> <span class="token parameter variable">-Dpackaging</span><span class="token operator">=</span><span class="token operator">&lt;</span>packaging<span class="token operator">&gt;</span>
mvn install:install-file <span class="token parameter variable">-Dfile</span><span class="token operator">=</span><span class="token operator">&lt;</span>path-to-file<span class="token operator">&gt;</span> <span class="token parameter variable">-DpomFile</span><span class="token operator">=</span><span class="token operator">&lt;</span>path-to-pomfile<span class="token operator">&gt;</span>

<span class="token comment"># 部署一个包到远程仓库</span>
mvn deploy:deploy-file <span class="token punctuation">\\</span>
<span class="token parameter variable">-DgroupId</span><span class="token operator">=</span><span class="token operator">&lt;</span>group-id<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DartifactId</span><span class="token operator">=</span><span class="token operator">&lt;</span>artifact-id<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dversion</span><span class="token operator">=</span><span class="token operator">&lt;</span>version<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dpackaging</span><span class="token operator">=</span><span class="token operator">&lt;</span>type-of-packaging<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dfile</span><span class="token operator">=</span><span class="token operator">&lt;</span>path-to-file<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DrepositoryId</span><span class="token operator">=</span><span class="token operator">&lt;</span>id-to-map-on-server-section-of-settings.xml<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-Durl</span><span class="token operator">=</span><span class="token operator">&lt;</span>url-of-the-repository-to-deploy<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="maven-构建生命周期" tabindex="-1"><a class="header-anchor" href="#maven-构建生命周期" aria-hidden="true">#</a> Maven 构建生命周期</h2><p>Maven 将一个整体的构建任务划分为了一个一个的阶段。每个阶段的具体工作由一个个对应的 Maven 插件执行。</p><p>构建阶段分三个周期：</p><ol><li>clean —— 清理项目构建结果 <ul><li>pre-clean</li><li>clean</li><li>post-clean</li></ul></li><li>default/build —— 部署项目的构建处理 <ul><li>构建 <ul><li>validate</li><li>initialize</li><li>generate-sources</li><li>process-sources</li><li>generate-resources</li><li>process-resources</li><li>compile</li><li>process-classes</li></ul></li><li>测试 <ul><li>generate-test-sources</li><li>process-test-sources</li><li>generate-test-resources</li><li>process-test-resources</li><li>test-compile</li><li>process-test-classes</li><li>test <code>mvn test</code></li></ul></li><li>打包 <ul><li>prepare-package</li><li>package <code>mvn package</code></li><li>pre-integration-test</li><li>integration-test</li><li>post-integration-test <code>mvn integration-test</code></li><li>verify</li><li>install</li><li>deploy <code>mvn deploy</code></li></ul></li></ul></li><li>site —— 生成项目站点的文档 <ul><li>pre-site</li><li>site</li><li>post-site <code>mvn site</code></li><li>site-deploy</li></ul></li></ol><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Maven 生命周期由 <code>maven-core</code> 模块的 components.xml 文件定义</p></div><h2 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h2><h3 id="作用域-scope" tabindex="-1"><a class="header-anchor" href="#作用域-scope" aria-hidden="true">#</a> 作用域 scope</h3><p>作用域定义依赖的存在时期</p><table><thead><tr><th>作用域（Scope）</th><th>编译（Compile）</th><th>测试（Test）</th><th>运行（Run）</th><th>打包（Package）</th><th>示例</th></tr></thead><tbody><tr><td>compile（默认）</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>spring</td></tr><tr><td>provided</td><td>✔</td><td>✔</td><td>❌</td><td>❌</td><td>lombok</td></tr><tr><td>test</td><td>❌</td><td>✔</td><td>❌</td><td>❌</td><td>junit</td></tr><tr><td>runtime</td><td>❌</td><td>✔</td><td>✔</td><td>✔</td><td>tomcat、JDBCDriver</td></tr><tr><td>system</td><td>✔</td><td>✔</td><td>❌</td><td>❌</td><td>asm</td></tr></tbody></table><h3 id="依赖管理" tabindex="-1"><a class="header-anchor" href="#依赖管理" aria-hidden="true">#</a> 依赖管理</h3><p>todo 优先级、版本范围指定、版本固定之类的东西</p><p>使用 dependencyManagement 管理依赖版本。 在 dependencyManagement 中申明的 dependencies 不会被实际下载 jar 包，只有当该 jar 包被实际依赖后，才会去下载对应的 jar 包版本。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 只是对版本进行管理，不会实际引入jar --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>  
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>  
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>  
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>  
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>  
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.2.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>  
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>  
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>  
  
<span class="token comment">&lt;!-- 会实际下载jar包 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>  
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>  
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>  
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>  
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="maven-仓库" tabindex="-1"><a class="header-anchor" href="#maven-仓库" aria-hidden="true">#</a> Maven 仓库</h2><p>Maven 仓库是用来存放项目中依赖的软件包（jar、war、pom）和元素据（坐标信息、源码、作者、SCM、许可证）等信息</p><p>Maven 仓库有三种类型：</p><ul><li><strong>本地（Local）</strong> —— 本地缓存</li><li><strong>远程（Remote）</strong> —— 企业级内部构建的仓库，主要是为了统一管理和加快下载速度</li><li><strong>中央（Central0）</strong> —— 开源仓库</li></ul><p>优先级： 本地 &gt; 远程 &gt; 中央</p><p>仓库配置：</p><p>一般在 <code>.m2/repository/settings.xml</code> 上配置远程仓库，也可以在 pom.xml 上配置。 优先级： pom.xml &gt; user settings &gt; global settings</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn <span class="token parameter variable">-X</span> <span class="token comment"># 查看 settings.xml 文件的读取顺序</span>
mvn help:effective-settings <span class="token comment"># 查看当前生效的 settings.xml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h2><p>todo https://www.bilibili.com/video/BV1au4y1e7rE</p><p>前提：</p><ul><li>可以在 maven 生命周期（lifecycle）的每个阶段（phase）上绑定多个插件（plugin）的目标（goal）。当 maven 执行到对应的阶段时就会执行这些插件的目标。</li><li>多个目标（goal）绑定同一个阶段（phase）时，maven 会从上到下依次执行。</li><li>一个插件（plugin）可以包含多个目标（goal）。</li></ul><p>通过插件，可以在 maven 生命周期的某个阶段做特定的事情，比如：打包源码、打包 fat jar、混淆、加密、重新打包等。</p><h3 id="插件命名规则" tabindex="-1"><a class="header-anchor" href="#插件命名规则" aria-hidden="true">#</a> 插件命名规则</h3><p>一般定义插件的 artifactId 为 <code>xxx-maven-plugin</code> 或者 <code>maven-xxx-plugin</code>。 这里的 xxx 会被识别为前缀（prefix）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># gav:goal</span>
mvn com.roadjava.clazz:encrypt-maven-plugin:1.0.0:encrypt
<span class="token comment"># prefix:goal </span>
mvn encrypt:encrypt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面两句是等价的，就是调用 encrypt 插件的 encrypt 目标的 <code>execute()</code> 方法。</p><h3 id="常用插件" tabindex="-1"><a class="header-anchor" href="#常用插件" aria-hidden="true">#</a> 常用插件</h3><h4 id="deploy" tabindex="-1"><a class="header-anchor" href="#deploy" aria-hidden="true">#</a> deploy</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> --- deploy:2.8.2:help <span class="token punctuation">(</span>default-cli<span class="token punctuation">)</span> @ demo-java ---
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Apache Maven Deploy Plugin <span class="token number">2.8</span>.2
  Uploads the project artifacts to the internal remote repository.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="区别-deploy-和-deploy-file" tabindex="-1"><a class="header-anchor" href="#区别-deploy-和-deploy-file" aria-hidden="true">#</a> 区别 deploy 和 deploy-file</h5><ul><li><code>deploy:deploy</code> 用于自动安装工件、其 POM 和特定项目生成的附加工件。与部署相关的大多数（如果不是全部）信息都存储在项目的 pom 中。</li><li><code>deploy:deploy-file</code> 用于安装单个工件及其 pom。</li></ul><details class="custom-container details"><p>deploy:deploy</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>deploy:deploy
  Deploys an artifact to remote repository.

  Available parameters:

    altDeploymentRepository
      Specifies an alternative repository to <span class="token function">which</span> the project artifacts should
      be deployed <span class="token punctuation">(</span> other than those specified <span class="token keyword">in</span> <span class="token operator">&lt;</span>distributionManagement<span class="token operator">&gt;</span> <span class="token punctuation">)</span>.
      Format: id::layout::url
      <span class="token function">id</span>
        The <span class="token function">id</span> can be used to pick up the correct credentials from the
        settings.xml
      layout
        Either default <span class="token keyword">for</span> the Maven2 layout or legacy <span class="token keyword">for</span> the Maven1 layout.
        Maven3 also uses the default layout.
      url
        The location of the repository

    altReleaseDeploymentRepository
      The alternative repository to use when the project has a final version.

    altSnapshotDeploymentRepository
      The alternative repository to use when the project has a snapshot version.

    deployAtEnd
      Whether every project should be deployed during its own deploy-phase or at
      the end of the multimodule build. If <span class="token builtin class-name">set</span> to <span class="token boolean">true</span> and the build fails, none
      of the reactor projects is deployed. <span class="token punctuation">(</span>experimental<span class="token punctuation">)</span>

    retryFailedDeploymentCount
      Parameter used to control how many <span class="token builtin class-name">times</span> a failed deployment will be
      retried before giving up and failing. If a value outside the range <span class="token number">1</span>-10 is
      specified it will be pulled to the nearest value within the range <span class="token number">1</span>-10.

    skip
      Set this to <span class="token string">&#39;true&#39;</span> to bypass artifact deploy

    updateReleaseInfo
      Parameter used to update the metadata to <span class="token function">make</span> the artifact as release.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deploy:deploy-file</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>deploy:deploy-file
  Installs the artifact <span class="token keyword">in</span> the remote repository.

  Available parameters:

    artifactId
      ArtifactId of the artifact to be deployed. Retrieved from POM <span class="token function">file</span> <span class="token keyword">if</span>
      specified.

    classifier
      Add classifier to the artifact

    classifiers
      A comma separated list of classifiers <span class="token keyword">for</span> each of the extra side artifacts
      to deploy. If there is a mis-match <span class="token keyword">in</span> the number of entries <span class="token keyword">in</span> files or
      types, <span class="token keyword">then</span> an error will be raised.

    description
      Description passed to a generated POM <span class="token function">file</span> <span class="token punctuation">(</span>in <span class="token keyword">case</span> of <span class="token assign-left variable">generatePom</span><span class="token operator">=</span>true<span class="token punctuation">)</span>

    <span class="token function">file</span>
      File to be deployed.
      Required: Yes

    files
      A comma separated list of files <span class="token keyword">for</span> each of the extra side artifacts to
      deploy. If there is a mis-match <span class="token keyword">in</span> the number of entries <span class="token keyword">in</span> types or
      classifiers, <span class="token keyword">then</span> an error will be raised.

    generatePom
      Upload a POM <span class="token keyword">for</span> this artifact. Will generate a default POM <span class="token keyword">if</span> none is
      supplied with the pomFile argument.

    groupId
      GroupId of the artifact to be deployed. Retrieved from POM <span class="token function">file</span> <span class="token keyword">if</span>
      specified.

    javadoc
      The bundled API docs <span class="token keyword">for</span> the artifact.

    packaging
      Type of the artifact to be deployed. Retrieved from the <span class="token operator">&lt;</span>packaging<span class="token operator">&gt;</span>
      element of the POM <span class="token function">file</span> <span class="token keyword">if</span> a POM <span class="token function">file</span> specified. Defaults to the <span class="token function">file</span>
      extension <span class="token keyword">if</span> it is not specified via <span class="token builtin class-name">command</span> line or POM.
      Maven uses two terms to refer to this datum: the <span class="token operator">&lt;</span>packaging<span class="token operator">&gt;</span> element <span class="token keyword">for</span>
      the entire POM, and the <span class="token operator">&lt;</span>type<span class="token operator">&gt;</span> element <span class="token keyword">in</span> a dependency specification.

    pomFile
      Location of an existing POM <span class="token function">file</span> to be deployed alongside the main
      artifact, given by the <span class="token variable">\${file}</span> parameter.

    repositoryId
      Server Id to map on the <span class="token operator">&lt;</span>id<span class="token operator">&gt;</span> under <span class="token operator">&lt;</span>server<span class="token operator">&gt;</span> section of settings.xml In
      <span class="token function">most</span> cases, this parameter will be required <span class="token keyword">for</span> authentication.
      Required: Yes

    repositoryLayout
      The <span class="token builtin class-name">type</span> of remote repository layout to deploy to. Try legacy <span class="token keyword">for</span> a Maven
      <span class="token number">1</span>.x-style repository layout.

    retryFailedDeploymentCount
      Parameter used to control how many <span class="token builtin class-name">times</span> a failed deployment will be
      retried before giving up and failing. If a value outside the range <span class="token number">1</span>-10 is
      specified it will be pulled to the nearest value within the range <span class="token number">1</span>-10.

    sources
      The bundled sources <span class="token keyword">for</span> the artifact.

    types
      A comma separated list of types <span class="token keyword">for</span> each of the extra side artifacts to
      deploy. If there is a mis-match <span class="token keyword">in</span> the number of entries <span class="token keyword">in</span> files or
      classifiers, <span class="token keyword">then</span> an error will be raised.

    uniqueVersion
      Whether to deploy snapshots with a unique version or not.

    updateReleaseInfo
      Parameter used to update the metadata to <span class="token function">make</span> the artifact as release.

    url
      URL where the artifact will be deployed.
      ie <span class="token punctuation">(</span> file:///C:/m2-repo or scp://host.com/path/to/repo <span class="token punctuation">)</span>
      Required: Yes

    version
      Version of the artifact to be deployed. Retrieved from POM <span class="token function">file</span> <span class="token keyword">if</span>
      specified.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h5 id="使用-deploy-目标" tabindex="-1"><a class="header-anchor" href="#使用-deploy-目标" aria-hidden="true">#</a> 使用 deploy 目标</h5><p>settings.xml 设置私服位置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">&gt;</span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Nexus mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://localhost:8081/repository/maven-public/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>settings.xml 设置私服认证信息</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>admin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>xxx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pom.xml 设置部署位置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>distributionManagement</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- id 需要与 settings.xml 上一致 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://localhost:8081/repository/maven-snapshots/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>distributionManagement</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pom.xml 设置坐标。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 上传的坐标 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 上传的包名 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!-- 上传的版本 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>Maven 制品是按照 groupId/artifactId/version 路径存储的</p></div><p>上传命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn clean deploy <span class="token parameter variable">-s</span> ./settings.xml <span class="token parameter variable">-gs</span> ./settings.xml

<span class="token comment"># -s,--settings &lt;arg&gt; —— Alternate path for the user settings file </span>
<span class="token comment"># -gs,--global-settings &lt;arg&gt; —— Alternate path for the global settings file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用-deploy-目标的密码加密方案" tabindex="-1"><a class="header-anchor" href="#使用-deploy-目标的密码加密方案" aria-hidden="true">#</a> 使用 deploy 目标的密码加密方案</h5><p>上传私服需要设置明文密码，这一般是不被允许的。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>admin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>xxx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加密方案：</p><ul><li>配置环境变量</li><li>https://maven.apache.org/guides/mini/guide-encryption.html</li></ul><p>todo</p><h5 id="使用-deploy-file-目标" tabindex="-1"><a class="header-anchor" href="#使用-deploy-file-目标" aria-hidden="true">#</a> 使用 deploy-file 目标</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn deploy:deploy-file <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dfile</span><span class="token operator">=</span>D:<span class="token punctuation">\\</span>xxx<span class="token punctuation">\\</span>com.xxx.test-1.0.0.jar <span class="token punctuation">\\</span>
<span class="token parameter variable">-DpomFile</span><span class="token operator">=</span>./pom.xml <span class="token punctuation">\\</span>
<span class="token parameter variable">-DgroupId</span><span class="token operator">=</span>com.example.xxx <span class="token punctuation">\\</span>
<span class="token parameter variable">-DartifactId</span><span class="token operator">=</span>test <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dversion</span><span class="token operator">=</span><span class="token number">1.0</span>.0-SNAPSHOT <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dpackaging</span><span class="token operator">=</span>jar <span class="token punctuation">\\</span>
<span class="token parameter variable">-DrepositoryId</span><span class="token operator">=</span>nexus-mine <span class="token punctuation">\\</span>
<span class="token parameter variable">-Durl</span><span class="token operator">=</span>http://localhost:8081/repository/maven-snapshots/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-s</span> ./settings.xml <span class="token parameter variable">-gs</span> ./settings.xml <span class="token punctuation">\\</span>
<span class="token parameter variable">-Dmaven.wagon.http.ssl.insecure</span><span class="token operator">=</span>true <span class="token parameter variable">-Dmaven.wagon.http.ssl.allowall</span><span class="token operator">=</span>true <span class="token parameter variable">-Dmaven.wagon.http.ignore.validity.dates</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>

参数说明：
<span class="token parameter variable">-Dfile</span> 要上传包的本地路径
<span class="token parameter variable">-DpomFile</span> 本地 pom 文件路径。如果没有pom文件，maven会让你生成一个简易的pom文件
<span class="token parameter variable">-DgroupId</span> <span class="token parameter variable">-DartifactId</span> <span class="token parameter variable">-Dversion</span> 要上传的坐标名称
<span class="token parameter variable">-Dpackaging</span> 要上传包的格式。如 jar、rar、war、zip、<span class="token punctuation">..</span>. 
<span class="token parameter variable">-DrepositoryId</span> 用于查找 settings 中配置的仓库设置，从而找到 server 中要使用的账号、密码
<span class="token parameter variable">-Durl</span> 要上传的仓库地址
<span class="token parameter variable">-s</span> ./settings.xml <span class="token parameter variable">-gs</span> ./settings.xml 本地 settings 文件绝对路径
<span class="token parameter variable">-Dmaven.wagon.http.ssl.insecure</span><span class="token operator">=</span>true <span class="token parameter variable">-Dmaven.wagon.http.ssl.allowall</span><span class="token operator">=</span>true <span class="token parameter variable">-Dmaven.wagon.http.ignore.validity.dates</span><span class="token operator">=</span>true 证书校验（可忽略）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义" tabindex="-1"><a class="header-anchor" href="#自定义" aria-hidden="true">#</a> 自定义</h3><p>编写 pom.xml 文件</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 1. 指定 packaging 打包方式 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>packaging</span><span class="token punctuation">&gt;</span></span>maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>packaging</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>custom-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 2. 引入 api 依赖 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.maven<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>maven-plugin-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.5.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用注释或者注解的方式进行开发</p><h4 id="使用注释开发插件-不推荐" tabindex="-1"><a class="header-anchor" href="#使用注释开发插件-不推荐" aria-hidden="true">#</a> 使用注释开发插件（不推荐）</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * mojo: maven old java abject，每个 mojo 类都是 maven plugin 的一个执行目标（goal）。
 * 
 * <span class="token keyword">@goal</span> comment
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommentMojo</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractMojo</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MojoExecutionException</span><span class="token punctuation">,</span> <span class="token class-name">MojoFailureExecution</span> <span class="token punctuation">{</span>
    <span class="token class-name">Log</span> log <span class="token operator">=</span> <span class="token function">getLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;执行了 goal:comment 的 execute 方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>todo</p><h2 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h2><h3 id="语法兼容" tabindex="-1"><a class="header-anchor" href="#语法兼容" aria-hidden="true">#</a> 语法兼容</h3><p>todo <code>maven-compiler-plugin</code></p><h3 id="静态检查" tabindex="-1"><a class="header-anchor" href="#静态检查" aria-hidden="true">#</a> 静态检查</h3><p>静态检查希望对代码库或二进制文件在不运行任何相关代码的情况下进行测试，以发现潜在的问题、确保代码质量。</p><ul><li>CheckStyle —— 代码规范检查工具</li><li>PMD —— 代码编码缺陷检查工具，如：未使用的变量、空try-catch块、不必要的对象创建</li><li>Findbugs —— 将编译后的字节码与一组错误模型对比，识别出代码中的缺陷。如：未使用的错误方法、空指针引用、资源泄露等</li></ul><p>todo</p><h2 id="maven-私服" tabindex="-1"><a class="header-anchor" href="#maven-私服" aria-hidden="true">#</a> Maven 私服</h2><p>常见的 Maven 私服产品：</p><ul><li>Apache 的 Archiva</li><li>JFrog 的 Artifactory</li><li>Sonatype 的 Nexus （关系；联系；） —— 最流行、最广泛</li></ul><h3 id="nexus-安装、使用" tabindex="-1"><a class="header-anchor" href="#nexus-安装、使用" aria-hidden="true">#</a> Nexus 安装、使用</h3>`,80),g={href:"https://help.sonatype.com/repomanager3/product-information",target:"_blank",rel:"noopener noreferrer"},b={href:"https://help.sonatype.com/en/download.html",target:"_blank",rel:"noopener noreferrer"},h=t(`<p>选择版本下载，管理员启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./nexus /run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>localhost:8081</code></p><p>初始配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 更改默认密码！</span>
右上角 login <span class="token keyword">in</span>
默认账户/密码
admin/按操作提示
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认仓库： 我们关心 maven 开头的仓库即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>maven-central（proxy） —— proxy=远程中心仓库的代理。设置界面可以设置代理的远程中心仓库地址
maven-public（group） —— group=主仓库。远程下载的jar包会存放在这个地址。
maven-releases（hosted） —— hosted=本地仓库。存放公司内部上传的jar包。releases=发布，正式版本。
maven-snapshots（hosted） —— snapshots=快照，测试版本。
nuget-group
nuget-hosted
nuget.org-proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置maven仓库" tabindex="-1"><a class="header-anchor" href="#配置maven仓库" aria-hidden="true">#</a> 配置maven仓库</h4><p>settings.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirror</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mirrorOf</span><span class="token punctuation">&gt;</span></span>central<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirrorOf</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Nexus mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://localhost:8081/repository/maven-public/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mirror</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果禁用了匿名访问，需要添加用户设置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>server</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>admin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>xxx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>server</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下载依赖、编译工程</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn clean compile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="部署jar包" tabindex="-1"><a class="header-anchor" href="#部署jar包" aria-hidden="true">#</a> 部署jar包</h5><p>pom.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 管理工程部署位置配置 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>distributionManagement</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- id 需要与 settings.xml 上一致 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>Nexus mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://localhost:8081/repository/maven-snapshots/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshotRepository</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>distributionManagement</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mvn clean deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="引用部署的jar包" tabindex="-1"><a class="header-anchor" href="#引用部署的jar包" aria-hidden="true">#</a> 引用部署的jar包</h4><p>pom.xml</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">&gt;</span></span>nexus-mine<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://localhost:8081/repository/maven-snapshots/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 是否使用 snapshot/relase 版本依赖 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repositories</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function f(y,x){const s=l("ExternalLinkIcon");return i(),o("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[a("(0) 用Maven建立專案"),e(s)])]),n("li",null,[n("a",u,[a("(1) Maven的生命週期(Phase, Plugin, Goal)"),e(s)])]),n("li",null,[n("a",v,[a("(2) 使用 Maven 將 Plugin Goals 綁定至 Phase"),e(s)])]),n("li",null,[n("a",m,[a("(3) 使用 Maven Wrapper"),e(s)])])]),k,n("p",null,[a("官网： "),n("a",g,[a("https://help.sonatype.com/repomanager3/product-information"),e(s)])]),n("p",null,[a("下载： "),n("a",b,[a("https://help.sonatype.com/en/download.html"),e(s)])]),h])}const D=p(c,[["render",f],["__file","maven.html.vue"]]);export{D as default};
