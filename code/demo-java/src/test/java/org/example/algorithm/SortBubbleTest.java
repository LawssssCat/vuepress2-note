package org.example.algorithm;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SortBubbleTest {
    @Test
    public void test01() {
        SortFunction<Integer> function = new SortBubble<>();
        Integer[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
        function.sort(arr);
        Assertions.assertArrayEquals(new Integer[] {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99}, arr);
    }
}
