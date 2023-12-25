package org.example.exercise.leetcode;

/**
 * <a href="https://leetcode.cn/problems/maximum-subarray/">53. 最大子数组和</a>
 *
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */
public class NO53 {
    public static void main(String[] args) {
        test(new NO53());
        test(new SuperNO53());
    }
    static int run = 1;
    private static void test(NO53 no53) {
        System.out.println("============== test-"+(run++)+" =============");
        // 6
        System.out.println(no53.maxSubArray(new int[] {-2,1,-3,4,-1,2,1,-5,4}));
        // 1
        System.out.println(no53.maxSubArray(new int[] {1}));
        // 23
        System.out.println(no53.maxSubArray(new int[] {5,4,-1,7,8}));
    }

    public int maxSubArray(int[] nums) {
        int[] dp = new int[nums.length] ;
        dp[0] = nums[0];
        for(int i=1; i<nums.length; i++) {
            int cur = nums[i];
            dp[i] = Math.max(dp[i-1]+cur,cur);
        }
        int max = dp[0];
        for(int d : dp) {
            max = Math.max(max, d);
        }
        return max;
    }
    /**
     * 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
     */
    static class SuperNO53 extends NO53 {
        @Override
        public int maxSubArray(int[] nums) {
            // todo
            return super.maxSubArray(nums);
        }
    }
}
