---
title: Junit 单元测试
---

## 版本

参考： 

+ [在Maven项目中运行JUnit 5测试用例](https://waylau.com/running-junit5-tests-with-maven/)
+ [为什么默认排除 junit-vintage-engine ？](https://www.liujiajia.me/2021/5/14/why-exclude-junit-vintage-engine-by-default)

### Junit5

相比较JUnit 4而言，JUnit 5一个比较大的改变是JUnit 5拥有与JUnit 4不同的全新的API。JUnit 5分成了三部分：

JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage

+ **JUnit Platform** 【基础】 —— 是在JVM上启动测试框架的基础。 它还定义了TestEngine API，用于开发在平台上运行的测试框架。 此外，该JUnit Platform还提供了一个控制台启动器（用于从命令行启动该平台）和一个基于JUnit 4的运行器，用于在基于JUnit 4的环境中在该平台上运行任何TestEngine。 流行的IDE（IntelliJ IDEA，Eclipse，NetBeans和Visual Studio Code等）和构建工具（Gradle，Maven和Ant等）中也存在对JUnit平台的一流支持。
+ **JUnit Jupiter** 【Junit5】 —— 是新编程模型和扩展模型的组合，用于在JUnit 5中编写测试和扩展。Jupiter子项目提供了一个TestEngine，用于在平台上运行基于Jupiter的测试。
+ **JUnit Vintage** 【Junit4】 —— 提供了一个TestEngine，用于在平台上运行基于JUnit 3和基于JUnit 4的测试。

简单的来说： 只使用 Junit5 就使用 JUnit Jupiter；需要向上兼容则使用 JUnit Jupiter + JUnit Vintage；

::: warning
Junit5 的 `@Test` 在 `org.junit.jupiter.api.*` 包下，别选择错了，否则新版的注释将不生效！
:::

::: tip
对于 spring-boot-starter-test 的 2.2.x 和 2.3.x 的用户，如果只想使用 Junit5 则需要像如下方法把 JUnit Vintage 排除。
因为这两个版本同时包含 JUnit Jupiter 和 JUnit Vintage，如果不排除的话，一个不小心就会把引用写错。

```xml
<!-- Test -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```
:::


## 生命周期

每个 Test Class 执行一次

```java
@ClassRule
@ClassBefore

... methods ...

@ClassAfter
@ClassRule
```

每个 Test Method 执行一次

```java
@Rule
@Before
@Test
@After
@Rule
```

## 关于 `@ExtendWith(SpringExtension.class)` 注解的解释

参考： [解析“@ExtendWith注解“](https://blog.csdn.net/ll1042668699/article/details/128069286)

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { BirdConfig.class, CatConfig.class, DogConfig.class })
class ConfigUnitTest {

    @Autowired
    ApplicationContext context;

    @Test
    void givenImportedBeans_whenGettingEach_shallFindIt() {
        assertThatBeanExists("dog", Dog.class);
        assertThatBeanExists("cat", Cat.class);
        assertThatBeanExists("bird", Bird.class);
    }

    private void assertThatBeanExists(String beanName, Class<?> beanClass) {
        assertTrue(context.containsBean(beanName));
        assertNotNull(context.getBean(beanClass));
    }
}
```

### 关于 `@ExtendWith` 注解

`@ExtendWith`是Junit5新引入的注解, 用于扩展test能力, 通过提供一系列的扩展点(extension point)来支持用户在执行具体的单测实例前后去做一些环境准备等工作, 这部分工作与单测内容无关, 但对于单测的正常执行却至关重要, 比如Spring单测需要启动一个spring容器, 完成指定bean的构建; 或执行测试数据库前进行连接数据库等工作。

扩展点如下

```
实现ExecutionCondition接口 —— 根据参数判断该单测是否进行执行, 比如根据配置文件application.properties的环境参数env==test 指定单测执行的前提条件.

单测实例生命周期运行中的回调函数： 
BeforeAllCallback —— 单测实例构建前
BeforeAll
BeforeEachCallback —— 所有测试方法执行前
BeforeEach
BeforeTestExecutionCallback —— 单个测试方法执行前
Test
AfterTestExecutionCallback —— 单个测试方法执行后
AfterEach
AfterEachCallback —— 所有测试方法执行后
AfterAll
AfterAllCallback —— 单测实例构建后
```

### 关于 `SpringExtension.class` 实现类

SpringExtension是对 `@ExtendWith` 注解提供的扩展点的一种实现, 用来将Spring Test Framework 集成到 Junit5 测试环境中, 其类定义实现了生命周期回调/测试实例后处理/参数解析等扩展点的接口，通过这些扩展点, 完成Spring的TestContext构建与初始化, 并将指定的类的bean的构建。

todo 具体扩展了什么地方，做了什么

## 常用注解

Before / After

每个方法前执行 —— @Before、@BeforeEach（Junit5后改名为这个，原方法名依然可用）

测试类中所有方法执行前执行 —— @BeforeClass、@BeforeAll（Junit5后改名为这个，原方法名依然可用）

### `@Rule`

修饰方法前后的处理器。

e.g.

下面例子的处理器 ExceptedException 可以处理方法后抛出的异常：

```java
@RunWith(SpringJunit4ClassRunner.class)
public class DaTransferTest {
    @Rule
    public ExceptedException exceptedExceptionRule = new ExceptedException();

    @Before void setup() {...}
    @After void teardown() {...}

    @Test
    public void doTransfer_GivenExceptionOccuredTest() {
        DaTransfer spy = Mockito.spy(daTransfer);
        spy.setHaPoolManager(haPoolManager);

        when(haPoolManager.getSlotHashSize()).thenReturn(100);
        when(haPoolManager.getBucketHa(any(String.class))).thenThrow(new Exception("Invalid bucket!"));

        exceptedExceptionRule.expect(Exception.class);

        spy.doTransfer(dataSource);
    }
}
```
