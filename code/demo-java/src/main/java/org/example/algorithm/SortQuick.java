package org.example.algorithm;

import java.util.Arrays;

public class SortQuick<T extends Comparable<T>> implements SortFunction<T> {

    @Override
    public void sort(T[] arr) {
        _quickSort(arr, 0, arr.length-1);
    }

    private void _quickSort(T[] arr, int istart, int iend) {
        if(iend-istart>1) {
            int imid = _partition(arr, istart, iend);
            _quickSort(arr, istart, imid-1);
            _quickSort(arr, imid+1, iend);
        }
    }

    private int _partition(T[] arr, int il, int ir) {
        int iraw = ir;
        int index = il;
        T value = arr[iraw];
        for(int i=il; i<=ir; i++) {
            if(arr[i].compareTo(value)<0) { // swap -> i值往前放
                swap(arr, index, i);
                index++;
            }
        }
        swap(arr, index, iraw);
        // System.out.println(Arrays.toString(arr)); // debug usefully
        return index;
    }

    private void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }


    public static void main(String[] args) {
        Integer[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
        SortQuick<Integer> function = new SortQuick<>();
        function.show(arr);
        function.sort(arr);
        function.show(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
    }

}