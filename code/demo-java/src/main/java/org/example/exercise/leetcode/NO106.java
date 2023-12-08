package org.example.exercise.leetcode;

import java.util.HashMap;
import java.util.Map;

/**
 * 题： <a href="https://leetcode.cn/leetbook/read/data-structure-binary-tree/xo98qt/">LeetCode：106.从中序与后序遍历序列构造二叉树</a> <br>
 * 讲解|视频：  <a href="https://www.bilibili.com/video/BV1vW4y1i7dn/">代码随想录|106.从中序与后序遍历序列构造二叉树</a> <br>
 * 讲解|文字： <a href="https://programmercarl.com/0106.%E4%BB%8E%E4%B8%AD%E5%BA%8F%E4%B8%8E%E5%90%8E%E5%BA%8F%E9%81%8D%E5%8E%86%E5%BA%8F%E5%88%97%E6%9E%84%E9%80%A0%E4%BA%8C%E5%8F%89%E6%A0%91.html">代码随想录|106.从中序与后序遍历序列构造二叉树</a>
 */
public class NO106 {

     static class TreeNode {
         int val;
         TreeNode left;
         TreeNode right;
         TreeNode() {}
         TreeNode(int val) { this.val = val; }
         TreeNode(int val, TreeNode left, TreeNode right) {
             this.val = val;
             this.left = left;
             this.right = right;
         }
     }

    public TreeNode buildTree(int[] inorder, int[] postorder) {

        hashMap = new HashMap<>();
        for(int i=0; i<inorder.length ; i++) {
            hashMap.put(inorder[i] , i);
        }

        return bbbb(inorder, 0, inorder.length, postorder, 0, postorder.length);
    }

    private TreeNode bbbb(int[] inorder, int inbegin, int inend, int[] postorder, int postbegin, int postend) {

         if(postbegin >= postend || inbegin >= inend) {
             return null;
         }
        int v = postorder[postend-1];
        TreeNode cur = new TreeNode(v);
         int inmid = hashMap.get(v);
         int inleftLen = inmid - inbegin;
         cur.left = bbbb(inorder, inbegin, inmid,
                 postorder, postbegin, postbegin+inleftLen);
         cur.right = bbbb(inorder, inmid+1, inend,
                 postorder, postbegin+inleftLen, postend-1);
         return cur;
    }

    Map<Integer, Integer> hashMap;
}
