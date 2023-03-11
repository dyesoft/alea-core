/* Enumeration of websocket event types. */
export const EventTypes = {
  /* connection events */
  CLIENT_CONNECT: 'client_connect',
  /* generic error events */
  ERROR: 'error',
  /* game events */
  GAME_CREATION_FAILED: 'game_creation_failed',
  GAME_STARTING: 'game_starting',
  GAME_STARTED: 'game_started',
  GAME_SETTINGS_CHANGED: 'game_settings_changed',
  GAME_ENDED: 'game_ended',
  /* room events */
  REASSIGN_ROOM_HOST: 'reassign_room_host',
  ROOM_HOST_REASSIGNED: 'room_host_reassigned',
  /* player events */
  PLAYER_CHANGED_SETTINGS: 'player_changed_settings',
  JOIN_ROOM: 'join_room',
  JOIN_ROOM_WITH_CODE: 'join_room_with_code',
  PLAYER_JOINED_ROOM: 'player_joined_room',
  LEAVE_ROOM: 'leave_room',
  PLAYER_LEFT_ROOM: 'player_left_room',
  JOIN_GAME: 'join_game',
  PLAYER_JOINED: 'player_joined',
  PLAYER_WENT_ACTIVE: 'player_went_active',
  PLAYER_WENT_INACTIVE: 'player_went_inactive',
  START_SPECTATING: 'start_spectating',
  PLAYER_STARTED_SPECTATING: 'player_started_spectating',
  STOP_SPECTATING: 'stop_spectating',
  PLAYER_STOPPED_SPECTATING: 'player_stopped_spectating',
  /* host-only events */
  ABANDON_GAME: 'abandon_game',
  HOST_ABANDONED_GAME: 'host_abandoned_game',
  KICK_PLAYER: 'kick_player',
  HOST_KICKED_PLAYER: 'host_kicked_player',
};

/* A websocket event has an event type and a payload. */
export class WebsocketEvent {
  constructor(eventType, payload) {
    this.eventType = eventType;
    this.payload = payload;
  }
}

/* The event context contains fields necessary to associate an event with a room, a game, and optionally a player. */
export class EventContext {
  /* Create a new event context from a game and optional player ID. */
  static fromGame(game, playerID = null) {
    return new EventContext(game.roomID, game.gameID, playerID);
  }

  /* Create a new event context from a map of properties (from a React component). */
  static fromProps(props) {
    const roomID = props.gameState?.roomID || props.roomID;
    const gameID = props.gameState?.gameID || props.game?.gameID || props.gameID;
    const playerID = props.gameState?.playerID || props.player?.playerID || props.playerID;
    return new EventContext(roomID, gameID, playerID);
  }

  constructor(roomID, gameID, playerID) {
    this.roomID = roomID;
    this.gameID = gameID;
    if (playerID) {
      this.playerID = playerID;
    }
  }
}
