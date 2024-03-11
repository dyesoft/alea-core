import { expect } from '@jest/globals';

const DEFAULT_TIMESTAMP_TOLERANCE_MILLIS = 1000;

expect.extend({
    toBeDateWithinTolerance(received, tolerance = DEFAULT_TIMESTAMP_TOLERANCE_MILLIS) {
        const now = new Date().getTime();
        const delta = now - received.getTime();
        return (delta < tolerance ?
                {
                    pass: true,
                    message: `Expected ${received} not to be within ${tolerance.toLocaleString()} ms of the current time`
                } :
                {
                    pass: false,
                    message: `Expected ${received} to be within ${tolerance.toLocaleString()} ms of the current time`
                }
        );
    }
});
