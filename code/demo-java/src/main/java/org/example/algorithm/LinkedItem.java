package org.example.algorithm;

public class LinkedItem<T extends Comparable<T>> {
    private T data;
    private LinkedItem<T> next;

    public LinkedItem(T data, LinkedItem<T> next) {
        this.data = data;
        this.next = next;
    }

    public T getData() {
        return this.data;
    }
    public LinkedItem<T> getNext() {
        return this.next;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setNext(LinkedItem<T> next) {
        this.next = next;
    }
}
