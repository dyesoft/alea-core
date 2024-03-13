import { describe, expect, test } from '@jest/globals';
import {getAugmentedPlayerStats, getCurrentChampion, getCurrentPlaces, getPlaces, LeaderboardKeys} from './score.mjs';
import {PlayerStatistics, PlayerStatsKeys} from "../models/index.mjs";

function playerScore(game, player) {
    return {playerID: player.playerID, name: player.name, score: game.scores[player.playerID] || 0};
}

describe('getPlaces', () => {
    const loser1 = {playerID: 'loser1', name: 'Loser 1', score: 1000};
    const loser2 = {playerID: 'loser2', name: 'Loser 2', score: 100};
    const loser3 = {playerID: 'loser3', name: 'Loser 3', score: 0};
    const loser4 = {playerID: 'loser4', name: 'Loser 4', score: 0};
    const loser5 = {playerID: 'loser5', name: 'Loser 5', score: 1000};
    const loser6 = {playerID: 'loser6', name: 'Loser 6', score: -100};
    const winner = {playerID: 'winner', name: 'Winner', score: 9999};

    test('no players', () => {
        expect(getPlaces([])).toEqual({});
    });

    test('one player', () => {
        expect(
            getPlaces([winner])
        ).toEqual({
            '1st': [winner],
        });
    });

    test('multiple players with no ties', () => {
        expect(
            getPlaces([loser1, loser2, loser3, winner])
        ).toEqual({
            '1st': [winner],
            '2nd': [loser1],
            '3rd': [loser2],
            '4th': [loser3],
        });
    });

    test('multiple players with a single tie', () => {
        expect(
            getPlaces([loser1, loser2, loser3, loser4, winner])
        ).toEqual({
            '1st': [winner],
            '2nd': [loser1],
            '3rd': [loser2],
            '4th': [loser3, loser4],
        });
    });

    test('multiple players with multiple ties', () => {
        expect(
            getPlaces([loser1, loser2, loser3, loser4, loser5, loser6, winner])
        ).toEqual({
            '1st': [winner],
            '2nd': [loser1, loser5],
            '4th': [loser2],
            '5th': [loser3, loser4],
            '7th': [loser6],
        });
    });

    test('all players tied', () => {
        expect(
            getPlaces([winner, winner, winner, winner])
        ).toEqual({
            '1st': [winner, winner, winner, winner],
        });
    });

    test('honorable mention', () => {
        expect(
            getPlaces([
                winner, winner, winner, winner,
                loser1, loser1, loser1,
                loser2, loser2, loser2,
                loser3, loser4,
            ])
        ).toEqual({
            '1st': [winner, winner, winner, winner],
            '5th': [loser1, loser1, loser1],
            '8th': [loser2, loser2, loser2],
            'Honorable Mention': [loser3, loser4],
        });
    });
});

describe('getCurrentPlaces', () => {
    test('computes places for all current players', () => {
        const loser1 = {playerID: 'loser1', name: 'Loser 1', spectating: false};
        const loser2 = {playerID: 'loser2', name: 'Loser 2', spectating: false};
        const spectator1 = {playerID: 'spectator1', name: 'Spectator 1', spectating: true};
        const spectator2 = {playerID: 'spectator2', name: 'Spectator 2', spectating: true};
        const winner = {playerID: 'winner', name: 'Winner', spectating: false};

        const game = {
            scores: {
                inactive: 1234567,
                [loser1.playerID]: 1000,
                [loser2.playerID]: 0,
                [spectator1.playerID]: 100,
                [spectator2.playerID]: 0,
                [winner.playerID]: 9999,
            },
        };
        // This array does not have the 'inactive' player, so their score will not be used.
        const players = [loser1, loser2, spectator1, spectator2, winner];

        // Since 'spectator2' is spectating and has no score, their score will not be used.
        expect(getCurrentPlaces(game, players)).toEqual({
            '1st': [playerScore(game, winner)],
            '2nd': [playerScore(game, loser1)],
            '3rd': [playerScore(game, spectator1)],
            '4th': [playerScore(game, loser2)],
        });
    });
});

describe('getCurrentChampion', () => {
    test('single champion', () => {
        expect(
            getCurrentChampion({
                '1st': [{playerID: 'winner'}],
                '2nd': [{playerID: 'loser1'}, {playerID: 'loser2'}],
            })
        ).toEqual('winner');
    });

    test('tie (two or more champions)', () => {
        expect(
            getCurrentChampion({
                '1st': [{playerID: 'winner1'}, {playerID: 'winner2'}],
                '3rd': [{playerID: 'loser'}],
            })
        ).toBeNull();
    })
});

describe('getAugmentedPlayerStats', () => {
    test('computes ratios if denominators are not zero', () => {
        const stats = new PlayerStatistics();
        stats[PlayerStatsKeys.GAMES_PLAYED] = 4;
        stats[PlayerStatsKeys.GAMES_WON] = 2;
        stats[PlayerStatsKeys.HIGHEST_GAME_SCORE] = 150;
        stats[PlayerStatsKeys.OVERALL_SCORE] = 400;
        const augmentedStats = getAugmentedPlayerStats(stats);
        Object.values(PlayerStatsKeys).forEach(key => expect(augmentedStats[key]).toEqual(stats[key]));
        expect(augmentedStats[LeaderboardKeys.AVERAGE_SCORE]).toEqual(100);
        expect(augmentedStats[LeaderboardKeys.WINNING_PERCENTAGE]).toEqual(50);
    });

    test('defaults ratios to zero if denominators are zero', () => {
        const stats = new PlayerStatistics();
        const augmentedStats = getAugmentedPlayerStats(stats);
        Object.values(PlayerStatsKeys).forEach(key => expect(augmentedStats[key]).toEqual(stats[key]));
        expect(augmentedStats[LeaderboardKeys.AVERAGE_SCORE]).toEqual(0);
        expect(augmentedStats[LeaderboardKeys.WINNING_PERCENTAGE]).toEqual(0);
    });
});
