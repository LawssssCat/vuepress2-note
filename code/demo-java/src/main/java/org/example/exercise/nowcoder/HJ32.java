package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/3cd4621963e8454594f00199f4536bb1?tpId=37&tqId=21255&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ32 密码截取</a>
 * 字符串
 * 动态规划
 * <ul>
 *     <li>
 *         讲解|视频 - <a href="https://www.bilibili.com/video/BV1Vs4y1T7V3/">HJ32 密码截取思路分析以及手撕代码</a>
 *     </li>
 * </ul>
 */
public class HJ32 {
    public static void main(String[] args) {
        xx("ABBA"); // 4
        xx("ABBBA"); // 5
        xx("12HHHHA"); // 4
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);

        String line = in.nextLine();

        //
        int[][] dp = new int[line.length()][line.length()];
        for(int i=0; i<line.length(); i++) {
            dp[i][i] = 1;
        }
//        show(dp);
        //
        int max = 1; // at least 1 not 0
        for(int y=1; y<line.length(); y++) {
            for(int x=0; x<y; x++) {
                if(line.charAt(y) == line.charAt(x)) {
                    if(y-x<=2) {
                        dp[y][x]=1;
                    } else {
                        if(dp[y-1][x+1]==1) {
                            dp[y][x] = 1;
                        }
                    }
                    //
                    if(dp[y][x]==1) {
                        max = Math.max(max, (y-x+1));
                    }
                }
            }
        }
//        show(dp);
        //
        System.out.println(max);
    }

    private static void show(int[][] dp) {
        System.out.println("len: "+dp.length+"x"+dp[0].length);
        for (int[] arr : dp) {
            System.out.println(Arrays.toString(arr));
        }
    }
}
