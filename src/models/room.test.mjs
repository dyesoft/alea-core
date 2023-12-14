import bcrypt from 'bcryptjs';
import { describe, expect, test } from '@jest/globals';
import { Room, validateRoomCode } from './room.mjs';

describe('Room', () => {
  const roomCode = 'GAME';
  const ownerPlayerID = 'ownerPlayerID';

  describe('constructor', () => {
    test.each([
      undefined,
      null,
      '',
      'test',
      's3cR3t_p4s$',
    ])('password %p', (password) => {
      const room = new Room(roomCode, ownerPlayerID, password);
      expect(room.roomID).toBeDefined();
      expect(room.roomCode).toEqual(roomCode);
      expect(room.ownerPlayerID).toEqual(ownerPlayerID);
      expect(room.hostPlayerID).toEqual(ownerPlayerID);
      expect(room.playerIDs).toEqual([ownerPlayerID]);
      expect(room.kickedPlayerIDs).toEqual({});
      expect(room.currentGameID).toBeNull();
      expect(room.currentChampion).toBeNull();
      expect(room.currentWinningStreak).toEqual(0);
      expect(room.previousGameIDs).toEqual([]);
      expect(room.createdTime).toBeDateWithinTolerance();

      if (password) {
        expect(bcrypt.compareSync(password, room.passwordHash)).toBe(true);
      } else {
        expect(room.passwordHash).toBeNull();
      }
    });
  });
});

describe('validateRoomCode', () => {
  test.each([
    [undefined, false],
    [null, false],
    ['', false],
    ['A', false],      // too short
    ['AB', false],     // too short
    ['ABC', false],    // too short
    ['ABCD', true],
    ['GAME', true],
    ['UNDO', true],
    ['AZ49', true],
    ['1234', true],
    ['GAMER', false],  // too long
    ['GAMERS', false], // too long
    ['MO$T', false],   // invalid character ($)
    ['J!V3', false],   // invalid character (!)
    [' _^#', false],   // invalid characters
  ])('validateRoomCode(%p) => %p', (roomCode, expected) => {
    expect(validateRoomCode(roomCode)).toEqual(expected);
  });
});
