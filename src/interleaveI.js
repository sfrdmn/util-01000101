import I, {eol} from './I'

export default function interleaveI (n, val, iter) {
  iter = I(iter)
  let i = 0
  let yieldPrevious = true
  let next
  return I(() => {
    if (yieldPrevious) {
      yieldPrevious = false
      return eol(next) ? iter() : next
    } else {
      if (!eol(next = iter()) && i++ % n === 0) {
        yieldPrevious = true
        return val
      } else {
        return next
      }
    }
  })
}
