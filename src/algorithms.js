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

function zAlgorithm(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  return z;
}

function kmpPrefixFunction(s) {
  const pi = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    let j = pi[i - 1];
    while (j > 0 && s[i] !== s[j]) {
      j = pi[j - 1];
    }
    if (s[i] === s[j]) j++;
    pi[i] = j;
  }
  return pi;
}

function majorityVote(arr) {
  let candidate = null;
  let count = 0;
  for (const val of arr) {
    if (count === 0) {
      candidate = val;
      count = 1;
    } else if (val === candidate) {
      count++;
    } else {
      count--;
    }
  }
  if (candidate === null) return null;
  let occur = 0;
  for (const val of arr) {
    if (val === candidate) occur++;
  }
  return occur > arr.length / 2 ? candidate : null;
}

module.exports = {
  slidingWindowSubarrays,
  twoPointersSumExists,
  prefixSum,
  runLengthEncode,
  dutchNationalFlagSort,
  rabinKarp,
  zAlgorithm,
  kmpPrefixFunction,
  majorityVote,
};
