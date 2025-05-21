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

module.exports = buildSparseTable;
