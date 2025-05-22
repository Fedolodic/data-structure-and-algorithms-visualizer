function el(id) {
  return document.getElementById(id);
}

function play(state, stepFn, delay = 1000) {
  pause(state);
  state.intervalId = setInterval(stepFn, delay);
}

function pause(state) {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function reset(state, resetFn) {
  pause(state);
  if (typeof resetFn === 'function') {
    resetFn();
  }
}

const navItems = [
  ['Sliding Window', 'demos/arrays/index.html'],
  ['Two Pointers', 'demos/arrays/two_pointers.html'],
  ['Prefix Sum', 'demos/arrays/prefix_sum.html'],
  ['Run-Length Encoding', 'demos/arrays/run_length_encoding.html'],
  ['Dutch National Flag', 'demos/arrays/dutch_national_flag.html'],
  ['Rolling Hash', 'demos/hashing/rolling_hash.html'],
  ['Z-Algorithm', 'demos/arrays/z_algorithm.html'],
  ['KMP Prefix', 'demos/arrays/kmp_prefix.html'],
  ['Majority Vote', 'demos/arrays/majority_vote.html'],
  ['Next Greater', 'demos/arrays/next_greater.html'],
  ['Sparse Table', 'demos/arrays/sparse_table.html'],
  ['Hash Map Two-Sum', 'demos/hashing/hash_map_two_sum.html'],
  ['Frequency Map', 'demos/hashing/frequency_map.html'],
  ['Set Intersection', 'demos/hashing/hash_set_intersection.html'],
  ['Subarray Sum = K', 'demos/hashing/prefix_sum_hash.html'],
  ['Counting Sort', 'demos/arrays/counting_sort.html'],
  ['Bucket Sort', 'demos/arrays/bucket_sort.html'],
  ['Radix Sort', 'demos/arrays/radix_sort.html'],
  ['Merge Sort', 'demos/arrays/merge_sort.html'],
  ['Interval Merge', 'demos/arrays/interval_merge.html'],
  ['Anagram Search', 'demos/hashing/anagram_counter.html'],
  ['Bit-Set Counting', 'demos/hashing/bit_set.html'],
  ['Bloom Filter', 'demos/hashing/bloom_filter.html'],
  ['LRU Cache', 'demos/hashing/lru_cache.html'],
  ['Binary Search', 'demos/search/binary_search.html'],
  ['First/Last Occurrence', 'demos/search/first_last.html'],
  ['Rotated Search', 'demos/search/rotated_search.html'],
  ['Peak Element', 'demos/search/peak_element.html']
];

function loadNav() {
  const navContainer = document.getElementById('nav');
  if (!navContainer) return;

  const prefix = location.pathname.includes('/demos/') ? '../../' : '';
  const nav = document.createElement('nav');
  navItems.forEach(([text, href], idx) => {
    const a = document.createElement('a');
    a.textContent = text;
    a.href = prefix + href;
    nav.appendChild(a);
    if (idx < navItems.length - 1) {
      nav.appendChild(document.createTextNode(' | '));
    }
  });

  navContainer.innerHTML = '';
  navContainer.appendChild(nav);
}

document.addEventListener('DOMContentLoaded', loadNav);

window.base = { el, play, pause, reset, loadNav };
