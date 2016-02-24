import I from './I'
import arrayI from './arrayI'

export default function sortByPriorityI (fn, iter) {
  return I(arrayI(iter).sort((a, b) => {
    return (fn(b) || 0) - (fn(a) || 0)
  }))
}
