import { wait } from '../utils/wait'
import { swap } from '../utils/swap'
import { LEFT_ITEM_CSS_CLASS, SAME_ITEM_CSS_CLASS, RIGHT_ITEM_CSS_CLASS } from '../consts'


/*
 * partition function for quick sort in-place visualization
 *
 * reference: https://www.geeksforgeeks.org/quick-sort/
 */
async function partition(arr, htmlElements, start, end) {
  const pivotIndex = start
  const pivotElement = arr[pivotIndex]

  htmlElements[start].classList.add(LEFT_ITEM_CSS_CLASS)
  htmlElements[pivotIndex].classList.add(SAME_ITEM_CSS_CLASS)
  htmlElements[end].classList.add(RIGHT_ITEM_CSS_CLASS)

  await wait()
  
  while (start < end) {
    while (start < arr.length && arr[start] <= pivotElement) {
      if (htmlElements[start]) {
        htmlElements[start].classList.remove(LEFT_ITEM_CSS_CLASS)
        htmlElements[start].classList.remove(RIGHT_ITEM_CSS_CLASS)
      }
      
      start++
      
      if (htmlElements[start]) {
        htmlElements[start].classList.add(LEFT_ITEM_CSS_CLASS)
      }

      await wait()
    }

    while (arr[end] > pivotElement) {
      if (htmlElements[end]) {
        htmlElements[end].classList.remove(LEFT_ITEM_CSS_CLASS)
        htmlElements[end].classList.remove(RIGHT_ITEM_CSS_CLASS)
      }
      
      end--
      
      if (htmlElements[end]) {
        htmlElements[end].classList.add(RIGHT_ITEM_CSS_CLASS)
      }

      await wait()
    }

    if (start < end) {
      swap(arr, start, end)

      htmlElements[start].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElements[start].classList.add(RIGHT_ITEM_CSS_CLASS)

      htmlElements[end].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElements[end].classList.add(LEFT_ITEM_CSS_CLASS)

      htmlElements[start].style.height = `${arr[start]}px`
      htmlElements[end].style.height = `${arr[end]}px`

      await wait()
    }
  }

  if (htmlElements[start]) {
    htmlElements[start].classList.remove(LEFT_ITEM_CSS_CLASS)
  }

  swap(arr, pivotIndex, end)

  htmlElements[pivotIndex].classList.remove(SAME_ITEM_CSS_CLASS)
  htmlElements[end].classList.remove(RIGHT_ITEM_CSS_CLASS)

  htmlElements[pivotIndex].style.height = `${arr[pivotIndex]}px`
  htmlElements[end].style.height = `${arr[end]}px`

  return end
}


/*
 * quick sort visualization
 */
async function quickSort(arr, htmlElements, start = 0, end = arr.length - 1) {
  if (start >= end) return

  const p = await partition(arr, htmlElements, start, end)

  await quickSort(arr, htmlElements, start, p - 1)
  await quickSort(arr, htmlElements, p + 1, end)
}

export { quickSort }
