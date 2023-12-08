package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/3959837097c7413a961a135d7104c314?tpId=37&tqId=21275&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ52 计算字符串的编辑距离</a>
 */
public class HJ52 {
    public static void main(String[] args) {
        // 1
        xx("abcdefg\n" +
                "abcdef");
        System.out.println("--------------------------");
        // 12
        xx("bbbbbbbbbbcbcdefg\n" +
                "abcdef");
        System.out.println("--------------------------");
        // 91
        xx("ucyfsmg\n" +
                "zuixhuhyjgksyhqkjqxwylkoubykjxtcvkyqjpzgltbemmbmqibxxqpkgbvwbmjotixanvciibubglizmumcrjavakiygyuv");
    }

    public static void xx(String input) {
        Scanner in = new Scanner(input);
        // 注意 hasNext 和 hasNextLine 的区别
        while (in.hasNextLine()) { // 注意 while 处理多个 case
            String a = in.nextLine();
            String b = in.nextLine();
            System.out.println(calcD(a,b));
        }
    }

    static void show(int[][] hash) {
        System.out.println("len: "+hash.length+"x"+hash[0].length);
        for(int[] arr: hash) {
            System.out.println(Arrays.toString(arr));
        }
    }

    private static int calcD(String a, String b) {
        int[][] hash = new int[a.length()+1][b.length()+1];

        // init
        for(int i=0; i<=a.length(); i++) {
            hash[i][0] = i;
        }
        for(int i=0; i<=b.length(); i++) {
            hash[0][i] = i;
        }
        // calc
        for(int i=1; i<=a.length(); i++) {
            for(int j=1; j<=b.length(); j++) {
                if(a.charAt(i-1) == b.charAt(j-1)) {
                    hash[i][j] = hash[i-1][j-1];
                } else {
                    int min;
                    min = Math.min(hash[i-1][j]+1, hash[i][j-1]+1);
                    min = Math.min(min, hash[i-1][j-1]+1);
                    hash[i][j] = min;
                }
                show(hash);
            }
        }

        return hash[a.length()][b.length()];
    }
}
