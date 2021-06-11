import { generateRandomArray } from './utils/generateRandomArray'
import { createHtmlArrayElements } from './utils/createHtmlArrayElements'

import { quickSort } from './sortingAlgos/quickSort'
import { mergeSort } from './sortingAlgos/mergeSort'
import { heapSort } from './sortingAlgos/heapSort'
import { bubbleSort } from './sortingAlgos/bubbleSort'
import { insertionSort } from './sortingAlgos/insertionSort'


/*
 * init array and html elements 
 */
const ARRAY_ITEM_WIDTH = 10
const ARRAY_LENGTH = Math.round(document.body.offsetWidth / ARRAY_ITEM_WIDTH)

const initialRandomArray = generateRandomArray({ n: ARRAY_LENGTH, min: 10, max: 400 })

const htmlElementsQuickSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsMergeSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsHeapSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsBubbleSort = createHtmlArrayElements(initialRandomArray)
const htmlElementsInsertionSort = createHtmlArrayElements(initialRandomArray)


/*
 * start visualization process
 */
quickSort([...initialRandomArray], htmlElementsQuickSort)
mergeSort([...initialRandomArray], htmlElementsMergeSort)
heapSort([...initialRandomArray], htmlElementsHeapSort)
bubbleSort([...initialRandomArray], htmlElementsBubbleSort)
insertionSort([...initialRandomArray], htmlElementsInsertionSort)