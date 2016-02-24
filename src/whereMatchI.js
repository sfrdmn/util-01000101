import whereI from './whereI'
import toKeyValPairs from './toKeyValPairs'
import hasAll from './hasAll'

export default function whereMatchI (pred, iter) {
  const keyValPairs = toKeyValPairs(pred)
  return whereI((obj) => hasAll(obj, keyValPairs), iter)
}
