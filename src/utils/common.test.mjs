import { describe, expect, test } from '@jest/globals';
import { MILLISECONDS_PER_SECOND } from '../constants/time.mjs';
import { isSuperset, randomChoice, range } from './common.mjs';

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

describe('randomChoice', () => {
  test('returns one of the elements from the provided values', () => {
    const values = [1, 2, 3, 4];
    expect(values).toContain(randomChoice(values));
  });

  test('returns all elements from the provided values eventually', () => {
    const values = [1, 2, 3];
    const returnedValues = new Set();
    while (returnedValues.size < values.length) {
      returnedValues.add(randomChoice(values));
    }
    // Either the loop will exit when all values have been returned at least once, or the test will time out and fail.
  }, 5 * MILLISECONDS_PER_SECOND);

  test('returns undefined if no values are provided', () => {
    expect(randomChoice([])).toBeUndefined();
  });
});

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
