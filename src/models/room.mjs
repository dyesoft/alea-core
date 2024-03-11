import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import { ROOM_CODE_LENGTH, PASSWORD_SALT_ROUNDS } from '../constants/index.mjs';

const ROOM_CODE_PATTERN = /^[A-Z0-9]+$/;

/* Validate that a room code is defined, has an acceptable length, and doesn't contain any invalid characters. */
export function validateRoomCode(roomCode) {
    return (!!roomCode && roomCode?.length === ROOM_CODE_LENGTH && ROOM_CODE_PATTERN.test(roomCode));
}

/* A room represents a private space for a group of players to play games together in isolation from other players. */
export class Room {
    constructor(roomCode, ownerPlayerID, password) {
        this.roomID = uuid.v4();
        this.roomCode = roomCode;
        this.passwordHash = (!!password ? bcrypt.hashSync(password, PASSWORD_SALT_ROUNDS) : null);
        this.ownerPlayerID = ownerPlayerID;
        this.hostPlayerID = ownerPlayerID;
        this.playerIDs = [ownerPlayerID];
        this.kickedPlayerIDs = {};
        this.currentGameID = null;
        this.currentChampion = null;
        this.currentWinningStreak = 0;
        this.previousGameIDs = [];
        this.createdTime = new Date();
    }
}
