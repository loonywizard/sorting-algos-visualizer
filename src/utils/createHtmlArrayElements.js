import { appendChildrenToHtmlElement } from './appendChildrenToHtmlElement'
import { createContainerDiv } from './createContainerDiv'


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

export { createHtmlArrayElements }
