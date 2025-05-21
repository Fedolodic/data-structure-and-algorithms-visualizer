function sparseTableQuery(st, l, r) {
  const { table, log } = st;
  const k = log[r - l + 1];
  return Math.min(table[k][l], table[k][r - (1 << k) + 1]);
}

module.exports = sparseTableQuery;
