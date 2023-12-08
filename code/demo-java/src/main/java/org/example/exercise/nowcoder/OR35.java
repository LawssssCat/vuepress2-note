package org.example.exercise.nowcoder;

/**
 * <a href="https://www.nowcoder.com/practice/e3a3a1a956914d8ca5688ea47a5cf9c9?tpId=182&&tqId=34761&rp=1&ru=/ta/exam-all&qru=/ta/exam-all/question-ranking">OR35 二叉树的序列化</a>
 * 递归
 * 树
 *
 * 中序遍历？
 */
public class OR35 {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(1);
        root.left.left = new TreeNode(1);
        root.left.left.left = new TreeNode(1);
        root.left.left.right = new TreeNode(1);
        root.right = new TreeNode(1);
        root.right.left = new TreeNode(1);
        root.right.left.left = new TreeNode(1);
        root.right.left.right = new TreeNode(1);
        root.right.right = new TreeNode(1);
        // (((()()))((()())()))
        OR35 or35 = new OR35();
        System.out.println(or35.toSequence(root));
    }
    static class TreeNode {
        int val = 0;
        TreeNode left = null;
        TreeNode right = null;
        public TreeNode(int val) {
            this.val = val;
        }
    }
    public String toSequence(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        _toSequence(root, sb);
        return sb.toString();
    }
    void _toSequence(TreeNode root, StringBuilder sb) {
        if(root==null) return;
        // write code here
        sb.append("(");
        _toSequence(root.left,sb);
//        sb.append(root.val);
        _toSequence(root.right,sb);
        sb.append(")");
    }
}
