// both included, example : params (0-10) => result (0-10)
export function generateNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
