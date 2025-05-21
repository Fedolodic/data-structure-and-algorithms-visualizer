function hashMapTwoSum(arr, target) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(target - num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

module.exports = hashMapTwoSum;
