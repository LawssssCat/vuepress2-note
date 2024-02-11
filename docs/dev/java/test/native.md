---
title: Java 调试体系
---

## JPDA 概述

JPDA（Java Platform Debugger Architecture） 是 Java 定义的一套标准调试框架。

+ JVM TI —— Java Virtual Machine Tool Interface 提供整套调试能力体系
  + 各类事件的钩子，比如类加载
  + Java 对象的控制
  + Java 线程和锁的控制
  + 基本调试行为，如断点
+ JDWP —— Java Debug Wire Protocol 定义了调试者和被调试者之间的通信协议
+ JDI —— Java Debug Interface 直接面向调试器开发人员的前端接口

![OIP.jpg](https://s2.loli.net/2024/01/28/LZWEJzXdsx6FAVR.jpg)

### JVM TI

JVM TI 是 JVM 提供的 native 编程接口，可以用于获取 JVM 内部状态、控制 Java 程序的执行。
一般采用建立一个 Agent 的方式来调用 JVM TI，同时以另一个独立进程作为控制放控制 Agent 行为。

![R.jpg](https://s2.loli.net/2024/01/28/shSYDzeN2vUHC4g.jpg)

### JVM TI Agent

JVM TI Agent 往往被编译成一个动态库，其加载方式有两种：

+ 在 JVM 启动时通过命令行选项指定 Agent 进行加载

  ```bash
  -agentlib:<libname>[=<options>]
                load native agent library <libname>, e.g. -agentlib:jdwp
                see also -agentlib:jdwp=help
  -agentpath:<pathname>[=<options>]
                load native agent library by full pathname
  -javaagent:<jarpath>[=<options>]
                load Java programming language agent, see java.lang.instrument
  ```

+ 在 JVM 运行时加载（attach机制）

  <mermaid>
  {{`
  sequenceDiagram
      participant A as 控制方
      participant B as Attach Listener
      participant C as JVMTI
      A->>B: 发起请求
      A->>B: 发送加载Agent命令
      B->>C: 加载Agent
      C->>C: Agent_OnAttach
      C->>B: 
      B->>A: 加载成功 
  `}}
  </mermaid>

由于 JVMTI Agent 需要用 C/C++ 开发，所有为了便于 Java 开发者调用，JVM 内置了一个名为 libinstrument.so 的特殊 JVM IT Agent。基于这套 Instrumentation 机制，开发者可以构建要给纯粹用 Java 编写的 Agent。

`Instrumentation` 提供的典型能力：

+ redefineClass 重新定义类
+ retransformClass 修改已加载的类

#### 编写一个启动时 JVM TI Agent

1. 类中写一个 premain 方法

    ```java
    package org.example;

    import java.lang.instrument.Instrumentation;

    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello world!");
        }

        public static void premain(String arg, Instrumentation instrumentation) {
            System.out.println("running Java Agent!");
            System.out.println(arg);
            System.out.println(instrumentation);
        }
    }
    ```

1. 打包，并在 MAINIFEST.MF 中加入 "`Premain-Class`" 属性 \
    （这里偷懒把等下要执行的main方法也写这里了，MAINIFEST.MF 也相应加上"`Main-Class`"）

    ```txt
    Manifest-Version: 1.0
    Premain-Class: org.example.Main
    Can-Redefine-Classes: true
    Can-Retransform-Classes: true
    Build-Jdk-Spec: 1.8
    Created-By: Maven JAR Plugin 3.3.0
    Main-Class: org.example.Main
    ```

    ::: tip

    如果用 maven 参考： [Java 基于 Instrument 的 Agent](https://www.cnblogs.com/jhxxb/p/11567337.html)

    ::: details

    ```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <configuration>
                    <archive>
                        <manifest>
                            <!-- 添加依赖包路径, 路径会写在MANIFEST文件的Class-Path下 -->
                            <addClasspath>true</addClasspath>
                            <!-- 添加依赖前缀 -->
                            <classpathPrefix>lib/</classpathPrefix>
                            <!-- 设置启动函数 -->
                            <mainClass>org.example.Main</mainClass>
                        </manifest>
                        <manifestEntries>
                            <!-- 自定义 MANIFEST.MC文件中其他属性 -->
                            <Premain-Class>org.example.Main</Premain-Class>
                            <Can-Redefine-Classes>true</Can-Redefine-Classes>
                            <Can-Retransform-Classes>true</Can-Retransform-Classes>
                        </manifestEntries>
                    </archive>
                </configuration>
            </plugin>
            <!--将依赖输出到 target/lib 目录下-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <!-- 依赖输出target/lib目录 -->
                        <configuration>
                            <outputDirectory>${project.build.directory}/lib</outputDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
    ```

    :::

    :::

1. 在 JVM 启动时通过命令加载 jar 包

    ```
    target
      ├─classes
      │  └─org
      │      └─example
      │          └─Main.class
      └─demo-jvmti-agent-1.0-SNAPSHOT
    ```

    ```bash
    $ cd .\target\classes\
    $ java -javaagent:../demo-jvmti-agent-1.0-SNAPSHOT.jar=abc org.example.Main
    running Java Agent!
    abc
    sun.instrument.InstrumentationImpl@763d9750
    Hello world!
    ```

### Java 动态追踪技术原理：字节码修改

Instrumentation 赋予 Java Agent 一项最重要的能力就是可以在运行时修改类的内容，配合字节码编辑器可以实现 Java 调试中一项非常牛逼的技术 —— Java 动态追踪技术。

通过这个技术，我们可以如下功能： 在 main 方法的开头添加扩展

前：

```java
public static void main(String[] args) {
    System.out.println("Hello world!");
}
```

后：

```java
public static void main(String[] args) {
    System.out.println("动态追踪： " + Thread.currentThread().getStackTrace()[1].getMethodName());
    System.out.println("Hello world!");
}
```

代码：

::: details

这里操作的字节码编辑器用到 ASM 项目，虽然 Java 内置了 ASM，但是实现上述功能，需要完整的 ASM 依赖。

```xml
<dependency>
    <groupId>org.ow2.asm</groupId>
    <artifactId>asm</artifactId>
    <version>9.5</version>
</dependency>
```

```java
package org.example;

import org.objectweb.asm.*;

import java.lang.instrument.ClassFileTransformer;
import java.lang.instrument.Instrumentation;
import java.lang.instrument.UnmodifiableClassException;
import java.security.ProtectionDomain;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }

    public static void premain(String arg, Instrumentation instrumentation) {
        System.out.println("running Java Agent!");
        System.out.println(arg);
        System.out.println(instrumentation);
        // Java 动态追踪技术
        // retransform 修改已加载的类
        instrumentation.addTransformer(new Transformer(), true);
        try {
            instrumentation.retransformClasses(Main.class);
        } catch (UnmodifiableClassException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    /**
     * 修改器
     */
    private static class Transformer implements ClassFileTransformer {
        private static final String T_CLASS_MAIN = Main.class.getName().replaceAll("\\.", "/");
        @Override
        public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined,
                                ProtectionDomain protectionDomain, byte[] classfileBuffer) {
            if (T_CLASS_MAIN.equals(className)) {
                ClassReader classReader = new ClassReader(classfileBuffer);
                ClassWriter classWriter = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
                classReader.accept(new AsmClassVisitor(classWriter), ClassReader.EXPAND_FRAMES);
                return classWriter.toByteArray();
            }
            return classfileBuffer;
        }
    }

    /**
     * ASM 是一个通用的 Java 字节码操作和分析框架，它提供了一些常见的字节码转换和分析算法。通过它可以构建自定义的复杂的代码转换和分析工具。
     */
    private static class AsmClassVisitor extends ClassVisitor implements Opcodes {
        public AsmClassVisitor(ClassWriter classWriter) {
            super(ASM5, classWriter);
        }

        @Override
        public MethodVisitor visitMethod(int access, String name, String desc, String signature, String[] exceptions) {
            final MethodVisitor methodVisitor = cv.visitMethod(access, name, desc, signature, exceptions);
            if ("main".equals(name)) {
                return new AsmMethodVisitor(methodVisitor, name);
            }
            return methodVisitor;
        }
    }

    /**
     * MethodVisitor 是 ASM 库中的一个关键接口，主要用于处理字节码中的方法。
     * 当 ASM 的 ClassReader 读取到方法时，就会转入 MethodVisitor 接口进行处理。
     */
    private static class AsmMethodVisitor extends MethodVisitor implements Opcodes {
        private final String name;

        public AsmMethodVisitor(MethodVisitor methodVisitor, String name) {
            super(ASM5, methodVisitor);
            this.name = name;
        }

        // 当需要在方法开始前插入代码，可以重写该方法
        @Override
        public void visitCode() {
            super.visitCode();
            // 将 System.out 压入操作数栈顶
            mv.visitFieldInsn(GETSTATIC, "java/lang/System", "out", "Ljava/io/PrintStream;");
            // 将 String 压入操作数栈顶
            mv.visitLdcInsn("动态追踪： " + name);
            // 调用方法： 1. 栈顶元素 String 出栈，作为入参； 2. 栈顶元素 PrintStream 出栈，作为方法调用类 3. 调用调用类的 pringln 方法
            mv.visitMethodInsn(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V", false);
        }
    }
}
```

:::

```
target/classes$ java -javaagent:../demo-jvmti-agent-1.0-SNAPSHOT.jar=abc org.example.Main
running Java Agent!
abc
sun.instrument.InstrumentationImpl@763d9750
动态追踪： main
Hello world!
```

### Java 动态追踪技术应用

像 Btrace、Hiprofiler、Greys、Arthas 这些 Java 调试工具都使用了上述的 Java 动态追踪技术。

具体的应用场景有：

+ 监控指定方法的执行内容，比如入参、返回值等
+ 监控指定方法的调用情况，比如时间戳、调用次数、耗时等
+ 监控指定方法的调用路径
