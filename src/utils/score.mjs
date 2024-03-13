import { PlayerStatsKeys } from '../models/index.mjs';

/* Mapping of keys (names) used in leaderboard statistics. */
export const LeaderboardKeys = {
    AVERAGE_SCORE: 'averageScore',
    HIGHEST_GAME_SCORE: PlayerStatsKeys.HIGHEST_GAME_SCORE,
    OVERALL_SCORE: PlayerStatsKeys.OVERALL_SCORE,
    WINNING_PERCENTAGE: 'winningPercentage',
};

const PLACE_NAMES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Honorable Mention'];
const MAX_PLACE_INDEX = PLACE_NAMES.length - 1;

/* Given a game and a list of players, return the current places for the active players in the game. */
export function getCurrentPlaces(game, players) {
    let scores = [];
    Object.entries(game.scores).forEach(([playerID, score]) => {
        const player = players.find(player => player.playerID === playerID);
        if (player && (!player.spectating || score !== 0)) {
            scores.push({...player, score: score});
        }
    });
    return getPlaces(scores);
}

/*
 * Given a list of players with scores, return the current places for the given players.
 *
 * Given:
 *   let players = [{playerID: playerID1, name: '1', score: 100}, {playerID: playerID2, name: '2', score: 1000}, ...];
 * Then getPlaces(players) would return a map like the following:
 *   {'1st': [{playerID: playerID2, name: '2', score: 1000}],
 *    '2nd': [{playerID: playerID1, name: '1', score: 100}],
 *    ...}
 */
export function getPlaces(scores) {
    let places = {};
    let i = 0;
    let prevScore = null;
    let players = [];
    scores.sort((player1, player2) => player2.score - player1.score).forEach(player => {
        const playerScore = {playerID: player.playerID, name: player.name, score: player.score};
        if (prevScore === null || player.score === prevScore || i === MAX_PLACE_INDEX) {
            players.push(playerScore);
        } else {
            places[PLACE_NAMES[i]] = players;
            i = Math.min(i + players.length, MAX_PLACE_INDEX);
            players = [playerScore];
        }
        prevScore = player.score;
    });
    if (players.length) {
        places[PLACE_NAMES[i]] = players;
    }
    return places;
}

/* Given a map of places returned by getPlaces, return the player ID of the current champion, or null if there is a tie. */
export function getCurrentChampion(places) {
    const winners = places[Object.keys(places)[0]];
    return (winners.length === 1 ? winners[0].playerID : null);
}

/* Given a player's statistics, return an augmented copy of the stats including computed leaderboard stats. */
export function getAugmentedPlayerStats(playerStats) {
    const overallScore = playerStats[PlayerStatsKeys.OVERALL_SCORE] || 0;
    const highestGameScore = playerStats[PlayerStatsKeys.HIGHEST_GAME_SCORE] || 0;
    const gamesPlayed = playerStats[PlayerStatsKeys.GAMES_PLAYED] || 0;
    const gamesWon = playerStats[PlayerStatsKeys.GAMES_WON] || 0;
    return {
        [PlayerStatsKeys.GAMES_PLAYED]: gamesPlayed,
        [PlayerStatsKeys.GAMES_WON]: gamesWon,
        [LeaderboardKeys.AVERAGE_SCORE]: Math.round(gamesPlayed === 0 ? 0 : (overallScore / gamesPlayed)),
        [LeaderboardKeys.HIGHEST_GAME_SCORE]: highestGameScore,
        [LeaderboardKeys.OVERALL_SCORE]: overallScore,
        [LeaderboardKeys.WINNING_PERCENTAGE]: Math.round((gamesPlayed === 0 ? 0 : (gamesWon / gamesPlayed)) * 100),
    };
}
