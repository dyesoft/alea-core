import uuid from 'uuid';
import { MAX_PLAYER_NAME_LENGTH, MIN_PLAYER_NAME_LENGTH } from '../constants/index.mjs';

export function comparePlayerNames(player1, player2) {
  return player1.name.toLowerCase().localeCompare(player2.name.toLowerCase());
}

export function comparePlayerEntries([id1, player1], [id2, player2]) {
  return comparePlayerNames(player1, player2);
}

export function validatePlayerName(name) {
  return (!!name && name?.length >= MIN_PLAYER_NAME_LENGTH && name?.length <= MAX_PLAYER_NAME_LENGTH);
}

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
  }
}
