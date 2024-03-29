import uuid from 'uuid';
import { MAX_PLAYER_NAME_LENGTH, MIN_PLAYER_NAME_LENGTH } from '../constants/index.mjs';

/* Comparison function to sort players by name. */
export function comparePlayerNames(player1, player2) {
    return player1.name.toLowerCase().localeCompare(player2.name.toLowerCase());
}

/*
 * Comparison function to sort entries from a map of players by name.
 *
 * Given:
 *   let players = {playerID1: player1, playerID2: player2, ...};
 * This function can be used to get a sorted list of player entries ([playerID, player]) as follows:
 *   let sortedPlayerEntries = Object.entries(players).sort(comparePlayerEntries);
 */
export function comparePlayerEntries([id1, player1], [id2, player2]) {
    return comparePlayerNames(player1, player2);
}

/* Validate that a player's name is defined and has an acceptable length. */
export function validatePlayerName(name) {
    return (!!name && name?.length >= MIN_PLAYER_NAME_LENGTH && name?.length <= MAX_PLAYER_NAME_LENGTH);
}

/* Mapping of keys (names) used in player statistics. */
export const PlayerStatsKeys = {
    GAMES_PLAYED: 'gamesPlayed',
    GAMES_WON: 'gamesWon',
    HIGHEST_GAME_SCORE: 'highestGameScore',
    OVERALL_SCORE: 'overallScore',
};

/* The set of statistics that are maintained for each player. */
export class PlayerStatistics {
    constructor() {
        this[PlayerStatsKeys.GAMES_PLAYED] = 0;
        this[PlayerStatsKeys.GAMES_WON] = 0;
        this[PlayerStatsKeys.HIGHEST_GAME_SCORE] = 0;
        this[PlayerStatsKeys.OVERALL_SCORE] = 0;
    }
}

/* A player contains fields necessary for keeping track of an individual player in a game or room. */
export class Player {
    constructor(name, email, spectating) {
        this.playerID = uuid.v4();
        this.currentRoomID = null;
        this.name = name;
        this.email = email || null;
        this.spectating = spectating ?? false;
        this.active = true;
        this.createdTime = new Date();
        this.lastConnectionTime = new Date();
        this.stats = new PlayerStatistics();
    }
}
