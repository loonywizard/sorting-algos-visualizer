/*
 * wait a given time (in milliseconds)
 */
function wait(timeToWait = 1000 / OPERATIONS_PER_SECOND) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeToWait)
  })
}


/*
 * swaps two given elements in a given array
 */
function swap(arr, firstElementIndex, secondElementIndex) {
  const t = arr[firstElementIndex]
  arr[firstElementIndex] = arr[secondElementIndex]
  arr[secondElementIndex] = t
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

  element.classList.add('sorting-algo-container')

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
  const htmlWrapperElement = document.getElementById('wrapper')

  const elements = arr.map((arrItem) => createArrayHtmlElement(arrItem, container))

  appendChildrenToHtmlElement(container, elements)
  appendChildrenToHtmlElement(htmlWrapperElement, [container])

  return elements
}


/*
 * partition function for quick sort in-place visualization
 *
 * reference: https://www.geeksforgeeks.org/quick-sort/
 */
async function partition(arr, start, end) {
  const pivotIndex = start
  const pivotElement = arr[pivotIndex]

  htmlElementsQuickSort[start].classList.add(LEFT_ITEM_CSS_CLASS)
  htmlElementsQuickSort[pivotIndex].classList.add(SAME_ITEM_CSS_CLASS)
  htmlElementsQuickSort[end].classList.add(RIGHT_ITEM_CSS_CLASS)

  await wait()
  
  while (start < end) {
    while (start < arr.length && arr[start] <= pivotElement) {
      if (htmlElementsQuickSort[start]) {
        htmlElementsQuickSort[start].classList.remove(LEFT_ITEM_CSS_CLASS)
        htmlElementsQuickSort[start].classList.remove(RIGHT_ITEM_CSS_CLASS)
      }
      
      start++
      
      if (htmlElementsQuickSort[start]) {
        htmlElementsQuickSort[start].classList.add(LEFT_ITEM_CSS_CLASS)
      }

      await wait()
    }

    while (arr[end] > pivotElement) {
      if (htmlElementsQuickSort[end]) {
        htmlElementsQuickSort[end].classList.remove(LEFT_ITEM_CSS_CLASS)
        htmlElementsQuickSort[end].classList.remove(RIGHT_ITEM_CSS_CLASS)
      }
      
      end--
      
      if (htmlElementsQuickSort[end]) {
        htmlElementsQuickSort[end].classList.add(RIGHT_ITEM_CSS_CLASS)
      }

      await wait()
    }

    if (start < end) {
      swap(arr, start, end)

      htmlElementsQuickSort[start].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsQuickSort[start].classList.add(RIGHT_ITEM_CSS_CLASS)

      htmlElementsQuickSort[end].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElementsQuickSort[end].classList.add(LEFT_ITEM_CSS_CLASS)

      htmlElementsQuickSort[start].style.height = `${arr[start]}px`
      htmlElementsQuickSort[end].style.height = `${arr[end]}px`

      await wait()
    }
  }

  if (htmlElementsQuickSort[start]) {
    htmlElementsQuickSort[start].classList.remove(LEFT_ITEM_CSS_CLASS)
  }

  swap(arr, pivotIndex, end)

  htmlElementsQuickSort[pivotIndex].classList.remove(SAME_ITEM_CSS_CLASS)
  htmlElementsQuickSort[end].classList.remove(RIGHT_ITEM_CSS_CLASS)

  htmlElementsQuickSort[pivotIndex].style.height = `${arr[pivotIndex]}px`
  htmlElementsQuickSort[end].style.height = `${arr[end]}px`

  return end
}


/*
 * quick sort visualization
 */
async function qsort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return

  const p = await partition(arr, start, end)

  await qsort(arr, start, p - 1)
  await qsort(arr, p + 1, end)
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
 * MaxHeap is used in heap sort algorithm
 */
class MaxHeap {
  constructor() {
    this.heap = []
  }

  getLeftChildIndex = (parentIndex) => 2 * parentIndex + 1
  getRightChildIndex = (parentIndex) => 2 * parentIndex + 2
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2)

  hasLeftChild = (index) => this.getLeftChildIndex(index) < this.heap.length
  hasRightChild = (index) => this.getRightChildIndex(index) < this.heap.length
  hasParent = (index) => this.getParentIndex(index) >= 0

  getLeftChild = (index) => this.heap[this.getLeftChildIndex(index)]
  getRightChild = (index) => this.heap[this.getRightChildIndex(index)]
  getParent = (index) => this.heap[this.getParentIndex(index)]

  swap(firstIndex, secondIndex) {
    [this.heap[firstIndex], this.heap[secondIndex]] = [this.heap[secondIndex], this.heap[firstIndex]]
  }

  isEmpty() {
    return this.heap.length === 0
  }

  async heapifyUp() {
    let index = this.heap.length - 1

    htmlElementsHeapSort[index].classList.add(LEFT_ITEM_CSS_CLASS)
    
    while (this.hasParent(index) && this.comparatorFn(this.heap[index], this.getParent(index))) {
      const parentIndex = this.getParentIndex(index)

      htmlElementsHeapSort[parentIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
      await wait()

      this.swap(index, parentIndex)
      
      htmlElementsHeapSort[index].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsHeapSort[index].classList.add(RIGHT_ITEM_CSS_CLASS)

      htmlElementsHeapSort[parentIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElementsHeapSort[parentIndex].classList.add(LEFT_ITEM_CSS_CLASS)

      htmlElementsHeapSort[index].style.height = `${this.heap[index]}px`
      htmlElementsHeapSort[parentIndex].style.height = `${this.heap[parentIndex]}px`
      
      await wait()
      htmlElementsHeapSort[index].classList.remove(RIGHT_ITEM_CSS_CLASS)

      index = parentIndex
    }

    htmlElementsHeapSort[index].classList.remove(LEFT_ITEM_CSS_CLASS)
  }

  async insert(nodeValue) {
    this.heap.push(nodeValue)
    await this.heapifyUp()
  }

  async heapifyDown() {
    let index = 0

    htmlElementsHeapSort[index].classList.add(LEFT_ITEM_CSS_CLASS)

    while (this.hasLeftChild(index)) {
      let childIndexToReplace = this.getLeftChildIndex(index)
      if (this.hasRightChild(index) && this.comparatorFn(this.getRightChild(index), this.getLeftChild(index))) {
        childIndexToReplace = this.getRightChildIndex(index)
      }

      if (this.comparatorFn(this.heap[index], this.heap[childIndexToReplace])) {
        break
      }

      htmlElementsHeapSort[childIndexToReplace].classList.add(RIGHT_ITEM_CSS_CLASS)

      await wait()

      this.swap(index, childIndexToReplace)
      htmlElementsHeapSort[index].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsHeapSort[index].classList.add(RIGHT_ITEM_CSS_CLASS)

      htmlElementsHeapSort[childIndexToReplace].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElementsHeapSort[childIndexToReplace].classList.add(LEFT_ITEM_CSS_CLASS)

      htmlElementsHeapSort[index].style.height = `${this.heap[index]}px`
      htmlElementsHeapSort[childIndexToReplace].style.height = `${this.heap[childIndexToReplace]}px`
      await wait()
      htmlElementsHeapSort[index].classList.remove(RIGHT_ITEM_CSS_CLASS)
      index = childIndexToReplace
    }

    htmlElementsHeapSort[index].classList.remove(LEFT_ITEM_CSS_CLASS)
  }

  async pop() {
    if (this.isEmpty()) throw new Error('Heap is empty!')

    // remove first element
    const item = this.heap[0]

    if (this.heap.length <= 2) {
      this.heap.shift()
      return item
    }

    // insert last element to the beginning
    this.heap[0] = this.heap.pop()

    await this.heapifyDown()

    return item
  }

  comparatorFn(valueA, valueB) {
    return valueA > valueB
  }
}


/*
 * heap sort visualization
 */
async function heapSort(arr) {
  const heap = new MaxHeap()

  for (let element of arr) {
    await heap.insert(element)
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = await heap.pop()

    htmlElementsHeapSort[i].style.height = `${arr[i]}px`
  }
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
        swap(arr, j, j + 1)

        htmlElementsBubbleSort[j].style.height = `${arr[j]}px`
        htmlElementsBubbleSort[j + 1].style.height = `${arr[j + 1]}px`
      }

      htmlElementsBubbleSort[j].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsBubbleSort[j + 1].classList.remove(RIGHT_ITEM_CSS_CLASS)
    }
  }
}


/*
 * insertion sort implementation
 */
async function insertionSort(arr) {
  const n = arr.length

  for (let i = 1; i < n; i++) {
    let currentElementIndex = i

    htmlElementsInsertionSort[currentElementIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
    await wait()

    for (let j = i - 1; j >= 0; j--) {
      htmlElementsInsertionSort[j].classList.add(LEFT_ITEM_CSS_CLASS)
      await wait()

      if (arr[currentElementIndex] >= arr[j]) {
        htmlElementsInsertionSort[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
        htmlElementsInsertionSort[j].classList.remove(LEFT_ITEM_CSS_CLASS)
        await wait()
        break
      }

      swap(arr, currentElementIndex, j)

      htmlElementsInsertionSort[currentElementIndex].style.height = `${arr[currentElementIndex]}px`
      htmlElementsInsertionSort[j].style.height = `${arr[j]}px`

      htmlElementsInsertionSort[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
      htmlElementsInsertionSort[j].classList.remove(LEFT_ITEM_CSS_CLASS)
      htmlElementsInsertionSort[j].classList.add(RIGHT_ITEM_CSS_CLASS)

      await wait()


      currentElementIndex--
    }

    htmlElementsInsertionSort[currentElementIndex].classList.remove(LEFT_ITEM_CSS_CLASS)
    htmlElementsInsertionSort[currentElementIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
  }
}


/*
 * init array and html elements 
 */
const initialRandomArray = generateRandomArray({ n: 40, min: 10, max: 500 })

const htmlElementsQuickSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsMergeSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsHeapSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsBubbleSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsInsertionSort = createHtmlArrayElements(initialRandomArray)


/*
 * declare constant
 */
const OPERATIONS_PER_SECOND = 20

const LEFT_ITEM_CSS_CLASS = 'left-item'
const SAME_ITEM_CSS_CLASS = 'same-item'
const RIGHT_ITEM_CSS_CLASS = 'right-item'


/*
 * start visualization process
 */
qsort([...initialRandomArray])
mergeSort([...initialRandomArray])
heapSort([...initialRandomArray])
bubbleSort([...initialRandomArray])
insertionSort([...initialRandomArray])
