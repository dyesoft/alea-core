import { describe, expect, test } from '@jest/globals';
import { MILLISECONDS_PER_SECOND } from '../constants/time.mjs';
import {isSuperset, randomChoice, randomIndex, range, rotate, shuffle} from './common.mjs';

describe('range', () => {
    describe('returns the expected array for valid input', () => {
        test.each([
            [0, []],
            [1, [0]],
            [2, [0, 1]],
            [10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
        ])('range(%p) => %p', (n, expected) => {
            expect(range(n)).toEqual(expected);
        });
    });

    test('throws error for invalid input', () => {
        expect(() => range(-1)).toThrow(RangeError);
    });
});

describe('randomIndex', () => {
    test('returns undefined if array is empty', () => {
        expect(randomIndex([])).toBeUndefined();
    });

    test('returns zero for singleton array', () => {
        expect(randomIndex([1])).toEqual(0);
    });

    test('returns a valid index into the provided array', () => {
        const array = [1, 2, 3, 4];
        expect([0, 1, 2, 3]).toContain(randomIndex(array));
    });

    test('returns all indices into the provided array eventually', () => {
        const array = [1, 2, 3];
        const returnedIndices = new Set();
        while (returnedIndices.size < array.length) {
            returnedIndices.add(randomIndex(array));
        }
        // Either the loop will exit when all values have been returned at least once, or the test will time out and fail.
    }, 5 * MILLISECONDS_PER_SECOND);
});

describe('randomChoice', () => {
    test('returns undefined if array is empty', () => {
        expect(randomChoice([])).toBeUndefined();
    });

    test('returns value from singleton array', () => {
        expect(randomChoice([1])).toEqual(1);
    });

    test('returns one of the values from the provided array', () => {
        const values = [1, 2, 3, 4];
        expect(values).toContain(randomChoice(values));
    });

    test('returns all values from the provided array eventually', () => {
        const array = [1, 2, 3];
        const returnedValues = new Set();
        while (returnedValues.size < array.length) {
            returnedValues.add(randomChoice(array));
        }
        // Either the loop will exit when all values have been returned at least once, or the test will time out and fail.
    }, 5 * MILLISECONDS_PER_SECOND);
});

describe('rotate', () => {
    test('empty array', () => {
        expect(rotate([])).toEqual([]);
    });

    test('singleton array', () => {
        expect(rotate([1])).toEqual([1]);
    });

    describe('returns new array rotated by specified shift amount', () => {
        const originalArray = [1, 2, 3, 4];

        test.each([
            [originalArray, 1, [2, 3, 4, 1]],
            [originalArray, 2, [3, 4, 1, 2]],
            [originalArray, 3, [4, 1, 2, 3]],
            [originalArray, 4, originalArray],
            [originalArray, -1, [4, 1, 2, 3]],
        ])('rotate(%p, %p) => %p', (array, n, expected) => {
            expect(rotate(array, n)).toEqual(expected);
            expect(array).toEqual(originalArray);
        });
    });
});

describe('shuffle', () => {
    test('empty array', () => {
        expect(shuffle([])).toEqual([]);
    });

    test('singleton array', () => {
        expect(shuffle([1])).toEqual([1]);
    });

    test('returns new shuffled array', () => {
        const originalArray = [1, 2, 3, 4];
        const shuffled = shuffle(originalArray);
        expect(shuffled).not.toEqual(originalArray);
        expect(shuffled.sort()).toEqual(originalArray);
    });
});

describe('isSuperset', () => {
    const set1234 = new Set([1, 2, 3, 4]);

    describe('set A is a (proper) superset of set B', () => {
        test.each([
            [new Set(), new Set()],
            [set1234, new Set([1])],
            [set1234, new Set([1, 3, 4])],
            [set1234, set1234],
        ])('isSuperset(%p, %p) => true', (setA, setB) => {
            expect(isSuperset(setA, setB)).toBe(true);
        });
    });

    describe('set A is a proper subset of set B', () => {
        test.each([
            [new Set(), set1234],
            [new Set([1]), set1234],
            [new Set([1, 3, 4]), set1234],
        ])('isSuperset(%p, %p) => false', (setA, setB) => {
            expect(isSuperset(setA, setB)).toBe(false);
        });
    });

    describe('set B contains elements that are not in set A', () => {
        test.each([
            [set1234, new Set([1, 5])],
            [set1234, new Set([1, 2, 3, 4, 5])],
            [set1234, new Set([5, 6, 7, 8])],
        ])('isSuperset(%p, %p) => false', (setA, setB) => {
            expect(isSuperset(setA, setB)).toBe(false);
        });
    });
});
