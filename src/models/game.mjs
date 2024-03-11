import uuid from 'uuid';

/* A game contains fields necessary for keeping track of a single instance of a game within a room. */
export class Game {
    constructor(roomID, playerIDs) {
        this.gameID = uuid.v4();
        this.roomID = roomID;
        this.playerIDs = playerIDs || [];
        this.createdTime = new Date();
        this.finishedTime = null;

        this.scores = {};
        this.playerIDs.forEach(playerID => this.scores[playerID] = 0);
    }
}
