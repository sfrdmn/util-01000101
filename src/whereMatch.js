import where from './where'
import toKeyValPairs from './toKeyValPairs'
import hasAll from './hasAll'

export default function whereMatch (arr, obj) {
  const keyValPairs = toKeyValPairs(obj)
  return where(arr, (obj) => hasAll(obj, keyValPairs))
}


