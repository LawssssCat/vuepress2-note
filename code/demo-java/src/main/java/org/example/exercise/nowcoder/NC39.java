package org.example.exercise.nowcoder;

import java.util.Arrays;

/**
 * <a href="https://www.nowcoder.com/practice/c76408782512486d91eea181107293b6">NC39 N皇后问题</a>
 * 递归 回溯
 */
public class NC39 {
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param n int整型 the n
     * @return int整型
     */
    public int Nqueen (int n) {
        // write code here
        hash = new int[n][n];
//        show();
        count = 0;
        dfs(0, n);
        return count;
    }
    private void show() {
        System.out.println("len: "+hash.length);
        for(int i=0; i<hash.length;i++) {
            System.out.println(Arrays.toString(hash[i]));
        }
    }

    private void dfs(int deep, int maxDeep) {
        for(int i=0; i<maxDeep; i++) {
            if(hash[deep][i]==0) {
                if(deep+1==maxDeep) {
                    add(deep, i, maxDeep, 1);
                    count++;
                    show();
                    add(deep, i, maxDeep, -1);
                    return ;
                } else {
                    add(deep, i, maxDeep, 1);
                    dfs(deep+1, maxDeep);
                    add(deep, i, maxDeep, -1);
                }
            }
        }
    }

    private void add(int y, int x, int maxDeep, int v) {
        hash[y][x]+=v*99;
        for(int i=1; i<maxDeep; i++) {
            // x
            if(x+i<maxDeep) hash[y][x+i]+=v;
            if(x-i>=0) hash[y][x-i]+=v;
            // y
            if(y+i<maxDeep) hash[y+i][x]+=v;
            if(y-i>=0) hash[y-i][x]+=v;
            // ld
            if(y+i<maxDeep&&x+i<maxDeep) hash[y+i][x+i]+=v;
            if(y-i>=0&&x-i>=0) hash[y-i][x-i]+=v;
            // lt
            if(y+i<maxDeep&&x-i>=0) hash[y+i][x-i]+=v;
            if(y-i>=0&&x+i<maxDeep) hash[y-i][x+i]+=v;
        }
    }

    int count;

    int[][] hash;

    public static void main(String[] args) {
        NC39 nc39 = new NC39();
        // 1 - 1
        System.out.println(nc39.Nqueen(1));
        // 4 - 2
        System.out.println(nc39.Nqueen(4));
        // 8 - 92
        System.out.println(nc39.Nqueen(8));
    }
}
