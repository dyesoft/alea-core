import { SECONDS_PER_MONTH } from './time.mjs';

/* Player names must be between 1 and 10 characters long. */
export const MIN_PLAYER_NAME_LENGTH = 1;
export const MAX_PLAYER_NAME_LENGTH = 10;

/* Email addresses are expected not to be longer than 128 characters. */
export const MAX_EMAIL_LENGTH = 128;

/* Names submitted when requesting a new room must not be longer than 64 characters. */
export const MAX_ROOM_REQUEST_NAME_LENGTH = 64;

/* Passwords must not be longer than 128 characters. */
export const MAX_PASSWORD_LENGTH = 128;

/* The maximum amount of time a player may be kicked from a room is one month (30 days). */
export const MAX_KICK_DURATION_SECONDS = SECONDS_PER_MONTH;

/* Room codes must be 4 characters long. */
export const ROOM_CODE_LENGTH = 4;
/* Exclude some letters from room codes because they look like other letters or numbers (I, O, and U). */
export const ROOM_CODE_CHARACTERS = 'ABCDEFGHJKLMNPQRSTVWXYZ';
