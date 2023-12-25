---
title: Activiti 使用笔记
---

Activiti官网 <https://www.activiti.org/>

## Activiti工作流

工作流 workflow —— 通过计算机对业务流程自动化执行管理

业务流程管理 BPM Business Process Management

使用`activity-designer`定义业务流程文件`.bpmn`

## Activiti表结构

`ACT_` 开头 第二部分两个字符表示用途

+ `ACT_RE_` `repository` 表包含“静态”信息，例如流程定义与流程资源（图片、规则等）。
+ `ACT_RU_` `runtime` 表示运行时信息，例如流程实例（`process instance`）、用户任务（`user task`）、变量（`variable`）、作业（`job`）等。
  > Activiti只在流程实例运行中保存运行时数据，并且在流程实例结束时删除记录，这样表征运行时表小和快。
+ `ACT_ID` `identity` 表包含身份信息，例如用户、组等。
+ `ACT_HI_` `history` 表存储历史数据，例如已完成的流程实例、变量、任务等。
+ `ACT_GE_` `general` 通用数据，用于不同场景下。

流程 | 表名 | 说明
--- | --- | ---
⚙部署流程 | `act_re_deployment` | 部署流程的记录表：一次部署行为会产生一个表记录（一次部署行为可以部署多个流程定义）
⚙部署流程 | `act_re_procdef` | 流程定义表：一张流程图对应一个表记录
⚙部署流程 | `act_ge_bytearray` | 部署流程的资源表
🚀启动流程 | `act_hi_procinst` | 流程历史：发起一个流程就会创建对应的一张表记录
🚀启动流程 | `act_ru_task` | 流程待办表：当前需要审批的记录表，节点审批后就会被删除
🚀启动流程 | `act_ru_identitylink` | 流程身份相关的数据：如流程的发起人
🚀启动流程 | `act_ru_variable` | 流程变量数据表：记录当前流程实例设置的相关变量数据
🚀启动流程 | `act_ru_execution` | 流程执行数据表：启动一个流程，默认会创建两条数据
🚀启动流程 | `act_hi_actinst` | 流程节点记录：流程审批节点的记录信息
🚀启动流程 | `act_hi_identitylink` | 对应`act_ru_identitylink`
🚀启动流程 | `act_hi_taskinst` | 对应`act_ru_taskinst`
🚀启动流程 | `act_hi_varinst` | 对应`act_ru_varinst`

几个概念：

+ deployment
+ process define
+ process instance —— 流程
+ execution —— 执行的流程（因为有分子的存在，一个流程实例可能有多个执行流程）
+ task instance —— 具体节点（每个任务看作一个节点）

::: tip
关于process、execution、task的关系可以如下理解：

+ process —— 面
+ execution —— 线
+ task —— 点

:::

## Activiti功能（Demo）

### 基本环境和依赖

java 11 （activiti版本原因，8无法通过编译） spring 2.4.2

数据库最好用5.7及以上的版本

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
</dependency>
<dependency>
    <groupId>org.activiti</groupId>
    <artifactId>activiti-spring-boot-starter</artifactId>
    <version>7.0.0.GA</version>
</dependency>
```

### activiti配置信息

#### xml方式配置

`src/main/resources/activiti.cfg.xml`

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
        <!-- useSSL=false 解决[Note] Bad handshake问题 -->
        <!-- nullCatalogMeansCurrent=true 解决跨schema检查库的问题（加了之后只在当前schema中创建缺失表，否则无法创建表然后提示报错） -->
        <property name="jdbcUrl" value="jdbc:mysql://vm_centos7_docker:3306/activiti7?useSSL=false&amp;nullCatalogMeansCurrent=true" />
        <property name="jdbcDriver" value="com.mysql.cj.jdbc.Driver" />
        <property name="jdbcUsername" value="root" />
        <property name="jdbcPassword" value="123456" />
        <!-- 数据库没有表，创建表 -->
        <property name="databaseSchemaUpdate" value="true" />
        <property name="asyncExecutorActivate" value="false" />
        <property name="mailServerHost" value="mail.my-corp.com" />
        <property name="mailServerPort" value="5025" />
    </bean>
</beans>
```

`src/test/java/com/example/demo01/Activiti7Test01.java`

```java
package com.example.demo01;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.junit.jupiter.api.Test;

public class Activiti7Test01 {
    /**
     * 获取ProcessEngine对象的第一种方式
     */
    @Test
    public void test1() {
        // 获取流程引擎对象，该对象加载resources目录下的activit.cfg.xml
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        System.out.println(processEngine);
    }
}
```

#### 配置类方式

```java
@Test
public void test2() {
    ProcessEngine processEngine = ProcessEngineConfiguration
            .createStandaloneProcessEngineConfiguration()
            .setJdbcDriver("com.mysql.cj.jdbc.Driver")
            .setJdbcUrl("jdbc:mysql://vm_centos7_docker:3306/activiti7?useSSL=false&nullCatalogMeansCurrent=true")
            .setJdbcUsername("root")
            .setJdbcPassword("123456")
            .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE)
            .buildProcessEngine();
    System.out.println(processEngine);
    Assertions.assertNotNull(processEngine);
}
```

输出过程

::: details

```txt
"C:\Program Files\Java\jdk-11.0.20\bin\java.exe" -ea -Didea.test.cyclic.buffer.size=1048576 "-javaagent:C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.1\lib\idea_rt.jar=61189:C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.1\bin" -Dfile.encoding=UTF-8 -classpath "C:\Users\pc\.m2\repository\org\junit\platform\junit-platform-launcher\1.7.0\junit-platform-launcher-1.7.0.jar;C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.1\lib\idea_rt.jar;C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.1\plugins\junit\lib\junit5-rt.jar;C:\Program Files\JetBrains\IntelliJ IDEA 2023.2.1\plugins\junit\lib\junit-rt.jar;C:\Users\pc\Desktop\projects\learning-activiti7\demo01\target\test-classes;C:\Users\pc\Desktop\projects\learning-activiti7\demo01\target\classes;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-web\2.4.2\spring-boot-starter-web-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter\2.4.2\spring-boot-starter-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-logging\2.4.2\spring-boot-starter-logging-2.4.2.jar;C:\Users\pc\.m2\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;C:\Users\pc\.m2\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;C:\Users\pc\.m2\repository\org\apache\logging\log4j\log4j-to-slf4j\2.13.3\log4j-to-slf4j-2.13.3.jar;C:\Users\pc\.m2\repository\org\apache\logging\log4j\log4j-api\2.13.3\log4j-api-2.13.3.jar;C:\Users\pc\.m2\repository\org\slf4j\jul-to-slf4j\1.7.30\jul-to-slf4j-1.7.30.jar;C:\Users\pc\.m2\repository\jakarta\annotation\jakarta.annotation-api\1.3.5\jakarta.annotation-api-1.3.5.jar;C:\Users\pc\.m2\repository\org\yaml\snakeyaml\1.27\snakeyaml-1.27.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-json\2.4.2\spring-boot-starter-json-2.4.2.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\core\jackson-databind\2.11.4\jackson-databind-2.11.4.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.11.4\jackson-datatype-jdk8-2.11.4.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.11.4\jackson-datatype-jsr310-2.11.4.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\module\jackson-module-parameter-names\2.11.4\jackson-module-parameter-names-2.11.4.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-tomcat\2.4.2\spring-boot-starter-tomcat-2.4.2.jar;C:\Users\pc\.m2\repository\org\apache\tomcat\embed\tomcat-embed-core\9.0.41\tomcat-embed-core-9.0.41.jar;C:\Users\pc\.m2\repository\org\glassfish\jakarta.el\3.0.3\jakarta.el-3.0.3.jar;C:\Users\pc\.m2\repository\org\apache\tomcat\embed\tomcat-embed-websocket\9.0.41\tomcat-embed-websocket-9.0.41.jar;C:\Users\pc\.m2\repository\org\springframework\spring-web\5.3.3\spring-web-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-webmvc\5.3.3\spring-webmvc-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-aop\5.3.3\spring-aop-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-expression\5.3.3\spring-expression-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-test\2.4.2\spring-boot-starter-test-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-test\2.4.2\spring-boot-test-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-test-autoconfigure\2.4.2\spring-boot-test-autoconfigure-2.4.2.jar;C:\Users\pc\.m2\repository\com\jayway\jsonpath\json-path\2.4.0\json-path-2.4.0.jar;C:\Users\pc\.m2\repository\net\minidev\json-smart\2.3\json-smart-2.3.jar;C:\Users\pc\.m2\repository\net\minidev\accessors-smart\1.2\accessors-smart-1.2.jar;C:\Users\pc\.m2\repository\org\ow2\asm\asm\5.0.4\asm-5.0.4.jar;C:\Users\pc\.m2\repository\jakarta\xml\bind\jakarta.xml.bind-api\2.3.3\jakarta.xml.bind-api-2.3.3.jar;C:\Users\pc\.m2\repository\jakarta\activation\jakarta.activation-api\1.2.2\jakarta.activation-api-1.2.2.jar;C:\Users\pc\.m2\repository\org\assertj\assertj-core\3.18.1\assertj-core-3.18.1.jar;C:\Users\pc\.m2\repository\org\hamcrest\hamcrest\2.2\hamcrest-2.2.jar;C:\Users\pc\.m2\repository\org\junit\jupiter\junit-jupiter\5.7.0\junit-jupiter-5.7.0.jar;C:\Users\pc\.m2\repository\org\junit\jupiter\junit-jupiter-api\5.7.0\junit-jupiter-api-5.7.0.jar;C:\Users\pc\.m2\repository\org\apiguardian\apiguardian-api\1.1.0\apiguardian-api-1.1.0.jar;C:\Users\pc\.m2\repository\org\opentest4j\opentest4j\1.2.0\opentest4j-1.2.0.jar;C:\Users\pc\.m2\repository\org\junit\platform\junit-platform-commons\1.7.0\junit-platform-commons-1.7.0.jar;C:\Users\pc\.m2\repository\org\junit\jupiter\junit-jupiter-params\5.7.0\junit-jupiter-params-5.7.0.jar;C:\Users\pc\.m2\repository\org\junit\jupiter\junit-jupiter-engine\5.7.0\junit-jupiter-engine-5.7.0.jar;C:\Users\pc\.m2\repository\org\junit\platform\junit-platform-engine\1.7.0\junit-platform-engine-1.7.0.jar;C:\Users\pc\.m2\repository\org\mockito\mockito-core\3.6.28\mockito-core-3.6.28.jar;C:\Users\pc\.m2\repository\net\bytebuddy\byte-buddy\1.10.19\byte-buddy-1.10.19.jar;C:\Users\pc\.m2\repository\net\bytebuddy\byte-buddy-agent\1.10.19\byte-buddy-agent-1.10.19.jar;C:\Users\pc\.m2\repository\org\objenesis\objenesis\3.1\objenesis-3.1.jar;C:\Users\pc\.m2\repository\org\mockito\mockito-junit-jupiter\3.6.28\mockito-junit-jupiter-3.6.28.jar;C:\Users\pc\.m2\repository\org\skyscreamer\jsonassert\1.5.0\jsonassert-1.5.0.jar;C:\Users\pc\.m2\repository\com\vaadin\external\google\android-json\0.0.20131108.vaadin1\android-json-0.0.20131108.vaadin1.jar;C:\Users\pc\.m2\repository\org\springframework\spring-core\5.3.3\spring-core-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-jcl\5.3.3\spring-jcl-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-test\5.3.3\spring-test-5.3.3.jar;C:\Users\pc\.m2\repository\org\xmlunit\xmlunit-core\2.7.0\xmlunit-core-2.7.0.jar;C:\Users\pc\.m2\repository\mysql\mysql-connector-java\8.0.23\mysql-connector-java-8.0.23.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-spring-boot-starter\7.0.0.GA\activiti-spring-boot-starter-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-spring-app-process\7.0.0.GA\activiti-spring-app-process-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-spring-application\7.0.0.GA\activiti-spring-application-7.0.0.GA.jar;C:\Users\pc\.m2\repository\commons-io\commons-io\2.6\commons-io-2.6.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-spring-identity\7.0.0.GA\activiti-spring-identity-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-security\2.4.2\spring-boot-starter-security-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\security\spring-security-config\5.4.2\spring-security-config-5.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\security\spring-security-web\5.4.2\spring-security-web-5.4.2.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-spring-security\7.0.0.GA\activiti-spring-security-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-process-model\7.0.0.GA\activiti-api-process-model-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-process-runtime\7.0.0.GA\activiti-api-process-runtime-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-process-model-impl\7.0.0.GA\activiti-api-process-model-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-model-shared-impl\7.0.0.GA\activiti-api-model-shared-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\core\jackson-core\2.11.4\jackson-core-2.11.4.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-model-shared\7.0.0.GA\activiti-api-model-shared-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-runtime-shared\7.0.0.GA\activiti-api-runtime-shared-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-spring\7.0.0.GA\activiti-spring-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-bpmn-converter\7.0.0.GA\activiti-bpmn-converter-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-process-validation\7.0.0.GA\activiti-process-validation-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\springframework\spring-jdbc\5.3.3\spring-jdbc-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-orm\5.3.3\spring-orm-5.3.3.jar;C:\Users\pc\.m2\repository\org\apache\commons\commons-lang3\3.11\commons-lang3-3.11.jar;C:\Users\pc\.m2\repository\javax\el\el-api\2.2\el-api-2.2.jar;C:\Users\pc\.m2\repository\org\slf4j\jcl-over-slf4j\1.7.30\jcl-over-slf4j-1.7.30.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-engine\7.0.0.GA\activiti-engine-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\apache\commons\commons-email\1.5\commons-email-1.5.jar;C:\Users\pc\.m2\repository\com\sun\mail\javax.mail\1.5.6\javax.mail-1.5.6.jar;C:\Users\pc\.m2\repository\javax\activation\activation\1.1\activation-1.1.jar;C:\Users\pc\.m2\repository\org\mybatis\mybatis\3.4.2\mybatis-3.4.2.jar;C:\Users\pc\.m2\repository\de\odysseus\juel\juel-api\2.2.7\juel-api-2.2.7.jar;C:\Users\pc\.m2\repository\de\odysseus\juel\juel-impl\2.2.7\juel-impl-2.2.7.jar;C:\Users\pc\.m2\repository\de\odysseus\juel\juel-spi\2.2.7\juel-spi-2.2.7.jar;C:\Users\pc\.m2\repository\joda-time\joda-time\2.10.1\joda-time-2.10.1.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-bpmn-model\7.0.0.GA\activiti-bpmn-model-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-api-process-runtime-impl\7.0.0.GA\activiti-api-process-runtime-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-connector-model\7.0.0.GA\activiti-connector-model-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-spring-connector\7.0.0.GA\activiti-spring-connector-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-api-runtime-shared-impl\7.0.0.GA\activiti-api-runtime-shared-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\core\common\activiti-spring-security-policies\7.0.0.GA\activiti-spring-security-policies-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-api-task-runtime-impl\7.0.0.GA\activiti-api-task-runtime-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-task-model\7.0.0.GA\activiti-api-task-model-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-task-runtime\7.0.0.GA\activiti-api-task-runtime-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\api\activiti-api-task-model-impl\7.0.0.GA\activiti-api-task-model-impl-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\activiti\activiti-spring-process-extensions\7.0.0.GA\activiti-spring-process-extensions-7.0.0.GA.jar;C:\Users\pc\.m2\repository\org\springframework\spring-context\5.3.3\spring-context-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-tx\5.3.3\spring-tx-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\spring-beans\5.3.3\spring-beans-5.3.3.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot\2.4.2\spring-boot-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-autoconfigure\2.4.2\spring-boot-autoconfigure-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\security\spring-security-core\5.4.2\spring-security-core-5.4.2.jar;C:\Users\pc\.m2\repository\org\slf4j\slf4j-api\1.7.30\slf4j-api-1.7.30.jar;C:\Users\pc\.m2\repository\com\fasterxml\uuid\java-uuid-generator\3.1.4\java-uuid-generator-3.1.4.jar;C:\Users\pc\.m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.11.4\jackson-annotations-2.11.4.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-starter-actuator\2.4.2\spring-boot-starter-actuator-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-actuator-autoconfigure\2.4.2\spring-boot-actuator-autoconfigure-2.4.2.jar;C:\Users\pc\.m2\repository\org\springframework\boot\spring-boot-actuator\2.4.2\spring-boot-actuator-2.4.2.jar;C:\Users\pc\.m2\repository\io\micrometer\micrometer-core\1.6.3\micrometer-core-1.6.3.jar;C:\Users\pc\.m2\repository\org\hdrhistogram\HdrHistogram\2.1.12\HdrHistogram-2.1.12.jar;C:\Users\pc\.m2\repository\org\latencyutils\LatencyUtils\2.0.3\LatencyUtils-2.0.3.jar" com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.example.demo01.Activiti7Test01,test2
16:44:50.770 [main] DEBUG org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl - initializing datasource to db: jdbc:mysql://vm_centos7_docker:3306/activiti7?useSSL=false&nullCatalogMeansCurrent=true
16:44:50.788 [main] DEBUG org.apache.ibatis.logging.LogFactory - Logging initialized using 'class org.apache.ibatis.logging.slf4j.Slf4jImpl' adapter.
16:44:50.810 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - PooledDataSource forcefully closed/removed all connections.
16:44:51.236 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Created connection 735228558.
16:44:51.237 [main] DEBUG org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl - database product name: 'MySQL'
16:44:51.237 [main] DEBUG org.activiti.engine.impl.cfg.ProcessEngineConfigurationImpl - using database type: mysql
16:44:51.237 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Returned connection 735228558 to pool.
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.apache.ibatis.reflection.Reflector (file:/C:/Users/pc/.m2/repository/org/mybatis/mybatis/3.4.2/mybatis-3.4.2.jar) to method java.lang.Object.finalize()
WARNING: Please consider reporting this to the maintainers of org.apache.ibatis.reflection.Reflector
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
16:44:52.948 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - 

16:44:52.948 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - --- starting SchemaOperationsProcessEngineBuild --------------------------------------------------------
16:44:52.952 [main] DEBUG org.activiti.engine.impl.agenda.DefaultActivitiEngineAgenda - Operation class org.activiti.engine.impl.interceptor.CommandInvoker$1 added to agenda
16:44:52.960 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - Executing performSchemaOperationsProcessEngineBuild with setting true
16:44:52.972 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Opening JDBC Connection
16:44:52.972 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Checked out connection 735228558 from pool.
16:44:52.973 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:53.014 [main] INFO org.activiti.engine.impl.db.DbSqlSession - performing create on engine with resource org/activiti/db/create/activiti.mysql.create.engine.sql
16:44:53.021 [main] INFO org.activiti.engine.impl.db.DbSqlSession - Found MySQL: majorVersion=5 minorVersion=7
16:44:53.022 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_GE_PROPERTY ( 
NAME_ varchar(64), 
VALUE_ varchar(300), 
REV_ integer, 
primary key (NAME_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.032 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: insert into ACT_GE_PROPERTY 
values ('schema.version', '7.0.0.0', 1)
16:44:53.034 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: insert into ACT_GE_PROPERTY 
values ('schema.history', 'create(7.0.0.0)', 1)
16:44:53.035 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: insert into ACT_GE_PROPERTY 
values ('next.dbid', '1', 1)
16:44:53.038 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_GE_BYTEARRAY ( 
ID_ varchar(64), 
REV_ integer, 
NAME_ varchar(255), 
DEPLOYMENT_ID_ varchar(64), 
BYTES_ LONGBLOB, 
GENERATED_ TINYINT, 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.045 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RE_DEPLOYMENT ( 
ID_ varchar(64), 
NAME_ varchar(255), 
CATEGORY_ varchar(255), 
KEY_ varchar(255), 
TENANT_ID_ varchar(255) default '', 
DEPLOY_TIME_ timestamp(3) NULL, 
ENGINE_VERSION_ varchar(255), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.052 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RE_MODEL ( 
ID_ varchar(64) not null, 
REV_ integer, 
NAME_ varchar(255), 
KEY_ varchar(255), 
CATEGORY_ varchar(255), 
CREATE_TIME_ timestamp(3) null, 
LAST_UPDATE_TIME_ timestamp(3) null, 
VERSION_ integer, 
META_INFO_ varchar(4000), 
DEPLOYMENT_ID_ varchar(64), 
EDITOR_SOURCE_VALUE_ID_ varchar(64), 
EDITOR_SOURCE_EXTRA_VALUE_ID_ varchar(64), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.057 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_EXECUTION ( 
ID_ varchar(64), 
REV_ integer, 
PROC_INST_ID_ varchar(64), 
BUSINESS_KEY_ varchar(255), 
PARENT_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
SUPER_EXEC_ varchar(64), 
ROOT_PROC_INST_ID_ varchar(64), 
ACT_ID_ varchar(255), 
IS_ACTIVE_ TINYINT, 
IS_CONCURRENT_ TINYINT, 
IS_SCOPE_ TINYINT, 
IS_EVENT_SCOPE_ TINYINT, 
IS_MI_ROOT_ TINYINT, 
SUSPENSION_STATE_ integer, 
CACHED_ENT_STATE_ integer, 
TENANT_ID_ varchar(255) default '', 
NAME_ varchar(255), 
START_TIME_ datetime(3), 
START_USER_ID_ varchar(255), 
LOCK_TIME_ timestamp(3) NULL, 
IS_COUNT_ENABLED_ TINYINT, 
EVT_SUBSCR_COUNT_ integer, 
TASK_COUNT_ integer, 
JOB_COUNT_ integer, 
TIMER_JOB_COUNT_ integer, 
SUSP_JOB_COUNT_ integer, 
DEADLETTER_JOB_COUNT_ integer, 
VAR_COUNT_ integer, 
ID_LINK_COUNT_ integer, 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.064 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_JOB ( 
ID_ varchar(64) NOT NULL, 
REV_ integer, 
TYPE_ varchar(255) NOT NULL, 
LOCK_EXP_TIME_ timestamp(3) NULL, 
LOCK_OWNER_ varchar(255), 
EXCLUSIVE_ boolean, 
EXECUTION_ID_ varchar(64), 
PROCESS_INSTANCE_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
RETRIES_ integer, 
EXCEPTION_STACK_ID_ varchar(64), 
EXCEPTION_MSG_ varchar(4000), 
DUEDATE_ timestamp(3) NULL, 
REPEAT_ varchar(255), 
HANDLER_TYPE_ varchar(255), 
HANDLER_CFG_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.071 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_TIMER_JOB ( 
ID_ varchar(64) NOT NULL, 
REV_ integer, 
TYPE_ varchar(255) NOT NULL, 
LOCK_EXP_TIME_ timestamp(3) NULL, 
LOCK_OWNER_ varchar(255), 
EXCLUSIVE_ boolean, 
EXECUTION_ID_ varchar(64), 
PROCESS_INSTANCE_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
RETRIES_ integer, 
EXCEPTION_STACK_ID_ varchar(64), 
EXCEPTION_MSG_ varchar(4000), 
DUEDATE_ timestamp(3) NULL, 
REPEAT_ varchar(255), 
HANDLER_TYPE_ varchar(255), 
HANDLER_CFG_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.078 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_SUSPENDED_JOB ( 
ID_ varchar(64) NOT NULL, 
REV_ integer, 
TYPE_ varchar(255) NOT NULL, 
EXCLUSIVE_ boolean, 
EXECUTION_ID_ varchar(64), 
PROCESS_INSTANCE_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
RETRIES_ integer, 
EXCEPTION_STACK_ID_ varchar(64), 
EXCEPTION_MSG_ varchar(4000), 
DUEDATE_ timestamp(3) NULL, 
REPEAT_ varchar(255), 
HANDLER_TYPE_ varchar(255), 
HANDLER_CFG_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.085 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_DEADLETTER_JOB ( 
ID_ varchar(64) NOT NULL, 
REV_ integer, 
TYPE_ varchar(255) NOT NULL, 
EXCLUSIVE_ boolean, 
EXECUTION_ID_ varchar(64), 
PROCESS_INSTANCE_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
EXCEPTION_STACK_ID_ varchar(64), 
EXCEPTION_MSG_ varchar(4000), 
DUEDATE_ timestamp(3) NULL, 
REPEAT_ varchar(255), 
HANDLER_TYPE_ varchar(255), 
HANDLER_CFG_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.091 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RE_PROCDEF ( 
ID_ varchar(64) not null, 
REV_ integer, 
CATEGORY_ varchar(255), 
NAME_ varchar(255), 
KEY_ varchar(255) not null, 
VERSION_ integer not null, 
DEPLOYMENT_ID_ varchar(64), 
RESOURCE_NAME_ varchar(4000), 
DGRM_RESOURCE_NAME_ varchar(4000), 
DESCRIPTION_ varchar(4000), 
HAS_START_FORM_KEY_ TINYINT, 
HAS_GRAPHICAL_NOTATION_ TINYINT, 
SUSPENSION_STATE_ integer, 
TENANT_ID_ varchar(255) default '', 
ENGINE_VERSION_ varchar(255), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.099 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_TASK ( 
ID_ varchar(64), 
REV_ integer, 
EXECUTION_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
NAME_ varchar(255), 
PARENT_TASK_ID_ varchar(64), 
DESCRIPTION_ varchar(4000), 
TASK_DEF_KEY_ varchar(255), 
OWNER_ varchar(255), 
ASSIGNEE_ varchar(255), 
DELEGATION_ varchar(64), 
PRIORITY_ integer, 
CREATE_TIME_ timestamp(3) NULL, 
DUE_DATE_ datetime(3), 
CATEGORY_ varchar(255), 
SUSPENSION_STATE_ integer, 
TENANT_ID_ varchar(255) default '', 
FORM_KEY_ varchar(255), 
CLAIM_TIME_ datetime(3), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.106 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_IDENTITYLINK ( 
ID_ varchar(64), 
REV_ integer, 
GROUP_ID_ varchar(255), 
TYPE_ varchar(255), 
USER_ID_ varchar(255), 
TASK_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.115 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_VARIABLE ( 
ID_ varchar(64) not null, 
REV_ integer, 
TYPE_ varchar(255) not null, 
NAME_ varchar(255) not null, 
EXECUTION_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
TASK_ID_ varchar(64), 
BYTEARRAY_ID_ varchar(64), 
DOUBLE_ double, 
LONG_ bigint, 
TEXT_ varchar(4000), 
TEXT2_ varchar(4000), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.121 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_EVENT_SUBSCR ( 
ID_ varchar(64) not null, 
REV_ integer, 
EVENT_TYPE_ varchar(255) not null, 
EVENT_NAME_ varchar(255), 
EXECUTION_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
ACTIVITY_ID_ varchar(64), 
CONFIGURATION_ varchar(255), 
CREATED_ timestamp(3) not null DEFAULT CURRENT_TIMESTAMP(3), 
PROC_DEF_ID_ varchar(64), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.129 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_EVT_LOG ( 
LOG_NR_ bigint auto_increment, 
TYPE_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
EXECUTION_ID_ varchar(64), 
TASK_ID_ varchar(64), 
TIME_STAMP_ timestamp(3) not null, 
USER_ID_ varchar(255), 
DATA_ LONGBLOB, 
LOCK_OWNER_ varchar(255), 
LOCK_TIME_ timestamp(3) null, 
IS_PROCESSED_ tinyint default 0, 
primary key (LOG_NR_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.135 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_PROCDEF_INFO ( 
ID_ varchar(64) not null, 
PROC_DEF_ID_ varchar(64) not null, 
REV_ integer, 
INFO_JSON_ID_ varchar(64), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.142 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_RU_INTEGRATION ( 
ID_ varchar(64) not null, 
EXECUTION_ID_ varchar(64), 
PROCESS_INSTANCE_ID_ varchar(64), 
PROC_DEF_ID_ varchar(64), 
FLOW_NODE_ID_ varchar(64), 
CREATED_DATE_ timestamp(3), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:53.149 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_EXEC_BUSKEY on ACT_RU_EXECUTION(BUSINESS_KEY_)
16:44:53.156 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDC_EXEC_ROOT on ACT_RU_EXECUTION(ROOT_PROC_INST_ID_)
16:44:53.162 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_TASK_CREATE on ACT_RU_TASK(CREATE_TIME_)
16:44:53.169 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_IDENT_LNK_USER on ACT_RU_IDENTITYLINK(USER_ID_)
16:44:53.176 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_IDENT_LNK_GROUP on ACT_RU_IDENTITYLINK(GROUP_ID_)
16:44:53.182 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_EVENT_SUBSCR_CONFIG_ on ACT_RU_EVENT_SUBSCR(CONFIGURATION_)
16:44:53.188 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_VARIABLE_TASK_ID on ACT_RU_VARIABLE(TASK_ID_)
16:44:53.194 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_ATHRZ_PROCEDEF on ACT_RU_IDENTITYLINK(PROC_DEF_ID_)
16:44:53.202 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_INFO_PROCDEF on ACT_PROCDEF_INFO(PROC_DEF_ID_)
16:44:53.209 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_GE_BYTEARRAY 
add constraint ACT_FK_BYTEARR_DEPL 
foreign key (DEPLOYMENT_ID_) 
references ACT_RE_DEPLOYMENT (ID_)
16:44:53.222 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RE_PROCDEF 
add constraint ACT_UNIQ_PROCDEF 
unique (KEY_,VERSION_, TENANT_ID_)
16:44:53.229 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_EXECUTION 
add constraint ACT_FK_EXE_PROCINST 
foreign key (PROC_INST_ID_) 
references ACT_RU_EXECUTION (ID_) on delete cascade on update cascade
16:44:53.246 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_EXECUTION 
add constraint ACT_FK_EXE_PARENT 
foreign key (PARENT_ID_) 
references ACT_RU_EXECUTION (ID_) on delete cascade
16:44:53.266 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_EXECUTION 
add constraint ACT_FK_EXE_SUPER 
foreign key (SUPER_EXEC_) 
references ACT_RU_EXECUTION (ID_) on delete cascade
16:44:53.286 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_EXECUTION 
add constraint ACT_FK_EXE_PROCDEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.305 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_IDENTITYLINK 
add constraint ACT_FK_TSKASS_TASK 
foreign key (TASK_ID_) 
references ACT_RU_TASK (ID_)
16:44:53.324 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_IDENTITYLINK 
add constraint ACT_FK_ATHRZ_PROCEDEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF(ID_)
16:44:53.345 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_IDENTITYLINK 
add constraint ACT_FK_IDL_PROCINST 
foreign key (PROC_INST_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.370 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TASK 
add constraint ACT_FK_TASK_EXE 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.391 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TASK 
add constraint ACT_FK_TASK_PROCINST 
foreign key (PROC_INST_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.411 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TASK 
add constraint ACT_FK_TASK_PROCDEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.432 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_VARIABLE 
add constraint ACT_FK_VAR_EXE 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.450 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_VARIABLE 
add constraint ACT_FK_VAR_PROCINST 
foreign key (PROC_INST_ID_) 
references ACT_RU_EXECUTION(ID_)
16:44:53.470 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_VARIABLE 
add constraint ACT_FK_VAR_BYTEARRAY 
foreign key (BYTEARRAY_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.490 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_JOB 
add constraint ACT_FK_JOB_EXECUTION 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.507 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_JOB 
add constraint ACT_FK_JOB_PROCESS_INSTANCE 
foreign key (PROCESS_INSTANCE_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.523 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_JOB 
add constraint ACT_FK_JOB_PROC_DEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.542 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_JOB 
add constraint ACT_FK_JOB_EXCEPTION 
foreign key (EXCEPTION_STACK_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.561 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TIMER_JOB 
add constraint ACT_FK_TIMER_JOB_EXECUTION 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.577 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TIMER_JOB 
add constraint ACT_FK_TIMER_JOB_PROCESS_INSTANCE 
foreign key (PROCESS_INSTANCE_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.597 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TIMER_JOB 
add constraint ACT_FK_TIMER_JOB_PROC_DEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.617 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_TIMER_JOB 
add constraint ACT_FK_TIMER_JOB_EXCEPTION 
foreign key (EXCEPTION_STACK_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.639 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_SUSPENDED_JOB 
add constraint ACT_FK_SUSPENDED_JOB_EXECUTION 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.654 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_SUSPENDED_JOB 
add constraint ACT_FK_SUSPENDED_JOB_PROCESS_INSTANCE 
foreign key (PROCESS_INSTANCE_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.673 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_SUSPENDED_JOB 
add constraint ACT_FK_SUSPENDED_JOB_PROC_DEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.693 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_SUSPENDED_JOB 
add constraint ACT_FK_SUSPENDED_JOB_EXCEPTION 
foreign key (EXCEPTION_STACK_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.714 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_DEADLETTER_JOB 
add constraint ACT_FK_DEADLETTER_JOB_EXECUTION 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.730 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_DEADLETTER_JOB 
add constraint ACT_FK_DEADLETTER_JOB_PROCESS_INSTANCE 
foreign key (PROCESS_INSTANCE_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:53.759 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_DEADLETTER_JOB 
add constraint ACT_FK_DEADLETTER_JOB_PROC_DEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.801 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_DEADLETTER_JOB 
add constraint ACT_FK_DEADLETTER_JOB_EXCEPTION 
foreign key (EXCEPTION_STACK_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.839 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_EVENT_SUBSCR 
add constraint ACT_FK_EVENT_EXEC 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION(ID_)
16:44:53.878 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RE_MODEL 
add constraint ACT_FK_MODEL_SOURCE 
foreign key (EDITOR_SOURCE_VALUE_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.903 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RE_MODEL 
add constraint ACT_FK_MODEL_SOURCE_EXTRA 
foreign key (EDITOR_SOURCE_EXTRA_VALUE_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.927 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RE_MODEL 
add constraint ACT_FK_MODEL_DEPLOYMENT 
foreign key (DEPLOYMENT_ID_) 
references ACT_RE_DEPLOYMENT (ID_)
16:44:53.949 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_PROCDEF_INFO 
add constraint ACT_FK_INFO_JSON_BA 
foreign key (INFO_JSON_ID_) 
references ACT_GE_BYTEARRAY (ID_)
16:44:53.968 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_PROCDEF_INFO 
add constraint ACT_FK_INFO_PROCDEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:53.986 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_PROCDEF_INFO 
add constraint ACT_UNIQ_INFO_PROCDEF 
unique (PROC_DEF_ID_)
16:44:53.993 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_INTEGRATION 
add constraint ACT_FK_INT_EXECUTION 
foreign key (EXECUTION_ID_) 
references ACT_RU_EXECUTION (ID_) 
on delete cascade
16:44:54.015 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_INTEGRATION 
add constraint ACT_FK_INT_PROC_INST 
foreign key (PROCESS_INSTANCE_ID_) 
references ACT_RU_EXECUTION (ID_)
16:44:54.043 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: alter table ACT_RU_INTEGRATION 
add constraint ACT_FK_INT_PROC_DEF 
foreign key (PROC_DEF_ID_) 
references ACT_RE_PROCDEF (ID_)
16:44:54.071 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - activiti db schema create for component engine successful
16:44:54.074 [main] INFO org.activiti.engine.impl.db.DbSqlSession - performing create on history with resource org/activiti/db/create/activiti.mysql.create.history.sql
16:44:54.074 [main] INFO org.activiti.engine.impl.db.DbSqlSession - Found MySQL: majorVersion=5 minorVersion=7
16:44:54.074 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_PROCINST ( 
ID_ varchar(64) not null, 
PROC_INST_ID_ varchar(64) not null, 
BUSINESS_KEY_ varchar(255), 
PROC_DEF_ID_ varchar(64) not null, 
START_TIME_ datetime(3) not null, 
END_TIME_ datetime(3), 
DURATION_ bigint, 
START_USER_ID_ varchar(255), 
START_ACT_ID_ varchar(255), 
END_ACT_ID_ varchar(255), 
SUPER_PROCESS_INSTANCE_ID_ varchar(64), 
DELETE_REASON_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
NAME_ varchar(255), 
primary key (ID_), 
unique (PROC_INST_ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.085 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_ACTINST ( 
ID_ varchar(64) not null, 
PROC_DEF_ID_ varchar(64) not null, 
PROC_INST_ID_ varchar(64) not null, 
EXECUTION_ID_ varchar(64) not null, 
ACT_ID_ varchar(255) not null, 
TASK_ID_ varchar(64), 
CALL_PROC_INST_ID_ varchar(64), 
ACT_NAME_ varchar(255), 
ACT_TYPE_ varchar(255) not null, 
ASSIGNEE_ varchar(255), 
START_TIME_ datetime(3) not null, 
END_TIME_ datetime(3), 
DURATION_ bigint, 
DELETE_REASON_ varchar(4000), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.095 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_TASKINST ( 
ID_ varchar(64) not null, 
PROC_DEF_ID_ varchar(64), 
TASK_DEF_KEY_ varchar(255), 
PROC_INST_ID_ varchar(64), 
EXECUTION_ID_ varchar(64), 
NAME_ varchar(255), 
PARENT_TASK_ID_ varchar(64), 
DESCRIPTION_ varchar(4000), 
OWNER_ varchar(255), 
ASSIGNEE_ varchar(255), 
START_TIME_ datetime(3) not null, 
CLAIM_TIME_ datetime(3), 
END_TIME_ datetime(3), 
DURATION_ bigint, 
DELETE_REASON_ varchar(4000), 
PRIORITY_ integer, 
DUE_DATE_ datetime(3), 
FORM_KEY_ varchar(255), 
CATEGORY_ varchar(255), 
TENANT_ID_ varchar(255) default '', 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.107 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_VARINST ( 
ID_ varchar(64) not null, 
PROC_INST_ID_ varchar(64), 
EXECUTION_ID_ varchar(64), 
TASK_ID_ varchar(64), 
NAME_ varchar(255) not null, 
VAR_TYPE_ varchar(100), 
REV_ integer, 
BYTEARRAY_ID_ varchar(64), 
DOUBLE_ double, 
LONG_ bigint, 
TEXT_ varchar(4000), 
TEXT2_ varchar(4000), 
CREATE_TIME_ datetime(3), 
LAST_UPDATED_TIME_ datetime(3), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.120 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_DETAIL ( 
ID_ varchar(64) not null, 
TYPE_ varchar(255) not null, 
PROC_INST_ID_ varchar(64), 
EXECUTION_ID_ varchar(64), 
TASK_ID_ varchar(64), 
ACT_INST_ID_ varchar(64), 
NAME_ varchar(255) not null, 
VAR_TYPE_ varchar(255), 
REV_ integer, 
TIME_ datetime(3) not null, 
BYTEARRAY_ID_ varchar(64), 
DOUBLE_ double, 
LONG_ bigint, 
TEXT_ varchar(4000), 
TEXT2_ varchar(4000), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.135 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_COMMENT ( 
ID_ varchar(64) not null, 
TYPE_ varchar(255), 
TIME_ datetime(3) not null, 
USER_ID_ varchar(255), 
TASK_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
ACTION_ varchar(255), 
MESSAGE_ varchar(4000), 
FULL_MSG_ LONGBLOB, 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.147 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_ATTACHMENT ( 
ID_ varchar(64) not null, 
REV_ integer, 
USER_ID_ varchar(255), 
NAME_ varchar(255), 
DESCRIPTION_ varchar(4000), 
TYPE_ varchar(255), 
TASK_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
URL_ varchar(4000), 
CONTENT_ID_ varchar(64), 
TIME_ datetime(3), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.165 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create table ACT_HI_IDENTITYLINK ( 
ID_ varchar(64), 
GROUP_ID_ varchar(255), 
TYPE_ varchar(255), 
USER_ID_ varchar(255), 
TASK_ID_ varchar(64), 
PROC_INST_ID_ varchar(64), 
primary key (ID_) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin
16:44:54.177 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_PRO_INST_END on ACT_HI_PROCINST(END_TIME_)
16:44:54.186 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_PRO_I_BUSKEY on ACT_HI_PROCINST(BUSINESS_KEY_)
16:44:54.195 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_ACT_INST_START on ACT_HI_ACTINST(START_TIME_)
16:44:54.223 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_ACT_INST_END on ACT_HI_ACTINST(END_TIME_)
16:44:54.239 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_DETAIL_PROC_INST on ACT_HI_DETAIL(PROC_INST_ID_)
16:44:54.249 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_DETAIL_ACT_INST on ACT_HI_DETAIL(ACT_INST_ID_)
16:44:54.258 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_DETAIL_TIME on ACT_HI_DETAIL(TIME_)
16:44:54.267 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_DETAIL_NAME on ACT_HI_DETAIL(NAME_)
16:44:54.281 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_DETAIL_TASK_ID on ACT_HI_DETAIL(TASK_ID_)
16:44:54.288 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_PROCVAR_PROC_INST on ACT_HI_VARINST(PROC_INST_ID_)
16:44:54.296 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_PROCVAR_NAME_TYPE on ACT_HI_VARINST(NAME_, VAR_TYPE_)
16:44:54.303 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_PROCVAR_TASK_ID on ACT_HI_VARINST(TASK_ID_)
16:44:54.310 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_ACT_INST_PROCINST on ACT_HI_ACTINST(PROC_INST_ID_, ACT_ID_)
16:44:54.318 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_ACT_INST_EXEC on ACT_HI_ACTINST(EXECUTION_ID_, ACT_ID_)
16:44:54.326 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_IDENT_LNK_USER on ACT_HI_IDENTITYLINK(USER_ID_)
16:44:54.333 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_IDENT_LNK_TASK on ACT_HI_IDENTITYLINK(TASK_ID_)
16:44:54.339 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_IDENT_LNK_PROCINST on ACT_HI_IDENTITYLINK(PROC_INST_ID_)
16:44:54.345 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - SQL: create index ACT_IDX_HI_TASK_INST_PROCINST on ACT_HI_TASKINST(PROC_INST_ID_)
16:44:54.351 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - activiti db schema create for component history successful
16:44:54.352 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - Flushing dbSqlSession
16:44:54.352 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - flush summary: 0 insert, 0 update, 0 delete.
16:44:54.352 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - now executing flush...
16:44:54.352 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - firing event committing...
16:44:54.353 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - committing the ibatis sql session...
16:44:54.353 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - firing event committed...
16:44:54.353 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.354 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.354 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Returned connection 735228558 to pool.
16:44:54.354 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - --- SchemaOperationsProcessEngineBuild finished --------------------------------------------------------
16:44:54.354 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - 

16:44:54.354 [main] INFO org.activiti.engine.impl.ProcessEngineImpl - ProcessEngine default created
16:44:54.364 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - 

16:44:54.364 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - --- starting ValidateExecutionRelatedEntityCountCfgCmd --------------------------------------------------------
16:44:54.364 [main] DEBUG org.activiti.engine.impl.agenda.DefaultActivitiEngineAgenda - Operation class org.activiti.engine.impl.interceptor.CommandInvoker$1 added to agenda
16:44:54.372 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Opening JDBC Connection
16:44:54.373 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Checked out connection 735228558 from pool.
16:44:54.373 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.376 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.selectProperty - ==>  Preparing: select * from ACT_GE_PROPERTY where NAME_ = ? 
16:44:54.431 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.selectProperty - ==> Parameters: cfg.execution-related-entities-count(String)
16:44:54.461 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.selectProperty - <==      Total: 0
16:44:54.463 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - Flushing dbSqlSession
16:44:54.463 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession -   insert PropertyEntity[name=cfg.execution-related-entities-count, value=false]
16:44:54.470 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - flush summary: 1 insert, 0 update, 0 delete.
16:44:54.470 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - now executing flush...
16:44:54.470 [main] DEBUG org.activiti.engine.impl.db.DbSqlSession - inserting: PropertyEntity[name=cfg.execution-related-entities-count, value=false]
16:44:54.471 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.insertProperty - ==>  Preparing: insert into ACT_GE_PROPERTY ( NAME_, VALUE_, REV_ ) values ( ?, ?, 1 ) 
16:44:54.473 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.insertProperty - ==> Parameters: cfg.execution-related-entities-count(String), false(String)
16:44:54.475 [main] DEBUG org.activiti.engine.impl.persistence.entity.PropertyEntityImpl.insertProperty - <==    Updates: 1
16:44:54.475 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - firing event committing...
16:44:54.475 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - committing the ibatis sql session...
16:44:54.475 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Committing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.477 [main] DEBUG org.activiti.engine.impl.cfg.standalone.StandaloneMybatisTransactionContext - firing event committed...
16:44:54.477 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.477 [main] DEBUG org.apache.ibatis.transaction.jdbc.JdbcTransaction - Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2bd2b28e]
16:44:54.477 [main] DEBUG org.apache.ibatis.datasource.pooled.PooledDataSource - Returned connection 735228558 to pool.
16:44:54.477 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - --- ValidateExecutionRelatedEntityCountCfgCmd finished --------------------------------------------------------
16:44:54.477 [main] DEBUG org.activiti.engine.impl.interceptor.LogInterceptor - 

org.activiti.engine.impl.ProcessEngineImpl@442f92e6

Process finished with exit code 0
```

:::

### 流程绘制和部署

绘制器

1. 官网war包版本，通过tomcat部署，访问
1. idea插件
    + ~~actiBPM~~
    + Activiti BPMN visualizer

```txt
assignee 委任人
candidate 候选人
```

![image.png](https://s2.loli.net/2023/12/10/Gmt68hZxucdyqVv.png)

部署

```java
@Test
public void test3() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
            .addClasspathResource("flow/oa-leav.bpmn20.xml")
            .name("第一个流程")
            .deploy();
    Assertions.assertNotNull(deploy);
    System.out.println(deploy.getId());
    System.out.println(deploy.getName());
}
```

部署后的数据库更改

1. `act_ge_bytearray` 多了 `flow/oa-leav.bpmn20.xml` 文件记录
1. `act_re-procdef` 多了定义的流程
1. `act_re_deployment` 多了成功部署的流程 `第一个流程`

查询部署

```java
@Test
public void test4() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
//        repositoryService.createDeploymentQuery() // act_re_deployment 流程部署相关信息
//        repositoryService.createProcessDefinitionQuery() // act_re_procdef 流程定义相关信息
    repositoryService.createDeploymentQuery().list() // 查询部署信息
            .forEach(deployment -> {
                System.out.printf("%s | %s\n",
                        deployment.getId(),
                        deployment.getName()
                );
            });
    repositoryService.createProcessDefinitionQuery().list() // 查询定义信息
            .forEach(processDefinition -> {
                System.out.printf("%s | %s | %s\n",
                        processDefinition.getId(),
                        processDefinition.getName(),
                        processDefinition.getDescription()
                );
            });
}
```

### 流程发起

```java
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:1:3"; // act_re_procdef
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(processDefinitionId);
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

发起流程

1. `act_hi_actinst` 添加了启动事件和第一步流程实例
1. `act_hi_identitylink` 活动实例链接活动人
1. `act_ru_task` 代办记录

### 任务待办查询和完成

待办查询

```java
@Test
public void test6() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = processEngine.getTaskService();
    String assignee = "zhangshang";
    List<Task> taskList = taskService.createTaskQuery().taskAssignee(assignee).list();
    if(CollectionUtils.isEmpty(taskList)) {
        System.out.println("没有"+assignee+"待办流程！");
    } else {
        taskList.forEach(action -> {
            System.out.printf("%s | %s | %s\n",
                    action.getId(),
                    action.getName(),
                    action.getAssignee()
            );
        });
    }
}
```

待办记录

```json
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "2505",
			"REV_": 1,
			"EXECUTION_ID_": "2502",
			"PROC_INST_ID_": "2501",
			"PROC_DEF_ID_": "oa-leav:1:3",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"OWNER_": null,
			"ASSIGNEE_": "zhangshang",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-10 21:00:14.427",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

完成待办

```java
@Test
public void test7() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = processEngine.getTaskService();
    taskService.complete("2505");
}
```

完成待办后，`ACT_RU_TASK`中“经理审批”任务删除了，取而代之的是下一个流程“hr审批”。

```json
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "5002",
			"REV_": 1,
			"EXECUTION_ID_": "2502",
			"PROC_INST_ID_": "2501",
			"PROC_DEF_ID_": "oa-leav:1:3",
			"NAME_": "hr审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d",
			"OWNER_": null,
			"ASSIGNEE_": "lishi",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-10 21:19:34.941",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

另外，审批历史能在 `ACT_HI_TASKINST` 中看到！

```json
{
	"table": "ACT_HI_TASKINST",
	"rows":
	[
		{
			"ID_": "2505",
			"PROC_DEF_ID_": "oa-leav:1:3",
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"PROC_INST_ID_": "2501",
			"EXECUTION_ID_": "2502",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"OWNER_": null,
			"ASSIGNEE_": "zhangshang",
			"START_TIME_": "2023-12-10 21:00:14.452",
			"CLAIM_TIME_": null,
			"END_TIME_": "2023-12-10 21:19:34.882",
			"DURATION_": 1160430,
			"DELETE_REASON_": null,
			"PRIORITY_": 50,
			"DUE_DATE_": null,
			"FORM_KEY_": null,
			"CATEGORY_": null,
			"TENANT_ID_": ""
		}
	]
}
```

### 插值表达式

上述任务分配中，assignee是固定的，实际应用中必然是动态分配的。

Activiti 使用 UEL（Unified Expression Language） 进行表达式解析来解决动态分配问题。UEL 是 EE6 规范的一部分。

表达式可以用于例如

+ Java服务任务 Java Service tasks
+ 执行监听器 Execution Listeners
+ 任务监听器 Task Listeners
+ 条件流 Conditional sequence flows

e.g.

+ 值表达式 `${assign1}` \
  ![image.png](https://s2.loli.net/2023/12/11/NlUKjYOmu3Hi98T.png)
+ 方法表达式 `${myBean.myProperty}` \
  其中 `myBean` 可以在配置文件配置 `<bean class="org.example.demo01.service.MyBean" name="myBean"></bean>`

#### 部署流程

```java
@Test
public void test3() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
            .addClasspathResource("flow/oa-leav-expression.bpmn20.xml")
            .name("第二个流程")
            .deploy();
    Assertions.assertNotNull(deploy);
    System.out.println(deploy.getId());
    System.out.println(deploy.getName());
}
```

流程部署完成，编号 17501

```json
{
	"table": "ACT_RE_DEPLOYMENT",
	"rows":
	[
		{
			"ID_": "17501",
			"NAME_": "第二个流程",
			"CATEGORY_": null,
			"KEY_": null,
			"TENANT_ID_": "",
			"DEPLOY_TIME_": "2023-12-11 10:18:44.913",
			"ENGINE_VERSION_": null
		}
	]
}
```

```json
{
	"table": "ACT_RE_PROCDEF",
	"rows":
	[
		{
			"ID_": "oa-leav:2:17503",
			"REV_": 1,
			"CATEGORY_": "http://www.activiti.org/processdef",
			"NAME_": "oa-leav",
			"KEY_": "oa-leav",
			"VERSION_": 2,
			"DEPLOYMENT_ID_": "17501",
			"RESOURCE_NAME_": "flow/oa-leav-expression.bpmn20.xml",
			"DGRM_RESOURCE_NAME_": null,
			"DESCRIPTION_": null,
			"HAS_START_FORM_KEY_": 0,
			"HAS_GRAPHICAL_NOTATION_": 1,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"ENGINE_VERSION_": null
		}
	]
}
```

#### 启动流程

因为定义了表达式，所以启动流程时需要指定表达式值，否则报错：`org.activiti.engine.ActivitiException: Unknown property used in expression: ${assign01}`

```java{6-8,12}
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:2:17503"; // act_re_procdef
    Map<String, Object> map = new HashMap<>();
    map.put("assign01", "张十三");
    map.put("assign02", "lisi");
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId,
            map);
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

```json
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "25007",
			"REV_": 1,
			"EXECUTION_ID_": "25004",
			"PROC_INST_ID_": "25001",
			"PROC_DEF_ID_": "oa-leav:2:17503",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"OWNER_": null,
			"ASSIGNEE_": "张十三",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-11 10:23:12.221",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

### 流程监听器

创建监听器

```java
package com.example.demo01.listener;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

public class MyFirstListener implements TaskListener {
    /**
     * 监听器触发的回调方法
     * @param delegateTask
     */
    @Override
    public void notify(DelegateTask delegateTask) {
        System.out.println("----自定义监听器执行了！");
        if(EVENTNAME_CREATE.equals(delegateTask.getEventName())) {
            // 表示task创建事件被触发
            // 指定当前Task节点的处理人
            delegateTask.setAssignee("xxx666");
        }
    }
}
```

在`.bpmn`文件中引入监听、处理事件

```xml
<userTask id="sid-a15e1163-1d2b-4490-8170-03d2d5dea081" name="经理审批" activiti:assignee="${assign01}">
  <extensionElements>
    <activiti:taskListener event="create" class="com.example.demo01.listener.MyFirstListener"/>
  </extensionElements>
</userTask>
```

::: details

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/processdef">
  <process id="oa-leav" name="oa-leav" isExecutable="true">
    <startEvent id="sid-33b71005-40e4-4b9f-b023-828285fb695f" name="开始流程"/>
    <endEvent id="sid-c853739f-dc5c-4ed1-87cc-0e45d2ac4695" name="结束流程"/>
    <userTask id="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d" name="人事审批" activiti:assignee="${assign02}"/>
    <sequenceFlow id="sid-0cb12b11-4634-486a-893b-abc2086e23b1" sourceRef="sid-33b71005-40e4-4b9f-b023-828285fb695f" targetRef="sid-a15e1163-1d2b-4490-8170-03d2d5dea081"/>
    <sequenceFlow id="sid-b3da559f-3d0c-41c4-88a1-9ee1bfef579c" sourceRef="sid-a15e1163-1d2b-4490-8170-03d2d5dea081" targetRef="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d"/>
    <sequenceFlow id="sid-b41a5c92-17c4-4566-ae54-5c8b2a9c945a" sourceRef="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d" targetRef="sid-c853739f-dc5c-4ed1-87cc-0e45d2ac4695"/>
    <userTask id="sid-a15e1163-1d2b-4490-8170-03d2d5dea081" name="经理审批" activiti:assignee="${assign01}">
      <extensionElements>
        <activiti:taskListener event="create" class="com.example.demo01.listener.MyFirstListener"/>
      </extensionElements>
    </userTask>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_oa-leav">
    <bpmndi:BPMNPlane bpmnElement="oa-leav" id="BPMNPlane_oa-leav">
      <bpmndi:BPMNShape id="shape-14dafbf9-99b4-40de-b4db-d0b42e91ae06" bpmnElement="sid-33b71005-40e4-4b9f-b023-828285fb695f">
        <omgdc:Bounds x="-110.0" y="10.0" width="30.0" height="30.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape-e5246985-1bc3-4d47-a882-4c7a94ebfac8" bpmnElement="sid-c853739f-dc5c-4ed1-87cc-0e45d2ac4695">
        <omgdc:Bounds x="225.0" y="10.0" width="30.0" height="30.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="shape-ef66878d-dd54-4e3e-b477-72cc57d82b2b" bpmnElement="sid-a15e1163-1d2b-4490-8170-03d2d5dea081">
        <omgdc:Bounds x="-45.0" y="-14.999999" width="100.0" height="80.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="sid-a85f8e22-68ce-467e-9022-82e319af6a87" bpmnElement="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d">
        <omgdc:Bounds x="78.5" y="-15.0" width="100.0" height="80.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="edge-aabc430b-6da8-471e-853d-03abe130911e" bpmnElement="sid-0cb12b11-4634-486a-893b-abc2086e23b1">
        <omgdi:waypoint x="-80.0" y="25.0"/>
        <omgdi:waypoint x="-45.0" y="25.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge-75f8c3d2-47c3-48e3-88fb-1ec49724f338" bpmnElement="sid-b3da559f-3d0c-41c4-88a1-9ee1bfef579c">
        <omgdi:waypoint x="55.0" y="25.0"/>
        <omgdi:waypoint x="78.5" y="25.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="edge-a92558c3-4b67-46fb-b98f-0cf050769dfb" bpmnElement="sid-b41a5c92-17c4-4566-ae54-5c8b2a9c945a">
        <omgdi:waypoint x="178.5" y="25.0"/>
        <omgdi:waypoint x="225.0" y="25.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```

:::

部署流程

```java
@Test
public void test3() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
            .addClasspathResource("flow/oa-leav-listener.bpmn20.xml")
            .name("第三个流程")
            .deploy();
    Assertions.assertNotNull(deploy);
    System.out.println(deploy.getId());
    System.out.println(deploy.getName());
}
```

```json
{
	"table": "ACT_RE_DEPLOYMENT",
	"rows":
	[
		{
			"ID_": "27501",
			"NAME_": "第三个流程",
			"CATEGORY_": null,
			"KEY_": null,
			"TENANT_ID_": "",
			"DEPLOY_TIME_": "2023-12-11 11:45:42.854",
			"ENGINE_VERSION_": null
		}
	]
}
```

```json
{
	"table": "ACT_RE_PROCDEF",
	"rows":
	[
		{
			"ID_": "oa-leav:3:27503",
			"REV_": 1,
			"CATEGORY_": "http://www.activiti.org/processdef",
			"NAME_": "oa-leav",
			"KEY_": "oa-leav",
			"VERSION_": 3,
			"DEPLOYMENT_ID_": "27501",
			"RESOURCE_NAME_": "flow/oa-leav-listener.bpmn20.xml",
			"DGRM_RESOURCE_NAME_": null,
			"DESCRIPTION_": null,
			"HAS_START_FORM_KEY_": 0,
			"HAS_GRAPHICAL_NOTATION_": 1,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"ENGINE_VERSION_": null
		}
	]
}
```

开启流程

```java
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:3:27503"; // act_re_procdef
    Map<String, Object> map = new HashMap<>();
    map.put("assign01", "张33");
    map.put("assign02", "丽44");
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId,
            map);
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

监听器触发： 成功将审批人改为 "xxx666" 而不是配置好的 "张33"

```json{16}
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "30007",
			"REV_": 1,
			"EXECUTION_ID_": "30004",
			"PROC_INST_ID_": "30001",
			"PROC_DEF_ID_": "oa-leav:3:27503",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"OWNER_": null,
			"ASSIGNEE_": "xxx666",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-11 11:49:03.510",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

### 流程变量

流程变量可以用将数据添加到流程的运行时状态中，更具体地说时变量作用域中。
改变实体的各种API可以用来更新这些附加的变量。
一般来说，一个变量由一个名称和一个值组成。
名称用于在整个流程中识别变量。例如，一个活动（activity）设置了一个名为`var`的变量，那么后续活动中可以通过使用这个名称来访问它。

变量的值是一个Java对象。

#### 运行时变量

流程实例的运行时变量，存在`act_ru_variable`中。在流程实例运行结束后，此实例的变量在表中被删除。

在流程实例创建及启动时，可以设置流程变量。所有`startProcessInstanceXXX`方法都有一个可选参数用于设置变量。

##### 流程全局变量

```java{6-8,12}
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:3:27503"; // act_re_procdef
    Map<String, Object> map = new HashMap<>();
    map.put("assign01", "张33");
    map.put("assign02", "丽44");
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId,
            map);
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

```json
{
	"table": "ACT_RU_VARIABLE",
	"rows":
	[
		{
			"ID_": "30002",
			"REV_": 1,
			"TYPE_": "string",
			"NAME_": "assign01",
			"EXECUTION_ID_": "30001",
			"PROC_INST_ID_": "30001",
			"TASK_ID_": null,
			"BYTEARRAY_ID_": null,
			"DOUBLE_": null,
			"LONG_": null,
			"TEXT_": "张33",
			"TEXT2_": null
		},
		{
			"ID_": "30003",
			"REV_": 1,
			"TYPE_": "string",
			"NAME_": "assign02",
			"EXECUTION_ID_": "30001",
			"PROC_INST_ID_": "30001",
			"TASK_ID_": null,
			"BYTEARRAY_ID_": null,
			"DOUBLE_": null,
			"LONG_": null,
			"TEXT_": "丽44",
			"TEXT2_": null
		}
	]
}
```

获取变量值

```java
@Test
public void test8() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    Map<String, VariableInstance> variableInstances = runtimeService.getVariableInstances("30001");
    variableInstances.forEach((k, v) -> {
        System.out.println("key="+k+",value="+v);
    });
}
```

```txt
key=assign01,value=VariableInstanceEntity[id=30002, name=assign01, type=string, textValue=张33]
key=assign02,value=VariableInstanceEntity[id=30003, name=assign02, type=string, textValue=丽44]
```

##### 执行局部变量

任务（task）和执行（execute）实例仅仅是针对一个任务和一个执行实例范围，范围没有流程（process）实例大，称为local变量。

local变量用于在不同的任务或不同的执行实例中，作用域互不影响，变量名可以相同没有影响。local变量名也可以和global变量名相同，没有影响。

我们通过`RuntimeService`设置的local变量绑定的是executionId。在该流程中有效。

作用范围excution

```java
@Test
public void testxx() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    runtimeService.setVariableLocal("30001", "orderId", "100001");
    runtimeService.setVariableLocal("30001", "price", 1001);
}
```

```json
{
	"table": "ACT_RU_VARIABLE",
	"rows":
	[
		{
			"ID_": "32501",
			"REV_": 1,
			"TYPE_": "string",
			"NAME_": "orderId",
			"EXECUTION_ID_": "30001",
			"PROC_INST_ID_": "30001",
			"TASK_ID_": null,
			"BYTEARRAY_ID_": null,
			"DOUBLE_": null,
			"LONG_": null,
			"TEXT_": "100001",
			"TEXT2_": null
		},
		{
			"ID_": "32502",
			"REV_": 1,
			"TYPE_": "integer",
			"NAME_": "price",
			"EXECUTION_ID_": "30001",
			"PROC_INST_ID_": "30001",
			"TASK_ID_": null,
			"BYTEARRAY_ID_": null,
			"DOUBLE_": null,
			"LONG_": 1001,
			"TEXT_": "1001",
			"TEXT2_": null
		}
	]
}
```

##### 任务局部变量

作用范围当前task

```java
@Test
public void testtt() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = processEngine.getTaskService();
    taskService.setVariableLocal("30007", "Xxx", new Date());
}
```

多了taskid

```json
{
	"table": "ACT_RU_VARIABLE",
	"rows":
	[
		{
			"ID_": "35001",
			"REV_": 1,
			"TYPE_": "date",
			"NAME_": "Xxx",
			"EXECUTION_ID_": "30004",
			"PROC_INST_ID_": "30001",
			"TASK_ID_": "30007",
			"BYTEARRAY_ID_": null,
			"DOUBLE_": null,
			"LONG_": 1702271798134,
			"TEXT_": null,
			"TEXT2_": null
		}
	]
}
```

#### 历史变量

历史变量存入`act_hi_varinst`表中。在流程启动时，流程变量会同时传入历史变量表中；在流程结束时，历史表中的变量仍然存在。可以理解为“永久代”的流程变啊零。

获取已完成的、id为“xxx”的流程实例中，所有`HistoricVariableInstances`（历史变量实例），并且以变量名排序

```java
@Test
public void testHist() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    HistoryService historyService = processEngine.getHistoryService();
    List<HistoricVariableInstance> list = historyService.createHistoricVariableInstanceQuery().list();
    list.forEach(System.out::println);
}
```

```txt
HistoricVariableInstanceEntity[id=25002, name=assign01, revision=0, type=string, textValue=张十三]
HistoricVariableInstanceEntity[id=25003, name=assign02, revision=0, type=string, textValue=lisi]
HistoricVariableInstanceEntity[id=30002, name=assign01, revision=0, type=string, textValue=张33]
HistoricVariableInstanceEntity[id=30003, name=assign02, revision=0, type=string, textValue=丽44]
HistoricVariableInstanceEntity[id=32501, name=orderId, revision=1, type=string, textValue=100001]
HistoricVariableInstanceEntity[id=32502, name=price, revision=1, type=integer, longValue=1001, textValue=1001]
HistoricVariableInstanceEntity[id=35001, name=Xxx, revision=0, type=date, longValue=1702271798134]
HistoricVariableInstanceEntity[id=37501, name=globalXx, revision=0, type=integer, longValue=1001, textValue=1001]
```

### 任务人选

任务人选有：

+ 委托人 —— 确定的任务人选

  ```xml
  <userTask id="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d" name="hr审批" activiti:assignee="lishi"/>
  ```

+ 候选人 —— 可选的任务人选

  ```xml
  <userTask id="sid-a15e1163-1d2b-4490-8170-03d2d5dea081" name="经理审批" activiti:candidateUsers="candidate-zhangs,candidate-zhang2"/>
  ```

+ 候选人组 —— 可选的任务人选组

```java
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:4:40003"; // act_re_procdef
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId
    );
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

```java
@Test
public void test5_1() {
    String processInstanceId = "42501";
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    List<IdentityLink> identityLinksForProcessInstance = runtimeService.getIdentityLinksForProcessInstance(processInstanceId);
    identityLinksForProcessInstance.forEach(action -> {
        System.out.println(action);
    });
}
```

```txt
IdentityLinkEntity[id=42509, type=participant, userId=candidate-zhang2, processInstanceId=42501]
IdentityLinkEntity[id=42507, type=participant, userId=candidate-zhangs, processInstanceId=42501]
```

```json
{
	"table": "ACT_RU_IDENTITYLINK",
	"rows":
	[
		{
			"ID_": "42506",
			"REV_": 1,
			"GROUP_ID_": null,
			"TYPE_": "candidate",
			"USER_ID_": "candidate-zhangs",
			"TASK_ID_": "42505",
			"PROC_INST_ID_": null,
			"PROC_DEF_ID_": null
		},
		{
			"ID_": "42507",
			"REV_": 1,
			"GROUP_ID_": null,
			"TYPE_": "participant",
			"USER_ID_": "candidate-zhangs",
			"TASK_ID_": null,
			"PROC_INST_ID_": "42501",
			"PROC_DEF_ID_": null
		},
		{
			"ID_": "42508",
			"REV_": 1,
			"GROUP_ID_": null,
			"TYPE_": "candidate",
			"USER_ID_": "candidate-zhang2",
			"TASK_ID_": "42505",
			"PROC_INST_ID_": null,
			"PROC_DEF_ID_": null
		},
		{
			"ID_": "42509",
			"REV_": 1,
			"GROUP_ID_": null,
			"TYPE_": "participant",
			"USER_ID_": "candidate-zhang2",
			"TASK_ID_": null,
			"PROC_INST_ID_": "42501",
			"PROC_DEF_ID_": null
		}
	]
}
```

#### 候选人查询待办

候选人查询自己有没有待审批的任务！

```java
@Test
public void testCandidate() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    TaskQuery taskQuery = taskService.createTaskQuery().taskCandidateUser("candidate-zhangs");
    taskQuery.list().forEach(task -> {
        System.out.println(task);
    });
}
```

```txt
Task[id=42505, name=经理审批]
```

#### 待办任务拾取操作

未确定委托人时，委托人是空的。

```json{16}
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "42505",
			"REV_": 1,
			"EXECUTION_ID_": "42502",
			"PROC_INST_ID_": "42501",
			"PROC_DEF_ID_": "oa-leav:4:40003",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"OWNER_": null,
			"ASSIGNEE_": null,
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-11 15:07:36.250",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

通过下面方法，从候选人中选定委托人

```java
@Test
public void testCandidateClain() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    String candidateUser = "candidate-zhangs";
    TaskQuery taskQuery = taskService.createTaskQuery().taskCandidateUser(candidateUser);
    taskQuery.list().forEach(task -> {
        taskService.claim(task.getId(), candidateUser);
    });
}
```

::: tip
选定委托人后，再用`taskService.createTaskQuery().taskCandidateUser("candidate-zhangs");`查看候选人记录就查不到了。
:::

```json{16}
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "42505",
			"REV_": 2,
			"EXECUTION_ID_": "42502",
			"PROC_INST_ID_": "42501",
			"PROC_DEF_ID_": "oa-leav:4:40003",
			"NAME_": "经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-a15e1163-1d2b-4490-8170-03d2d5dea081",
			"OWNER_": null,
			"ASSIGNEE_": "candidate-zhangs",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-11 15:07:36.250",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": "2023-12-11 18:44:08.449"
		}
	]
}
```

#### 待办任务归还操作

释放当前候选人的拾取状态，让别的候选人的查到、能拾取。

::: tip
归还操作的本质其实就是设置审批人为空
:::

```java
@Test
public void testCandidateUnclain() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    String candidateUser = "candidate-zhangs";
    TaskQuery taskQuery = taskService.createTaskQuery().taskCandidateOrAssigned(candidateUser);
    taskQuery.list().forEach(task -> {
        taskService.unclaim(task.getId());
    });
}
```

#### 候选人组

```xml
<userTask id="sid-a15e1163-1d2b-4490-8170-03d2d5dea081" name="经理审批" activiti:candidateGroups="销售部"/>
<userTask id="sid-eb45f638-f668-44b8-94ff-5c2f3e2e570d" name="人事审批" activiti:candidateUsers="张十三,李44"/>
```

部署流程

```java
@Test
public void test3() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
            .addClasspathResource("flow/oa-leav-candidate-group.bpmn20.xml")
            .name("第五个流程：候选人组")
            .deploy();
    Assertions.assertNotNull(deploy);
    System.out.println(deploy.getId());
    System.out.println(deploy.getName());
}
```

`oa-leav:5:45003`

开启流程

```java
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav:5:45003"; // act_re_procdef
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId
    );
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}
```

```json
{
	"table": "ACT_RU_IDENTITYLINK",
	"rows":
	[
		{
			"ID_": "47506",
			"REV_": 1,
			"GROUP_ID_": "销售部",
			"TYPE_": "candidate",
			"USER_ID_": null,
			"TASK_ID_": "47505",
			"PROC_INST_ID_": null,
			"PROC_DEF_ID_": null
		}
	]
}
```

查看（根据组查找）

```java
@Test
public void testCandidate() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    taskService.createTaskQuery().taskCandidateGroup("销售部")
            .list().forEach(task -> {
                System.out.println(task);
            });
}
```

```txt
Task[id=47505, name=经理审批]
```

拾取

```java
@Test
public void testCandidateClaim() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    taskService.createTaskQuery().taskCandidateGroup("销售部")
            .list().forEach(task -> {
                System.out.println(task);
                taskService.claim(task.getId(), "张三3");
            });
}
```

::: tip
这里“销售部”和“张三3”的组关系可能要我们来维护了！
:::

归还

```java
@Test
public void testCandidateUnclaim() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    List<Task> taskList = taskService.createTaskQuery()
//                .taskCandidateGroup("销售部")
            .taskAssignee("张三3")
            .list();
    if(CollectionUtils.isEmpty(taskList)) {
        System.out.println("没有数据！");
    } else {
        taskList.forEach(task -> {
            System.out.println(task);
            taskService.unclaim(task.getId());
        });
    }
}
```

任务交接：获取用户审批权限的用户没有时间审批了，但是他也可以不用归还而是做任务的交接，把这个任务交给另一个人审批。

```java
@Test
public void testCandidateUnclaim() {
    ProcessEngine engine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = engine.getTaskService();
    List<Task> taskList = taskService.createTaskQuery()
//                .taskCandidateGroup("销售部")
            .taskAssignee("张三3")
            .list();
    if(CollectionUtils.isEmpty(taskList)) {
        System.out.println("没有数据！");
    } else {
        taskList.forEach(task -> {
            System.out.println(task);
//                taskService.unclaim(task.getId());
            taskService.setAssignee(task.getId(), "李四4");
        });
    }
}
```

### 网关

网关可控制流程的执行流向，常用于拆分或合并复杂的流程场景。

在Activiti7中，有以下几种类型的网关：

1. 排他网关（Exclusive Gateway）：用于在流程中进行条件判断，根据不同的条件选择不同的分支路径。只有满足条件的分支会被执行，其他分支会被忽略。
1. 并行网关（Parallel Gateway）：用于将流程分成多个并行的分支，这些分支可以同时执行。当所有分支都执行完毕后，流程会继续向下执行。
1. 包容网关（Inclusive Gateway）：用于根据多个条件的组合情况选择分支路径。可以选择满足任意一个条件的分支执行，或者选择满足所有条件的分支执行。
1. 事件网关（Event Gateway）：用于根据事件的触发条件选择分支路径。当指定的事件触发时，流程会选择对应的分支执行。

这些网关可以根据实际需求灵活地组合使用，以实现不同的流程控制逻辑。Activiti7提供了直观的图形化界面，用户可以通过拖拽和连接网关来定义流程的分支和合并。同时，Activiti7还提供了丰富的API和扩展点，方便开发人员进行二次开发和定制。

#### 排他网关

排他网关（exclusive gateway）（也叫异或网关 XOR gateway；或者基于数据的排他网关 exclusive data-based gateway）用于对流程中的决策建模。

当执行到达这个网关时，会按照所有出口顺序流定义的顺序对它们进行计算。选择第一个条件计算为true的顺序流（当没有设置条件时，认为顺序流为true）继续流程。

![image.png](https://s2.loli.net/2023/12/11/t9mYxvqOVfuSB3j.png)

`${days<3}`

```xml{11,14}
<process id="oa-leav-gateway-exclusive" name="oa-leav-gateway-exclusive" isExecutable="true">
<startEvent id="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2"/>
<endEvent id="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
<userTask id="sid-2038a234-40c2-492f-bf24-2344fa1305fe" name="创建请假单" activiti:assignee="张三"/>
<exclusiveGateway id="sid-ca90c19c-fe7b-4f5d-b1b8-e3411983e052"/>
<sequenceFlow id="sid-527d442e-b269-44b9-a588-a9db38c89807" sourceRef="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2" targetRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe"/>
<sequenceFlow id="sid-1d010201-7cbf-4db3-b453-832bae1aada5" sourceRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe" targetRef="sid-ca90c19c-fe7b-4f5d-b1b8-e3411983e052"/>
<userTask id="sid-6af46f6a-d158-43cc-ae41-344abeafce11" name="部门经理审批" activiti:assignee="李四"/>
<userTask id="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" name="总经理审批" activiti:assignee="王五"/>
<sequenceFlow id="sid-13aead87-9613-4a4e-b3cd-b7678e0f571f" sourceRef="sid-ca90c19c-fe7b-4f5d-b1b8-e3411983e052" targetRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11">
  <conditionExpression xsi:type="tFormalExpression">${days&lt;3}</conditionExpression>
</sequenceFlow>
<sequenceFlow id="sid-afb1e947-1fbb-486d-abff-f8fd80ee3300" sourceRef="sid-ca90c19c-fe7b-4f5d-b1b8-e3411983e052" targetRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee">
  <conditionExpression xsi:type="tFormalExpression">${days&gt;=3}</conditionExpression>
</sequenceFlow>
<userTask id="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" name="人事审批" activiti:assignee="赵六"/>
<sequenceFlow id="sid-7d96f9d8-4ede-4980-9cd2-460d75ecdf59" sourceRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" targetRef="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
<sequenceFlow id="sid-6913fa1c-08c4-4a76-8c26-d2a52e7b7026" sourceRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11" targetRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc"/>
<sequenceFlow id="sid-1de75c04-11ea-4c87-a92f-402997ac6217" sourceRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" targetRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc"/>
</process>
```

部署

```java
@Test
public void test3() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RepositoryService repositoryService = processEngine.getRepositoryService();
    Deployment deploy = repositoryService.createDeployment()
            .addClasspathResource("flow/oa-leav-gateway-exclusive.bpmn20.xml")
            .name("第六个流程：排他网关")
            .deploy();
    Assertions.assertNotNull(deploy);
    System.out.println(deploy.getId());
    System.out.println(deploy.getName());
}
```

开启流程，提交天数

```java
// 开启流程
@Test
public void test5() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    RuntimeService runtimeService = processEngine.getRuntimeService();
    String processDefinitionId = "oa-leav-gateway-exclusive:1:52503"; // act_re_procdef
    // 返回流程实例对象
    ProcessInstance processInstance = runtimeService.startProcessInstanceById(
            processDefinitionId
    );
    System.out.println("processInstance.getId() = " + processInstance.getId());
    System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
    System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
}

// 完成第一个审批，即提交天数
@Test
public void test6() {
    ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
    TaskService taskService = processEngine.getTaskService();
    taskService.createTaskQuery().taskAssignee("张三").list()
            .forEach(task -> {
                System.out.println(task);
                Map<String, Object> transientVariables = new HashMap<>();
                transientVariables.put("days", 3);
                taskService.complete(task.getId(), transientVariables);
            });
}
```

提交后，因为`days=3`，符合排他网关中“大于等于3”的规则，会将执行（execution）到“总经理审批”的任务（task）。

#### 并行网关

并行网关允许将流程分成多个分支，也可以把多条分支汇聚到一起，并行网关的功能时基于进入和外出顺序流的：

+ fork分支： 并行后的所有外出顺序流，为每个顺序都创建一个并发分支。
+ join汇聚： 所有到达并行网关，在此等待的进入分支，直到所有进入顺序流的分支都到达以后，流程就会通过汇聚网关。

::: warning
如果同一个并行网关有多个进入和多个外出顺序流，它就同时具有分支和汇聚功能。这时，网关会先汇聚所有进入的顺序流，然后再切分成多个并行分支。
:::

与其他网关的主要区别是，并行网关不会解析条件。即使顺序流中定义了条件，也会被忽略。

![image.png](https://s2.loli.net/2023/12/12/qIyHzKOvjR3AMmG.png)

```xml
<process id="oa-leav-gateway-exclusive" name="oa-leav-gateway-exclusive" isExecutable="true">
  <startEvent id="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2"/>
  <endEvent id="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
  <userTask id="sid-2038a234-40c2-492f-bf24-2344fa1305fe" name="创建请假单" activiti:assignee="张三"/>
  <sequenceFlow id="sid-527d442e-b269-44b9-a588-a9db38c89807" sourceRef="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2" targetRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe"/>
  <userTask id="sid-6af46f6a-d158-43cc-ae41-344abeafce11" name="技术经理审批" activiti:assignee="李四"/>
  <userTask id="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" name="人事审批" activiti:assignee="王五"/>
  <userTask id="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" name="项目经理审批" activiti:assignee="赵六"/>
  <parallelGateway id="sid-c314d147-bf33-4493-99ae-ea4965f4be18"/>
  <sequenceFlow id="sid-465f549c-4664-464b-8d5a-83f450c2ab88" sourceRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe" targetRef="sid-c314d147-bf33-4493-99ae-ea4965f4be18"/>
  <sequenceFlow id="sid-4d8d6f5c-1e18-45dd-9149-cc0eeddd578b" sourceRef="sid-c314d147-bf33-4493-99ae-ea4965f4be18" targetRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <sequenceFlow id="sid-1cb79ad8-5fd3-48a8-aa66-4373af4fcc93" sourceRef="sid-c314d147-bf33-4493-99ae-ea4965f4be18" targetRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <sequenceFlow id="sid-b4313ed4-2208-4e0c-b0ff-4d047ffc1a26" sourceRef="sid-c314d147-bf33-4493-99ae-ea4965f4be18" targetRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <parallelGateway id="sid-161bd097-9195-410d-936f-caa68bb10ce2"/>
  <sequenceFlow id="sid-9a1fe2e3-6725-4a54-97df-939febee7f77" sourceRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" targetRef="sid-161bd097-9195-410d-936f-caa68bb10ce2"/>
  <sequenceFlow id="sid-bd0be722-edc2-4254-a18a-40b1d1530333" sourceRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11" targetRef="sid-161bd097-9195-410d-936f-caa68bb10ce2"/>
  <sequenceFlow id="sid-27cf5a8f-94d6-473d-8884-0795909086d6" sourceRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" targetRef="sid-161bd097-9195-410d-936f-caa68bb10ce2"/>
  <userTask id="sid-f7054bac-b8ff-446b-87e7-76913f069cac" name="总经理审批" activiti:assignee="赵六"/>
  <sequenceFlow id="sid-0bf1ab3e-e240-4b56-ad4c-7bf6c68f30a1" sourceRef="sid-161bd097-9195-410d-936f-caa68bb10ce2" targetRef="sid-f7054bac-b8ff-446b-87e7-76913f069cac">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <sequenceFlow id="sid-26bfa73d-c7c4-4442-bdc4-9e71409743c9" sourceRef="sid-f7054bac-b8ff-446b-87e7-76913f069cac" targetRef="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
</process>
```

```java
    /**
     * 部署
     */
    @Test
    public void test3() {
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deploy = repositoryService.createDeployment()
                .addClasspathResource("flow/oa-leav-gateway-parallel.bpmn20.xml")
                .name("第七个流程：并行网关")
                .deploy();
        Assertions.assertNotNull(deploy);
        System.out.println(deploy.getId());
        System.out.println(deploy.getName());
    }
    /**
     * 开启流程
     */
    @Test
    public void test5() {
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        RuntimeService runtimeService = processEngine.getRuntimeService();
        String processDefinitionId = "oa-leav-gateway-exclusive:2:65003"; // act_re_procdef
        // 返回流程实例对象
        ProcessInstance processInstance = runtimeService.startProcessInstanceById(
                processDefinitionId
        );
        System.out.println("processInstance.getId() = " + processInstance.getId());
        System.out.println("processInstance.getDeploymentId() = " + processInstance.getDeploymentId());
        System.out.println("processInstance.getDescription() = " + processInstance.getDescription());
    }
    @Test
    public void test6() {
        ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
        TaskService taskService = processEngine.getTaskService();
        taskService.createTaskQuery().taskAssignee("张三").list()
                .forEach(task -> {
                    System.out.println(task);
                    Map<String, Object> transientVariables = new HashMap<>();
                    transientVariables.put("days", 3);
                    taskService.complete(task.getId(), transientVariables);
                });
    }
```

在“张三”的“请假申请”提交后，有三个并行的审批任务： （`PROC_INST_ID_`都是`67501`）

```json
{
	"table": "ACT_RU_TASK",
	"rows":
	[
		{
			"ID_": "70006",
			"REV_": 1,
			"EXECUTION_ID_": "67502",
			"PROC_INST_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"NAME_": "技术经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-6af46f6a-d158-43cc-ae41-344abeafce11",
			"OWNER_": null,
			"ASSIGNEE_": "李四",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-12 08:30:03.938",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		},
		{
			"ID_": "70009",
			"REV_": 1,
			"EXECUTION_ID_": "70003",
			"PROC_INST_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"NAME_": "人事审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-60c77321-cade-4fae-8109-6ad1fe2e34ee",
			"OWNER_": null,
			"ASSIGNEE_": "王五",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-12 08:30:03.967",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		},
		{
			"ID_": "70012",
			"REV_": 1,
			"EXECUTION_ID_": "70004",
			"PROC_INST_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"NAME_": "项目经理审批",
			"PARENT_TASK_ID_": null,
			"DESCRIPTION_": null,
			"TASK_DEF_KEY_": "sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc",
			"OWNER_": null,
			"ASSIGNEE_": "赵六",
			"DELEGATION_": null,
			"PRIORITY_": 50,
			"CREATE_TIME_": "2023-12-12 08:30:03.969",
			"DUE_DATE_": null,
			"CATEGORY_": null,
			"SUSPENSION_STATE_": 1,
			"TENANT_ID_": "",
			"FORM_KEY_": null,
			"CLAIM_TIME_": null
		}
	]
}
```

同时存在4个execution （一个`root_proc_inst_id`，三个待办任务关联的executionid）

::: tip
这里涉及到activiti7的表结构设计。这里设计了两种执行流程实例：

+ 主流程实例： 流程启动后就会在`ACT_RU_EXECUTION`中维护一条记录，这条记录的`parent_id_`为`null`
+ 子流程实例： 表示流程的每一步操作。表示当前流程的执行进度。比如并行网关中，就会有三个子流程实例，对应任务表中的三个待办任务。

:::

```json
{
	"table": "ACT_RU_EXECUTION",
	"rows":
	[
		{
			"ID_": "67501",
			"REV_": 2,
			"PROC_INST_ID_": "67501",
			"BUSINESS_KEY_": null,
			"PARENT_ID_": null,
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"SUPER_EXEC_": null,
			"ROOT_PROC_INST_ID_": "67501",
			"ACT_ID_": null,
			"IS_ACTIVE_": 1,
			"IS_CONCURRENT_": 0,
			"IS_SCOPE_": 1,
			"IS_EVENT_SCOPE_": 0,
			"IS_MI_ROOT_": 0,
			"SUSPENSION_STATE_": 1,
			"CACHED_ENT_STATE_": null,
			"TENANT_ID_": "",
			"NAME_": null,
			"START_TIME_": "2023-12-12 08:25:55.124",
			"START_USER_ID_": null,
			"LOCK_TIME_": null,
			"IS_COUNT_ENABLED_": 0,
			"EVT_SUBSCR_COUNT_": 0,
			"TASK_COUNT_": 0,
			"JOB_COUNT_": 0,
			"TIMER_JOB_COUNT_": 0,
			"SUSP_JOB_COUNT_": 0,
			"DEADLETTER_JOB_COUNT_": 0,
			"VAR_COUNT_": 0,
			"ID_LINK_COUNT_": 0
		},
		{
			"ID_": "67502",
			"REV_": 2,
			"PROC_INST_ID_": "67501",
			"BUSINESS_KEY_": null,
			"PARENT_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"SUPER_EXEC_": null,
			"ROOT_PROC_INST_ID_": "67501",
			"ACT_ID_": "sid-6af46f6a-d158-43cc-ae41-344abeafce11",
			"IS_ACTIVE_": 1,
			"IS_CONCURRENT_": 0,
			"IS_SCOPE_": 0,
			"IS_EVENT_SCOPE_": 0,
			"IS_MI_ROOT_": 0,
			"SUSPENSION_STATE_": 1,
			"CACHED_ENT_STATE_": null,
			"TENANT_ID_": "",
			"NAME_": null,
			"START_TIME_": "2023-12-12 08:25:55.157",
			"START_USER_ID_": null,
			"LOCK_TIME_": null,
			"IS_COUNT_ENABLED_": 0,
			"EVT_SUBSCR_COUNT_": 0,
			"TASK_COUNT_": 0,
			"JOB_COUNT_": 0,
			"TIMER_JOB_COUNT_": 0,
			"SUSP_JOB_COUNT_": 0,
			"DEADLETTER_JOB_COUNT_": 0,
			"VAR_COUNT_": 0,
			"ID_LINK_COUNT_": 0
		},
		{
			"ID_": "70003",
			"REV_": 1,
			"PROC_INST_ID_": "67501",
			"BUSINESS_KEY_": null,
			"PARENT_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"SUPER_EXEC_": null,
			"ROOT_PROC_INST_ID_": "67501",
			"ACT_ID_": "sid-60c77321-cade-4fae-8109-6ad1fe2e34ee",
			"IS_ACTIVE_": 1,
			"IS_CONCURRENT_": 0,
			"IS_SCOPE_": 0,
			"IS_EVENT_SCOPE_": 0,
			"IS_MI_ROOT_": 0,
			"SUSPENSION_STATE_": 1,
			"CACHED_ENT_STATE_": null,
			"TENANT_ID_": "",
			"NAME_": null,
			"START_TIME_": "2023-12-12 08:30:03.932",
			"START_USER_ID_": null,
			"LOCK_TIME_": null,
			"IS_COUNT_ENABLED_": 0,
			"EVT_SUBSCR_COUNT_": 0,
			"TASK_COUNT_": 0,
			"JOB_COUNT_": 0,
			"TIMER_JOB_COUNT_": 0,
			"SUSP_JOB_COUNT_": 0,
			"DEADLETTER_JOB_COUNT_": 0,
			"VAR_COUNT_": 0,
			"ID_LINK_COUNT_": 0
		},
		{
			"ID_": "70004",
			"REV_": 1,
			"PROC_INST_ID_": "67501",
			"BUSINESS_KEY_": null,
			"PARENT_ID_": "67501",
			"PROC_DEF_ID_": "oa-leav-gateway-exclusive:2:65003",
			"SUPER_EXEC_": null,
			"ROOT_PROC_INST_ID_": "67501",
			"ACT_ID_": "sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc",
			"IS_ACTIVE_": 1,
			"IS_CONCURRENT_": 0,
			"IS_SCOPE_": 0,
			"IS_EVENT_SCOPE_": 0,
			"IS_MI_ROOT_": 0,
			"SUSPENSION_STATE_": 1,
			"CACHED_ENT_STATE_": null,
			"TENANT_ID_": "",
			"NAME_": null,
			"START_TIME_": "2023-12-12 08:30:03.937",
			"START_USER_ID_": null,
			"LOCK_TIME_": null,
			"IS_COUNT_ENABLED_": 0,
			"EVT_SUBSCR_COUNT_": 0,
			"TASK_COUNT_": 0,
			"JOB_COUNT_": 0,
			"TIMER_JOB_COUNT_": 0,
			"SUSP_JOB_COUNT_": 0,
			"DEADLETTER_JOB_COUNT_": 0,
			"VAR_COUNT_": 0,
			"ID_LINK_COUNT_": 0
		}
	]
}
```

#### 包容网关

也叫“包含网关”，可以看作是排他网关和并行网关的结合体。和排他网关一样，你可以在外出顺序流上定义条件，包含网关会解析它们。但是主要的区别是包含网关可以选择多于一条顺序流，这个并行网关一样。

包含网关的功能是基于进入和外出顺序流的：

+ 分支：所有外出顺序流的条件都会被解析，结果为true的顺序流会以并行方式继续执行，会为每个顺序流创建一个分支。 
+ 汇聚：所有并行分支到达包含网关，会进入等待状态，直到每个包含流程token的进入顺序流的分支都到达。这是与并行网关最大的不同点。换句话说，包含网关只会等待被选中执行了的进入顺序流。在汇聚之后，流程会穿过包含网关继续执行。

![image.png](https://s2.loli.net/2023/12/12/IbivtWhZK5EMV4u.png)

```xml
<process id="oa-leav-gateway-exclusive" name="oa-leav-gateway-exclusive" isExecutable="true">
  <startEvent id="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2"/>
  <endEvent id="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
  <userTask id="sid-2038a234-40c2-492f-bf24-2344fa1305fe" name="创建请假单" activiti:assignee="张三"/>
  <sequenceFlow id="sid-527d442e-b269-44b9-a588-a9db38c89807" sourceRef="sid-2cfaf394-0566-438d-93a1-2cf4158b64b2" targetRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe"/>
  <userTask id="sid-6af46f6a-d158-43cc-ae41-344abeafce11" name="技术经理审批" activiti:assignee="李四"/>
  <userTask id="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" name="人事审批" activiti:assignee="王五"/>
  <userTask id="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" name="项目经理审批" activiti:assignee="赵六"/>
  <sequenceFlow id="sid-465f549c-4664-464b-8d5a-83f450c2ab88" sourceRef="sid-2038a234-40c2-492f-bf24-2344fa1305fe" targetRef="sid-2288b610-557b-417d-97a1-c6eea7a58332"/>
  <sequenceFlow id="sid-4d8d6f5c-1e18-45dd-9149-cc0eeddd578b" sourceRef="sid-2288b610-557b-417d-97a1-c6eea7a58332" targetRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11" name="请假小于等于3天">
    <conditionExpression xsi:type="tFormalExpression">${days&lt;=3}</conditionExpression>
  </sequenceFlow>
  <sequenceFlow id="sid-1cb79ad8-5fd3-48a8-aa66-4373af4fcc93" sourceRef="sid-2288b610-557b-417d-97a1-c6eea7a58332" targetRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <sequenceFlow id="sid-b4313ed4-2208-4e0c-b0ff-4d047ffc1a26" sourceRef="sid-2288b610-557b-417d-97a1-c6eea7a58332" targetRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" name="请假大于3天">
    <conditionExpression xsi:type="tFormalExpression">${days&gt;3}</conditionExpression>
  </sequenceFlow>
  <sequenceFlow id="sid-9a1fe2e3-6725-4a54-97df-939febee7f77" sourceRef="sid-3b6a1696-6a59-46f1-a675-6f51c19eb8fc" targetRef="sid-e81097fa-62fd-404d-8ee8-fc04d48a7f41"/>
  <sequenceFlow id="sid-bd0be722-edc2-4254-a18a-40b1d1530333" sourceRef="sid-6af46f6a-d158-43cc-ae41-344abeafce11" targetRef="sid-e81097fa-62fd-404d-8ee8-fc04d48a7f41"/>
  <userTask id="sid-f7054bac-b8ff-446b-87e7-76913f069cac" name="总经理审批" activiti:assignee="赵六"/>
  <sequenceFlow id="sid-0bf1ab3e-e240-4b56-ad4c-7bf6c68f30a1" sourceRef="sid-e81097fa-62fd-404d-8ee8-fc04d48a7f41" targetRef="sid-f7054bac-b8ff-446b-87e7-76913f069cac">
    <conditionExpression xsi:type="tFormalExpression"/>
  </sequenceFlow>
  <sequenceFlow id="sid-26bfa73d-c7c4-4442-bdc4-9e71409743c9" sourceRef="sid-f7054bac-b8ff-446b-87e7-76913f069cac" targetRef="sid-7ce65516-2815-43a4-bd28-d29460a81510"/>
  <inclusiveGateway id="sid-2288b610-557b-417d-97a1-c6eea7a58332"/>
  <inclusiveGateway id="sid-e81097fa-62fd-404d-8ee8-fc04d48a7f41"/>
  <sequenceFlow id="sid-a6521f4d-7274-4be9-8044-dc0732b620a0" sourceRef="sid-60c77321-cade-4fae-8109-6ad1fe2e34ee" targetRef="sid-e81097fa-62fd-404d-8ee8-fc04d48a7f41"/>
</process>
```

#### 事件网关

事件网关允许根据事件判断流向。网关的每个外出顺序都要连接到一个中间捕获事件。当流程到达一个基于事件网关，网关会进入等待状态（停止执行）。与此同时，会为每个外出顺序流创建相对的事件订阅。

事件网关的外出顺序流和普通顺序流不同，这些顺序流不会真的“执行”，相反它们会让流程引擎决定执行到事件网关的流程需要订阅哪些事件。

要考虑以下条件：

+ 事件网关必须有两条或以上外出顺序流；
+ 事件网关后，只能使用`intermediateCatchEvent`类型（activiti不支持基于事件网关后连接ReceiveTask）；
+ 连接到事件网关的中间捕获事件必须只有一个入口顺序流；

::: tip
看不懂的话，先看下面的“事件”介绍。
:::

### 事件

事件（event）通常用于为流程生命周期中发生的事情建模。事件总是图形化为圆圈。在BPMN2.0中，有两种主要的事件分类：捕获（catching）与抛出（throwing）事件。

+ **捕获**：当流程执行到达这个事件时，会等待直到触发器动作。触发器的类型由其中的图标，或者说xml中的类型声明而定义。捕获事件与抛出事件显示上的区别，时其内部的没有填充（即白色）。
+ **抛出**：当流程执行到这个事件时，会触发一个触发器。触发器的类型由其中的图标，或者说xml中的类型声明而定义。抛出事件与捕获事件显示上的区别，时器内部的图标填充为黑色。

#### 定时器事件

定时器事件是一种在特定事件触发的事件。在Activiti中，可以通过定时器事件来实现定时执行某个任务或者触发某个流程实例，具体包括定时器启动事件、定时器捕获中间件事件、定时器边界事件，在很多的业务场景中。

##### 定时器开始事件

定时器启动事件（timer start event）在指定事件创建流程实例。在流程只需要启动一次，或者流程需要在特定的时间间隔重复启动时，都可以使用。在使用时我们需要注意如下几点：

1. 子流程不能有定时器启动事件。
1. 定时器启动事件，在流程部署的同时就开始计时。不需要调用`startProcessInstanceByXXX`就会在时间启动。调用`startProcessInstanceByXXX`时会在定时启动之外额外启动一个流程。
1. 当部署带有定时器启动时间的流程的更新版本时，上一个版本的定时器作业会被移除。这时因为通常不希望旧版本的流程仍然自动启动新的流程实例。
1. `asyncExecutorActivate`需要设置为true，否则定时器不生效，因为这块需要开启异步任务。

定义：

+ `timeDate` e.g. `2022-01-02T00:00:00`
+ `timeCycle` e.g. `R/PT1H` 每小时触发一次， `R3/PT30S` 每30秒触发一次，一共触发3次
+ `timeDuration` e.g. `PT2H30M` 持续2h30min

自定义委托类

```xml
<process id="oa-leav" name="oa-leav" isExecutable="true">
	<serviceTask id="sid-3c9d9fb3-c5a1-4384-a8d4-78262536bdb5" activiti:exclusive="true" activiti:class="com.example.demo01.delegate.MyFirstDelegate"/>
	<startEvent id="sid-4d44e421-8aa8-4bf3-9b61-bb24a8af8805">
		<timerEventDefinition>
			<timeCycle>R3/PT10S</timeCycle>
		</timerEventDefinition>
	</startEvent>
	<sequenceFlow id="sid-748b52a3-7d1c-4019-bcca-0a8daa6c304f" sourceRef="sid-4d44e421-8aa8-4bf3-9b61-bb24a8af8805" targetRef="sid-3c9d9fb3-c5a1-4384-a8d4-78262536bdb5"/>
</process>
```

```java
package com.example.demo01.delegate;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

import java.time.LocalDateTime;

public class MyFirstDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("服务任务执行了。。。"+ LocalDateTime.now().toString());
    }
}
```

##### 定时器中间事件

如审批后，等待3min才进入下一个审批任务

##### 定时器边界事件

当某个用户任务或者子流程在规定的事件后还没有执行，那么我们就可以通过定时器边界事件来触发执行特定的处理流程。

比方说，总经理审批任务两天没动作，将发短信提醒或者将委托人交给秘书处理或者直接将审批任务取消等，具体看业务需求。

::: warning
在定时器边界配置了 cancelActivity 属性，用于说明该事件是否为中断事件。 

+ cancelActivity 属性值默认为 true，表示它是边界中断事件，当该边界事件触发时，它所依附的活动实例被中止，原有的执行流程被中断，流程将沿着边界事件的外出顺序继续流转。
+ 如果 cancelActivity 属性值为 false，表示边界非中断事件，当边界事件触发时，则原来的执行流仍然存在，所依附的活动实例继续执行，同时也执行边界事件的外出顺序流。
:::

![image.png](https://s2.loli.net/2023/12/13/FmaWuUCqpYzN9jc.png)

```xml
<process id="oa-buy-event" name="oa-buy-event" isExecutable="true">
	<startEvent id="sid-b304937c-05bb-4ba9-9453-495fbb4ee255"/>
	<endEvent id="sid-ee5717f9-5fde-4ad2-80ce-0db01683c1b0"/>
	<userTask id="sid-f8544504-6420-4acc-a221-745b288e2103" name="总经理审批" activiti:assignee="张十三"/>
	<userTask id="sid-3e387cd3-ed6b-4f0e-8340-34d05a34c531" name="财务审批" activiti:assignee="王武"/>
	<boundaryEvent id="sid-7e6e1637-ce4c-4a5e-84f9-b36e3f8617fd" attachedToRef="sid-f8544504-6420-4acc-a221-745b288e2103">
		<timerEventDefinition>
			<timeDuration>PT1M</timeDuration>
		</timerEventDefinition>
	</boundaryEvent>
	<serviceTask id="sid-7e57119a-752e-4e58-ac94-bcce2408bb7c" activiti:exclusive="true" name="通知服务" activiti:class="com.example.demo01.delegate.MyFirstDelegate"/>
	<sequenceFlow id="sid-44adbecc-6092-43cd-bc01-833f433a4598" sourceRef="sid-b304937c-05bb-4ba9-9453-495fbb4ee255" targetRef="sid-f8544504-6420-4acc-a221-745b288e2103"/>
	<sequenceFlow id="sid-60f21120-ebed-4b3a-8780-dd0873ea47ef" sourceRef="sid-f8544504-6420-4acc-a221-745b288e2103" targetRef="sid-3e387cd3-ed6b-4f0e-8340-34d05a34c531"/>
	<sequenceFlow id="sid-1251fad7-601f-4d86-b675-fa14c85970a1" sourceRef="sid-3e387cd3-ed6b-4f0e-8340-34d05a34c531" targetRef="sid-ee5717f9-5fde-4ad2-80ce-0db01683c1b0"/>
	<sequenceFlow id="sid-9e769fec-6e47-46fc-ba5b-c5ff52575bab" sourceRef="sid-7e6e1637-ce4c-4a5e-84f9-b36e3f8617fd" targetRef="sid-7e57119a-752e-4e58-ac94-bcce2408bb7c"/>
	<endEvent id="sid-9347604b-e55a-483a-aa32-c82177c3e892"/>
	<sequenceFlow id="sid-cc625994-c66b-47e6-94e4-d1ff2a558578" sourceRef="sid-7e57119a-752e-4e58-ac94-bcce2408bb7c" targetRef="sid-9347604b-e55a-483a-aa32-c82177c3e892"/>
</process>
```

部署流程

发起流程

#### 消息事件

消息事件（message event）是指引用具名消息的事件。消息具有名字与载荷。
与信号不同，消息事件只有一个接收者。

##### 消息开始事件

消息开始事件，也就是我们通过接收到某些消息后来启动流程实例，比如接收到一封邮件、一条短信等。

定义流程、绑定消息

![image.png](https://s2.loli.net/2023/12/14/cVTm2SsnCiG3e4Z.png)

```xml
<message id="msg01" name="firstMsg"></message>
```

部署流程后，消息启动事件会在`act_ru_event_subscr`中记录我们的定义信息。

然后就可以发送相关消息来激活流程实例。

```java
@Test
public void test7() throws InterruptedException {
		ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
		RuntimeService runtimeService = processEngine.getRuntimeService();
		// 发送消息
		runtimeService.startProcessInstanceByMessage("msg01");
		TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

##### 消息中间事件

消息中间事件就是在流程运行中需要消息来触发的场景。

案例演示：流程1处理完成后，需要接收特定的消息后才能进入到流程2。

![image.png](https://s2.loli.net/2023/12/14/gxBwk35UPLvG1l7.png)

```java
// 实际开发，这里代码应该放在消息中间件的消费者listener中
@Test
public void test8() {
		ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
		RuntimeService runtimeService = processEngine.getRuntimeService();
		Execution execution = runtimeService.createExecutionQuery()
				.processInstanceId("110001")
				.onlyChildExecutions()
				.singleResult();
		runtimeService.messageEventReceived("msg02", execution.getId());
}
```

##### 消息边界事件

消息边界事件：简单来说就是用户审批任务上监听消息事件，如果该任务完成前收到消息，就触发消息事件的处理流程。

![image.png](https://s2.loli.net/2023/12/14/g7eHJqDV836fOuP.png)

#### 错误事件

错误事件可以用做一个流程的开始事件或者作为一个任务或子流程的边界事件，错误事件没有提供作用中间事件的功能，这一点和前面介绍的定时器事件和消息事件还有区别的。

在错误事件中提供了“错误开始事件”、“错误结束事件”。

##### 错误开始事件

错误开始事件（error start event）可以触发一个事件子流程，且总是在另外一个流程异常结束时触发的。BPMN2.0规定了错误开始事件只能在事件子流程中被触发，不能在其他流程中被触发，包括顶级流程、嵌套子流程和调用活动。

+ 错误启动事件不能用于启动流程实例！！！
+ 错误启动事件总是中断的！

场景：

1. 输入验证失败：当用户提交工作流程启动请求时，需要对输入的数据进行验证。如果数据不符合预期的格式或者规则，可以使用错误开始事件来捕获并处理验证失败的情况。
1. 权限验证失败：在某些情况下，只有特定的用户或者用户组才能启动某个工作流。当非授权用户尝试启动工作流时，可以使用错误开始事件来捕获并处理权限验证失败的情况。
1. 前置条件不足：在工作流启动之前，可能需要满足一些前置条件，例如某个数据已经存在或某个服务可用。如果前置条件不满足，可以使用错误开始事件来捕获并处理这种情况。
1. 数据源异常：在工作流启动过程中，可能需要从外部数据源获取数据。如果数据源出现异常无法获取数据，可以使用错误开始事件来捕获并处理数据源异常的情况。

总的来说，错误开始事件可以用于捕获工作流启动时可能出现的各种错误情况，并根据具体的业务需求进行相应的处理。

```java
package com.example.demo01.delegate;

import org.activiti.engine.delegate.BpmnError;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

import java.time.LocalDateTime;

public class MyFirstDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("服务任务执行了。。。"+ LocalDateTime.now().toString());
        // 显式的抛出 error1 的异常信息。触发错误开始事件
        throw new BpmnError("error01");
    }
}
```

##### 错误边界事件

当某个任务发生错误时，可以通过错误边界事件来捕获并处理该错误，以保证流程的正常执行。

错误边界事件可以在流程中的任务节点上定义，并与该任务节点关联。当任务节点执行过程中发生错误时，错误边界事件会被触发，并执行相应的处理逻辑，如发送错误通知、重新分配任务、转跳到其他节点等。

错误边界事件可以捕获多种类型的错误，如异常、超时、网络故障等。通过使用错误边界事件，可以增加流程的容错性，并提供更好的错误处理机制，保证流程的稳定性和可靠性。

需要注意的是，错误边界事件只能与任务节点关联，而不能与其他类型的节点（如网关、开始节点、结束节点）关联。此外，在设计流程时，需要准确定义错误边界事件的触发条件和处理逻辑，以确保错误能够被正确捕获和处理。

![image.png](https://s2.loli.net/2023/12/14/uGAMdKqxPXH5g8O.png)

##### 错误结束事件

在Activiti中，错误结束事件（Error End Event）是一个用于标记流程实例在特定错误条件下结束的节点。当流程实例执行到错误结束事件时，流程实例将立即终止执行，并且流程实例的状态将被标记为“错误结束”。

错误结束事件可以与错误边界事件（Error Boundary Event）结合使用，用于在流程中捕获和处理特定的错误。当错误边界事件触发时，流程会转跳到与错误边界事件关联的错误结束事件，从而使流程实例结束。

错误结束事件可以配置一个错误代码，用于标识特定的错误类型。在流程定义中，可以定义多个错误结束事件，每个事件可以有不同的错误代码。当流程实例执行到错误结束事件时，可以根据错误代码进行相应的处理，例如记录日志、发送通知等。

错误结束事件可以用于处理各种错误情况，例如系统异常、业务规则异常等。通过使用错误结束事件，可以使流程能够在错误发生时进行合理的处理，提高系统的可靠性和稳定性。

总之，错误结束事件是Activiti中的一个节点，用于标记流程实例在特定错误条件下结束。它可以与错误边界事件结合使用，用于捕获和处理特定的错误。通过hi使用错误结束事件，可以实现对流程中各种错误情况的处理和管理。

![image.png](https://s2.loli.net/2023/12/14/On8PUF4No3vI6k1.png)

#### 信号事件

信号事件是Activiti中的一种事件类型，用于在流程执行过程中通知其他流程实例或任务实例。

信号事件是一种全局事件，可以在任何流程实例或任务实例中触发和捕获。当一个流程实例或任务实例触发了一个信号事件，其他等待捕获相同信号的流程实例或任务实例将被唤醒并继续执行。

信号事件可以用于以下场景：

1. 并行流程实例之间的协作：当一个流程实例需要与其他并行流程实例进行协作时，可以触发一个信号事件来通知其他流程实例执行相应的任务。
1. 动态流程控制：当流程的执行需要根据外部条件进行动态调整时，可以使用信号事件来触发相应的流程变化。
1. 异常处理：当发生异常情况时，可以触发一个信号事件来通知其他流程实例或者任务实例进行异常处理。

使用信号事件需要以下几个步骤：

1. 定义信号事件：在流程定义中定义要给信号事件，指定信号的名称和其他属性。
1. 触发信号事件：在流程实例或者任务实例中触发一个信号事件。
1. 捕获信号事件：在其他流程实例或者任务实例中捕获相同名称的信号事件。
1. 响应信号事件：在捕获的信号事件中定义相应的处理逻辑，例如执行任务或流程变化。 \
	信号事件我们可以分为开始事件、中间捕获事件、中间抛出事件、边界事件。

##### 信号开始事件

启动事件是一个特殊的信号事件，用于在流程启动时触发。

当流程启动时，如果存在一个启动事件，并且该事件匹配到了被触发的信号，流程将会被启动。

启动事件可以用于实现流程启动前的条件判断，例如当某个条件满足时，才允许启动流程。

![image.png](https://s2.loli.net/2023/12/14/s87PwGXlMmQShLg.png)

```java
/**
	* 通过信号启动事件
	* 发起一个流程
	* 1. 通过runtimeService中提供的API来发送信号
	* 1. 通过其他流程实例中的信号中间抛出事件来触发
	* 1. 作为普通的流程实例来启动即可
	*/
@Test
public void test9() throws InterruptedException {
		ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
		RuntimeService runtimeService = processEngine.getRuntimeService();
		// 发送消息 发送的消息应该是具体的消息名称而不应该是id
		// runtimeService.startProcessInstanceByMessage("firstMsg");
		runtimeService.signalEventReceived("signal01");
		TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

##### 信号中间事件

信号中间事件分为捕获事件和抛出事件。当流程转到信号中间捕获事件时会中断并等待触发，直到接收到相应的信号后沿信号中间捕获事件的外出顺序流继续流转。信号事件默认是全局的，与其他事件（如错误事件）不同，其信号不会再捕获之后被消费。如果存在多个引用了相同信号的事件被激活，即使它们不在同一个流程实例中，当接收到该信号时，这些事件也会被一并触发。

![image.png](https://s2.loli.net/2023/12/14/HSOFeNwkWQlM7Jc.png)

##### 信号边界事件

信号边界事件会捕获与其信号事件定义引用的信号具有相同信号名称的信号。当流程转到信号边界事件依附的流程活动（如用户任务、子流程等）时，工作流程引擎会创建一个捕获事件，在其依附的流程活动的生命周期内等待一个抛出信号。该信号可以由信号中间抛出事件抛出或由API触发。信号边界事件被触发后流程会沿其外出顺序流继续流转。如果该边界事件设置为中断，则依附的流程活动将被终止。

![image.png](https://s2.loli.net/2023/12/15/D9mSOfZQqbvI62p.png)

##### 区别：信号事件与消息事件

+ 消息只有接收接口

	![image.png](https://s2.loli.net/2023/12/14/gxBwk35UPLvG1l7.png)

+ 信号可以被主动发出，然后接收接口接收

	![image.png](https://s2.loli.net/2023/12/14/HSOFeNwkWQlM7Jc.png)

+ 另外，信号可以设置全局范围或者instance范围

#### 其他事件

##### 终止结束事件

“终止结束事件”也称为“中断结束事件”，主要是对流程进行终止的事件。可以在一个复杂的流程中，如果某方想要提前中断这个流程，可以采用这个事件来处理，可以在并行处理任务中。如果你是在流程实例层处理，整个流程都会被中断；如果是在子流程中使用，那么当前作用和作用域内的所有流程都会被中断。

![image.png](https://s2.loli.net/2023/12/15/Y9GgNzbkiVvhUIQ.png)

我们在“用户任务1”和“用户任务2”没有审批的情况下，当“用户任务3”审批通过后同时设置flag为false的情况下，触发了“终止结束事件”，那么整个流程实例都被终止！

##### 取消结束事件

取消结束事件（cancel end event）只能与BPMN事务子流程（BPMN transaction subprocess）一起使用。当到达取消结束事件时，会抛出取消事件，且必须由取消边界事件（cancel boundary event）捕获。取消边界事件将取消事务，并触发补偿（compensation）。

> 简单来说就是：
>
> 1. 通过该事件，可以退出子流程
> 1. 该事件触发后，会触发子流程内部的补偿事件！（做一些回退操作？）

![image.png](https://s2.loli.net/2023/12/22/t1kBF6Q2KISjqTs.png)

注意点：

1. 在流程设计器中没有提供“事务子流程”的图标，需要通过普通的子流程来设置事务的属性
1. 补偿事件需要记得勾选“Is transaction subprocess”选项！ （如果没有钩该选项，流程图部署时其实也会报错~）

##### 补偿事件

todo https://www.bilibili.com/video/BV1za4y1u7r6?p=46

## 参考

+ [x] 2023|波哥|Activiti7|基础0~47（重复） - <https://www.bilibili.com/video/BV1za4y1u7r6>
+ [x] 2023|波哥|Activiti7|基础0~34 - <https://www.bilibili.com/video/BV17N411y7qE>
+ [x] 2023|波哥|Activiti7|事件27~47 - <https://www.bilibili.com/video/BV1bh4y1j7D2/>
+ [ ] 2023|波哥|Activiti7|源码0~11 - <https://www.bilibili.com/video/BV1X94y1Y7gS/>
