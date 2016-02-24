export default function hasAll (obj, keyValPairs) {
  return keyValPairs.every(([key, val]) => obj[key] === val)
}
