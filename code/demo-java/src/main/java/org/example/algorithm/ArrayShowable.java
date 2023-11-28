package org.example.algorithm;

import java.util.Arrays;

public interface ArrayShowable {
    default void show(Object[] arr) {
        System.out.println(Arrays.toString(arr)+" "+arr.length);
    }
}
