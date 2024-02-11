package org.example.algorithm;

/**
 * 插入排序
 */
public class SortInsertion<T extends Comparable<T>> implements SortFunction<T> {
    @Override
    public void sort(T[] arr) {
        for (int i = 1; i < arr.length; i++) {
            T value = arr[i];
            int j = i - 1;
            for (; j >= 0; j--) {
                if (value.compareTo(arr[j]) < 0) {
                    arr[j + 1] = arr[j];
                } else {
                    break;
                }
            }
            arr[j + 1] = value;
        }
    }
}