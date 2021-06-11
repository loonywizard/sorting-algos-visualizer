import { wait } from '../utils/wait'
import { LEFT_ITEM_CSS_CLASS, SAME_ITEM_CSS_CLASS, RIGHT_ITEM_CSS_CLASS } from '../consts'


/*
 * merge sort visualization
 */
async function mergeSort(arr, htmlElements, shiftIndex = 0) {
  if (arr.length < 2) return arr

  const middleElementIndex = Math.round(arr.length / 2)

  htmlElements[middleElementIndex + shiftIndex].classList.add(SAME_ITEM_CSS_CLASS)
  await wait()
  htmlElements[middleElementIndex + shiftIndex].classList.remove(SAME_ITEM_CSS_CLASS)
  
  const leftElements = arr.slice(0, middleElementIndex)
  const rightElements = arr.slice(middleElementIndex)

  const sortedLeftElements = await mergeSort(leftElements, htmlElements, shiftIndex)
  const sortedRightElements = await mergeSort(rightElements, htmlElements, shiftIndex + middleElementIndex)

  let i = 0, j = 0, k = 0

  while (i < sortedLeftElements.length && j < sortedRightElements.length) {
    if (sortedLeftElements[i] < sortedRightElements[j]) {
      arr[k] = sortedLeftElements[i]
      htmlElements[k + shiftIndex].classList.add(LEFT_ITEM_CSS_CLASS)
      htmlElements[k + shiftIndex].style.height = `${arr[k]}px`
      k++
      i++
    } else {
      arr[k] = sortedRightElements[j]
      htmlElements[k + shiftIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
      htmlElements[k + shiftIndex].style.height = `${arr[k]}px`
      k++
      j++
    }
    await wait()
  }

  while (i < sortedLeftElements.length) {
    arr[k] = sortedLeftElements[i]
    htmlElements[k + shiftIndex].classList.add(LEFT_ITEM_CSS_CLASS)
    htmlElements[k + shiftIndex].style.height = `${arr[k]}px`
    k++
    i++
    await wait()
  }
  while (j < sortedRightElements.length) {
    arr[k] = sortedRightElements[j]
    htmlElements[k + shiftIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
    htmlElements[k + shiftIndex].style.height = `${arr[k]}px`
    k++
    j++
    await wait()
  }

  for (let i = 0; i < arr.length; i++) {
    htmlElements[i + shiftIndex].classList.remove(LEFT_ITEM_CSS_CLASS)
    htmlElements[i + shiftIndex].classList.remove(SAME_ITEM_CSS_CLASS)
    htmlElements[i + shiftIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
  }

  return arr
}

export { mergeSort }
