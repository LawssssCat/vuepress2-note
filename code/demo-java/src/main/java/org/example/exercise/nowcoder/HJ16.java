package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/f9c6f980eeec43ef85be20755ddbeaf4?tpId=37&tqId=21239&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ16 购物单</a>
 * 动态规划
 * 01背包问题？
 * <ul>
 *     <li>https://www.bilibili.com/video/BV1jY4y177zd/</li>
 * </ul>
 */
public class HJ16 {
    public static void main(String[] args) {
        // 2200
        System.out.println(xx("1000 5\n" +
                "800 2 0\n" +
                "400 5 1\n" +
                "300 5 1\n" +
                "400 3 0\n" +
                "500 2 0"));
        // 130
        System.out.println(xx("50 5\n" +
                "20 3 5\n" +
                "20 3 5\n" +
                "10 3 0\n" +
                "10 2 0\n" +
                "10 1 0"));
        // 7430
        System.out.println(xx("2000 10\n" +
                "500 1 0\n" +
                "400 4 0\n" +
                "300 5 1\n" +
                "400 5 1\n" +
                "200 5 0\n" +
                "500 4 5\n" +
                "400 4 0\n" +
                "320 2 0\n" +
                "410 3 0\n" +
                "400 3 5"));
    }

    private static int xx(String input) {
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

        for(int i=1; i<=m; i++) {
            B b = BS[i-1];
            for (int j = 1; j <= N / 10; j++) {
                dp[i][j] = dp[i - 1][j];
                if (b.isMain()) {
                    for(C c : b.may()) {
                        int v = c.v/10;
                        if(j>=v) {
                           dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - v] + c.w);
                        }
                    }
                }
            }
        }
        show(dp);

        //
        return dp[BS.length][N/10];
    }

    static void show(int[][] dp) {
        System.out.println("len: "+dp.length+"x"+dp[0].length);
        for(int[] arr : dp) {
            System.out.println(Arrays.toString(arr));
        }
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

        C[] may() {
            if(this.sub.size()==0) {
                return new C[] {
                        new C(this.v, this.calcMy())
                };
            } else if(this.sub.size()==1) {
                B b = this.sub.get(0);
                return new C[] {
                        new C(this.v, this.calcMy()),
                        new C(this.v+b.v, this.calcMy()+b.calcMy())
                };
            } else if(this.sub.size()==2) {
                B b = this.sub.get(0);
                B b1 = this.sub.get(1);
                return new C[] {
                        new C(this.v, this.calcMy()),
                        new C(this.v+b.v, this.calcMy()+b.calcMy()),
                        new C(this.v+b1.v, this.calcMy()+b1.calcMy()),
                        new C(this.v+b.v+b1.v, this.calcMy()+b.calcMy()+b1.calcMy()),
                };
            }
            throw new RuntimeException("xxx");
        }
    }

    static class C {
        int v;
        int w;

        public C(int v, int w) {
            this.v = v;
            this.w = w;
        }
    }
}
