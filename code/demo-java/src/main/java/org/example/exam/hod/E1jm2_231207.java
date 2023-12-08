package org.example.exam.hod;

import java.util.Scanner;

public class E1jm2_231207 {
    /**
     * 你从供应商买材料，怎么买花钱最少，每个供应商，[每卖出一单位材料，材料单价+1]，
     * 现在你要买n个单位的材料，怎么买价格才能最低？
     *     输入：{{100, 200}, {9, 2}, {10, 3}, {10, 1}, {10, 3}}
     *     n = 4
     *     输出：39
     *     上述第一行表示供应商的{材料单价，材料个数}
     *     第二行表示你总共要买4个单位的材料。
     * @param args
     */
    public static void main(String[] args) {
        xx("4\n" +
                "100 200\n" +
                "9 2\n" +
                "10 3\n" +
                "10 3\n");
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);

        int n = in.nextInt();
        int[] P = new int[n]; // 价格
        int[] M = new int[n]; // 数量
        for(int i=0; i<n; i++) {
            int p = in.nextInt();
            int m = in.nextInt();
            P[i] = p;
            M[i] = m;
        }

        int t = n;
        int sum = 0;
        while(t>0) {
            int min = getMin(P, M);
            sum+=min;
            t--;
        }
        System.out.println(sum);
    }

    static int getMin(int[] P, int[] M) {
        int minindex = -1;
        int min = Integer.MAX_VALUE;
        for(int i=0; i<P.length; i++) {
            if(min > P[i] && M[i]>0) {
                minindex = i;
                min = P[i];
            }
        }
        //
        P[minindex]++;
        M[minindex]--;
        return min;
    }

}
