package org.example.exercise.nowcoder;

import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/237ae40ea1e84d8980c1d5666d1c53bc?tpId=230&tqId=2032575&ru=/exam/company&qru=/ta/dynamic-programming/question-ranking">DP42 【模板】完全背包</a>
 * 动态规划
 * <ul>
 *     <li>
 *
 *     </li>
 * </ul>
 */
public class DP42 {
    public static void main(String[] args) {
        /*
        10
        2
         */
        xx("2 6\n" +
                "5 10\n" +
                "3 1");
        /*
        20
        0
         */
        xx("3 8\n" +
                "3 10\n" +
                "9 1\n" +
                "10 1");
        /*
        596
        189
         */
        xx("6 13\n" +
                "13 189\n" +
                "17 360\n" +
                "19 870\n" +
                "14 184\n" +
                "6 298\n" +
                "16 242");
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);

        int n = in.nextInt();
        int V = in.nextInt();
        O[] OS = new O[n];
        for (int i=0; i<n; i++) {
            int v = in.nextInt();
            int w = in.nextInt();
            O o = new O(v, w);
            OS[i] = o;
        }

        //
        int[][] dp = new int[n+1][V+1];
        for(int i=1; i<=n; i++) {
            O o = OS[i-1];
            for(int j=1; j<=V; j++) {
                if(o.v>j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    int a = dp[i][j-o.v] + o.w; //
                    dp[i][j] = Math.max(dp[i - 1][j], a);
                }
            }
        }
        //
        System.out.println(dp[n][V]);

        // 恰好相等
        int[][] dp0 = new int[n+1][V+1];
        dp0[0][0] = 0;
        for(int j=1; j<=V; j++) {
            dp0[0][j] = Integer.MIN_VALUE;
        }
        for(int i=1; i<=n; i++) {
            O o = OS[i-1];
            for(int j=1; j<=V; j++) {
                if(o.v>j) {
                    dp0[i][j] = dp0[i - 1][j];
                } else {
                    int a = dp0[i][j-o.v] + o.w; //
                    dp0[i][j] = Math.max(dp0[i - 1][j], a);
                }
            }
        }
        //
        int t = dp0[n][V];
        System.out.println(t<0?0:t);
    }

    static class O {
        int v ; // 体积
        int w ; // 价值

        public O(int v, int w) {
            this.v = v;
            this.w = w;
        }
    }

}
