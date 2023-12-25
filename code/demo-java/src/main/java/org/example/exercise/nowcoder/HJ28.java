package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/b9eae162e02f4f928eac37d7699b352e?tpId=37&tqId=21251&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ28 素数伴侣</a>
 * 查找
 * 排序
 *
 * todo 匈牙利算法
 */
public class HJ28 {
    public static void main(String[] args) {
        // 0
        xx("2\n" +
                "3 6");
        // 2
        xx("4\n" +
                "2 5 6 13");
        // 1
        xx("4\n" +
                "4 6 5 11");
        // 0
        xx("2\n" +
                "13319 23127");
        // 4
//        xx("12\n" +
//                "20867 25786 13932 11112 18239 25481 2607 8855 9788 28461 27950 9814"); // todo 超时
    }

    /**
     * 题目描述
     * 若两个正整数的和为素数，则这两个正整数称之为“素数伴侣”，如2和5、6和13，它们能应用于通信加密。
     * 现在密码学会请你设计一个程序，从已有的 N （ N 为偶数）个正整数中挑选出若干对组成“素数伴侣”，
     * 挑选方案多种多样，例如有4个正整数：2，5，6，13，如果将5和6分为一组中只能得到一组“素数伴侣”，而将2和5、6和13编组将得到两组“素数伴侣”，能组成“素数伴侣”最多的方案称为“最佳方案”，
     * 当然密码学会希望你寻找出“最佳方案”。
     * 数据范围： 1≤n≤100，输入的数据大小满足 2≤val≤30000
     * @param input 输入说明
     * 1 输入一个正偶数 n
     * 2 输入 n 个整数
     * @return 求得的“最佳方案”组成“素数伴侣”的对数。
     * 输出一个整数 K ，表示你求得的“最佳方案”组成“素数伴侣”的对数。
     */
    private static void xx(String input) {
        Scanner in = new Scanner(input);
        int n = in.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = in.nextInt();
        }
        //
        int count = countFineSu(arr, 0);
        //
        System.out.println(count);
    }
    static int countFineSu(int[] arr, int il) {
        if(il >= arr.length) return 0;
        int max = 0;
        int temp1 = arr[il];
        if(temp1==-1) return 0;
        for(int i=0; i<arr.length; i++) {
            if(i==il) continue;
            int temp2 = arr[i];
            if(temp2==-1) {
                continue;
            }
            // no select
            int count1 = countFineSu(arr, il+1);
            max = Math.max(max, count1);
            System.out.println(Arrays.toString(arr) + " " +max+ " "+il);
            // select
            if(isSu(temp1+temp2)) {
                arr[il] = -1;
                arr[i] = -1;
                int count2 = countFineSu(arr, il+1);
                max = Math.max(max, count2+1);
                System.out.println(Arrays.toString(arr) + " " +max+ " "+il);
                arr[il] = temp1;
                arr[i] = temp2;
            }
        }
        return max;
    }
    static int[] _isSuCache = new int[2*30000+1];
    static boolean _isSu(int n) {
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if(n%i==0) return false;
        }
        return true;
    }
    static boolean isSu(int n) {
        if(_isSuCache[n]==0) {
            _isSuCache[n] = _isSu(n)?1:-1;
        }
        return _isSuCache[n] == 1;
    }
}
