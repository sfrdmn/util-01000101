import I, {eol} from './I'

export default function whereI (pred, iter) {
  iter = I(iter)
  let next
  while (!eol(next = iter()))
    if (pred(next)) return next
}
