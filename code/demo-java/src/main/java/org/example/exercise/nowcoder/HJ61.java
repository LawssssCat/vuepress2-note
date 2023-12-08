package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/bfd8234bb5e84be0b493656e390bdebf?tpId=37&tqId=21284&rp=1&ru=/exam/oj/ta">HJ61 放苹果</a>
 */
public class HJ61 {
    public static void main(String[] args) {
        xx("7 3"); // 8
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);
        int m = in.nextInt(); // 苹果
        int n = in.nextInt(); // 盘子

        // dp
        int[][] dp = new int[m+1][n+1];
        for(int i=0; i<=m; i++) {
            for(int j=0; j<=n; j++) { // 盘子
                if(i<=1 || j<=1) {
                    dp[i][j]=1;
                    continue;
                }
                if(i<j) {
                    dp[i][j]=dp[i][i];
                } else {
                    dp[i][j] = dp[i][j-1] + dp[i-j][j];
                }
            }
        }
//        show(dp);

        int sum = dp[m][n];
        System.out.println(sum);
    }
//    static void show(int[][] hash) {
//        for(int[] arr: hash) {
//            System.out.println(Arrays.toString(arr));
//        }
//    }
}
