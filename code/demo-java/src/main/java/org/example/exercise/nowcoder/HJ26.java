package org.example.exercise.nowcoder;
import java.util.Scanner;
import java.util.Arrays;

/**
 * <a href="https://www.nowcoder.com/practice/5190a1db6f4f4ddb92fd9c365c944584?tpId=37&tqId=21249&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ26 字符串排序</a>
 */
public class HJ26 {
    public static void main(String[] args) {
        // A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).
        xx("A Famous Saying: Much Ado About Nothing (2012/8).");
    }
    /**
     * bubble 排序 n^2 时间复杂度
     * 有优化空间， n 时间复杂度 —— tips：按小写字母顺序遍历26次
     */
    public static void xx(String str) {
        Scanner in = new Scanner(str);
        // 注意 hasNext 和 hasNextLine 的区别
        // while (in.hasNextInt()) { // 注意 while 处理多个 case
        //     int a = in.nextInt();
        //     int b = in.nextInt();
        //     System.out.println(a + b);
        // }
        char[] input = in.nextLine().toCharArray();

        int n = 0;
        for(char c: input) {
            if(Character.isAlphabetic(c)) n++;
        }
        char[] temp = new char[n];
        n=0;
        for(char c:input) {
            if(Character.isAlphabetic(c)) {
                temp[n] = c;
                n++;
            }
        }
        // bubble
        // System.out.println(Arrays.toString(temp));
        n = temp.length;
        boolean swapped;
        do {
            swapped = false;
            for(int i=1; i<n; i++) {
                char t1 = Character.toLowerCase(temp[i-1]);
                char t2 = Character.toLowerCase(temp[i]);
                if(t2 < t1) {
                    char t = temp[i];
                    temp[i] = temp[i-1];
                    temp[i-1] = t;
                    swapped = true;
                }
            }
            n--;
        } while(swapped);
        // System.out.println(Arrays.toString(temp));
        //
        n = 0;
        for(int i=0; i<input.length;i++) {
            if(Character.isAlphabetic(input[i])) {
                input[i] = temp[n];
                n++;
            }
        }
        //
        System.out.println(String.valueOf(input));
    }
}
