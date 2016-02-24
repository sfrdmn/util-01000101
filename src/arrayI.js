import I, {eol} from './I'

export default function arrayI (iter) {
  iter = I(iter)
  let result = []
  let next
  while (!eol(next = iter()))
    result.push(next)
  return result
}
