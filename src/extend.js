export default function extend (obj) {
  const args = [].slice.call(arguments, 1)
  return args.reduce((reduct, ext) => Object.assign(reduct, ext),
      Object.assign({}, obj))
}
