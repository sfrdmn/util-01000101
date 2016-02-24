export default function toKeyValPairs (obj) {
  return Object.keys(obj).map((key) => [key, obj[key]])
}
