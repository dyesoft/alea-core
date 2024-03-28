const DEFAULT_LOCALE = 'en';

/* Format a date (string or Date object) in a user-friendly way. */
export function formatDate(date, fullMonthName = false, locale = DEFAULT_LOCALE) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const monthOption = (fullMonthName ? 'long' : 'short');
    return new Intl.DateTimeFormat(locale, {
        month: monthOption,
        day: 'numeric',
        year: 'numeric',
        timeZone: 'GMT',
    }).format(date);
}

/* Format a date and time (string or Date object) in a user-friendly way. */
export function formatDateAndTime(date, fullMonthName = false, locale = DEFAULT_LOCALE) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const monthOption = (fullMonthName ? 'long' : 'short');
    return new Intl.DateTimeFormat(locale, {
        month: monthOption,
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'GMT',
    }).format(date);
}

/* Return the full name of the weekday (e.g., "Thursday") for the given date (string or Date object). */
export function formatWeekday(date, locale = DEFAULT_LOCALE) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return new Intl.DateTimeFormat(locale, {weekday: 'long', timeZone: 'GMT'}).format(date);
}

/* Given a numeric score, format the score in a user-friendly way with an optional prefix ("$" by default). */
export function formatScore(score, prefix = '$') {
    score = score || 0;
    const scoreString = score.toLocaleString();
    if (score < 0) {
        return `-${prefix}` + scoreString.substring(1);
    }
    return prefix + scoreString;
}

/* Given an array of values, format the values in a user-friendly way. */
export function formatList(items) {
    items = items || [];
    let result = '';
    items.forEach((item, i) => {
        result += item;
        if (i < items.length - 2) {
            result += ', ';
        } else if (i === items.length - 2) {
            result += ' and ';
        }
    });
    return result;
}
