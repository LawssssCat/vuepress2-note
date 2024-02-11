---
title: Maven 使用笔记
---

Maven 是一个自动化的构建工具，主要用于 Java 项目。通过 Maven 插件方式，Maven 还可以用于构建和管理 C\#、Ruby、Scala和其他语言编写的项目，如 `scala-maven-plugin`、`dotnet-maven-plugin`。

Maven 的主要目标是让开发人员能够在最短时间内完成开发工作的完整状态：

+ 简化构建过程
+ 统一构建环境
+ 整合构建信息
+ 易扩展

## 基本使用

参考： 

+ [(0) 用Maven建立專案](https://medium.com/learning-from-jhipster/0-%E7%94%A8maven%E5%BB%BA%E7%AB%8B%E5%B0%88%E6%A1%88-1f504f9a712b)
+ [(1) Maven的生命週期(Phase, Plugin, Goal)](https://medium.com/learning-from-jhipster/1-maven%E7%9A%84%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-phase-plugin-goal-d69a2591dc45)
+ [(2) 使用 Maven 將 Plugin Goals 綁定至 Phase](https://medium.com/learning-from-jhipster/2-%E5%B0%87-plugin-goals-%E7%B6%81%E5%AE%9A%E8%87%B3-phase-13c6b6b8d9bd)
+ [(3) 使用 Maven Wrapper](https://medium.com/learning-from-jhipster/3-%E4%BD%BF%E7%94%A8-maven-wrapper-f4b7e460278)

Maven 通过 POM （Project Object Model，项目对象模型）文件管理项目构建

目录结构

```txt
pom.xml             —— 项目描述文件 【重点】
/src/main/java
/src/main/resources
/src/main/webapp    —— Web应用程序
/src/main/config
/src/test/java
/target
LICENSE.txt         —— 项目许可证
NOTICE.txt          —— 通知和归因
```

帮助

```bash
$ mvn help:describe -Dcmd=[PHASENAME]

$ mvn help:describe -Dcmd=clean
[INFO] 'clean' is a phase within the 'clean' lifecycle, which has the following phases:
* pre-clean: Not defined
* clean: org.apache.maven.plugins:maven-clean-plugin:2.5:clean
* post-clean: Not defined
```

```bash
# 编译命令
mvn clean install -Dcheckstyle.skip=true -DskipTests -Dmaven.test.skip=true

# 查看依赖书上
mvn dependency:tree

# 查看有效POM
mvn help:effective-pom

# 安装一个包到本地仓库
mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id> -DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging>
mvn install:install-file -Dfile=<path-to-file> -DpomFile=<path-to-pomfile>

# 部署一个包到远程仓库
mvn deploy:deploy-file \
-DgroupId=<group-id> \
-DartifactId=<artifact-id> \
-Dversion=<version> \
-Dpackaging=<type-of-packaging> \
-Dfile=<path-to-file> \
-DrepositoryId=<id-to-map-on-server-section-of-settings.xml> \
-Durl=<url-of-the-repository-to-deploy>
```

## Maven 构建生命周期

Maven 将一个整体的构建任务划分为了一个一个的阶段。每个阶段的具体工作由一个个对应的 Maven 插件执行。

构建阶段分三个周期： 

1. clean —— 清理项目构建结果
    + pre\-clean
    + clean
    + post\-clean
1. default/build —— 部署项目的构建处理
    + 构建
        + validate
        + initialize
        + generate\-sources
        + process-sources
        + generate\-resources
        + process\-resources
        + compile
        + process\-classes
    + 测试
        + generate\-test\-sources
        + process\-test\-sources
        + generate\-test\-resources
        + process\-test\-resources
        + test\-compile
        + process-test\-classes
        + test `mvn test`
    + 打包
        + prepare\-package
        + package `mvn package`
        + pre\-integration\-test
        + integration\-test
        + post\-integration\-test `mvn integration-test`
        + verify
        + install
        + deploy `mvn deploy`
1. site —— 生成项目站点的文档
    + pre-site
    + site
    + post-site `mvn site`
    + site-deploy

::: tip
Maven 生命周期由 `maven-core` 模块的 components.xml 文件定义
:::

## 依赖

### 作用域 scope

作用域定义依赖的存在时期

作用域（Scope） | 编译（Compile） | 测试（Test） | 运行（Run） | 打包（Package） | 示例
--- | --- | --- | ---| --- | ---
compile（默认） | ✔ | ✔ | ✔ | ✔ | spring
provided | ✔ | ✔ | ❌ | ❌ | lombok
test | ❌ | ✔ | ❌ | ❌ | junit
runtime | ❌ | ✔ | ✔ | ✔ | tomcat、JDBCDriver
system | ✔ | ✔ | ❌ | ❌ | asm

### 依赖管理

todo 优先级、版本范围指定、版本固定之类的东西

## Maven 仓库

Maven 仓库是用来存放项目中依赖的软件包（jar、war、pom）和元素据（坐标信息、源码、作者、SCM、许可证）等信息

Maven 仓库有三种类型：

+ **本地（Local）** —— 本地缓存
+ **远程（Remote）** —— 企业级内部构建的仓库，主要是为了统一管理和加快下载速度
+ **中央（Central0）** —— 开源仓库

优先级： 本地 > 远程 > 中央

仓库配置：

一般在 `.m2/repository/settings.xml` 上配置远程仓库，也可以在 pom.xml 上配置。
优先级： pom.xml > user settings > global settings

```bash
mvn -X # 查看 settings.xml 文件的读取顺序
mvn help:effective-settings # 查看当前生效的 settings.xml
```

## 插件

todo https://www.bilibili.com/video/BV1au4y1e7rE

前提：

+ 可以在 maven 生命周期（lifecycle）的每个阶段（phase）上绑定多个插件（plugin）的目标（goal）。当 maven 执行到对应的阶段时就会执行这些插件的目标。
+ 多个目标（goal）绑定同一个阶段（phase）时，maven 会从上到下依次执行。
+ 一个插件（plugin）可以包含多个目标（goal）。

通过插件，可以在 maven 生命周期的某个阶段做特定的事情，比如：打包源码、打包 fat jar、混淆、加密、重新打包等。

### 插件命名规则

一般定义插件的 artifactId 为 `xxx-maven-plugin` 或者 `maven-xxx-plugin`。
这里的 xxx 会被识别为前缀（prefix）。

```bash
# gav:goal
mvn com.roadjava.clazz:encrypt-maven-plugin:1.0.0:encrypt
# prefix:goal 
mvn encrypt:encrypt
```

上面两句是等价的，就是调用 encrypt 插件的 encrypt 目标的 `execute()` 方法。

### 常用插件

### 自定义

编写 pom.xml 文件

```xml
<!-- 1. 指定 packaging 打包方式 -->
<packaging>maven-plugin</packaging>
<artifactId>custom-plugin</artifactId>
<dependencies>
  <!-- 2. 引入 api 依赖 -->
  <dependency>
    <groupId>org.apache.maven</groupId>
    <artifactId>maven-plugin-api</artifactId>
    <version>3.5.2</version>
  </dependency>
</dependencies>
```

使用注释或者注解的方式进行开发

#### 使用注释开发插件（不推荐）

```java
/**
 * mojo: maven old java abject，每个 mojo 类都是 maven plugin 的一个执行目标（goal）。
 * 
 * @goal comment
 */
public class CommentMojo extends AbstractMojo {
  @Override
  public void execute() throws MojoExecutionException, MojoFailureExecution {
    Log log = getLog();
    log.info("执行了 goal:comment 的 execute 方法");
  }
}
```

todo

## 场景

### 语法兼容

todo `maven-compiler-plugin`

### 静态检查

静态检查希望对代码库或二进制文件在不运行任何相关代码的情况下进行测试，以发现潜在的问题、确保代码质量。

+ CheckStyle —— 代码规范检查工具
+ PMD —— 代码编码缺陷检查工具，如：未使用的变量、空try\-catch块、不必要的对象创建
+ Findbugs —— 将编译后的字节码与一组错误模型对比，识别出代码中的缺陷。如：未使用的错误方法、空指针引用、资源泄露等

todo
