package org.example.algorithm;

public class LinkedBuilder<T extends Comparable<T>> {
    public LinkedItem<T> build(T[] arr) {
        LinkedItem<T> head = new LinkedItem<>(null, null);
        LinkedItem<T> cur = head;
        for(T t : arr) {
            cur.setNext(new LinkedItem<>(t, null));
            cur = cur.getNext();
        }
        return head;
    }
}
