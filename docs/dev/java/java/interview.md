---
title: Java 面试题目笔记
tags:
  - java
  - 面试
---

参考：

+ [ ] ~~精准突击！2023最新版Java面试短期突击面试题【200P】我会出手带你一周涨薪！ - <https://www.bilibili.com/video/BV1Av4y187hf/?p=2>~~
+ [x] 32小时讲完的大厂高频面试题（MySQL、Redis、Spring、算法、设计模式等） - <https://www.bilibili.com/video/BV1Ad4y1H7VA/>
+ [ ] IT老齐架构600讲 - <https://www.bilibili.com/video/BV1v44y117K9/>
+ [ ] 图灵|24版Spring全家桶面|连环60问 - <https://www.bilibili.com/video/BV1EN411g7M6>

## Java基础语法

### 两个Integer比较

两个对象比较用 equals

之所以有使用用 `==` 符合预期，是因为享元模式在128前的数据统一做了缓存。

```java
Integer a = 100;
Integer b = 100;
a == b // true
```

```java
Integer a = 1000;
Integer b = 1000;
a == b // false
```

### String创建对象数

`new String("abc")` 创建了多少个对象？

1. `new` 关键字在堆中创建 String 对象
1. 传入 `"abc"` 字符串，这会在 String 对象中存储为常量
    1. 看字符串常量池
    1. 没有就往常量池中添加字符串对象
    1. 有就直接取对象引用

答： 1 ~ 2 个。常量池有该字符串1个；否则2个。

### finally 必须执行？

两种情况不执行

1. 没try住
1. `System.exit(0)`

### volatile

volatile能保证线程安全吗？不能，不具有原子性。主要功能是保证变量值的可见性（修改了马上可见）和禁止指令重排序（修改不被忽略，如i++;i--;i++不被优化为i++，在小灯闪烁的场景可能有用）
https://www.bilibili.com/video/BV1t14y1B76w/

### 为什么JDK动态代理只能代理有接口的类

JDK动态代理机制决定的

```java
public class ProxyExample {
  public static void main(String[] args) {
    // 让代理对象的class文件写入到磁盘
    System.getProperties().put("sum.misc.ProxyGenerator.saveGeneratedFiles", "true");
    IHelloService helloService = (IHelloService) Proxy.newProxyInstance(
      IHelloService.class.getClassLoader(),
      new Class[]{IHelloService.class},
      (proxy,method,args1) -> {
        System.out.println("动态代理执行的逻辑");
        return "hello world";
      }
    );
    System.out.println(helloService.say());
  }
}
```

这里生成的代理类会继承 Proxy 类。而因为 Java 是单继承的，所以代理的对象只能设计成接口实现了。

### StringBuffer和StringBuilder区别

```txt
String 
private final char value[];
最慢 —— final，所以每次更改都new新对象

StringBuffer
char[] value // 可变
线程安全 —— 方法上有synchronized锁
运行慢

StringBuilder
char[] value // 
线程不安全
运行快
```

### 线上项目突发OOM ？如何快速定位OOM问题 ？

https://www.bilibili.com/video/BV1Wu4y1c7N5/

#### 出现OOM的可能原因

出现OOM可能的原因有：

1. 查询一次查太多（全表），一次创建太多对象，申请太多堆内存 —— 解决：减少申请对象的数量，如分页
1. 内存资源耗尽，没有释放，如jdbcconnection没有释放 —— 解决：资源用完马上释放；使用池化思想（最多申请固定数量的资源，重复使用，超过的需求就排队等待）
1. 堆内存分配不够日常大对象的开销 —— `jmap --heap`查看堆信息

#### 定位OOM的问题

+ 如果系统已经OOM挂了 —— 启动时设置`-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=`，当出现OOM后，会dump一份堆信息到指定目录，分析OOM具体代码位置。（用Java VisualVM分析）

  ::: tip
  如果设置了上述参数，那么就要确保系统的硬盘空间足够。因为该参数会记录系统的整个运行过程中的所有对象信息，非常占用硬盘空间的！也就说导出时，文件可能会非常大！
  :::

+ 系统运行中未OOM（比如，收到频繁fullgc告警、cpu load飙高告警） —— 导出dump文件：`jmap -dump:format=b,file=xxx.hprof 14660`/`jps; jmap -histo:live 24286`。然后使用`Arthas`工具进行调试。
+ 结合jvisualvm进行调试 —— 查看最多跟业务有关的对象，找到GCroot、查看线程栈

## JVM

### 内存模型

![image.png](https://s2.loli.net/2023/12/05/hQoC4ESOB2Hs9pl.png)

+ 类加载

+ 运行时数据区

  > 2+3+4 —— 2（堆+方法区）、3（虚拟机栈、本地方法栈、程序计数器）、4（局部变量表、操作数栈、动态链接、方法出口）

  + 堆
  + 方法区
    + 运行时常量池
  + "线程"
    + 虚拟机栈
      + "栈帧"
        + 局部变量表 —— 方法中定义的变量
        + 操作数栈 —— 存储运算时可能的临时变量。e.g. `a=1,b=a+2`先1入栈再出栈，a在局部变量表赋值；然后a值入栈、2入栈，b在局部变量表赋值
        + 动态链接 —— 方法外的方法，变量值，常量值
        + 方法出口
    + 本地（native）方法栈 （调用C语言方法）
    + 程序计数器

---

+ 堆
  + 句柄池
    + 对象类型指针
    + 对象实例数据指针
  + 实例对象数据

> + <https://www.bilibili.com/video/BV1Ad4y1H7VA>

### 堆中对象结构

`Object o = new Object();`

通过 JOL 工具分析 Java 对象

```txt
Mark Word 8byte
Class Pointer 8byte/4byte —— xxx.class
实例数据
对齐 —— 磁盘8byte读更快
```

#### Mark Word

有：

1. 计数值
1. hash
1. 锁

### 垃圾回收流程

+ 堆 （`-Xms最小堆空间`、`-Xmx最大堆空间`）
  + 新生代 （1/3）
    + Eden （8/10） （`-Xmn新生代堆大小`）
    + From （1/10）
    + To （1/10）
    > 说明：
    > 1. mirrorGC —— Eden满了，将要的类移动到From/To区，计数加1
  + 老年代 （2/3）
    > 说明：
    > 1. 新生代From/To中对象计数15后放入老年代 （15值可调节 `-XX:MaxTenuringThreshold`）
    > 1. 老年代满了，触发FullGC

### 垃圾回收算法

#### 标记-清除算法

1. 标记可达对象
    + 存活
      + 可达性 —— 从gcRoot开始找，可达
      + 计数器 —— 可能有循环引用问题
1. 清理

缺点

1. 效率低
1. 碎片化
1. 大内存没法搞

![image.png](https://s2.loli.net/2023/12/06/1FXTQqgyVlSbCzx.png)

#### 复制算法

缺点

1. 存活对象多，效率低
1. 浪费（一半）内存

![image.png](https://s2.loli.net/2023/12/06/694GbOlXaDrZ75P.png)

#### 标记整理算法

缺点

1. 效率问题 —— 因为要频繁修改引用

#### 分代搜集算法

对于年轻代，整理频繁，使用复制算法

对于老年代，整理频率小，使用标记清除算法或标记整理算法均可

### 垃圾回收器

发展图

![image.png](https://s2.loli.net/2023/12/06/D2FVPmSQ3k86TwJ.png)

#### Serial

新生代算法 Serial，复制算法，单线程 —— stop the world

老年代算法 Serial old，

#### Parallel

同Serial，只是单线程变成了多线程。

#### cms

初始标记，标记GCroot

并发标记、重新标记（stw）

并发清除

#### G1

将堆分成多个region块

![image.png](https://s2.loli.net/2023/12/06/yqAPnYKxZofdjVB.png)

主要四个类型的region

+ old —— 老年代
+ eden —— 新生代
+ survivor —— 存活
+ humongous —— 大对象

```txt
整体： 标记整理算法
局部： 复制算法
关注停顿时间，实现高的吞吐量
young GC、old GC
吞吐量降低
```

### 四种引用

#### 强引用

```java
Object o = new Object();
```

GC 不回收，就算 oom

#### 软引用

看空间足够，不回收

空间不足，回收

应用：

1. 缓存，图片编辑器

```java
// heap -Xms10m -Xmx10m
static class Obj {
  byte[] bs = new byte[1024 * 1024]; // 1M
}
public static void main() {
  ReferenceQueue<Obj> queue = new ReferenceQueue<>();
  SoftReference<Obj> softReference = new SoftReference<>(new Obj(), queue);

  List<Obj> list = new ArrayList<>();
  while(true) {
    if(softReference.get() != null) {
      list.add(new Obj());
      System.out.println("list.add");
      System.out.println("长度："+queue.poll());
    } else {
      System.out.println("-------- 软引用被回收 -------");
      break;
    }
    System.gc();
  }

  Reference<? extends Obj> poll = queue.poll();
  while(poll != null) {
    System.out.println(poll);
    System.out.println(poll.get());
    poll = queue.poll();
  }
}
```

#### 弱引用

gc看到，马上回收

应用：

1. WeakHashMap

```java
// heap -Xms10m -Xmx10m
static class Obj {
  byte[] bs = new byte[1024 * 1024]; // 1M
}
public static void main() {
  WeakReference<Obj> weakReference = new WeakReference<>(new Obj());
  System.out.println(weakReference.get());
  System.gc();
  System.out.println(weakReference.get());
}
```

#### 虚引用

相当于没有

```java
String str = new String("abc");
ReferenceQueue queue = new ReferenceQueue();
PhantomReference pr = new PhantomReference(str, queue);
System.out.println(pr.get());
```

### Unsafe类 todo

通过 Unsafe类可以间接操作内存 —— 一般用于研究，不在生产使用！

```java

```

todo

## 调试工具

### jps

查看java进程状态

```bash
jps
jps -q
jps -l
jps -v
```

### jstat

查看堆内存的分布

```bash
jstat -gc 21572 250 4
jstat -gcutil 21572
jstat -gcnew 21572 # 看年轻代
```

![image.png](https://s2.loli.net/2023/12/06/j1tPpqKVOaM4D3v.png)

### jstack

查看进程、线程的堆栈信息

```bash
jstack 
```

### jmap

查看堆类

```bash
jmap -heap 21572
jmap -dump:file=jvmtool 21572
```

### jconsole

JavaGui 监视和管理控制台

### jvisualvm

非常好的 Java 运行时可视化工具

### Arthas

todo

## 类加载器

+ bootstrap ClassLoader —— `%JAVA_HOME%/lib`
+ ExtClassLoader —— `%JAVA_HOME%/lib/ext`
+ AppClassLoader —— classpath

### 双亲委派

+ 向上委派
+ 向下查找

![022038kx878v78z8z8l77s.png](https://s2.loli.net/2023/12/15/lrUf8DKZYQ71R3C.png)

## 异常

Throwable

+ Exception —— 程序异常
+ Error —— 程序无法处理 e.g. oom

Exception

+ RuntimeException
+ CheckException —— 编译不通过

## 线程

### 生命周期

+ 新建 `new Thread`
+ 可运行 runable
+ 运行状态 running
+ 阻塞状态 （不释放锁）
+ 等待队列状态（释放锁）
+ 死亡 dead

![image.png](https://s2.loli.net/2023/12/06/NB5wRJ6u83VHMrL.png)

### 线程实现方式

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

### 线程池原理

`ThreadPoolExecutor`

new时参数： 核心线程数，最大线程数，阻塞队列，拒绝策略，非核心线程的最大存活时间，时间单位

todo https://www.bilibili.com/video/BV1Ad4y1H7VA?p=27

### ThreadLocal

每个线程有 ThreadLocalMap 对象存 ThreadLocal。

#### ThreadLocal内存泄漏问题

如果在线程池中使用ThreadLocal会内存泄漏

因为线程池不会回收线程对象

解决： 手动调用ThreadLocal的remove方法

### Executors创建线程缺点

因为Executors中使用`new LinkedBlockingQueue<Runnable>()`作为阻塞队列，但这个队列上限非常大！通常资源满了，队列可能都未满。

```txt
newSingleThreadExecutor —— 单个工作线程来执行任务，如果这个线程异常结束，就会有一个新的来替代它
newFixedThreadPool —— 固定长度的线程池
newCachedThreadPool —— 一个可缓存的线程池，线程池的规模超过了处理需求，将自动回收空闲线程
newScheduledThreadPool —— 创建一个固定长度的线程池，而且以延迟或定时的方式来执行任务
```

### synchronized使用

问题 count

```java
public class SynTest implements Runnable {
  private static int count = 0;
  public static voic main() {
    for(int i=0; i<10; i++) {
      new Thread(new SynTest()).start();
    }
    try {
      Thread.sleep(100);
    } catch(InterruptedExecption e) {
      e.printStackTrace();
    }
    System.out.println(count);
  }
  @Override
  public void run() {
    for(int i=0; i<10000; i++) {
      synchronized(SynTest.class) {
        count++;
      }
    }
  }
}
```

### Synchronized升级

jdk1.6之前，synchronized通过重量级锁的方式实现线程之间的锁竞争。

之所以叫重量级锁，因为底层使用操作系统层面的 Mutex lock 来实现互斥锁的功能。 mutex 是系统方法，由于权限隔离的关系应用程序调用系统方法时候需要切换到内核状态来执行。这样就涉及到用户态到内核态的切换。这个切换会带来性能上的损耗。

jdk1.6之后，synchronized增加了锁升级的机制。平衡数据安全和性能的关系。

偏向锁、轻量级锁（自旋锁）

1. synchronized优先尝试偏向锁（把当前锁偏向某个线程：通过CAS机制来修改偏向锁的标记，适合在同一个线程多次申请统一锁资源的情况，并且没有其他线程竞争的场景）
1. 如果偏向锁竞争失败，说明已有其他线程占用锁。需要升级到轻量级锁。轻量级锁也叫自旋锁（通过多次自旋去重试竞争锁，优点是避免了用户态到内核态的的切换）
1. 如果轻量级锁仍然无法占用锁，只能升级到重量级锁。在重量级锁的情况下，没有竞争到锁的线程会被阻塞，线程状态为blocked（锁等待）的状态，这个状态需要等待占用锁的线程释放锁后触发唤醒

![image.png](https://s2.loli.net/2023/12/07/D2gnOx4QWuFcKzE.png)

### Lock锁

```java
Lock lock = new ReentrantLock();

lock.lock();
try {
  // ...
} finally {
  lock.unlock();
}
```

#### 不公平锁和公平锁

构造时默认用不公平锁

不公平锁： cpu时间给到谁，谁开搞！ （默认）

```java
Lock lock = new ReentrantLock(); // 不公平
```

公平锁： 排队执行

```java
Lock lock = new ReentrantLock(true);
```

### Synchronized和lock区别

相同

1. 独占锁
1. 可重入锁

不同

1. Synchronized 是关键字，lock 是接口 ReentrantLock 实现读写锁
2. Synchronized 自动释放，lock 手动释放 死锁
3. Synchronized 多线程访问会一直等待， lock 可以处理其他业务

    ```java
    Lock lock = new ReentrantLock(true);
    if(lock.tryLock) {
      try {
        // ...
      } finally {
        // 释放锁
      }
    } else {
      // ... 
    }
    ```

4. Synchronized 不可以中断，不公平锁 lock可以设置 `lock.lockInterruptibl()`
5. Synchronized 尽量放少量代码， lock 可以放大量代码中

### CAS机制

Compare And Swap

CAS 无锁同步机制

```java
AtomicInteger atomicInteger = new AtomicInteger();
atomicInteger
atomicInteger
```

```txt
compareAndSwapInt

V 需要更新的变量 主内存中
E 预期值 工作内存中
N 新值

先读V值，再读一遍，如果相等V=E，则N更新，否则不操作（更新失败）
```

缺点：

1. 开销大（循环），
    + 处理： 轻量级锁升级为重量级锁，
1. ABA问题
    + 处理： 乐观锁 —— 加版本号

### AQS组件

AQS （Abstract Queued Synchronizer，多线程同步器） 是并发编程中比较核心的一个组件，是JUC包中多个组件的底层实现，如Lock、CountDownLatch、Semaphore。

AQS提供了两种锁：排他锁和共享锁

+ 排他锁 —— 多个线程竞争同一个共享资源，同一时刻只允许一个线程访问共享资源。如Lock中的ReentrantLock重入锁
+ 共享锁 —— 读锁，如CountDownLatch、Semaphore

互斥锁考虑：

1. 互斥变量的设计
    + aqs采用int类型变量state记录锁竞争的状态 0=没人竞争 大于等于1表示有线程持有锁资源。
1. 多线程同时更新时，线程安全性
    + 多线程同时抢锁时用了cas机制保证更新的原子性。未得到锁的用unsafe中的park方法阻塞。阻塞的线程按先进先出原则加入到双向链表中，当资源释放锁后会唤醒链表头部下一个等待的线程。
1. 锁等待和唤醒
1. 锁竞争的公平性和非公平性

<https://www.bilibili.com/video/BV1Rm4y1R7Px/>

## Web

### CSRF

todo

### CORS

跨域，除非服务器开启了跨域

```txt
Access-Control-Allow-Origin: *
Origin: https://bilibili.com
```

简单请求/非简单请求

+ 简单请求 —— 浏览器直接发起请求
+ 非简单请求 —— 浏览器发送option请求询问服务器允许的域，允许才发请求

  > 通过非简单请求的预检机制可以降低服务器的负载，对于需要占用服务器较多资源的请求最好设计为非简单请求。最常见的如DELETE、PUT常见操作。

#### 解决跨域

方案一： 反向代理

方案二： 修改服务器配置

```js
const express = require('express');
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com'); // 允许特定域名
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.listen(3000);
```

方案三： jsoup —— 只能get

## 认证

### cookie

### jwt

传递非敏感信息

+ jws java web signature 只对内容做签名
+ jwe java web encryption 对内容本身加密

### api key

非对称加密

+ accesskey 公钥
+ secretkey 私钥

## 定时任务

### 原理

小顶堆 下沉、上浮

### Quartz

### 一个定时任务，执行周期很长，如何启停

生产环境中，经常有长周期任务，如数据分析、日志处理等。

~~并发控制、任务调度、资源管理~~

方案一： 全局标记 \
全局标记记录在环境变量或者分布式配置中心并设置为启动状态的初始值，然后在定时任务执行体中读取到这个标志，根据这个标记的执行状态来决定是否要停止。如果标记为“停止”则不启动新任务

todo <https://www.bilibili.com/video/BV1xz4y1g74P/>

## Java好习惯

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

## Spring

### spring中的设计模式

+ BeanFactory ApplicationContext 工厂模式
+ Bean创建的时候， 单例模式、原型模式
+ Aop 使用 代理模式、装饰器模式、适配器模式
+ 时间监听器使用 观察者模式
+ jdbcTemplate 模板对象使用模板模式

### ioc di aop

ioc 控制反转

di 依赖注入

aop 面向切面编程

+ Before
+ After
+ Around
+ AfterReturning
+ AfterThrowing

#### ioc加载过程

`new ApplicationContext()` spring 上下文时开始 ioc 加载 —— bean 的创建过程

Bean初始化过程的几种形态

+ 概念态

  `@Bean`/`<bean/>`/`@Lazy`

+ 定义态

  `BeanDefinition` 封装 Bean 的生产指标

+ 纯净态

  二级缓存，早期暴露 Bean，循环依赖才体现纯净态的作用

+ 成熟态

  `singletonOjects` 最终在应用中使用的 Bean

##### IOC机制

1. 接口依赖、具体实现类解耦
1. 工厂设计模式 BeanFactory
1. 反射机制
1. BeanDefinition 配置 Bean 细节 （柔性工厂）

##### 具体IOC容器的加载过程

+ 概念态 -- 定义态
    1. **实例化一个ApplicationContext的对象**；
    1. 调用bean工厂后置处理器完成扫描；
    1. 循环解析扫描出来的类； —— 查看类上有没有`@component`注解，由的化会实例化为BeanDefinition
    1. **实例化一个BeanDefinition对象来存储解析出来的信息**
    1. 把实例化好的beanDefinition对象put到beanDefinitionMap中缓存起来，以便后面实例化bean；
    1. 再次调用其他bean工厂后置处理器
+ 定义态 -- 纯净态
    1. 当然spring还会干很多事，比如国际化，比如注册BeanPostProcessor等等，如果我们只关系如何实例化一个bean的话，那么这一步就是spring调用finishBeanFactoryInitialization方法来实例化单例的bean，实例化之前spring要做验证，需要遍历所有扫描出来的类，依次判断这个bean是否Lazy，是否prototype，是否abstract等等
    1. 如果验证完成spring在实例化一个bean之前需要推断构造方法，因为spring实例化对象是通过构造方法反射，故而需要知道用哪个构造方法；
    1. **推断完构造方法后spring调用构造方法反射实例化一个对象**；注意我这里说的是对象、对象、对象；这个时候对象已经实例化出来了，但是并不是一个完整的bean，最简单的体现是这个时候实例化出来的对象属性是没有注入，所以不是一个完整的bean；
+ 纯净态 -- 成熟态
    1. spring处理合并后的beanDefinition
    1. 判断是否需要完成属性注入
    1. **如果需要完成属性注入，则开始注入属性** —— DI循环依赖问题
+ 初始化
    1. **判断bean的类型回调Aware接口**
    1. 调用生命周期回调方法
    1. 如果需要代理完成代理
    1. put到单例池 —— bean完成 —— 存在spring容器当中

##### IOC过程中的扩展点

::: tip
记：

1. 注册BeanDefinition时 —— 实现后置处理器接口，注册`@Component`
1. 实例化bean时 —— Bean实现后置处理器接口
1. 初始化时 —— Bean实现Aware接口
1. 初始化时 —— Bean实现接口或者添加方法注解或者注册时指定，生命周期方法
1. 销毁时 —— Bean实现接口或者添加方法注解或者注册时指定，生命周期方法

:::

1. 注册BeanDefinition时，触发invokeBeanFactoryPostProcessors方法
    + 接口 BeanDefinitionRegistryPostProcessor
    + 接口 BeanFactoryPostProcessor

1. 加载`BeanPostProcessor`实现类：在Bean的生命周期中会调用9次Bean的后置处理器

    ![image.png](https://s2.loli.net/2023/12/12/1iKxv2IReyNzkfE.png)

1. 初始化阶段

    1. 初始化阶段调用`XXXAware`接口的`SetXXXAware`方法

        ![image.png](https://s2.loli.net/2023/12/12/XtCdBU6wkqjO5WZ.png)
        ![image.png](https://s2.loli.net/2023/12/12/ZAPcFzNiesSQtDn.png)
        ![image.png](https://s2.loli.net/2023/12/12/EuMn3ZBTRlcvema.png)

    1. 生命周期回调：初始化
        1. 执行`BeanPostProcessor`实现类的`postProcessBeforeInitialization`方法
        1. 执行`@PostConstruct`注解修饰方法
        1. 执行`InitializingBean`实现类的`afterPropertiesSet`方法
        1. 执行`@Bean`的`init-method`属性指定的初始化方法
        1. 执行`BeanPostProcessor`实现类的`postProcessAfterInitialization`方法

        ![image.png](https://s2.loli.net/2023/12/12/gTqRIZO1SEXM9fC.png)

1. 生命周期回调：销毁阶段

    1. 执行`@PreDestroy`修饰的方法
    1. 执行`DisposableBean`实现类的`destroy`方法
    1. 执行`@Bean`的`destroy-method`属性指定的销毁方法

    ![image.png](https://s2.loli.net/2023/12/12/zqnwSZxDUGOI86u.png)

### SpringBean的生命周期

1. 实例化Bean的对象

    + applicationcontext —— 启动时调用，启动完成bean放入容器
    + beanfactory —— 使用时调用，直接获取bean引用

1. 设置对象的属性
1. 检测Aware相关的接口设置相关的依赖
    + BeanNameFactoryAware
    + BeanFactoryAware
    + ApplicationContextAware

todo

### 循环依赖

<https://www.bilibili.com/video/BV1ET4y1N7Sp/>

两个或多个bean相互持有对方引用会发生循环依赖，循环依赖会导致注入死循环

依赖形式

1. A依赖B、B依赖A
1. A依赖B、B依赖C、C依赖A
1. A依赖A

三级缓存： 设置三级缓存的核心思想时把bean的实例化和bean的依赖注入进行分离

1. getBean优先找一级缓存
1. 如果没有就找二级缓存
1. 如果一级、二级没有，意味bean未实例化，spring会去实例化这个bean
    1. 反射创建一个未装配好的“早期bean”放入二级缓存
    1. 同时加入标记，标记是否有循环依赖
        1. 如果有标记则在下一次轮询时做依赖注入，注入完成后移到一级缓存

::: tip

+ 一级缓存 singletonObjects —— 完全初始化好的bean：已完成依赖注入
+ 二级缓存 earlySingletonObjects —— 原始的bean：等待依赖注入或者等待属性被赋值
+ 三级缓存 singletonFactories —— Bean工厂对象：用来生成原始Bean对象放入二级缓存中 （主要解决AOP代理对象的循环依赖问题）

:::

不能解决循环依赖的bean：

1. 多实例bean通过setter注入时候无法解决循环依赖
1. 构造器注入bean的情况不能解决循环依赖
1. 单例的代理bean通过setter注入的情况无法解决循环依赖问题
1. 设置`@DependsOn`注解的Bean不能解决循环依赖问题

### 事务

#### 事务三个组件

+ PlatformTransactionManager
  + 事务开启
  + 事务提交
  + 事务回滚
+ TransactionDefinition —— 事务定义
  + 事务传播
  + 事务隔离
  + 事务超时
  + 事务只读
  + 事务回滚规则
+ TransactionStatus —— 事务状态/事务“本身”
  + savepoint
  + flash

#### 事务隔离性

参考mysql事务隔离

#### 事务传播性

+ require —— 【默认】没有事务开，有事务加入
+ require-new —— 一律开启事务，两个事务结果相互不影响
+ nested —— 子事务，外事务回滚影响内事务，内事务回滚不影响外事务
+ mandatory —— 当前有事务加入事务，没事务抛异常
+ supports —— 当前有事务加入事务，没事务也不开事务
+ not-supported —— 以非事务方式运行，如果当前有事务也忽略（挂起）
+ never —— 非事务方式运行，如果当前有事务则抛异常

#### 回滚规则

默认回滚运行时异常 runtimeexecption，不回滚检查异常 ioexception

可配置！ rollbackfor / norollbackfor

#### 只读事务

性能

#### 事务超时时间

默认数据库的超时时间

#### 例子

<https://www.bilibili.com/video/BV1Eq4y1R7Ds>

依赖spring-jdbc

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>5.3.10</version>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
  <version>5.3.10</version>
</dependency>
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.26</version>
</dependency>
```

##### 编程式事务

```xml
<context:component-scan base-package="org.example.demo"/>

<bean class="org.springframework.jdbc.datasource.DriverManagerDataSource" id="dataSource">
  <property name="password" value="123"/>
  <property name="username" value="root"/>
  <property name="url" value="jdbc:mysql:///xxx?serverTimezone=Asia/Shanghai"/>
  <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
</bean>

<!-- 事务管理器 -->
<bean class="org.springframework.jdbc.datasource.DataSourceTransactionManager" id="transactionManager">
  <property name="dataSource" ref="dataSource"/>
</bean>
<bean class="org.springframework.transaction.support.TransactionTemplate" id="transactionTemplate">
  <property name="transactionManager" ref="transactionManager"/>
</bean>
<bean class="org.springframework.jdbc.core.JdbcTemplate" id="jdbcTemplate">
  <property name="dataSource" ref="dataSource"/>
</bean>
```

编程式事务

```java
@Component
public class UserService {
  @Autowired
  JdbcTemplate jdbcTemplate;

  // 方式一
  @Autowired
  PlatformTransactionManager transactionManager;
  public void transfer() {
    DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
    // ... 事务定义
    TransactionStatus status = transactionManager.getTransaction(definition);
    try {
      jdbcTemplate.update("update user set money = ? where username = ?", 9, "zhangshang");
      transactionManager.commit(status);
    } catch (DataAccessException e) {
      e.printStackTrace();
      transactionManager.rollback(status);
    }
  }

  // 方式二
  @Autowired
  TransactionTemplate transactionTemplate;
  public void transfer2() {
    transactionTemplate.execute(new TransactionCallbackWithoutResult*() {
      @Override
      protected void doInTransactionWithoutResult(TransactionStatus status) {
        try {
          jdbcTemplate.update("update user set money = ? where username = ?", 9, "zhangshang");
        } catch (DataAccessException e) {
          e.printStackTrace();
          status.setRollbackOnly();
        }
      }
    })
  }
}
```

##### 声明式事务

```xml
<!--续上-->
<!-- 解析切点表达式 -->
<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjweaver</artifactId>
  <version>1.9.7</version>
</dependency>
<!-- 提供注解 -->
<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjrt</artifactId>
  <version>1.9.7</version>
</dependency>
```

```xml
<!--续上-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
  <tx:attributes>
    <tx:method name="add*"/>
    <tx:method name="insert*"/>
    <tx:method name="delete*"/>
    <tx:method name="update*"/>
    <tx:method name="transfer*"/>
  </tx:attributes>
</tx:advice>
<aop:config>
  <aop:pointcut id="pc1" expression="execution(* org.javaboy.demo.UserService.*(..))" />
  <aop:advisor advice-ref="txAdvice" pointcut-ref="pc1"/>
</aop:config>
```

```java
  // 方式三
  public void transfer3() {
    jdbcTemplate.update("update user set money = ? where username = ?", 9, "zhangshang");
  }
```

##### 配置类方式配置

```xml
<!-- 开启事务的注解支持 or @EnableTransactionManagement -->
<tx:annotation-driven>
```

```java
@Configuration
@componentScan(basePackages = "org.example.demo")
@EnableTransactionManagement
public class JavaConfig {
  @Bean
  DataSource dataSource() {
    DriverManagerDataSource ds = new DriverManagerDataSource();
    ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
    ds.setUsername("root")
    ds.setPassword("123")
    ds.setUrl("jdbc:mysql:///xxx?serverTimezone=Asia/Shanghai")
    return ds;
  }
  @Bean
  JdbcTemplate jdbcTemplate() {
    return new JdbcTemplate(dataSource());
  }
  @Bean
  PlatformTransactionManager transactionManager() {
    return new DataSourceTransactionManager(dataSource());
  }
}
```

事务方法上加 `@Transactional`

## SpringMVC

![image.png](https://s2.loli.net/2023/12/09/u5slz1iNmOUZao4.png)

九大组件

1. HandlerMapping —— 根据request找到相应的处理器。
1. HandlerAdapter —— 调用Handler的适配器。
1. HandlerExceptionResolver —— 处理异常
1. ViewResolver —— 将String类型的视图名和Locale解析为View类型的视图
1. RequestToViewNameTranslator —— 适配Handler的返回值。
1. LocaleResolver —— 从request中解析出Locale。Locale表示一个区域，如zh-cn，做i18n
1. ThemeResolver —— 主题解析
1. MultipartResolver —— 处理上传请求，将普通的request封装成MultipartHttpServletRequest
1. FlashMapManager —— 用于管理FlashMap，FlashMap用于在redirect重定向中传递参数

### 过滤器，拦截器

todo

## MyBatis

```xml
<mapper namespace="org.example.dao.UserDAO">
  <!-- demo -->
  <select id="login" parameterType="User" resultType="User">
    select * from user where name = #{name} and password = #{password}
  </select>
</mapper>
```

### 和jdbc的区别

+ 关注点不同
  + jdbc 关注如何和数据库厂商做适配
  + mybatis 关注如何封装事务、sql解析、接口代理反射注入、分页逻辑，从而让crud程序员更好的调用

### MyBatis的分页实现

+ mapper中写分页关键字
+ 使用Mybatis的RowBounds对象，把全部数据查出后，在内存分页 —— 不适合大数据量（虽然jdbc也会优化，不会一次查询太大数据量）
+ 使用Mybatis的Interceptor拦截器，在select语句执行前动态拼接分页关键字

### MyBatis的`#{}`和`${}`占位符区别

都是传入动态参数的手段，但是`#{}`更加安全。

因为`#{}`会对参数预处理，特别是校验参数类型；而`${}`只会对传入字符串进行简单的拼接，有SQL注入的风险！

一般`${}`的应用场景是传入程序员设定的值，如表面、字段名，就是说千万不能传入前端传过来的值！

## 数据库MySQL

推荐： <https://space.bilibili.com/37659343/channel/collectiondetail?sid=855091>

### MySQL各种存储引擎对比

功能 | MyISAM | MEMORY | InnoDB
--- | --- | --- | ---
存储限制 | 256TB | RAM | 64TB
支持事务 | No | No | YES
支持全文索引 | Yes | No | No
支持B树索引 | Yes | Yes | Yes
支持hash索引 | No | Yes | No
支持集群索引 | No | Yes | No
支持数据索引 | No | Yes | Yes
支持数据压缩 | Yes | No | No
空间使用率 | 低 | N/A | 高
支持外键 | No | No | Yes

### MySQL表设计时间是用datetime还是timestamp

回答： 看实际需求 （实际：盲选timestamp）

区别：

数据类型 | 大小 | 时区 | 范围
--- | --- | --- | ---
timestamp | 4字节 | UTC时间 | 1000~9999年
datetime | 8字节 | 不记录时区 | 1970~2038年

实际选择主要考虑时区问题

+ 如果不想考虑时区 —— datetime
+ 否则 —— timestamp

### 事务四大特性 ACID

+ A atomicity 原子性 —— 子任务同时成功，同时失败
+ C consistency 一致性 —— 两边数据一致
+ I isolation 隔离性 —— 多个事务间数据隔离
+ D durability 持久性 —— 事务成功后的记录可持久保存

### 事务隔离级别

#### 读未提交

脏读

#### 读已提交 RC

【oracle】

不可重复读 —— 事务第一次读和第二次读的数据不一样（因为别的事务提交更新操作）

#### 可重复读 RR

【InnoDB默认隔离级别 —— mysql】

幻读 —— 事务发现第二次读的数据变多/数据更改没生效（因为别的事务提交插入操作）

> 使用行锁/表锁的方式实现的。

#### 串行化

读写都加锁

### MySQL事务原理

即MySQL如何实现ACID特性的？

+ A 原子性 —— 回滚 —— undo log
+ C 一致性 —— 外键。但是外键不好维护，主要在业务层面进行保障
+ I 隔离性 —— 四种隔离级别
+ D 持久性 —— 重做 —— redo log

### MVCC 原理

<https://www.bilibili.com/video/BV1864y1976i> \
<https://www.bilibili.com/video/BV1Ad4y1H7VA?p=51>

::: tip
使用mvcc机制可以实现读（快照读）写不加锁，提高并发效率
:::

“读已提交” 是使用 MVCC（Multi-Version Concurrency Control 多版本并发控制） 机制实现的，并且在不同事务隔离接别 “读已提交 RC” 和 “可重复读 RR” 之间还有细节不同。

MVCC 的实现依靠 三个隐藏字段 和 undolog 和 readview。

三个隐藏字段：

+ `DB_TRX_ID` —— 最后修改这条记录的事务编号
+ `DB_ROLL_PTR` —— 这个记录上一条历史版本
+ `DB_ROW_ID` —— 这条记录的编号

![image.png](https://s2.loli.net/2023/12/03/SXwr27xs8eMF3tZ.png)

readview字段：

+ `trx_list` —— 数值列表，维护READview生成时，系统正活跃的事务编号
+ `up_limit_id` —— 上面列表中最小事务编号
+ `low_limit_id` —— 维护readview生成时，系统尚未分配的下一个事务编号

readview逻辑：

1. ~~事务进行快照读前，记录readview数据~~ （RC、RR不同，不过先忽略）
1. 后续读，看readview
    + 事务编号小于readview，接受（已提交数据）
    + 事务编号登录readview，接受（事务中修改的数据）
    + 事务编号大于readview，忽略（其他事务数据）

在RC、RR不同隔离级别，有如下不同的readview生成时机：

+ RC —— 每次快照读都创建readview
+ RR —— 第一次快照读创建readview

### Update 行锁还是表锁

都有：

+ 行锁 —— where条件包含了索引
+ 表锁 —— where条件不包含索引

### 共享锁/排他锁

共享锁/排他锁是行锁的两个锁类型：

+ 共享锁： 其他事务可以再为其加共享锁，但是无法加排他锁
+ 排他锁： 其他事务无法在该行加任何锁（共享/排他）

```sql
select * from t where id = 1 lock in share mode; /* 共享锁 */
select * from t where id = 1 for update; /* 排他锁 */
```

### limit 500000, 10 优化

因为要跳过50w行数据再进行输出，性能肯定差。

优化1： SQL层面 —— 先用索引子查询结果作为过滤条件

```sql
select * 
from user
where id >= (select id
             from user
             order by id
             limit 1 offset 499999)
order by id
limit 10;
```

优化2： 业务层面 —— 冷热数据分离

### 索引失效

字符1、关键字2、运算3、联合索引1

+ 字段类型必须用引号`'...'`扩起来，否则可能隐式转换导致索引失效
+ `or`
+ `<,>,!=,not in,is null,is not null`
+ 运算`+,-,*,/`
+ 内置函数
+ `like '%x%'` 导致索引失效 （但`like 'x%'`不会）
+ 联合索引中，查询条件没有联合索引中的第一列

### 为什么是B+树？

首先 B树是多路平衡树，高度相对矮，降低磁盘IO次数

然后 B+树是增强的B树，优化如下：

1. 所有数据在叶子节点，非叶子节点存储索引
    + 非叶子节点只存索引，所以同样高度存储更多数据，磁盘IO次数更少
1. 叶子节点数据使用双向链表
    + 更好的范围查询（只需查两个节点，然后遍历中间数据即可。反观B树要遍历所有节点）
    + IO次数更稳定（所有数据都在叶子上）
    + 叶子节点存储所有数据

### 索引优缺点

MySQL B+树实现

优点：

+ 减少IO次数，提升数据查询性能
+ B+树索引在进行范围查找的时候，只需要找到起始节点，然后基于叶子节点的链表顺序查找即可，查询效率高
+ 通过唯一索引约束，可以确保数据表中数据唯一

缺点： 不合理使用照成

+ 数据量大时，索引的维护成本也大 —— 索引不能太多
+ 如果字段值重复过多，创建索引反而导致性能下降

### 聚簇和非聚簇索引

<https://www.bilibili.com/video/BV17D4y1e78A/>

聚簇索引（也称一级索引） 就是指 B+树上非叶子节点上的索引，一个表有且只有一个（一组），一般存行的主键

![image.png](https://s2.loli.net/2023/12/04/ngeIhzKEQFiTjCc.png)

非聚簇索引（也称二级索引、辅助索引） 就是聚簇索引外的（一般就是指主键索引外的）索引

![image.png](https://s2.loli.net/2023/12/04/sMB3O4fb9rnRa7m.png)

### 索引下推？索引覆盖？回表？

+ 回表 —— 查询触发非聚簇索引，获得主键，回聚簇索引中找行数据的过程就叫回表

+ 索引覆盖 —— 如果查询的数据在非聚簇索引中就有存，就不需要回表。如：`select name from user where name='王五'` 其中name添加了索引

+ 索引下推（ICP，Index Condition Pushdown） —— 是mysql5.6推出的查询优化方案，目的是减少数据库查询中不必要的数据读取和计算，原理是将查询条件尽可能的推送到索引层进行过滤减少磁盘读取的数据量。

  ```sql
  select name from tuser where name like '张%' and age=18;
  联合索引 (name,age)
  主键索引 id

  索引下推前： 联合索引只存第一个健，即name。索引时先二级索引找name匹配，然后回表找数据，然后匹配age —— 多少条数据回表多少次
  索引下推后： 联合索引存储全部键，即name和age。索引时在二级索引就能匹配name、age
  ```

### Redis和MySQL如何保证数据一致性

Redis做缓存功能，减少MySQL的IO次数和提升数据的响应速度。

一般应用先从redis读数据，缓存没命中才查数据库，然后查询结果存redis。

这里可能因为数据库数据更改，导致redis、mysql数据不一致。因为两边的数据有先后，且不由事务管理，所以不管谁先谁后，都可能导致数据 “短期” 不一致。

所以，这里只有 “最终一致” 的方案（即应用场景允许短期的不一致，但是最终结果一致）。如基于RocketMQ的可靠性消息通信，通过异步重试保证Redis数据最终更新成功。

![image.png](https://s2.loli.net/2023/12/04/7P8fl1VbTJtc3ej.png)

### 分库分表

目的： 减少数据库负担，提高查询速度

#### 垂直切分/水平切分

垂直切分

优点

+ 解耦
+ 缓解cpu的瓶颈

缺点

+ 需要聚合数据，开发复杂度提高
+ 分布式id，事务处理变得复制
+ 依然存在单表数据大的问题

水平拆分

优点

+ 单表数据量减少
+ 应用的改造小

缺点

+ 扩展表字段的时候很麻烦
+ 跨库的关联查询性能差

### 常见分库分表中间件

proxy： mycat；atals；sharding-proxy；mysql-proxy

非proxy，jdbc直连： sharding-jdbc；tddl

#### 例子

e.g. 订单表每天新增500万数据，分库分表如何设计？

？？？

### MySQL主从架构

3个线程 + 2个日志

1. sql操作，更新data
1. binlog记录sql
1. 主中的log dump thread线程通知从中的io thread线程
1. relaylog（中继日志）记录，执行sql

一主一从： （最常用，从数据库用于容灾——高可用） \
![image.png](https://s2.loli.net/2023/12/07/ZsiuXQFyrv7gj4L.png)

一主多从：

双主：

级联同步：

环形同步： todo

## 数据库Redis

单线程，基于内存运行

应用： 缓存、计数器、Web集群session的共享（分布式登录）、点赞/收藏

### 数据类型

string、list、set（集合）、hash（对象）、sorted set（zset 有序集合）

### Redis缓存管理机制

#### 内存淘汰策略

大体三种方法：

1. FIFO
1. LFU
1. LRU

具体有以下方法： （不淘汰1种，全部淘汰3种，过期淘汰4种）

1. allkeys-lru —— 最近最少
1. volatile-lru —— 从设置了过期时间的键集合中删除最近最少
1. allkeys-random —— 随机删除
1. ...

#### 键的删除策略

+ 定时删除 —— 定时器，键时间过了，定时器马上删除这个键
  + 优点： 对内存友好
  + 缺点： 对cpu不友好，过期键多时定时器多
+ 惰性删除 —— 过期放任不管，下次查询发现过期再删除
  + 优点： 对cpu友好
  + 缺点： 对内存不友好
+ 定期删除 —— 每隔一段时间，对数据库进行检查，删除过期的数据
  + 优点： 定时删除+惰性删除，对cpu、内存都比较友好
  + 缺点： 时间怎么定？

### 缓存灾难问题

+ 缓存击穿 —— 热点key失效的瞬间，大量请求突然直奔数据库
+ 缓存雪崩 —— 大量的缓存在同一时间失效
+ 缓存穿透 —— 大量非法请求，到redis没有数据，直奔mysql，到mysql没数据

#### 缓存击穿 2

某个热点key过期的间隔中（新的key被添加之前），大量请求直奔数据库。

解决方法：

+ 热点数据不过期/后台定时任务刷新
+ 使用分布式锁/互斥锁，需要有锁才能查数据库，这样查数据库的请求数量可以控制非常小
  + zookeeper实现
  + redis实现

#### 缓存雪崩 3

出现雪崩情况：

1. 缓存服务器挂了
1. 热点数据缓存集体失效
1. 高峰期缓存局部失效

解决：

1. 加锁排队
1. 设置分散过期时间
1. 高可用，redis集群 （下面介绍）

#### 缓存穿透 4

黑客使用 -1 这种 orderid 发送请求，导致每次请求都要查询数据库。

解决：

1. 对参数合法性进行校验 —— 无法完全杜绝
1. 缓存空对象【记得加过期时间】：每次查mysql的结果都记录到redis中 —— 但可能用不同的参数
1. 使用布隆过滤器 （后面介绍）
1. 把ip拉黑 —— 但可能换不同的ip

##### 布隆过滤器

BloomFilter

还有加强版：布谷鸟过滤器

采用一个很长的二进制数组，通过一系列的Hash函数来确定该数是否存在。

每次key经过多个hash计算，将计算结果下标上的值设置为1

读的时候也进行同样计算，如果下标值全为1认为该值存在。

问题：

1. 误判 —— 无法避免，只能扩展二进制数组长度

```xml
<dependency>
  <groupId>org.redisson</groupId>
  <artifactId>redisson-all</artifactId>
  <version>3.16.0</version>
</dependency>
```

```java
RBloomFilter<String> bloomFilter = redisson.getBloomFilter("bloom");
// 初始化：预计元素大小1000000L，误判率1%
bloomFilter.tryInit(1000000L, 0.01);
bloomFilter.add("1"); // 增加数据
bloomFilter.contains("1"); // true
bloomFilter.contains("8888"); // false
```

如果商品被删除了怎么办？

1. 定时异步重建布隆过滤器
1. 计数Bloom Filter

### Redis持久化

Redis 第一次开机，加载持久化文件。时间间隔后，内存里的数据写入到磁盘中，生成持久化文件RDB、AOF。

#### 持久化机制RDB

::: warning
分钟级别的备份。之所以分钟级别，因为每次备份遍历全部数据，生成【快照】，所以开销不小。
后面参考mysql的binlog，采用AOF记录写入/修改记录，降低备份开销，做到秒级备份。
:::

RDB： Redis进程执行fork操作创建子进程，RDB持久化过程由子进程负责，会先将数据写入到临时文件，待持久化结束后，再用这个临时文件替换上次持久化好的文件。整个过程中主进程不需要任何io操作，保证极高的性能。阻塞只发生在fork阶段，一般时间很短。

快照方案：（触发机制）

+ bgsave —— 子进程创建快照文件
+ save —— 主进程创建快照文件 —— 阻塞
+ 自己配置

![image.png](https://s2.loli.net/2023/12/07/N7LeY95yfaDqOHb.png)

命令 | save | bgsave
--- | --- | ---
IO类型 | 同步 | 异步
阻塞 | 是 | 是（阻塞发生在fork）
复杂度 | `O(n)` | `O(n)`
优点 | 不会消耗额外内存 | 不阻塞客户端命令
缺点 | 阻塞客户端命令 | 需要fork，消耗内存

问题：

1. 导致数据丢失 —— RDB间隔保存数据，间隔中的数据可能丢失

#### 持久化机制AOF

实时追加更改命令到AOF缓冲区，然后缓冲区再追加到AOF文件中

> 修改 `redis.cnf` 配置开启 `appendonly` 即可
>
> ```cnf
> appendonly yes
> ```

![image.png](https://s2.loli.net/2023/12/07/JwvFb3REPVsiQKX.png)

三种机制： `appendfsync no/always/everysec`

+ no —— 缓冲区满了，一次io
+ always —— 每次更新都io
+ everysec —— 每一秒 （最好）

##### AOF重写机制

aof重写机制： 解决aof文件满了的情况（节约内存）。具体方法就是去除冗余指令。

触发机制

+ 手动触发 `bgrewriteaof`
+ 自动触发
  + `auto-aof-rewrite-min-size` 一般配置64mb、但是生产一般设置在5~10G
  + `auto-aof-rewrite-min-percentage` 增长比例。比如100表示当前AOF是上次大小的两倍时，才重写

重写步骤

1. 创建当前AOF文件创建一个新的AOF文件
1. 读取当前redis数据，写入到AOF中
1. 新的AOF文件覆盖现有AOF文件

重写缓冲区

1. 为了避免重写过程中主进程内存数据和AOF数据不一致，增加了重写缓冲区，主进程变更要追加到AOF的重写缓冲区
1. 等AOF文件重写完成后，再把缓冲区的数据追加到新的AOF文件中

### 哨兵和高可用

#### 主从

master slave

#### 哨兵机制（sentinel）

1. client 直接跟哨兵交互

1. 哨兵监控master/slave状态
1. 如果master挂了，哨兵选举新的master

1. 分辨数据槽位 `key.hashcode % 16384`

#### 高可用

多个主从架构

#### 例子：redis集群

1台机子 6redis 3主3从 redis-5.0.5

![image.png](https://s2.loli.net/2023/12/08/KtBphb9JLy1xEN2.png)

1. 开启cluster模式
1. meet 1 2 3
cluster meet ip port
1. 指派槽位 3个集群 master节点才有槽位
1. 分配主节点、从节点

```bash
docker create --name redis-node1 --net host -v /data/redis-data/node1:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-1.conf --port 6379
docker create --name redis-node2 --net host -v /data/redis-data/node2:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-2.conf --port 6380
docker create --name redis-node3 --net host -v /data/redis-data/node3:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-3.conf --port 6381
docker create --name redis-node4 --net host -v /data/redis-data/node4:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-4.conf --port 6382
docker create --name redis-node5 --net host -v /data/redis-data/node5:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-5.conf --port 6383
docker create --name redis-node6 --net host -v /data/redis-data/node6:/data redis:5.0.5 --cluster-enabled yes --cluster-config-file nodes-node-6.conf --port 6384

docker start redis-node1 redis-node2 redis-node3 redis-node4 redis-node5 redis-node6
```

```bash
redis-cli --cluster help
```

```bash
# meet + 分配槽位
# --cluster-replicas 1 分配主从（前3主）
redis-cli --cluster create 115.159.199.197:6379 115.159.199.197:6380 115.159.199.197:6381 115.159.199.197:6382 115.159.199.197:6383 115.159.199.197:6384 --cluster-replicas 1
```

查看集群状态（随便进入一个redis）

```bash
cluster nodes
```

##### 扩容/添加节点

```bash
# 容器
docker ...
# 添加节点
redis-cli --cluster add-node 115.159.199.197:6385 115.159.199.197:6383
redis-cli --cluster add-node 115.159.199.197:6386 115.159.199.197:6383 --cluster-slave --cluster-master-id efxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4e1
# 槽位
# 数据、槽位都会移动 —— 扩容
redis-cli --cluster reshard 115.159.199.197:6385
```

##### 缩容/移除节点

```bash
# 槽位
redis-cli --cluster reshard 115.159.199.197:6385 --cluster-from efxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4e1 --cluster-to efxxxxxxxxxxxxxxxxxxxxxxxxxxxxx38 --cluster-slots 1000
# 减少节点
redis-cli --cluster del-node 115.159.199.197:6386 115.159.199.197:6385
```

## 消息队列RabbitMQ

+ 生产者： 生产消息
+ 消费者： 消费消息

### 为什么用消息队列？

1. 解耦 —— 中心系统不需要适配子系统
1. 异步 —— 对于不依赖全程的返回结果，可以直接返回消息接收，后续后台处理即可
1. 削峰 —— 在消息队列后可以增加限流措施，保证服务不会被流量击垮

### 消息队列选型

特性 | ActiveMQ | RabbitMQ （推荐）  | Kafka | RocketMQ
--- | --- | --- | --- | ---
PRODUCER-COMSUMER | 支持 | 支持| 支持| 支持
PUBLISH-SUBSCRIBE | 支持 | 支持| 支持| 支持
REQUEST-REPLY | 支持 | 支持| - | 支持
API完备 | 高 | 高 | 高 | 低（静态配置）
多语言支持 | 支持，Java优先 | 语言无关 | 支持，Java优先 | 支持
单机吞吐量 | 万级| 万级| 十万级 | | 单机万级
消息延迟 | - | 微秒级 | 毫秒级 | -
可用性 | 高（主从） | 高（主从）  | 非常高（分布式）  | 高
消息丢失 | - | 低 | 理论上不会丢失 | -
消息重复 | - | 可控制 | 理论上会有重复 | -
文档的完备性 | 高| 高| 高| 中
提供快速入门 | 有 | 有 | 有 | 无
首次部署难度 | - | 低 | 中 | 高

### RabbitMQ主从架构确保高可用

https://www.bilibili.com/video/BV1Ad4y1H7VA?p=92

架构1

问题：

1. 单点故障
1. 消息拉取开销

架构2

问题

1. 数据量全部在一台机器上

### Kafka分布式架构确保高可用

https://www.bilibili.com/video/BV1Ad4y1H7VA?p=93

### 生产者消费者模型 虚拟唤醒问题

只需要把下面的 if 判断改为 while 即可！

```java
class PCDate {

  public static AtomicInteger atomicInteger = new AtomicInteger();
  public volatile boolean flag = true;
  public static final int MAX_COUNT = 10;
  public static final List<Integer> pool = new ArrayList<>();

  // 判断 干活 通知
  public void produce() {
    while(flag) {
      try {
        Thread.sleep(100);
      } catch(InterruptedException e) {
        e.printStackTrace();
      }
      _produce();
    }
  }
  private void _produce() {
    synchronized(pool) {
      // 判断
      if(pool.size() == MAX_COUNT) {
        try {
          System.out.println("pool满了，waiting...");
          pool.wait();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
      // 干活
      pool.add(atomicInteger.incrementAndGet());
      System.out.println("produce number:"+atomicInteger.get()+", pool size:"+pool.size());
      // 通知
      pool.notifyAll();
    }
  }


  public void consume() {
    while(flag) {
      try {
        Thread.sleep(100);
      } catch(InterruptedException e) {
        e.printStackTrace();
      }
      _consume();
    }
  }
  private void _consume() {
    synchronized(pool) {
      // 判断
      if(pool.size() == 0) {
        try {
          System.out.println("pool空了，waiting...");
          pool.wait();
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
      // 干活
      int temp = pool.get(0);
      pool.remove(0);
      System.out.println("consume number:"+temp+", pool size:"+pool.size());

      // 通知
      pool.notifyAll();
    }
  }

}
```

```java
public class ProduceConsume {
  public static void main() {
    PCData pcData = new PCData();
    new Thread(() -> {
      pcData.produce();
    }).start();
    new Thread(() -> {
      pcData.consume();
    }).start();
    // 
    try {
      Thread.sleep(100);
    } catch(InterruptedException e) {
      e.printStackTrace();
    }
    //
    pcData.stop();
  }
}
```

### RabbitMQ架构设计

AMQP实现

+ Broker 提供传输服务，维护生产者到消费者的路线
+ Exchange 消息交换机
+ Queue
+ binding —— 绑定 把exchange和queue按路由规则绑定
+ Routing key —— 路由关键字。 exchange 根据这个关键字进行消息投递
+ vhost —— 虚拟主机
+ producer 生产者
+ consumer 消费者
+ channel 消息通道

### RabbitMQ的事务消息处理

生产者事务确认机制 —— 和数据库事务一样

消费者事务确认机制 —— 将rabbit的自动ack机制改为手动ack机制

```java
channel.basicConsume("test", false, consumer);

consumer:
  channel.basicAck(envelope.getDeliveryTag() /* 应答标识 */, false);
```

### RabbitMQ如何确保消息不丢失

消息丢失情况

1. 生产者发送消息到RabbitMQ Server过程中丢失消息
1. RabbitMQ Server收到消息后，在持久化之前宕机导致数据丢失
1. 消费端收到消息，还没来得及处理就宕机，导致RabbitMQ Server认为消息已处理，而实际没处理的情况

处理

1. 生产者发消息到MQ的情况 —— RabbitMQ提供Confirm的消息确认机制。就是如果Server端收到消息，会返回一个ack的消息，然后生产者可以根据返回解决决定是否重发消息
1. RabbitMQ中途宕机的情况 —— RabbitMQ开启消息持久化 —— 但为了确保万无一失，还是要结合生产者的confirm机制一起使用
1. 消费者端 —— 把消息的签收机制改为手动签收。也就说需要消费端手动调用消息确认方法，才标识这个消息被签收。但是这种方式可能照成消息的重复签收，因此需要考虑幂等性的设计。

### RabbitMQ如何确保消息不被重复消费

幂等性的设计

### RabbitMQ消息队列如何确保消息顺序性

e.g. 需要按顺序执行 创建订单、订单付款、订单完成

![image.png](https://s2.loli.net/2023/12/07/kuPp5AvfDrqyNRi.png)

1. 发送消息的顺序 —— 这个一般没问题

1. 确保MQ消息局部顺序性 —— 同一类消息被同一个队列处理

    ![image.png](https://s2.loli.net/2023/12/07/W1XDaBtsnJf85YP.png)

    ```java
    // 运算消息主键%n，根据结果指定路由key 发送到不同队列
    public void syncSend(int id, String msg) {
      Message15 message = new Message15(id, msg);
      rabbitTemplate.convertAndSend(Message15.EXCHANGE, this.getRoutingKey(id));
    }
    private String getRoutingKey(int id) {
      return String.valueOf(id % Message15.QUEUE_COUNT);
    }
    ```

1. 确保消费有序 —— RabbitMQ提供了“Exclusive Consumer”的特性，可以确保一个队列中的消息只发送给一个Consumer，但是开启这种特性限制性能不适合高并发常见。

    单活模式

    ```java
    private Queue createQueue(String name) {
      HashMap<String, Object> args = new HashMap<>();
      args.put("x-single-active-consumer", true);
      boolean durable = true;
      boolean exclusive = false;
      boolean autoDelete = false;
      return new Queue(name, 
        durable, exclusive, autoDelete, args)
    }
    ```

### 消息队列中消息堆积与过期处理方案

产生消息堆积的情况：

1. 消费者没有消费消息
1. MQ收不到消费者的ACK确认

消息堆积解决：

1. 检查消费者是否宕机
1. 如果有大量消息堆积，需要写应用程序，把单个MQ信息拷贝到多个MQ中，然后启动多个消费者消费信息

![image.png](https://s2.loli.net/2023/12/07/XqW2Vnh8O4pSJEv.png)

死信队列

1. 避免大量消息堆积，一般给消息加过期时间
1. 过期消息不能直接清除，而是加入死信队列
1. 死信队列中的消息通过程序存入mysql，然后还要重新将这些消息发给MQ重新消费

![image.png](https://s2.loli.net/2023/12/07/YgpDV1e7LhbJkEj.png)

## 分布式

### 分布式锁

synchronize 单机没法满足的情况。

注意点

1. 互斥
1. 过期时间
1. 重入
1. 定时器

#### 分布式锁例子

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;
protected static final String product = "book";
String lockid = UUID.randomUUID().toString(); // 线程安全问题，封装中使用threadlocal解决

@RequestMapping("/order")
public String order() {
  try {
    boolean lock = stringRedisTemplate.opsForValue().setIfAbsent(product, lockid, 30, TimeUnit.SECONDS);
    // stringRedisTemplate.expire(product, 30, TimeUnit.SECONDS);
    if(!lock) {
      return "fail";
    }
    int stock = Integer.parseInt(stringRedisTemplate.opsForValue().get("stock"));
    if(stock>0) {
      stock--;
      stringRedisTemplate.opsForValue().set("stock", stock+"");
      System.out.println("扣除成功，库存："+stock);
    } else {
      System.out.println("库存不足");
    }
  }finally {
    if(lockid.equals(stringRedisTemplate.opsForValue().get(product))) {
      stringRedisTemplate.elete(product);
    }
  }
}
```

封装

```java
public interface RedisLock {
  @Autowired
  private StringRedisTemplate stringRedisTemplate;
  private ThreadLocal<String> threadLocal = new ThreadLocal<>();

  @Override
  public boolean tryLock(String key, long timeout, TimeUnit unit) {
    boolean lock = false;
    if(threadLocal.get() == null) {
      String uuid = UUID.randomUUID().toString();
      threadLocal.set(uuid);
      lock = stringRedisTemplate.opsForValue().setIfAbsent(key, "value", timeout, unit);
    } else {
      lock = true;
    }
    return lock;
  }

  @Override
  public void releaseLock(String key) {
    if(threadLocal.get().equals(stringRedisTemplate.opsForValue().get(key))) {
      threadLocal.remove(); // 内存泄漏
      stringRedisTemplate.delete(key);
    }
  }
}
```

分布式锁框架 redisson

```java
@Autowired
private Redisson redisson; // 分布式锁框架

RLock rlock = redisson.getLock(product);
rLock.lock();
// ...业务
rLock.unlock();
```

### 分布式事务

数据一致性、回滚 Seata TCC 两阶段提交1：保留原始值，然后获取全局锁后提交；2：提交事务异常后，通过1阶段保留的原始值进行回滚

## 网络

### 三次握手

+ a SYN
+ b SYN+ACK
+ a ACK

### 四次挥手

+ a fan
+ b ack ... wait for b数据传输完成
+ b fan
+ a ack ... 2MSL wait for 等待b是否重发fan，

> why 2msl <https://www.bilibili.com/video/BV1by4y1C7p2/>

### TCP 如何保证可靠传输

+ 分组 —— 基于数据大小分组发送
+ 校验和 —— 确保传输过程没丢东西
+ 重传 —— 如果丢了/超时了就重传
+ 窗口 —— 速率控制

### 服务网格

微服务

todo

## 加密

+ AES
+ RSA 幂运算 非对称
+ ECC（Elliptic Curve Cryptography）椭圆曲线的非对称加密算法

国密 \
（参考： <https://mp.weixin.qq.com/s/phcGnGkcYPBvaxQZs33SKw>）

+ SM2、SM3、SM4、SM7、SM9

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

处理2 todo

```java

```
