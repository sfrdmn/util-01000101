import nullOrUndefined from './nullOrUndefined'

export default function get (obj, path) {
  path = path || []
  if (typeof path === 'string') path = path.split('.')
  return path.reduce((child, key) => {
    if (child && child[key]) return child[key]
    else return
  }, obj)
}
