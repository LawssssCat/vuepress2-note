package org.example.algorithm;

public class SortInsertion<T extends Comparable<T>> implements SortFunction<T> {

    @Override
    public void sort(T[] arr) {
        for(int i=1; i<arr.length; i++) {
            T value = arr[i];
            int j = i-1;
            for (; j>=0; j--) {
                if(value.compareTo(arr[j])<0) {
                    arr[j+1] = arr[j];
                } else {
                    break;
                }
            }
            arr[j+1] = value;
        }
    }

    public static void main(String[] args) {
        Integer[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
        SortInsertion<Integer> function = new SortInsertion<>();
        function.show(arr);
        function.sort(arr);
        function.show(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
    }

}