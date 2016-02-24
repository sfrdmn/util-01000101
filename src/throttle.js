// Naive throtte
export default function throttle (fn, ms) {
  let ready = true

  return function () {
    if (!ready) return
    ready = false
    setTimeout(setReady, ms)
    fn.apply(null, arguments)
  }

  function setReady () { ready = true }
}
