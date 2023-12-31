package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/6d9d69e3898f45169a441632b325c7b4?tpId=37&tqId=21247&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ24 合唱队</a>
 * 动态规划
 * 队列
 * <ul>
 *     <li>https://www.bilibili.com/video/BV1b94y1Q7hm/</li>
 * </ul>
 */
public class HJ24 {
    public static void main(String[] args) {
        // 4
        // 186 200 160 130 或 150 200 160 130
        xx("8\n" +
                "186 186 150 200 160 130 197 200");
        // 95
        xx("124\n" +
                "16 103 132 23 211 75 155 82 32 48 79 183 13 91 51 172 109 102 189 121 12 120 116 133 79 120 116 208 47 110 65 187 69 143 140 173 203 35 184 49 245 50 179 63 204 34 218 11 205 100 90 19 145 203 203 215 72 108 58 198 95 116 125 235 156 133 220 236 125 29 235 170 130 165 155 54 127 128 204 62 59 226 233 245 46 3 14 108 37 94 52 97 159 190 143 67 24 204 39 222 245 233 11 80 166 39 224 12 38 13 85 21 47 25 180 219 140 201 11 42 110 209 77 136");
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);

        int n = in.nextInt();
        int[] NS = new int[n];
        for(int i=0; i<n; i++) {
            NS[i] = in.nextInt();
        }

        //
        int[] left = new int[n];
        for (int i = 0; i < n; i++) {
            left[i]=0;
            for(int j=0; j<i; j++) {
                if(NS[j]<NS[i]) {
                    left[i] = Math.max(left[i], left[j]+1);
                }
            }
        }
//        System.out.println(Arrays.toString(left));
        int[] right = new int[n];
        for (int i = n-1; i >=0; i--) {
            right[i] = 0;
            for(int j=n-1; j>i; j--) {
                if(NS[i]>NS[j]) {
                    right[i] = Math.max(right[i], right[j]+1);
                }
            }
        }
//        System.out.println(Arrays.toString(right));
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = left[i] + right[i] + 1;
        }
//        System.out.println(Arrays.toString(dp));
        //

        int r = n;
        for (int i = 0; i < n; i++) {
            int t = n - dp[i];
            r = Math.min(r, t);
        }
        System.out.println(r);
    }
}
