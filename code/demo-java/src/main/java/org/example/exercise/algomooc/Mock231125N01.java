package org.example.exercise.algomooc;

import java.util.Scanner;

/**
 * <a href="https://oj.algomooc.com/problem.php?id=3123">3123: 【贪心】2023C-在规定时间内获得的最大报酬 </a>
 * 哈希表 贪心 华为OD真题-100分
 */
public class Mock231125N01 {
    public static void main (String[] args) {
        Scanner in = new Scanner(System.in);

        int T = in.nextInt();
        int N = in.nextInt();

        int[] KS = new int[N];
        int[] LS = new int[N];
        for(int i=0; i<N; i++) {
            int K = in.nextInt(); // 时间
            int L = in.nextInt(); // 报酬
            KS[i] = K;
            LS[i] = L;
        }

        // short insertion
        for(int i=2; i<N; i++) {
            int v = KS[i];
            int l = LS[i];
            int j=i-1;
            for(; j>=0; j--) {
                if(KS[j]>v) {
                    // 1
                    int t = KS[j];
                    KS[j] = KS[j+1];
                    KS[j+1] = t;
                    // 2
                    t = LS[j];
                    LS[j] = LS[j+1];
                    LS[j+1] = t;
                } else {
                    break;
                }
            }
            KS[j+1] = v;
            LS[j+1] = l;
        }
        // System.out.println(Arrays.toString(KS));
        // System.out.println(Arrays.toString(LS));

        //
        int[] temp = new int[T];
        int tempSize = 0;
        // for(int x=1; x<=KS[KS.length-1]; x++) {
        for(int i=0; i<N; i++) {
            int K = KS[i]; // 时间
            int L = LS[i];
            // System.out.println(K+" "+L);
            // if(tempSize == K) {
            //     temp[tempSize-1] = Math.max(L, temp[tempSize-1]);

            //     continue;
            // }
            // if(tempSize+1<=K) {
            // System.out.println(L);
            // if(tempSize<temp.length && tempSize < K) {
            //     temp[tempSize] = L;
            //     tempSize++;
            //     // System.out.println(Arrays.toString(temp));
            // } else {
            if(tempSize<K && tempSize<temp.length) {
                tempSize++;
            }
            int index=0;
            int min=temp[0];
            for(int c=1; c<Math.min(K, tempSize); c++) {
                if(temp[c]<min) {
                    index = c;
                    min = temp[c];
                }
            }
            if(min<L) {
                temp[index] = L;
                // System.out.println(Arrays.toString(temp));
            }
            // }
            // }
            // }
        } // for
        // System.out.println(tempSize);
        // System.out.println(Arrays.toString(temp));

        //
        int count = 0;
        for(int i=0; i<tempSize; i++) {
            count+=temp[i];
        }
        // return count;
        System.out.println(count);
    }
}
