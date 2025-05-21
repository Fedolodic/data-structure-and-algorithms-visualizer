function firstOccurrence(arr, target) {
  let l = 0, r = arr.length - 1;
  let res = -1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] >= target) {
      if (arr[m] === target) res = m;
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return res;
}

module.exports = firstOccurrence;
