---
title: 测试管理
tags:
  - 代码质量
  - 测试
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

### 测试模式

+ 白盒测试 —— 看代码
+ 黑盒测试 —— 不看代码

### 测试角色

+ 开发者 —— DT（Developer Test，开发者测试）
+ 测试人员
+ “用户”（公司高层）/PM（项目经理）/SA/SE
+ 灰度测试人员 —— 部分被筛选的用户
+ 全体用户

### 测试阶段

+ **UT（Unit Test，单元测试）**【白盒、DT】 —— 最小的测试粒度。测试用例由开发人员编写，通过断言、代码覆盖率统计（coverage）的手段，在开发阶段用于验证代码模块是否符合预期、代码质量是否合格。

    todo 单元测试策略 https://blog.csdn.net/2301_77645573/article/details/131293738

+ **SIT（System Integration Test，集成测试/组装测试/联合测试）**【白盒+黑盒、DT】 —— 在 UT（单元测试）的基础上，将所有模块按照设计要求组装成系统或子系统，进行设计上的和需求上的验证。即测试模块间的接口，也测试业务功能。

    todo 集成测试策略

    + **冒烟测试（Smoke Testing）**：开发人员进行。用于确认代码中的更改会按预期运行，且不会破坏整个版本的稳定性。
        ::: tip
        冒烟测试源自于硬件行业。意思是对一个硬件或硬件组件进行更改或修复后，直接给设备加电。如果没有冒烟，则该组件就通过了测试。
        :::
    + **可用性测试（Sanity Testing/Functional Testing）**：开发人员/测试人员进行。用于验证主要的功能是否能跑通。
    + **回归测试（Regression Testing）**：在上述测试中发现代码缺陷/设计问题需要更改需求。在修改了旧代码后，重复以前的全部或部分的相同测试以确认修改没有引入新的错误或导致其他代码产生错误。
        ::: tip
        所谓“回归”指测试人员重走一遍当初发现问题的步骤，看问题是否已经修复。
        :::
+ **ST（System Test，系统测试）**【黑盒】 —— 将已经确认的软件、数据、接口、计算机硬件、外设、网络等所有与系统有关的元素结合在一起，完整地模拟客户环境对系统进行的黑盒测试。
    1. 根据需求，测试功能是否实现。
    1. 根据规范，测试性能、安全性、健壮性、可维护性是否达标。
+ **UAT（User Acceptance Test，用户验收测试/用户接受测试）**【黑盒】 —— 用户根据用例描述测试每一个场景，反馈系统问题。开发人员基于问题对系统和业务的影响进行判断，适当的修正系统或记录业务需求，根据需求优先级，集成进下一个迭代版本中。
    + **Alpha 测试**：内测版本，开发者内部交流；是由用户在开发者的场所来进行的，在一个受控的环境中进行。测试完后一般不会有大问题。
    + **Beta 测试**：公测版本，面向所有用户；由软件的最终用户在一个或多个用户场所来进行的，开发者通常不在现场，用户记录测试中遇到的问题并报告给开发者，开发者对系统进行最后的修改，并开始准备发布最终的软件。
    + **Gamma 测试**：指软件正式发行的候选版，相当成熟，与正式版本相差无几，成为正式发布的候选版。
    + **UAT Sign off（里程碑）**：意思是用户验收测试（UAT）通过并获得批准，即用户对软件系统的测试结果满意，并同意将其投入使用。
