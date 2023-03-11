import { describe, expect, test } from '@jest/globals';
import { Game } from './game.mjs';

describe('Game', () => {
  describe('constructor', () => {
    const roomID = 'roomID';

    test('room ID only', () => {
      const game = new Game(roomID);
      verifyGame(game, roomID, [], {});
    });

    test('room ID and player IDs', () => {
      const playerIDs = ['player1', 'player2'];
      const game = new Game(roomID, playerIDs);
      verifyGame(game, roomID, playerIDs, {'player1': 0, 'player2': 0});
    });
  });
});

function verifyGame(game, expectedRoomID, expectedPlayerIDs, expectedScores) {
  expect(game.gameID).toBeDefined();
  expect(game.roomID).toEqual(expectedRoomID);
  expect(game.playerIDs).toEqual(expectedPlayerIDs);
  expect(game.scores).toEqual(expectedScores);
  expect(game.createdTime).toBeDateWithinTolerance();
  expect(game.finishedTime).toBeNull();
}
