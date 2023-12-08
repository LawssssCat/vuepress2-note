package org.example.exercise.nowcoder;

import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/f9c6f980eeec43ef85be20755ddbeaf4?tpId=37&tqId=21239&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ16 购物单</a>
 * 动态规划
 * 01背包问题？
 */
public class HJ16 {
    public static void main(String[] args) {
        // 2200
        xx("1000 5\n" +
                "800 2 0\n" +
                "400 5 1\n" +
                "300 5 1\n" +
                "400 3 0\n" +
                "500 2 0");
        // 130
        xx("50 5\n" +
                "20 3 5\n" +
                "20 3 5\n" +
                "10 3 0\n" +
                "10 2 0\n" +
                "10 1 0");
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);
        int N = in.nextInt(); // 钱
        int m = in.nextInt(); // 清单数
        B[] BS = new B[m];
        for(int i=0; i<m; i++) {
            int v = in.nextInt(); // 钱
            int p = in.nextInt(); // 重要程度
            int q = in.nextInt(); // 0主
            BS[i] = new B(v, p, q);
        }
        for(int i=0; i<m; i++) {
            B b = BS[i];
            if(!b.isMain()) {
                BS[b.q-1].sub.add(b);
            }
        }

        //
        // todo 01背包变形
        int[][] dp = new int[BS.length+1][N/10+1];

        // todo

        //
        System.out.println(dp[BS.length][N/10]);

    }

    static class B {
        int v ;
        int p ;
        int q;
        List<B> sub;


        public B(int v, int p, int q) {
            this.v = v;
            this.p = p;
            this.q = q;
            this.sub = new LinkedList<>();
        }
        boolean isMain() {
            return this.q==0;
        }

        int calcMy() {
            return v*p;
        }
    }
}
