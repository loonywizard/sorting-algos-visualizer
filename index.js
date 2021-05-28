function generateRandomNumber(min, max, fractionDigits = 0) {
  const randomNumber = Math.random() * (max - min) + min

  return Math.floor(randomNumber * (10 ** fractionDigits)) / (10 ** fractionDigits)
}

const arr = []
for (let i = 0; i < 150; i++) {
  arr.push(generateRandomNumber(1, 500))
}

const htmlContainerBubbleSort = document.createElement('div')
htmlContainerBubbleSort.classList.add('container')

const htmlContainerQuckSort = document.createElement('div')
htmlContainerQuckSort.classList.add('container')

document.body.appendChild(htmlContainerQuckSort)
document.body.appendChild(htmlContainerBubbleSort)


const htmlElementsQuickSort = arr.map((value) => {
  const htmlEl = document.createElement('div')
  htmlEl.classList.add('item')
  htmlEl.style.height = `${value}px`
  htmlContainerQuckSort.appendChild(htmlEl)

  return htmlEl
})
const htmlElementsBubbleSort = arr.map((value) => {
  const htmlEl = document.createElement('div')
  htmlEl.classList.add('item')
  htmlEl.style.height = `${value}px`
  htmlContainerBubbleSort.appendChild(htmlEl)

  return htmlEl
})


const OPERATIONS_PER_SECOND = 600

function wait(timeToWait = 1000 / OPERATIONS_PER_SECOND) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeToWait)
  })
}

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
      htmlElementsQuickSort[i + shiftIndex].classList.add('left-item')
    } else if (arr[i] < baseElement) {
      smallerElements.push(arr[i])
      htmlElementsQuickSort[i + shiftIndex].classList.add('same-item')
    } else {
      greaterElements.push(arr[i])
      htmlElementsQuickSort[i + shiftIndex].classList.add('right-item')
    }
    await wait()
  }

  for (let i = shiftIndex; i < shiftIndex + arr.length; i++) {
    htmlElementsQuickSort[i].classList.remove('left-item')
    htmlElementsQuickSort[i].classList.remove('right-item')
    htmlElementsQuickSort[i].classList.remove('same-item')
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

async function bubbleSort(arr) {
  const n = arr.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      console.log(`comparing elements ${j} and ${j + 1}`)
      htmlElementsBubbleSort[j].classList.add('active')
      htmlElementsBubbleSort[j + 1].classList.add('active')


      await wait()

      if (arr[j] > arr[j + 1]) {
        const t = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = t

        htmlElementsBubbleSort[j].style.height = `${arr[j]}px`
        htmlElementsBubbleSort[j + 1].style.height = `${arr[j + 1]}px`

        // htmlElementsBubbleSort[j].classList.add('changing')
        // htmlElementsBubbleSort[j + 1].classList.add('changing')
        // await wait()
        // htmlElementsBubbleSort[j].classList.remove('changing')
        // htmlElementsBubbleSort[j + 1].classList.remove('changing')
      }

      htmlElementsBubbleSort[j].classList.remove('active')
      htmlElementsBubbleSort[j + 1].classList.remove('active')
    }
  }
}

(async () => {
  await Promise.all([
    qsort([...arr]),
    bubbleSort([...arr]), 
  ])
})()
