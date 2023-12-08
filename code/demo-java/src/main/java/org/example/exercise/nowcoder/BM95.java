package org.example.exercise.nowcoder;

import java.sql.SQLOutput;
import java.util.Arrays;

/**
 * <a href="https://www.nowcoder.com/practice/76039109dd0b47e994c08d8319faa352">BM95 分糖果问题</a>
 * 贪心
 */
public class BM95 {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     * pick candy
     * @param arr int整型一维数组 the array
     * @return int整型
     */
    public int candy (int[] arr) {
        // write code here
        int[] temp = new int[arr.length];
        //
        Arrays.fill(temp, 1);
        //
        for(int i=1; i<arr.length; i++) {
            if(arr[i]>arr[i-1] && temp[i]<=temp[i-1]) {
                temp[i] = temp[i-1]+1;
            }
        }
        //
        for(int i=temp.length-1; i>0; i--) {
            if(arr[i]<arr[i-1] && temp[i-1]<=temp[i]) {
                temp[i-1] = temp[i]+1;
            }
        }
        //
        int count = 0;
        for(int t : temp) {
            count+=t;
        }
        System.out.println(Arrays.toString(temp));
        return count;
    }

    public static void main(String[] args) {
        BM95 bm = new BM95();
        // [1,1,1] - 3
        System.out.println(bm.candy(new int[]{1,1,1}));
        // [1,1,2] - 4
        System.out.println(bm.candy(new int[]{1,1,2}));
        // [1, 2, 1, 2, 3, 2, 1, 1] - 13
        System.out.println(bm.candy(new int[]{1,3,1,2,3,3,1,1}));
    }

}
