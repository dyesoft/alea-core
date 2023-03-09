export function getISODateString(date) {
  return date.toISOString().substring(0, 10);
}

export function parseISODateString(date) {
  const [year, month, day] = date.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
