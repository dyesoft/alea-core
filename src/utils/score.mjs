const PLACE_NAMES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Honorable Mention'];
const MAX_PLACE_INDEX = PLACE_NAMES.length - 1;

export function getCurrentPlaces(game, players) {
  let scores = [];
  Object.entries(game.scores).forEach(([playerID, score]) => {
    const player = players.find(player => player.playerID === playerID);
    if (player && (!player.spectating || score !== 0)) {
      scores.push({...player, score: score});
    }
  });
  return getPlaces(scores);
}

export function getPlaces(scores) {
  let places = {};
  let i = 0;
  let prevScore = null;
  let players = [];
  scores.sort((player1, player2) => player2.score - player1.score).forEach(player => {
    const playerScore = {playerID: player.playerID, name: player.name, score: player.score};
    if (prevScore === null || player.score === prevScore || i === MAX_PLACE_INDEX) {
      players.push(playerScore);
    } else {
      places[PLACE_NAMES[i]] = players;
      i = Math.min(i + players.length, MAX_PLACE_INDEX);
      players = [playerScore];
    }
    prevScore = player.score;
  });
  if (players.length) {
    places[PLACE_NAMES[i]] = players;
  }
  return places;
}

export function getCurrentChampion(places) {
  const winners = places[Object.keys(places)[0]];
  return (winners.length === 1 ? winners[0].playerID : null);
}
