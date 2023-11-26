---
title: Spring Cloud 使用笔记
tags:
  - SpringCloud
---

+ [ ] todo <https://www.bilibili.com/video/BV1mW4y1q7h9/>
+ [ ] todo <https://www.bilibili.com/video/BV1LQ4y127n4/>

Spring Cloud 由众多子项目组成，如 Spring Cloud Config、Spring Cloud Netflix、Spring Cloud Consul 等，提供了搭建分布式系统及微服务常用的工具，如配置管理、服务发现、断路器、智能路由、微代理、控制总线、一次性token、全局锁、选主、分布式会话和集群状态等，满足了构建微服务所需的所有解决方案。Spring Cloud 基于 Spring Boot, 使得开发部署极其简单。

## RPC

RPC（Remote Procedure Call Protocol）远程过程调用协议。一个通俗的描述是：客户端在不知道调用细节的情况下，调用存在于远程计算机上的某个对象，就像调用本地应用程序中的对象一样。

![image.png](https://s2.loli.net/2023/11/25/zRIthN3ArZiqBTH.png)

目前典型的RPC实现包括：

+ Dubbo —— 阿里巴巴内部的SOA服务化治理方案的核心框架，Dubbo自2011年开源后，已被许多非阿里系公司使用。Dubbo 是一个分布式服务框架，以及SOA治理方案。其功能主要包括：高性能NIO通讯及多协议集成，服务动态寻址与路由，软负载均衡与容错，依赖分析与降级等。
+ Thrift —— 一个软件框架，用来进行可扩展且跨语言的服务的开发。它结合了功能强大的软件堆栈和代码生成引擎，以构建在 C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, JavaScript, Node.js, Smalltalk, and OCaml 这些编程语言间无缝结合的、高效的服务。
+ gRPC —— 由 google 开发，是一款语言中立、平台中立、开源的远程过程调用(RPC)系统。
+ Hetty
