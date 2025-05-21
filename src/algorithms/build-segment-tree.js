function buildSegmentTree(arr) {
  const n = arr.length;
  const tree = new Array(2 * n);
  for (let i = 0; i < n; i++) tree[n + i] = arr[i];
  for (let i = n - 1; i > 0; i--) tree[i] = tree[i * 2] + tree[i * 2 + 1];
  return { n, tree };
}

module.exports = buildSegmentTree;
