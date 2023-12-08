package org.example.exam.hod;

/**
 * 判断回文
 */
public class E2jm1_231208 {
    public static void main(String[] args) {
        System.out.println(solution(121));
        System.out.println(solution(112211));
        System.out.println(solution(123321));
        System.out.println(solution(123311211));
        System.out.println(solution(12313221));
    }
    protected static boolean solution(int input) {
        input = input<0?input*-1:input;
        String str = String.valueOf(input);
        int i=0; int j=str.length()-1;
        while(i<j) {
            if(str.charAt(i) != str.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
