package org.example.algorithm;

import java.util.Arrays;

public interface SortFunction<T extends Comparable<T>> {
  void sort(T[] arr);
}