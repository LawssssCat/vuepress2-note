package org.example.exercise.nowcoder;

import java.util.Arrays;
import java.util.Scanner;

/**
 * <a href="https://www.nowcoder.com/practice/cf24906056f4488c9ddb132f317e03bc?tpId=37&tqId=21266&ru=/exam/oj">HJ43 迷宫问题</a>
 */
public class HJ43 {
    public static void main(String[] args) {
        /*
         * (0,0)
         * (1,0)
         * (2,0)
         * (2,1)
         * (2,2)
         * (2,3)
         * (2,4)
         * (3,4)
         * (4,4)
         */
        xx("5 5\n" +
                "0 1 0 0 0\n" +
                "0 1 1 1 0\n" +
                "0 0 0 0 0\n" +
                "0 1 1 1 0\n" +
                "0 0 0 1 0");
        System.out.println("-----------------");
        /*
         * (0,0)
         * (1,0)
         * (2,0)
         * (3,0)
         * (4,0)
         * (4,1)
         * (4,2)
         * (4,3)
         * (4,4)
         */
        xx("5 5\n" +
                "0 1 0 0 0\n" +
                "0 1 0 1 0\n" +
                "0 0 0 0 1\n" +
                "0 1 1 1 0\n" +
                "0 0 0 0 0");
    }
    public static void xx(String input) {
        Scanner in = new Scanner(input);
        // 注意 hasNext 和 hasNextLine 的区别
        while (in.hasNextInt()) { // 注意 while 处理多个 case
            int n = in.nextInt(); // y
            int m = in.nextInt(); // x
            hash = new int[n][m];
            headTemp = new Node(-1,-1,null);
            headResult = null; //new Node(-1,-1,null);
            for(int y=0; y<n; y++) {
                for(int x=0; x<m; x++) {
                    hash[y][x] = in.nextInt();
                }
            }
            show(hash);
            dfs(0,0, m-1, n-1, m, n);
            show(hash);
            if(headResult!=null) headResult.show();
        }
    }

    private static void dfs(int ox, int oy, int tx, int ty, int maxX, int maxY) {
        if(ox<0||ox>=maxX || oy<0||oy>=maxY) return;
        if(hash[oy][ox]==0) {
            hash[oy][ox]=1;
            headTemp.add(new Node(ox, oy, null));
        } else {
            return;
        }
        if(ox==tx && oy==ty) {
            if(headResult==null || headResult.size()> headTemp.size()) {
                headResult = Node.cloneAA(headTemp);
            }
        } else {
            // left
            dfs(ox+1, oy, tx, ty, maxX, maxY);
            // down
            dfs(ox, oy+1, tx, ty, maxX, maxY);
            // right
            dfs(ox-1, oy, tx, ty, maxX, maxY);
            // top
            dfs(ox, oy-1, tx, ty, maxX, maxY);
        }

        hash[oy][ox]=0; // 回溯
        headTemp.removelast();
    }

    static int[][] hash;
    static Node headTemp;
    static Node headResult;
    static class Node {
        int[] data = new int[2];
        Node next;

        public Node(int x, int y, Node next) {
            data[1] = x;
            data[0] = y;
            this.next = next;
        }
        static Node cloneAA(Node head) {
            Node res = new Node(-1,-1,null);
            Node cur = head;
            Node resCur = res;
            while(cur.next!=null) {
                cur = cur.next;
                resCur.next = new Node(cur.data[0], cur.data[1], null);
                resCur = resCur.next;
            }
            return res;
        }
        int size() {
            int count = 0;
            Node cur = this;
            while(cur.next!=null) {
                count++;
                cur = cur.next;
            }
            return  count;
        }
        void add(Node n) {
            Node cur = this;
            while(cur.next!=null) {
                cur = cur.next;
            }
            cur.next = n;
        }
        void show() {
            Node cur = this;
            while(cur.next!=null) {
                cur = cur.next;
                System.out.println(Arrays.toString(cur.data));
            }
        }

        public void removelast() {
            Node pre = this;
            while(pre.next!=null) {
                if(pre.next.next==null) {
                    pre.next = null;
                    break;
                } else {
                    pre = pre.next;
                }
            }
        }
    }
    static void show(int[][] h) {
        System.out.println("len: "+h.length +"x"+ h[0].length);
        for(int[] x : h) {
            System.out.println(Arrays.toString(x));
        }
    }
}
