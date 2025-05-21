function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();

  function merge(left, right) {
    const result = [];
    let i = 0,
      j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  function sort(a) {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
  }

  return sort(arr.slice());
}

module.exports = mergeSort;
