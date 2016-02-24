import I from './I'

export default function takeI (n, iter) {
  let i = 0;
  return I(() => i++ < n ? iter() : null)
}
