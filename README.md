# Data Structure and Algorithms Visualizer

This project contains small interactive demos for various data structure and algorithm patterns.

Currently the project includes visualizations for the sliding window, two pointers, prefix sum, run-length encoding, Dutch national flag, rolling hash, Z-algorithm, KMP prefix function, Boyer-Moore majority vote, next greater element, hash map two-sum, hash-set intersection, frequency map counting, subarray sum equals K, sliding window anagram search, Manacher longest palindrome, cycle sort, counting sort, **bucket sort**, **radix sort**, **merge sort**, **interval merge**, **bit-set counting**, **bloom filter**, **binary search lower/upper bound**, **rotated array search**, **peak element search**, and segment tree range sum techniques. A small navigation bar lets you switch between demos.
Short written explanations for these patterns are available in [explainer.md](explainer.md).

## Running Locally

No build step is required. Demo HTML files live in `src/demos`. Simply open one in any modern web browser. Each page contains links to the other demos.

1. Clone the repository.
2. Navigate to the project directory.
3. Open any of `src/demos/arrays/index.html` (sliding window), `src/demos/arrays/two_pointers.html` (two pointers), `src/demos/arrays/prefix_sum.html` (prefix sum), `src/demos/arrays/run_length_encoding.html` (run-length encoding), `src/demos/arrays/dutch_national_flag.html` (Dutch national flag), `src/demos/hashing/rolling_hash.html` (rolling hash), `src/demos/arrays/z_algorithm.html` (Z-algorithm), `src/demos/arrays/kmp_prefix.html` (KMP prefix function), `src/demos/arrays/majority_vote.html` (majority vote), `src/demos/arrays/next_greater.html` (next greater element), `src/demos/hashing/hash_map_two_sum.html` (hash map two-sum), `src/demos/hashing/hash_set_intersection.html` (set intersection), `src/demos/hashing/frequency_map.html` (frequency map counting), `src/demos/arrays/sparse_table.html` (sparse table), `src/demos/hashing/prefix_sum_hash.html` (subarray sum = K), `src/demos/arrays/counting_sort.html` (counting sort), `src/demos/arrays/bucket_sort.html` (bucket sort), `src/demos/arrays/radix_sort.html` (radix sort), `src/demos/arrays/merge_sort.html` (merge sort), `src/demos/arrays/interval_merge.html` (interval merge), `src/demos/hashing/anagram_counter.html` (anagram search), `src/demos/hashing/bit_set.html` (bit-set counting), `src/demos/hashing/bloom_filter.html` (bloom filter), `src/demos/search/binary_search.html` (binary search), `src/demos/search/first_last.html` (first/last occurrence), `src/demos/hashing/lru_cache.html` (LRU cache), `src/demos/search/rotated_search.html` (rotated array search), `src/demos/search/peak_element.html` (peak element search) in your browser.

You should see controls to start, pause, and reset the selected visualization.

Contributions are welcome!

## Running Tests

Unit tests verify the outputs of the pure algorithm implementations. A convenient npm script is provided:

```bash
npm test
```

This simply runs `node tests/algorithms.test.js` under the hood.

## Algorithm Explanations
See `explainer.md` for short overviews of each algorithm implemented so far.

## License
This project is licensed under the [MIT License](LICENSE).
