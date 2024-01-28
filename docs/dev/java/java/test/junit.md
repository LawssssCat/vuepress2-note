---
title: Junit 单元测试
---

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
