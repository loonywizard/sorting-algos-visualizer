import { wait } from '../utils/wait'
import { swap } from '../utils/swap'
import { LEFT_ITEM_CSS_CLASS, RIGHT_ITEM_CSS_CLASS } from '../consts'


/*
 * insertion sort implementation
 */
async function insertionSort(arr, htmlElements) {
  const n = arr.length

  for (let i = 1; i < n; i++) {
    let currentElementIndex = i

    htmlElements[currentElementIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
    await wait()

    for (let j = i - 1; j >= 0; j--) {
      htmlElements[j].classList.add(LEFT_ITEM_CSS_CLASS)
      await wait()

      if (arr[currentElementIndex] >= arr[j]) {
        htmlElements[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
        htmlElements[j].classList.remove(LEFT_ITEM_CSS_CLASS)
        await wait()
        break
      }

      swap(arr, currentElementIndex, j)

      htmlElements[currentElementIndex].style.height = `${arr[currentElementIndex]}px`
      htmlElements[j].style.height = `${arr[j]}px`

      htmlElements[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElements[j].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElements[j].classList.add(RIGHT_ITEM_CSS_CLASS)

      await wait()


      currentElementIndex--
    }

    htmlElements[currentElementIndex].classList.remove(LEFT_ITEM_CSS_CLASS)
    htmlElements[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
  }
}

export { insertionSort }
