package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/17ba5b5df1fc49ca8d6cf8ea407b1972?tpId=182&tqId=34564&rp=1&ru=/exam/oj">BD12 最大子序列</a>
 * 动态规划 贪心
 */
public class BD12 {
    public static void main(String[] args) {
        // 字典序较大，就是两个字符串中比较大的元素，也就是java中compareTo的实现。
        System.out.println("t".compareTo("e"));
        System.out.println("t".compareTo("te"));
        System.out.println("tt".compareTo("tes"));
        System.out.println("tt".compareTo("te"));
        System.out.println("tt".compareTo("tta"));
        xx("test"); // tt
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);

        while(in.hasNextLine()) {
            String str= in.nextLine();
            String[] hash = new String[str.length()];
            for(int i=0; i<str.length(); i++) {
                char c = str.charAt(i);
                String max = ""+c;
                for(int j=0; j<i; j++) {
                    String temp = hash[j] + c;
                    if(max.compareTo(temp)<0) {
                        max = temp;
                    }
                }
                hash[i] = max;
            }
            System.out.println(hash[str.length()-1]);
        }
    }
}
