package org.example.algorithm;

public interface LinkedSortFunction<T extends Comparable<T>> {
    void sort(LinkedItem<T> head);
    default int count(LinkedItem<T> head) {
        int count = 0;
        LinkedItem<T> cur = head;
        while(cur.getNext()!=null) {
            cur = cur.getNext();
            count ++ ;
        }
        return count;
    }
    default void show(LinkedItem<T> head) {
        LinkedItem<T> cur = head;
        StringBuilder sb = new StringBuilder();
        sb.append('[');
        while(cur.getNext()!=null) {
            cur = cur.getNext();
            sb.append(cur.getData()).append(',').append(' ');
        }
        if(sb.length()>1) sb.delete(sb.length()-2, sb.length());
        sb.append(']').append(' ').append(count(head));
        System.out.println(sb.toString());
    }
}
