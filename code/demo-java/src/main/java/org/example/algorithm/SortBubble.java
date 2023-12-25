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
            for (int i=1; i<n; i++) {
                if(arr[i].compareTo(arr[i-1])<0) {
                    swapped = true;
                    T t = arr[i];
                    arr[i] = arr[i-1];
                    arr[i-1] = t;
                }
            }
            n--;
        } while(swapped);
    }

    public static void main(String[] args) {
        Integer[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
        SortInsertion<Integer> function = new SortInsertion<>();
        function.show(arr);
        function.sort(arr);
        function.show(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
    }
}
