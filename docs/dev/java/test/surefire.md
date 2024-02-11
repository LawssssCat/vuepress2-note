---
title: maven-surefire-plugin 插件
---

参考： https://www.bilibili.com/video/BV1bN411s7QW/

maven 默认提供的代码测试插件，可以统计测试用例运行结果、运行时间。这个插件还可控制哪些测试用例需要被执行、哪些测试用例被排除。

```bash
mvn clean test
```

插件默认在 test 阶段运行，生成的报告存放在 `target/surefire-reports/` 目录中
