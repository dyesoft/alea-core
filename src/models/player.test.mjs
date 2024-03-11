import { describe, expect, test } from '@jest/globals';
import {
    comparePlayerEntries,
    comparePlayerNames,
    Player,
    PlayerStatistics,
    PlayerStatsKeys,
    validatePlayerName,
} from './player.mjs';

describe('comparePlayerEntries', () => {
    test('compares entries by name', () => {
        expect(comparePlayerEntries(['b', {name: 'Alice'}], ['a', {name: 'Bob'}])).toBeLessThan(0);
        expect(comparePlayerEntries(['a', {name: 'Bob'}], ['b', {name: 'Alice'}])).toBeGreaterThan(0);
        expect(comparePlayerEntries(['b', {name: 'Alice'}], ['a', {name: 'Alice'}])).toBe(0);
    });
});

describe('comparePlayerNames', () => {
    test('returns the correct comparison result', () => {
        expect(comparePlayerNames({name: 'Alice'}, {name: 'Bob'})).toBeLessThan(0);
        expect(comparePlayerNames({name: 'Bob'}, {name: 'Alice'})).toBeGreaterThan(0);
        expect(comparePlayerNames({name: 'Alice'}, {name: 'Alice'})).toBe(0);
    });

    test('compares names case-insensitively', () => {
        expect(comparePlayerNames({name: 'alice'}, {name: 'Bob'})).toBeLessThan(0);
        expect(comparePlayerNames({name: 'bob'}, {name: 'ALICE'})).toBeGreaterThan(0);
        expect(comparePlayerNames({name: 'alice'}, {name: 'AlIcE'})).toBe(0);
    });
});

describe('validatePlayerName', () => {
    test.each([
        [undefined, false],
        [null, false],
        ['', false],
        ['A', true],
        ['Al', true],
        ['Ann', true],
        ['foobar', true],
        ['1337_H4x$', true],
        ['Intuitions', true],
        ['Stupidities', false],      // too long
        ['really_long_name', false], // too long
    ])('validatePlayerName(%p) => %p', (name, expected) => {
        expect(validatePlayerName(name)).toEqual(expected);
    });
});

describe('PlayerStatistics', () => {
    test('constructor', () => {
        const stats = new PlayerStatistics();
        verifyPlayerStatistics(stats);
    });
});

describe('Player', () => {
    const name = 'Test';
    const email = 'test@example.com';

    describe('constructor', () => {
        test('name only', () => {
            const player = new Player(name);
            verifyPlayer(player, name, null, false);
        });

        test('name and email', () => {
            const player = new Player(name, email);
            verifyPlayer(player, name, email, false);
        });

        test('name, email, and spectating', () => {
            const player = new Player(name, email, true);
            verifyPlayer(player, name, email, true);
        });
    });
});

function verifyPlayerStatistics(stats) {
    expect(stats).toEqual({
        [PlayerStatsKeys.GAMES_PLAYED]: 0,
        [PlayerStatsKeys.GAMES_WON]: 0,
        [PlayerStatsKeys.HIGHEST_GAME_SCORE]: 0,
        [PlayerStatsKeys.OVERALL_SCORE]: 0,
    });
}

function verifyPlayer(player, expectedName, expectedEmail, expectedSpectating) {
    expect(player.playerID).toBeDefined();
    expect(player.currentRoomID).toBeNull();
    expect(player.name).toEqual(expectedName);
    expect(player.email).toEqual(expectedEmail);
    expect(player.spectating).toEqual(expectedSpectating);
    expect(player.active).toBe(true);
    expect(player.createdTime).toBeDateWithinTolerance();
    expect(player.lastConnectionTime).toBeDateWithinTolerance();
    verifyPlayerStatistics(player.stats);
}
