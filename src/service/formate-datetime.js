function formateDatetime(datetime) {
  const formatter = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  return new Date( Date.parse(datetime) ).toLocaleString('ru', formatter);
}

export default formateDatetime;
