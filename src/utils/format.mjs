const DEFAULT_LOCALE = 'en';

export function formatDate(date, fullMonthName = false) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const monthOption = (fullMonthName ? 'long' : 'short');
  const month = new Intl.DateTimeFormat(DEFAULT_LOCALE, {month: monthOption, timeZone: 'GMT'}).format(date);
  const day = new Intl.DateTimeFormat(DEFAULT_LOCALE, {day: 'numeric', timeZone: 'GMT'}).format(date);
  const year = new Intl.DateTimeFormat(DEFAULT_LOCALE, {year: 'numeric', timeZone: 'GMT'}).format(date);
  return `${month} ${day}, ${year}`;
}

export function formatWeekday(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {weekday: 'long', timeZone: 'GMT'}).format(date);
}

export function formatScore(score, prefix = '$') {
  score = score || 0;
  const scoreString = score.toLocaleString();
  if (score < 0) {
    return `-${prefix}` + scoreString.substring(1);
  }
  return prefix + scoreString;
}

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
