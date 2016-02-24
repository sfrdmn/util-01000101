import reduceI from './reduceI'

export default function groupByI (fn, iter) {
  return reduceI((result, val) => {
    const key = fn(val)
    if (!result[key]) result[key] = []
    result[key].push(val)
    return result
  }, {}, iter)
}
