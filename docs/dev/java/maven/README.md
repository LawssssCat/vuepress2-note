---
title: Maven 使用笔记
---

参考： 

+ [(0) 用Maven建立專案](https://medium.com/learning-from-jhipster/0-%E7%94%A8maven%E5%BB%BA%E7%AB%8B%E5%B0%88%E6%A1%88-1f504f9a712b)
+ [(1) Maven的生命週期(Phase, Plugin, Goal)](https://medium.com/learning-from-jhipster/1-maven%E7%9A%84%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-phase-plugin-goal-d69a2591dc45)
+ [(2) 使用 Maven 將 Plugin Goals 綁定至 Phase](https://medium.com/learning-from-jhipster/2-%E5%B0%87-plugin-goals-%E7%B6%81%E5%AE%9A%E8%87%B3-phase-13c6b6b8d9bd)
+ [(3) 使用 Maven Wrapper](https://medium.com/learning-from-jhipster/3-%E4%BD%BF%E7%94%A8-maven-wrapper-f4b7e460278)

```bash
$ mvn help:describe -Dcmd=[PHASENAME]

$ mvn help:describe -Dcmd=clean
[INFO] 'clean' is a phase within the 'clean' lifecycle, which has the following phases:
* pre-clean: Not defined
* clean: org.apache.maven.plugins:maven-clean-plugin:2.5:clean
* post-clean: Not defined
```
