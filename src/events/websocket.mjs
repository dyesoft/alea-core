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
