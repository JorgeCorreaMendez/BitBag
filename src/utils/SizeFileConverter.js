const getMBFrom = (byte) => {
  return (byte / 1048576).toFixed(3);
};

export default { getMBFrom };
