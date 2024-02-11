package org.example.framework.mockito;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class BaseTest {
    interface Star {
        void show();
    }

    class StarWrapper {
        private final Star star;

        StarWrapper(Star star) {
            this.star = star;
        }

        void show(int n) {
            for (int i = 0; i < n; i++) {
                star.show();
            }
        }
    }

    @Test
    public void testSpy() {
        Star mock = Mockito.mock(Star.class);
        StarWrapper starWrapper = new StarWrapper(mock);
        starWrapper.show(3);
        Mockito.verify(mock, Mockito.times(3)).show();
        starWrapper.show(1);
        Mockito.verify(mock, Mockito.times(4)).show();
    }
}
