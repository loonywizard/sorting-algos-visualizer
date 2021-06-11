/*
 * generates random number between min and max
 */
function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export { generateRandomNumber }
