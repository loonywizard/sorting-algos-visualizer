/*
 * swaps two given elements in a given array
 */
function swap(arr, firstElementIndex, secondElementIndex) {
  const t = arr[firstElementIndex]
  arr[firstElementIndex] = arr[secondElementIndex]
  arr[secondElementIndex] = t
}

export { swap }
