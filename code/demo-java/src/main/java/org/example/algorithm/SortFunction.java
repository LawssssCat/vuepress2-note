package org.example.algorithm;

import java.util.Arrays;

public interface SortFunction<T extends Comparable<T>> {
  void sort(T[] arr);
  default void show(Object[] arr) {
    System.out.println(Arrays.toString(arr)+" "+arr.length);
  }
}