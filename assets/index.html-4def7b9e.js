import{_ as s,r as l,o as d,c,d as t,w as o,b as i,t as r,a as e,e as h}from"./app-04e6f892.js";const _={},p=e("h2",{id:"路线图",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#路线图","aria-hidden":"true"},"#"),i(" 路线图")],-1),u=h('<h3 id="数据仓库" tabindex="-1"><a class="header-anchor" href="#数据仓库" aria-hidden="true">#</a> 数据仓库</h3><p>技术框架：</p><p><img src="https://s2.loli.net/2023/11/23/72afMcRVXko64JI.png" alt="ljilgmb4uqzJhA9T-image-1700621825912.png"></p><p>ADS 应用数据层 - 数据集市 <br> DWS 轻度汇总层 - 主题宽表 <br> DWD 明细数据层 - dim表 <br> ODS 原始数据层 <br> STG 缓冲数据层</p><h4 id="数据开发" tabindex="-1"><a class="header-anchor" href="#数据开发" aria-hidden="true">#</a> 数据开发</h4><p>采集数据</p><h4 id="etl、bi" tabindex="-1"><a class="header-anchor" href="#etl、bi" aria-hidden="true">#</a> ETL、BI</h4><ul><li>ETL - 聚类数据</li><li>BI - 可视化数据</li></ul>',8),b=e("p",null,"工作比较简单，但是需要经验，起薪高但瓶颈快。后期核能转数据开发、数据分析。",-1),L=e("p",null,"视频",-1),m={href:"https://www.bilibili.com/video/BV13e411N7hk/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.bilibili.com/video/BV1AT411X7hd/",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.bilibili.com/video/BV1mG41137WV/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.bilibili.com/video/BV1k3411A7A7/",target:"_blank",rel:"noopener noreferrer"},k=e("h4",{id:"数据分析",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据分析","aria-hidden":"true"},"#"),i(" 数据分析")],-1),x=e("p",null,"加工数据",-1);function B(T,E){const a=l("mermaid"),n=l("ExternalLinkIcon");return d(),c("div",null,[p,t(a,null,{default:o(()=>[i(r(`
mindmap
  root((基础))
  ::icon(fa fa-check-square)
    数据结构和算法
    Linux操作系统
    计算机网络
    数据库
    消息队列
    Java语法基础
`),1)]),_:1}),t(a,null,{default:o(()=>[i(r(`
mindmap
  root((核心))
  ::icon(fa fa-check-square)
    数据仓库
    任务调度
    实时计算
    离线计算
    部署运维
    数据采集
    数据分析
    流/批处理
    BI分析
    数据传输
    算法
    ...
`),1)]),_:1}),t(a,null,{default:o(()=>[i(r(`
mindmap
  root((技术栈))
  ::icon(fa fa-check-square)
    HDFS
    Yarn
    Sqoop
    Flume
    Hive🔥
    Hbase🔥
    Zookeeper🔥
    Spark🔥
    Flink🔥 - 实时计算
    Scala🔥
    Kafka
    Presto
    Storm
    Mesos
    ...
`),1)]),_:1}),u,t(a,null,{default:o(()=>[i(r(`
flowchart TD
subgraph S1["业务系统"]
  S1L1["财务系统"]
  S1L2["CRM系统"]
  S1L3["销售系统"]
  S1L4["人力资源系统"]
end
subgraph S2["数据仓库管理系统"]
  S2L1["ETL"]
  S2L2{"计算分析"}
  S2L3[("DB")]
  S2L1 --> S2L2 --> S2L3
end
S1L1 --> S2L1
S1L2 --> S2L1
S1L3 --> S2L1
S1L4 --> S2L1
`))]),_:1}),b,L,e("ul",null,[e("li",null,[i("[ ] 大数据开发项目实战：kettle开发案例、ETL电商订单综合案例【黑马程序员】 - "),e("a",m,[i("https://www.bilibili.com/video/BV13e411N7hk/"),t(n)])]),e("li",null,[i("[ ] 大数据ETL开发综合实战案例，轻松进阶ETL工程师--Python大数据开发V3.0系列教程第04部 - "),e("a",f,[i("https://www.bilibili.com/video/BV1AT411X7hd/"),t(n)])]),e("li",null,[i("[ ] 一套搞定大数据ETL开发工程师必备技能——Linux、MySQL、Excel、FineBI、ETL处理工具kettle - "),e("a",S,[i("https://www.bilibili.com/video/BV1mG41137WV/"),t(n)]),i(" 一[ ] 套搞定大数据ETL开发工程师必备技能——Linux、MySQL、Excel、FineBI、ETL处理工具kettle")]),e("li",null,[i("[ ] ETL银行项目(项目流程&结构理论) - "),e("a",w,[i("https://www.bilibili.com/video/BV1k3411A7A7/"),t(n)])])]),k,x])}const v=s(_,[["render",B],["__file","index.html.vue"]]);export{v as default};
