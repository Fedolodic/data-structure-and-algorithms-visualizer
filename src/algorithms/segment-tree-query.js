function segmentTreeQuery(treeObj, l, r) {
  let { n, tree } = treeObj;
  l += n; r += n;
  let sum = 0;
  while (l <= r) {
    if ((l & 1) === 1) sum += tree[l++];
    if ((r & 1) === 0) sum += tree[r--];
    l >>= 1;
    r >>= 1;
  }
  return sum;
}

module.exports = segmentTreeQuery;
