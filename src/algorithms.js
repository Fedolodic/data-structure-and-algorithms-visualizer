// Pure algorithm implementations for unit tests

function slidingWindowSubarrays(arr, k) {
  const result = [];
  for (let i = 0; i <= arr.length - k; i++) {
    result.push(arr.slice(i, i + k));
  }
  return result;
}

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

function prefixSum(arr) {
  const res = [];
  let sum = 0;
  for (const x of arr) {
    sum += x;
    res.push(sum);
  }
  return res;
}

function runLengthEncode(str) {
  if (str.length === 0) return '';
  let out = '';
  let count = 1;
  for (let i = 1; i <= str.length; i++) {
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      out += str[i - 1] + count;
      count = 1;
    }
  }
  return out;
}

function dutchNationalFlagSort(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++; mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  return arr;
}

function rabinKarp(text, pattern) {
  const m = pattern.length;
  if (m === 0) return 0;
  const base = 256;
  const mod = 101;
  let highPow = 1;
  let textHash = 0;
  let patternHash = 0;
  for (let i = 0; i < m; i++) {
    textHash = (textHash * base + (text.charCodeAt(i) || 0)) % mod;
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    if (i < m - 1) highPow = (highPow * base) % mod;
  }
  for (let i = 0; i <= text.length - m; i++) {
    if (textHash === patternHash && text.substr(i, m) === pattern) {
      return i;
    }
    const left = text.charCodeAt(i);
    const right = text.charCodeAt(i + m) || 0;
    textHash = (textHash - left * highPow) % mod;
    if (textHash < 0) textHash += mod;
    textHash = (textHash * base + right) % mod;
  }
  return -1;
}

module.exports = {
  slidingWindowSubarrays,
  twoPointersSumExists,
  prefixSum,
  runLengthEncode,
  dutchNationalFlagSort,
  rabinKarp,
};
