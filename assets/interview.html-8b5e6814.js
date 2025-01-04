import{_ as d,r as n,o as h,c,a as l,b as e,d as i,w as t,t as o,e as a}from"./app-01e1299e.js";const p={},u=a('<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><h3 id="微服务、中台、低代码平台" tabindex="-1"><a class="header-anchor" href="#微服务、中台、低代码平台" aria-hidden="true">#</a> 微服务、中台、低代码平台</h3><p>阶段</p><ul><li>17~18 微服务</li><li>18~19 中台</li><li>19~20 RPA、自动化机器人、数字化营销</li><li>20~21 低代码开发平台</li></ul><h4 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h4>',5),S={href:"https://www.bilibili.com/video/BV1mW4y1q7h9/?",target:"_blank",rel:"noopener noreferrer"},g=a('<p>把传统的单体架构的业务系统打散为更细粒度的单位。每一个单位都是可以独立的进行需求设计开发测试部署和交付，每个单位都能做到独立自治。同时，拆分出来的每个单位之间都只能通过轻量的 rest API 接口进行协同或者交互。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>核心： 大拆小，小组件能做到独立和自治！</p></div><p>专有名词</p><ul><li>soa集成平台、soa组件化、soa服务化 —— 微服务以前的努力，中心化</li><li>去中心化</li><li>esp总线</li></ul><p>步骤</p><ol><li>大系统拆分成一二十个组件，组件间要有独立的数据库，通过api接口集成 <ul><li>问题： 重心不应该放在微服务框架本身，如：rest-api接口、dubble、rpc、spring-cloud、spring-boot。重心需要放在微服务的拆分和微服务的后期管控治理。如果没抓住重心，可能导致后期大量的集成和运维的困难。</li></ul></li></ol><p>例子</p>',7),A=l("tr",null,[l("td",{width:"50%"},"单体架构"),l("td",{width:"50%"},"微服务")],-1),I=l("tr",null,[l("td",null,[l("ul",null,[l("li",null,"虽然在表现层用户在web界面可以看到三个一级子菜单，但是到了逻辑层可以看到“招标”、“基础数据”、“采购”三个组件是紧密耦合在一起的，它们之间有大量的交叉调用，完全无法拆开独立部署。"),l("li",null,"另外，数据库也是统一使用一个大数据库进行数据存储。")])]),l("td",null,[l("ul",null,[l("li",null,"逻辑层拆分为三个微服务，每个微服务可以独立设计、开发、打包、部署"),l("li",null,"三个微服务的数据库也完全拆分"),l("li",null,"微服务三者之间有大量的业务接口和数据交互，通过轻量的接口方式去调用。主流常用的有gRPC接口或restAPI接口"),l("li",null,"通过服务的注册和发现中心通告接口地址、实现接口的交互和调用。e.g.当“基础数据”中有一个“供应商”的接口暴露出来后首先注册到注册中心，“招标中心”从注册中心找到接口地址然后发起对“供应商”接口的调用。（这些逻辑封装为了“Feign”组件）"),l("li",null,"虽然有注册中心的存在，但是微服务可以认为是“去中心化”的架构，因为即便注册中心宕机，各微服务间仍然可以依靠接口的缓存信息实现业务的进行"),l("li",null,"最后，前端通过微服务网关调用后端的微服务接口"),l("li",null,"最后最后，“微服务网关”粒度到微服务级别，“API网关”粒度到微服务里的API接口级别。")])])],-1),P=a('<div class="custom-container tip"><p class="custom-container-title">提示</p><p>上面展示了微服务治理的基本框架。但是这个架构中，微服务网关/API网关仍然有中性化的功能，这可以优化： 在微服务治理成功实施后，我们可以把API网关的流量管控拦截能力通过<code>sidecar</code>方式下方到一个个微服务的边车端。这样，微服务网关/API网关就仅需要做流量转发。这时候，我们使用常规的负载均衡的集群或者k8s的负载均衡的能力就可以满足高并发的需求了。</p></div><h4 id="中台" tabindex="-1"><a class="header-anchor" href="#中台" aria-hidden="true">#</a> 中台</h4><p>强调企业共性的业务能力下沉，类似再之前的soa共享业务平台（概念完全一样）。</p><h4 id="rpa-自动化流程机器人" tabindex="-1"><a class="header-anchor" href="#rpa-自动化流程机器人" aria-hidden="true">#</a> RPA 自动化流程机器人</h4><p>一个折衷的概念，一个信息化建设中间阶段的一个产物。为了解决平台缺乏接口时的重复操作，如没有报销平台没有开放报销接口，报销时需要手动一条条输入。</p><h4 id="数字化营销" tabindex="-1"><a class="header-anchor" href="#数字化营销" aria-hidden="true">#</a> 数字化营销</h4><p>自媒体、流量时代被炒作出来的概念。导致很多原来做crm的厂商转做数字化营销，强调流量经营、强调如何从公域流量转私域流量。 但是有个问题没有解决，就是引流过来后如何成单变现的问题没有解决。这导致数字化营销的效果并不明显。</p><h4 id="低代码开发平台" tabindex="-1"><a class="header-anchor" href="#低代码开发平台" aria-hidden="true">#</a> 低代码开发平台</h4><p>低代码平台本身是好的。他主要面向 OA 或 IT运维 这种底层业务对象模型不复杂的系统。这种系统更多的创建工单，挂一个流程引擎跑审批、权限的控制，业务相对简单。 但是对于复杂的对象模型则很难用低代码平台实现，类似舍近求远的感觉 —— 不要把企业核心的业务系统架构再低代码开发平台上！否则你会发现，系统在开可靠、高可用、高性能、高扩展各方面都存在问题！</p><h3 id="开发、治理、边车代理-sidecar" tabindex="-1"><a class="header-anchor" href="#开发、治理、边车代理-sidecar" aria-hidden="true">#</a> 开发、治理、边车代理（sidecar）</h3><p>todo</p><h2 id="注册中心" tabindex="-1"><a class="header-anchor" href="#注册中心" aria-hidden="true">#</a> 注册中心</h2><p>阿里 Nacos</p><p>奈菲 Eureka</p><p>Consul</p><p>优点：</p><ol><li>故障发现、故障转移</li><li>多种负载均衡策略</li></ol><p>问题：</p><ol><li>复杂度</li></ol><h2 id="api网关" tabindex="-1"><a class="header-anchor" href="#api网关" aria-hidden="true">#</a> API网关</h2><h3 id="api网关选择" tabindex="-1"><a class="header-anchor" href="#api网关选择" aria-hidden="true">#</a> API网关选择</h3><ul><li>Kong 网关 —— 资料更全</li><li>API six 网关 —— 性能更强</li></ul><h4 id="kong-网关" tabindex="-1"><a class="header-anchor" href="#kong-网关" aria-hidden="true">#</a> Kong 网关</h4><p>Kong 网关底层基于 OpenRestry，可以很方便的通过 lua 脚本做插件扩展。</p><p>对 Kong 网关的定制开发主要包括三个方面：</p><ol><li><strong>对接口协议的适配</strong> —— 基本的 API 网关只对接 Http Rest API 接口： <ol><li><strong>对消息的集成和适配</strong>。如 API 网关对接底层 ActiveMQ 消息中间件，然后对消费者暴露 Rest API 接口，消费者调用 Rest API 接口后，将消息推送给消息中间件，消费方可以订阅接口获取数据。<strong>通过这种方式，把同步的服务集成变成一个异步的消息集成</strong>。</li><li>对某些系统提供的 SOAP 的 web service 服务动态转换成 Http Rest API 接口。</li><li><strong>对于数据库，在 API 网关前端增加一个子系统 “API快速开发平台”</strong>。这个平台可以把数据库的数据对象数据表包括我们自己写的参数化的 SQL 语句动态发布为一个 http API 接口。</li></ol></li><li><strong>对管控治理能力的改进</strong><ol><li><strong>安全控制方面的管控治理能力的改进</strong>： <ol><li>增加对接口的安全管理访问控制。实际上 API 网关本身提供了相应的用户名密码、相应的业务系统访问的控制能力。但是，我们需要把这些能力做成前端界面，可以灵活配置。如做到可以详细的控制到微服务A能否访问微服务B的某个接口，同时相应的消费方又会跟后续具体的一些 ip 地址做绑定，最终实现对 ip 地址的访问控制能力。</li><li>增加动态 Token 的访问控制能力。对于消费方会动态的发放一个 Token 令牌，每次调用接口都会要传递这个 Token 值，而且这个 Token 值会动态定期刷新。</li></ol></li><li><strong>对日志审计、日志管理能力的改进</strong>： <br> 对于任何一次接口的调用，都能查到详细的接口调用日志。包括接口的消息输入、消息输出、整体的消息报文流都要做完整的记录。 <ol><li>基于 Lua 语言和本身提供的 log 日志插件做扩展，把整个消息流全部做落地存储。 <ul><li>当数据量小时，可以直接存到数据库中。</li><li>当数据量大后，可以把他放在 es 库或者是 solr 库，这些库本身也支持全文检索的能力。</li><li>当数据量更大时，可以把他放在 Hdfs 里或者 Hbase 数据库里面，然后基于这种分布式存储数据库上面再做一个二级缓存能力</li></ul></li></ol></li><li><strong>对限流熔断能力的改进</strong>： <br> API 网关本身有限流熔断的能力。但是，实际的应用场景需要把限流熔断控制到某一个接口加某一个消费方的粒度，而不是说当某一个接口出现大并发大报文调用时直接把整个 API 接口全部熔断掉。所以这里需要做限流熔断的扩展。基本上做到基于某一个单位时间间隔内，根据整个业务调用的并发量、数据量、调用的异常数等各种维度的组合来做某一个接口的限流熔断。</li></ol></li><li><strong>对 API 网关和整个容器云和 devops 平台的融合</strong><ol><li><strong>按 API 接口的粒度，自动化的将其微服务接口注册到 API 网关上</strong>： <br> 对于 Kong 网关最新的版本本身已经可以作为一个 Kubernetes 的 Ingress 网关来使用。所以有了这个能力后，我们需要配合整个 CICD 过程来做一件重要的事情，就是当某个微服务通过持续集成交付，将微服务部署到容器云环境的时候，要识别出微服务里面需要暴露哪一些 API 接口，按 API 接口的细粒度自动化接入和注册到上层的 API 网关，不是把整个微服务接入到上层的 Ingress 网关，同时这个过程需要完全的自动化，而不是人为的将一个个 API 接口注册和接入。</li></ol></li></ol>',26);function b(B,_){const s=n("ExternalLinkIcon"),r=n("mermaid");return h(),c("div",null,[u,l("p",null,[e("参考： "),l("a",S,[e("https://www.bilibili.com/video/BV1mW4y1q7h9/?"),i(s)])]),g,l("table",null,[A,l("tr",null,[l("td",null,[i(r,null,{default:t(()=>[e(o(`
flowchart TB
subgraph BS表现层
  BS1(["招标"])
  BS2(["基础数据"])
  BS3(["采购"])
end
BS1 --> LS1
BS3 --> LS3
subgraph LS["逻辑层"]
  LS1["招标"] <==>|依赖| LS2["基础数据"] <==>|依赖| LS3["采购"]
end
DB[(DB)]
BS2 --> LS2
LS1 --> DB
LS2 --> DB
LS3 <==>|依赖| LS1
LS3 --> DB
`),1)]),_:1})]),l("td",null,[i(r,null,{default:t(()=>[e(o(`
flowchart TB
subgraph BS表现层
  BS1(["招标"])
  BS2(["基础数据"])
  BS3(["采购"])
end
GR["微服务网关/API网关"]
BS1 --> GR
BS2 --> GR
BS3 --> GR
subgraph LS["逻辑层"]
  LS1["招标Jar"]
  LS2["基础数据Jar"]
  LS3["采购Jar"]
end
GR -...->|注册| LS1
GR -...->|注册| LS2
GR -...->|注册| LS3
CR["微服务注册中心"]
LS1 -...->|注册/发现| CR
LS2 -...->|注册/发现| CR
LS3 -...->|注册/发现| CR
LS1 --> DB1[(DB)]
LS2 --> DB2[(DB)]
LS3 --> DB3[(DB)]
`),1)]),_:1})])]),I]),P])}const f=d(p,[["render",b],["__file","interview.html.vue"]]);export{f as default};
