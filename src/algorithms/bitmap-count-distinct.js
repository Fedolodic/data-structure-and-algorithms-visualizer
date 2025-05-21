function bitmapCountDistinct(arr, maxVal = Math.max(...arr, 0)) {
  const size = maxVal + 1;
  const bitArray = new Uint32Array(Math.ceil(size / 32));
  for (const num of arr) {
    if (num < 0 || num > maxVal) continue;
    const idx = Math.floor(num / 32);
    const bit = num % 32;
    bitArray[idx] |= 1 << bit;
  }
  let count = 0;
  for (const bits of bitArray) {
    let n = bits;
    while (n) {
      n &= n - 1;
      count++;
    }
  }
  return count;
}

module.exports = bitmapCountDistinct;
