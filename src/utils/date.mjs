/* Given a Date object, return the ISO formatted string for the date only (e.g., "1991-04-18"). */
export function getISODateString(date) {
    return date.toISOString().substring(0, 10);
}

/* Given an ISO formatted date string (e.g., "1991-04-18"), return a Date object representing the given date. */
export function parseISODateString(date) {
    const [year, month, day] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
