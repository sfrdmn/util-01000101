export default function compose () {
  const fns = [].slice.call(arguments)
  return function callComposed () {
    let result
    for (let i = fns.length - 1; i >= 0; i--) {
      if (!result) result = fns[i].apply(null, arguments)
      else result = fns[i].call(null, result)
    }
    return result
  }
}
