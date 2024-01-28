---
title: 测试管理
tags:
  - 代码质量
---

## 测试概念

**目标**

测试的目标是验证代码是错误的。（即：目标是给代码找错误！）

**指标**

+ 覆盖率 —— 低则测试不充分，但高不代表有效！不要求100%，否则影响开发进度。

**可测试性**

测试用例是简单的、可行的！

考虑：

+ 可观察
+ 可控制
+ 小规模

```bash
原则： F.I.R.S.T
F fast 快速
I isolated 隔离
R repeatable 可重复
S self-validating 可自验证（断言）
T timely 及时的（开发完就测，别等个一年半载再测）
```

**分层**

+ UT（Unit Test） —— 单元测试
    + 核心在于分支覆盖率
    + 不关注业务正确性
+ CT（Component Test） —— 组件测试
+ IT（Integration Test） —— 集成测试
+ ST（System Test） —— 系统测试

```bash
单元测试分层

Controller:
@WebMVCTest

Service:
@SpringJunitConfig

DAO:
@JdbcTest
@DataJpaTest
@MybatisTest
```

```bash
测试四象限

Q1 —— 是否完成功能开发
Unit Tests
Component Tests

Q2 —— 是否解决业务问题
Functional Tests
Examples
Story Tests
Simulations

Q3 —— 是否符合用户使用场景
Exploratory Testing
Scenaries
UAT（User Acceptance Testing）
Alpha / Beta

Q4 —— 是否满足性能需求
Performance & Load Testing
Security Testing
"llity" Testing
Mutation Testing（变异测试）
```

### 用例结构

+ SUT（System Under Test，被测试系统）
+ DOC（Depended-on Components，依赖组件）
+ Test Double，测试替身
    + Stub，打桩 —— 为SUT提供输入
    + Spy，间谍 —— 监听状态
    + Mock，模拟 —— 模拟输入输出
    + Fake，伪造 —— 减轻环境依赖

#### Stub

提供输入条件

```java
interface InputReader {
  String read();
}

@Test
public void test1() {
  assertThat(new InputReader() {
    public String read() {
      return "hello world!";
    }
  }.read()).isEqualTo("hello world!");
}

@Test
@MockSystem(properties = "msg=hello-world!")
public void test2() {
    assertThat(new InputReader() {
      return System.getProperty("msg");
    }).isEqualTo("hello-world!");
}
```

#### Mock

提供模拟输入/输出

```java
@Test
public void test3() {
  InputReader inputReader = Mockito.mock(InputReader.class);
  when(inputReader.read()).thenReturn("hello world!");
  assertThat(inputReader.read()).isEqualTo("hello world!");
}
```

#### Spy

检测数据/调用情况

```java
interface Star {
  void show();
}

class StarWrapper {
  private final Star star;

  StarWrapper(Star star) {
    this.star = star;
  }

  void show(int n) {
    for (int i = 0; i < n; i++) {
      star.show();
    }
  }
}

@Test
public void testSpy() {
  Star mock = Mockito.mock(Star.class);
  StarWrapper starWrapper = new StarWrapper(mock);
  starWrapper.show(3);
  Mockito.verify(mock, Mockito.times(3)).show();
  starWrapper.show(1);
  Mockito.verify(mock, Mockito.times(4)).show();
}
```



todo 白盒/黑盒/灰度/回归/冒烟

todo junit/spock for java ut

todo mockito/powermock/BaizeTest for java dt

todo coverage

todo cloudsop/springboot

开发 - 冒烟测试 = 开发自测？ todo 名称含义

测试 - 回归测试 todo 名称含义

测不过就回溯
