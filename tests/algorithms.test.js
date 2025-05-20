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

console.log('All tests passed!');

