---
title: Java 面试题目笔记
tags:
  - java
  - 面试
---

参考：

+ 精准突击！2023最新版Java面试短期突击面试题【200P】我会出手带你一周涨薪！ - <https://www.bilibili.com/video/BV1Av4y187hf/?p=2>

## API记忆/理解

### Java 线程实现方式

1. 继承 Thread 类，重写 run 方法
2. 实现 Runnable 接口，重写 run 方法
3. 实现 Callable 接口，重写 call 方法，配合 FutureTask 获得返回结果

    ```java
    MyCallable myCallable = new MyCallable();
    FutureTask futureTask = new FutureTask(myCallable);
    Thread t1 = new Thread(futureTask);
    t1.start();
    
    Object count = futureTask.get(); // 运行结果
    System.out.println("总和："+count);
    ```

4. 基于线程池构建线程

> 但是，上述几个方法，归根到底都是实现了 Runnable 接口。

## 算法

### 哲学家就餐问题 —— 死锁

![sJ6P4zTViZU8xWCg-image-1699604189026.png](https://s2.loli.net/2023/11/23/Kjw7EzpC5Zh2U4d.png)

OOA - OOD - DDD

class：哲学家（Philosohper） class：筷子（ChopStick）

#### 模拟死锁过程

```java
public static class Philosohper extends Thread {
  private ChopStick left, right;
  private int index;
  public Philosohper(String name, int index, ChopStick left, ChopStick right) {
    this.setName(name);
    this.index = index;
    this.left = left;
    this.right = right;
  }
  @Override
  public void run() {
    synchronized(left) {
      SleepHelper.sleepSeconds(1 + index);
      synchronized(right) {
        SleepHelper.sleepSeconds(1);
        System.out.println(index + "号ok");
      }
    }
  }
}

main() {
  ChopStick c1 = new ChopStick();
  ChopStick c2 = new ChopStick();
  ChopStick c3 = new ChopStick();
  ChopStick c4 = new ChopStick();
  ChopStick c5 = new ChopStick();

  Philosohper p1 = new Philosohper("p1", 1, cs1, cs2);
  Philosohper p2 = new Philosohper("p2", 2, cs2, cs3);
  Philosohper p3 = new Philosohper("p3", 3, cs3, cs4);
  Philosohper p4 = new Philosohper("p4", 4, cs4, cs5);
  Philosohper p5 = new Philosohper("p5", 5, cs5, cs1);

  p1.start();
  p2.start();
  p3.start();
  p4.start();
  p5.start();
}
```

#### 解决死锁问题

一个换手拿

```java
@Override
public void run() {
  if(index ==0) {
    synchronized(right) {
      SleepHelper.sleepSeconds(1 + index);
      synchronized(left) {
        SleepHelper.sleepSeconds(1);
        System.out.println(index + "号ok");
      }
    }
  } else {
    synchronized(left) {
      SleepHelper.sleepSeconds(1 + index);
      synchronized(right) {
        SleepHelper.sleepSeconds(1);
        System.out.println(index + "号ok");
      }
    }
  }
}
```

### 多任务同时失败 —— 分布式问题

多个任务，一个执行错误，其他都应该取消 —— 代码如何写

```java
public static void main(String[] args)S throws Exception {
  Thread t1 = new MyTask("t1", 3, true);
  Thread t1 = new MyTask("t2", 4, true);
  Thread t1 = new MyTask("t3", 1, false);

  t1.start();
  t2.start();
  t3.start();

  System.in.read();
}

private static class MyTask extends Thread {
  private String name;
  private int timeInSeconds;
  private boolean success;
  public MyTask(String name, int timeInSeconds, boolean success) {
    this.name = name;
    this.timeInSeconds = timeInSeconds;
    this.success = success;
  }
  @Override
  public void run() {
    // todo
  }
}
```

处理1 —— 不好

```java
main() {
  for (;;) {
    for(MyTask task : tasks) {
      if (task.getResult() == Result.FAILED) {
        System.exit(0);
      }
    }
  }
}

private static enum Result {
  NOTEND, SUCCESSED, FAILED
}

private static class MyTask extends Thread {
  // ...
  @Override
  public void run() {
    SleepHelper.sleepSeconds(timeInSeconds);
    System.out.println(name + "任务结束！");
    result = success ? Result.SUCCESSED : Result.FAILED;
  }
}
```

处理2

```java

```

## 好习惯

### 返回值改变时间

找不同

```java
private double result = 0.0D;
public void addAll(double[] values) {
  for(double value : values) {
    result += value;
  }
}
```

```java
private double result = 0.0D;
public void addAll(double[] values) {
  double sum = 0.0D;
  for(double value : values) {
    sum += value;
  }
  result += sum;
}
```

后者多线程更安全
