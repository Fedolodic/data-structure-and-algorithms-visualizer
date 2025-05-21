function lowerBound(arr, target) {
  let l = 0, r = arr.length;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] < target) l = m + 1; else r = m;
  }
  return l;
}

module.exports = lowerBound;
