/*
 * appends child elements to parent element
 */
function appendChildrenToHtmlElement(htmlElement, children) {
  children.forEach((elementToAppend) => {
    htmlElement.appendChild(elementToAppend)
  })
}

export { appendChildrenToHtmlElement }
