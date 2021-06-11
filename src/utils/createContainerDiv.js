/*
 * creates HTML element - container for elements of sorting array
 */
function createContainerDiv() {
  const element = document.createElement('div')

  element.classList.add('sorting-algo-container')

  return element
}

export { createContainerDiv }
