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

使用 dependencyManagement 管理依赖版本。
在 dependencyManagement 中申明的 dependencies 不会被实际下载 jar 包，只有当该 jar 包被实际依赖后，才会去下载对应的 jar 包版本。

```xml
<!-- 只是对版本进行管理，不会实际引入jar -->
<dependencyManagement>  
      <dependencies>  
            <dependency>  
                <groupId>org.springframework</groupId>  
                <artifactId>spring-core</artifactId>  
                <version>3.2.7</version>  
            </dependency>  
    </dependencies>  
</dependencyManagement>  
  
<!-- 会实际下载jar包 -->
<dependencies>  
       <dependency>  
                <groupId>org.springframework</groupId>  
                <artifactId>spring-core</artifactId>  
       </dependency>  
</dependencies>  
```

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

#### deploy

```bash
[INFO] --- deploy:2.8.2:help (default-cli) @ demo-java ---
[INFO] Apache Maven Deploy Plugin 2.8.2
  Uploads the project artifacts to the internal remote repository.
```

##### 区别 deploy 和 deploy-file

+ `deploy:deploy` 用于自动安装工件、其 POM 和特定项目生成的附加工件。与部署相关的大多数（如果不是全部）信息都存储在项目的 pom 中。
+ `deploy:deploy-file` 用于安装单个工件及其 pom。

::: details

deploy:deploy

```bash
deploy:deploy
  Deploys an artifact to remote repository.

  Available parameters:

    altDeploymentRepository
      Specifies an alternative repository to which the project artifacts should
      be deployed ( other than those specified in <distributionManagement> ).
      Format: id::layout::url
      id
        The id can be used to pick up the correct credentials from the
        settings.xml
      layout
        Either default for the Maven2 layout or legacy for the Maven1 layout.
        Maven3 also uses the default layout.
      url
        The location of the repository

    altReleaseDeploymentRepository
      The alternative repository to use when the project has a final version.

    altSnapshotDeploymentRepository
      The alternative repository to use when the project has a snapshot version.

    deployAtEnd
      Whether every project should be deployed during its own deploy-phase or at
      the end of the multimodule build. If set to true and the build fails, none
      of the reactor projects is deployed. (experimental)

    retryFailedDeploymentCount
      Parameter used to control how many times a failed deployment will be
      retried before giving up and failing. If a value outside the range 1-10 is
      specified it will be pulled to the nearest value within the range 1-10.

    skip
      Set this to 'true' to bypass artifact deploy

    updateReleaseInfo
      Parameter used to update the metadata to make the artifact as release.
```

deploy:deploy-file

```bash
deploy:deploy-file
  Installs the artifact in the remote repository.

  Available parameters:

    artifactId
      ArtifactId of the artifact to be deployed. Retrieved from POM file if
      specified.

    classifier
      Add classifier to the artifact

    classifiers
      A comma separated list of classifiers for each of the extra side artifacts
      to deploy. If there is a mis-match in the number of entries in files or
      types, then an error will be raised.

    description
      Description passed to a generated POM file (in case of generatePom=true)

    file
      File to be deployed.
      Required: Yes

    files
      A comma separated list of files for each of the extra side artifacts to
      deploy. If there is a mis-match in the number of entries in types or
      classifiers, then an error will be raised.

    generatePom
      Upload a POM for this artifact. Will generate a default POM if none is
      supplied with the pomFile argument.

    groupId
      GroupId of the artifact to be deployed. Retrieved from POM file if
      specified.

    javadoc
      The bundled API docs for the artifact.

    packaging
      Type of the artifact to be deployed. Retrieved from the <packaging>
      element of the POM file if a POM file specified. Defaults to the file
      extension if it is not specified via command line or POM.
      Maven uses two terms to refer to this datum: the <packaging> element for
      the entire POM, and the <type> element in a dependency specification.

    pomFile
      Location of an existing POM file to be deployed alongside the main
      artifact, given by the ${file} parameter.

    repositoryId
      Server Id to map on the <id> under <server> section of settings.xml In
      most cases, this parameter will be required for authentication.
      Required: Yes

    repositoryLayout
      The type of remote repository layout to deploy to. Try legacy for a Maven
      1.x-style repository layout.

    retryFailedDeploymentCount
      Parameter used to control how many times a failed deployment will be
      retried before giving up and failing. If a value outside the range 1-10 is
      specified it will be pulled to the nearest value within the range 1-10.

    sources
      The bundled sources for the artifact.

    types
      A comma separated list of types for each of the extra side artifacts to
      deploy. If there is a mis-match in the number of entries in files or
      classifiers, then an error will be raised.

    uniqueVersion
      Whether to deploy snapshots with a unique version or not.

    updateReleaseInfo
      Parameter used to update the metadata to make the artifact as release.

    url
      URL where the artifact will be deployed.
      ie ( file:///C:/m2-repo or scp://host.com/path/to/repo )
      Required: Yes

    version
      Version of the artifact to be deployed. Retrieved from POM file if
      specified.
```

:::

##### 使用 deploy 目标

settings.xml 设置私服位置

```xml
<mirror>
  <id>nexus-mine</id>
  <mirrorOf>central</mirrorOf>
  <name>Nexus mine</name>
  <url>http://localhost:8081/repository/maven-public/</url>
</mirror>
```

settings.xml 设置私服认证信息

```xml
<server>
  <id>nexus-mine</id>
  <username>admin</username>
  <password>xxx</password>
</server>
```

pom.xml 设置部署位置

```xml
<distributionManagement>
  <snapshotRepository>
    <!-- id 需要与 settings.xml 上一致 -->
    <id>nexus-mine</id>
    <url>http://localhost:8081/repository/maven-snapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

pom.xml 设置坐标。

```xml
<!-- 上传的坐标 -->
<groupId>...</groupId>
<!-- 上传的包名 -->
<artifactId>...</artifactId>
<!-- 上传的版本 -->
<version>...</version>
```

::: tip
Maven 制品是按照 groupId/artifactId/version 路径存储的
:::

上传命令

```bash
mvn clean deploy -s ./settings.xml -gs ./settings.xml

# -s,--settings <arg> —— Alternate path for the user settings file 
# -gs,--global-settings <arg> —— Alternate path for the global settings file
```

##### 使用 deploy 目标的密码加密方案

上传私服需要设置明文密码，这一般是不被允许的。

```xml
<server>
  <id>nexus-mine</id>
  <username>admin</username>
  <password>xxx</password>
</server>
```

加密方案： 

+ 配置环境变量
+ https://maven.apache.org/guides/mini/guide-encryption.html

todo

##### 使用 deploy-file 目标

```bash
mvn deploy:deploy-file \
-Dfile=D:\xxx\com.xxx.test-1.0.0.jar \
-DpomFile=./pom.xml \
-DgroupId=com.example.xxx \
-DartifactId=test \
-Dversion=1.0.0-SNAPSHOT \
-Dpackaging=jar \
-DrepositoryId=nexus-mine \
-Durl=http://localhost:8081/repository/maven-snapshots/ \
-s ./settings.xml -gs ./settings.xml \
-Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ignore.validity.dates=true \

参数说明：
-Dfile 要上传包的本地路径
-DpomFile 本地 pom 文件路径。如果没有pom文件，maven会让你生成一个简易的pom文件
-DgroupId -DartifactId -Dversion 要上传的坐标名称
-Dpackaging 要上传包的格式。如 jar、rar、war、zip、... 
-DrepositoryId 用于查找 settings 中配置的仓库设置，从而找到 server 中要使用的账号、密码
-Durl 要上传的仓库地址
-s ./settings.xml -gs ./settings.xml 本地 settings 文件绝对路径
-Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ignore.validity.dates=true 证书校验（可忽略）
```

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

## Maven 私服

常见的 Maven 私服产品：

+ Apache 的 Archiva
+ JFrog 的 Artifactory
+ Sonatype 的 Nexus （关系；联系；） —— 最流行、最广泛

### Nexus 安装、使用

官网： <https://help.sonatype.com/repomanager3/product-information>

下载： <https://help.sonatype.com/en/download.html>

选择版本下载，管理员启动

```bash
./nexus /run
```

`localhost:8081`

初始配置

```bash
# 更改默认密码！
右上角 login in
默认账户/密码
admin/按操作提示
```

默认仓库： 我们关心 maven 开头的仓库即可

```
maven-central（proxy） —— proxy=远程中心仓库的代理。设置界面可以设置代理的远程中心仓库地址
maven-public（group） —— group=主仓库。远程下载的jar包会存放在这个地址。
maven-releases（hosted） —— hosted=本地仓库。存放公司内部上传的jar包。releases=发布，正式版本。
maven-snapshots（hosted） —— snapshots=快照，测试版本。
nuget-group
nuget-hosted
nuget.org-proxy
```

#### 配置maven仓库

settings.xml

```xml
<mirror>
  <id>nexus-mine</id>
  <mirrorOf>central</mirrorOf>
  <name>Nexus mine</name>
  <url>http://localhost:8081/repository/maven-public/</url>
</mirror>
```

如果禁用了匿名访问，需要添加用户设置

```xml
<server>
  <id>nexus-mine</id>
  <username>admin</username>
  <password>xxx</password>
</server>
```

下载依赖、编译工程

```bash
mvn clean compile
```

##### 部署jar包

pom.xml

```xml
<!-- 管理工程部署位置配置 -->
<distributionManagement>
  <snapshotRepository>
    <!-- id 需要与 settings.xml 上一致 -->
    <id>nexus-mine</id>
    <name>Nexus mine</name>
    <url>http://localhost:8081/repository/maven-snapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

```bash
mvn clean deploy
```

#### 引用部署的jar包

pom.xml

```xml
<repositories>
  <repository>
    <id>nexus-mine</id>
    <name>nexus-mine</name>
    <url>http://localhost:8081/repository/maven-snapshots/</url>
    <!-- 是否使用 snapshot/relase 版本依赖 -->
    <snapshots>
      <enabled>true</enabled>
    </snapshots>
    <releases>
      <enabled>true</enabled>
    </releases>
  </repository>
</repositories>
```
