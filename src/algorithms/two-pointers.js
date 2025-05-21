function twoPointersSumExists(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    if (sum < target) left++; else right--;
  }
  return false;
}

module.exports = twoPointersSumExists;
