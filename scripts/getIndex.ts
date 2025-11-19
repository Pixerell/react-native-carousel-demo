export const getCircularIndex = (index: number, length: number): number => {
  return (index + length) % length;
};
