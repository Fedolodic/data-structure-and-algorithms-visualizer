# Data Structure and Algorithms Visualizer

This project contains small interactive demos for various data structure and algorithm patterns.

Currently the project includes visualizations for the sliding window, two pointers, prefix sum, run-length encoding, Dutch national flag, rolling hash, Z-algorithm, KMP prefix function, Boyer-Moore majority vote, next greater element, Manacher longest palindrome, cycle sort, and segment tree range sum techniques. A small navigation bar lets you switch between demos.
Short written explanations for these patterns are available in [explainer.md](explainer.md).

## Running Locally

No build step is required. Simply open one of the HTML files in `src` in any modern web browser. Each page contains links to the other demos.

1. Clone the repository.
2. Navigate to the project directory.
3. Open any of `src/index.html` (sliding window), `src/two_pointers.html` (two pointers), `src/prefix_sum.html` (prefix sum), `src/run_length_encoding.html` (run-length encoding), `src/dutch_national_flag.html` (Dutch national flag), `src/rolling_hash.html` (rolling hash), `src/z_algorithm.html` (Z-algorithm), `src/kmp_prefix.html` (KMP prefix function), `src/majority_vote.html` (majority vote), or `src/next_greater.html` (next greater element) in your browser.

You should see controls to start, pause, and reset the selected visualization.

Contributions are welcome!

## Running Tests

Unit tests verify the outputs of the pure algorithm implementations. Run them using Node:

```bash
node tests/algorithms.test.js
```

## Algorithm Explanations
See `explainer.md` for short overviews of each algorithm implemented so far.
