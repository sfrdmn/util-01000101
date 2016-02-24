export default function threadA (error, cbs) {
  if (Array.isArray(error)) {
    cbs = error
    error = function () {}
  }
  let i = 0
  let n = cbs.length

  return function () {
    let args = [null].concat(Array.prototype.slice.call(arguments))
    next.apply(null, args)
  }

  function next () {
    if (i < n) {
      let handler = cbs[i++]
      let args = Array.prototype.slice.call(arguments)
      if (!(typeof args[0] === 'undefined' || args[0] === null)) {
        error(args[0])
      } else {
        try {
          handler.apply(null, args.slice(1).concat(next))
        } catch (err) {
          error(err)
        }
      }
    }
  }
}
