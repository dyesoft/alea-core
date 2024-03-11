/* Return an array of the first n non-negative integers, similar to Python's built-in range() function. */
export function range(n) {
    return [...Array(n).keys()];
}

/* Given an array of values, return a valid index in the array at random. */
export function randomIndex(array) {
    return (array?.length ? Math.floor(Math.random() * array.length) : undefined);
}

/* Given an array of values, return one of the values in the array at random. */
export function randomChoice(array) {
    return array[randomIndex(array)];
}

/*
 * Given an array of values and a shift amount, return a copy of the array rotated left by the given amount.
 * Reference: https://stackoverflow.com/a/1985308.
 */
export function rotate(array, n = 1) {
    n = n % array.length;
    return array.slice(n, array.length).concat(array.slice(0, n));
}

/*
 * Given an array of values, return a copy of the array with the values shuffled into a random order.
 * Reference: https://stackoverflow.com/a/12646864.
 */
export function shuffle(array) {
    let shuffled = array.slice(0);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
