import I from './I'

export default function repeatI (val) {
  const fn = typeof val === 'function' ? val : () => val
  let i = 0
  return I(() => fn(i++))
}
