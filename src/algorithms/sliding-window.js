function slidingWindowSubarrays(arr, k) {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    result.push(arr.slice(i, i + k));
  }
  return result;
}

module.exports = slidingWindowSubarrays;
