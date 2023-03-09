import { describe, expect, test } from '@jest/globals';
import { getISODateString, parseISODateString } from './date.mjs';

const DATE = new Date(1991, 3, 18);
const DATE_UTC = new Date(Date.UTC(1991, 3, 18));
const DATE_STRING = '1991-04-18';

describe('getISODateString', () => {
  test('returns the correct ISO string', () => {
    expect(getISODateString(DATE)).toEqual(DATE_STRING);
    expect(getISODateString(DATE_UTC)).toEqual(DATE_STRING);
  });
});

describe('parseISODateString', () => {
  test('returns the correct date', () => {
    expect(parseISODateString(DATE_STRING)).toEqual(DATE);
  });
});
