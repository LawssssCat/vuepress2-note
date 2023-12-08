package org.example.exercise.nowcoder;

/**
 * <a href="https://www.nowcoder.com/practice/6032826d387c4a10ad3690cce5fdb015?tpId=196&tqId=39341&rp=1&ru=/exam/company">NC183 最长公共子数组</a>
 * 动态规划
 * <h3>讲解：</h3>
 * <ul>
 *     <li>
 *      视频： <a href="https://www.bilibili.com/video/BV178411H7hV/">动态规划子序列问题经典题目 | LeetCode：1143.最长公共子序列</a> <br>
 *      文字： <a href="https://programmercarl.com/0718.%E6%9C%80%E9%95%BF%E9%87%8D%E5%A4%8D%E5%AD%90%E6%95%B0%E7%BB%84.html" >1143.最长公共子序列</a>
 *     </li>
 * </ul>
 */
public class NC183 {
    public static void main(String[] args) {
        NC183 nc183 = new NC183();
        // 2
        System.out.println(nc183.longestCommonSubarry(new int[]{1, 2}, new int[]{1, 2}));
        // 3
        System.out.println(nc183.longestCommonSubarry(new int[]{1,2,5,5,7,8}, new int[]{2,5,7,8,5}));
        // 1
        System.out.println(nc183.longestCommonSubarry(new int[]{1, 2}, new int[]{1,3,2}));
    }
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     *
     *
     * @param A int整型一维数组
     * @param B int整型一维数组
     * @return int整型
     */
    public int longestCommonSubarry (int[] A, int[] B) {
        // write code here
        int[][] hash = new int[A.length+1][B.length+1];
        int result = 0;
        for(int i=1; i<A.length+1; i++) {
            for(int j=1; j<B.length+1; j++) {
                if(A[i-1]==B[j-1]) {
                    hash[i][j] = hash[i-1][j-1]+1;
                    result = Math.max(result, hash[i][j]);
                }
            }
        }
        return result;
    }
}
