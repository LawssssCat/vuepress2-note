package org.example.algorithm;

/**
 * 冒泡排序 for 链表
 */
public class LinkedSortBubble<T extends Comparable<T>> implements LinkedSortFunction<T> {
    @Override
    public void sort(LinkedItem<T> head) {
        LinkedItem<T> cur = head;
        int n = count(head);
        boolean swapped;
        do {
            swapped = false;
            for(int i=1; i<n; i++) {
                LinkedItem<T> a = cur.getNext();
                LinkedItem<T> b = cur.getNext().getNext();
                if(a.getData().compareTo(b.getData())>0) {
                    { // 1. swap
                        cur.setNext(b);
                        a.setNext(b.getNext());
                        b.setNext(a);
                    }
                    swapped = true;
                }
                cur = cur.getNext(); // 2. next
            }
            n--;
            cur = head; // 3. reset
        } while(swapped);
    }

    public static void main(String[] args) {
        Integer[] arr = {2,5,9,3,7,6,0,1,99,22,44,4,8};
        LinkedItem<Integer> head = new LinkedBuilder<Integer>().build(arr);
        LinkedSortBubble<Integer> function = new LinkedSortBubble<>();
        function.show(head);
        function.sort(head);
        function.show(head); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 22, 44, 99]
    }
}
