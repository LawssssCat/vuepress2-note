package org.example.exercise.nowcoder;

import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/02cb8d3597cf416d9f6ae1b9ddc4fde3">HJ45 名字的漂亮度</a>
 */
public class HJ45 {
    public static void main(String[] args) {
        /**
         * 192
         * 101
         */
        XX("2\n" +
            "zhangsan\n" +
            "lisi");
    }
    public static void XX(String testcontent) {
        Scanner in = new Scanner(testcontent);
        // 注意 hasNext 和 hasNextLine 的区别
        while (in.hasNextInt()) { // 注意 while 处理多个 case
            int n = Integer.valueOf(in.nextLine());
            for(int i=0; i<n ; i++) {
                int[] arr = new int[128];
                //
                String s = in.nextLine();
                for(char c : s.toCharArray()) {
                    arr[c]++;
                }
                // bubble
                int l = arr.length;
                boolean swapped ;
                do {
                    swapped = false;
                    for(int j=1; j<l; j++) {
                        if(arr[j]>arr[j-1]) {
                            int t = arr[j];
                            arr[j] = arr[j-1];
                            arr[j-1] = t;
                            swapped = true;
                        }
                    }
                    l--;
                } while(swapped);

                //
                int count = 0;
                int m = 26;
                int iii = 0;
                while(arr[iii]>0) {
                    int ccc = arr[iii];
                    count += (ccc*m);
                    m --;
                    iii++;
                }
                //
                System.out.println(count);
            }
        }
    }
}
