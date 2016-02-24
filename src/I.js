import nullOrUndefined from './nullOrUndefined'

const MAGIC = 0xBABE

export default function I (arr) {
  arr = arr || []
  if (isIterator(arr)) {
    return arr
  }  else if (typeof arr === 'function') {
    arr[MAGIC] = true
    return arr
  }

  let i = 0
  function iter () {
    return arr[i++]
  }
  iter[MAGIC] = true

  return iter
}

export function isIterator (iter) {
  return iter && (typeof iter === 'function' && iter[MAGIC])
}

export function isIterable (iter) {
  return iter && (Array.isArray(iter) || isIterator(iter))
}

export function eol (val) {
  return nullOrUndefined(val)
}
