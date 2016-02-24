import I, {eol} from './I'

export default function reduceI (fn, init, iter) {
  iter = I(iter)
  let i = 0
  let reduction = init
  let next
  while (!eol(next = iter()))
    reduction = fn(reduction, next, i++)
  return reduction
}
