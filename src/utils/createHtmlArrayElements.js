import { appendChildrenToHtmlElement } from './appendChildrenToHtmlElement'


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
function createHtmlArrayElements(arr, wrapperId) {
  const algoWrapper = document.getElementById(wrapperId)
  const algoContainer = algoWrapper.getElementsByClassName('algo-container')[0]

  const elements = arr.map(createArrayHtmlElement)

  appendChildrenToHtmlElement(algoContainer, elements)

  return elements
}

export { createHtmlArrayElements }
