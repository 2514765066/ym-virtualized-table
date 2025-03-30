export const createArray = (row: number, col: number) => {
  return new Array(row).fill("").map(() => new Array(col).fill(""));
};
