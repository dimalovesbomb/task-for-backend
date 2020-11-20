export function formateDatetimeUTC(datetime) {
  const formatter = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  return new Date( Date.parse(datetime) ).toLocaleString('ru', formatter);
}

export function formateDatetimeStamp(timestamp) {
  const formatter = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
  };

  return new Date(+timestamp).toLocaleString('ru', formatter);
}
