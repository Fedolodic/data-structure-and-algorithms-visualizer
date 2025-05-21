function radixSort(arr) {
  const base = 10;
  let max = Math.max(...arr, 0);
  let exp = 1;
  let output = arr.slice();
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: base }, () => []);
    for (const num of output) {
      const digit = Math.floor(num / exp) % base;
      buckets[digit].push(num);
    }
    output = [].concat(...buckets);
    exp *= base;
  }
  return output;
}

module.exports = radixSort;
