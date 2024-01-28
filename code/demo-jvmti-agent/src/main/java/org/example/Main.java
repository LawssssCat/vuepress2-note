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