export function range(n) {
  return [...Array(n).keys()];
}

export function randomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

export function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
