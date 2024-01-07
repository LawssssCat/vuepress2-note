---
title: JDK-Process使用笔记
---

## Process

通过Process可以在Java进程内运行其他进程。

常用字符

```txt
进程命令 command
工作目录 cwd current working directory
环境变量 env environment
标准输入输出 redirectInput/Output/Error
```

核心类

```java
java.lang.Process
java.lang.ProcessBuilder
java.lang.Runtime
```

### 运行过程

通过开启一个子进程执行命令。如果Java进程后续的执行依赖于子进程的执行结果，则等待子进程结束，否则可以并发执行。

![image.png](https://s2.loli.net/2024/01/07/H4XSN6s17VTWvco.png)

### 重定向

![image.png](https://s2.loli.net/2024/01/07/Ds3jJ4uWfcTE6g5.png)

#### 管道（Pipe）（默认）

![image.png](https://s2.loli.net/2024/01/07/ieoROjkrauv6STx.png)

#### 继承（Inherit）

使用标准输入输出

![image.png](https://s2.loli.net/2024/01/07/cKw9UmxVM8uTn1z.png)

#### 文件（File）

![image.png](https://s2.loli.net/2024/01/07/DSgiUOCHREFA6KV.png)

## 测试

todo 引入测试代码！
