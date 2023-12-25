package org.example.algorithm;

/**
 * 归并排序
 * 递归、分治
 * 时间： O(nlogn)
 * 空间： O(n)
 * 稳定排序
 */
public class SortMerge<T extends Comparable<T>> implements SortFunction<T> {
    @Override
    public void sort(T[] arr) {
        if(arr.length<=1) {
            return;
        }
        T[] temp = (T[]) new Object[arr.length];
        _mergeSort(arr, temp, 0, arr.length);
    }
    void _mergeSort(T[] arr, T[] temp, int istart, int iend) {
        if(iend-istart>1) {
            int imid = (istart + iend) / 2;
            // divi
            _mergeSort(arr, temp, istart, imid);
            _mergeSort(arr, temp, imid, iend);
            // merge
            int it = istart;
            int il=istart, ir=imid;
            while(il<imid && ir<iend) {
                if(arr[il].compareTo(arr[ir])<0) {
                    temp[it] = arr[il];
                    il++;
                } else {
                    temp[it] = arr[ir];
                    ir++;
                }
                it++;
            }
            il = (il<imid) ? il : ir;
            imid = (il<imid) ? imid : iend;
            while(il < imid) {
                temp[it] = arr[il];
                il++;
                it++;
            }
            // copy
            while(istart<iend) {
                arr[istart] = temp[istart];
                istart++;
            }
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
