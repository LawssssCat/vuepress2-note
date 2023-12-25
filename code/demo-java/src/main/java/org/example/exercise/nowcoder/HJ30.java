package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/d3d8e23870584782b3dd48f26cb39c8f?tpId=37&tqId=21253&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta">HJ30 字符串合并处理</a>
 * 字符串
 * 排序
 */
public class HJ30 {
    public static void main(String[] args) {
        // 5D37BF
        xx("dec fab");
        // 3B5D
        // 合并后为abCD，按奇数位和偶数位排序后是CDab（请注意要按ascii码进行排序，所以C在a前面，D在b前面），转换后为3B5D
        xx("ab CD");
        // 88C4A
        xx("123 15");
        // 8084842CAE9B9G7D7BUFooqqrrrvuxu
        xx("Eqr v9oEb12U2ur4xu7rd931G1f50qDo");
    }

    /**
     * 按照指定规则对输入的字符串进行处理。
     *
     * 详细描述：
     *
     * 第一步：将输入的两个字符串str1和str2进行前后合并。如给定字符串 "dec" 和字符串 "fab" ， 合并后生成的字符串为 "decfab"
     *
     * 第二步：对合并后的字符串进行排序，要求为：下标为奇数的字符和下标为偶数的字符分别从小到大排序。这里的下标的意思是字符在字符串中的位置。注意排序后在新串中仍需要保持原来的奇偶性。例如刚刚得到的字符串“decfab”，分别对下标为偶数的字符'd'、'c'、'a'和下标为奇数的字符'e'、'f'、'b'进行排序（生成 'a'、'c'、'd' 和 'b' 、'e' 、'f'），再依次分别放回原串中的偶数位和奇数位，新字符串变为“abcedf”
     *
     * 第三步：对排序后的字符串中的'0'~'9'、'A'~'F'和'a'~'f'字符，需要进行转换操作。
     * 转换规则如下：
     * 对以上需要进行转换的字符所代表的十六进制用二进制表示并倒序，然后再转换成对应的十六进制大写字符（注：字符 a~f 的十六进制对应十进制的10~15，大写同理）。
     * 如字符 '4'，其二进制为 0100 ，则翻转后为 0010 ，也就是 2 。转换后的字符为 '2'。
     * 如字符 ‘7’，其二进制为 0111 ，则翻转后为 1110 ，对应的十进制是14，转换为十六进制的大写字母为 'E'。
     * 如字符 'C'，代表的十进制是 12 ，其二进制为 1100 ，则翻转后为 0011，也就是3。转换后的字符是 '3'。
     * 根据这个转换规则，由第二步生成的字符串 “abcedf” 转换后会生成字符串 "5D37BF"。
     *
     * 数据范围：输入的字符串长度满足1≤n≤100
     *
     * @param input 样例输入两个字符串，用空格隔开。
     * @return 输出转化后的结果。
     */
    private static void xx(String input) {
        Scanner in = new Scanner(input);
        //
        char[] arr = in.nextLine().replace(" ", "").toCharArray();
        //
        sort(arr, 0);
        sort(arr, 1);
//        System.out.println(Arrays.toString(arr));
        //
        encrypt(arr);
        //
        System.out.println(String.valueOf(arr));
    }

    private static void encrypt(char[] arr) {
        for (int i = 0; i < arr.length; i++) {
            char c = arr[i];
            if(('0'<=c&&c<='9')
            || ('a'<=c&&c<='f')
            || ('A'<=c&&c<='F')) {
                int t;
                if(Character.isDigit(c)) {
                    t = c-'0';
                } else {
                    t = 10+Character.toLowerCase(c)-'a';
                }
                String s = "0000"+Integer.toBinaryString(t);
                s = s.substring(s.length()-4);
    //            System.out.println(c+" "+s);
                // reverse
                s = String.valueOf(reverse(s.toCharArray()));
                t = Integer.parseInt(s, 2);
    //            System.out.println(c + " " + t);
                c = Integer.toHexString(t).toUpperCase().charAt(0);
                arr[i] = c;
            }
        }
    }

    private static char[] reverse(char[] arr) {
        int a=0, b=arr.length-1;
        while(a<b) {
            char t = arr[a];
            arr[a] = arr[b];
            arr[b] = t;
            a++;
            b--;
        }
        return arr;
    }

    private static void sort(char[] arr, int il) {
        int n = arr.length;
        boolean swapped;
        do {
            swapped = false;
            for(int i=il+2; i<n; i+=2) {
                if(arr[i]<arr[i-2]) {
                    char t = arr[i];
                    arr[i] = arr[i-2];
                    arr[i-2] = t;
                    swapped = true;
                }
            }
            n --;
        } while(swapped);
    }
}
