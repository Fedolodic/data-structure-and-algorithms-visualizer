function hashSetIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const result = [];
  const seen = new Set();
  for (const val of arr2) {
    if (set1.has(val) && !seen.has(val)) {
      result.push(val);
      seen.add(val);
    }
  }
  return result;
}

module.exports = hashSetIntersection;
