export default function where (arr, pred) {
  for (let i = 0; i < arr.length; i++) {
    if (pred(arr[i])) return arr[i]
  }
}
