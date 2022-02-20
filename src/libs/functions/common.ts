export const zeroPad = (num: number) => {
  const padded = `0${num}`;
  return padded.slice(-2);
};
