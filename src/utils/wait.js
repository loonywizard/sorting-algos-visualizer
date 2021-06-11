import { OPERATIONS_PER_SECOND } from '../consts'


/*
 * wait a given time (in milliseconds)
 */
function wait(timeToWait = 1000 / OPERATIONS_PER_SECOND) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeToWait)
  })
}

export { wait }
