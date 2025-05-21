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

// Counting sort for small non-negative integers (0..maxVal)
function countingSort(arr, maxVal = Math.max(...arr)) {
  const counts = new Array(maxVal + 1).fill(0);
  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;
  }
  const output = [];
  for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j < counts[i]; j++) {
      output.push(i);
    }
  }
  return output;
}

// Bucket sort using simple buckets and built-in sort
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);
  for (const num of arr) {
    const idx = Math.floor((num - min) / bucketSize);
    buckets[idx].push(num);
  }
  const result = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    result.push(...bucket);
  }
  return result;
}

// Radix sort for non-negative integers
function radixSort(arr) {
  const base = 10;
  let max = Math.max(...arr, 0);
  let exp = 1;
  let output = arr.slice();
  while (Math.floor(max / exp) > 0) {
    const buckets = Array.from({ length: base }, () => []);
    for (const num of output) {
      const digit = Math.floor(num / exp) % base;
      buckets[digit].push(num);
    }
    output = [].concat(...buckets);
    exp *= base;
  }
  return output;
}

// Merge overlapping intervals assuming each interval is [start, end]
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  const sorted = intervals.slice().sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0].slice()];
  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

// Count distinct numbers using a bitmap/bit-set
function bitmapCountDistinct(arr, maxVal = Math.max(...arr, 0)) {
  const size = maxVal + 1;
  const bitArray = new Uint32Array(Math.ceil(size / 32));
  for (const num of arr) {
    if (num < 0 || num > maxVal) continue;
    const idx = Math.floor(num / 32);
    const bit = num % 32;
    bitArray[idx] |= 1 << bit;
  }
  let count = 0;
  for (const bits of bitArray) {
    let n = bits;
    while (n) {
      n &= n - 1;
      count++;
    }
  }
  return count;
}

// Sliding window anagram search - does `text` contain any anagram of `pattern`?
function slidingWindowAnagram(text, pattern) {
  if (pattern.length > text.length) return false;
  const need = {};
  for (const ch of pattern) {
    need[ch] = (need[ch] || 0) + 1;
  }
  const window = {};
  let left = 0;
  let matches = 0;
  const required = Object.keys(need).length;
  for (let right = 0; right < text.length; right++) {
    const ch = text[right];
    window[ch] = (window[ch] || 0) + 1;
    if (need[ch] && window[ch] === need[ch]) matches++;

    if (right - left + 1 > pattern.length) {
      const leftChar = text[left];
      if (need[leftChar] && window[leftChar] === need[leftChar]) matches--;
      window[leftChar]--;
      if (window[leftChar] === 0) delete window[leftChar];
      left++;
    }
    if (matches === required) return true;
  }
  return false;
}

// Simple Bloom filter for numbers using multiple hash functions
function createBloomFilter(size = 32, hashCount = 3) {
  const bits = new Uint8Array(size);

  function hash(val, seed) {
    let h = 0;
    for (const ch of String(val)) {
      h = (h * seed + ch.charCodeAt(0)) % size;
    }
    return h;
  }

  function add(value) {
    for (let i = 1; i <= hashCount; i++) {
      bits[hash(value, i + 1)] = 1;
    }
  }

  function contains(value) {
    for (let i = 1; i <= hashCount; i++) {
      if (bits[hash(value, i + 1)] === 0) return false;
    }
    return true;
  }

  return { bits, add, contains };
}

// Simple LRU cache using a hash map and doubly-linked list
function createLRUCache(capacity = 2) {
  const map = new Map();
  const head = { prev: null, next: null };
  const tail = { prev: head, next: null };
  head.next = tail;

  function remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  function insert(node) {
    node.prev = tail.prev;
    node.next = tail;
    tail.prev.next = node;
    tail.prev = node;
  }

  function get(key) {
    if (!map.has(key)) return null;
    const node = map.get(key);
    remove(node);
    insert(node);
    return node.value;
  }

  function put(key, value) {
    if (map.has(key)) {
      const node = map.get(key);
      node.value = value;
      remove(node);
      insert(node);
    } else {
      if (map.size >= capacity) {
        const lru = head.next;
        remove(lru);
        map.delete(lru.key);
      }
      const node = { key, value };
      insert(node);
      map.set(key, node);
    }
  }

  function entries() {
    const result = [];
    let cur = head.next;
    while (cur !== tail) {
      result.push([cur.key, cur.value]);
      cur = cur.next;
    }
    return result;
  }

  return { get, put, entries };
}

// Binary search lower bound (first index with value >= target)
function lowerBound(arr, target) {
  let l = 0, r = arr.length;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] < target) l = m + 1; else r = m;
  }
  return l;
}

// Binary search upper bound (first index with value > target)
function upperBound(arr, target) {
  let l = 0, r = arr.length;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (arr[m] <= target) l = m + 1; else r = m;
  }
  return l;
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
  bucketSort,
  bitmapCountDistinct,
  countingSort,
  mergeIntervals,
  radixSort,
  createBloomFilter,
  createLRUCache,
  lowerBound,
  upperBound,
  slidingWindowAnagram,
};
