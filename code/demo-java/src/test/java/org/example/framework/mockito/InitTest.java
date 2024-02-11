package org.example.framework.mockito;

import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.example.algorithm.SortFunction;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class InitTest {
    @Mock
    private SortFunction<Integer> mockSortFunction;

    @Spy
    private SortFunction<Integer> spySortFunction;

    @BeforeAll
    public static void init() {
        log.info("hello world!");
    }

    @BeforeEach
    public void start() {
        log.info("mockSortFunction = " + mockSortFunction);
        log.info("spySortFunction = " + spySortFunction);
    }

    @Test
    public void testInit() {
        Assertions.assertThat(Mockito.mockingDetails(mockSortFunction).isMock()).isTrue();
        Assertions.assertThat(Mockito.mockingDetails(mockSortFunction).isSpy()).isFalse();
        Assertions.assertThat(Mockito.mockingDetails(spySortFunction).isMock()).isTrue();
        Assertions.assertThat(Mockito.mockingDetails(spySortFunction).isSpy()).isTrue();
    }
}
