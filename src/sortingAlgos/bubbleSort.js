import { wait } from '../utils/wait'
import { swap } from '../utils/swap'
import { LEFT_ITEM_CSS_CLASS, RIGHT_ITEM_CSS_CLASS } from '../consts'


/*
 * bubble sort visualization
 */
async function bubbleSort(arr, htmlElements) {
  const n = arr.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      htmlElements[j].classList.add(LEFT_ITEM_CSS_CLASS)
      htmlElements[j + 1].classList.add(RIGHT_ITEM_CSS_CLASS)


      await wait()

      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)

        htmlElements[j].style.height = `${arr[j]}px`
        htmlElements[j + 1].style.height = `${arr[j + 1]}px`
      }

      htmlElements[j].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElements[j + 1].classList.remove(RIGHT_ITEM_CSS_CLASS)
    }
  }
}

export { bubbleSort }
