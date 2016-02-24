import I, {eol} from './I'

export default function mapI (fn, iter) {
  iter = I(iter)
  let i = 0
  return I(() => {
    let next = iter()
    if (eol(next)) return next
    else return fn(next, i++)
  })
}
