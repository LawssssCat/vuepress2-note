package org.example.jdk;

import org.junit.jupiter.api.Test;

public class Thread01Test {
    @Test
    public void interrupted_show() throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
                if (Thread.currentThread().isInterrupted()) { // 判断未消费的 interrupt 状态
                    System.out.println("Thread is interrupted " + Thread.currentThread().isInterrupted());
                    return;
                }
                try {
                    System.out.println("Thread is sleeping ... " + Thread.currentThread().isInterrupted());
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    // 消费了 interrupt 状态，无法再通过 Thread.currentThread().isInterrupted() 获取
                    System.out.println("Sleep is interrupted! " + Thread.currentThread().isInterrupted());
                }
            }
        });
        thread.start();
        Thread.sleep(2000);
        thread.interrupt(); // sleep ... false
        Thread.sleep(2000);
        thread.interrupt(); // sleep ... false
    }

    @Test
    public void interrupted_show1() throws InterruptedException {
        Thread thread = new Thread(() -> {
            while (true) {
                if (Thread.currentThread().isInterrupted()) { // 判断未消费的 interrupt 状态
                    System.out.println("Thread is interrupted " + Thread.currentThread().isInterrupted());
                    return;
                }
            }
        });
        thread.start();
        Thread.sleep(2000);
        thread.interrupt(); // interrupted ... true
        Thread.sleep(2000);
        thread.interrupt(); // no effect because thread has ended
    }
}
