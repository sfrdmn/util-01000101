import I from './I'

export default function flattenObjI (obj) {
  return I(Object.keys(obj).map((key) => {
    return [key, obj[key]]
  }))
}
