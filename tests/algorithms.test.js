const assert = require('assert');
const algo = require('../src/algorithms');

// Sliding window subarrays
assert.deepStrictEqual(
  algo.slidingWindowSubarrays([1,2,3,4], 2),
  [[1,2],[2,3],[3,4]]
);

// Two pointers sum exists
assert.strictEqual(algo.twoPointersSumExists([1,2,3,4,5], 9), true);
assert.strictEqual(algo.twoPointersSumExists([1,2,3,4,5], 10), false);

// Prefix sum
assert.deepStrictEqual(algo.prefixSum([1,2,3]), [1,3,6]);

// Run-length encoding
assert.strictEqual(algo.runLengthEncode('aaabbc'), 'a3b2c1');

// Dutch national flag sort
assert.deepStrictEqual(algo.dutchNationalFlagSort([2,0,1,2,1,0]), [0,0,1,1,2,2]);

// Rabin-Karp
assert.strictEqual(algo.rabinKarp('abracadabra', 'cada'), 4);
assert.strictEqual(algo.rabinKarp('abcdef', 'gh'), -1);

// Z-Algorithm
assert.deepStrictEqual(
  algo.zAlgorithm('aabcaabxaaaz'),
  [0,1,0,0,3,1,0,0,2,2,1,0]
);

// KMP Prefix Function
assert.deepStrictEqual(
  algo.kmpPrefixFunction('ababaca'),
  [0,0,1,2,3,0,1]
);

// Boyer-Moore Majority Vote
assert.strictEqual(algo.majorityVote([1,2,2,3,2,2,4]), 2);
assert.strictEqual(algo.majorityVote([1,2,3,4]), null);

// Next Greater Elements
assert.deepStrictEqual(
  algo.nextGreaterElements([2,1,2,4,3]),
  [4,2,4,-1,-1]
);

// Manacher longest palindromic substring
assert.strictEqual(algo.manacherLongestPalindrome('cbbd'), 'bb');
assert.strictEqual(algo.manacherLongestPalindrome('racecar'), 'racecar');

// Cycle sort
assert.deepStrictEqual(algo.cycleSort([3,1,4,2]), [1,2,3,4]);

// Counting sort
assert.deepStrictEqual(algo.countingSort([3,1,4,1,2,0,5]), [0,1,1,2,3,4,5]);

// Bucket sort
assert.deepStrictEqual(
  algo.bucketSort([29,25,3,49,9,37,21,43]),
  [3,9,21,25,29,37,43,49]
);

// Interval merge
assert.deepStrictEqual(
  algo.mergeIntervals([[1,3],[2,4],[5,7],[6,8]]),
  [[1,4],[5,8]]
);

// Radix sort
assert.deepStrictEqual(
  algo.radixSort([170, 45, 75, 90, 802, 24, 2, 66]),
  [2, 24, 45, 66, 75, 90, 170, 802]
);

// Segment tree range sum
const tree = algo.buildSegmentTree([1,3,5,7,9,11]);
assert.strictEqual(algo.segmentTreeQuery(tree, 1, 3), 15);
assert.strictEqual(algo.segmentTreeQuery(tree, 0, 5), 36);

// Sparse table range minimum query
const st = algo.buildSparseTable([1,3,-1,7,0,3]);
assert.strictEqual(algo.sparseTableQuery(st, 2, 4), -1);
assert.strictEqual(algo.sparseTableQuery(st, 1, 3), -1);

// Hash-map two-sum
assert.strictEqual(algo.hashMapTwoSum([1,2,3,4], 5), true);
assert.strictEqual(algo.hashMapTwoSum([1,2,3,4], 10), false);

// Frequency map counting
assert.deepStrictEqual(
  algo.frequencyMapCounting('abbccc'),
  { a:1, b:2, c:3 }
);

// Hash-set intersection
assert.deepStrictEqual(
  algo.hashSetIntersection([1,2,2,3], [2,3,4]),
  [2,3]
);
assert.deepStrictEqual(
  algo.hashSetIntersection([], [1,2,3]),
  []
);

// Prefix-Sum + Hash subarray sum equals K
assert.strictEqual(algo.subarraySumEqualsK([1,2,3], 5), true);
assert.strictEqual(algo.subarraySumEqualsK([1,2,3], 7), false);

// Sliding window anagram search
assert.strictEqual(algo.slidingWindowAnagram('cbaebabacd', 'abc'), true);
assert.strictEqual(algo.slidingWindowAnagram('abcdef', 'gh'), false);

// Bloom filter basic add/contains
const bf = algo.createBloomFilter(16, 3);
bf.add('hello');
bf.add('world');
assert.strictEqual(bf.contains('hello'), true);
assert.strictEqual(bf.contains('world'), true);
assert.strictEqual(bf.contains('test'), false);

// Bitmap distinct counting
assert.strictEqual(algo.bitmapCountDistinct([3,1,4,1,2,0,5], 5), 6);
assert.strictEqual(algo.bitmapCountDistinct([], 10), 0);

// LRU cache basic put/get eviction
const lru = algo.createLRUCache(2);
lru.put(1, 'a');
lru.put(2, 'b');
assert.strictEqual(lru.get(1), 'a');
lru.put(3, 'c'); // evicts key 2
assert.strictEqual(lru.get(2), null);
assert.deepStrictEqual(lru.entries(), [[1,'a'], [3,'c']]);

console.log('All tests passed!');

