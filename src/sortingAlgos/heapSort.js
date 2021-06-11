import { wait } from '../utils/wait'
import { LEFT_ITEM_CSS_CLASS, RIGHT_ITEM_CSS_CLASS } from '../consts'


/*
 * MaxHeap is used in heap sort algorithm
 */
class MaxHeap {
  constructor(htmlElements) {
    this.heap = []
    this.htmlElements = htmlElements
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

    this.htmlElements[index].classList.add(LEFT_ITEM_CSS_CLASS)
    
    while (this.hasParent(index) && this.comparatorFn(this.heap[index], this.getParent(index))) {
      const parentIndex = this.getParentIndex(index)

      this.htmlElements[parentIndex].classList.add(RIGHT_ITEM_CSS_CLASS)
      await wait()

      this.swap(index, parentIndex)
      
      this.htmlElements[index].classList.remove(LEFT_ITEM_CSS_CLASS)
      this.htmlElements[index].classList.add(RIGHT_ITEM_CSS_CLASS)

      this.htmlElements[parentIndex].classList.remove(RIGHT_ITEM_CSS_CLASS)
      this.htmlElements[parentIndex].classList.add(LEFT_ITEM_CSS_CLASS)

      this.htmlElements[index].style.height = `${this.heap[index]}px`
      this.htmlElements[parentIndex].style.height = `${this.heap[parentIndex]}px`
      
      await wait()
      this.htmlElements[index].classList.remove(RIGHT_ITEM_CSS_CLASS)

      index = parentIndex
    }

    this.htmlElements[index].classList.remove(LEFT_ITEM_CSS_CLASS)
  }

  async insert(nodeValue) {
    this.heap.push(nodeValue)
    await this.heapifyUp()
  }

  async heapifyDown() {
    let index = 0

    this.htmlElements[index].classList.add(LEFT_ITEM_CSS_CLASS)

    while (this.hasLeftChild(index)) {
      let childIndexToReplace = this.getLeftChildIndex(index)
      if (this.hasRightChild(index) && this.comparatorFn(this.getRightChild(index), this.getLeftChild(index))) {
        childIndexToReplace = this.getRightChildIndex(index)
      }

      if (this.comparatorFn(this.heap[index], this.heap[childIndexToReplace])) {
        break
      }

      this.htmlElements[childIndexToReplace].classList.add(RIGHT_ITEM_CSS_CLASS)

      await wait()

      this.swap(index, childIndexToReplace)
      this.htmlElements[index].classList.remove(LEFT_ITEM_CSS_CLASS)
      this.htmlElements[index].classList.add(RIGHT_ITEM_CSS_CLASS)

      this.htmlElements[childIndexToReplace].classList.remove(RIGHT_ITEM_CSS_CLASS)
      this.htmlElements[childIndexToReplace].classList.add(LEFT_ITEM_CSS_CLASS)

      this.htmlElements[index].style.height = `${this.heap[index]}px`
      this.htmlElements[childIndexToReplace].style.height = `${this.heap[childIndexToReplace]}px`
      await wait()
      this.htmlElements[index].classList.remove(RIGHT_ITEM_CSS_CLASS)
      index = childIndexToReplace
    }

    this.htmlElements[index].classList.remove(LEFT_ITEM_CSS_CLASS)
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
async function heapSort(arr, htmlElements) {
  const heap = new MaxHeap(htmlElements)

  for (let element of arr) {
    await heap.insert(element)
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = await heap.pop()

    htmlElements[i].style.height = `${arr[i]}px`
  }
}

export { heapSort }
