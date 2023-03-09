import { describe, expect, test } from '@jest/globals';
import { EventContext, WebsocketEvent } from './websocket.mjs';

describe('EventContext', () => {
  const roomID = 'roomID';
  const gameID = 'gameID';
  const playerID = 'playerID';

  describe('constructor', () => {
    test('with player ID', () => {
      const context = new EventContext(roomID, gameID, playerID);
      expect(context.roomID).toEqual(roomID);
      expect(context.gameID).toEqual(gameID);
      expect(context.playerID).toEqual(playerID);
    });

    test.each([undefined, null])('no player ID (%p)', (playerID) => {
      const context = new EventContext(roomID, gameID, playerID);
      expect(context.roomID).toEqual(roomID);
      expect(context.gameID).toEqual(gameID);
      expect(context.playerID).toBeUndefined();
      expect(context.hasOwnProperty('playerID')).toBe(false);
    });
  });

  describe('fromGame', () => {
    const game = {roomID: roomID, gameID: gameID};
    test('with player ID', () => {
      const context = EventContext.fromGame(game, playerID);
      expect(context.roomID).toEqual(roomID);
      expect(context.gameID).toEqual(gameID);
      expect(context.playerID).toEqual(playerID);
    });

    test('no player ID', () => {
      const context = EventContext.fromGame(game);
      expect(context.roomID).toEqual(roomID);
      expect(context.gameID).toEqual(gameID);
      expect(context.playerID).toBeUndefined();
      expect(context.hasOwnProperty('playerID')).toBe(false);
    });
  });

  describe('fromProps', () => {
    const otherGameID = 'otherGameID';
    const otherPlayerID = 'otherPlayerID';

    test.each([
      ['gameState takes precedence', {
        gameState: {
          roomID: roomID,
          gameID: gameID,
          playerID: playerID,
        },
        game: {gameID: otherGameID},
        gameID: otherGameID,
        player: {playerID: otherPlayerID},
        playerID: otherPlayerID,
      }],
      ['incomplete gameState', {
        gameState: {
          roomID: roomID,
        },
        game: {gameID: gameID},
        playerID: playerID,
      }],
      ['fall back to game.gameID', {
        roomID: roomID,
        game: {gameID: gameID},
        gameID: otherGameID,
        playerID: playerID,
      }],
      ['fall back to player.playerID', {
        roomID: roomID,
        gameID: gameID,
        player: {playerID: playerID},
        playerID: otherPlayerID,
      }],
      ['fall back to bare IDs', {
        roomID: roomID,
        gameID: gameID,
        playerID: playerID,
      }],
    ])('%s', (_, props) => {
      const context = EventContext.fromProps(props);
      expect(context.roomID).toEqual(roomID);
      expect(context.gameID).toEqual(gameID);
      expect(context.playerID).toEqual(playerID);
    });
  });
});

describe('WebsocketEvent', () => {
  test('constructor', () => {
    const eventType = 'TEST_EVENT';
    const payload = {test: true};
    const event = new WebsocketEvent(eventType, payload);
    expect(event.eventType).toEqual(eventType);
    expect(event.payload).toEqual(payload);
  });
});
