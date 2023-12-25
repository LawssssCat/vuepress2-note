package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/66ca0e28f90c42a196afd78cc9c496ea?tpId=37&tqId=21256&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ33 整数与IP地址间的转换</a>
 */
public class HJ33 {
    public static void main(String[] args) {
        System.out.println(Integer.MAX_VALUE);
        // 167773121
        // 10.3.3.193
        xx("10.0.3.193\n" +
                "167969729");
        // 658654280
        // 230.150.208.159
        xx("39.66.68.72\n" +
                "3868643487");
        // 3868643487
        // 2147483647
    }

    private static void xx(String input) {
        Scanner in = new Scanner(input);
        System.out.println(toNumber(in.nextLine()));
        System.out.println(toIP(in.nextLong()));
    }

    private static String toIP(long value) {
        char[] perarr = new char[32];
        Arrays.fill(perarr, '0');
        String t = String.valueOf(perarr) + Long.toBinaryString(value);
        t = t.substring(t.length()-32);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            Integer v = Integer.valueOf(t.substring(i*8, (i+1)*8), 2);
            sb.append(v).append('.');
        }
        sb.deleteCharAt(sb.length()-1);
        return sb.toString();
    }

    private static long toNumber(String ip) {
        StringBuilder sb = new StringBuilder();
        String[] arr = ip.split("\\.");
//        System.out.println(Arrays.toString(arr));
        for (int i = 0; i < arr.length; i++) {
            String t = "00000000" + Integer.toBinaryString(Integer.parseInt(arr[i]));
            t = t.substring(t.length()-8);
//            System.out.println(t);
            sb.append(t);
        }
        return Long.parseLong(sb.toString(), 2);
    }
}
