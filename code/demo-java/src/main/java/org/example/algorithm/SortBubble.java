package org.example.algorithm;

/**
 * 冒泡排序
 */
public class SortBubble<T extends Comparable<T>> implements SortFunction<T> {
    @Override
    public void sort(T[] arr) {
        int n = arr.length;
        boolean swapped;
        do {
            swapped = false;
            for (int i = 1; i < n; i++) {
                if (arr[i].compareTo(arr[i - 1]) < 0) {
                    swapped = true;
                    T t = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = t;
                }
            }
            n--;
        } while (swapped);
    }
}
