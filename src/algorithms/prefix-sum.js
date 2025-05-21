function prefixSum(arr) {
  const res = [];
  let sum = 0;
  for (const x of arr) {
    sum += x;
    res.push(sum);
  }
  return res;
}

module.exports = prefixSum;
