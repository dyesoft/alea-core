export class WebsocketEvent {
  constructor(eventType, payload) {
    this.eventType = eventType;
    this.payload = payload;
  }
}

export class EventContext {
  static fromGame(game, playerID = null) {
    return new EventContext(game.roomID, game.gameID, playerID);
  }

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
