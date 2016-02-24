import I, {eol} from './I'
import clamp from './clamp'

export default function partitionI (n, offset, iter) {
  if (typeof offset !== 'number') {
    iter = offset
    offset = n
  }
  iter = I(iter)
  const buffer = []
  const skipN = clamp(offset - n, 0, Infinity)

  return I(() => {
    const partition = []
    // Saturate buffer with partition size
    for (let i = buffer.length; i < n; i++) {
      let next = iter()
      if (eol(next))
        if (i === 0) return
        else break
      else buffer.push(next)
    }
    for (let j = 0; j < n && !eol(buffer[j]); j++)
      partition.push(buffer[j])
    // Unbuffer processed items
    for (let k = 0; k < offset && k < n; k++)
      buffer.shift()
    // Discard stuff skipped by offset
    for (let l = 0; l < skipN; l++)
      iter()
    return partition
  })
}
