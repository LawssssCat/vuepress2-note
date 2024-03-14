---
title: Kubernetes 使用笔记
description: 容器编排工具
tags:
  - k8s
---

todo https://www.bilibili.com/video/BV1MT411x7GH 完整版Kubernetes（K8S）全套入门+微服务实战项目，带你一站式深入掌握K8S核心能力

前置：

+ Linux
+ Docker

可选：

+ Java 微服务
+ Redis
+ Elasticsearch
+ Prometheus
+ Jenkins

## 微服务

### 微服务通信

通信协议：

+ REST API
+ RPC
+ MQ

#### RPC框架

考虑

+ I/O、线程调度模型
+ 序列化方式
+ 多语言支持
+ 服务治理

流行的RPC框架

RPC对比 | Dubbo/Dubbox | Motan | Thrift | Grpc
--- | --- | --- | --- | ---
开发团队 | Dubbo - 阿里 <br> Dubbox - 当当 | 新浪微博 | apache | google
开发语言 | Java | Java | 跨语言 | 跨语言
服务治理 | ✅ | ✅ | ❌ | ❌
多种序列化 | ✅ | ✅ | 只支持thrift | 只支持protobuf
多种注册中心 | ✅ | ✅ | ❌ | ❌
管理中心 | ✅ | ✅ | ❌ | ❌
跨语言通信 | ❌ | ❌ | ✅ | ✅
~~整理性能~~ | 3 | 4 | 5 | 3
通信架构 | ![image.png](https://s2.loli.net/2024/03/06/yr5gho7T3i18bks.png) | ![image.png](https://s2.loli.net/2024/03/06/YANgHPkIZVjpoMz.png) | ![image.png](https://s2.loli.net/2024/03/06/25ZunBshdkGP7V9.png) | ![image.png](https://s2.loli.net/2024/03/06/8rgYWh3QyUMpfoc.png)

### 服务发现

传统服务配置 —— 需要运维人员手动配置

![image.png](https://s2.loli.net/2024/03/06/8GRUtZn7J93apfC.png)

客户端发现 —— 访问多个ip，ip后的服务器直接提供服务

![image.png](https://s2.loli.net/2024/03/06/5mMdiRu2sWTGweO.png)

服务端发现 —— 访问一个ip，ip后的服务器通过正向代理方式提供服务

![image.png](https://s2.loli.net/2024/03/06/w9WSpPJIlG6AmZN.png)

### 服务部署、更新、扩容

传统方式 —— 准备代码、准备制品、准备服务器、修改配置，分配端口、运维部署应用（手动/脚本/自动化）、配置反向代理

服务编排 —— 服务发现、服务部署/更新/扩容

流行的服务编排工具 | Mesos | Docker Swarm | Kubernetes
--- | --- | --- | ---
todo

## 容器化介绍

### 部署方式对比

todo 2
