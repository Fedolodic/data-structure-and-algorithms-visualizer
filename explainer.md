# Algorithm Explainers

This document briefly describes each data structure or algorithm currently visualized in this repository.

## Sliding Window
The sliding window technique processes a contiguous subset of items by maintaining a window of fixed or dynamic size that moves across the data. It is useful for tasks like subarray sums or finding patterns in sequences.

## Two Pointers
Two pointers iterate through a collection from different positions, often one from the start and one from the end. The pointers move toward each other to solve problems such as pair sums or checking palindromes in linear time.

## Prefix Sum
A prefix sum array stores the cumulative sum up to each index. By subtracting two prefix sums, we can compute the sum of any subarray in constant time, enabling efficient range queries.

## Run-Length Encoding
Run-length encoding compresses repeated characters or numbers by recording the value and its consecutive count. For example, `AAABB` becomes `3A2B`.

## Dutch National Flag
The Dutch National Flag algorithm sorts an array containing three distinct values (0, 1, 2) using three pointers: low, mid, and high. It partitions the array in a single pass so that all 0s come first, followed by 1s, then 2s.

## Rolling Hash
Rolling hash techniques, such as Rabin-Karp, compute hash values for a moving window of characters. By updating the hash in constant time as the window slides, we can quickly search for a pattern inside a string.

## Z-Algorithm
The Z-algorithm computes an array where each position stores the length of the longest substring starting from that position that is also a prefix of the string. It enables efficient pattern matching and runs in linear time by keeping track of a window of known matches.

## KMP Prefix Function
The prefix function used in the Knuth-Morris-Pratt string search computes for each position the length of the longest proper prefix that is also a suffix of the substring ending at that position. This table allows the algorithm to skip redundant comparisons when a mismatch occurs.

## Boyer-Moore Majority Vote
The Boyer-Moore majority vote algorithm finds a majority element in a sequence, if one exists, in linear time and constant space. It keeps a current candidate and a counter that is increased when the same value is seen and decreased otherwise. After one pass, the candidate is the potential majority element, which can be verified with a second pass.

## Next Greater Element (Monotonic Stack)
The next greater element problem asks for each element in an array to find the next element to its right that is larger, or `-1` if none exists. A common solution processes the array from right to left while maintaining a stack that is strictly decreasing. Elements are popped from the stack while they are less than or equal to the current value, leaving the top of the stack as the next greater element. The current value is then pushed onto the stack.

## Manacher Longest Palindrome
Manacher's algorithm finds the longest palindromic substring of a string in linear time. It transforms the string with separators to handle even lengths uniformly and expands around each center while tracking the rightmost reached position. This allows reuse of previously computed palindrome lengths for efficiency.

## Cycle Sort
Cycle sort places each element into its correct position with the minimum number of writes. For every starting index it computes where the item should go by counting smaller elements. Items are cycled through their target positions until all are in order.

## Segment Tree Range Sum
A segment tree precomputes sums for intervals of an array so that any range sum query can be answered in `O(log n)` time. The array is stored in a binary tree where each internal node holds the sum of its children.

## Sparse Table Range Minimum Query
A sparse table precomputes range minimums for a static array using overlapping blocks of power-of-two sizes. Queries take O(1) time by combining two blocks that cover the range. Building the table costs O(n log n).

## Frequency Map Counting
Frequency map counting tallies how many times each element appears in a collection. As the input is scanned, a map accumulates counts keyed by value. This allows quick lookups of frequency information for later processing.

## Hash Map Two-Sum
The hash map two-sum technique scans through an array while storing previously seen numbers in a set. For each new value we check if the complement `target - value` has already been seen. If so, a pair adding up to the target exists. This approach finds a solution in linear time using additional memory for the set.

## Hash-Set Intersection
Hash-set intersection collects the common elements between two arrays. One array is inserted into a set for constant-time lookups. We then scan the second array, checking if each value exists in the set and has not already been added to the result. This yields the intersection in linear time with respect to the total number of elements.

## Prefix-Sum + Hash (Subarray Sum = K)
To determine whether a subarray sums to a target `K`, we compute running prefix sums while storing previously seen sums in a map. At each step we check if `currentSum - K` has appeared before. If so, a subarray totaling `K` ends at the current index. This method finds a match in linear time.

## Sliding Window Anagram Search
Sliding window anagram search maintains character counts for a moving window of the same length as the pattern. As the window slides, counts are updated in constant time. When all counts match the pattern's frequency map, an anagram of the pattern has been found inside the text.

## Counting Sort
Counting sort is efficient for integers in a small range. It counts how many times each value appears and then emits values in order based on those counts. The algorithm runs in O(n + k) time for `n` elements and range size `k`.

## Bucket Sort
Bucket sort distributes elements into a fixed number of buckets based on value ranges. Each bucket is sorted individually, typically using insertion sort or the native sort, and the buckets are concatenated in order. When the data is uniformly distributed, bucket sort achieves linear time complexity.

## Bit-Set Counting
Bit-set or bitmap counting uses bits inside integers to mark whether a value has been seen. As numbers are processed, the bit corresponding to each value is set. The total number of distinct values can then be computed by counting the number of set bits. This approach is memory efficient for small ranges and allows constant-time checks.

## Bloom Filter
A Bloom filter is a probabilistic data structure that can quickly test whether a value may be present in a set. Multiple hash functions map each value to positions in a fixed-size bit array. When querying, if any corresponding bit is 0 the value is definitely not in the set; otherwise it is probably present. Bloom filters trade a small chance of false positives for compact storage.

## LRU Cache
An LRU (Least Recently Used) cache stores a limited number of key-value pairs and evicts the least recently accessed item when capacity is exceeded. A doubly-linked list maintains usage order while a hash map allows O(1) lookups.
