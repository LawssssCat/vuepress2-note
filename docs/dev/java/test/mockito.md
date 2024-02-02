---
title: Mockito 代码打桩、检测
---

Get - When - Then

todo mockito/powermock/BaizeTest for java dt

todo cloudsop/springboot

## 初始化

注解方式

```java
@ExtendWith(MockitoExtension.class)
public class InitMockOrSpyDemo {
  @Mock
  private UserService mockUserService;

  @Spy
  private UserService spyUserService;

  @Test
  public void testInit() {
    Mockito.mockingDetails(mockUserService).isMock(); // true
    Mockito.mockingDetails(spyUserService).isSpy(); // true
    Mockito.mockingDetails(spyUserService).isMock(); // true —— ❗Spy是Mock的子类
  }
}
```

等同下面代码

```java
public class InitMockOrSpyDemo {
  @Mock
  private UserService mockUserService;

  @Spy
  private UserService spyUserService;

  @BeforeEach
  public void init() {
    MockitoAnnotations.openMocks(this);
  }
}
```

等同下面代码

```java
public class InitMockOrSpyDemo {
  private UserService mockUserService;

  private UserService spyUserService;

  @BeforeEach
  public void init() {
    mockUserService = Mockito.mock(UserService.class);
    spyUserService = Mockito.spy(UserService.class);
  }
}
```

## 使用 mock

mock 不真正调用方法！

```bash
Star mock = mock(Star.class);

# 模拟返回值
when(mock.getName()).thenReturn("hello");
# 模拟多次返回值
when(mock.getName()).thenReturn("hello").thenReturn("world").thenReturn("!");
# 另一种写法
doReturn("hello").doReturn("world").doReturn("!").when(mock).getName();
# 返回空
doNothing().when(mock).getName();
```

## 使用 spy

```java

```

todo