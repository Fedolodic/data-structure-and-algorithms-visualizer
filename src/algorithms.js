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

// Frequency map counting for characters in a string
function frequencyMapCounting(str) {
  const map = {};
  for (const ch of str) {
    map[ch] = (map[ch] || 0) + 1;
  }
  return map;
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

function nextGreaterElements(arr) {
  const res = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    if (stack.length) res[i] = stack[stack.length - 1];
    stack.push(arr[i]);
  }
  return res;
}

// Manacher's algorithm for longest palindromic substring
function manacherLongestPalindrome(s) {
  if (s.length === 0) return '';
  const t = '#' + s.split('').join('#') + '#';
  const p = new Array(t.length).fill(0);
  let center = 0, right = 0;
  let bestCenter = 0, bestLen = 0;

  for (let i = 0; i < t.length; i++) {
    const mirror = 2 * center - i;
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }
    while (
      i - p[i] - 1 >= 0 &&
      i + p[i] + 1 < t.length &&
      t[i - p[i] - 1] === t[i + p[i] + 1]
    ) {
      p[i]++;
    }
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
    if (p[i] > bestLen) {
      bestLen = p[i];
      bestCenter = i;
    }
  }
  const start = Math.floor((bestCenter - bestLen) / 2);
  return s.substring(start, start + bestLen);
}

// Cycle sort for in-place rearrangement
function cycleSort(arr) {
  for (let cycleStart = 0; cycleStart < arr.length - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < arr.length; i++) {
      if (arr[i] < item) pos++;
    }
    if (pos === cycleStart) continue;
    while (item === arr[pos]) pos++;
    [arr[pos], item] = [item, arr[pos]];
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < arr.length; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
    }
  }
  return arr;
}

// Segment tree for static range sum queries
function buildSegmentTree(arr) {
  const n = arr.length;
  const tree = new Array(2 * n);
  for (let i = 0; i < n; i++) tree[n + i] = arr[i];
  for (let i = n - 1; i > 0; i--) tree[i] = tree[i * 2] + tree[i * 2 + 1];
  return { n, tree };
}

function segmentTreeQuery(treeObj, l, r) {
  let { n, tree } = treeObj;
  l += n; r += n;
  let sum = 0;
  while (l <= r) {
    if ((l & 1) === 1) sum += tree[l++];
    if ((r & 1) === 0) sum += tree[r--];
    l >>= 1;
    r >>= 1;
  }
  return sum;
}

// Sparse table for static range minimum queries
function buildSparseTable(arr) {
  const n = arr.length;
  const log = new Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) log[i] = log[Math.floor(i / 2)] + 1;
  const K = log[n] + 1;
  const table = Array.from({ length: K }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) table[0][i] = arr[i];
  for (let k = 1; k < K; k++) {
    for (let i = 0; i + (1 << k) <= n; i++) {
      table[k][i] = Math.min(table[k - 1][i], table[k - 1][i + (1 << (k - 1))]);
    }
  }
  return { table, log };
}

function sparseTableQuery(st, l, r) {
  const { table, log } = st;
  const k = log[r - l + 1];
  return Math.min(table[k][l], table[k][r - (1 << k) + 1]);
}

// Check if any subarray sums to k using prefix sums and a hash map
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

// Hash-map based two-sum check
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

// Compute intersection of two arrays using a hash-set
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
  nextGreaterElements,
  manacherLongestPalindrome,
  cycleSort,
  buildSegmentTree,
  segmentTreeQuery,
  buildSparseTable,
  sparseTableQuery,
  frequencyMapCounting,
  subarraySumEqualsK,
  hashMapTwoSum,
  hashSetIntersection,
};
