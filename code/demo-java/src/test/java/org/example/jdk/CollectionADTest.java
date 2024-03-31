package org.example.jdk;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.security.SecureRandom;
import java.util.*;
import java.util.function.Supplier;

public class CollectionADTest {
    private static final int LEN = 100000;
    private Random random = new SecureRandom();

    void construct(List<String> list) {
        list.clear();
        for (int i=0; i<LEN; i++) {
            list.add(String.valueOf(i));
        }
        Collections.shuffle(list);
    }

    void removeElement(List<String> list, int nums) {
        for (int i = nums; i >0; i--) {
            int index = random.nextInt(i);
            list.remove(index);
        }
    }

    long testTime(Xx func) {
        long s = System.currentTimeMillis();
        func.work();
        long e = System.currentTimeMillis();
        return e-s;
    }

    @Test
    public void test_time() {
        long t1 = testTime(() -> { // 快
            List<String> list = new ArrayList<>();
            construct(list);
            removeElement(list, LEN);
        });
        long t2 = testTime(() -> { // 慢：每次删除要重新定位节点
            List<String> list = new LinkedList<>();
            construct(list);
            removeElement(list, LEN);
        });
        Assertions.assertTrue(t2 - t1 > 0);
    }

    @FunctionalInterface
    private static interface Xx {
        void work() ;
    }
}
