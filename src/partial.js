export default function partial (fn) {
  const appliedArgs = [].slice.call(arguments, 1)
  return function () {
    const args = [].slice.call(arguments)
    return fn.apply(null, appliedArgs.concat(args))
  }
}
