let min = 100000;
let max = 999999;

function randomNumber(min: number, max: number) {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

export default randomNumber(min, max);
