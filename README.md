# Data Structure and Algorithms Visualizer

This project contains small interactive demos for various data structure and algorithm patterns.

Currently the project includes visualizations for the sliding window, two pointers, prefix sum, run-length encoding, Dutch national flag, rolling hash, Z-algorithm, KMP prefix function, Boyer-Moore majority vote, next greater element, hash map two-sum, hash-set intersection, frequency map counting, subarray sum equals K, sliding window anagram search, Manacher longest palindrome, cycle sort, counting sort, **bucket sort**, **radix sort**, **merge sort**, **interval merge**, **bit-set counting**, **bloom filter**, **binary search lower/upper bound**, **rotated array search**, **peak element search**, and segment tree range sum techniques. A small navigation bar lets you switch between demos.
Short written explanations for these patterns are available in [explainer.md](explainer.md).

## Running Locally

No build step is required. A central index page lists all available demos, and the navigation bar is injected automatically after the recent navigation fix.
1. Clone the repository.
2. Navigate to the project directory.
3. Open `src/index.html` in a modern browser. If you're on an older browser or run into local file restrictions, start a lightweight server such as `npx http-server` or `python -m http.server` and open the served page instead.
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
