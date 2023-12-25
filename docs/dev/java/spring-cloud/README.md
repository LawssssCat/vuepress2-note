---
title: Spring Cloud 使用笔记
tags:
  - SpringCloud
  - todo
---

+ [ ] todo <https://www.bilibili.com/video/BV1mW4y1q7h9/>
+ [ ] todo <https://www.bilibili.com/video/BV1LQ4y127n4/>

Spring Cloud 是一套分布式微服务的技术解决方案，提供了快速构建分布式系统的常用组件，比如配置管理、服务的注册与发现、服务调用的负载均衡、资源隔离、熔断降级等等。

+ 配置管理 config
+ 消息总线 bus
+ 服务管理 native
+ 集群 cluster
+ 消息驱动 stream
+ 定时任务 task
+ 服务跟踪 sleuth
+ 服务安全 Security
+ 服务网关 gateway

不过，Spring Cloud 只是 Spring 官方提供的一套标准化的微服务定义，而真正的实现目前有两套方案：Spring Cloud Netflix、Spring Cloud Alibaba。

+ Spring Cloud Netflix 基于 Netflix 公司的开源组件集成的一套微服务解决方案，包括：
  + Eureka 服务注册与发现
  + Hystrix 服务熔断
  + Zuul 网关
  + Ribbon 负载均衡
  + Feign 服务调用
+ Spring Cloud Alibaba 基于阿里巴巴开源组件集成的一套微服务解决方案，包含：
  + Nacos服务注册与配置中心
  + Sentinel 服务监控降级
  + Dubbo RPC通讯
  + Seata 分布式事务
  + RocketMQ 分布式消息系统
  + SchedulerX 分布式任务调度

微服务周边配套

+ 应用监控的全链路自动化
  + 如在各个微服务、中间件中埋点收集指标，然后自动化上报
+ 分布式链路追踪
  + Dapper - Google 2010
  + 鹰眼 - 阿里
  + Cat - 大众，开源
  + Zipkin - Twitter 2012开源
  + Jaeger - Uber 2017开源
  + Pinpoint - 2015开源
  + 所形成的技术标准/技术规范：Opentracing+OpenCensus=OpenTelemetry（2019发布）
+ CI/CD整合
  + service-name与CMDB（物理资源：机房、机架、机器列表等信息）的对应关系
+ 分布式日志采集
  + ELK体系： ES，LogStash
  + Kibana

## RPC

RPC（Remote Procedure Call Protocol）远程过程调用协议。一个通俗的描述是：客户端在不知道调用细节的情况下，调用存在于远程计算机上的某个对象，就像调用本地应用程序中的对象一样。

![image.png](https://s2.loli.net/2023/11/25/zRIthN3ArZiqBTH.png)

目前典型的RPC实现包括：

+ Dubbo —— 阿里巴巴内部的SOA服务化治理方案的核心框架，Dubbo自2011年开源后，已被许多非阿里系公司使用。Dubbo 是一个分布式服务框架，以及SOA治理方案。其功能主要包括：高性能NIO通讯及多协议集成，服务动态寻址与路由，软负载均衡与容错，依赖分析与降级等。
+ Thrift —— 一个软件框架，用来进行可扩展且跨语言的服务的开发。它结合了功能强大的软件堆栈和代码生成引擎，以构建在 C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, JavaScript, Node.js, Smalltalk, and OCaml 这些编程语言间无缝结合的、高效的服务。
+ gRPC —— 由 google 开发，是一款语言中立、平台中立、开源的远程过程调用(RPC)系统。
+ Hetty
