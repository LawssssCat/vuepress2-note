---
title: Jacoco 测试覆盖率插件
---

参考： https://www.bilibili.com/video/BV1tr4y1i7f1/

Jacoco 是一个开源的代码覆盖率工具，它针对的开发语言是 Java。

::: tip
+ Java - Jacoco
+ C++ - Testwell
+ Python - Coverage.py
:::

Jacoco 包含多种尺度的代码覆盖率计数器：

+ 指令级覆盖（Instructions,Ccoverage） —— 计数单元是单个 java 二进制代码指令，指令覆盖率提供了代码是否被执行的信息，度量完全独立源码格式。
+ 分支覆盖（Branches,C1coverage）
  + 红色 —— 全部未覆盖：全部分支均未执行
  + 黄色 —— 部分覆盖：部分分支被执行
  + 绿色 —— 全覆盖： 全部分支已执行
+ 圈复杂度（Cyclomatic Complexity） —— 在（线性）组合中，计算在一个方法里面所有可能路径的最小数目，缺失的复杂度表示测试样例没有完全覆盖到这个模块。
+ 行覆盖（Lines）
+ 方法覆盖（non-abstract methods）
+ 类覆盖（classes）

## Jacoco 原理

Jacoco 使用插桩的方式来记录代码覆盖率，具体来说是通过一个 probe 探针来注入的。

插桩模式有两种：

+ **on\-the\-fly 模式** —— JVM 中通过 `-javaagent` 参数指定特定的 jar 文件启动 Instrumentation 的代理程序。代理程序在通过 JVMTI 机制将统计代码插入 class 中（具体来说该机制允许在 ClassLoader 装载一个 class 前，将该 class 文件交给代理程序进行判断、转换、修改、添加自定义的 “代码覆盖率统计” 代码），然后就可以在 JVM 执行测试代码的过程中完成测试覆盖率分析。
+ **offline 模式** —— 在测试之前先对文件进行插桩，生成插过桩的 class 文件或者 jar 包。然后运行相关程序统计这些 class 文件或 jar 包哪些插桩位置被触发，从而得到代码覆盖率信息。

一般来说使用 on\-the\-fly 模式。这种模式更加灵活，不会污染代码。

```bash
# 提前准备
# 1. jacococli.jar
# 2. jacocoagent.jar

# 命令

# 统计数据
# includes —— 指定需要插桩的代码
# output —— 输出的形式。tcpserver（启动web服务的形式展现输出，这种形式需要额外指定port、address）
java -javaagent:jacocoagent.jar=includes=*,output=tcpserver,port=6300,address=localhost,append=true -jar demo-0.0.1.jar
# dump成exec文件
java -jar jacococli.jar dump --address 127.0.0.1 --port 6300 --destfile jacoco-demo.exec
# 生成report报表（html）
# --classfiles —— 被测项目字节码路径
# --sourcefiles —— 被测项目源码路径
java -jar jcococli.jar report jacoco-demo.exec --classfiles D:\code\devops\SBD\target\classes --sourcefiles D:\code\devops\SBD\src\main\java --html html-report --xml report.xml --encoding=utf-8
```

## Jacoco 增量覆盖

Jacoco 原生不支持增量覆盖统计，但是有二开库。

二开： https://gitee.com/Dray/jacoco.git \
增量： https://gitee.com/Dray/code-diff.git

```bash
# jacoco 客户端，收集信息
java -javaagent:jacocoagent.jar=includes=*,output=tcpserver,port=6300,address=localhost,append=true -jar demo-0.0.1.jar
# 二开 cli 包生成 exec 文件
java -jar cli-0.8.7-diff.jar dump --address 127.0.0.1 --port 6300 --destfile jacoco-demo.exec
# 获取两次提交代码差异
java -jar code-diff.jar # 启动 diff 项目，地址： http://127.0.0.1:8085/doc.html
# 二开 cli 包生成 report 增量报表
java -jar cli-0.8.7-diff.jar report jacoco-demo.exec --classfiles D:\code\devops\SBD\target\classes --sourcefiles D:\code\devops\SBD\src\main\java --html html-report-diff --xml report-divv.xml --diffcode "....." --encoding=utf-8
```

todo

## jacoco-maven-plugin

jacoco 同时支持 junit4 和 junit5 版本（需确保test引入各自的引擎，如`junit-vintage-engine`或`jupiter-engine`），只要执行了测试单元方法，就能统计到运行结果（在target/site/jacoco目录中）。  
