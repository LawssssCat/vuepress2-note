package org.example.exercise.nowcoder;

import java.util.*;

/**
 * <a href="https://www.nowcoder.com/practice/5427af99168b45f4a14aec195b28a839?tpId=182&&tqId=34439&rp=1&ru=/activity/oj&qru=/ta/exam-all/question-ranking">MT44 图的遍历</a> <br>
 * 图
 * 树
 * 递归
 * 贪心
 *
 * <p>
 *     题解： <a href="https://blog.nowcoder.net/n/10cb1e767e89480c85c752b14468cbc3">https://blog.nowcoder.net/n/10cb1e767e89480c85c752b14468cbc3</a> <br>
 * 走完所有节点类似于深度优先搜索，也就是说除了最后一条路径外，别的路径都经历了正着走，再返回的过程，也就是两遍，设最后一条路径为x，总分支数为n-1，总路径=2*(n-1-x)+x=2*n-2-x，
 * 当x最大时总路径最小，所以转化为求二叉树的深度。
 * 所以现在的首要问题是找最长路径， 采用递归方式找，可以用 visited 标记哪些节点是否走过的，防止走回头路
 * </p>
 */
public class MT44 {
    public static void main(String[] args) {
        // 4
        xx("4\n" +
                "1 2\n" +
                "1 3\n" +
                "3 4");
        // 1
        xx("2\n" +
                "1 2");
    }
    static void xx(String input) {
        Scanner in = new Scanner(input);
        int n = Integer.parseInt(in.nextLine());
        List<Integer>[] lists = new LinkedList[n];
        for(int i=0; i<lists.length ; i++) {
            lists[i] = new LinkedList<>();
        }
        //
        for(int i=0; i<n-1; i++) {
            int from = in.nextInt();
            int to = in.nextInt();
            lists[from - 1].add(to);
            lists[to - 1].add(from);
        }
        //
        int max = bfs(lists);
        int min = 2*(n-1) - (max - 1); // max - 1 ==> 排除开头节点
        System.out.println(min);
        // }
    }
    // 广度遍历
    // 用 bfs 算点到最远点的距离
    static int bfs(List<Integer>[] lists) {
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[lists.length];
        visited[0] = true; // 第一个节点访问后，放入队列！
        queue.offer(1);
        int count = 0;
        while(!queue.isEmpty()) {
            int size = queue.size();
            while(size-- > 0){
                Integer node = queue.poll();
                List<Integer> list = lists[node-1];
                // 链表，不要使用这种遍历！！！！！！！！！！！！！！！！！
//                for(int i=0; i<list.size(); i++) {
//                    int index = list.get(i);
//                    if(!visited[index-1]) {
//                        queue.offer(index);
//                        visited[index-1] = true;
//                    }
//                }
                Iterator<Integer> iterator = list.iterator();
                while(iterator.hasNext()) {
                    Integer index = iterator.next();
                    if(!visited[index-1]) {
                        queue.offer(index);
                        visited[index-1] = true;
                    }
                }
            }
            count++; // deep level plus !
        }
        return count;
    }
}