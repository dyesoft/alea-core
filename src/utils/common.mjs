/* Return an array of the first n non-negative integers, similar to Python's built-in range() function. */
export function range(n) {
  return [...Array(n).keys()];
}

/* Given an array of values, return one of the values in the array at random. */
export function randomChoice(values) {
  return values[Math.floor(Math.random() * values.length)];
}

/* Given two sets, return true if and only if the first set contains all elements of the second set. */
export function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
