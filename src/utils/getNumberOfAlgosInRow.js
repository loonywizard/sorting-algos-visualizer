// these breakpoints are also declared in styles.css file
function getNumberOfAlgosInRow() {
  if (document.body.offsetWidth <= '900') return 1
  if (document.body.offsetWidth <= '1400') return 2
  
  return 3
}

export { getNumberOfAlgosInRow }
