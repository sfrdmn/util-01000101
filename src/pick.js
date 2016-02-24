export default function pick (obj, keys) {
  return (keys || []).reduce((result, key) => {
    result[key] = obj[key]
    return result
  }, {})
}
