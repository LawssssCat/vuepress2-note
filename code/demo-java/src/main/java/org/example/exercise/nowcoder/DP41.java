package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/fd55637d3f24484e96dad9e992d3f62e?tpId=230&tqId=2032484&ru=/exam/company&qru=/ta/dynamic-programming/question-ranking">DP41 【模板】01背包</a>
 * 动态规划
 * <ul>
 *     <li>
 *         解释|01背包问题算法动画讲解 - https://www.bilibili.com/video/BV1pY4y1J7na/
 *     </li>
 *     <li>
 *         解释|恰好装满 - https://www.bilibili.com/video/BV1tk4y1K77t/
 *     </li>
 * </ul>
 */
public class DP41 {
    public static void main(String[] args) {
        // 14 9
        xx("3 5\n" +
                "2 10\n" +
                "4 5\n" +
                "1 4");
        // 8 0
        xx("3 8\n" +
                "12 6\n" +
                "11 8\n" +
                "6 8");
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);
        // 注意 hasNext 和 hasNextLine 的区别
        // while (in.hasNextInt()) { // 注意 while 处理多个 case
        //     int a = in.nextInt();
        //     int b = in.nextInt();
        //     System.out.println(a + b);
        // }
        int n = in.nextInt();
        int V = in.nextInt();
        O[] O = new O[n];
        for(int i=0; i<n; i++) {
            int v = in.nextInt();
            int w = in.nextInt();
            O[i] = new O(v, w);
        }


        //
        int[][] dp = new int[n+1][V+1];
        for(int i=1; i<=n; i++) {
            O o = O[i-1];
            for(int j=1; j<=V; j++) {
                if(o.v>j) {
                    dp[i][j] = dp[i-1][j];
                } else {
                    int a = dp[i-1][j-o.v] + o.w; // i
                    dp[i][j] = Math.max(a, dp[i-1][j]);
                }
//                show(dp);
            }
        }
        // 装满
        int[][] dp0 = new int[n+1][V+1];
        dp0[0][0] = 0;
        for(int j=1; j<=V; j++) {
            dp0[0][j] = -1;
        }
        for(int i=1; i<=n; i++) {
            O o = O[i-1];
            for(int j=1; j<=V; j++) {
                if(o.v>j) {
                    dp0[i][j] = dp0[i-1][j];
                } else {
                    int t = dp0[i-1][j-o.v];
                    int a = t==-1?-1:t+o.w;
                    dp0[i][j] = Math.max(dp0[i-1][j], a);
                }
            }
        }

        //
        System.out.println(dp[n][V]);
        int t = dp0[n][V];
        System.out.println(t==-1?0:t);
    }

    private static void show(int[][] dp0) {
        System.out.println("len: "+dp0.length+"x"+dp0[0].length);
        for(int[] arr : dp0) {
            System.out.println(Arrays.toString(arr));
        }
    }

    static class O {
        int v;
        int w;
        public O(int v, int w) {
            this.v = v;
            this.w = w;
        }
    }
}
