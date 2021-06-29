import { generateRandomArray } from './utils/generateRandomArray'
import { createHtmlArrayElements } from './utils/createHtmlArrayElements'
import { getNumberOfAlgosInRow } from './utils/getNumberOfAlgosInRow'

import { quickSort } from './sortingAlgos/quickSort'
import { mergeSort } from './sortingAlgos/mergeSort'
import { heapSort } from './sortingAlgos/heapSort'
import { bubbleSort } from './sortingAlgos/bubbleSort'
import { insertionSort } from './sortingAlgos/insertionSort'

import { ARRAY_ITEM_WIDTH } from './consts'


/*
 * init array and html elements 
 */
const ARRAY_LENGTH = Math.round(document.body.offsetWidth / (ARRAY_ITEM_WIDTH * getNumberOfAlgosInRow()))
const initialRandomArray = generateRandomArray({ n: ARRAY_LENGTH, min: 10, max: 400 })

const htmlElementsQuickSort = createHtmlArrayElements(initialRandomArray, 'quick-sort')
const htmlElementsMergeSort = createHtmlArrayElements(initialRandomArray, 'merge-sort')
const htmlElementsHeapSort = createHtmlArrayElements(initialRandomArray, 'heap-sort')
const htmlElementsBubbleSort = createHtmlArrayElements(initialRandomArray, 'bubble-sort')
const htmlElementsInsertionSort = createHtmlArrayElements(initialRandomArray, 'insertion-sort')


/*
 * start visualization process
 */
quickSort([...initialRandomArray], htmlElementsQuickSort)
mergeSort([...initialRandomArray], htmlElementsMergeSort)
heapSort([...initialRandomArray], htmlElementsHeapSort)
bubbleSort([...initialRandomArray], htmlElementsBubbleSort)
insertionSort([...initialRandomArray], htmlElementsInsertionSort)
