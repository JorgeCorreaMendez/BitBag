const parseMillisecondsToMinutes = (milliseconds) => {
  let date = new Date(milliseconds);
  let seconds = date.getSeconds().toString();

  if (seconds.length == 1) {
    seconds = `0${seconds}`;
  }

  return `${date.getMinutes()}:${seconds}`;
};

export default { parseMillisecondsToMinutes };
