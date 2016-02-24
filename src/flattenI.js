import I, {isIterable, eol} from './I'

export default function flattenI (iter) {
  let stack = [I(iter)]
  return I(() => {
    let next
    while (stack.length) {
      next = stack[stack.length - 1]()
      if (eol(next))
        stack.pop()
      else if (isIterable(next))
        stack.push(I(next))
      else
        break
    }
    return next
  })
}
