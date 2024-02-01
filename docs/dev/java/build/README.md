---
title: Java 构建笔记
---

时间 | 名称 | 描述 | 文件 | 优点 | 缺点
--- | --- | --- | --- | --- | ---
2000 | ant | 是一个将软件编译、测试、部署等步骤联系在一起的自动化工具 | build.xml | <ul><li>灵活</li></ul> | <ul><li>依赖管理能力差</li><li>手工维护巨大xml文件，易出错</li><li>构建速度慢</li></ul>
2004 | maven | 项目管理及自动构建工具。基于项目对象模型（POM）概念，利用一个中央信息片段管理一个项目的构建、报告和文档等步骤 | pom.xml | <ul><li>稳定、生态好（插件多、用户多）</li><li>生命周期配置管理规范、约定大于配置</li><li>具备工程继承能力、手工编写xml最少</li><li>强大的依赖管理能力</li></ul> | <ul><li>没有对增量构建做优化（有做尝试`maven-mvnd`但未发布）</li><li>主要用在Java场景，不太适配多语言场景</li></ul>
2012 | gradle | 基于 Ant 和 Maven 概念的项目自动化构建工具 | build.gradle | <ul><li>构建速度快：利用守护进程监控构建元素据变化的cache机制，能在增量构建时比Maven快几倍</li><li>使用的DSL脚本语言同时具备灵活性和约定性</li><li>继承了maven仓库、坐标、依赖、插件、布局等核心概念；又继承了ant中的target概念</li></ul> | <ul><li>学习成本高：Gradle 构建脚本使用的是 Groovy 或 Kotlin 的特定领域语言来编写的，而不是传统的XML</li><li>版本升级快、版本兼容问题多</li></ul>
2018 | sbt | Simple build tool 是 Scala 的标准构建工具 | .sbt | <ul><li>Scala DSL 编写构建过程灵活</li><li>LVY作为库管理、测试、集成、部署都支持</li><li>支持Java与Scala混合的项目</li></ul> | <ul><li>在Java构建的生态差</li><li>学习成本高</li></ul>
2019 | bazel | 一个支持多语言、跨平台的构建工具 | BUILD<br>BUILD.bazel | <ul><li>庞大的代码库支持好</li><li>增量构建快</li><li>多语言混合构建场景好</li><li>正确性和可重复性好</li></ul> | <ul><li>生态差</li><li>学习成本高</li></ul>
