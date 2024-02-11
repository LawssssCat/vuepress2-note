package org.example.algorithm;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class SortInsertionTest {
    @Test
    public void testSort() {
        Integer[] arr = {2, 5, 9, 3, 7, 6, 0, 1, 99, 22, 44, 4, 8};
        SortInsertion<Integer> function = new SortInsertion<>();
        function.sort(arr);
        check(new Integer[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99}, arr);
    }

    private void check(Integer[] except, Integer[] actual) {
        Assertions.assertEquals(Arrays.toString(except), Arrays.toString(actual));
    }
}