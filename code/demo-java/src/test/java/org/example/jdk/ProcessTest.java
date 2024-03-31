package org.example.jdk;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.*;

/**
 * win 环境
 */
@Slf4j
public class ProcessTest {

    /**
     * 基本使用
     */
    @Test
    @SneakyThrows
    public void basic() {
        String command = "cmd /c echo hello world";
        String expect = "hello world";
        // 方式一
        {
            Process process = Runtime.getRuntime().exec(command);
            Assertions.assertEquals(0, process.waitFor());
            Assertions.assertEquals(expect, IOUtils.toString(process.getInputStream()).trim());
        }
        // 方式二
        {
            Process process = new ProcessBuilder("cmd", "/c", "echo hello world").start(); // 命令和参数要分开写，否则报错！
            Assertions.assertEquals(0, process.waitFor());
            Assertions.assertEquals(expect, IOUtils.toString(process.getInputStream()).trim());
        }
        log.info("> {}\n{}", command, expect);
    }

    @Test
    @SneakyThrows
    public void callEnv() {
        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "bash --version");
        Process process = pb.start();
        process.waitFor();
        log.info(IOUtils.toString(process.getInputStream()));
    }

    @Test
    @SneakyThrows
    public void packaging() {
        _run("bash -c 'pwd'");
        _run("bash -c pwd", new File("/"));
        _run("bash -c pwd", new File(this.getClass().getResource("/").getPath()));
        _run("bash -c pwd", new File(this.getClass().getResource("./").getPath()));
        // resound
        _run("bash -c 'ls'", new File(this.getClass().getResource("/").getPath()));
        _run("bash -c 'cat script/resound.sh'", new File(this.getClass().getResource("/").getPath()));
        _run("bash script/resound.sh a", new File(this.getClass().getResource("/").getPath()));
        _run("bash script/resound.sh bb 2", new File(this.getClass().getResource("/").getPath()));
        // response
        // _run("bash script/response.sh 1 exit", new File(this.getClass().getResource("/").getPath()));
    }

    private void _run(String command) throws IOException, InterruptedException {
        _run(command, new File("."));
    }

    private void _run(String command, File file) throws IOException, InterruptedException {
        log.warn("------------ command: {} -------------", command);
        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", command);
        pb.directory(file);
        pb.redirectErrorStream(true);
        Process process = pb.start();
        log.info("bef: {}", process.getInputStream().available());
        log.info(IOUtils.toString(process.getInputStream()));
        process.waitFor();
        log.info("aft: {}", process.getInputStream().available());
        log.info(IOUtils.toString(process.getInputStream()));
        log.info("exit: {}", process.exitValue());
    }

    /**
     * 测试输入/输出交互
     */
    @Test
    @SneakyThrows
    public void inputMsg() {
        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "bash script/response.sh");
        pb.directory(new File(this.getClass().getResource("/").getPath()));
        pb.redirectErrorStream(true);
        Process process = pb.start();
        // process.waitFor();
        // process.waitFor(1, TimeUnit.SECONDS);
        //
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        //
        int i = 0;
        while (i++<5) {
            writer.write("xxx\n");
            writer.flush();
            String msg = reader.readLine();
            log.info(msg);
        }
        IOUtils.write("exit\n", process.getOutputStream());
        log.info("--------- ok!");
        process.destroy(); // 不会关闭IO!
        // todo 关闭IO
    }

    /**
     * 运行目录
     */
    @Test
    @SneakyThrows
    public void workspace() {
        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "echo %cd%");
        // C:\Users\pc\Desktop\projects\vurpress\vuepress2-note\code\demo-java
        // pb.directory(new File(".")); // 默认
        {
            Process process = pb.start();
            Assertions.assertEquals(0, process.waitFor());
            log.info("project: "+pb.directory());
            log.info("project: "+IOUtils.toString(process.getInputStream())); // 项目目录
        }
        // C:\
        pb.directory(new File("/"));
        {
            Process process = pb.start();
            Assertions.assertEquals(0, process.waitFor());
            log.info("root: "+pb.directory());
            log.info("root: "+IOUtils.toString(process.getInputStream())); // 根目录
        }
        // C:\Users\pc\Desktop\projects\vurpress\vuepress2-note\code\demo-java\target\test-classes
        pb.directory(new File(this.getClass().getResource("/").getPath()));
        {
            Process process = pb.start();
            Assertions.assertEquals(0, process.waitFor());
            log.info("project-root: "+pb.directory());
            log.info("project-root: "+IOUtils.toString(process.getInputStream())); // 运行时根目录
        }
        // C:\Users\pc\Desktop\projects\vurpress\vuepress2-note\code\demo-java\src\test\java\org\example\jdk\ProcessTest.java
        pb.directory(new File(this.getClass().getResource("./").getPath()));
        {
            Process process = pb.start();
            Assertions.assertEquals(0, process.waitFor());
            log.info("runtime-current: "+pb.directory());
            log.info("runtime-current: "+IOUtils.toString(process.getInputStream())); // 当前文件目录
        }
    }

    /**
     * 重定向 - inheritIO（控制台输入输出）
     */
    @Test
    @SneakyThrows
    public void inheritIO() {
        ProcessBuilder pb = new ProcessBuilder("cmd", "/c", "echo hello world!");
        {
            Process process = pb.start();
            log.info("------------------------ available");
            Assertions.assertEquals(0, process.waitFor());
            log.info("------------------------ available");
            Assertions.assertNotEquals(0, process.getInputStream().available());
            log.info("process inputstream length: {}", process.getInputStream().available());
        }
        {
            Process process = pb.start();
            log.info("------------------------ pipe");
            Assertions.assertEquals(0, process.getInputStream().available()); // 这里也是0？？？说明子进程还未被执行！
            log.info(IOUtils.toString(process.getInputStream())); // waitFor 前就能得到输出
            Assertions.assertEquals(0, process.getInputStream().available());
            log.info("------------------------ pipe");
            Assertions.assertEquals(0, process.waitFor());
            log.info("------------------------ pipe");
            Assertions.assertEquals(0, process.getInputStream().available()); // 因为已经被读出了，所以是0！！！
        }
        pb.inheritIO(); // waitFor 后才输出到控制台！
        {
            Process process = pb.start();
            log.info("------------------------ inheritIO");
            Assertions.assertEquals(0, process.getInputStream().available());
            log.info("------------------------ inheritIO");
            Assertions.assertEquals(0, process.waitFor());
            log.info("------------------------ inheritIO");
        }
    }

}
