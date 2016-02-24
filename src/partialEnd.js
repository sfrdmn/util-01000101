export default function partialEnd (fn) {
  const appliedArgs = [].slice.call(arguments, 1)
  return function () {
    const args = [].slice.call(arguments)
    return fn.apply(null, arguments.concat(appliedArgs))
  }
}
