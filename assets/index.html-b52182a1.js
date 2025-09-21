import{_ as c,r as i,o as s,c as d,d as o,w as t,b as e,t as n,a as r}from"./app-04e6f892.js";const l={},u=r("h2",{id:"路线图",tabindex:"-1"},[r("a",{class:"header-anchor",href:"#路线图","aria-hidden":"true"},"#"),e(" 路线图")],-1);function m(f,h){const a=i("mermaid");return s(),d("div",null,[u,o(a,null,{default:t(()=>[e(n(`
mindmap
  root((基础))
  ::icon(fa fa-check-square)
    数据结构和算法
    Linux操作系统
    计算机网络
    数据库
    消息队列
    Java语法基础
`),1)]),_:1}),o(a,null,{default:t(()=>[e(n(`
mindmap
  root((核心))
  ::icon(fa fa-check-square)
    架构
      单体
      微服务、rpc技术栈
      服务治理
    高并发
      缓存 - 高并发
      负载均衡
      性能优化 - jvm调优/线程池调优/平均RT/TP99/TP999表现
    集群
      分布式
      分布式配置/锁/... - 配置中心、分库分表sharding概念
    高可用
      服务监控/告警
      容灾方面考虑
        异地多活
        容灾预案
    其他
      搜索
      中间件
      容器
      安全 - https/oauth2
      多语言 - c++/java/go
    ...
`),1)]),_:1}),o(a,null,{default:t(()=>[e(n(`
mindmap
  root((技术栈))
  ::icon(fa fa-check-square)
    基础架构
      Spring🔥
      Spring Boot🔥 装配原理
      JPA🔥
      JVM 调优
    微服务
      Spring Cloud🔥
      RPC（Dubbo Grpc）
      Config Center
      Gateway
      Zookeeper
    数据库
      MongoDB
      MySQL
    安全
      Spring Security 如何定义过滤器
    集群/负载均衡
      Nginx 配置和lua脚本编写
      Tomcat
      K8s
    缓存
      Redis🔥
        如何做集群
    搜索
      ES
    消息队列
      Kafka🔥 - 消息队列
        如何设置合适的分区
        消息积压怎么处理
      Sharding - 分库分表
      Hystrix/Sentinel - 断路/限流
        如何针对外部依赖进行动态降级
        如何根据规则限流
    持续集成
      CI/CD - 自动化部署
    监控
      Prometheus
    其他
      Sleuth
      Nacos/Apollo
      HAProxy
      LVS
      OSS - 文件存储
      其他编程语言
`),1)]),_:1})])}const _=c(l,[["render",m],["__file","index.html.vue"]]);export{_ as default};
