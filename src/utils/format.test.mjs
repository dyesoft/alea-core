import { describe, expect, test } from '@jest/globals';
import { formatDate, formatList, formatScore, formatWeekday } from './format.mjs';

describe('formatDate', () => {
    const date = new Date(1991, 3, 18);
    const dateUTC = new Date(Date.UTC(1991, 3, 18));
    const fullDate = new Date(1991, 3, 18, 11, 22, 33);
    const fullDateUTC = new Date(Date.UTC(1991, 3, 18, 11, 22, 33));
    const dateString = '1991-04-18';
    const fullDateString = '1991-04-18T11:22:33Z';
    const fullDateStringMidnightUTC = '1991-04-18T00:00:00Z';
    const expectedDate = 'Apr 18, 1991';
    const expectedDateWithFullMonth = 'April 18, 1991';

    test.each([
        [date, false, expectedDate],
        [date, true, expectedDateWithFullMonth],
        [dateUTC, false, expectedDate],
        [dateUTC, true, expectedDateWithFullMonth],
        [fullDate, false, expectedDate],
        [fullDate, true, expectedDateWithFullMonth],
        [fullDateUTC, false, expectedDate],
        [fullDateUTC, true, expectedDateWithFullMonth],
        [dateString, false, expectedDate],
        [dateString, true, expectedDateWithFullMonth],
        [fullDateString, false, expectedDate],
        [fullDateString, true, expectedDateWithFullMonth],
        [fullDateStringMidnightUTC, false, expectedDate],
        [fullDateStringMidnightUTC, true, expectedDateWithFullMonth],
    ])('formatDate(%p, %p) => %p', (date, fullMonthName, expected) => {
        expect(formatDate(date, fullMonthName)).toEqual(expected);
    });
});

describe('formatWeekday', () => {
    test.each([
        ['1962-06-17', 'Sunday'],
        [new Date(1962, 5, 17), 'Sunday'],
        [new Date(Date.UTC(1962, 5, 17)), 'Sunday'],
        ['1991-04-18', 'Thursday'],
        [new Date(1991, 3, 18), 'Thursday'],
        [new Date(Date.UTC(1991, 3, 18)), 'Thursday'],
        ['1961-11-24', 'Friday'],
        [new Date(1961, 10, 24), 'Friday'],
        [new Date(Date.UTC(1961, 10, 24)), 'Friday'],
    ])('formatWeekday(%p) => %p', (date, expected) => {
        expect(formatWeekday(date)).toEqual(expected);
    });
});

describe('formatScore', () => {
    describe('default prefix', () => {
        test.each([
            [undefined, '$0'],
            [null, '$0'],
            [0, '$0'],
            [1, '$1'],
            [123, '$123'],
            [1234, '$1,234'],
            [1234567, '$1,234,567'],
            [-1, '-$1'],
            [-123, '-$123'],
            [-1234, '-$1,234'],
            [-1234567, '-$1,234,567'],
        ])('formatScore(%p) => %p', (score, expected) => {
            expect(formatScore(score)).toEqual(expected);
        });
    });

    test('custom prefix', () => {
        expect(formatScore(1234, '₪')).toEqual('₪1,234');
        expect(formatScore(-1234, '₪')).toEqual('-₪1,234');
    });
});

describe('formatList', () => {
    test.each([
        [undefined, ''],
        [null, ''],
        [[], ''],
        [['one'], 'one'],
        [['one', 'two'], 'one and two'],
        [['one', 'two', 'three'], 'one, two and three'],
        [['Dasher', 'Dancer', 'Prancer', 'Vixen'], 'Dasher, Dancer, Prancer and Vixen'],
    ])('formatList(%p) => %p', (items, expected) => {
        expect(formatList(items)).toEqual(expected);
    });
});
