/*
 * wait a given time (in milliseconds)
 */
function wait(timeToWait = 1000 / OPERATIONS_PER_SECOND) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeToWait)
  })
}


/*
 * generates random number between min and max
 */
function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}


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


/*
 * appends child elements to parent element
 */
function appendChildrenToHtmlElement(htmlElement, children) {
  children.forEach((elementToAppend) => {
    htmlElement.appendChild(elementToAppend)
  })
}


/*
 * creates HTML element - container for elements of sorting array
 */
function createContainerDiv() {
  const element = document.createElement('div')

  element.classList.add('container')

  return element
}


/*
 * creates HTML element - item of sorting array
 */
function createArrayHtmlElement(value) {
  const htmlElement = document.createElement('div')
  
  htmlElement.classList.add('item')
  htmlElement.style.height = `${value}px`
  
  return htmlElement
}


/*
 * inits HTML elements for given array and iserts them to DOM 
 */
function createHtmlArrayElements(arr) {
  const container = createContainerDiv()

  const elements = arr.map((arrItem) => createArrayHtmlElement(arrItem, container))

  appendChildrenToHtmlElement(container, elements)
  appendChildrenToHtmlElement(document.body, [container])

  return elements
}


/*
 * quick sort (recursive approach) visualization
 */
async function qsort(arr, shiftIndex = 0) {
  if (arr.length < 2) return arr

  const baseElementIndex = 0
  const baseElement = arr[baseElementIndex]
  
  const smallerElements = []
  const sameElements = []
  const greaterElements = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === baseElement) {
      sameElements.push(baseElement)
      htmlElementsQuickSort[i + shiftIndex].classList.add(SAME_ITEM_CSS_CLASS)
    } else if (arr[i] < baseElement) {
      smallerElements.push(arr[i])
      htmlElementsQuickSort[i + shiftIndex].classList.add(LEFT_ITEM_CSS_CLASS)
    } else {
      greaterElements.push(arr[i])
      htmlElementsQuickSort[i + shiftIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
    }
    
    await wait()
  }

  for (let i = shiftIndex; i < shiftIndex + arr.length; i++) {
    htmlElementsQuickSort[i].classList.remove(LEFT_ITEM_CSS_CLASS)
    htmlElementsQuickSort[i].classList.remove(SAME_ITEM_CSS_CLASS)
    htmlElementsQuickSort[i].classList.remove(RIGHT_ITEM_CSS_CLASS)
  }

  
  smallerElements.forEach((element, elementIndex) => {
    htmlElementsQuickSort[shiftIndex + elementIndex].style.height = `${element}px`
  })
  sameElements.forEach((element, elementIndex) => {
    htmlElementsQuickSort[shiftIndex + elementIndex + smallerElements.length].style.height = `${element}px`
  })
  greaterElements.forEach((element, elementIndex) => {
    htmlElementsQuickSort[shiftIndex + smallerElements.length + sameElements.length + elementIndex].style.height = `${element}px`
  })
  
  await wait()

  const left = await qsort(smallerElements, shiftIndex)
  const right = await qsort(greaterElements, shiftIndex + smallerElements.length + sameElements.length)

  return [...left, ...sameElements, ...right]
}


/*
 * merge sort visualization
 */
async function mergeSort(arr, shiftIndex = 0) {
  if (arr.length < 2) return arr

  const middleElementIndex = Math.round(arr.length / 2)

  htmlElementsMergeSort[middleElementIndex + shiftIndex].classList.add(SAME_ITEM_CSS_CLASS)
  await wait()
  htmlElementsMergeSort[middleElementIndex + shiftIndex].classList.remove(SAME_ITEM_CSS_CLASS)
  
  const leftElements = arr.slice(0, middleElementIndex)
  const rightElements = arr.slice(middleElementIndex)

  const sortedLeftElements = await mergeSort(leftElements, shiftIndex)
  const sortedRightElements = await mergeSort(rightElements, shiftIndex + middleElementIndex)

  let i = 0, j = 0, k = 0

  while (i < sortedLeftElements.length && j < sortedRightElements.length) {
    if (sortedLeftElements[i] < sortedRightElements[j]) {
      arr[k] = sortedLeftElements[i]
      htmlElementsMergeSort[k + shiftIndex].classList.add(LEFT_ITEM_CSS_CLASS)
      htmlElementsMergeSort[k + shiftIndex].style.height = `${arr[k]}px`
      k++
      i++
    } else {
      arr[k] = sortedRightElements[j]
      htmlElementsMergeSort[k + shiftIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
      htmlElementsMergeSort[k + shiftIndex].style.height = `${arr[k]}px`
      k++
      j++
    }
    await wait()
  }

  while (i < sortedLeftElements.length) {
    arr[k] = sortedLeftElements[i]
    htmlElementsMergeSort[k + shiftIndex].classList.add(LEFT_ITEM_CSS_CLASS)
    htmlElementsMergeSort[k + shiftIndex].style.height = `${arr[k]}px`
    k++
    i++
    await wait()
  }
  while (j < sortedRightElements.length) {
    arr[k] = sortedRightElements[j]
    htmlElementsMergeSort[k + shiftIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
    htmlElementsMergeSort[k + shiftIndex].style.height = `${arr[k]}px`
    k++
    j++
    await wait()
  }

  for (let i = 0; i < arr.length; i++) {
    htmlElementsMergeSort[i + shiftIndex].classList.remove(LEFT_ITEM_CSS_CLASS)
    htmlElementsMergeSort[i + shiftIndex].classList.remove(SAME_ITEM_CSS_CLASS)
    htmlElementsMergeSort[i + shiftIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
  }

  return arr
}


/*
 * bubble sort visualization
 */
async function bubbleSort(arr) {
  const n = arr.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      htmlElementsBubbleSort[j].classList.add(LEFT_ITEM_CSS_CLASS)
      htmlElementsBubbleSort[j + 1].classList.add(RIGHT_ITEM_CSS_CLASS)


      await wait()

      if (arr[j] > arr[j + 1]) {
        const t = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = t

        htmlElementsBubbleSort[j].style.height = `${arr[j]}px`
        htmlElementsBubbleSort[j + 1].style.height = `${arr[j + 1]}px`
      }

      htmlElementsBubbleSort[j].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsBubbleSort[j + 1].classList.remove(RIGHT_ITEM_CSS_CLASS)
    }
  }
}


/*
 * init array and html elements 
 */
const initialRandomArray = generateRandomArray({ n: 150, min: 1, max: 500 })

const htmlElementsQuickSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsMergeSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsBubbleSort = createHtmlArrayElements(initialRandomArray)


/*
 * declare constant
 */
const OPERATIONS_PER_SECOND = 60

const LEFT_ITEM_CSS_CLASS = 'left-item'
const SAME_ITEM_CSS_CLASS = 'same-item'
const RIGHT_ITEM_CSS_CLASS = 'right-item'


/*
 * start visualization process
 */
qsort([...initialRandomArray])
mergeSort([...initialRandomArray])
bubbleSort([...initialRandomArray])
