//数字变列名
export const numberToCol = (num: number) => {
  let result = "";

  while (num > 0) {
    num--;
    result += String.fromCharCode(65 + (num % 26));
    num = Math.floor(num / 26);
  }

  return result;
};
