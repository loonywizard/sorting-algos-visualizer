import { generateRandomNumber } from './generateRandomNumber'


/*
 * generates array of length n of random numbers between min and max
 */
function generateRandomArray({ n, min, max }) {
  const arr = []

  for (let i = 0; i < n; i++) {
    arr.push(generateRandomNumber(min, max))
  }

  return arr
}

export { generateRandomArray }
