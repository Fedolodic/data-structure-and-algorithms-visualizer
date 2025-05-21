function subarraySumEqualsK(arr, k) {
  let sum = 0;
  const map = { 0: 1 };
  for (const num of arr) {
    sum += num;
    if (map[sum - k]) return true;
    map[sum] = (map[sum] || 0) + 1;
  }
  return false;
}

module.exports = subarraySumEqualsK;
